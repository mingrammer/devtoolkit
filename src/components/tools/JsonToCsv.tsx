import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const JsonToCsv = () => {
  const { t } = useLanguage();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convertData = () => {
    if (!input.trim()) {
      toast.error(t("jsontocsv_required"));
      return;
    }

    try {
      const parsedData = JSON.parse(input);
      const result = convertToCSV(parsedData);
      setOutput(result);
      toast.success(t("jsontocsv_converted"));
    } catch (error) {
      toast.error(t("jsontocsv_conversion_error") + ": " + (error as Error).message);
    }
  };

  const convertToCSV = (data: any) => {
    if (Array.isArray(data) && data.length > 0) {
      const headers = Object.keys(data[0]);
      const csvLines = [headers.join(',')];
      data.forEach(item => {
        const values = headers.map(header => {
          const value = item[header];
          // Handle comma and quotes in CSV values
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value || '';
        });
        csvLines.push(values.join(','));
      });
      return csvLines.join('\n');
    } else if (typeof data === 'object' && data !== null) {
      // Handle single object
      const headers = Object.keys(data);
      const values = headers.map(header => {
        const value = data[header];
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      });
      return headers.join(',') + '\n' + values.join(',');
    }
    throw new Error(t("jsontocsv_invalid_format"));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success(t("copySuccess"));
    } catch (error) {
      toast.error(t("copyError"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>{t("jsontocsv_input")}</Label>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("jsontocsv_input_placeholder")}
            className="min-h-[300px] font-mono text-sm"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>{t("jsontocsv_output")}</Label>
            {output && (
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                {t("jsontocsv_copy_button")}
              </Button>
            )}
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder={t("jsontocsv_output_placeholder")}
            className="min-h-[300px] font-mono text-sm bg-slate-50"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={convertData}>
          <RefreshCw className="w-4 h-4 mr-2" />
          {t("jsontocsv_convert")}
        </Button>
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">{t("jsontocsv_what")}</h3>
        <p className="text-gray-700 mb-4">{t("jsontocsv_info")}</p>
        <div className="space-y-2">
          <h4 className="font-medium">{t("jsontocsv_features")}</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>{t("jsontocsv_feature_1")}</li>
            <li>{t("jsontocsv_feature_2")}</li>
            <li>{t("jsontocsv_feature_3")}</li>
            <li>{t("jsontocsv_feature_4")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JsonToCsv;
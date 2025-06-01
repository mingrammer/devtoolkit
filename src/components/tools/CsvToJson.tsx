import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const CsvToJson = () => {
  const { t } = useLanguage();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convertData = () => {
    if (!input.trim()) {
      toast.error(t("csvtojson_required"));
      return;
    }

    try {
      const parsedData = parseCSV(input);
      const result = JSON.stringify(parsedData, null, 2);
      setOutput(result);
      toast.success(t("csvtojson_converted"));
    } catch (error) {
      toast.error(t("csvtojson_conversion_error") + ": " + (error as Error).message);
    }
  };

  const parseCSV = (csv: string) => {
    const lines = csv.trim().split('\n');
    if (lines.length === 0) {
      throw new Error(t("csvtojson_empty_input"));
    }

    const headers = parseCSVLine(lines[0]);
    const data = lines.slice(1).map(line => {
      const values = parseCSVLine(line);
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header.trim()] = values[index] ? values[index].trim() : '';
      });
      return obj;
    });
    return data;
  };

  const parseCSVLine = (line: string) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++; // Skip next quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current);
    return result;
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
            <Label>{t("csvtojson_input")}</Label>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("csvtojson_input_placeholder")}
            className="min-h-[300px] font-mono text-sm"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>{t("csvtojson_output")}</Label>
            {output && (
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                {t("csvtojson_copy_button")}
              </Button>
            )}
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder={t("csvtojson_output_placeholder")}
            className="min-h-[300px] font-mono text-sm bg-slate-50"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={convertData}>
          <RefreshCw className="w-4 h-4 mr-2" />
          {t("csvtojson_convert")}
        </Button>
      </div>

      <div className="mt-8 p-6 bg-green-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">{t("csvtojson_what")}</h3>
        <p className="text-gray-700 mb-4">{t("csvtojson_info")}</p>
        <div className="space-y-2">
          <h4 className="font-medium">{t("csvtojson_features")}</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>{t("csvtojson_feature_1")}</li>
            <li>{t("csvtojson_feature_2")}</li>
            <li>{t("csvtojson_feature_3")}</li>
            <li>{t("csvtojson_feature_4")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CsvToJson;
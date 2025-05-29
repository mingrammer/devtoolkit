import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const FormatConverter = () => {
  const { t } = useLanguage();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [fromFormat, setFromFormat] = useState("json");
  const [toFormat, setToFormat] = useState("csv");

  const convertData = () => {
    if (!input.trim()) {
      toast.error(t("formatconverter_required"));
      return;
    }

    try {
      let parsedData;

      // Parse input based on format
      switch (fromFormat) {
        case "json":
          parsedData = JSON.parse(input);
          break;
        case "csv":
          parsedData = parseCSV(input);
          break;
        case "yaml":
          // Simple YAML parser for demo
          parsedData = parseYAML(input);
          break;
        default:
          throw new Error(t("formatconverter_unsupported_input"));
      }

      // Convert to output format
      let result;
      switch (toFormat) {
        case "json":
          result = JSON.stringify(parsedData, null, 2);
          break;
        case "csv":
          result = convertToCSV(parsedData);
          break;
        case "yaml":
          result = convertToYAML(parsedData);
          break;
        default:
          throw new Error(t("formatconverter_unsupported_output"));
      }

      setOutput(result);
      toast.success(t("formatconverter_converted"));
    } catch (error) {
      toast.error(t("formatconverter_conversion_error") + ": " + (error as Error).message);
    }
  };

  const parseCSV = (csv: string) => {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });
      return obj;
    });
    return data;
  };

  const parseYAML = (yaml: string) => {
    // Very simple YAML parser for demo
    const obj: any = {};
    const lines = yaml.split('\n');
    lines.forEach(line => {
      const match = line.match(/^(\w+):\s*(.+)$/);
      if (match) {
        obj[match[1]] = match[2];
      }
    });
    return obj;
  };

  const convertToCSV = (data: any) => {
    if (Array.isArray(data) && data.length > 0) {
      const headers = Object.keys(data[0]);
      const csvLines = [headers.join(',')];
      data.forEach(item => {
        const values = headers.map(header => item[header] || '');
        csvLines.push(values.join(','));
      });
      return csvLines.join('\n');
    }
    return '';
  };

  const convertToYAML = (data: any) => {
    // Simple YAML converter for demo
    if (typeof data === 'object' && !Array.isArray(data)) {
      return Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
    }
    return '';
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
        <div className="space-y-2">
          <Label>{t("formatconverter_from_format")}</Label>
          <Select value={fromFormat} onValueChange={setFromFormat}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">{t("formatconverter_json")}</SelectItem>
              <SelectItem value="csv">{t("formatconverter_csv")}</SelectItem>
              <SelectItem value="yaml">{t("formatconverter_yaml")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>{t("formatconverter_to_format")}</Label>
          <Select value={toFormat} onValueChange={setToFormat}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">{t("formatconverter_json")}</SelectItem>
              <SelectItem value="csv">{t("formatconverter_csv")}</SelectItem>
              <SelectItem value="yaml">{t("formatconverter_yaml")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label>{t("formatconverter_input")}</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("formatconverter_input_placeholder").replace("{format}", fromFormat.toUpperCase())}
            className="min-h-[300px] font-mono text-sm"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>{t("formatconverter_output")}</Label>
            {output && (
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                {t("formatconverter_copy_button")}
              </Button>
            )}
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder={t("formatconverter_output_placeholder")}
            className="min-h-[300px] font-mono text-sm bg-slate-50"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={convertData}>
          <RefreshCw className="w-4 h-4 mr-2" />
          {t("formatconverter_convert")}
        </Button>
      </div>
    </div>
  );
};

export default FormatConverter;
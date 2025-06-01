import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const JsonToYaml = () => {
  const { t } = useLanguage();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convertData = () => {
    if (!input.trim()) {
      toast.error(t("jsontoyaml_required"));
      return;
    }

    try {
      const parsedData = JSON.parse(input);
      const result = convertToYAML(parsedData);
      setOutput(result);
      toast.success(t("jsontoyaml_converted"));
    } catch (error) {
      toast.error(t("jsontoyaml_conversion_error") + ": " + (error as Error).message);
    }
  };

  const convertToYAML = (data: any, indent = 0): string => {
    const spaces = '  '.repeat(indent);
    
    if (data === null) return 'null';
    if (typeof data === 'boolean') return data.toString();
    if (typeof data === 'number') return data.toString();
    if (typeof data === 'string') {
      // Check if string needs quotes
      if (data.includes('\n') || data.includes(':') || data.includes('-') || 
          data.includes('#') || data.trim() !== data) {
        return `"${data.replace(/"/g, '\\"')}"`;
      }
      return data;
    }

    if (Array.isArray(data)) {
      if (data.length === 0) return '[]';
      return data.map(item => 
        `${spaces}- ${convertToYAML(item, indent + 1).replace(/^\s+/, '')}`
      ).join('\n');
    }

    if (typeof data === 'object') {
      const entries = Object.entries(data);
      if (entries.length === 0) return '{}';
      
      return entries.map(([key, value]) => {
        const yamlValue = convertToYAML(value, indent + 1);
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          return `${spaces}${key}:\n${yamlValue}`;
        } else if (Array.isArray(value) && value.length > 0) {
          return `${spaces}${key}:\n${yamlValue}`;
        } else {
          return `${spaces}${key}: ${yamlValue}`;
        }
      }).join('\n');
    }

    return data.toString();
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
            <Label>{t("jsontoyaml_input")}</Label>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("jsontoyaml_input_placeholder")}
            className="min-h-[300px] font-mono text-sm"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>{t("jsontoyaml_output")}</Label>
            {output && (
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                {t("jsontoyaml_copy_button")}
              </Button>
            )}
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder={t("jsontoyaml_output_placeholder")}
            className="min-h-[300px] font-mono text-sm bg-slate-50"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={convertData}>
          <RefreshCw className="w-4 h-4 mr-2" />
          {t("jsontoyaml_convert")}
        </Button>
      </div>

      <div className="mt-8 p-6 bg-purple-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">{t("jsontoyaml_what")}</h3>
        <p className="text-gray-700 mb-4">{t("jsontoyaml_info")}</p>
        <div className="space-y-2">
          <h4 className="font-medium">{t("jsontoyaml_features")}</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>{t("jsontoyaml_feature_1")}</li>
            <li>{t("jsontoyaml_feature_2")}</li>
            <li>{t("jsontoyaml_feature_3")}</li>
            <li>{t("jsontoyaml_feature_4")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JsonToYaml;
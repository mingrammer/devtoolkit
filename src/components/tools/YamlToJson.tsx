import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const YamlToJson = () => {
  const { t } = useLanguage();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convertData = () => {
    if (!input.trim()) {
      toast.error(t("yamltojson_required"));
      return;
    }

    try {
      const parsedData = parseYAML(input);
      const result = JSON.stringify(parsedData, null, 2);
      setOutput(result);
      toast.success(t("yamltojson_converted"));
    } catch (error) {
      toast.error(t("yamltojson_conversion_error") + ": " + (error as Error).message);
    }
  };

  const parseYAML = (yaml: string) => {
    // Enhanced YAML parser for basic structures
    const lines = yaml.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));
    const result: any = {};
    let currentObj = result;
    const stack: any[] = [{ obj: result, indent: 0 }];

    for (const line of lines) {
      const indent = line.match(/^ */)?.[0].length || 0;
      const content = line.trim();

      // Handle list items
      if (content.startsWith('- ')) {
        const value = content.substring(2).trim();
        const parent = stack[stack.length - 1];
        
        if (!Array.isArray(parent.obj)) {
          // Convert to array if needed
          const keys = Object.keys(parent.obj);
          if (keys.length === 0) {
            stack[stack.length - 1].obj = [];
            currentObj = stack[stack.length - 1].obj;
          }
        }
        
        if (Array.isArray(currentObj)) {
          if (value.includes(': ')) {
            const obj = {};
            const [key, val] = value.split(': ', 2);
            (obj as any)[key.trim()] = parseValue(val.trim());
            currentObj.push(obj);
          } else {
            currentObj.push(parseValue(value));
          }
        }
        continue;
      }

      // Handle key-value pairs
      if (content.includes(': ')) {
        const [key, ...valueParts] = content.split(': ');
        const value = valueParts.join(': ').trim();

        // Adjust stack based on indentation
        while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
          stack.pop();
        }

        const parent = stack[stack.length - 1].obj;
        
        if (value === '' || value === '|' || value === '>') {
          // Nested object or multiline string
          const newObj = {};
          parent[key.trim()] = newObj;
          stack.push({ obj: newObj, indent });
          currentObj = newObj;
        } else {
          parent[key.trim()] = parseValue(value);
        }
      }
    }

    return result;
  };

  const parseValue = (value: string) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (value === 'null') return null;
    if (value.match(/^-?\d+$/)) return parseInt(value);
    if (value.match(/^-?\d*\.\d+$/)) return parseFloat(value);
    
    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      return value.slice(1, -1);
    }
    
    return value;
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
            <Label>{t("yamltojson_input")}</Label>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("yamltojson_input_placeholder")}
            className="min-h-[300px] font-mono text-sm"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>{t("yamltojson_output")}</Label>
            {output && (
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                {t("yamltojson_copy_button")}
              </Button>
            )}
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder={t("yamltojson_output_placeholder")}
            className="min-h-[300px] font-mono text-sm bg-slate-50"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={convertData}>
          <RefreshCw className="w-4 h-4 mr-2" />
          {t("yamltojson_convert")}
        </Button>
      </div>

      <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">{t("yamltojson_what")}</h3>
        <p className="text-gray-700 mb-4">{t("yamltojson_info")}</p>
        <div className="space-y-2">
          <h4 className="font-medium">{t("yamltojson_features")}</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>{t("yamltojson_feature_1")}</li>
            <li>{t("yamltojson_feature_2")}</li>
            <li>{t("yamltojson_feature_3")}</li>
            <li>{t("yamltojson_feature_4")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default YamlToJson;
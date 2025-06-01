import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const YamlToCsv = () => {
  const { t } = useLanguage();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convertData = () => {
    if (!input.trim()) {
      toast.error(t("yamltocsv_required"));
      return;
    }

    try {
      const parsedData = parseYAML(input);
      const result = convertToCSV(parsedData);
      setOutput(result);
      toast.success(t("yamltocsv_converted"));
    } catch (error) {
      toast.error(t("yamltocsv_conversion_error") + ": " + (error as Error).message);
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

  const convertToCSV = (data: any) => {
    // Convert YAML data to CSV format
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
      // Handle single object or nested structure
      const flattenedData = flattenObject(data);
      const headers = Object.keys(flattenedData);
      const values = headers.map(header => {
        const value = flattenedData[header];
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      });
      return headers.join(',') + '\n' + values.join(',');
    }
    throw new Error(t("yamltocsv_invalid_format"));
  };

  const flattenObject = (obj: any, prefix = ''): any => {
    const flattened: any = {};
    
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(flattened, flattenObject(value, newKey));
      } else if (Array.isArray(value)) {
        flattened[newKey] = JSON.stringify(value);
      } else {
        flattened[newKey] = value;
      }
    }
    
    return flattened;
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
            <Label>{t("yamltocsv_input")}</Label>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("yamltocsv_input_placeholder")}
            className="min-h-[300px] font-mono text-sm"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>{t("yamltocsv_output")}</Label>
            {output && (
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                {t("yamltocsv_copy_button")}
              </Button>
            )}
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder={t("yamltocsv_output_placeholder")}
            className="min-h-[300px] font-mono text-sm bg-slate-50"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={convertData}>
          <RefreshCw className="w-4 h-4 mr-2" />
          {t("yamltocsv_convert")}
        </Button>
      </div>

      <div className="mt-8 p-6 bg-indigo-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">{t("yamltocsv_what")}</h3>
        <p className="text-gray-700 mb-4">{t("yamltocsv_info")}</p>
        <div className="space-y-2">
          <h4 className="font-medium">{t("yamltocsv_features")}</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>{t("yamltocsv_feature_1")}</li>
            <li>{t("yamltocsv_feature_2")}</li>
            <li>{t("yamltocsv_feature_3")}</li>
            <li>{t("yamltocsv_feature_4")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default YamlToCsv;
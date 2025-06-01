import { useState } from "react";
import { Copy, Braces, Minimize, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isValid, setIsValid] = useState(true);
  const { t } = useLanguage();

  const formatJson = () => {
    if (!input.trim()) {
      toast.error(t("jsonformatter_required"));
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setIsValid(true);
      toast.success(t("jsonformatter_formatted"));
    } catch (error) {
      setIsValid(false);
      toast.error(t("jsonformatter_invalid") + (error as Error).message);
    }
  };

  const minifyJson = () => {
    if (!input.trim()) {
      toast.error(t("jsonformatter_required"));
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setIsValid(true);
      toast.success(t("jsonformatter_minified"));
    } catch (error) {
      setIsValid(false);
      toast.error(t("jsonformatter_invalid") + (error as Error).message);
    }
  };

  const validateJson = () => {
    if (!input.trim()) {
      toast.error(t("jsonformatter_required"));
      return;
    }

    try {
      JSON.parse(input);
      setIsValid(true);
      toast.success(t("jsonformatter_valid"));
    } catch (error) {
      setIsValid(false);
      toast.error(t("jsonformatter_invalid") + (error as Error).message);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success(t("copySuccess"));
    } catch (error) {
      toast.error(t("copyError"));
    }
  };

  const sampleJson = {
    name: "John Doe",
    age: 30,
    city: "Seoul",
    hobbies: ["reading", "swimming", "coding"],
    address: {
      street: "123 Main St",
      zipCode: "12345"
    }
  };

  const loadSample = () => {
    setInput(JSON.stringify(sampleJson));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button onClick={formatJson}>
          <Maximize className="w-4 h-4 mr-2" />
          {t("jsonformatter_format_button")}
        </Button>
        <Button onClick={minifyJson} variant="outline">
          <Minimize className="w-4 h-4 mr-2" />
          {t("jsonformatter_minify_button")}
        </Button>
        <Button onClick={validateJson} variant="outline">
          <Braces className="w-4 h-4 mr-2" />
          {t("jsonformatter_validate_button")}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>{t("jsonformatter_input_label")}</Label>
            <Button onClick={loadSample} variant="outline" size="sm">
              {t("jsonformatter_load_sample_button")}
            </Button>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("jsonformatter_input_placeholder")}
            className={`min-h-[400px] font-mono text-sm ${
              !isValid && input ? 'border-red-300 bg-red-50' : ''
            }`}
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>{t("jsonformatter_output_label")}</Label>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              {t("copy")}
            </Button>
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder={t("jsonformatter_output_placeholder")}
            className="min-h-[400px] font-mono text-sm bg-slate-50"
          />
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <Label className="text-sm font-medium text-green-800 mb-2 block">
          {t("jsonformatter_features_title")}
        </Label>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• <strong>{t("jsonformatter_format_button")}</strong>: {t("jsonformatter_feature_format")}</li>
          <li>• <strong>{t("jsonformatter_minify_button")}</strong>: {t("jsonformatter_feature_minify")}</li>
          <li>• <strong>{t("jsonformatter_validate_button")}</strong>: {t("jsonformatter_feature_validate")}</li>
          <li>• <strong>{t("jsonformatter_load_sample_button")}</strong>: {t("jsonformatter_feature_sample")}</li>
        </ul>
      </div>
    </div>
  );
};

export default JsonFormatter;

import { useState } from "react";
import { Copy, Braces, Minimize, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const JsonPrettifier = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isValid, setIsValid] = useState(true);
  const { t } = useLanguage();

  const formatJson = () => {
    if (!input.trim()) {
      toast.error(t("jsonRequired"));
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setIsValid(true);
      toast.success(t("jsonFormatted"));
    } catch (error) {
      setIsValid(false);
      toast.error(t("jsonInvalidError") + (error as Error).message);
    }
  };

  const minifyJson = () => {
    if (!input.trim()) {
      toast.error(t("jsonRequired"));
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setIsValid(true);
      toast.success(t("jsonMinified"));
    } catch (error) {
      setIsValid(false);
      toast.error(t("jsonInvalidError") + (error as Error).message);
    }
  };

  const validateJson = () => {
    if (!input.trim()) {
      toast.error(t("jsonRequired"));
      return;
    }

    try {
      JSON.parse(input);
      setIsValid(true);
      toast.success(t("jsonValid"));
    } catch (error) {
      setIsValid(false);
      toast.error(t("jsonInvalidError") + (error as Error).message);
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
    "name": "John Doe",
    "age": 30,
    "city": "Seoul",
    "hobbies": ["reading", "swimming", "coding"],
    "address": {
      "street": "123 Main St",
      "zipCode": "12345"
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
          {t("prettifyButton")}
        </Button>
        <Button onClick={minifyJson} variant="outline">
          <Minimize className="w-4 h-4 mr-2" />
          {t("minifyButton")}
        </Button>
        <Button onClick={validateJson} variant="outline">
          <Braces className="w-4 h-4 mr-2" />
          {t("validateButton")}
        </Button>
        <Button onClick={loadSample} variant="outline" size="sm">
          {t("loadSampleButton")}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label>{t("jsonInputLabel")}</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("jsonInputPlaceholder")}
            className={`min-h-[400px] font-mono text-sm ${
              !isValid && input ? 'border-red-300 bg-red-50' : ''
            }`}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>{t("jsonOutputLabel")}</Label>
            {output && (
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                {t("copyButton")}
              </Button>
            )}
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder={t("jsonOutputPlaceholder")}
            className="min-h-[400px] font-mono text-sm bg-slate-50"
          />
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <Label className="text-sm font-medium text-green-800 mb-2 block">{t("featuresTitle")}</Label>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• <strong>{t("prettifyButton")}</strong>: {t("prettifyFeature")}</li>
          <li>• <strong>{t("minifyButton")}</strong>: {t("minifyFeature")}</li>
          <li>• <strong>{t("validateButton")}</strong>: {t("validateFeature")}</li>
          <li>• <strong>{t("loadSampleButton")}</strong>: {t("sampleFeature")}</li>
        </ul>
      </div>
    </div>
  );
};

export default JsonPrettifier;

import { useState } from "react";
import { Copy, CaseUpper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const CaseConverter = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState({
    camelCase: "",
    PascalCase: "",
    snake_case: "",
    kebab_case: "",
    UPPER_CASE: "",
    lower_case: "",
    Title_Case: ""
  });
  const { t } = useLanguage();

  const convertCases = () => {
    if (!input.trim()) {
      toast.error(t("caseconverter_required"));
      return;
    }

    const text = input.trim();

    const words = text
      .split(/[\s_-]+/)
      .map(word => word.toLowerCase())
      .filter(word => word.length > 0);

    const converted = {
      camelCase: words.map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      ).join(''),

      PascalCase: words.map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(''),

      snake_case: words.join('_'),

      kebab_case: words.join('-'),

      UPPER_CASE: words.join('_').toUpperCase(),

      lower_case: words.join('_').toLowerCase(),

      Title_Case: words.map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    };

    setResults(converted);
    toast.success(t("caseconverter_converted"));
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t("copySuccess"));
    } catch (error) {
      toast.error(t("copyError"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="input">{t("caseconverter_input_label")}</Label>
        <div className="space-y-2">
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("caseconverter_input_placeholder")}
            className="min-h-[100px]"
          />
          <Button onClick={convertCases}>
            <CaseUpper className="w-4 h-4 mr-2" />
            {t("caseconverter_convert_button")}
          </Button>
        </div>
      </div>

      {Object.values(results).some(value => value) && (
        <div className="space-y-4">
          <Label className="text-lg font-semibold">{t("caseconverter_result_label")}</Label>
          <div className="space-y-3">
            {Object.entries(results).map(([caseType, value]) => (
              <div key={caseType} className="space-y-2">
                <Label className="text-sm font-medium text-slate-600">{caseType}</Label>
                <div className="flex space-x-2">
                  <div className="flex-1 p-3 bg-slate-50 rounded-md border font-mono text-sm">
                    {value || "-"}
                  </div>
                  {value && (
                    <Button variant="outline" size="sm" onClick={() => handleCopy(value)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <Label className="text-sm font-medium text-blue-800 mb-2 block">{t("caseconverter_supported_title")}</Label>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• camelCase: {t("caseconverter_camel_description")}</li>
          <li>• PascalCase: {t("caseconverter_pascal_description")}</li>
          <li>• snake_case: {t("caseconverter_snake_description")}</li>
          <li>• kebab-case: {t("caseconverter_kebab_description")}</li>
          <li>• UPPER_CASE: {t("caseconverter_upper_description")}</li>
          <li>• Title Case: {t("caseconverter_title_description")}</li>
        </ul>
      </div>
    </div>
  );
};

export default CaseConverter;
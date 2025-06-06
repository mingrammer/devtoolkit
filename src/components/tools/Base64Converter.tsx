import { useState } from "react";
import { Copy, Binary, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const Base64Converter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const { t } = useLanguage();

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error(t("base64converter_required"));
      return;
    }

    try {
      if (mode === "encode") {
        const encoded = btoa(input);
        setOutput(encoded);
        toast.success(t("base64converter_encoded"));
      } else {
        const decoded = atob(input);
        setOutput(decoded);
        toast.success(t("base64converter_decoded"));
      }
    } catch (error) {
      toast.error(t("base64converter_invalid_format"));
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t("copySuccess"));
    } catch (error) {
      toast.error(t("copyError"));
    }
  };

  const toggleMode = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput(output);
    setOutput("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Label className="text-lg font-semibold">
            {mode === "encode" ? `${t("input")} → Base64` : `Base64 → ${t("output")}`}
          </Label>
          <Button variant="outline" size="sm" onClick={toggleMode}>
            <ArrowUpDown className="w-4 h-4 mr-2" />
            {t("base64converter_toggle_mode")}
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 입력 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="input">
              {mode === "encode"
                ? t("base64converter_original_text")
                : t("base64converter_encoded_text")}
            </Label>
          </div>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "encode"
                ? t("base64converter_encode_placeholder")
                : t("base64converter_decode_placeholder")
            }
            className="min-h-[200px] font-mono text-sm"
          />
        </div>

        {/* 출력 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>
              {mode === "encode"
                ? `Base64 ${t("result")}`
                : t("result")}
            </Label>
            {output && (
              <Button variant="outline" size="sm" onClick={() => handleCopy(output)}>
                <Copy className="w-4 h-4 mr-2" />
                {t("copy")}
              </Button>
            )}
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder={t("base64converter_result_placeholder")}
            className="min-h-[200px] font-mono text-sm bg-slate-50"
          />
        </div>
      </div>

      <Button onClick={handleConvert} className="w-full">
        <Binary className="w-4 h-4 mr-2" />
        {mode === "encode"
          ? t("base64converter_encode_button")
          : t("base64converter_decode_button")}
      </Button>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">{t("base64converter_what")}</h3>
        <p className="text-gray-700 mb-4">{t("base64converter_info")}</p>
        <div className="space-y-2">
          <h4 className="font-medium">{t("base64converter_features")}</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>{t("base64converter_feature_1")}</li>
            <li>{t("base64converter_feature_2")}</li>
            <li>{t("base64converter_feature_3")}</li>
            <li>{t("base64converter_feature_4")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Base64Converter;
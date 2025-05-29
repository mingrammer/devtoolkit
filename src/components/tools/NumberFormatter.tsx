import { useState } from "react";
import { Hash, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const NumberFormatter = () => {
  const { t } = useLanguage();
  const [input, setInput] = useState("");
  const [locale, setLocale] = useState("ko-KR");
  const [format, setFormat] = useState("number");
  const [result, setResult] = useState("");

  const formatNumber = () => {
    if (!input.trim()) {
      toast.error(t("numberformatter_required"));
      return;
    }

    try {
      const number = parseFloat(input.replace(/,/g, ""));
      if (isNaN(number)) {
        throw new Error("Invalid number");
      }

      let formatted = "";
      
      switch (format) {
        case "number":
          formatted = new Intl.NumberFormat(locale).format(number);
          break;
        case "currency":
          formatted = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: locale === 'ko-KR' ? 'KRW' : 'USD'
          }).format(number);
          break;
        case "percent":
          formatted = new Intl.NumberFormat(locale, {
            style: 'percent',
            minimumFractionDigits: 2
          }).format(number / 100);
          break;
        case "scientific":
          formatted = number.toExponential();
          break;
        case "compact":
          formatted = new Intl.NumberFormat(locale, {
            notation: 'compact'
          }).format(number);
          break;
        case "bytes":
          const units = ['B', 'KB', 'MB', 'GB', 'TB'];
          let size = number;
          let unitIndex = 0;
          while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
          }
          formatted = `${size.toFixed(2)} ${units[unitIndex]}`;
          break;
        default:
          formatted = number.toString();
      }

      setResult(formatted);
      toast.success(t("numberformatter_formatted"));
    } catch (error) {
      toast.error(t("numberformatter_invalid_number"));
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      toast.success(t("copySuccess"));
    } catch (error) {
      toast.error(t("copyError"));
    }
  };

  const locales = [
    { value: "ko-KR", label: "한국어 (ko-KR)" },
    { value: "en-US", label: "English (en-US)" },
    { value: "ja-JP", label: "日本語 (ja-JP)" },
    { value: "zh-CN", label: "中文 (zh-CN)" },
    { value: "de-DE", label: "Deutsch (de-DE)" },
    { value: "fr-FR", label: "Français (fr-FR)" }
  ];

  const formats = [
    { value: "number", label: t("numberformatter_standard") },
    { value: "currency", label: t("numberformatter_currency") },
    { value: "percent", label: t("numberformatter_percent") },
    { value: "scientific", label: t("numberformatter_scientific") },
    { value: "compact", label: t("numberformatter_notation_compact") },
    { value: "bytes", label: "Bytes" }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input">{t("numberformatter_input")}</Label>
          <Input
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("numberformatter_input_placeholder")}
            className="font-mono"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t("numberformatter_locale")}</Label>
            <Select value={locale} onValueChange={setLocale}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locales.map((loc) => (
                  <SelectItem key={loc.value} value={loc.value}>
                    {loc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t("numberformatter_standard")}</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {formats.map((fmt) => (
                  <SelectItem key={fmt.value} value={fmt.value}>
                    {fmt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={formatNumber} className="w-full">
          <Hash className="w-4 h-4 mr-2" />
          {t("numberformatter_apply")}
        </Button>
      </div>

      {result && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>{t("numberformatter_result")}</Label>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              {t("copy")}
            </Button>
          </div>
          <Input
            value={result}
            readOnly
            className="font-mono bg-slate-50 text-lg"
          />
        </div>
      )}
    </div>
  );
};

export default NumberFormatter;

import { useState } from "react";
import { Copy, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const LocaleConverter = () => {
  const { t } = useLanguage();
  const [inputLocale, setInputLocale] = useState("");
  const [fromFormat, setFromFormat] = useState("underscore");
  const [toFormat, setToFormat] = useState("hyphen");
  const [result, setResult] = useState("");

  const localeMap = {
    'en_US': { country: 'United States', language: 'English', hyphen: 'en-US' },
    'ko_KR': { country: 'South Korea', language: 'Korean', hyphen: 'ko-KR' },
    'ja_JP': { country: 'Japan', language: 'Japanese', hyphen: 'ja-JP' },
    'zh_CN': { country: 'China', language: 'Chinese (Simplified)', hyphen: 'zh-CN' },
    'zh_TW': { country: 'Taiwan', language: 'Chinese (Traditional)', hyphen: 'zh-TW' },
    'es_ES': { country: 'Spain', language: 'Spanish', hyphen: 'es-ES' },
    'fr_FR': { country: 'France', language: 'French', hyphen: 'fr-FR' },
    'de_DE': { country: 'Germany', language: 'German', hyphen: 'de-DE' },
    'it_IT': { country: 'Italy', language: 'Italian', hyphen: 'it-IT' },
    'pt_BR': { country: 'Brazil', language: 'Portuguese', hyphen: 'pt-BR' },
    'ru_RU': { country: 'Russia', language: 'Russian', hyphen: 'ru-RU' },
    'ar_SA': { country: 'Saudi Arabia', language: 'Arabic', hyphen: 'ar-SA' },
  };

  const convertLocale = () => {
    if (!inputLocale.trim()) {
      toast.error(t("localeconverter_required"));
      return;
    }

    try {
      let normalized = inputLocale.trim();

      // Normalize input to underscore format
      if (fromFormat === "hyphen") {
        normalized = normalized.replace('-', '_');
      }

      const localeInfo = localeMap[normalized as keyof typeof localeMap];
      if (!localeInfo) {
        toast.error(t("localeconverter_unsupported"));
        return;
      }

      let converted = "";
      switch (toFormat) {
        case "underscore":
          converted = normalized;
          break;
        case "hyphen":
          converted = localeInfo.hyphen;
          break;
        case "full":
          converted = `${localeInfo.language} (${localeInfo.country})`;
          break;
        case "language":
          converted = localeInfo.language;
          break;
        case "country":
          converted = localeInfo.country;
          break;
      }

      setResult(converted);
      toast.success(t("localeconverter_converted"));
    } catch (error) {
      toast.error(t("localeconverter_conversion_error"));
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      toast.success(t("copySuccess"));
    } catch (error) {
      toast.error(t("copyError"));
    }
  };

  const commonLocales = ['en_US', 'ko_KR', 'ja_JP', 'zh_CN', 'es_ES', 'fr_FR', 'de_DE'];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t("localeconverter_from_format")}</Label>
          <Select value={fromFormat} onValueChange={setFromFormat}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="underscore">{t("localeconverter_underscore")}</SelectItem>
              <SelectItem value="hyphen">{t("localeconverter_hyphen")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>{t("localeconverter_to_format")}</Label>
          <Select value={toFormat} onValueChange={setToFormat}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="underscore">{t("localeconverter_underscore")}</SelectItem>
              <SelectItem value="hyphen">{t("localeconverter_hyphen")}</SelectItem>
              <SelectItem value="full">{t("localeconverter_full")}</SelectItem>
              <SelectItem value="language">{t("localeconverter_language_only")}</SelectItem>
              <SelectItem value="country">{t("localeconverter_country_only")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="input">{t("localeconverter_input")}</Label>
        <div className="flex space-x-2">
          <Input
            id="input"
            value={inputLocale}
            onChange={(e) => setInputLocale(e.target.value)}
            placeholder={
              fromFormat === "underscore"
                ? t("localeconverter_underscore_example")
                : t("localeconverter_hyphen_example")
            }
          />
          <Button onClick={convertLocale}>
            <Globe className="w-4 h-4 mr-2" />
            {t("localeconverter_convert")}
          </Button>
        </div>
      </div>

      {result && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>{t("localeconverter_result")}</Label>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              {t("localeconverter_copy_button")}
            </Button>
          </div>
          <Input value={result} readOnly className="font-mono" />
        </div>
      )}

      <div className="space-y-3">
        <Label>{t("localeconverter_common")}</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {commonLocales.map(locale => (
            <Button
              key={locale}
              variant="outline"
              size="sm"
              onClick={() =>
                setInputLocale(fromFormat === "hyphen" ? locale.replace('_', '-') : locale)
              }
              className="text-xs"
            >
              {locale}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocaleConverter; 
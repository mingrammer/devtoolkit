
import { useState } from "react";
import { Copy, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const LocaleConverter = () => {
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
      toast.error("로케일을 입력해주세요");
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
        toast.error("지원하지 않는 로케일입니다");
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
      toast.success("변환이 완료되었습니다");
    } catch (error) {
      toast.error("변환 중 오류가 발생했습니다");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      toast.success("클립보드에 복사되었습니다");
    } catch (error) {
      toast.error("복사 중 오류가 발생했습니다");
    }
  };

  const commonLocales = ['en_US', 'ko_KR', 'ja_JP', 'zh_CN', 'es_ES', 'fr_FR', 'de_DE'];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>입력 형식</Label>
          <Select value={fromFormat} onValueChange={setFromFormat}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="underscore">언더스코어 (en_US)</SelectItem>
              <SelectItem value="hyphen">하이픈 (en-US)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>출력 형식</Label>
          <Select value={toFormat} onValueChange={setToFormat}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="underscore">언더스코어 (en_US)</SelectItem>
              <SelectItem value="hyphen">하이픈 (en-US)</SelectItem>
              <SelectItem value="full">전체 (English (United States))</SelectItem>
              <SelectItem value="language">언어명 (English)</SelectItem>
              <SelectItem value="country">국가명 (United States)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="input">로케일 입력</Label>
        <div className="flex space-x-2">
          <Input
            id="input"
            value={inputLocale}
            onChange={(e) => setInputLocale(e.target.value)}
            placeholder={fromFormat === "underscore" ? "예: en_US" : "예: en-US"}
          />
          <Button onClick={convertLocale}>
            <Globe className="w-4 h-4 mr-2" />
            변환
          </Button>
        </div>
      </div>

      {result && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>변환 결과</Label>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              복사
            </Button>
          </div>
          <Input value={result} readOnly className="font-mono" />
        </div>
      )}

      <div className="space-y-3">
        <Label>자주 사용되는 로케일</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {commonLocales.map(locale => (
            <Button
              key={locale}
              variant="outline"
              size="sm"
              onClick={() => setInputLocale(fromFormat === "hyphen" ? locale.replace('_', '-') : locale)}
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

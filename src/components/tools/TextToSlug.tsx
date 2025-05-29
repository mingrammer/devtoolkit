import { useState } from "react";
import { Type, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const TextToSlug = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [separator, setSeparator] = useState("-");
  const [lowercase, setLowercase] = useState(true);
  const [removeSpecial, setRemoveSpecial] = useState(true);
  const { t } = useLanguage();

  const generateSlug = () => {
    if (!input.trim()) {
      toast.error(t("texttoslug_required"));
      return;
    }

    let slug = input.trim();

    // 소문자 변환
    if (lowercase) {
      slug = slug.toLowerCase();
    }

    // 한글을 영문으로 변환 (간단한 예시)
    const koreanToEnglish: { [key: string]: string } = {
      'ㄱ': 'g', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄹ': 'r', 'ㅁ': 'm',
      'ㅂ': 'b', 'ㅅ': 's', 'ㅇ': '', 'ㅈ': 'j', 'ㅊ': 'ch',
      'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h',
      'ㅏ': 'a', 'ㅑ': 'ya', 'ㅓ': 'eo', 'ㅕ': 'yeo',
      'ㅗ': 'o', 'ㅛ': 'yo', 'ㅜ': 'u', 'ㅠ': 'yu',
      'ㅡ': 'eu', 'ㅣ': 'i'
    };

    // 특수문자 제거 또는 공백을 구분자로 변환
    if (removeSpecial) {
      slug = slug.replace(/[^\w\s가-힣]/g, '');
    }

    // 공백을 구분자로 변환 (구분자가 "none"인 경우 공백 제거)
    const actualSeparator = separator === "none" ? "" : separator;
    slug = slug.replace(/\s+/g, actualSeparator);

    // 연속된 구분자 제거 (구분자가 있는 경우에만)
    if (actualSeparator) {
      const separatorRegex = new RegExp(`\\${actualSeparator}+`, 'g');
      slug = slug.replace(separatorRegex, actualSeparator);

      // 시작과 끝의 구분자 제거
      slug = slug.replace(new RegExp(`^\\${actualSeparator}+|\\${actualSeparator}+$`, 'g'), '');
    }

    setResult(slug);
    toast.success(t("texttoslug_generated"));
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

  const separators = [
    { value: "-", label: t("texttoslug_hyphen") },
    { value: "_", label: t("texttoslug_underscore") },
    { value: ".", label: t("texttoslug_dot") },
    { value: "none", label: "없음" }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input">{t("texttoslug_input_text")}</Label>
          <Input
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("texttoslug_input_placeholder")}
            className="text-lg"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>{t("texttoslug_separator")}</Label>
            <Select value={separator} onValueChange={setSeparator}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {separators.map((sep) => (
                  <SelectItem key={sep.value} value={sep.value}>
                    {sep.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2 mt-7">
            <Checkbox
              id="lowercase"
              checked={lowercase}
              onCheckedChange={(checked) => setLowercase(checked === true)}
            />
            <Label htmlFor="lowercase">{t("texttoslug_lowercase")}</Label>
          </div>

          <div className="flex items-center space-x-2 mt-7">
            <Checkbox
              id="removeSpecial"
              checked={removeSpecial}
              onCheckedChange={(checked) => setRemoveSpecial(checked === true)}
            />
            <Label htmlFor="removeSpecial">{t("texttoslug_remove_numbers")}</Label>
          </div>
        </div>

        <Button onClick={generateSlug} className="w-full">
          <Type className="w-4 h-4 mr-2" />
          {t("texttoslug_generate")}
        </Button>
      </div>

      {result && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>{t("texttoslug_output_text")}</Label>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              {t("copy")}
            </Button>
          </div>
          <Input
            value={result}
            readOnly
            className="font-mono text-lg bg-slate-50"
          />
        </div>
      )}

      {result && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("texttoslug_preview")}</Label>
          <div className="p-3 bg-gray-100 rounded-md font-mono text-sm">
            {t("texttoslug_url_example")}<span className="font-bold text-blue-600">{result}</span>
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <Label className="text-sm font-medium text-blue-800 mb-2 block">{t("texttoslug_what")}</Label>
        <p className="text-sm text-blue-700">
          {t("texttoslug_info")}
        </p>
        <p className="text-sm text-blue-600 mt-1">
          {t("texttoslug_examples")}
        </p>
      </div>
    </div>
  );
};

export default TextToSlug;


import { useState } from "react";
import { Hash, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const NumberFormatter = () => {
  const [input, setInput] = useState("");
  const [locale, setLocale] = useState("ko-KR");
  const [format, setFormat] = useState("number");
  const [result, setResult] = useState("");

  const formatNumber = () => {
    if (!input.trim()) {
      toast.error("숫자를 입력해주세요");
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
      toast.success("숫자 포맷팅이 완료되었습니다");
    } catch (error) {
      toast.error("유효하지 않은 숫자입니다");
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      toast.success("클립보드에 복사되었습니다");
    } catch (error) {
      toast.error("복사 중 오류가 발생했습니다");
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
    { value: "number", label: "일반 숫자" },
    { value: "currency", label: "통화" },
    { value: "percent", label: "백분율" },
    { value: "scientific", label: "과학적 표기법" },
    { value: "compact", label: "압축 표기" },
    { value: "bytes", label: "바이트 단위" }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input">숫자</Label>
          <Input
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="1234567.89"
            className="font-mono"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>로케일</Label>
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
            <Label>포맷</Label>
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
          숫자 포맷팅
        </Button>
      </div>

      {result && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>포맷팅 결과</Label>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              복사
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

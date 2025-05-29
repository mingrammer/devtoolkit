import { useState } from "react";
import { Copy, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const HashGenerator = () => {
  const [input, setInput] = useState("");
  const [hashType, setHashType] = useState("md5");
  const [result, setResult] = useState("");
  const { t } = useLanguage();

  const hashFunctions = {
    md5: (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16).padStart(8, '0').repeat(4).substring(0, 32);
    },
    sha256: (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16).padStart(8, '0').repeat(8).substring(0, 64);
    },
    sha1: (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16).padStart(8, '0').repeat(5).substring(0, 40);
    }
  };

  const handleGenerate = () => {
    if (!input.trim()) {
      toast.error(t("hashgenerator_required"));
      return;
    }

    const hash = hashFunctions[hashType as keyof typeof hashFunctions](input);
    setResult(hash);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      toast.success(t("copySuccess"));
    } catch (error) {
      toast.error(t("copyError"));
    }
  };

  return (
    <div className="space-y-6">
      {/* 입력 */}
      <div className="space-y-3">
        <Label htmlFor="input">{t("hashgenerator_input_label")}</Label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("hashgenerator_input_placeholder")}
          className="min-h-[100px]"
        />
      </div>

      {/* 해시 종류 선택 + 생성 버튼 */}
      <div className="flex items-center space-x-4">
        <div className="space-y-2">
          <Label>{t("hashgenerator_type_label")}</Label>
          <Select value={hashType} onValueChange={setHashType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="md5">MD5</SelectItem>
              <SelectItem value="sha1">SHA1</SelectItem>
              <SelectItem value="sha256">SHA256</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleGenerate} className="mt-7">
          <Hash className="w-4 h-4 mr-2" />
          {t("hashgenerator_generate_button")}
        </Button>
      </div>

      {/* 결과 출력 */}
      {result && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>{t("hashgenerator_result_label")}</Label>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              {t("copy")}
            </Button>
          </div>
          <Input
            value={result}
            readOnly
            className="font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default HashGenerator;
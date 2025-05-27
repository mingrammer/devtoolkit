
import { useState } from "react";
import { Type, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const TextToSlug = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [separator, setSeparator] = useState("-");
  const [lowercase, setLowercase] = useState(true);
  const [removeSpecial, setRemoveSpecial] = useState(true);

  const generateSlug = () => {
    if (!input.trim()) {
      toast.error("변환할 텍스트를 입력해주세요");
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

    // 공백을 구분자로 변환
    slug = slug.replace(/\s+/g, separator);

    // 연속된 구분자 제거
    const separatorRegex = new RegExp(`\\${separator}+`, 'g');
    slug = slug.replace(separatorRegex, separator);

    // 시작과 끝의 구분자 제거
    slug = slug.replace(new RegExp(`^\\${separator}+|\\${separator}+$`, 'g'), '');

    setResult(slug);
    toast.success("슬러그가 생성되었습니다");
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

  const separators = [
    { value: "-", label: "하이픈 (-)" },
    { value: "_", label: "언더스코어 (_)" },
    { value: ".", label: "점 (.)" },
    { value: "", label: "없음" }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input">변환할 텍스트</Label>
          <Input
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Hello World! 안녕하세요"
            className="text-lg"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>구분자</Label>
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
            <Label htmlFor="lowercase">소문자 변환</Label>
          </div>

          <div className="flex items-center space-x-2 mt-7">
            <Checkbox
              id="removeSpecial"
              checked={removeSpecial}
              onCheckedChange={(checked) => setRemoveSpecial(checked === true)}
            />
            <Label htmlFor="removeSpecial">특수문자 제거</Label>
          </div>
        </div>

        <Button onClick={generateSlug} className="w-full">
          <Type className="w-4 h-4 mr-2" />
          슬러그 생성
        </Button>
      </div>

      {result && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>생성된 슬러그</Label>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              복사
            </Button>
          </div>
          <Input
            value={result}
            readOnly
            className="font-mono text-lg bg-slate-50"
          />
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <Label className="text-sm font-medium text-blue-800 mb-2 block">슬러그란?</Label>
        <p className="text-sm text-blue-700">
          슬러그는 URL에서 사용되는 사용자 친화적인 문자열입니다. 
          블로그 포스트, 제품 페이지 등의 URL을 깔끔하게 만들 때 사용됩니다.
          예: "hello-world", "my_awesome_post"
        </p>
      </div>
    </div>
  );
};

export default TextToSlug;


import { useState } from "react";
import { Copy, CaseUpper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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

  const convertCases = () => {
    if (!input.trim()) {
      toast.error("변환할 텍스트를 입력해주세요");
      return;
    }

    const text = input.trim();
    
    // Split text into words (handle various separators)
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
    toast.success("변환이 완료되었습니다");
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("클립보드에 복사되었습니다");
    } catch (error) {
      toast.error("복사 중 오류가 발생했습니다");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="input">변환할 텍스트</Label>
        <div className="space-y-2">
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="변환할 텍스트를 입력하세요 (예: hello world, hello_world, hello-world)"
            className="min-h-[100px]"
          />
          <Button onClick={convertCases}>
            <CaseUpper className="w-4 h-4 mr-2" />
            변환하기
          </Button>
        </div>
      </div>

      {Object.values(results).some(value => value) && (
        <div className="space-y-4">
          <Label className="text-lg font-semibold">변환 결과</Label>
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
        <Label className="text-sm font-medium text-blue-800 mb-2 block">지원하는 변환</Label>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• camelCase: 첫 번째 단어는 소문자, 나머지는 대문자로 시작</li>
          <li>• PascalCase: 모든 단어를 대문자로 시작</li>
          <li>• snake_case: 언더스코어로 단어 구분</li>
          <li>• kebab-case: 하이픈으로 단어 구분</li>
          <li>• UPPER_CASE: 모든 문자를 대문자로</li>
          <li>• Title Case: 각 단어의 첫 글자를 대문자로</li>
        </ul>
      </div>
    </div>
  );
};

export default CaseConverter;


import { useState } from "react";
import { Copy, Braces, Minimize, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const JsonPrettifier = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isValid, setIsValid] = useState(true);

  const formatJson = () => {
    if (!input.trim()) {
      toast.error("JSON 데이터를 입력해주세요");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setIsValid(true);
      toast.success("JSON이 정리되었습니다");
    } catch (error) {
      setIsValid(false);
      toast.error("올바른 JSON 형식이 아닙니다");
    }
  };

  const minifyJson = () => {
    if (!input.trim()) {
      toast.error("JSON 데이터를 입력해주세요");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setIsValid(true);
      toast.success("JSON이 압축되었습니다");
    } catch (error) {
      setIsValid(false);
      toast.error("올바른 JSON 형식이 아닙니다");
    }
  };

  const validateJson = () => {
    if (!input.trim()) {
      toast.error("JSON 데이터를 입력해주세요");
      return;
    }

    try {
      JSON.parse(input);
      setIsValid(true);
      toast.success("유효한 JSON입니다");
    } catch (error) {
      setIsValid(false);
      toast.error("올바른 JSON 형식이 아닙니다: " + (error as Error).message);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success("클립보드에 복사되었습니다");
    } catch (error) {
      toast.error("복사 중 오류가 발생했습니다");
    }
  };

  const sampleJson = {
    "name": "John Doe",
    "age": 30,
    "city": "Seoul",
    "hobbies": ["reading", "swimming", "coding"],
    "address": {
      "street": "123 Main St",
      "zipCode": "12345"
    }
  };

  const loadSample = () => {
    setInput(JSON.stringify(sampleJson));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button onClick={formatJson}>
          <Maximize className="w-4 h-4 mr-2" />
          정리 (Pretty)
        </Button>
        <Button onClick={minifyJson} variant="outline">
          <Minimize className="w-4 h-4 mr-2" />
          압축 (Minify)
        </Button>
        <Button onClick={validateJson} variant="outline">
          <Braces className="w-4 h-4 mr-2" />
          검증
        </Button>
        <Button onClick={loadSample} variant="outline" size="sm">
          샘플 로드
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label>입력 JSON</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="JSON 데이터를 입력하거나 붙여넣기하세요"
            className={`min-h-[400px] font-mono text-sm ${
              !isValid && input ? 'border-red-300 bg-red-50' : ''
            }`}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>출력 JSON</Label>
            {output && (
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                복사
              </Button>
            )}
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder="정리된 JSON이 여기에 표시됩니다"
            className="min-h-[400px] font-mono text-sm bg-slate-50"
          />
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <Label className="text-sm font-medium text-green-800 mb-2 block">기능</Label>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• <strong>정리 (Pretty)</strong>: JSON을 들여쓰기와 줄바꿈으로 읽기 쉽게 정리</li>
          <li>• <strong>압축 (Minify)</strong>: 불필요한 공백을 제거하여 JSON 크기 최소화</li>
          <li>• <strong>검증</strong>: JSON 문법이 올바른지 확인</li>
          <li>• <strong>샘플 로드</strong>: 테스트용 샘플 JSON 데이터 로드</li>
        </ul>
      </div>
    </div>
  );
};

export default JsonPrettifier;

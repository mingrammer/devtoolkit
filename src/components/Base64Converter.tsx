
import { useState } from "react";
import { Copy, Binary, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Base64Converter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error("입력 텍스트를 입력해주세요");
      return;
    }

    try {
      if (mode === "encode") {
        const encoded = btoa(input);
        setOutput(encoded);
        toast.success("Base64 인코딩이 완료되었습니다");
      } else {
        const decoded = atob(input);
        setOutput(decoded);
        toast.success("Base64 디코딩이 완료되었습니다");
      }
    } catch (error) {
      toast.error("변환 중 오류가 발생했습니다. 올바른 형식인지 확인해주세요.");
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("클립보드에 복사되었습니다");
    } catch (error) {
      toast.error("복사 중 오류가 발생했습니다");
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
            {mode === "encode" ? "텍스트 → Base64" : "Base64 → 텍스트"}
          </Label>
          <Button variant="outline" size="sm" onClick={toggleMode}>
            <ArrowUpDown className="w-4 h-4 mr-2" />
            변환 방향 바꾸기
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 입력 */}
        <div className="space-y-3">
          <Label htmlFor="input">
            {mode === "encode" ? "원본 텍스트" : "Base64 인코딩된 텍스트"}
          </Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "encode" 
                ? "인코딩할 텍스트를 입력하세요" 
                : "디코딩할 Base64 텍스트를 입력하세요"
            }
            className="min-h-[200px] font-mono text-sm"
          />
        </div>

        {/* 출력 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>
              {mode === "encode" ? "Base64 인코딩 결과" : "디코딩 결과"}
            </Label>
            {output && (
              <Button variant="outline" size="sm" onClick={() => handleCopy(output)}>
                <Copy className="w-4 h-4 mr-2" />
                복사
              </Button>
            )}
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder="변환 결과가 여기에 표시됩니다"
            className="min-h-[200px] font-mono text-sm bg-slate-50"
          />
        </div>
      </div>

      <Button onClick={handleConvert} className="w-full">
        <Binary className="w-4 h-4 mr-2" />
        {mode === "encode" ? "Base64로 인코딩" : "Base64에서 디코딩"}
      </Button>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <Label className="text-sm font-medium text-blue-800 mb-2 block">Base64란?</Label>
        <p className="text-sm text-blue-700">
          Base64는 8비트 이진 데이터를 ASCII 문자열로 변환하는 인코딩 방식입니다. 
          이메일, URL, 웹 개발 등에서 바이너리 데이터를 안전하게 전송하기 위해 사용됩니다.
        </p>
      </div>
    </div>
  );
};

export default Base64Converter;

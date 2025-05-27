
import { useState } from "react";
import { Code, ArrowUpDown, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const EscapeUnescape = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"escape" | "unescape">("escape");
  const [type, setType] = useState("html");

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error("변환할 텍스트를 입력해주세요");
      return;
    }

    try {
      let result = "";
      
      if (mode === "escape") {
        switch (type) {
          case "html":
            result = input
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#x27;");
            break;
          case "url":
            result = encodeURIComponent(input);
            break;
          case "javascript":
            result = input
              .replace(/\\/g, "\\\\")
              .replace(/"/g, '\\"')
              .replace(/'/g, "\\'")
              .replace(/\n/g, "\\n")
              .replace(/\r/g, "\\r")
              .replace(/\t/g, "\\t");
            break;
          case "json":
            result = JSON.stringify(input);
            break;
          case "xml":
            result = input
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&apos;");
            break;
          case "csv":
            result = input.includes(',') || input.includes('"') || input.includes('\n') 
              ? `"${input.replace(/"/g, '""')}"` 
              : input;
            break;
        }
      } else {
        switch (type) {
          case "html":
            result = input
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&quot;/g, '"')
              .replace(/&#x27;/g, "'");
            break;
          case "url":
            result = decodeURIComponent(input);
            break;
          case "javascript":
            result = input
              .replace(/\\"/g, '"')
              .replace(/\\'/g, "'")
              .replace(/\\n/g, "\n")
              .replace(/\\r/g, "\r")
              .replace(/\\t/g, "\t")
              .replace(/\\\\/g, "\\");
            break;
          case "json":
            result = JSON.parse(input);
            break;
          case "xml":
            result = input
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&quot;/g, '"')
              .replace(/&apos;/g, "'");
            break;
          case "csv":
            result = input.startsWith('"') && input.endsWith('"')
              ? input.slice(1, -1).replace(/""/g, '"')
              : input;
            break;
        }
      }

      setOutput(result);
      toast.success(`${mode === "escape" ? "이스케이프" : "언이스케이프"}가 완료되었습니다`);
    } catch (error) {
      toast.error("변환 중 오류가 발생했습니다");
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
    setMode(mode === "escape" ? "unescape" : "escape");
    setInput(output);
    setOutput("");
  };

  const types = [
    { value: "html", label: "HTML" },
    { value: "url", label: "URL" },
    { value: "javascript", label: "JavaScript" },
    { value: "json", label: "JSON" },
    { value: "xml", label: "XML" },
    { value: "csv", label: "CSV" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Label className="text-lg font-semibold">
            {mode === "escape" ? "이스케이프" : "언이스케이프"}
          </Label>
          <Button variant="outline" size="sm" onClick={toggleMode}>
            <ArrowUpDown className="w-4 h-4 mr-2" />
            모드 변경
          </Button>
        </div>
        <div className="space-y-2">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {types.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="input">
            {mode === "escape" ? "원본 텍스트" : "이스케이프된 텍스트"}
          </Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "escape" 
                ? "이스케이프할 텍스트를 입력하세요" 
                : "언이스케이프할 텍스트를 입력하세요"
            }
            className="min-h-[200px] font-mono text-sm"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>
              {mode === "escape" ? "이스케이프 결과" : "언이스케이프 결과"}
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
        <Code className="w-4 h-4 mr-2" />
        {mode === "escape" ? "이스케이프" : "언이스케이프"}
      </Button>
    </div>
  );
};

export default EscapeUnescape;

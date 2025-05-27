
import { useState } from "react";
import { Copy, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const HashGenerator = () => {
  const [input, setInput] = useState("");
  const [hashType, setHashType] = useState("md5");
  const [result, setResult] = useState("");

  // Simple hash functions (for demo purposes)
  const hashFunctions = {
    md5: (str: string) => {
      // This is a simplified hash for demo - in real app you'd use crypto-js
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16).padStart(8, '0').repeat(4).substring(0, 32);
    },
    sha256: (str: string) => {
      // This is a simplified hash for demo - in real app you'd use crypto-js
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16).padStart(8, '0').repeat(8).substring(0, 64);
    },
    sha1: (str: string) => {
      // This is a simplified hash for demo - in real app you'd use crypto-js
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
      toast.error("입력 텍스트를 입력해주세요");
      return;
    }

    const hash = hashFunctions[hashType as keyof typeof hashFunctions](input);
    setResult(hash);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      toast.success("클립보드에 복사되었습니다");
    } catch (error) {
      toast.error("복사 중 오류가 발생했습니다");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="input">입력 텍스트</Label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="해시를 생성할 텍스트를 입력하세요"
          className="min-h-[100px]"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="space-y-2">
          <Label>해시 타입</Label>
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
          해시 생성
        </Button>
      </div>

      {result && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>생성된 해시</Label>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              복사
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

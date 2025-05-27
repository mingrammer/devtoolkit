
import { useState } from "react";
import { Copy, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const RegexTester = () => {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState("");

  const handleTest = () => {
    if (!pattern.trim()) {
      toast.error("정규식 패턴을 입력해주세요");
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const allMatches: RegExpMatchArray[] = [];
      
      if (flags.includes('g')) {
        let match;
        while ((match = regex.exec(testString)) !== null) {
          allMatches.push(match);
          if (match.index === regex.lastIndex) {
            break;
          }
        }
      } else {
        const match = testString.match(regex);
        if (match) {
          allMatches.push(match);
        }
      }

      setMatches(allMatches);
      setError("");
      toast.success(`${allMatches.length}개의 매치를 찾았습니다`);
    } catch (err) {
      setError((err as Error).message);
      setMatches([]);
      toast.error("정규식 패턴에 오류가 있습니다");
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

  const commonPatterns = [
    { name: "이메일", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
    { name: "전화번호", pattern: "\\d{3}-\\d{4}-\\d{4}" },
    { name: "URL", pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)" },
    { name: "IP 주소", pattern: "\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b" },
    { name: "날짜 (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}" },
    { name: "시간 (HH:MM)", pattern: "\\d{2}:\\d{2}" }
  ];

  const highlightMatches = (text: string, matches: RegExpMatchArray[]) => {
    if (matches.length === 0) return text;

    let highlightedText = text;
    let offset = 0;

    matches.forEach((match, index) => {
      if (match.index !== undefined) {
        const start = match.index + offset;
        const end = start + match[0].length;
        const highlighted = `<mark class="bg-yellow-200 px-1 rounded">${match[0]}</mark>`;
        highlightedText = highlightedText.slice(0, start) + highlighted + highlightedText.slice(end);
        offset += highlighted.length - match[0].length;
      }
    });

    return highlightedText;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pattern">정규식 패턴</Label>
            <Input
              id="pattern"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="정규식 패턴을 입력하세요"
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="flags">플래그</Label>
            <Input
              id="flags"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="g, i, m 등"
              className="font-mono"
            />
          </div>
        </div>

        <Button onClick={handleTest}>
          <Search className="w-4 h-4 mr-2" />
          테스트 실행
        </Button>

        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <Label htmlFor="testString">테스트 문자열</Label>
        <Textarea
          id="testString"
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="정규식을 테스트할 문자열을 입력하세요"
          className="min-h-[150px] font-mono text-sm"
        />
      </div>

      {testString && (
        <div className="space-y-3">
          <Label>매치 결과 (하이라이트)</Label>
          <div
            className="p-4 bg-slate-50 border rounded-md font-mono text-sm whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: highlightMatches(testString, matches)
            }}
          />
        </div>
      )}

      {matches.length > 0 && (
        <div className="space-y-3">
          <Label className="text-lg font-semibold">매치 상세 ({matches.length}개)</Label>
          <div className="space-y-2">
            {matches.map((match, index) => (
              <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-800">
                    매치 #{index + 1}: "{match[0]}"
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleCopy(match[0])}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  위치: {match.index} - {(match.index || 0) + match[0].length - 1}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <Label className="text-lg font-semibold">자주 사용하는 패턴</Label>
        <div className="grid md:grid-cols-2 gap-2">
          {commonPatterns.map((item, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="justify-start text-left"
              onClick={() => setPattern(item.pattern)}
            >
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-slate-500 font-mono">{item.pattern}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegexTester;

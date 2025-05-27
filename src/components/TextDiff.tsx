
import { useState } from "react";
import { FileText, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TextDiff = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diff, setDiff] = useState<any[]>([]);

  const calculateDiff = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    
    const result = [];
    const maxLength = Math.max(lines1.length, lines2.length);
    
    for (let i = 0; i < maxLength; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';
      
      if (line1 === line2) {
        result.push({ type: 'equal', line: line1, lineNum: i + 1 });
      } else if (line1 && line2) {
        result.push({ type: 'changed', line1, line2, lineNum: i + 1 });
      } else if (line1) {
        result.push({ type: 'removed', line: line1, lineNum: i + 1 });
      } else if (line2) {
        result.push({ type: 'added', line: line2, lineNum: i + 1 });
      }
    }
    
    setDiff(result);
  };

  const renderDiffLine = (item: any, index: number) => {
    const { type, line, line1, line2, lineNum } = item;
    
    switch (type) {
      case 'equal':
        return (
          <div key={index} className="flex">
            <div className="w-12 text-xs text-gray-500 text-right pr-2">{lineNum}</div>
            <div className="flex-1 font-mono text-sm bg-gray-50 px-2 py-1">{line}</div>
          </div>
        );
      case 'removed':
        return (
          <div key={index} className="flex">
            <div className="w-12 text-xs text-gray-500 text-right pr-2">{lineNum}</div>
            <div className="flex-1 font-mono text-sm bg-red-100 text-red-800 px-2 py-1">
              - {line}
            </div>
          </div>
        );
      case 'added':
        return (
          <div key={index} className="flex">
            <div className="w-12 text-xs text-gray-500 text-right pr-2">{lineNum}</div>
            <div className="flex-1 font-mono text-sm bg-green-100 text-green-800 px-2 py-1">
              + {line}
            </div>
          </div>
        );
      case 'changed':
        return (
          <div key={index}>
            <div className="flex">
              <div className="w-12 text-xs text-gray-500 text-right pr-2">{lineNum}</div>
              <div className="flex-1 font-mono text-sm bg-red-100 text-red-800 px-2 py-1">
                - {line1}
              </div>
            </div>
            <div className="flex">
              <div className="w-12 text-xs text-gray-500 text-right pr-2">{lineNum}</div>
              <div className="flex-1 font-mono text-sm bg-green-100 text-green-800 px-2 py-1">
                + {line2}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="text1">원본 텍스트</Label>
          <Textarea
            id="text1"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="원본 텍스트를 입력하세요"
            className="min-h-[200px] font-mono text-sm"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="text2">비교할 텍스트</Label>
          <Textarea
            id="text2"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="비교할 텍스트를 입력하세요"
            className="min-h-[200px] font-mono text-sm"
          />
        </div>
      </div>

      <Button onClick={calculateDiff} className="w-full">
        <GitCompare className="w-4 h-4 mr-2" />
        텍스트 비교
      </Button>

      {diff.length > 0 && (
        <div className="space-y-3">
          <Label className="text-lg font-semibold">비교 결과</Label>
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-200 rounded"></div>
                  <span>삭제된 줄</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-200 rounded"></div>
                  <span>추가된 줄</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-200 rounded"></div>
                  <span>동일한 줄</span>
                </div>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {diff.map((item, index) => renderDiffLine(item, index))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextDiff;

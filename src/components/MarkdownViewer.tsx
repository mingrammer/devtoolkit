
import { useState } from "react";
import { Copy, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const MarkdownViewer = () => {
  const [markdown, setMarkdown] = useState(`# 마크다운 예제

## 텍스트 스타일
**굵은 글씨**, *기울임*, \`코드\`

## 목록
- 항목 1
- 항목 2
  - 하위 항목

## 코드 블록
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## 링크와 이미지
[링크 텍스트](https://example.com)

## 테이블
| 제목1 | 제목2 |
|-------|-------|
| 내용1 | 내용2 |`);

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${type}이 클립보드에 복사되었습니다`);
    } catch (error) {
      toast.error("복사 중 오류가 발생했습니다");
    }
  };

  // 간단한 마크다운 파서 (실제 프로젝트에서는 marked나 remark 사용 권장)
  const parseMarkdown = (md: string) => {
    return md
      // 헤딩
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
      // 굵은 글씨
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      // 기울임
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // 인라인 코드
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
      // 링크
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
      // 코드 블록
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4"><code class="text-sm font-mono">$2</code></pre>')
      // 목록
      .replace(/^\- (.*$)/gim, '<li class="ml-4">• $1</li>')
      // 테이블 (간단한 구현)
      .replace(/\|(.+)\|/g, (match, content) => {
        const cells = content.split('|').map((cell: string) => cell.trim());
        return '<tr>' + cells.map((cell: string) => `<td class="border px-2 py-1">${cell}</td>`).join('') + '</tr>';
      })
      // 줄바꿈
      .replace(/\n/g, '<br>');
  };

  const sampleMarkdown = `# 샘플 마크다운 문서

## 소개
이것은 **마크다운** 문서의 예제입니다.

### 기능
- 제목과 부제목
- **굵은 글씨**와 *기울임*
- \`인라인 코드\`
- [링크](https://example.com)

### 코드 예제
\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

### 할 일 목록
- [x] 완료된 작업
- [ ] 진행 중인 작업
- [ ] 예정된 작업

> 이것은 인용문입니다.

---

마크다운을 사용하면 쉽게 문서를 작성할 수 있습니다!`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold">마크다운 편집기</Label>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => setMarkdown(sampleMarkdown)}>
            <FileText className="w-4 h-4 mr-2" />
            샘플 로드
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleCopy(markdown, "마크다운")}>
            <Copy className="w-4 h-4 mr-2" />
            복사
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 마크다운 입력 */}
        <div className="space-y-3">
          <Label htmlFor="markdown">마크다운 소스</Label>
          <Textarea
            id="markdown"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="마크다운을 입력하세요..."
            className="min-h-[400px] font-mono text-sm"
          />
        </div>

        {/* 미리보기 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>미리보기</Label>
            <Button variant="outline" size="sm" onClick={() => handleCopy(parseMarkdown(markdown), "HTML")}>
              <Copy className="w-4 h-4 mr-2" />
              HTML 복사
            </Button>
          </div>
          <div 
            className="min-h-[400px] p-4 bg-white border rounded-md prose prose-sm max-w-none overflow-auto"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
          />
        </div>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <Label className="text-sm font-medium text-purple-800 mb-2 block">마크다운 문법</Label>
        <div className="text-sm text-purple-700 space-y-1">
          <p><code className="bg-purple-100 px-1 rounded"># 제목</code> - 헤딩</p>
          <p><code className="bg-purple-100 px-1 rounded">**굵게**</code> - 굵은 글씨</p>
          <p><code className="bg-purple-100 px-1 rounded">*기울임*</code> - 기울임</p>
          <p><code className="bg-purple-100 px-1 rounded">`코드`</code> - 인라인 코드</p>
          <p><code className="bg-purple-100 px-1 rounded">- 목록</code> - 불릿 목록</p>
          <p><code className="bg-purple-100 px-1 rounded">[링크](URL)</code> - 링크</p>
        </div>
      </div>
    </div>
  );
};

export default MarkdownViewer;

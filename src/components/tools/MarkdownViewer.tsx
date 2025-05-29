import { useState } from "react";
import { Copy, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const MarkdownViewer = () => {
  const { t } = useLanguage();
  const [markdown, setMarkdown] = useState(`# ${t("markdownviewer_title")}

## 예시
**굵은 글씨**, *기울임 글씨*, \`코드\`

## 목록
- 항목 1
- 항목 2
  - 하위 항목

## 코드
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## 링크
[링크](https://example.com)

## 테이블
| 컬럼1 | 컬럼2 |
|-------|-------|
| 데이터1 | 데이터2 |`);

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t("copySuccess"));
    } catch (error) {
      toast.error(t("copyError"));
    }
  };

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

  const sampleMarkdown = `# ${t("markdownviewer_title")}

## 기능
마크다운 텍스트를 HTML로 변환하여 미리보기를 제공합니다.

### 옵션
- **굵은 글씨** 형식 지원
- **기울임 글씨**와 *일반 텍스트*
- \`인라인 코드\` 지원
- [링크](https://example.com)

### 코드 블록
\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

### 작업 목록
- [x] 검증 완료
- [ ] 입력 대기
- [ ] 출력 생성

> 마크다운은 간단한 마크업 언어입니다.

---

마크다운을 활용해보세요!`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold">{t("markdownviewer_title")}</Label>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => setMarkdown(sampleMarkdown)}>
            <FileText className="w-4 h-4 mr-2" />
            샘플
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleCopy(markdown, "Markdown")}>
            <Copy className="w-4 h-4 mr-2" />
            {t("copy")}
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 마크다운 입력 */}
        <div className="space-y-3">
          <Label htmlFor="markdown">{t("markdownviewer_input")}</Label>
          <Textarea
            id="markdown"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder={t("markdownviewer_input_placeholder")}
            className="min-h-[400px] font-mono text-sm"
          />
        </div>

        {/* 미리보기 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>{t("markdownviewer_preview")}</Label>
            <Button variant="outline" size="sm" onClick={() => handleCopy(parseMarkdown(markdown), "HTML")}>
              <Copy className="w-4 h-4 mr-2" />
              {t("markdownviewer_copy_html")}
            </Button>
          </div>
          <div 
            className="min-h-[400px] p-4 bg-white border rounded-md prose prose-sm max-w-none overflow-auto"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
          />
        </div>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <Label className="text-sm font-medium text-purple-800 mb-2 block">{t("markdownviewer_syntax_help")}</Label>
        <div className="text-sm text-purple-700 space-y-1">
          <p><code className="bg-purple-100 px-1 rounded"># 제목</code> - {t("markdownviewer_headers")}</p>
          <p><code className="bg-purple-100 px-1 rounded">**굵게**</code> - {t("markdownviewer_emphasis")}</p>
          <p><code className="bg-purple-100 px-1 rounded">*기울임*</code> - 기울임</p>
          <p><code className="bg-purple-100 px-1 rounded">`코드`</code> - {t("markdownviewer_code_syntax")}</p>
          <p><code className="bg-purple-100 px-1 rounded">- 목록</code> - {t("markdownviewer_lists")}</p>
          <p><code className="bg-purple-100 px-1 rounded">[링크](URL)</code> - {t("markdownviewer_links")}</p>
        </div>
      </div>
    </div>
  );
};

export default MarkdownViewer;


import { useState } from "react";
import { Copy, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const MarkdownViewer = () => {
  const { t } = useLanguage();
  const [markdown, setMarkdown] = useState(`# ${t("markdownSampleButton")}

## ${t("format")}
**${t("copy")}**, *${t("features")}*, \`${t("input")}\`

## ${t("options")}
- ${t("features")} 1
- ${t("features")} 2
  - ${t("options")}

## ${t("input")}
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## ${t("copy")}
[${t("copy")}](https://example.com)

## ${t("result")}
| ${t("input")}1 | ${t("output")}2 |
|-------|-------|
| ${t("input")}1 | ${t("output")}2 |`);

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t("copySuccess"));
    } catch (error) {
      toast.error(t("copyError"));
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

  const sampleMarkdown = `# ${t("markdownSampleButton")}

## ${t("features")}
${t("base64Description")}

### ${t("options")}
- ${t("format")} **${t("copy")}**
- **${t("validate")}**와 *${t("features")}*
- \`${t("input")}\` ${t("input")}
- [${t("copy")}](https://example.com)

### ${t("input")}
\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

### ${t("options")}
- [x] ${t("validate")}
- [ ] ${t("input")}
- [ ] ${t("output")}

> ${t("base64Description")}

---

${t("base64Description")}!`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold">{t("markdownEditorTitle")}</Label>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => setMarkdown(sampleMarkdown)}>
            <FileText className="w-4 h-4 mr-2" />
            {t("markdownSampleButton")}
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleCopy(markdown, t("markdownSourceLabel"))}>
            <Copy className="w-4 h-4 mr-2" />
            {t("copyButton")}
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 마크다운 입력 */}
        <div className="space-y-3">
          <Label htmlFor="markdown">{t("markdownSourceLabel")}</Label>
          <Textarea
            id="markdown"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder={t("markdownPlaceholder")}
            className="min-h-[400px] font-mono text-sm"
          />
        </div>

        {/* 미리보기 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>{t("markdownPreviewLabel")}</Label>
            <Button variant="outline" size="sm" onClick={() => handleCopy(parseMarkdown(markdown), "HTML")}>
              <Copy className="w-4 h-4 mr-2" />
              {t("markdownCopyHtml")}
            </Button>
          </div>
          <div 
            className="min-h-[400px] p-4 bg-white border rounded-md prose prose-sm max-w-none overflow-auto"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
          />
        </div>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <Label className="text-sm font-medium text-purple-800 mb-2 block">{t("markdownSyntaxTitle")}</Label>
        <div className="text-sm text-purple-700 space-y-1">
          <p><code className="bg-purple-100 px-1 rounded"># {t("input")}</code> - {t("format")}</p>
          <p><code className="bg-purple-100 px-1 rounded">**{t("copy")}**</code> - {t("copy")}</p>
          <p><code className="bg-purple-100 px-1 rounded">*{t("features")}*</code> - {t("features")}</p>
          <p><code className="bg-purple-100 px-1 rounded">`{t("input")}`</code> - {t("input")}</p>
          <p><code className="bg-purple-100 px-1 rounded">- {t("options")}</code> - {t("options")}</p>
          <p><code className="bg-purple-100 px-1 rounded">[{t("copy")}](URL)</code> - {t("copy")}</p>
        </div>
      </div>
    </div>
  );
};

export default MarkdownViewer;

import { useState } from "react";
import { Copy, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

// Since we can't install additional libraries in this environment,
// we'll create an enhanced custom markdown parser with better code block handling
const MarkdownViewer = () => {
  const { t } = useLanguage();
  const [markdown, setMarkdown] = useState(`# ${t("markdownviewer_title")}

## Example
**Bold text**, *italic text*, \`inline code\`

## List
- Item 1
- Item 2
  - Sub item

## Code Block
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}

// This is a comment
const name = "DevToolKit";
console.log(\`Welcome to \${name}!\`);
\`\`\`

## Python Example
\`\`\`python
def greet(name):
    """Greet someone with a friendly message"""
    return f"Hello, {name}!"

# Usage
message = greet("World")
print(message)
\`\`\`

## JSON Example
\`\`\`json
{
  "name": "DevToolKit",
  "version": "1.0.0",
  "tools": ["JSON Formatter", "UUID Generator", "Base64 Converter"]
}
\`\`\`

## Link
[Example Link](https://example.com)

## Table
| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |

## Task List
- [x] Completed task
- [ ] Incomplete task

> This is a blockquote

---

**Try editing the markdown!**`);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t("copySuccess"));
    } catch (error) {
      toast.error(t("copyError"));
    }
  };

  const sampleMarkdown = `# ${t("markdownviewer_title")}

## Features
Convert markdown text to HTML and provide live preview.

### Options
- **Bold text** formatting support
- **Italic text** and *regular text*
- \`Inline code\` support
- [Links](https://example.com)

### Code Block
\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);

// Arrow function example
const add = (a, b) => a + b;
console.log(add(2, 3)); // Output: 5
\`\`\`

### Task List
- [x] Validation complete
- [ ] Input pending
- [ ] Output generation

> Markdown is a simple markup language.

---

Try using markdown!`;

  // Enhanced markdown parser with better code block support
  const parseMarkdown = (md: string): string => {
    let html = md;

    // First, handle code blocks (triple backticks)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
      const lang = language || 'text';
      const escapedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
      
      // Simple syntax highlighting for common languages
      let highlightedCode = escapedCode;
      
      if (lang === 'javascript' || lang === 'js') {
        highlightedCode = highlightJavaScript(escapedCode);
      } else if (lang === 'python' || lang === 'py') {
        highlightedCode = highlightPython(escapedCode);
      } else if (lang === 'json') {
        highlightedCode = highlightJSON(escapedCode);
      } else if (lang === 'css') {
        highlightedCode = highlightCSS(escapedCode);
      } else if (lang === 'html') {
        highlightedCode = highlightHTML(escapedCode);
      }

      return `<div class="code-block-wrapper my-6">
        <div class="code-header bg-gray-800 text-gray-100 px-4 py-2 text-xs font-mono rounded-t-md flex justify-between items-center">
          <span>${lang}</span>
          <button onclick="copyCodeBlock(this)" class="text-gray-300 hover:text-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
        <pre class="code-content bg-gray-50 border border-gray-200 rounded-b-md overflow-x-auto m-0"><code class="block p-4 text-sm font-mono leading-relaxed text-gray-800" data-language="${lang}">${highlightedCode}</code></pre>
      </div>`;
    });

    // Handle inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-pink-600 border">$1</code>');

    // Handle headings
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mb-3 mt-6 text-gray-700 border-l-4 border-blue-500 pl-3">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-4 mt-8 text-gray-800 border-b-2 border-gray-200 pb-2">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-6 mt-8 text-gray-900 border-b-4 border-blue-500 pb-3">$1</h1>');

    // Handle bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em class="italic text-gray-800">$1</em>');

    // Handle links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors">$1</a>');

    // Handle horizontal rules
    html = html.replace(/^---$/gm, '<hr class="my-8 border-gray-300 border-t-2">');

    // Handle blockquotes
    html = html.replace(/^> (.*)$/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 text-gray-700 italic rounded-r-md">$1</blockquote>');

    // Handle nested lists first (before regular lists)
    const lines = html.split('\n');
    let processedLines = [];
    let inList = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      
      if (trimmed.match(/^-\s/)) {
        const indentLevel = (line.match(/^\s*/)?.[0].length || 0) / 2;
        const content = trimmed.substring(2).trim();
        
        // Handle task lists
        if (content.startsWith('[x] ') || content.startsWith('[ ] ')) {
          const checked = content.startsWith('[x]');
          const taskContent = content.slice(4);
          processedLines.push(`<div class="flex items-center space-x-2 my-1" style="margin-left: ${indentLevel * 20}px"><input type="checkbox" ${checked ? 'checked' : ''} disabled class="rounded border-gray-300"><span class="${checked ? 'line-through text-gray-500' : ''}">${taskContent}</span></div>`);
        } else {
          // Regular list items with proper nesting
          const marginLeft = indentLevel * 20;
          processedLines.push(`<li class="my-1 list-disc text-gray-700" style="margin-left: ${marginLeft}px; list-style-position: outside; padding-left: 8px;">${content}</li>`);
        }
      } else {
        processedLines.push(line);
      }
    }
    
    html = processedLines.join('\n');

    // Remove old list handling
    // html = html.replace(/^- \[x\] (.*)$/gm, '<div class="flex items-center space-x-2 my-1"><input type="checkbox" checked disabled class="rounded border-gray-300"><span class="line-through text-gray-500">$1</span></div>');
    // html = html.replace(/^- \[ \] (.*)$/gm, '<div class="flex items-center space-x-2 my-1"><input type="checkbox" disabled class="rounded border-gray-300"><span>$1</span></div>');
    // html = html.replace(/^- (.*)$/gm, '<li class="ml-4 my-1 list-disc list-inside text-gray-700">$1</li>');

    // Handle tables
    const tableRows = html.split('\n').filter(line => line.includes('|') && line.trim() !== '');
    let tableHtml = '';
    let inTable = false;
    
    html = html.split('\n').map((line, index, lines) => {
      if (line.includes('|') && line.trim() !== '' && !line.includes('---')) {
        if (!inTable) {
          inTable = true;
          tableHtml = '<div class="overflow-x-auto my-6"><table class="min-w-full border border-gray-300 rounded-lg">';
        }
        
        const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
        const isHeader = index < lines.length - 1 && lines[index + 1]?.includes('---');
        
        if (isHeader) {
          tableHtml += '<thead class="bg-gray-50"><tr>';
          cells.forEach(cell => {
            tableHtml += `<th class="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">${cell}</th>`;
          });
          tableHtml += '</tr></thead><tbody>';
        } else if (!line.includes('---')) {
          tableHtml += '<tr class="hover:bg-gray-50">';
          cells.forEach(cell => {
            tableHtml += `<td class="border border-gray-300 px-4 py-2 text-gray-700">${cell}</td>`;
          });
          tableHtml += '</tr>';
        }
        
        // Check if next line is not a table row
        if (index === lines.length - 1 || (!lines[index + 1]?.includes('|') || lines[index + 1]?.includes('---'))) {
          if (inTable) {
            tableHtml += '</tbody></table></div>';
            inTable = false;
            return tableHtml;
          }
        }
        return ''; // Remove original table syntax
      } else if (line.includes('---') && line.includes('|')) {
        return ''; // Remove table separator
      }
      return line;
    }).filter(line => line !== '').join('\n');

    // Handle paragraphs
    html = html.replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed text-gray-700">');
    html = '<p class="mb-4 leading-relaxed text-gray-700">' + html + '</p>';

    // Clean up empty paragraphs and fix HTML structure
    html = html.replace(/<p class="mb-4 leading-relaxed text-gray-700"><\/p>/g, '');
    html = html.replace(/<p class="mb-4 leading-relaxed text-gray-700">(<h[1-6])/g, '$1');
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    html = html.replace(/<p class="mb-4 leading-relaxed text-gray-700">(<div)/g, '$1');
    html = html.replace(/(<\/div>)<\/p>/g, '$1');
    html = html.replace(/<p class="mb-4 leading-relaxed text-gray-700">(<hr)/g, '$1');
    html = html.replace(/(<hr[^>]*>)<\/p>/g, '$1');
    html = html.replace(/<p class="mb-4 leading-relaxed text-gray-700">(<blockquote)/g, '$1');
    html = html.replace(/(<\/blockquote>)<\/p>/g, '$1');

    return html;
  };

  // Simple syntax highlighting functions
  const highlightJavaScript = (code: string): string => {
    return code
      .replace(/(function|const|let|var|if|else|for|while|return|class|extends|import|export|from|async|await|try|catch|finally)\b/g, '<span class="text-purple-600 font-semibold">$1</span>')
      .replace(/(true|false|null|undefined)\b/g, '<span class="text-orange-600 font-semibold">$1</span>')
      .replace(/\/\/.*$/gm, '<span class="text-green-600 italic">$&</span>')
      .replace(/\/\*[\s\S]*?\*\//g, '<span class="text-green-600 italic">$&</span>')
      .replace(/"([^"\\]|\\.)*"/g, '<span class="text-green-700">$&</span>')
      .replace(/'([^'\\]|\\.)*'/g, '<span class="text-green-700">$&</span>')
      .replace(/`([^`\\]|\\.)*`/g, '<span class="text-green-700">$&</span>')
      .replace(/\b\d+\.?\d*\b/g, '<span class="text-blue-600">$&</span>');
  };

  const highlightPython = (code: string): string => {
    return code
      .replace(/(def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|with|lambda|yield|global|nonlocal)\b/g, '<span class="text-purple-600 font-semibold">$1</span>')
      .replace(/(True|False|None)\b/g, '<span class="text-orange-600 font-semibold">$1</span>')
      .replace(/#.*$/gm, '<span class="text-green-600 italic">$&</span>')
      .replace(/"""[\s\S]*?"""/g, '<span class="text-green-600 italic">$&</span>')
      .replace(/"([^"\\]|\\.)*"/g, '<span class="text-green-700">$&</span>')
      .replace(/'([^'\\]|\\.)*'/g, '<span class="text-green-700">$&</span>')
      .replace(/\b\d+\.?\d*\b/g, '<span class="text-blue-600">$&</span>');
  };

  const highlightJSON = (code: string): string => {
    return code
      .replace(/"([^"\\]|\\.)*"(?=\s*:)/g, '<span class="text-blue-600 font-semibold">$&</span>') // Keys
      .replace(/"([^"\\]|\\.)*"(?!\s*:)/g, '<span class="text-green-700">$&</span>') // String values
      .replace(/\b(true|false|null)\b/g, '<span class="text-orange-600 font-semibold">$1</span>')
      .replace(/\b\d+\.?\d*\b/g, '<span class="text-purple-600">$&</span>');
  };

  const highlightCSS = (code: string): string => {
    return code
      .replace(/([.#]?[a-zA-Z-]+)\s*{/g, '<span class="text-blue-600 font-semibold">$1</span>{')
      .replace(/([a-zA-Z-]+):/g, '<span class="text-purple-600">$1</span>:')
      .replace(/\/\*[\s\S]*?\*\//g, '<span class="text-green-600 italic">$&</span>');
  };

  const highlightHTML = (code: string): string => {
    return code
      .replace(/&lt;([a-zA-Z][^&]*?)&gt;/g, '<span class="text-blue-600">&lt;<span class="text-purple-600 font-semibold">$1</span>&gt;</span>')
      .replace(/&lt;\/([a-zA-Z][^&]*?)&gt;/g, '<span class="text-blue-600">&lt;/<span class="text-purple-600 font-semibold">$1</span>&gt;</span>');
  };

  return (
    <>
      {/* Add global script for copy functionality */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.copyCodeBlock = function(button) {
            const codeElement = button.closest('.code-block-wrapper').querySelector('.code-content code');
            const text = codeElement.textContent || codeElement.innerText;
            navigator.clipboard.writeText(text).then(() => {
              const originalHtml = button.innerHTML;
              button.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"></polyline></svg>';
              setTimeout(() => {
                button.innerHTML = originalHtml;
              }, 1000);
            });
          }
        `
      }} />
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-semibold">{t("markdownviewer_title")}</Label>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Markdown Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="markdown">{t("markdownviewer_input")}</Label>
              <Button variant="outline" size="sm" onClick={() => setMarkdown(sampleMarkdown)}>
                <FileText className="w-4 h-4 mr-2" />
                {t("markdownviewer_sample")}
              </Button>
            </div>
            <Textarea
              id="markdown"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder={t("markdownviewer_input_placeholder")}
              className="min-h-[640px] font-mono text-sm resize-none"
              style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
            />
          </div>

          {/* Preview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>{t("markdownviewer_preview")}</Label>
              <Button variant="outline" size="sm" onClick={() => handleCopy(parseMarkdown(markdown))}>
                <Copy className="w-4 h-4 mr-2" />
                {t("markdownviewer_copy_html")}
              </Button>
            </div>
            <div className="min-h-[640px] max-h-[640px] p-6 bg-white border rounded-md overflow-y-auto overflow-x-hidden">
              <div className="prose prose-sm max-w-none">
                {markdown ? (
                  <div 
                    className="markdown-content"
                    style={{ lineHeight: '1.6' }}
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
                  />
                ) : (
                  <p className="text-gray-500 italic">{t("markdownviewer_output_placeholder")}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <Label className="text-sm font-medium text-purple-800 mb-2 block">{t("markdownviewer_syntax_help")}</Label>
          <div className="text-sm text-purple-700 space-y-1">
            <p><code className="bg-purple-100 px-1 rounded"># {t("markdownviewer_heading")}</code> - {t("markdownviewer_headers")}</p>
            <p><code className="bg-purple-100 px-1 rounded">**{t("markdownviewer_bold")}**</code> - {t("markdownviewer_emphasis")}</p>
            <p><code className="bg-purple-100 px-1 rounded">*{t("markdownviewer_italic")}*</code> - {t("markdownviewer_italic_text")}</p>
            <p><code className="bg-purple-100 px-1 rounded">`{t("markdownviewer_code")}`</code> - {t("markdownviewer_code_syntax")}</p>
            <p><code className="bg-purple-100 px-1 rounded">```language</code> - Code blocks with syntax highlighting</p>
            <p><code className="bg-purple-100 px-1 rounded">- {t("markdownviewer_list_item")}</code> - {t("markdownviewer_lists")}</p>
            <p><code className="bg-purple-100 px-1 rounded">[{t("markdownviewer_link")}](URL)</code> - {t("markdownviewer_links")}</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-purple-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">{t("markdownviewer_what")}</h3>
          <p className="text-gray-700 mb-4">{t("markdownviewer_info")}</p>
          <div className="space-y-2">
            <h4 className="font-medium">{t("markdownviewer_features")}</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Real-time markdown preview with syntax highlighting</li>
              <li>Support for code blocks with language-specific highlighting</li>
              <li>Table rendering with proper styling</li>
              <li>Task list support with checkboxes</li>
              <li>Copy code blocks with one click</li>
              <li>Responsive design for all screen sizes</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarkdownViewer;
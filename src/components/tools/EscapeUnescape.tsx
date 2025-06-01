import { useState } from "react";
import { Code, ArrowUpDown, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const EscapeUnescape = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"escape" | "unescape">("escape");
  const [type, setType] = useState("html");
  const { t } = useLanguage();

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error(t("escape_required"));
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
      toast.success(mode === "escape" ? t("escape_completed") : t("escape_unescape_completed"));
    } catch (error) {
      toast.error(t("escape_error"));
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t("copySuccess"));
    } catch (error) {
      toast.error(t("copyError"));
    }
  };

  const toggleMode = () => {
    setMode(mode === "escape" ? "unescape" : "escape");
    setInput(output);
    setOutput("");
  };

  const types = [
    { value: "html", label: t("escape_html") },
    { value: "url", label: t("escape_url") },
    { value: "javascript", label: t("escape_js") },
    { value: "json", label: t("escape_json") },
    { value: "xml", label: t("escape_xml") },
    { value: "csv", label: t("escape_csv") }
  ];

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Label className="text-lg font-semibold">
            {mode === "escape"
              ? t("escape_button")
              : t("escape_unescape_button")}
          </Label>
          <Button variant="outline" size="sm" onClick={toggleMode}>
            <ArrowUpDown className="w-4 h-4 mr-2" />
            {t("escape_toggle_mode")}
          </Button>
        </div>
        <div className="space-y-2">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {types.map((typeOption) => (
                <SelectItem key={typeOption.value} value={typeOption.value}>
                  {typeOption.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Input/Output Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="input">{t("escape_input_text")}</Label>
          </div>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("escape_input_placeholder")}
            className="min-h-[200px] font-mono text-sm"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>{t("escape_output_text")}</Label>
            {output && (
              <Button variant="outline" size="sm" onClick={() => handleCopy(output)}>
                <Copy className="w-4 h-4 mr-2" />
                {t("copy")}
              </Button>
            )}
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder={t("escape_output_placeholder")}
            className="min-h-[200px] font-mono text-sm bg-slate-50"
          />
        </div>
      </div>

      {/* Convert Button */}
      <Button onClick={handleConvert} className="w-full">
        <Code className="w-4 h-4 mr-2" />
        {mode === "escape"
          ? t("escape_button")
          : t("escape_unescape_button")}
      </Button>
    </div>
  );
};

export default EscapeUnescape;

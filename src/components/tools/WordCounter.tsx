import { useState, useEffect } from "react";
import { Copy, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const WordCounter = () => {
  const { t } = useLanguage();
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    readingTime: 0
  });

  useEffect(() => {
    calculateStats(text);
  }, [text]);

  const calculateStats = (input: string) => {
    const characters = input.length;
    const charactersNoSpaces = input.replace(/\s/g, '').length;
    const words = input.trim() === '' ? 0 : input.trim().split(/\s+/).length;
    const sentences = input.trim() === '' ? 0 : input.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = input.trim() === '' ? 0 : input.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    const lines = input === '' ? 0 : input.split('\n').length;
    const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words per minute

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      readingTime
    });
  };

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(t("copySuccess"));
    } catch (error) {
      toast.error(t("copyError"));
    }
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-medium">{t("wordcounter_input")}</Label>
            <Button variant="outline" size="sm" onClick={handleClear}>
              {t("clear")}
            </Button>
          </div>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("wordcounter_placeholder")}
            className="min-h-[400px] font-mono text-sm"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-medium">{t("wordcounter_statistics")}</Label>
          
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{t("wordcounter_characters")}</CardDescription>
                <CardTitle className="text-2xl">{stats.characters.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCopy(stats.characters.toString())}
                  className="h-6 p-1 text-xs"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  {t("copy")}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{t("wordcounter_characters_no_spaces")}</CardDescription>
                <CardTitle className="text-2xl">{stats.charactersNoSpaces.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCopy(stats.charactersNoSpaces.toString())}
                  className="h-6 p-1 text-xs"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  {t("copy")}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{t("wordcounter_words")}</CardDescription>
                <CardTitle className="text-2xl">{stats.words.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCopy(stats.words.toString())}
                  className="h-6 p-1 text-xs"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  {t("copy")}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{t("wordcounter_sentences")}</CardDescription>
                <CardTitle className="text-2xl">{stats.sentences.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCopy(stats.sentences.toString())}
                  className="h-6 p-1 text-xs"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  {t("copy")}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{t("wordcounter_paragraphs")}</CardDescription>
                <CardTitle className="text-2xl">{stats.paragraphs.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCopy(stats.paragraphs.toString())}
                  className="h-6 p-1 text-xs"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  {t("copy")}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{t("wordcounter_lines")}</CardDescription>
                <CardTitle className="text-2xl">{stats.lines.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCopy(stats.lines.toString())}
                  className="h-6 p-1 text-xs"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  {t("copy")}
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardDescription>{t("wordcounter_reading_time")}</CardDescription>
              <CardTitle className="text-xl">
                {stats.readingTime} {t("wordcounter_minutes")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{t("wordcounter_reading_note")}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">{t("wordcounter_what")}</h3>
        <p className="text-gray-700 mb-4">{t("wordcounter_info")}</p>
        <div className="space-y-2">
          <h4 className="font-medium">{t("wordcounter_features")}</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>{t("wordcounter_feature_1")}</li>
            <li>{t("wordcounter_feature_2")}</li>
            <li>{t("wordcounter_feature_3")}</li>
            <li>{t("wordcounter_feature_4")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;
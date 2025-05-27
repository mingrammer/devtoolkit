
import { useState } from "react";
import { Copy, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { generateSampleData } from "@/utils/dataGenerators";

interface DataGeneratorProps {
  type: string;
}

const DataGenerator = ({ type }: DataGeneratorProps) => {
  const [count, setCount] = useState(10);
  const [format, setFormat] = useState("json");
  const [generatedData, setGeneratedData] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const data = await generateSampleData(type, count, format);
      setGeneratedData(data);
      toast.success(`${count}개의 ${type} 데이터가 생성되었습니다`);
    } catch (error) {
      toast.error("데이터 생성 중 오류가 발생했습니다");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedData);
      toast.success("클립보드에 복사되었습니다");
    } catch (error) {
      toast.error("복사 중 오류가 발생했습니다");
    }
  };

  const handleDownload = () => {
    const fileExtension = format === "json" ? "json" : format === "csv" ? "csv" : "sql";
    const blob = new Blob([generatedData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sample-${type}-data.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("파일이 다운로드되었습니다");
  };

  return (
    <div className="space-y-6">
      {/* 설정 영역 */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="count">생성할 개수</Label>
          <Input
            id="count"
            type="number"
            min="1"
            max="1000"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="format">출력 형식</Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="sql">SQL INSERT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                생성 중...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                데이터 생성
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 결과 영역 */}
      {generatedData && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">생성된 데이터</CardTitle>
                <CardDescription>
                  {count}개의 {type} 데이터 ({format.toUpperCase()} 형식)
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="w-4 h-4 mr-2" />
                  복사
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  다운로드
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={generatedData}
              readOnly
              className="min-h-[400px] font-mono text-sm bg-slate-50"
              placeholder="생성된 데이터가 여기에 표시됩니다..."
            />
          </CardContent>
        </Card>
      )}

      {/* 프리뷰 영역 */}
      {!generatedData && (
        <Card className="bg-slate-50">
          <CardContent className="py-8">
            <div className="text-center text-slate-500">
              <RefreshCw className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <p className="text-lg font-medium mb-2">데이터 생성 준비 완료</p>
              <p className="text-sm">
                설정을 확인한 후 "데이터 생성" 버튼을 클릭하세요
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DataGenerator;

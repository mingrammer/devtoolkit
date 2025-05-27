
import { useState } from "react";
import { Copy, Download, RefreshCw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { generateSampleData } from "@/utils/dataGenerators";
import { getFieldsForType, getCountries, getLanguages } from "@/utils/dataConfig";

interface DataGeneratorProps {
  type: string;
}

const DataGenerator = ({ type }: DataGeneratorProps) => {
  const [count, setCount] = useState(10);
  const [format, setFormat] = useState("json");
  const [country, setCountry] = useState("kr");
  const [language, setLanguage] = useState("ko");
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [generatedData, setGeneratedData] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const availableFields = getFieldsForType(type);
  const countries = getCountries();
  const languages = getLanguages();

  // 초기화 시 모든 필드 선택
  if (selectedFields.length === 0 && availableFields.length > 0) {
    setSelectedFields(availableFields.map(f => f.key));
  }

  const handleFieldToggle = (fieldKey: string) => {
    setSelectedFields(prev => 
      prev.includes(fieldKey)
        ? prev.filter(f => f !== fieldKey)
        : [...prev, fieldKey]
    );
  };

  const handleGenerate = async () => {
    if (selectedFields.length === 0) {
      toast.error("최소 하나의 필드를 선택해주세요");
      return;
    }

    setIsGenerating(true);
    try {
      const data = await generateSampleData(type, count, format, {
        country,
        language,
        fields: selectedFields
      });
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
    const fileExtension = format === "json" ? "json" : 
                         format === "csv" ? "csv" : 
                         format === "plaintext" ? "txt" : "sql";
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
      {/* 기본 설정 영역 */}
      <div className="grid md:grid-cols-4 gap-4">
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
          <Label htmlFor="country">국가</Label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countries.map(c => (
                <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">언어</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map(l => (
                <SelectItem key={l.code} value={l.code}>{l.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
              <SelectItem value="plaintext">Plain Text</SelectItem>
              <SelectItem value="sql">SQL INSERT</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 필드 선택 영역 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="w-5 h-5" />
            포함할 필드 선택
          </CardTitle>
          <CardDescription>
            생성할 데이터에 포함할 필드를 선택하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {availableFields.map((field) => (
              <div key={field.key} className="flex items-center space-x-2">
                <Checkbox
                  id={field.key}
                  checked={selectedFields.includes(field.key)}
                  onCheckedChange={() => handleFieldToggle(field.key)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor={field.key}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {field.name}
                  </label>
                  <p className="text-xs text-muted-foreground">
                    {field.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedFields(availableFields.map(f => f.key))}
            >
              전체 선택
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedFields([])}
            >
              전체 해제
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 생성 버튼 */}
      <div className="flex justify-center">
        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating || selectedFields.length === 0}
          className="w-full max-w-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          size="lg"
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
                필드와 설정을 확인한 후 "데이터 생성" 버튼을 클릭하세요
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DataGenerator;

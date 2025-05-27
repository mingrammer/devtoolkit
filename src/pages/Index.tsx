
import { useState } from "react";
import { Code, Hash, Type, RefreshCw, Clock, Globe, CaseUpper, FileJson, Braces, Binary, QrCode, Search, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import UuidGenerator from "@/components/UuidGenerator";
import HashGenerator from "@/components/HashGenerator";
import LoremGenerator from "@/components/LoremGenerator";
import FormatConverter from "@/components/FormatConverter";
import TimeConverter from "@/components/TimeConverter";
import LocaleConverter from "@/components/LocaleConverter";
import CaseConverter from "@/components/CaseConverter";
import JsonPrettifier from "@/components/JsonPrettifier";
import Base64Converter from "@/components/Base64Converter";
import QrCodeGenerator from "@/components/QrCodeGenerator";
import RegexTester from "@/components/RegexTester";
import CronGenerator from "@/components/CronGenerator";
import MarkdownViewer from "@/components/MarkdownViewer";

const Index = () => {
  const [selectedTool, setSelectedTool] = useState("uuid");

  const tools = [
    {
      id: "uuid",
      title: "UUID 생성기",
      description: "랜덤 UUID (v4) 생성",
      icon: Hash,
      color: "bg-blue-500"
    },
    {
      id: "hash",
      title: "해시 생성기",
      description: "MD5, SHA256 등 해시 생성",
      icon: Code,
      color: "bg-green-500"
    },
    {
      id: "lorem",
      title: "Lorem Ipsum",
      description: "목업용 텍스트 생성",
      icon: Type,
      color: "bg-purple-500"
    },
    {
      id: "converter",
      title: "포맷 변환",
      description: "JSON ↔ CSV ↔ YAML",
      icon: RefreshCw,
      color: "bg-orange-500"
    },
    {
      id: "time",
      title: "시간 변환",
      description: "Epoch ↔ DateTime",
      icon: Clock,
      color: "bg-red-500"
    },
    {
      id: "locale",
      title: "로케일 변환",
      description: "en_US ↔ ko_KR 등",
      icon: Globe,
      color: "bg-indigo-500"
    },
    {
      id: "case",
      title: "케이스 변환",
      description: "camelCase ↔ snake_case",
      icon: CaseUpper,
      color: "bg-pink-500"
    },
    {
      id: "json",
      title: "JSON 정리",
      description: "JSON 포맷팅/뷰어",
      icon: Braces,
      color: "bg-cyan-500"
    },
    {
      id: "base64",
      title: "Base64 변환",
      description: "인코딩/디코딩",
      icon: Binary,
      color: "bg-yellow-500"
    },
    {
      id: "qr",
      title: "QR 코드",
      description: "QR 코드 생성기",
      icon: QrCode,
      color: "bg-teal-500"
    },
    {
      id: "regex",
      title: "정규식 테스터",
      description: "regex 패턴 테스트",
      icon: Search,
      color: "bg-lime-500"
    },
    {
      id: "cron",
      title: "Cron 생성기",
      description: "Cron 표현식 생성/검증",
      icon: Calendar,
      color: "bg-amber-500"
    },
    {
      id: "markdown",
      title: "마크다운 뷰어",
      description: "마크다운 미리보기",
      icon: Eye,
      color: "bg-emerald-500"
    }
  ];

  const selectedToolData = tools.find(t => t.id === selectedTool);

  const renderTool = () => {
    switch (selectedTool) {
      case "uuid": return <UuidGenerator />;
      case "hash": return <HashGenerator />;
      case "lorem": return <LoremGenerator />;
      case "converter": return <FormatConverter />;
      case "time": return <TimeConverter />;
      case "locale": return <LocaleConverter />;
      case "case": return <CaseConverter />;
      case "json": return <JsonPrettifier />;
      case "base64": return <Base64Converter />;
      case "qr": return <QrCodeGenerator />;
      case "regex": return <RegexTester />;
      case "cron": return <CronGenerator />;
      case "markdown": return <MarkdownViewer />;
      default: return <UuidGenerator />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  DevToolkit
                </h1>
                <p className="text-xs text-slate-500">개발자를 위한 필수 유틸리티</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              무료 사용
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* 광고 영역 - 사이드바 */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-orange-800">💡 광고</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-orange-700">개발 도구 추천</p>
                  <p className="text-xs text-orange-600">생산성을 높이는 최신 개발도구를 확인해보세요</p>
                  <Button size="sm" variant="outline" className="w-full text-orange-700 border-orange-300">
                    자세히 보기
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">📊 사용 통계</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>오늘 사용</span>
                  <span className="font-semibold">5,892</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>전체 도구</span>
                  <span className="font-semibold">13개</span>
                </div>
                <Separator />
                <p className="text-xs text-slate-500">
                  매일 수천 명의 개발자가 사용하고 있습니다
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-9">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                개발자를 위한 필수 도구들
              </h2>
              <p className="text-slate-600">
                일상적인 개발 작업을 빠르고 쉽게 처리할 수 있는 유틸리티 도구 모음입니다.
              </p>
            </div>

            {/* 도구 선택 */}
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {tools.map((tool) => {
                const Icon = tool.icon;
                const isSelected = selectedTool === tool.id;
                
                return (
                  <Card 
                    key={tool.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      isSelected 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedTool(tool.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${tool.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-sm">{tool.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-xs">
                        {tool.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* 선택된 도구 */}
            {selectedToolData && (
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${selectedToolData.color} rounded-lg flex items-center justify-center`}>
                      <selectedToolData.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>{selectedToolData.title}</CardTitle>
                      <CardDescription>{selectedToolData.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {renderTool()}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* 하단 광고 영역 */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold">더 많은 개발 도구가 필요하신가요?</h3>
              <p className="text-blue-100">
                코드 생성, 디버깅, 성능 최적화까지 - 개발 생산성을 극대화하는 도구들을 만나보세요
              </p>
              <Button variant="secondary" size="lg">
                프리미엄 도구 보기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-600">
            <p className="text-sm">© 2024 DevToolkit. 개발자를 위한 필수 유틸리티 모음</p>
            <p className="text-xs mt-2">Made with ❤️ for developers</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

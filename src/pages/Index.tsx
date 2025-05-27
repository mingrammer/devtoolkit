
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Code, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useTools, useCategories } from "@/utils/toolsConfig";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const tools = useTools();
  const categories = useCategories();
  const { t } = useLanguage();
  
  const allCategories = [t("textProcessing"), ...categories];
  const [selectedCategory, setSelectedCategory] = useState(allCategories[0]);

  const filteredTools = useMemo(() => {
    let filtered = tools;
    
    if (selectedCategory !== allCategories[0]) {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(tool => 
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [searchQuery, selectedCategory, tools, allCategories]);

  const handleToolClick = (toolId: string) => {
    navigate(`/tools/${toolId}`);
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
                  {t("devToolkit")}
                </h1>
                <p className="text-xs text-slate-500">{t("supportDescription")}</p>
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
          {/* 사이드바 */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-orange-800">💡 {t("advertisement")}</CardTitle>
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
                  <span className="font-semibold">8,247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>전체 도구</span>
                  <span className="font-semibold">{tools.length}개</span>
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

            {/* 검색 및 카테고리 */}
            <div className="mb-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={t("searchTools")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {allCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* 도구 그리드 */}
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {filteredTools.map((tool) => {
                const Icon = tool.icon;
                
                return (
                  <Card 
                    key={tool.id}
                    className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105"
                    onClick={() => handleToolClick(tool.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${tool.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-sm">{tool.title}</CardTitle>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {tool.category}
                          </Badge>
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

            {filteredTools.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
                <p className="text-gray-400 text-sm mt-2">다른 키워드로 검색해보세요.</p>
              </div>
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
            <p className="text-sm">© 2024 {t("devToolkit")}. 개발자를 위한 필수 유틸리티 모음</p>
            <p className="text-xs mt-2">Made with ❤️ for developers</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

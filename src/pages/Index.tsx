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
import SponsorSection from "@/components/SponsorSection";
import LanguageSelector from "@/components/LanguageSelector";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const tools = useTools();
  const categories = useCategories();
  const { t } = useLanguage();
  
  const allCategories = [t("all"), ...categories];
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
              {t("freeUsage")}
            </Badge>
          </div>
          
          {/* Language Selector */}
          <div className="mt-4 flex justify-end">
            <LanguageSelector />
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
                  <p className="text-sm text-orange-700">{t("developmentTools")}</p>
                  <p className="text-xs text-orange-600">{t("productivityMessage")}</p>
                  <Button size="sm" variant="outline" className="w-full text-orange-700 border-orange-300">
                    {t("seeMore")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sponsor Section */}
            <SponsorSection />

            {/* Search Bar */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder={t("searchTools")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">📊 {t("usageStats")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>{t("todayUsage")}</span>
                  <span className="font-semibold">8,247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t("totalTools")}</span>
                  <span className="font-semibold">{tools.length}개</span>
                </div>
                <Separator />
                <p className="text-xs text-slate-500">
                  {t("dailyUsers")}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-9">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                {t("developersEssential")}
              </h2>
              <p className="text-slate-600">
                {t("essentialDescription")}
              </p>
            </div>

            {/* 카테고리 */}
            <div className="mb-6">
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
                <p className="text-gray-500 text-lg">{t("noResults")}</p>
                <p className="text-gray-400 text-sm mt-2">{t("tryDifferentKeyword")}</p>
              </div>
            )}
          </div>
        </div>

        {/* 하단 광고 영역 */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold">{t("needMoreTools")}</h3>
              <p className="text-blue-100">
                {t("premiumToolsMessage")}
              </p>
              <Button variant="secondary" size="lg">
                {t("viewPremiumTools")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-600">
            <p className="text-sm">© 2024 {t("devToolkit")}. {t("footerCopyright")}</p>
            <p className="text-xs mt-2">{t("madeWithLove")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

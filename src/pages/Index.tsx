import AdBanner from '@/components/ads/AdBanner';
import AnalyticsErrorBoundary from '@/components/AnalyticsErrorBoundary';
import DevInfo from '@/components/DevInfo';
import GitHubButton from "@/components/GitHubButton";
import LanguageSelector from '@/components/LanguageSelector';
import SEOHead from '@/components/SEOHead';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCategories, useTools } from '@/utils/toolsConfig';
import { Code, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const tools = useTools();
  const categories = useCategories();
  const { t } = useLanguage();
  
  // SEO 설정
  const seoTitle = `${t("devToolkit")} - ${t("developersEssential")}`;
  const seoDescription = t("essentialDescription");
  const seoKeywords = [
    "developer tools", "developer utilities", "dev tool kit", "dev tools", 
    "dev utilities",  "online tools", "개발자 도구", "개발자 유틸리티",
  ];
  const canonicalUrl = window.location.origin;
  
  const allCategories = ["all", ...categories];
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

  const handleBuyMeCoffee = () => {
    window.open('https://buymeacoffee.com/mingrammer', '_blank');
  };

  const handleToolClick = (toolId: string) => {
    navigate(`/tools/${toolId}`);
  };

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        ogTitle={seoTitle}
        ogDescription={seoDescription}
        canonicalUrl={canonicalUrl}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
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
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <GitHubButton 
                  owner="mingrammer" 
                  repo="devtoolkit" 
                  variant="compact"
                />
              <Button 
                onClick={handleBuyMeCoffee}
                className="bg-[#FFDD00] hover:bg-[#FFCC00] text-black font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 border border-gray-300 hover:border-gray-400"
                size="sm"
              >
                <img 
                  src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" 
                  alt="Buy me a coffee"
                  className="w-5 h-5"
                />
                <span>{t("buyMeCoffee")}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Contents */}
          <div className="lg:col-span-9">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                {t("developersEssential")}
              </h2>
              <p className="text-slate-600">
                {t("essentialDescription")}
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={t("searchTools")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category */}
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

            {/* Tools Grid */}
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

          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* 사이드바 광고 */}
            <AnalyticsErrorBoundary>
              <AdBanner 
                slot="sidebar-ad"
                format="rectangle"
                className="w-full"
                style={{ minHeight: '250px' }}
              />
            </AnalyticsErrorBoundary>

            {/* 두 번째 광고 */}
            <AnalyticsErrorBoundary>
              <AdBanner 
                slot="sidebar-ad-2"
                format="rectangle"
                className="w-full"
                style={{ minHeight: '250px' }}
              />
            </AnalyticsErrorBoundary>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-600">
            <p className="text-sm">© {new Date().getFullYear()} {t("devToolkit")}. {t("footerCopyright")}</p>
            <p className="text-xs mt-2">{t("madeWithLove")}</p>
          </div>
        </div>
      </footer>
      
      {/* 개발자 정보 (개발 환경에서만 표시) */}
      <DevInfo />
      </div>
    </>
  );
};

export default Index;

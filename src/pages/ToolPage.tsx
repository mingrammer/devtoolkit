
import { useParams, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ToolSidebar } from "@/components/ToolSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTools } from "@/utils/toolsConfig";
import { getToolSEO } from "@/utils/seoConfig";
import SEOHead from "@/components/SEOHead";
import AdBanner from "@/components/AdBanner";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

// 컴포넌트 임포트
import UuidGenerator from "@/components/tools/UuidGenerator";
import HashGenerator from "@/components/tools/HashGenerator";
import LoremIpsumGenerator from "@/components/tools/LoremIpsumGenerator";
import FormatConverter from "@/components/tools/FormatConverter";
import UnixTimeConverter from "@/components/tools/UnixTimeConverter";
import LocaleConverter from "@/components/tools/LocaleConverter";
import CaseConverter from "@/components/tools/CaseConverter";
import JsonPrettifier from "@/components/tools/JsonPrettifier";
import Base64Converter from "@/components/tools/Base64Converter";
import QrCodeGenerator from "@/components/tools/QrCodeGenerator";
import RegexTester from "@/components/tools/RegexTester";
import CronGenerator from "@/components/tools/CronGenerator";
import MarkdownViewer from "@/components/tools/MarkdownViewer";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import TimezoneConverter from "@/components/tools/TimezoneConverter";
import CidrCalculator from "@/components/tools/CidrCalculator";
import NumberConverter from "@/components/tools/NumberConverter";
import NumberFormatter from "@/components/tools/NumberFormatter";
import TextDiff from "@/components/tools/TextDiff";
import EscapeUnescape from "@/components/tools/EscapeUnescape";
import TextToSlug from "@/components/tools/TextToSlug";

const ToolPage = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const tools = useTools();
  const { t } = useLanguage();
  
  const tool = tools.find(t => t.id === toolId);
  
  if (!tool) {
    return <Navigate to="/" replace />;
  }

  const seoData = getToolSEO(toolId!);
  const canonicalUrl = `${window.location.origin}/tools/${toolId}`;

  const renderTool = () => {
    switch (toolId) {
      case "uuidgenerator": return <UuidGenerator />;
      case "hashgenerator": return <HashGenerator />;
      case "loremipsum": return <LoremIpsumGenerator />;
      case "formatconverter": return <FormatConverter />;
      case "unixtimeconverter": return <UnixTimeConverter />;
      case "localeconverter": return <LocaleConverter />;
      case "caseconverter": return <CaseConverter />;
      case "jsonprettifier": return <JsonPrettifier />;
      case "base64converter": return <Base64Converter />;
      case "qrgenerator": return <QrCodeGenerator />;
      case "regextester": return <RegexTester />;
      case "crongenerator": return <CronGenerator />;
      case "markdownviewer": return <MarkdownViewer />;
      case "passwordgenerator": return <PasswordGenerator />;
      case "timezoneconverter": return <TimezoneConverter />;
      case "cidrcalculator": return <CidrCalculator />;
      case "numberconverter": return <NumberConverter />;
      case "numberformatter": return <NumberFormatter />;
      case "textdiff": return <TextDiff />;
      case "escape": return <EscapeUnescape />;
      case "texttoslug": return <TextToSlug />;
      default: return <UuidGenerator />;
    }
  };

  return (
    <>
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        ogTitle={seoData.ogTitle}
        ogDescription={seoData.ogDescription}
        canonicalUrl={canonicalUrl}
      />
      
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <ToolSidebar />
          <SidebarInset className="flex flex-col">
            {/* TopBar를 메인 콘텐츠 영역에만 적용 */}
            <div className="h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-end sticky top-0 z-50">
              <div className="flex items-center space-x-4">
                <LanguageSelector />
                <Button 
                  onClick={() => window.open('https://buymeacoffee.com/mingrammer', '_blank')}
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
            
            <div className="flex-1 p-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center`}>
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{tool.title}</CardTitle>
                      <CardDescription className="text-lg">{tool.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {renderTool()}
                </CardContent>
              </Card>
              
              {/* 카드 외부로 분리된 광고 배너 */}
              <div className="mt-8">
                <AdBanner 
                  slot="1234567890" 
                  className="max-w-2xl mx-auto"
                  style={{ minHeight: '250px' }}
                />
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
};

export default ToolPage;

import { useParams, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { ToolSidebar } from "@/components/ToolSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTools } from "@/utils/toolsConfig";
import { getToolSEO } from "@/utils/seoConfig";
import SEOHead from "@/components/SEOHead";
import AdBanner from "@/components/ads/AdBanner";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import AnalyticsErrorBoundary from "@/components/AnalyticsErrorBoundary";
import GitHubButton from "@/components/GitHubButton";

// 컴포넌트 임포트
import UuidGenerator from "@/components/tools/UuidGenerator";
import HashGenerator from "@/components/tools/HashGenerator";
import LoremIpsumGenerator from "@/components/tools/LoremIpsumGenerator";
import UnixTimeConverter from "@/components/tools/UnixTimeConverter";
import LocaleConverter from "@/components/tools/LocaleConverter";
import CaseConverter from "@/components/tools/CaseConverter";
import JsonFormatter from "@/components/tools/JsonFormatter";
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
import JsonToCsv from "@/components/tools/JsonToCsv";
import CsvToJson from "@/components/tools/CsvToJson";
import YamlToJson from "@/components/tools/YamlToJson";
import JsonToYaml from "@/components/tools/JsonToYaml";
import CsvToYaml from "@/components/tools/CsvToYaml";
import YamlToCsv from "@/components/tools/YamlToCsv";
import WordCounter from "@/components/tools/WordCounter";

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
      case "unixtimeconverter": return <UnixTimeConverter />;
      case "localeconverter": return <LocaleConverter />;
      case "caseconverter": return <CaseConverter />;
      case "jsonformatter": return <JsonFormatter />;
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
      case "jsontocsv": return <JsonToCsv />;
      case "csvtojson": return <CsvToJson />;
      case "yamltojson": return <YamlToJson />;
      case "jsontoyaml": return <JsonToYaml />;
      case "csvtoyaml": return <CsvToYaml />;
      case "yamltocsv": return <YamlToCsv />;
      case "wordcounter": return <WordCounter />;
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
          <SidebarInset className="flex min-w-0 flex-col">
            <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
              <div className="flex min-h-16 items-center gap-2 px-3 py-3 sm:px-4">
                <SidebarTrigger className="md:hidden" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-slate-900 sm:text-base">{tool.title}</div>
                  <div className="truncate text-xs text-slate-500 sm:text-sm">{tool.category}</div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <LanguageSelector />
                  <GitHubButton 
                    owner="mingrammer" 
                    repo="devtoolkit" 
                    variant="compact"
                  />
                  <Button 
                    onClick={() => window.open('https://buymeacoffee.com/mingrammer', '_blank')}
                    className="h-9 bg-[#FFDD00] px-3 text-black transition-colors duration-200 hover:bg-[#FFCC00]"
                    size="sm"
                  >
                    <img 
                      src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" 
                      alt="Buy me a coffee"
                      className="h-4 w-4 sm:h-5 sm:w-5"
                    />
                    <span className="hidden sm:inline">{t("buyMeCoffee")}</span>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 px-3 py-4 sm:px-4 sm:py-6 lg:p-8">
              <Card className="overflow-hidden shadow-lg">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:items-center sm:space-x-3">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${tool.color} sm:h-12 sm:w-12`}>
                      <tool.icon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-xl sm:text-2xl">{tool.title}</CardTitle>
                      <CardDescription className="mt-1 text-sm leading-6 sm:text-base lg:text-lg">{tool.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 sm:p-6 sm:pt-2">
                  {renderTool()}
                </CardContent>
              </Card>
              
              <div className="mt-6 sm:mt-8">
                <AnalyticsErrorBoundary>
                  <AdBanner 
                    slot="6031323740"
                    format="fluid"
                    layoutKey="-fb+5w+4e-db+86"
                    className="mx-auto w-full max-w-2xl"
                    style={{ minHeight: '250px' }}
                  />
                </AnalyticsErrorBoundary>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
};

export default ToolPage;

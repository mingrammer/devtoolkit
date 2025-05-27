
import { useParams, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ToolSidebar } from "@/components/ToolSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { tools } from "@/utils/toolsConfig";
import { getToolSEO } from "@/utils/seoConfig";
import SEOHead from "@/components/SEOHead";
import AdBanner from "@/components/AdBanner";

// 컴포넌트 임포트
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
import PasswordGenerator from "@/components/PasswordGenerator";
import TimezoneConverter from "@/components/TimezoneConverter";
import CidrCalculator from "@/components/CidrCalculator";
import NumberConverter from "@/components/NumberConverter";
import NumberFormatter from "@/components/NumberFormatter";
import TextDiff from "@/components/TextDiff";
import EscapeUnescape from "@/components/EscapeUnescape";
import TextToSlug from "@/components/TextToSlug";

const ToolPage = () => {
  const { toolId } = useParams<{ toolId: string }>();
  
  const tool = tools.find(t => t.id === toolId);
  
  if (!tool) {
    return <Navigate to="/" replace />;
  }

  const seoData = getToolSEO(toolId!);
  const canonicalUrl = `${window.location.origin}/tools/${toolId}`;

  const renderTool = () => {
    switch (toolId) {
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
      case "password": return <PasswordGenerator />;
      case "timezone": return <TimezoneConverter />;
      case "cidr": return <CidrCalculator />;
      case "numberconv": return <NumberConverter />;
      case "numberformat": return <NumberFormatter />;
      case "textdiff": return <TextDiff />;
      case "escape": return <EscapeUnescape />;
      case "slug": return <TextToSlug />;
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
          <SidebarInset>
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
                  
                  {/* 도구 사용 결과 하단 광고 배너 */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <AdBanner 
                      slot="1234567890" 
                      className="max-w-2xl mx-auto"
                      style={{ minHeight: '250px' }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
};

export default ToolPage;

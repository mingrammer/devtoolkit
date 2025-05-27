
import { Hash, Type, RefreshCw, Clock, Globe, CaseUpper, FileJson, Braces, Binary, QrCode, Search, Calendar, Eye, Key, Timer, Network, Calculator, FileType, GitCompare, Shield, Link2, Code } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const useTools = () => {
  const { t } = useLanguage();
  
  return [
    // 텍스트 처리
    {
      id: "uuid",
      title: t("uuidGenerator"),
      description: t("uuidDescription"),
      icon: Hash,
      color: "bg-blue-500",
      category: t("textProcessing")
    },
    {
      id: "lorem",
      title: t("loremIpsum"),
      description: t("loremDescription"),
      icon: Type,
      color: "bg-purple-500",
      category: t("textProcessing")
    },
    {
      id: "case",
      title: t("caseConverter"),
      description: t("caseDescription"),
      icon: CaseUpper,
      color: "bg-pink-500",
      category: t("textProcessing")
    },
    {
      id: "password",
      title: t("passwordGenerator"),
      description: t("passwordDescription"),
      icon: Key,
      color: "bg-red-600",
      category: t("textProcessing")
    },
    {
      id: "textdiff",
      title: t("textDiff"),
      description: t("textDiffDescription"),
      icon: GitCompare,
      color: "bg-orange-600",
      category: t("textProcessing")
    },
    {
      id: "escape",
      title: t("escapeUnescape"),
      description: t("escapeDescription"),
      icon: Shield,
      color: "bg-yellow-600",
      category: t("textProcessing")
    },
    {
      id: "slug",
      title: t("textToSlug"),
      description: t("slugDescription"),
      icon: Link2,
      color: "bg-green-600",
      category: t("textProcessing")
    },

    // 인코딩/변환
    {
      id: "hash",
      title: t("hashGenerator"),
      description: t("hashDescription"),
      icon: Code,
      color: "bg-green-500",
      category: t("encodingConversion")
    },
    {
      id: "base64",
      title: t("base64Converter"),
      description: t("base64Description"),
      icon: Binary,
      color: "bg-yellow-500",
      category: t("encodingConversion")
    },
    {
      id: "qr",
      title: t("qrGenerator"),
      description: t("qrDescription"),
      icon: QrCode,
      color: "bg-teal-500",
      category: t("encodingConversion")
    },
    {
      id: "numberconv",
      title: t("numberConverter"),
      description: t("numberDescription"),
      icon: Calculator,
      color: "bg-indigo-600",
      category: t("encodingConversion")
    },

    // 시간/날짜
    {
      id: "time",
      title: t("timeConverter"),
      description: t("timeDescription"),
      icon: Clock,
      color: "bg-red-500",
      category: t("timeDate")
    },
    {
      id: "timezone",
      title: t("timezoneConverter"),
      description: t("timezoneDescription"),
      icon: Timer,
      color: "bg-blue-600",
      category: t("timeDate")
    },
    {
      id: "cron",
      title: t("cronGenerator"),
      description: t("cronDescription"),
      icon: Calendar,
      color: "bg-amber-500",
      category: t("timeDate")
    },

    // 데이터 포맷
    {
      id: "converter",
      title: t("formatConverter"),
      description: t("formatDescription"),
      icon: RefreshCw,
      color: "bg-orange-500",
      category: t("dataFormat")
    },
    {
      id: "json",
      title: t("jsonPrettifier"),
      description: t("jsonDescription"),
      icon: Braces,
      color: "bg-cyan-500",
      category: t("dataFormat")
    },
    {
      id: "locale",
      title: t("localeConverter"),
      description: t("localeDescription"),
      icon: Globe,
      color: "bg-indigo-500",
      category: t("dataFormat")
    },
    {
      id: "numberformat",
      title: t("numberFormatter"),
      description: t("numberFormatterDescription"),
      icon: Hash,
      color: "bg-purple-600",
      category: t("dataFormat")
    },

    // 개발 도구
    {
      id: "regex",
      title: t("regexTester"),
      description: t("regexDescription"),
      icon: Search,
      color: "bg-lime-500",
      category: t("devTools")
    },
    {
      id: "markdown",
      title: t("markdownViewer"),
      description: t("markdownDescription"),
      icon: Eye,
      color: "bg-emerald-500",
      category: t("devTools")
    },
    {
      id: "cidr",
      title: t("cidrCalculator"),
      description: t("cidrDescription"),
      icon: Network,
      color: "bg-slate-600",
      category: t("devTools")
    }
  ];
};

// 카테고리 목록도 함수로 변경
export const useCategories = () => {
  const { t } = useLanguage();
  
  return [
    t("textProcessing"),
    t("encodingConversion"), 
    t("timeDate"),
    t("dataFormat"),
    t("devTools")
  ];
};

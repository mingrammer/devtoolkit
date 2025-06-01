import { useLanguage } from '@/contexts/LanguageContext';
import {
  ArrowRightLeft,
  Binary,
  Braces,
  Calculator,
  Calendar,
  CaseUpper,
  Clock,
  Code,
  Eye,
  FileText,
  GitCompare,
  Globe,
  Hash,
  Key,
  Link2,
  Network,
  QrCode,
  Search,
  Shield,
  Timer,
  Type,
} from 'lucide-react';


export const useTools = () => {
  const { t } = useLanguage();

  return [
    // 텍스트 처리
    {
      id: "uuidgenerator",
      title: t("uuidgenerator_title"),
      description: t("uuidgenerator_description"),
      icon: Hash,
      color: "bg-blue-500",
      category: t("textProcessing")
    },
    {
      id: "loremipsum",
      title: t("loremipsum_title"),
      description: t("loremipsum_description"),
      icon: Type,
      color: "bg-purple-500",
      category: t("textProcessing")
    },
    {
      id: "caseconverter",
      title: t("caseconverter_title"),
      description: t("caseconverter_description"),
      icon: CaseUpper,
      color: "bg-pink-500",
      category: t("textProcessing")
    },
    {
      id: "passwordgenerator",
      title: t("passwordgenerator_title"),
      description: t("passwordgenerator_description"),
      icon: Key,
      color: "bg-red-600",
      category: t("textProcessing")
    },
    {
      id: "textdiff",
      title: t("textdiff_title"),
      description: t("textdiff_description"),
      icon: GitCompare,
      color: "bg-orange-600",
      category: t("textProcessing")
    },
    {
      id: "escape",
      title: t("escape_title"),
      description: t("escape_description"),
      icon: Shield,
      color: "bg-yellow-600",
      category: t("textProcessing")
    },
    {
      id: "texttoslug",
      title: t("texttoslug_title"),
      description: t("texttoslug_description"),
      icon: Link2,
      color: "bg-green-600",
      category: t("textProcessing")
    },
    {
      id: "wordcounter",
      title: t("wordcounter_title"),
      description: t("wordcounter_description"),
      icon: FileText,
      color: "bg-blue-600",
      category: t("textProcessing")
    },

    // 인코딩/변환
    {
      id: "hashgenerator",
      title: t("hashgenerator_title"),
      description: t("hashgenerator_description"),
      icon: Code,
      color: "bg-green-500",
      category: t("encodingConversion")
    },
    {
      id: "base64converter",
      title: t("base64converter_title"),
      description: t("base64converter_description"),
      icon: Binary,
      color: "bg-yellow-500",
      category: t("encodingConversion")
    },
    {
      id: "qrgenerator",
      title: t("qrgenerator_title"),
      description: t("qrgenerator_description"),
      icon: QrCode,
      color: "bg-teal-500",
      category: t("encodingConversion")
    },
    {
      id: "numberconverter",
      title: t("numberconverter_title"),
      description: t("numberconverter_description"),
      icon: Calculator,
      color: "bg-indigo-600",
      category: t("encodingConversion")
    },

    // 시간/날짜
    {
      id: "unixtimeconverter",
      title: t("unixtimeconverter_title"),
      description: t("unixtimeconverter_description"),
      icon: Clock,
      color: "bg-red-500",
      category: t("timeDate")
    },
    {
      id: "timezoneconverter",
      title: t("timezoneconverter_title"),
      description: t("timezoneconverter_description"),
      icon: Timer,
      color: "bg-blue-600",
      category: t("timeDate")
    },
    {
      id: "crongenerator",
      title: t("crongenerator_title"),
      description: t("crongenerator_description"),
      icon: Calendar,
      color: "bg-amber-500",
      category: t("timeDate")
    },

    // 데이터 포맷
    {
      id: "jsontocsv",
      title: t("jsontocsv_title"),
      description: t("jsontocsv_description"),
      icon: ArrowRightLeft,
      color: "bg-blue-500",
      category: t("dataFormat")
    },
    {
      id: "csvtojson",
      title: t("csvtojson_title"),
      description: t("csvtojson_description"),
      icon: ArrowRightLeft,
      color: "bg-green-500",
      category: t("dataFormat")
    },
    {
      id: "yamltojson",
      title: t("yamltojson_title"),
      description: t("yamltojson_description"),
      icon: ArrowRightLeft,
      color: "bg-yellow-500",
      category: t("dataFormat")
    },
    {
      id: "jsontoyaml",
      title: t("jsontoyaml_title"),
      description: t("jsontoyaml_description"),
      icon: ArrowRightLeft,
      color: "bg-purple-500",
      category: t("dataFormat")
    },
    {
      id: "csvtoyaml",
      title: t("csvtoyaml_title"),
      description: t("csvtoyaml_description"),
      icon: ArrowRightLeft,
      color: "bg-pink-500",
      category: t("dataFormat")
    },
    {
      id: "yamltocsv",
      title: t("yamltocsv_title"),
      description: t("yamltocsv_description"),
      icon: ArrowRightLeft,
      color: "bg-indigo-500",
      category: t("dataFormat")
    },
    {
      id: "jsonformatter",
      title: t("jsonformatter_title"),
      description: t("jsonformatter_description"),
      icon: Braces,
      color: "bg-cyan-500",
      category: t("dataFormat")
    },
    {
      id: "localeconverter",
      title: t("localeconverter_title"),
      description: t("localeconverter_description"),
      icon: Globe,
      color: "bg-indigo-500",
      category: t("dataFormat")
    },
    {
      id: "numberformatter",
      title: t("numberformatter_title"),
      description: t("numberformatter_description"),
      icon: Hash,
      color: "bg-purple-600",
      category: t("dataFormat")
    },

    // 개발 도구
    {
      id: "regextester",
      title: t("regextester_title"),
      description: t("regextester_description"),
      icon: Search,
      color: "bg-lime-500",
      category: t("devTools")
    },
    {
      id: "markdownviewer",
      title: t("markdownviewer_title"),
      description: t("markdownviewer_description"),
      icon: Eye,
      color: "bg-emerald-500",
      category: t("devTools")
    },
    {
      id: "cidrcalculator",
      title: t("cidrcalculator_title"),
      description: t("cidrcalculator_description"),
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

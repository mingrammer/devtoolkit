
import { Hash, Type, RefreshCw, Clock, Globe, CaseUpper, FileJson, Braces, Binary, QrCode, Search, Calendar, Eye, Key, Timer, Network, Calculator, FileType, GitCompare, Shield, Link2, Code } from "lucide-react";

export const tools = [
  // 텍스트 처리
  {
    id: "uuid",
    title: "UUID 생성기",
    description: "랜덤 UUID (v4) 생성",
    icon: Hash,
    color: "bg-blue-500",
    category: "텍스트 처리"
  },
  {
    id: "lorem",
    title: "Lorem Ipsum",
    description: "목업용 텍스트 생성",
    icon: Type,
    color: "bg-purple-500",
    category: "텍스트 처리"
  },
  {
    id: "case",
    title: "케이스 변환",
    description: "camelCase ↔ snake_case",
    icon: CaseUpper,
    color: "bg-pink-500",
    category: "텍스트 처리"
  },
  {
    id: "password",
    title: "비밀번호 생성기",
    description: "조건에 따른 비밀번호 생성",
    icon: Key,
    color: "bg-red-600",
    category: "텍스트 처리"
  },
  {
    id: "textdiff",
    title: "텍스트 비교",
    description: "두 텍스트 간 차이점 비교",
    icon: GitCompare,
    color: "bg-orange-600",
    category: "텍스트 처리"
  },
  {
    id: "escape",
    title: "이스케이프 도구",
    description: "HTML, URL, JSON 등 이스케이프",
    icon: Shield,
    color: "bg-yellow-600",
    category: "텍스트 처리"
  },
  {
    id: "slug",
    title: "텍스트 to 슬러그",
    description: "URL 친화적 슬러그 생성",
    icon: Link2,
    color: "bg-green-600",
    category: "텍스트 처리"
  },

  // 인코딩/변환
  {
    id: "hash",
    title: "해시 생성기",
    description: "MD5, SHA256 등 해시 생성",
    icon: Code,
    color: "bg-green-500",
    category: "인코딩/변환"
  },
  {
    id: "base64",
    title: "Base64 변환",
    description: "인코딩/디코딩",
    icon: Binary,
    color: "bg-yellow-500",
    category: "인코딩/변환"
  },
  {
    id: "qr",
    title: "QR 코드",
    description: "QR 코드 생성기",
    icon: QrCode,
    color: "bg-teal-500",
    category: "인코딩/변환"
  },
  {
    id: "numberconv",
    title: "진법 변환기",
    description: "2진법, 8진법, 10진법, 16진법",
    icon: Calculator,
    color: "bg-indigo-600",
    category: "인코딩/변환"
  },

  // 시간/날짜
  {
    id: "time",
    title: "시간 변환",
    description: "Epoch ↔ DateTime",
    icon: Clock,
    color: "bg-red-500",
    category: "시간/날짜"
  },
  {
    id: "timezone",
    title: "시간대 변환",
    description: "타임존 간 시간 변환",
    icon: Timer,
    color: "bg-blue-600",
    category: "시간/날짜"
  },
  {
    id: "cron",
    title: "Cron 생성기",
    description: "Cron 표현식 생성/검증",
    icon: Calendar,
    color: "bg-amber-500",
    category: "시간/날짜"
  },

  // 데이터 포맷
  {
    id: "converter",
    title: "포맷 변환",
    description: "JSON ↔ CSV ↔ YAML",
    icon: RefreshCw,
    color: "bg-orange-500",
    category: "데이터 포맷"
  },
  {
    id: "json",
    title: "JSON 정리",
    description: "JSON 포맷팅/뷰어",
    icon: Braces,
    color: "bg-cyan-500",
    category: "데이터 포맷"
  },
  {
    id: "locale",
    title: "로케일 변환",
    description: "en_US ↔ ko_KR 등",
    icon: Globe,
    color: "bg-indigo-500",
    category: "데이터 포맷"
  },
  {
    id: "numberformat",
    title: "숫자 포맷터",
    description: "숫자 포맷팅 (통화, 퍼센트 등)",
    icon: Hash,
    color: "bg-purple-600",
    category: "데이터 포맷"
  },

  // 개발 도구
  {
    id: "regex",
    title: "정규식 테스터",
    description: "regex 패턴 테스트",
    icon: Search,
    color: "bg-lime-500",
    category: "개발 도구"
  },
  {
    id: "markdown",
    title: "마크다운 뷰어",
    description: "마크다운 미리보기",
    icon: Eye,
    color: "bg-emerald-500",
    category: "개발 도구"
  },
  {
    id: "cidr",
    title: "IP CIDR 계산기",
    description: "네트워크 CIDR 계산",
    icon: Network,
    color: "bg-slate-600",
    category: "개발 도구"
  }
];

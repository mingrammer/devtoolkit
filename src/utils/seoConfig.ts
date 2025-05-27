
export interface ToolSEO {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
}

export const toolSEOConfig: Record<string, ToolSEO> = {
  uuid: {
    title: "UUID 생성기 - 무료 온라인 고유 식별자 생성 도구",
    description: "빠르고 간편한 UUID v4 생성기. 개발자를 위한 무료 온라인 도구로 고유 식별자를 즉시 생성하세요.",
    keywords: ["UUID", "GUID", "고유식별자", "개발도구", "랜덤ID", "UUID생성기", "개발자도구"],
    ogTitle: "무료 UUID 생성기 | DevToolkit",
    ogDescription: "개발자를 위한 빠른 UUID 생성 도구"
  },
  hash: {
    title: "해시 생성기 - MD5, SHA256 암호화 해시 생성 도구",
    description: "MD5, SHA1, SHA256 등 다양한 해시 알고리즘으로 텍스트를 암호화하는 무료 온라인 도구입니다.",
    keywords: ["해시", "MD5", "SHA256", "암호화", "해시생성기", "보안", "개발도구", "해시함수"],
    ogTitle: "무료 해시 생성기 | DevToolkit",
    ogDescription: "MD5, SHA256 등 다양한 해시 알고리즘 지원"
  },
  lorem: {
    title: "Lorem Ipsum 생성기 - 더미 텍스트 생성 도구",
    description: "웹 디자인과 개발을 위한 Lorem Ipsum 더미 텍스트를 빠르게 생성하는 무료 온라인 도구입니다.",
    keywords: ["Lorem Ipsum", "더미텍스트", "채우기텍스트", "웹디자인", "개발도구", "목업", "플레이스홀더"],
    ogTitle: "Lorem Ipsum 생성기 | DevToolkit",
    ogDescription: "웹 디자인을 위한 더미 텍스트 생성기"
  },
  converter: {
    title: "데이터 포맷 변환기 - JSON, CSV, YAML 변환 도구",
    description: "JSON, CSV, YAML 간 데이터 포맷을 자유롭게 변환하는 무료 온라인 도구입니다.",
    keywords: ["데이터변환", "JSON", "CSV", "YAML", "포맷변환", "개발도구", "데이터처리"],
    ogTitle: "데이터 포맷 변환기 | DevToolkit",
    ogDescription: "JSON, CSV, YAML 간 무료 데이터 변환"
  },
  time: {
    title: "시간 변환기 - Unix Timestamp, Epoch 시간 변환 도구",
    description: "Unix Timestamp와 일반 날짜/시간 간 변환을 지원하는 무료 온라인 도구입니다.",
    keywords: ["시간변환", "Unix Timestamp", "Epoch", "날짜변환", "개발도구", "시간도구"],
    ogTitle: "시간 변환기 | DevToolkit",
    ogDescription: "Unix Timestamp와 날짜 간 변환 도구"
  },
  locale: {
    title: "로케일 변환기 - 다국어 지역 코드 변환 도구",
    description: "다양한 로케일 코드 형식 간 변환을 지원하는 개발자용 무료 온라인 도구입니다.",
    keywords: ["로케일", "지역코드", "언어코드", "국제화", "i18n", "개발도구"],
    ogTitle: "로케일 변환기 | DevToolkit",
    ogDescription: "다국어 지역 코드 변환 도구"
  },
  case: {
    title: "케이스 변환기 - camelCase, snake_case 텍스트 변환 도구",
    description: "camelCase, snake_case, PascalCase 등 다양한 케이스 간 텍스트 변환을 지원하는 무료 도구입니다.",
    keywords: ["케이스변환", "camelCase", "snake_case", "PascalCase", "텍스트변환", "개발도구"],
    ogTitle: "케이스 변환기 | DevToolkit",
    ogDescription: "다양한 케이스 간 텍스트 변환 도구"
  },
  json: {
    title: "JSON 정리기 - JSON 포맷팅, 검증, 뷰어 도구",
    description: "JSON 데이터를 정리하고 검증하는 무료 온라인 도구. JSON 포맷팅과 오류 검사를 지원합니다.",
    keywords: ["JSON", "JSON정리", "JSON포맷팅", "JSON검증", "개발도구", "데이터처리"],
    ogTitle: "JSON 정리기 | DevToolkit",
    ogDescription: "JSON 포맷팅과 검증을 위한 무료 도구"
  },
  base64: {
    title: "Base64 인코딩/디코딩 - 무료 온라인 변환 도구",
    description: "텍스트와 Base64 간 인코딩/디코딩을 지원하는 빠르고 안전한 무료 온라인 도구입니다.",
    keywords: ["Base64", "인코딩", "디코딩", "텍스트변환", "개발도구", "데이터변환"],
    ogTitle: "Base64 변환기 | DevToolkit",
    ogDescription: "Base64 인코딩/디코딩 무료 도구"
  },
  qr: {
    title: "QR 코드 생성기 - 무료 온라인 QR 코드 제작 도구",
    description: "텍스트, URL을 QR 코드로 변환하는 무료 온라인 도구. 다양한 크기와 다운로드 지원.",
    keywords: ["QR코드", "QR생성기", "바코드", "URL단축", "QR코드제작", "무료도구"],
    ogTitle: "QR 코드 생성기 | DevToolkit",
    ogDescription: "무료 온라인 QR 코드 생성 및 다운로드"
  },
  regex: {
    title: "정규식 테스터 - 정규표현식 패턴 테스트 도구",
    description: "정규표현식 패턴을 실시간으로 테스트하고 검증할 수 있는 무료 온라인 도구입니다.",
    keywords: ["정규식", "정규표현식", "regex", "패턴매칭", "텍스트처리", "개발도구"],
    ogTitle: "정규식 테스터 | DevToolkit",
    ogDescription: "정규표현식 패턴 테스트 및 검증 도구"
  },
  cron: {
    title: "Cron 표현식 생성기 - 스케줄링 도구",
    description: "Cron 표현식을 쉽게 생성하고 검증하는 무료 온라인 도구. 스케줄링 작업에 최적화.",
    keywords: ["Cron", "스케줄링", "작업스케줄", "Cron표현식", "개발도구", "자동화"],
    ogTitle: "Cron 생성기 | DevToolkit",
    ogDescription: "Cron 표현식 생성 및 검증 도구"
  },
  markdown: {
    title: "마크다운 뷰어 - Markdown 미리보기 도구",
    description: "마크다운 텍스트를 실시간으로 미리보기할 수 있는 무료 온라인 에디터입니다.",
    keywords: ["마크다운", "Markdown", "미리보기", "에디터", "문서작성", "개발도구"],
    ogTitle: "마크다운 뷰어 | DevToolkit",
    ogDescription: "실시간 마크다운 미리보기 도구"
  },
  password: {
    title: "비밀번호 생성기 - 강력한 패스워드 생성 도구",
    description: "안전하고 강력한 비밀번호를 생성하는 무료 온라인 도구. 다양한 옵션과 길이 설정 지원.",
    keywords: ["비밀번호생성기", "패스워드", "보안", "강력한비밀번호", "랜덤비밀번호", "보안도구"],
    ogTitle: "비밀번호 생성기 | DevToolkit",
    ogDescription: "안전한 강력한 비밀번호 생성 도구"
  },
  timezone: {
    title: "시간대 변환기 - 타임존 시간 변환 도구",
    description: "전 세계 시간대 간 시간 변환을 지원하는 무료 온라인 도구입니다.",
    keywords: ["시간대변환", "타임존", "세계시간", "시간변환", "UTC", "개발도구"],
    ogTitle: "시간대 변환기 | DevToolkit",
    ogDescription: "전 세계 시간대 간 변환 도구"
  },
  cidr: {
    title: "IP CIDR 계산기 - 네트워크 서브넷 계산 도구",
    description: "IP 주소와 CIDR 표기법을 이용한 네트워크 서브넷 계산 무료 온라인 도구입니다.",
    keywords: ["CIDR", "IP계산기", "서브넷", "네트워크", "IP주소", "개발도구", "인프라"],
    ogTitle: "IP CIDR 계산기 | DevToolkit",
    ogDescription: "네트워크 서브넷 계산 도구"
  },
  numberconv: {
    title: "진법 변환기 - 2진법, 8진법, 10진법, 16진법 변환 도구",
    description: "2진법, 8진법, 10진법, 16진법 간 숫자 변환을 지원하는 무료 온라인 계산기입니다.",
    keywords: ["진법변환", "2진법", "8진법", "16진법", "숫자변환", "개발도구", "계산기"],
    ogTitle: "진법 변환기 | DevToolkit",
    ogDescription: "다양한 진법 간 숫자 변환 도구"
  },
  numberformat: {
    title: "숫자 포맷터 - 통화, 퍼센트 숫자 포맷팅 도구",
    description: "숫자를 통화, 퍼센트, 천 단위 구분 등 다양한 형식으로 포맷팅하는 무료 도구입니다.",
    keywords: ["숫자포맷팅", "통화포맷", "퍼센트", "천단위구분", "숫자변환", "개발도구"],
    ogTitle: "숫자 포맷터 | DevToolkit",
    ogDescription: "숫자 포맷팅 및 변환 도구"
  },
  textdiff: {
    title: "텍스트 비교 도구 - 두 텍스트 차이점 분석",
    description: "두 텍스트 간의 차이점을 시각적으로 비교하고 분석하는 무료 온라인 도구입니다.",
    keywords: ["텍스트비교", "차이점분석", "diff", "텍스트차이", "비교도구", "개발도구"],
    ogTitle: "텍스트 비교 도구 | DevToolkit",
    ogDescription: "두 텍스트 간 차이점 비교 및 분석"
  },
  escape: {
    title: "이스케이프 도구 - HTML, URL, JSON 이스케이프/언이스케이프",
    description: "HTML, URL, JSON 등의 특수문자를 이스케이프/언이스케이프하는 무료 온라인 도구입니다.",
    keywords: ["이스케이프", "HTML이스케이프", "URL인코딩", "JSON이스케이프", "특수문자", "개발도구"],
    ogTitle: "이스케이프 도구 | DevToolkit",
    ogDescription: "HTML, URL, JSON 이스케이프 처리 도구"
  },
  slug: {
    title: "텍스트 to 슬러그 변환기 - URL 친화적 슬러그 생성",
    description: "텍스트를 URL 친화적인 슬러그로 변환하는 무료 온라인 도구. SEO 최적화에 도움됩니다.",
    keywords: ["슬러그변환", "URL슬러그", "텍스트변환", "SEO", "URL최적화", "개발도구"],
    ogTitle: "슬러그 변환기 | DevToolkit",
    ogDescription: "URL 친화적 슬러그 생성 도구"
  }
};

export const getToolSEO = (toolId: string): ToolSEO => {
  return toolSEOConfig[toolId] || {
    title: "DevToolkit - 개발자를 위한 무료 온라인 도구",
    description: "개발자를 위한 다양한 무료 온라인 도구 모음. UUID 생성, 해시 생성, 데이터 변환 등 다양한 개발 도구를 제공합니다.",
    keywords: ["개발도구", "무료도구", "온라인도구", "개발자도구", "웹도구"],
  };
};

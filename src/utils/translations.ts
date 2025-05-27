
export type Language = 'en' | 'ko';

export interface Translations {
  // Common
  search: string;
  advertisement: string;
  all: string;
  
  // Header
  devToolkit: string;
  searchTools: string;
  
  // Categories
  textProcessing: string;
  encodingConversion: string;
  timeDate: string;
  dataFormat: string;
  devTools: string;
  
  // Tools
  uuidGenerator: string;
  uuidDescription: string;
  hashGenerator: string;
  hashDescription: string;
  loremIpsum: string;
  loremDescription: string;
  formatConverter: string;
  formatDescription: string;
  timeConverter: string;
  timeDescription: string;
  localeConverter: string;
  localeDescription: string;
  caseConverter: string;
  caseDescription: string;
  jsonPrettifier: string;
  jsonDescription: string;
  base64Converter: string;
  base64Description: string;
  qrGenerator: string;
  qrDescription: string;
  regexTester: string;
  regexDescription: string;
  cronGenerator: string;
  cronDescription: string;
  markdownViewer: string;
  markdownDescription: string;
  passwordGenerator: string;
  passwordDescription: string;
  timezoneConverter: string;
  timezoneDescription: string;
  cidrCalculator: string;
  cidrDescription: string;
  numberConverter: string;
  numberDescription: string;
  numberFormatter: string;
  numberFormatterDescription: string;
  textDiff: string;
  textDiffDescription: string;
  escapeUnescape: string;
  escapeDescription: string;
  textToSlug: string;
  slugDescription: string;
  
  // Sponsor
  supportMessage: string;
  buyMeCoffee: string;
  supportDescription: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Common
    search: 'Search',
    advertisement: 'Advertisement',
    all: 'All',
    
    // Header
    devToolkit: 'DevToolkit',
    searchTools: 'Search tools...',
    
    // Categories
    textProcessing: 'Text Processing',
    encodingConversion: 'Encoding/Conversion',
    timeDate: 'Time/Date',
    dataFormat: 'Data Format',
    devTools: 'Dev Tools',
    
    // Tools
    uuidGenerator: 'UUID Generator',
    uuidDescription: 'Generate random UUID (v4)',
    hashGenerator: 'Hash Generator',
    hashDescription: 'Generate MD5, SHA256 etc.',
    loremIpsum: 'Lorem Ipsum',
    loremDescription: 'Generate placeholder text',
    formatConverter: 'Format Converter',
    formatDescription: 'JSON ↔ CSV ↔ YAML',
    timeConverter: 'Time Converter',
    timeDescription: 'Epoch ↔ DateTime',
    localeConverter: 'Locale Converter',
    localeDescription: 'en_US ↔ ko_KR etc.',
    caseConverter: 'Case Converter',
    caseDescription: 'camelCase ↔ snake_case',
    jsonPrettifier: 'JSON Prettifier',
    jsonDescription: 'JSON formatting/viewer',
    base64Converter: 'Base64 Converter',
    base64Description: 'Encoding/Decoding',
    qrGenerator: 'QR Code Generator',
    qrDescription: 'Generate QR codes',
    regexTester: 'Regex Tester',
    regexDescription: 'Test regex patterns',
    cronGenerator: 'Cron Generator',
    cronDescription: 'Generate/validate Cron expressions',
    markdownViewer: 'Markdown Viewer',
    markdownDescription: 'Markdown preview',
    passwordGenerator: 'Password Generator',
    passwordDescription: 'Generate secure passwords',
    timezoneConverter: 'Timezone Converter',
    timezoneDescription: 'Convert between timezones',
    cidrCalculator: 'IP CIDR Calculator',
    cidrDescription: 'Network CIDR calculation',
    numberConverter: 'Number Base Converter',
    numberDescription: 'Binary, octal, decimal, hex',
    numberFormatter: 'Number Formatter',
    numberFormatterDescription: 'Format numbers (currency, percent)',
    textDiff: 'Text Diff',
    textDiffDescription: 'Compare text differences',
    escapeUnescape: 'Escape/Unescape',
    escapeDescription: 'HTML, URL, JSON escape',
    textToSlug: 'Text to Slug',
    slugDescription: 'Generate URL-friendly slugs',
    
    // Sponsor
    supportMessage: 'If this tool is helpful',
    buyMeCoffee: 'Buy me a coffee',
    supportDescription: 'Helps with development and maintenance',
  },
  ko: {
    // Common
    search: '검색',
    advertisement: '광고',
    all: '전체',
    
    // Header
    devToolkit: 'DevToolkit',
    searchTools: '도구 검색...',
    
    // Categories
    textProcessing: '텍스트 처리',
    encodingConversion: '인코딩/변환',
    timeDate: '시간/날짜',
    dataFormat: '데이터 포맷',
    devTools: '개발 도구',
    
    // Tools
    uuidGenerator: 'UUID 생성기',
    uuidDescription: '랜덤 UUID (v4) 생성',
    hashGenerator: '해시 생성기',
    hashDescription: 'MD5, SHA256 등 해시 생성',
    loremIpsum: 'Lorem Ipsum',
    loremDescription: '목업용 텍스트 생성',
    formatConverter: '포맷 변환',
    formatDescription: 'JSON ↔ CSV ↔ YAML',
    timeConverter: '시간 변환',
    timeDescription: 'Epoch ↔ DateTime',
    localeConverter: '로케일 변환',
    localeDescription: 'en_US ↔ ko_KR 등',
    caseConverter: '케이스 변환',
    caseDescription: 'camelCase ↔ snake_case',
    jsonPrettifier: 'JSON 정리',
    jsonDescription: 'JSON 포맷팅/뷰어',
    base64Converter: 'Base64 변환',
    base64Description: '인코딩/디코딩',
    qrGenerator: 'QR 코드',
    qrDescription: 'QR 코드 생성기',
    regexTester: '정규식 테스터',
    regexDescription: 'regex 패턴 테스트',
    cronGenerator: 'Cron 생성기',
    cronDescription: 'Cron 표현식 생성/검증',
    markdownViewer: '마크다운 뷰어',
    markdownDescription: '마크다운 미리보기',
    passwordGenerator: '비밀번호 생성기',
    passwordDescription: '조건에 따른 비밀번호 생성',
    timezoneConverter: '시간대 변환',
    timezoneDescription: '타임존 간 시간 변환',
    cidrCalculator: 'IP CIDR 계산기',
    cidrDescription: '네트워크 CIDR 계산',
    numberConverter: '진법 변환기',
    numberDescription: '2진법, 8진법, 10진법, 16진법',
    numberFormatter: '숫자 포맷터',
    numberFormatterDescription: '숫자 포맷팅 (통화, 퍼센트 등)',
    textDiff: '텍스트 비교',
    textDiffDescription: '두 텍스트 간 차이점 비교',
    escapeUnescape: '이스케이프 도구',
    escapeDescription: 'HTML, URL, JSON 등 이스케이프',
    textToSlug: '텍스트 to 슬러그',
    slugDescription: 'URL 친화적 슬러그 생성',
    
    // Sponsor
    supportMessage: '도구가 유용하다면',
    buyMeCoffee: '커피 한 잔 사주기',
    supportDescription: '개발과 운영에 도움이 됩니다',
  },
};

export type TranslationKey = keyof Translations;

// IP 기반 언어 감지 함수
export const detectLanguageFromIP = async (): Promise<Language> => {
  try {
    // IP 위치 정보를 가져오는 무료 API 사용
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    // 한국이면 한국어, 나머지는 영어
    if (data.country_code === 'KR') {
      return 'ko';
    }
    return 'en';
  } catch (error) {
    console.log('Language detection failed, using default:', error);
    return 'en'; // 기본값은 영어
  }
};

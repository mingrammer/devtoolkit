export type Language = 'en' | 'ko';

export interface Translations {
  // Common
  search: string;
  advertisement: string;
  all: string;
  free: string;
  
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
  
  // Index page
  freeUsage: string;
  developmentTools: string;
  productivityMessage: string;
  seeMore: string;
  usageStats: string;
  todayUsage: string;
  totalTools: string;
  dailyUsers: string;
  developersEssential: string;
  essentialDescription: string;
  noResults: string;
  tryDifferentKeyword: string;
  needMoreTools: string;
  premiumToolsMessage: string;
  viewPremiumTools: string;
  footerCopyright: string;
  madeWithLove: string;

  // JSON Tool specific
  jsonInputLabel: string;
  jsonOutputLabel: string;
  jsonInputPlaceholder: string;
  jsonOutputPlaceholder: string;
  prettifyButton: string;
  minifyButton: string;
  validateButton: string;
  loadSampleButton: string;
  copyButton: string;
  featuresTitle: string;
  prettifyFeature: string;
  minifyFeature: string;
  validateFeature: string;
  sampleFeature: string;
  jsonFormatted: string;
  jsonMinified: string;
  jsonValid: string;
  jsonInvalid: string;
  jsonInvalidError: string;
  jsonRequired: string;
  copySuccess: string;
  copyError: string;

  // Hash Generator
  hashInputLabel: string;
  hashInputPlaceholder: string;
  hashTypeLabel: string;
  hashGenerateButton: string;
  hashResultLabel: string;
  hashRequired: string;

  // Base64 Converter
  base64OriginalText: string;
  base64EncodedText: string;
  base64EncodeButton: string;
  base64DecodeButton: string;
  base64ToggleMode: string;
  base64EncodePlaceholder: string;
  base64DecodePlaceholder: string;
  base64ResultPlaceholder: string;
  base64What: string;
  base64Encoded: string;
  base64Decoded: string;
  base64Required: string;
  base64InvalidFormat: string;

  // Case Converter
  caseInputLabel: string;
  caseInputPlaceholder: string;
  caseConvertButton: string;
  caseResultLabel: string;
  caseConverted: string;
  caseRequired: string;
  caseSupportedTitle: string;
  caseCamelDescription: string;
  casePascalDescription: string;
  caseSnakeDescription: string;
  caseKebabDescription: string;
  caseUpperDescription: string;
  caseTitleDescription: string;

  // UUID Generator
  uuidSingleGeneration: string;
  uuidMultipleGeneration: string;
  uuidCount: string;
  uuidGenerate: string;
  uuidSinglePlaceholder: string;
  uuidMultiplePlaceholder: string;

  // CIDR Calculator
  cidrInputLabel: string;
  cidrInputPlaceholder: string;
  cidrCalculateButton: string;
  cidrCalculated: string;
  cidrInvalidFormat: string;
  cidrNetworkInfo: string;
  cidrHostInfo: string;
  cidrSubnetMask: string;
  cidrNetworkAddress: string;
  cidrBroadcastAddress: string;
  cidrFirstHost: string;
  cidrLastHost: string;
  cidrTotalHosts: string;
  cidrUsableHosts: string;

  // Lorem Generator
  loremCountLabel: string;
  loremTypeLabel: string;
  loremWordsType: string;
  loremSentencesType: string;
  loremParagraphsType: string;
  loremGenerateButton: string;
  loremResultLabel: string;

  // Markdown Viewer
  markdownEditorTitle: string;
  markdownSampleButton: string;
  markdownSourceLabel: string;
  markdownPreviewLabel: string;
  markdownPlaceholder: string;
  markdownCopyHtml: string;
  markdownSyntaxTitle: string;

  // Common UI
  generate: string;
  copy: string;
  clear: string;
  refresh: string;
  settings: string;
  format: string;
  validate: string;
  input: string;
  output: string;
  result: string;
  options: string;
  features: string;
  inputText: string;
  outputText: string;
  convertedText: string;
  required: string;
  invalidFormat: string;
  converted: string;
  calculationComplete: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Common
    search: 'Search',
    advertisement: 'Advertisement',
    all: 'All',
    free: 'Free to use',
    
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
    
    // Index page
    freeUsage: 'Free to use',
    developmentTools: 'Development Tools',
    productivityMessage: 'Check out the latest development tools that boost productivity',
    seeMore: 'See More',
    usageStats: 'Usage Statistics',
    todayUsage: 'Today\'s Usage',
    totalTools: 'Total Tools',
    dailyUsers: 'Thousands of developers use this daily',
    developersEssential: 'Essential Tools for Developers',
    essentialDescription: 'A collection of utility tools to handle common development tasks quickly and easily.',
    noResults: 'No search results found.',
    tryDifferentKeyword: 'Try searching with different keywords.',
    needMoreTools: 'Need more development tools?',
    premiumToolsMessage: 'From code generation to debugging and performance optimization - discover tools that maximize development productivity',
    viewPremiumTools: 'View Premium Tools',
    footerCopyright: 'Essential utility collection for developers',
    madeWithLove: 'Made with ❤️ for developers',

    // JSON Tool specific
    jsonInputLabel: 'Input JSON',
    jsonOutputLabel: 'Output JSON',
    jsonInputPlaceholder: 'Enter or paste JSON data here',
    jsonOutputPlaceholder: 'Formatted JSON will appear here',
    prettifyButton: 'Format (Pretty)',
    minifyButton: 'Compress (Minify)',
    validateButton: 'Validate',
    loadSampleButton: 'Load Sample',
    copyButton: 'Copy',
    featuresTitle: 'Features',
    prettifyFeature: 'Format (Pretty): Organize JSON with indentation and line breaks for readability',
    minifyFeature: 'Compress (Minify): Remove unnecessary whitespace to minimize JSON size',
    validateFeature: 'Validate: Check if JSON syntax is correct',
    sampleFeature: 'Load Sample: Load sample JSON data for testing',
    jsonFormatted: 'JSON has been formatted',
    jsonMinified: 'JSON has been compressed',
    jsonValid: 'Valid JSON',
    jsonInvalid: 'Invalid JSON format',
    jsonInvalidError: 'Invalid JSON format: ',
    jsonRequired: 'Please enter JSON data',
    copySuccess: 'Copied to clipboard',
    copyError: 'Copy failed',

    // Hash Generator
    hashInputLabel: 'Input Text',
    hashInputPlaceholder: 'Enter text to generate hash',
    hashTypeLabel: 'Hash Type',
    hashGenerateButton: 'Generate Hash',
    hashResultLabel: 'Generated Hash',
    hashRequired: 'Please enter text to hash',

    // Base64 Converter
    base64OriginalText: 'Original Text',
    base64EncodedText: 'Base64 Encoded Text',
    base64EncodeButton: 'Encode to Base64',
    base64DecodeButton: 'Decode from Base64',
    base64ToggleMode: 'Switch Mode',
    base64EncodePlaceholder: 'Enter text to encode',
    base64DecodePlaceholder: 'Enter Base64 text to decode',
    base64ResultPlaceholder: 'Conversion result will appear here',
    base64What: 'What is Base64?',
    base64Encoded: 'Base64 encoding completed',
    base64Decoded: 'Base64 decoding completed',
    base64Required: 'Please enter text to convert',
    base64InvalidFormat: 'Invalid format. Please check if the input is correct.',

    // Case Converter
    caseInputLabel: 'Text to Convert',
    caseInputPlaceholder: 'Enter text to convert (e.g., hello world, hello_world, hello-world)',
    caseConvertButton: 'Convert',
    caseResultLabel: 'Conversion Results',
    caseConverted: 'Conversion completed',
    caseRequired: 'Please enter text to convert',
    caseSupportedTitle: 'Supported Conversions',
    caseCamelDescription: 'camelCase: First word lowercase, rest start with uppercase',
    casePascalDescription: 'PascalCase: All words start with uppercase',
    caseSnakeDescription: 'snake_case: Words separated by underscores',
    caseKebabDescription: 'kebab-case: Words separated by hyphens',
    caseUpperDescription: 'UPPER_CASE: All characters uppercase',
    caseTitleDescription: 'Title Case: First letter of each word capitalized',

    // UUID Generator
    uuidSingleGeneration: 'Single UUID Generation',
    uuidMultipleGeneration: 'Multiple UUID Generation',
    uuidCount: 'Count:',
    uuidGenerate: 'Generate',
    uuidSinglePlaceholder: 'Generated UUID will appear here',
    uuidMultiplePlaceholder: 'Generated UUIDs will appear here',

    // Common UI
    generate: 'Generate',
    copy: 'Copy',
    clear: 'Clear',
    refresh: 'Refresh',
    settings: 'Settings',
    format: 'Format',
    validate: 'Validate',
    input: 'Input',
    output: 'Output',
    result: 'Result',
    options: 'Options',
    features: 'Features',
    inputText: 'Input Text',
    outputText: 'Output Text',
    convertedText: 'Converted Text',
    required: 'This field is required',
    invalidFormat: 'Invalid format',
    converted: 'Converted',
    calculationComplete: 'Calculation completed',
  },
  ko: {
    // Common
    search: '검색',
    advertisement: '광고',
    all: '전체',
    free: '무료 사용',
    
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
    
    // Index page
    freeUsage: '무료 사용',
    developmentTools: '개발 도구 추천',
    productivityMessage: '생산성을 높이는 최신 개발도구를 확인해보세요',
    seeMore: '자세히 보기',
    usageStats: '사용 통계',
    todayUsage: '오늘 사용',
    totalTools: '전체 도구',
    dailyUsers: '매일 수천 명의 개발자가 사용하고 있습니다',
    developersEssential: '개발자를 위한 필수 도구들',
    essentialDescription: '일상적인 개발 작업을 빠르고 쉽게 처리할 수 있는 유틸리티 도구 모음입니다.',
    noResults: '검색 결과가 없습니다.',
    tryDifferentKeyword: '다른 키워드로 검색해보세요.',
    needMoreTools: '더 많은 개발 도구가 필요하신가요?',
    premiumToolsMessage: '코드 생성, 디버깅, 성능 최적화까지 - 개발 생산성을 극대화하는 도구들을 만나보세요',
    viewPremiumTools: '프리미엄 도구 보기',
    footerCopyright: '개발자를 위한 필수 유틸리티 모음',
    madeWithLove: 'Made with ❤️ for developers',

    // JSON Tool specific
    jsonInputLabel: '입력 JSON',
    jsonOutputLabel: '출력 JSON',
    jsonInputPlaceholder: 'JSON 데이터를 입력하거나 붙여넣기하세요',
    jsonOutputPlaceholder: '정리된 JSON이 여기에 표시됩니다',
    prettifyButton: '정리 (Pretty)',
    minifyButton: '압축 (Minify)',
    validateButton: '검증',
    loadSampleButton: '샘플 로드',
    copyButton: '복사',
    featuresTitle: '기능',
    prettifyFeature: '정리 (Pretty): JSON을 들여쓰기와 줄바꿈으로 읽기 쉽게 정리',
    minifyFeature: '압축 (Minify): 불필요한 공백을 제거하여 JSON 크기 최소화',
    validateFeature: '검증: JSON 문법이 올바른지 확인',
    sampleFeature: '샘플 로드: 테스트용 샘플 JSON 데이터 로드',
    jsonFormatted: 'JSON이 정리되었습니다',
    jsonMinified: 'JSON이 압축되었습니다',
    jsonValid: '유효한 JSON입니다',
    jsonInvalid: '올바른 JSON 형식이 아닙니다',
    jsonInvalidError: '올바른 JSON 형식이 아닙니다: ',
    jsonRequired: 'JSON 데이터를 입력해주세요',
    copySuccess: '클립보드에 복사되었습니다',
    copyError: '복사 중 오류가 발생했습니다',

    // Hash Generator
    hashInputLabel: '입력 텍스트',
    hashInputPlaceholder: '해시를 생성할 텍스트를 입력하세요',
    hashTypeLabel: '해시 타입',
    hashGenerateButton: '해시 생성',
    hashResultLabel: '생성된 해시',
    hashRequired: '입력 텍스트를 입력해주세요',

    // Base64 Converter
    base64OriginalText: '원본 텍스트',
    base64EncodedText: 'Base64 인코딩된 텍스트',
    base64EncodeButton: 'Base64로 인코딩',
    base64DecodeButton: 'Base64에서 디코딩',
    base64ToggleMode: '변환 방향 바꾸기',
    base64EncodePlaceholder: '인코딩할 텍스트를 입력하세요',
    base64DecodePlaceholder: '디코딩할 Base64 텍스트를 입력하세요',
    base64ResultPlaceholder: '변환 결과가 여기에 표시됩니다',
    base64What: 'Base64란?',
    base64Encoded: 'Base64 인코딩이 완료되었습니다',
    base64Decoded: 'Base64 디코딩이 완료되었습니다',
    base64Required: '입력 텍스트를 입력해주세요',
    base64InvalidFormat: '변환 중 오류가 발생했습니다. 올바른 형식인지 확인해주세요.',

    // Case Converter
    caseInputLabel: '변환할 텍스트',
    caseInputPlaceholder: '변환할 텍스트를 입력하세요 (예: hello world, hello_world, hello-world)',
    caseConvertButton: '변환하기',
    caseResultLabel: '변환 결과',
    caseConverted: '변환이 완료되었습니다',
    caseRequired: '변환할 텍스트를 입력해주세요',
    caseSupportedTitle: '지원하는 변환',
    caseCamelDescription: 'camelCase: 첫 번째 단어는 소문자, 나머지는 대문자로 시작',
    casePascalDescription: 'PascalCase: 모든 단어를 대문자로 시작',
    caseSnakeDescription: 'snake_case: 언더스코어로 단어 구분',
    caseKebabDescription: 'kebab-case: 하이픈으로 단어 구분',
    caseUpperDescription: 'UPPER_CASE: 모든 문자를 대문자로',
    caseTitleDescription: 'Title Case: 각 단어의 첫 글자를 대문자로',

    // UUID Generator
    uuidSingleGeneration: '단일 UUID 생성',
    uuidMultipleGeneration: '다중 UUID 생성',
    uuidCount: '개수:',
    uuidGenerate: '생성',
    uuidSinglePlaceholder: '생성된 UUID가 여기에 표시됩니다',
    uuidMultiplePlaceholder: '생성된 UUIDs가 여기에 표시됩니다',

    // Common UI
    generate: '생성',
    copy: '복사',
    clear: '지우기',
    refresh: '새로고침',
    settings: '설정',
    format: '포맷',
    validate: '검증',
    input: '입력',
    output: '출력',
    result: '결과',
    options: '옵션',
    features: '기능',
    inputText: '입력 텍스트',
    outputText: '출력 텍스트',
    convertedText: '변환된 텍스트',
    required: '필수 입력 항목입니다',
    invalidFormat: '올바른 형식이 아닙니다',
    converted: '변환되었습니다',
    calculationComplete: '계산이 완료되었습니다',
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

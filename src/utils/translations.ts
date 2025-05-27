
export type Language = 'en' | 'ko' | 'ja' | 'zh';

export interface Translations {
  // Common
  search: string;
  advertisement: string;
  
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
  ja: {
    // Common
    search: '検索',
    advertisement: '広告',
    
    // Header
    devToolkit: 'DevToolkit',
    searchTools: 'ツール検索...',
    
    // Categories
    textProcessing: 'テキスト処理',
    encodingConversion: 'エンコーディング/変換',
    timeDate: '時間/日付',
    dataFormat: 'データフォーマット',
    devTools: '開発ツール',
    
    // Tools
    uuidGenerator: 'UUID生成器',
    uuidDescription: 'ランダムUUID (v4) 生成',
    hashGenerator: 'ハッシュ生成器',
    hashDescription: 'MD5、SHA256等のハッシュ生成',
    loremIpsum: 'Lorem Ipsum',
    loremDescription: 'プレースホルダーテキスト生成',
    formatConverter: 'フォーマット変換',
    formatDescription: 'JSON ↔ CSV ↔ YAML',
    timeConverter: '時間変換',
    timeDescription: 'Epoch ↔ DateTime',
    localeConverter: 'ロケール変換',
    localeDescription: 'en_US ↔ ko_KR等',
    caseConverter: 'ケース変換',
    caseDescription: 'camelCase ↔ snake_case',
    jsonPrettifier: 'JSON整理',
    jsonDescription: 'JSONフォーマット/ビューア',
    base64Converter: 'Base64変換',
    base64Description: 'エンコーディング/デコーディング',
    qrGenerator: 'QRコード生成器',
    qrDescription: 'QRコード生成',
    regexTester: '正規表現テスター',
    regexDescription: '正規表現パターンテスト',
    cronGenerator: 'Cron生成器',
    cronDescription: 'Cron式生成/検証',
    markdownViewer: 'Markdownビューア',
    markdownDescription: 'Markdownプレビュー',
    passwordGenerator: 'パスワード生成器',
    passwordDescription: '安全なパスワード生成',
    timezoneConverter: 'タイムゾーン変換',
    timezoneDescription: 'タイムゾーン間の時間変換',
    cidrCalculator: 'IP CIDR計算機',
    cidrDescription: 'ネットワークCIDR計算',
    numberConverter: '基数変換器',
    numberDescription: '2進法、8進法、10進法、16進法',
    numberFormatter: '数値フォーマッター',
    numberFormatterDescription: '数値フォーマット（通貨、パーセント等）',
    textDiff: 'テキスト比較',
    textDiffDescription: '2つのテキストの差分比較',
    escapeUnescape: 'エスケープツール',
    escapeDescription: 'HTML、URL、JSONエスケープ',
    textToSlug: 'テキストtoスラッグ',
    slugDescription: 'URL フレンドリーなスラッグ生成',
    
    // Sponsor
    supportMessage: 'このツールが役に立ったら',
    buyMeCoffee: 'コーヒーをおごる',
    supportDescription: '開発と運営に役立ちます',
  },
  zh: {
    // Common
    search: '搜索',
    advertisement: '广告',
    
    // Header
    devToolkit: 'DevToolkit',
    searchTools: '搜索工具...',
    
    // Categories
    textProcessing: '文本处理',
    encodingConversion: '编码/转换',
    timeDate: '时间/日期',
    dataFormat: '数据格式',
    devTools: '开发工具',
    
    // Tools
    uuidGenerator: 'UUID生成器',
    uuidDescription: '生成随机UUID (v4)',
    hashGenerator: '哈希生成器',
    hashDescription: '生成MD5、SHA256等哈希',
    loremIpsum: 'Lorem Ipsum',
    loremDescription: '生成占位符文本',
    formatConverter: '格式转换器',
    formatDescription: 'JSON ↔ CSV ↔ YAML',
    timeConverter: '时间转换器',
    timeDescription: 'Epoch ↔ DateTime',
    localeConverter: '区域设置转换器',
    localeDescription: 'en_US ↔ ko_KR等',
    caseConverter: '大小写转换器',
    caseDescription: 'camelCase ↔ snake_case',
    jsonPrettifier: 'JSON格式化器',
    jsonDescription: 'JSON格式化/查看器',
    base64Converter: 'Base64转换器',
    base64Description: '编码/解码',
    qrGenerator: '二维码生成器',
    qrDescription: '生成二维码',
    regexTester: '正则表达式测试器',
    regexDescription: '测试正则表达式模式',
    cronGenerator: 'Cron生成器',
    cronDescription: '生成/验证Cron表达式',
    markdownViewer: 'Markdown查看器',
    markdownDescription: 'Markdown预览',
    passwordGenerator: '密码生成器',
    passwordDescription: '生成安全密码',
    timezoneConverter: '时区转换器',
    timezoneDescription: '时区间时间转换',
    cidrCalculator: 'IP CIDR计算器',
    cidrDescription: '网络CIDR计算',
    numberConverter: '进制转换器',
    numberDescription: '二进制、八进制、十进制、十六进制',
    numberFormatter: '数字格式化器',
    numberFormatterDescription: '数字格式化（货币、百分比等）',
    textDiff: '文本比较',
    textDiffDescription: '比较两个文本的差异',
    escapeUnescape: '转义工具',
    escapeDescription: 'HTML、URL、JSON转义',
    textToSlug: '文本转网址',
    slugDescription: '生成URL友好的网址',
    
    // Sponsor
    supportMessage: '如果这个工具有用',
    buyMeCoffee: '请我喝咖啡',
    supportDescription: '有助于开发和维护',
  },
};

export type TranslationKey = keyof Translations;

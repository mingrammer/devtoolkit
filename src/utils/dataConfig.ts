
// 필드 정의
export interface FieldDefinition {
  key: string;
  name: string;
  description: string;
}

// 국가 정의
export interface CountryDefinition {
  code: string;
  name: string;
}

// 언어 정의
export interface LanguageDefinition {
  code: string;
  name: string;
}

// 데이터 타입별 필드 매핑
const dataTypeFields: Record<string, FieldDefinition[]> = {
  users: [
    { key: "id", name: "ID", description: "고유 식별자" },
    { key: "name", name: "이름", description: "사용자 이름" },
    { key: "email", name: "이메일", description: "이메일 주소" },
    { key: "phone", name: "전화번호", description: "휴대폰 번호" },
    { key: "age", name: "나이", description: "사용자 나이" },
    { key: "birthDate", name: "생년월일", description: "출생일" },
    { key: "address", name: "주소", description: "거주지 주소" },
    { key: "joinDate", name: "가입일", description: "서비스 가입일" }
  ],
  products: [
    { key: "id", name: "상품 ID", description: "상품 고유 번호" },
    { key: "name", name: "상품명", description: "상품 이름" },
    { key: "category", name: "카테고리", description: "상품 분류" },
    { key: "price", name: "가격", description: "판매 가격" },
    { key: "description", name: "설명", description: "상품 설명" },
    { key: "stock", name: "재고", description: "재고 수량" },
    { key: "rating", name: "평점", description: "사용자 평점" },
    { key: "createdAt", name: "등록일", description: "상품 등록일" }
  ],
  addresses: [
    { key: "id", name: "주소 ID", description: "주소 고유 번호" },
    { key: "street", name: "도로명", description: "도로명 주소" },
    { key: "buildingNumber", name: "건물번호", description: "건물 번호" },
    { key: "city", name: "도시", description: "도시명" },
    { key: "district", name: "구/군", description: "행정구역" },
    { key: "postalCode", name: "우편번호", description: "우편번호" },
    { key: "country", name: "국가", description: "국가명" },
    { key: "coordinates", name: "좌표", description: "위도/경도" }
  ],
  financial: [
    { key: "id", name: "거래 ID", description: "거래 고유 번호" },
    { key: "accountNumber", name: "계좌번호", description: "은행 계좌번호" },
    { key: "cardNumber", name: "카드번호", description: "신용카드 번호" },
    { key: "bankName", name: "은행명", description: "금융기관명" },
    { key: "balance", name: "잔액", description: "계좌 잔액" },
    { key: "transactionAmount", name: "거래금액", description: "거래 금액" },
    { key: "transactionDate", name: "거래일", description: "거래 날짜" },
    { key: "transactionType", name: "거래유형", description: "입금/출금/이체" }
  ],
  events: [
    { key: "id", name: "이벤트 ID", description: "이벤트 고유 번호" },
    { key: "title", name: "제목", description: "이벤트 제목" },
    { key: "description", name: "설명", description: "이벤트 설명" },
    { key: "startDate", name: "시작일", description: "시작 날짜" },
    { key: "endDate", name: "종료일", description: "종료 날짜" },
    { key: "location", name: "장소", description: "이벤트 장소" },
    { key: "attendees", name: "참석자", description: "참석자 수" },
    { key: "status", name: "상태", description: "이벤트 상태" }
  ],
  numbers: [
    { key: "id", name: "ID", description: "순차 번호" },
    { key: "randomInt", name: "정수", description: "랜덤 정수" },
    { key: "randomFloat", name: "실수", description: "랜덤 실수" },
    { key: "percentage", name: "퍼센트", description: "0-100% 값" },
    { key: "uuid", name: "UUID", description: "고유 식별자" },
    { key: "sequence", name: "시퀀스", description: "순차 번호" },
    { key: "binary", name: "이진값", description: "0 또는 1" },
    { key: "hex", name: "색상코드", description: "16진수 색상" }
  ]
};

// 지원 국가 목록
const countries: CountryDefinition[] = [
  { code: "kr", name: "🇰🇷 한국" },
  { code: "us", name: "🇺🇸 미국" },
  { code: "jp", name: "🇯🇵 일본" },
  { code: "cn", name: "🇨🇳 중국" },
  { code: "gb", name: "🇬🇧 영국" },
  { code: "de", name: "🇩🇪 독일" },
  { code: "fr", name: "🇫🇷 프랑스" },
  { code: "ca", name: "🇨🇦 캐나다" }
];

// 지원 언어 목록
const languages: LanguageDefinition[] = [
  { code: "ko", name: "한국어" },
  { code: "en", name: "English" },
  { code: "ja", name: "日本語" },
  { code: "zh", name: "中文" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" }
];

// 함수들
export const getFieldsForType = (type: string): FieldDefinition[] => {
  return dataTypeFields[type] || [];
};

export const getCountries = (): CountryDefinition[] => {
  return countries;
};

export const getLanguages = (): LanguageDefinition[] => {
  return languages;
};


// 샘플 데이터 생성을 위한 기본 데이터셋
const firstNames = ["김민수", "이영희", "박철수", "최은지", "정민호", "한소영", "강지훈", "임수빈", "송다영", "윤혁수"];
const lastNames = ["김", "이", "박", "최", "정", "한", "강", "임", "송", "윤"];
const domains = ["gmail.com", "naver.com", "daum.net", "kakao.com", "hotmail.com"];
const cities = ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "수원", "성남", "창원"];
const streets = ["강남대로", "테헤란로", "신촌로", "홍대입구역", "명동길", "이태원로", "압구정로", "청담대로", "삼성로", "역삼역"];
const productNames = ["무선 이어폰", "노트북", "스마트워치", "휴대폰", "태블릿", "키보드", "마우스", "모니터", "충전기", "케이스"];
const categories = ["전자제품", "의류", "식품", "도서", "화장품", "스포츠", "홈인테리어", "완구", "자동차용품", "여행용품"];

// 랜덤 함수들
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomChoice = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// 데이터 타입별 생성 함수들
const generateUser = () => ({
  id: randomInt(1000, 9999),
  name: randomChoice(firstNames),
  email: `${randomChoice(firstNames).toLowerCase()}${randomInt(1, 999)}@${randomChoice(domains)}`,
  phone: `010-${randomInt(1000, 9999)}-${randomInt(1000, 9999)}`,
  age: randomInt(20, 65),
  birthDate: randomDate(new Date(1960, 0, 1), new Date(2004, 11, 31)).toISOString().split('T')[0],
  address: `${randomChoice(cities)} ${randomChoice(streets)} ${randomInt(1, 200)}번길 ${randomInt(1, 50)}`,
  joinDate: randomDate(new Date(2020, 0, 1), new Date()).toISOString().split('T')[0]
});

const generateProduct = () => ({
  id: randomInt(1000, 9999),
  name: randomChoice(productNames),
  category: randomChoice(categories),
  price: randomInt(10, 500) * 1000,
  description: `고품질 ${randomChoice(productNames)}으로 ${randomChoice(["편리함", "만족도", "성능", "디자인"])}을 중시하는 고객에게 추천합니다.`,
  stock: randomInt(0, 100),
  rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 ~ 5.0
  createdAt: randomDate(new Date(2023, 0, 1), new Date()).toISOString().split('T')[0]
});

const generateAddress = () => ({
  id: randomInt(1000, 9999),
  street: `${randomChoice(streets)} ${randomInt(1, 200)}번길`,
  buildingNumber: randomInt(1, 50),
  city: randomChoice(cities),
  district: `${randomChoice(["강남구", "서초구", "송파구", "강동구", "마포구", "종로구", "중구", "용산구"])}`,
  postalCode: `${randomInt(10, 99)}${randomInt(100, 999)}`,
  country: "대한민국",
  coordinates: {
    lat: (37 + Math.random() * 0.5).toFixed(6),
    lng: (126 + Math.random() * 0.5).toFixed(6)
  }
});

const generateFinancial = () => ({
  id: randomInt(1000, 9999),
  accountNumber: `${randomInt(100, 999)}-${randomInt(100000, 999999)}-${randomInt(10, 99)}`,
  cardNumber: `${randomInt(1000, 9999)}-${randomInt(1000, 9999)}-${randomInt(1000, 9999)}-${randomInt(1000, 9999)}`,
  bankName: randomChoice(["신한은행", "국민은행", "우리은행", "하나은행", "기업은행"]),
  balance: randomInt(10, 1000) * 10000,
  transactionAmount: randomInt(1, 50) * 1000,
  transactionDate: randomDate(new Date(2024, 0, 1), new Date()).toISOString().split('T')[0],
  transactionType: randomChoice(["입금", "출금", "이체"])
});

const generateEvent = () => ({
  id: randomInt(1000, 9999),
  title: `${randomChoice(["회의", "세미나", "워크샵", "교육", "미팅"])} - ${randomChoice(["프로젝트 검토", "기획 논의", "개발 회의", "디자인 리뷰"])}`,
  description: `${randomChoice(["중요한", "정기", "특별", "긴급"])} ${randomChoice(["업무", "프로젝트", "협업", "논의"])} 관련 일정입니다.`,
  startDate: randomDate(new Date(), new Date(2024, 11, 31)).toISOString().split('T')[0],
  endDate: randomDate(new Date(), new Date(2024, 11, 31)).toISOString().split('T')[0],
  location: `${randomChoice(cities)} ${randomChoice(["회의실", "컨퍼런스룸", "세미나실", "강당"])} ${randomChoice(["A", "B", "C"])}`,
  attendees: randomInt(5, 50),
  status: randomChoice(["예정", "진행중", "완료", "취소"])
});

const generateNumber = () => ({
  id: randomInt(1, 100000),
  randomInt: randomInt(1, 1000),
  randomFloat: parseFloat((Math.random() * 1000).toFixed(2)),
  percentage: parseFloat((Math.random() * 100).toFixed(1)),
  uuid: `${randomInt(1000, 9999)}-${randomInt(1000, 9999)}-${randomInt(1000, 9999)}-${randomInt(1000, 9999)}`,
  sequence: randomInt(1, 1000),
  binary: Math.random() > 0.5 ? 1 : 0,
  hex: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`
});

// 데이터 타입별 생성기 매핑
const generators = {
  users: generateUser,
  products: generateProduct,
  addresses: generateAddress,
  financial: generateFinancial,
  events: generateEvent,
  numbers: generateNumber
};

// 포맷 변환 함수들
const toJSON = (data: any[]) => JSON.stringify(data, null, 2);

const toCSV = (data: any[]) => {
  if (data.length === 0) return "";
  
  const headers = Object.keys(data[0]);
  const csvHeaders = headers.join(",");
  
  const csvRows = data.map(row => 
    headers.map(header => {
      const value = row[header];
      if (typeof value === 'object' && value !== null) {
        return `"${JSON.stringify(value)}"`;
      }
      return `"${value}"`;
    }).join(",")
  );
  
  return [csvHeaders, ...csvRows].join("\n");
};

const toSQL = (data: any[], tableName: string) => {
  if (data.length === 0) return "";
  
  const headers = Object.keys(data[0]);
  const columns = headers.join(", ");
  
  const values = data.map(row => 
    "(" + headers.map(header => {
      const value = row[header];
      if (typeof value === 'string') {
        return `'${value.replace(/'/g, "''")}'`;
      }
      if (typeof value === 'object' && value !== null) {
        return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
      }
      return value;
    }).join(", ") + ")"
  ).join(",\n");
  
  return `INSERT INTO ${tableName} (${columns})\nVALUES\n${values};`;
};

// 메인 생성 함수
export const generateSampleData = async (type: string, count: number, format: string): Promise<string> => {
  // 약간의 지연으로 로딩 효과 연출
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const generator = generators[type as keyof typeof generators];
  if (!generator) {
    throw new Error(`Unknown data type: ${type}`);
  }
  
  const data = Array.from({ length: count }, () => generator());
  
  switch (format) {
    case "json":
      return toJSON(data);
    case "csv":
      return toCSV(data);
    case "sql":
      return toSQL(data, type);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

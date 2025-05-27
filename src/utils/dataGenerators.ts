
// 국가별 샘플 데이터
const dataByCountry = {
  kr: {
    firstNames: ["김민수", "이영희", "박철수", "최은지", "정민호", "한소영", "강지훈", "임수빈", "송다영", "윤혁수"],
    lastNames: ["김", "이", "박", "최", "정", "한", "강", "임", "송", "윤"],
    domains: ["gmail.com", "naver.com", "daum.net", "kakao.com", "hotmail.com"],
    cities: ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "수원", "성남", "창원"],
    streets: ["강남대로", "테헤란로", "신촌로", "홍대입구역", "명동길", "이태원로", "압구정로", "청담대로", "삼성로", "역삼역"],
    productNames: ["무선 이어폰", "노트북", "스마트워치", "휴대폰", "태블릿", "키보드", "마우스", "모니터", "충전기", "케이스"],
    categories: ["전자제품", "의류", "식품", "도서", "화장품", "스포츠", "홈인테리어", "완구", "자동차용품", "여행용품"],
    phoneFormat: "010-####-####",
    cardFormat: "####-####-####-####",
    countryName: "대한민국"
  },
  us: {
    firstNames: ["John", "Jane", "Michael", "Sarah", "David", "Emma", "Robert", "Lisa", "James", "Ashley"],
    lastNames: ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"],
    domains: ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com"],
    cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"],
    streets: ["Main St", "Oak Ave", "First St", "Second St", "Park Ave", "Broadway", "Washington St", "Lincoln Ave", "Maple St", "Cedar St"],
    productNames: ["Wireless Earbuds", "Laptop", "Smartwatch", "Smartphone", "Tablet", "Keyboard", "Mouse", "Monitor", "Charger", "Case"],
    categories: ["Electronics", "Clothing", "Food", "Books", "Beauty", "Sports", "Home", "Toys", "Automotive", "Travel"],
    phoneFormat: "(###) ###-####",
    cardFormat: "####-####-####-####",
    countryName: "United States"
  },
  jp: {
    firstNames: ["田中太郎", "佐藤花子", "山田次郎", "鈴木美咲", "高橋健太", "渡辺由美", "伊藤雅人", "中村彩", "小林大輔", "加藤恵"],
    lastNames: ["田中", "佐藤", "山田", "鈴木", "高橋", "渡辺", "伊藤", "中村", "小林", "加藤"],
    domains: ["gmail.com", "yahoo.co.jp", "hotmail.com", "outlook.jp", "docomo.ne.jp"],
    cities: ["東京", "大阪", "名古屋", "札幌", "福岡", "神戸", "京都", "川崎", "さいたま", "広島"],
    streets: ["中央通り", "駅前通り", "商店街", "大通り", "本町", "栄町", "緑町", "桜通り", "花園町", "新宿通り"],
    productNames: ["ワイヤレスイヤホン", "ノートパソコン", "スマートウォッチ", "スマートフォン", "タブレット", "キーボード", "マウス", "モニター", "充電器", "ケース"],
    categories: ["電子機器", "衣類", "食品", "書籍", "化粧品", "スポーツ", "インテリア", "玩具", "自動車用品", "旅行用品"],
    phoneFormat: "###-####-####",
    cardFormat: "####-####-####-####",
    countryName: "日本"
  }
};

// 기본값 (한국)
const defaultData = dataByCountry.kr;

// 생성 옵션 인터페이스
interface GenerationOptions {
  country?: string;
  language?: string;
  fields?: string[];
}

// 유틸리티 함수들
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomChoice = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const formatPhone = (format: string) => {
  return format.replace(/#/g, () => randomInt(0, 9).toString());
};

const formatCard = (format: string) => {
  return format.replace(/#/g, () => randomInt(0, 9).toString());
};

// 데이터 생성 함수들
const generateUser = (options: GenerationOptions = {}) => {
  const countryData = dataByCountry[options.country as keyof typeof dataByCountry] || defaultData;
  const fields = options.fields || [];
  
  const userData: any = {};
  
  if (fields.includes('id')) userData.id = randomInt(1000, 9999);
  if (fields.includes('name')) userData.name = randomChoice(countryData.firstNames);
  if (fields.includes('email')) userData.email = `${randomChoice(countryData.firstNames).toLowerCase()}${randomInt(1, 999)}@${randomChoice(countryData.domains)}`;
  if (fields.includes('phone')) userData.phone = formatPhone(countryData.phoneFormat);
  if (fields.includes('age')) userData.age = randomInt(20, 65);
  if (fields.includes('birthDate')) userData.birthDate = randomDate(new Date(1960, 0, 1), new Date(2004, 11, 31)).toISOString().split('T')[0];
  if (fields.includes('address')) userData.address = `${randomChoice(countryData.cities)} ${randomChoice(countryData.streets)} ${randomInt(1, 200)}번길 ${randomInt(1, 50)}`;
  if (fields.includes('joinDate')) userData.joinDate = randomDate(new Date(2020, 0, 1), new Date()).toISOString().split('T')[0];
  
  return userData;
};

const generateProduct = (options: GenerationOptions = {}) => {
  const countryData = dataByCountry[options.country as keyof typeof dataByCountry] || defaultData;
  const fields = options.fields || [];
  
  const productData: any = {};
  
  if (fields.includes('id')) productData.id = randomInt(1000, 9999);
  if (fields.includes('name')) productData.name = randomChoice(countryData.productNames);
  if (fields.includes('category')) productData.category = randomChoice(countryData.categories);
  if (fields.includes('price')) productData.price = randomInt(10, 500) * 1000;
  if (fields.includes('description')) productData.description = `고품질 ${randomChoice(countryData.productNames)}으로 ${randomChoice(["편리함", "만족도", "성능", "디자인"])}을 중시하는 고객에게 추천합니다.`;
  if (fields.includes('stock')) productData.stock = randomInt(0, 100);
  if (fields.includes('rating')) productData.rating = (Math.random() * 2 + 3).toFixed(1);
  if (fields.includes('createdAt')) productData.createdAt = randomDate(new Date(2023, 0, 1), new Date()).toISOString().split('T')[0];
  
  return productData;
};

const generateAddress = (options: GenerationOptions = {}) => {
  const countryData = dataByCountry[options.country as keyof typeof dataByCountry] || defaultData;
  const fields = options.fields || [];
  
  const addressData: any = {};
  
  if (fields.includes('id')) addressData.id = randomInt(1000, 9999);
  if (fields.includes('street')) addressData.street = `${randomChoice(countryData.streets)} ${randomInt(1, 200)}번길`;
  if (fields.includes('buildingNumber')) addressData.buildingNumber = randomInt(1, 50);
  if (fields.includes('city')) addressData.city = randomChoice(countryData.cities);
  if (fields.includes('district')) addressData.district = `${randomChoice(["강남구", "서초구", "송파구", "강동구", "마포구", "종로구", "중구", "용산구"])}`;
  if (fields.includes('postalCode')) addressData.postalCode = `${randomInt(10, 99)}${randomInt(100, 999)}`;
  if (fields.includes('country')) addressData.country = countryData.countryName;
  if (fields.includes('coordinates')) addressData.coordinates = {
    lat: (37 + Math.random() * 0.5).toFixed(6),
    lng: (126 + Math.random() * 0.5).toFixed(6)
  };
  
  return addressData;
};

const generateFinancial = (options: GenerationOptions = {}) => {
  const countryData = dataByCountry[options.country as keyof typeof dataByCountry] || defaultData;
  const fields = options.fields || [];
  
  const financialData: any = {};
  
  if (fields.includes('id')) financialData.id = randomInt(1000, 9999);
  if (fields.includes('accountNumber')) financialData.accountNumber = `${randomInt(100, 999)}-${randomInt(100000, 999999)}-${randomInt(10, 99)}`;
  if (fields.includes('cardNumber')) financialData.cardNumber = formatCard(countryData.cardFormat);
  if (fields.includes('bankName')) financialData.bankName = randomChoice(["신한은행", "국민은행", "우리은행", "하나은행", "기업은행"]);
  if (fields.includes('balance')) financialData.balance = randomInt(10, 1000) * 10000;
  if (fields.includes('transactionAmount')) financialData.transactionAmount = randomInt(1, 50) * 1000;
  if (fields.includes('transactionDate')) financialData.transactionDate = randomDate(new Date(2024, 0, 1), new Date()).toISOString().split('T')[0];
  if (fields.includes('transactionType')) financialData.transactionType = randomChoice(["입금", "출금", "이체"]);
  
  return financialData;
};

const generateEvent = (options: GenerationOptions = {}) => {
  const fields = options.fields || [];
  
  const eventData: any = {};
  
  if (fields.includes('id')) eventData.id = randomInt(1000, 9999);
  if (fields.includes('title')) eventData.title = `${randomChoice(["회의", "세미나", "워크샵", "교육", "미팅"])} - ${randomChoice(["프로젝트 검토", "기획 논의", "개발 회의", "디자인 리뷰"])}`;
  if (fields.includes('description')) eventData.description = `${randomChoice(["중요한", "정기", "특별", "긴급"])} ${randomChoice(["업무", "프로젝트", "협업", "논의"])} 관련 일정입니다.`;
  if (fields.includes('startDate')) eventData.startDate = randomDate(new Date(), new Date(2024, 11, 31)).toISOString().split('T')[0];
  if (fields.includes('endDate')) eventData.endDate = randomDate(new Date(), new Date(2024, 11, 31)).toISOString().split('T')[0];
  if (fields.includes('location')) eventData.location = `${"서울"} ${randomChoice(["회의실", "컨퍼런스룸", "세미나실", "강당"])} ${randomChoice(["A", "B", "C"])}`;
  if (fields.includes('attendees')) eventData.attendees = randomInt(5, 50);
  if (fields.includes('status')) eventData.status = randomChoice(["예정", "진행중", "완료", "취소"]);
  
  return eventData;
};

const generateNumber = (options: GenerationOptions = {}) => {
  const fields = options.fields || [];
  
  const numberData: any = {};
  
  if (fields.includes('id')) numberData.id = randomInt(1, 100000);
  if (fields.includes('randomInt')) numberData.randomInt = randomInt(1, 1000);
  if (fields.includes('randomFloat')) numberData.randomFloat = parseFloat((Math.random() * 1000).toFixed(2));
  if (fields.includes('percentage')) numberData.percentage = parseFloat((Math.random() * 100).toFixed(1));
  if (fields.includes('uuid')) numberData.uuid = `${randomInt(1000, 9999)}-${randomInt(1000, 9999)}-${randomInt(1000, 9999)}-${randomInt(1000, 9999)}`;
  if (fields.includes('sequence')) numberData.sequence = randomInt(1, 1000);
  if (fields.includes('binary')) numberData.binary = Math.random() > 0.5 ? 1 : 0;
  if (fields.includes('hex')) numberData.hex = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
  
  return numberData;
};

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

const toPlainText = (data: any[]) => {
  if (data.length === 0) return "";
  
  return data.map(item => {
    return Object.values(item).join(" | ");
  }).join("\n");
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
export const generateSampleData = async (
  type: string, 
  count: number, 
  format: string, 
  options: GenerationOptions = {}
): Promise<string> => {
  // 약간의 지연으로 로딩 효과 연출
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const generator = generators[type as keyof typeof generators];
  if (!generator) {
    throw new Error(`Unknown data type: ${type}`);
  }
  
  const data = Array.from({ length: count }, () => generator(options));
  
  switch (format) {
    case "json":
      return toJSON(data);
    case "csv":
      return toCSV(data);
    case "plaintext":
      return toPlainText(data);
    case "sql":
      return toSQL(data, type);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

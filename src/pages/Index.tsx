
import { useState } from "react";
import { Copy, Download, Shuffle, Users, ShoppingBag, MapPin, CreditCard, Calendar, Hash, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import DataGenerator from "@/components/DataGenerator";

const Index = () => {
  const [selectedGenerator, setSelectedGenerator] = useState("users");

  const generators = [
    {
      id: "users",
      title: "사용자 데이터",
      description: "이름, 이메일, 전화번호, 생년월일 등",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      id: "products",
      title: "상품 데이터", 
      description: "상품명, 가격, 카테고리, 설명 등",
      icon: ShoppingBag,
      color: "bg-green-500"
    },
    {
      id: "addresses",
      title: "주소 데이터",
      description: "도로명, 우편번호, 도시, 국가 등",
      icon: MapPin,
      color: "bg-purple-500"
    },
    {
      id: "financial",
      title: "금융 데이터",
      description: "카드번호, 계좌번호, 거래내역 등",
      icon: CreditCard,
      color: "bg-orange-500"
    },
    {
      id: "events",
      title: "이벤트 데이터",
      description: "일정, 날짜, 시간, 이벤트명 등",
      icon: Calendar,
      color: "bg-red-500"
    },
    {
      id: "numbers",
      title: "숫자 데이터",
      description: "랜덤 숫자, ID, 시퀀스 등",
      icon: Hash,
      color: "bg-indigo-500"
    }
  ];

  const selectedGen = generators.find(g => g.id === selectedGenerator);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shuffle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  DataForge
                </h1>
                <p className="text-xs text-slate-500">개발용 샘플 데이터 생성기</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              무료 사용
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* 광고 영역 - 사이드바 */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-orange-800">💡 광고</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-orange-700">개발 도구 추천</p>
                  <p className="text-xs text-orange-600">더 빠른 개발을 위한 최신 도구들을 확인해보세요</p>
                  <Button size="sm" variant="outline" className="w-full text-orange-700 border-orange-300">
                    자세히 보기
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">📊 사용 통계</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>오늘 생성</span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>전체 사용자</span>
                  <span className="font-semibold">45,892</span>
                </div>
                <Separator />
                <p className="text-xs text-slate-500">
                  매일 수천 명의 개발자가 사용하고 있습니다
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-9">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                원하는 데이터를 즉시 생성하세요
              </h2>
              <p className="text-slate-600">
                프로젝트 개발과 테스트에 필요한 다양한 샘플 데이터를 JSON, CSV, SQL 형식으로 생성할 수 있습니다.
              </p>
            </div>

            {/* 데이터 타입 선택 */}
            <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
              {generators.map((generator) => {
                const Icon = generator.icon;
                const isSelected = selectedGenerator === generator.id;
                
                return (
                  <Card 
                    key={generator.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      isSelected 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedGenerator(generator.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${generator.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-sm">{generator.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-xs">
                        {generator.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* 선택된 생성기 */}
            {selectedGen && (
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${selectedGen.color} rounded-lg flex items-center justify-center`}>
                      <selectedGen.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>{selectedGen.title} 생성기</CardTitle>
                      <CardDescription>{selectedGen.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <DataGenerator type={selectedGenerator} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* 하단 광고 영역 */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold">더 많은 개발 도구가 필요하신가요?</h3>
              <p className="text-blue-100">
                API 테스트, 데이터베이스 설계, 코드 생성까지 - 개발 생산성을 높이는 도구들을 만나보세요
              </p>
              <Button variant="secondary" size="lg">
                무료로 시작하기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-600">
            <p className="text-sm">© 2024 DataForge. 개발자를 위한 샘플 데이터 생성 도구</p>
            <p className="text-xs mt-2">Made with ❤️ for developers</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

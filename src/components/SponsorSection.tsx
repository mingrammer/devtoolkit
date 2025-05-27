
import { Coffee, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SponsorSection = () => {
  const handleBuyMeCoffee = () => {
    // Buy Me a Coffee 링크로 이동 (실제 링크로 교체 필요)
    window.open('https://buymeacoffee.com/yourname', '_blank');
  };

  return (
    <Card className="mx-2 mb-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
      <CardContent className="p-4">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-gray-700">
              도구가 유용하다면
            </span>
            <Heart className="w-4 h-4 text-red-500" />
          </div>
          
          <Button 
            onClick={handleBuyMeCoffee}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
            size="sm"
          >
            <Coffee className="w-4 h-4 mr-2" />
            커피 한 잔 사주기
          </Button>
          
          <p className="text-xs text-gray-500">
            개발과 운영에 도움이 됩니다
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SponsorSection;

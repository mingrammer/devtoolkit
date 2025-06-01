
import { Coffee, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const SponsorSection = () => {
  const { t } = useLanguage();
  
  const handleBuyMeCoffee = () => {
    window.open('https://buymeacoffee.com/mingrammer', '_blank');
  };

  return (
    <Card className="mx-2 mb-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
      <CardContent className="p-4">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-gray-700">
              {t("supportMessage")}
            </span>
            <Heart className="w-4 h-4 text-red-500" />
          </div>
          
          <Button 
            onClick={handleBuyMeCoffee}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
            size="sm"
          >
            <Coffee className="w-4 h-4 mr-2" />
            {t("buyMeCoffee")}
          </Button>
          
          <p className="text-xs text-gray-500">
            {t("supportDescription")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SponsorSection;

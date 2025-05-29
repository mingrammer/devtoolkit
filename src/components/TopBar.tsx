import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const TopBar = () => {
  const { t } = useLanguage();
  
  const handleBuyMeCoffee = () => {
    window.open('https://buymeacoffee.com/mingrammer', '_blank');
  };

  return (
    <div className="h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between fixed top-0 left-0 right-0 z-[60]">
      {/* 왼쪽 여백 */}
      <div></div>
      
      {/* 오른쪽 컨트롤들 */}
      <div className="flex items-center space-x-4">
        <LanguageSelector />
        <Button 
          onClick={handleBuyMeCoffee}
          className="bg-[#FFDD00] hover:bg-[#FFCC00] text-black font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 border border-gray-300 hover:border-gray-400"
          size="sm"
        >
          <img 
            src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" 
            alt="Buy me a coffee"
            className="w-5 h-5"
          />
          <span>{t("buyMeCoffee")}</span>
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
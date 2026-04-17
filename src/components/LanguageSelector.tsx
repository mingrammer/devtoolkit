
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/utils/translations";

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

const LanguageSelector = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 w-auto min-w-[44px] justify-center px-2 sm:min-w-[120px] sm:justify-between sm:px-3">
          <div className="flex items-center">
            <Globe className="mr-0 h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline mr-1">{currentLang?.flag}</span>
            <span className="hidden sm:inline">{currentLang?.name}</span>
            <span className="sm:hidden">{currentLang?.flag}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLanguage(language.code)}
            className={currentLanguage === language.code ? "bg-accent" : ""}
          >
            <span className="mr-2">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;

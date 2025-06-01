import { useState } from "react";
import { Key, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const PasswordGenerator = () => {
  const { t } = useLanguage();
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([12]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [excludeSimilar, setExcludeSimilar] = useState(false);

  const generatePassword = () => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    if (excludeSimilar) {
      charset = charset.replace(/[0O1lI]/g, "");
    }

    if (!charset) {
      toast.error(t("passwordgenerator_min_one_type"));
      return;
    }

    let result = "";
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    setPassword(result);
    toast.success(t("passwordgenerator_generated_success"));
  };

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      toast.success(t("copySuccess"));
    } catch (error) {
      toast.error(t("copyError"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>{t("passwordgenerator_length")} {length[0]}</Label>
          <Slider
            value={length}
            onValueChange={setLength}
            max={64}
            min={4}
            step={1}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="uppercase"
              checked={includeUppercase}
              onCheckedChange={(checked) => setIncludeUppercase(checked === true)}
            />
            <Label htmlFor="uppercase">{t("passwordgenerator_uppercase")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lowercase"
              checked={includeLowercase}
              onCheckedChange={(checked) => setIncludeLowercase(checked === true)}
            />
            <Label htmlFor="lowercase">{t("passwordgenerator_lowercase")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="numbers"
              checked={includeNumbers}
              onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
            />
            <Label htmlFor="numbers">{t("passwordgenerator_numbers")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="symbols"
              checked={includeSymbols}
              onCheckedChange={(checked) => setIncludeSymbols(checked === true)}
            />
            <Label htmlFor="symbols">{t("passwordgenerator_symbols")}</Label>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="similar"
            checked={excludeSimilar}
            onCheckedChange={(checked) => setExcludeSimilar(checked === true)}
          />
          <Label htmlFor="similar">{t("passwordgenerator_exclude_similar")}</Label>
        </div>

        <Button onClick={generatePassword} className="w-full">
          <Key className="w-4 h-4 mr-2" />
          {t("passwordgenerator_generate")}
        </Button>
      </div>

      {password && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>{t("passwordgenerator_generated")}</Label>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                {t("copy")}
              </Button>
              <Button variant="outline" size="sm" onClick={generatePassword}>
                <RefreshCw className="w-4 h-4 mr-2" />
                {t("passwordgenerator_regenerate")}
              </Button>
            </div>
          </div>
          <Input
            value={password}
            readOnly
            className="font-mono text-lg"
          />
        </div>
      )}

      <div className="mt-8 p-6 bg-red-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">{t("passwordgenerator_what")}</h3>
        <p className="text-gray-700 mb-4">{t("passwordgenerator_info")}</p>
        <div className="space-y-2">
          <h4 className="font-medium">{t("passwordgenerator_features")}</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>{t("passwordgenerator_feature_1")}</li>
            <li>{t("passwordgenerator_feature_2")}</li>
            <li>{t("passwordgenerator_feature_3")}</li>
            <li>{t("passwordgenerator_feature_4")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;

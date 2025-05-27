
import { useState } from "react";
import { Key, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const PasswordGenerator = () => {
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
      toast.error("최소 하나의 문자 유형을 선택해주세요");
      return;
    }

    let result = "";
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    setPassword(result);
    toast.success("비밀번호가 생성되었습니다");
  };

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      toast.success("클립보드에 복사되었습니다");
    } catch (error) {
      toast.error("복사 중 오류가 발생했습니다");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>비밀번호 길이: {length[0]}</Label>
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
            <Label htmlFor="uppercase">대문자 (A-Z)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lowercase"
              checked={includeLowercase}
              onCheckedChange={(checked) => setIncludeLowercase(checked === true)}
            />
            <Label htmlFor="lowercase">소문자 (a-z)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="numbers"
              checked={includeNumbers}
              onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
            />
            <Label htmlFor="numbers">숫자 (0-9)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="symbols"
              checked={includeSymbols}
              onCheckedChange={(checked) => setIncludeSymbols(checked === true)}
            />
            <Label htmlFor="symbols">특수문자</Label>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="similar"
            checked={excludeSimilar}
            onCheckedChange={(checked) => setExcludeSimilar(checked === true)}
          />
          <Label htmlFor="similar">유사한 문자 제외 (0, O, 1, l, I)</Label>
        </div>

        <Button onClick={generatePassword} className="w-full">
          <Key className="w-4 h-4 mr-2" />
          비밀번호 생성
        </Button>
      </div>

      {password && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>생성된 비밀번호</Label>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                복사
              </Button>
              <Button variant="outline" size="sm" onClick={generatePassword}>
                <RefreshCw className="w-4 h-4 mr-2" />
                새로 생성
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
    </div>
  );
};

export default PasswordGenerator;

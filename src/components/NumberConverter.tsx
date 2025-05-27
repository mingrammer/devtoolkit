
import { useState } from "react";
import { Calculator, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const NumberConverter = () => {
  const [input, setInput] = useState("");
  const [fromBase, setFromBase] = useState("10");
  const [results, setResults] = useState({
    binary: "",
    decimal: "",
    hex: "",
    octal: ""
  });

  const convertNumber = () => {
    if (!input.trim()) {
      toast.error("변환할 숫자를 입력해주세요");
      return;
    }

    try {
      let decimal: number;
      
      // 입력값을 10진수로 변환
      switch (fromBase) {
        case "2":
          if (!/^[01]+$/.test(input)) {
            throw new Error("Invalid binary");
          }
          decimal = parseInt(input, 2);
          break;
        case "8":
          if (!/^[0-7]+$/.test(input)) {
            throw new Error("Invalid octal");
          }
          decimal = parseInt(input, 8);
          break;
        case "10":
          if (!/^-?\d+$/.test(input)) {
            throw new Error("Invalid decimal");
          }
          decimal = parseInt(input, 10);
          break;
        case "16":
          if (!/^[0-9A-Fa-f]+$/.test(input.replace(/^0x/i, ""))) {
            throw new Error("Invalid hex");
          }
          decimal = parseInt(input.replace(/^0x/i, ""), 16);
          break;
        default:
          throw new Error("Invalid base");
      }

      if (isNaN(decimal)) {
        throw new Error("Invalid number");
      }

      // 각 진법으로 변환
      setResults({
        binary: decimal.toString(2),
        decimal: decimal.toString(10),
        hex: decimal.toString(16).toUpperCase(),
        octal: decimal.toString(8)
      });

      toast.success("숫자 변환이 완료되었습니다");
    } catch (error) {
      toast.error("유효하지 않은 숫자 형식입니다");
    }
  };

  const bases = [
    { value: "2", label: "2진법 (Binary)" },
    { value: "8", label: "8진법 (Octal)" },
    { value: "10", label: "10진법 (Decimal)" },
    { value: "16", label: "16진법 (Hex)" }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input">변환할 숫자</Label>
          <Input
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="숫자를 입력하세요"
            className="font-mono"
          />
        </div>

        <div className="space-y-2">
          <Label>입력 진법</Label>
          <Select value={fromBase} onValueChange={setFromBase}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {bases.map((base) => (
                <SelectItem key={base.value} value={base.value}>
                  {base.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={convertNumber} className="w-full">
          <Calculator className="w-4 h-4 mr-2" />
          숫자 변환
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label>2진법 (Binary)</Label>
          <Input
            value={results.binary}
            readOnly
            placeholder="변환 결과"
            className="font-mono bg-slate-50"
          />
        </div>

        <div className="space-y-3">
          <Label>8진법 (Octal)</Label>
          <Input
            value={results.octal}
            readOnly
            placeholder="변환 결과"
            className="font-mono bg-slate-50"
          />
        </div>

        <div className="space-y-3">
          <Label>10진법 (Decimal)</Label>
          <Input
            value={results.decimal}
            readOnly
            placeholder="변환 결과"
            className="font-mono bg-slate-50"
          />
        </div>

        <div className="space-y-3">
          <Label>16진법 (Hex)</Label>
          <Input
            value={results.hex}
            readOnly
            placeholder="변환 결과"
            className="font-mono bg-slate-50"
          />
        </div>
      </div>
    </div>
  );
};

export default NumberConverter;

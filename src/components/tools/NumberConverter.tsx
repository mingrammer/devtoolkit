import { useState } from "react";
import { Calculator, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const NumberConverter = () => {
  const [input, setInput] = useState("");
  const [fromBase, setFromBase] = useState("10");
  const [results, setResults] = useState({
    binary: "-",
    decimal: "-",
    hex: "-",
    octal: "-"
  });
  const { t } = useLanguage();

  const convertNumber = () => {
    if (!input.trim()) {
      toast.error(t("numberconverter_required"));
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

      toast.success(t("numberconverter_converted"));
    } catch (error) {
      toast.error(t("numberconverter_invalid_input"));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      convertNumber();
    }
  };

  const bases = [
    { value: "2", label: t("numberconverter_base_binary") },
    { value: "8", label: t("numberconverter_base_octal") },
    { value: "10", label: t("numberconverter_base_decimal") },
    { value: "16", label: t("numberconverter_base_hex") }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("numberconverter_input_value")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input">{t("numberconverter_input_value")}</Label>
            <Input
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t("numberconverter_input_placeholder")}
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label>{t("numberconverter_from_base")}</Label>
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
            {t("numberconverter_convert")}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("numberconverter_result")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label>{t("numberconverter_base_binary")}</Label>
              <Input
                value={results.binary}
                readOnly
                placeholder={t("numberconverter_result_placeholder")}
                className="font-mono bg-slate-50"
              />
            </div>

            <div className="space-y-3">
              <Label>{t("numberconverter_base_octal")}</Label>
              <Input
                value={results.octal}
                readOnly
                placeholder={t("numberconverter_result_placeholder")}
                className="font-mono bg-slate-50"
              />
            </div>

            <div className="space-y-3">
              <Label>{t("numberconverter_base_decimal")}</Label>
              <Input
                value={results.decimal}
                readOnly
                placeholder={t("numberconverter_result_placeholder")}
                className="font-mono bg-slate-50"
              />
            </div>

            <div className="space-y-3">
              <Label>{t("numberconverter_base_hex")}</Label>
              <Input
                value={results.hex}
                readOnly
                placeholder={t("numberconverter_result_placeholder")}
                className="font-mono bg-slate-50"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NumberConverter;

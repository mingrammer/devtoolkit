
import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const UuidGenerator = () => {
  const [singleUuid, setSingleUuid] = useState("");
  const [multipleUuids, setMultipleUuids] = useState("");
  const [count, setCount] = useState(10);
  const { t } = useLanguage();

  const generateUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const handleGenerateSingle = () => {
    const uuid = generateUuid();
    setSingleUuid(uuid);
  };

  const handleGenerateMultiple = () => {
    const uuids = Array.from({ length: count }, () => generateUuid());
    setMultipleUuids(uuids.join('\n'));
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t("copySuccess"));
    } catch (error) {
      toast.error(t("copyError"));
    }
  };

  return (
    <div className="space-y-6">
      {/* Single UUID */}
      <div className="space-y-3">
        <Label className="text-lg font-semibold">{t("uuidSingleGeneration")}</Label>
        <div className="flex space-x-2">
          <Input
            value={singleUuid}
            readOnly
            placeholder={t("uuidSinglePlaceholder")}
            className="font-mono"
          />
          <Button onClick={handleGenerateSingle}>
            <RefreshCw className="w-4 h-4 mr-2" />
            {t("uuidGenerate")}
          </Button>
          {singleUuid && (
            <Button variant="outline" onClick={() => handleCopy(singleUuid)}>
              <Copy className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Multiple UUIDs */}
      <div className="space-y-3">
        <Label className="text-lg font-semibold">{t("uuidMultipleGeneration")}</Label>
        <div className="flex items-center space-x-2 mb-3">
          <Label htmlFor="count">{t("uuidCount")}</Label>
          <Input
            id="count"
            type="number"
            min="1"
            max="1000"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            className="w-24"
          />
          <Button onClick={handleGenerateMultiple}>
            <RefreshCw className="w-4 h-4 mr-2" />
            {t("uuidGenerate")}
          </Button>
          {multipleUuids && (
            <Button variant="outline" onClick={() => handleCopy(multipleUuids)}>
              <Copy className="w-4 h-4 mr-2" />
              {t("copy")}
            </Button>
          )}
        </div>
        <Textarea
          value={multipleUuids}
          readOnly
          placeholder={t("uuidMultiplePlaceholder")}
          className="min-h-[200px] font-mono text-sm"
        />
      </div>
    </div>
  );
};

export default UuidGenerator;

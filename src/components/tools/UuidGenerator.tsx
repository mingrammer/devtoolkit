import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const UuidGenerator = () => {
  const [singleUuid, setSingleUuid] = useState("");
  const [multipleUuids, setMultipleUuids] = useState("");
  const [count, setCount] = useState(10);
  const [version, setVersion] = useState("4");
  const [namespace, setNamespace] = useState("6ba7b810-9dad-11d1-80b4-00c04fd430c8");
  const [name, setName] = useState("");
  const { t } = useLanguage();

  const predefinedNamespaces = {
    dns: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    url: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
    oid: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
    x500: "6ba7b814-9dad-11d1-80b4-00c04fd430c8"
  };

  const generateUuidV4 = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateUuidV5 = async (namespace: string, name: string): Promise<string> => {
    const namespaceBytes = namespace.replace(/-/g, '').match(/.{2}/g)?.map(hex => parseInt(hex, 16)) || [];
    const nameBytes = new TextEncoder().encode(name);
    const combined = new Uint8Array([...namespaceBytes, ...nameBytes]);
    const hashBuffer = await crypto.subtle.digest('SHA-1', combined);
    const hashBytes = new Uint8Array(hashBuffer);

    hashBytes[6] = (hashBytes[6] & 0x0f) | 0x50;
    hashBytes[8] = (hashBytes[8] & 0x3f) | 0x80;

    const hex = Array.from(hashBytes.slice(0, 16))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return [
      hex.slice(0, 8),
      hex.slice(8, 12),
      hex.slice(12, 16),
      hex.slice(16, 20),
      hex.slice(20, 32)
    ].join('-');
  };

  const generateUuid = async (): Promise<string> => {
    if (version === "4") {
      return generateUuidV4();
    } else {
      if (!name.trim()) {
        throw new Error(t("uuidgenerator_name_required"));
      }
      return await generateUuidV5(namespace, name.trim());
    }
  };

  const handleGenerateSingle = async () => {
    try {
      const uuid = await generateUuid();
      setSingleUuid(uuid);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("uuidgenerator_generation_error"));
    }
  };

  const handleGenerateMultiple = async () => {
    try {
      const uuids: string[] = [];
      for (let i = 0; i < count; i++) {
        const baseName = name.trim();
        if (version === "4") {
          uuids.push(generateUuidV4());
        } else {
          if (!baseName) throw new Error(t("uuidgenerator_name_required"));
          const indexedName = count > 1 ? `${baseName}-${i + 1}` : baseName;
          uuids.push(await generateUuidV5(namespace, indexedName));
        }
      }
      setMultipleUuids(uuids.join('\n'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("uuidgenerator_generation_error"));
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t("copySuccess"));
    } catch (error) {
      toast.error(t("copyError"));
    }
  };

  const handlePredefinedNamespace = (key: string) => {
    setNamespace(predefinedNamespaces[key as keyof typeof predefinedNamespaces]);
  };

  return (
    <div className="space-y-6">
      {/* Version Selection */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-lg font-semibold">{t("uuidgenerator_select_version")}</Label>
          <Select value={version} onValueChange={setVersion}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4">UUID v4 - {t("uuidgenerator_v4_description")}</SelectItem>
              <SelectItem value="5">UUID v5 - {t("uuidgenerator_v5_description")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {version === "5" && (
          <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="space-y-2">
              <Label>{t("uuidgenerator_namespace")}</Label>
              <div className="flex space-x-2">
                <Input
                  value={namespace}
                  onChange={(e) => setNamespace(e.target.value)}
                  placeholder={t("uuidgenerator_namespace_placeholder")}
                  className="font-mono text-sm"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {["dns", "url", "oid", "x500"].map((key) => (
                  <Button
                    key={key}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePredefinedNamespace(key)}
                  >
                    {key.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("uuidgenerator_name")} *</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("uuidgenerator_name_placeholder")}
                required={version === "5"}
              />
            </div>
          </div>
        )}
      </div>

      {/* Single UUID */}
      <div className="space-y-3">
        <Label className="text-lg font-semibold">{t("uuidgenerator_single_generation")}</Label>
        <div className="flex space-x-2">
          <Input
            value={singleUuid}
            readOnly
            placeholder={t("uuidgenerator_single_placeholder")}
            className="font-mono"
          />
          <Button onClick={handleGenerateSingle}>
            <RefreshCw className="w-4 h-4 mr-2" />
            {t("uuidgenerator_generate")}
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
        <Label className="text-lg font-semibold">{t("uuidgenerator_multiple_generation")}</Label>
        <div className="flex items-center space-x-2 mb-3">
          <Label htmlFor="count">{t("uuidgenerator_count")}</Label>
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
            {t("uuidgenerator_generate")}
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
          placeholder={t("uuidgenerator_multiple_placeholder")}
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      {/* Info Section */}
      <Card>
        <CardHeader>
          <CardTitle>{t("uuidgenerator_about")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold">UUID v4</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("uuidgenerator_v4_info")}
            </p>
          </div>
          <div>
            <h4 className="font-semibold">UUID v5</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("uuidgenerator_v5_info")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UuidGenerator;
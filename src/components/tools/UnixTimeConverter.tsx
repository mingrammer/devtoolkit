import { useEffect, useState } from "react";
import { Copy, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import MobileIconLabel from "@/components/MobileIconLabel";

const toLocalISOString = (date: Date): string => {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());
  return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
};

const UnixTimeConverter = () => {
  const { t } = useLanguage();
  const [epochTime, setEpochTime] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [currentEpoch, setCurrentEpoch] = useState(Math.floor(Date.now() / 1000));
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const [epochResults, setEpochResults] = useState({
    local: "-",
    utc: "-"
  });
  const [dateResults, setDateResults] = useState({
    epoch: "-"
  });

  useEffect(() => {
    if (!epochTime) {
      setEpochResults({ local: "-", utc: "-" });
      return;
    }

    try {
      const timestamp = parseInt(epochTime);
      const date = new Date(timestamp * 1000);

      if (Number.isNaN(date.getTime())) {
        throw new Error("Invalid epoch");
      }

      setEpochResults({
        local: toLocalISOString(date),
        utc: date.toISOString().substring(0, 19),
      });
    } catch (error) {
      setEpochResults({ local: "-", utc: "-" });
    }
  }, [epochTime]);

  useEffect(() => {
    if (!dateTime) {
      setDateResults({ epoch: "-" });
      return;
    }

    try {
      const date = new Date(dateTime);
      const epoch = Math.floor(date.getTime() / 1000);

      if (Number.isNaN(epoch)) {
        throw new Error("Invalid date");
      }

      setDateResults({ epoch: epoch.toString() });
    } catch (error) {
      setDateResults({ epoch: "-" });
    }
  }, [dateTime]);

  const getCurrentTime = () => {
    const now = new Date();
    setCurrentEpoch(Math.floor(now.getTime() / 1000));
    setCurrentTime(now);
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
      {/* Current Time */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{t("unixtimeconverter_current_time")}</CardTitle>
            <Button variant="outline" size="sm" onClick={getCurrentTime}>
              <RefreshCw className="w-4 h-4 mr-2" />
              {t("unixtimeconverter_refresh")}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t("unixtimeconverter_unix_timestamp")}</Label>
              <div className="flex space-x-2">
                <Input value={currentEpoch} readOnly className="font-mono" />
                <Button variant="outline" size="sm" onClick={() => handleCopy(currentEpoch.toString())}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t("unixtimeconverter_utc")}</Label>
              <div className="flex space-x-2">
                <Input value={currentTime.toISOString().substring(0, 19)} readOnly />
                <Button variant="outline" size="sm" onClick={() => handleCopy(currentTime.toISOString().substring(0, 19))}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t("unixtimeconverter_local")}</Label>
              <div className="flex space-x-2">
                <Input value={toLocalISOString(currentTime)} readOnly className="text-sm" />
                <Button variant="outline" size="sm" onClick={() => handleCopy(toLocalISOString(currentTime))}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Epoch to DateTime */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Epoch → Date/Time</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              value={epochTime}
              onChange={(e) => setEpochTime(e.target.value)}
              placeholder={t("unixtimeconverter_input_placeholder")}
              className="font-mono"
            />
            <MobileIconLabel icon={Clock} label={t("unixtimeconverter_convert")} className="shrink-0" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t("unixtimeconverter_local")}</Label>
              <div className="flex space-x-2">
                <Input value={epochResults.local} readOnly className="bg-slate-50" />
                <Button variant="outline" size="sm" onClick={() => handleCopy(epochResults.local)} disabled={epochResults.local === "-"}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t("unixtimeconverter_utc")}</Label>
              <div className="flex space-x-2">
                <Input value={epochResults.utc} readOnly className="bg-slate-50 text-sm" />
                <Button variant="outline" size="sm" onClick={() => handleCopy(epochResults.utc)} disabled={epochResults.utc === "-"}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DateTime to Epoch */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Date/Time → Epoch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
            <MobileIconLabel icon={Clock} label={t("unixtimeconverter_convert")} className="shrink-0" />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium">{t("unixtimeconverter_unix_timestamp")}</Label>
            <div className="flex space-x-2">
              <Input value={dateResults.epoch} readOnly className="font-mono bg-slate-50" />
              <Button variant="outline" size="sm" onClick={() => handleCopy(dateResults.epoch)} disabled={dateResults.epoch === "-"}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnixTimeConverter;
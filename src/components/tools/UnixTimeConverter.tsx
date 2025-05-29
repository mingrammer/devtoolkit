import { useState } from "react";
import { Copy, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const UnixTimeConverter = () => {
  const { t } = useLanguage();
  const [epochTime, setEpochTime] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [currentEpoch, setCurrentEpoch] = useState(Math.floor(Date.now() / 1000));
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toISOString().slice(0, 16));

  const convertEpochToDate = () => {
    if (!epochTime) {
      toast.error(t("unixtimeconverter_required"));
      return;
    }

    try {
      const timestamp = parseInt(epochTime);
      const date = new Date(timestamp * 1000);
      setDateTime(date.toISOString().slice(0, 16));
      toast.success(t("unixtimeconverter_converted"));
    } catch (error) {
      toast.error(t("unixtimeconverter_invalid_format"));
    }
  };

  const convertDateToEpoch = () => {
    if (!dateTime) {
      toast.error(t("unixtimeconverter_required"));
      return;
    }

    try {
      const date = new Date(dateTime);
      const epoch = Math.floor(date.getTime() / 1000);
      setEpochTime(epoch.toString());
      toast.success(t("unixtimeconverter_converted"));
    } catch (error) {
      toast.error(t("unixtimeconverter_invalid_format"));
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    setCurrentEpoch(Math.floor(now.getTime() / 1000));
    setCurrentDateTime(now.toISOString().slice(0, 16));
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
    <div className="space-y-8">
      {/* Current Time */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <Label className="text-lg font-semibold text-blue-800">{t("unixtimeconverter_current_time")}</Label>
          <Button variant="outline" size="sm" onClick={getCurrentTime}>
            <Clock className="w-4 h-4 mr-2" />
            {t("unixtimeconverter_refresh")}
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-blue-700">{t("unixtimeconverter_unix_timestamp")}</Label>
            <div className="flex space-x-2">
              <Input value={currentEpoch} readOnly className="font-mono" />
              <Button variant="outline" size="sm" onClick={() => handleCopy(currentEpoch.toString())}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-blue-700">{t("unixtimeconverter_local")}</Label>
            <div className="flex space-x-2">
              <Input value={currentDateTime} readOnly />
              <Button variant="outline" size="sm" onClick={() => handleCopy(currentDateTime)}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Epoch to DateTime */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Epoch → {t("unixtimeconverter_local")}</Label>
        <div className="flex space-x-2">
          <Input
            value={epochTime}
            onChange={(e) => setEpochTime(e.target.value)}
            placeholder={t("unixtimeconverter_input_placeholder")}
            className="font-mono"
          />
          <Button onClick={convertEpochToDate}>{t("unixtimeconverter_convert")}</Button>
        </div>
        {dateTime && (
          <div className="flex space-x-2">
            <Input value={dateTime} readOnly />
            <Button variant="outline" onClick={() => handleCopy(dateTime)}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* DateTime to Epoch */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">{t("unixtimeconverter_local")} → Epoch</Label>
        <div className="flex space-x-2">
          <Input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
          <Button onClick={convertDateToEpoch}>{t("unixtimeconverter_convert")}</Button>
        </div>
        {epochTime && (
          <div className="flex space-x-2">
            <Input value={epochTime} readOnly className="font-mono" />
            <Button variant="outline" onClick={() => handleCopy(epochTime)}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnixTimeConverter;

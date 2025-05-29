import { useState } from "react";
import { Clock, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const TimezoneConverter = () => {
  const { t } = useLanguage();
  const [inputTime, setInputTime] = useState("");
  const [fromTimezone, setFromTimezone] = useState("UTC");
  const [toTimezone, setToTimezone] = useState("Asia/Seoul");
  const [result, setResult] = useState("-");

  const timezones = [
    { value: "UTC", label: t("timezoneconverter_utc") },
    { value: "Asia/Seoul", label: t("timezoneconverter_seoul") + " (KST)" },
    { value: "Asia/Tokyo", label: t("timezoneconverter_tokyo") + " (JST)" },
    { value: "America/New_York", label: t("timezoneconverter_new_york") + " (EST)" },
    { value: "America/Los_Angeles", label: t("timezoneconverter_los_angeles") + " (PST)" },
    { value: "Europe/London", label: t("timezoneconverter_london") + " (GMT)" },
    { value: "Europe/Paris", label: "Paris (CET)" },
    { value: "Australia/Sydney", label: t("timezoneconverter_sydney") + " (AEST)" },
  ];

  const convertTimezone = () => {
    if (!inputTime) {
      toast.error(t("timezoneconverter_required"));
      return;
    }

    try {
      const date = new Date(inputTime);
      if (isNaN(date.getTime())) {
        toast.error(t("timezoneconverter_invalid_time"));
        return;
      }

      const converted = new Intl.DateTimeFormat('ko-KR', {
        timeZone: toTimezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      }).format(date);

      setResult(converted);
      toast.success(t("timezoneconverter_converted"));
    } catch (error) {
      toast.error(t("timezoneconverter_invalid_time"));
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const formatted = now.toISOString().slice(0, 19);
    setInputTime(formatted);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      convertTimezone();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("timezoneconverter_input_time")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="inputTime">{t("timezoneconverter_input_time")}</Label>
            <div className="flex space-x-2">
              <Input
                id="inputTime"
                value={inputTime}
                onChange={(e) => setInputTime(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t("timezoneconverter_input_placeholder")}
                className="font-mono"
              />
              <Button variant="outline" onClick={getCurrentTime}>
                <RefreshCw className="w-4 h-4 mr-2" />
                {t("timezoneconverter_use_current_time")}
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("timezoneconverter_from_zone")}</Label>
              <Select value={fromTimezone} onValueChange={setFromTimezone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("timezoneconverter_to_zone")}</Label>
              <Select value={toTimezone} onValueChange={setToTimezone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
                </Select>
            </div>
          </div>

          <Button onClick={convertTimezone} className="w-full">
            <Clock className="w-4 h-4 mr-2" />
            {t("timezoneconverter_convert")}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("timezoneconverter_result")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-4 py-8">
            <div className="text-center">
              <Label className="text-sm text-muted-foreground">입력</Label>
              <div className="font-mono text-lg">{inputTime || "-"}</div>
              <div className="text-sm text-muted-foreground">{fromTimezone}</div>
            </div>
            <ArrowRight className="w-6 h-6 text-muted-foreground" />
            <div className="text-center">
              <Label className="text-sm text-muted-foreground">{t("timezoneconverter_result")}</Label>
              <div className="font-mono font-semibold text-lg">{result}</div>
              <div className="text-sm text-muted-foreground">{toTimezone}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimezoneConverter;

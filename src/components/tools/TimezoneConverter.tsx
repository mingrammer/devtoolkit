import { useEffect, useState } from "react";
import { Clock, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const TimezoneConverter = () => {
  const { t } = useLanguage();
  const [inputTime, setInputTime] = useState("");
  const [fromTimezone, setFromTimezone] = useState("UTC");
  const [toTimezone, setToTimezone] = useState("Asia/Seoul");
  const [result, setResult] = useState("-");
  const [error, setError] = useState("");

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

  useEffect(() => {
    if (!inputTime) {
      setResult("-");
      setError("");
      return;
    }

    try {
      const utcDate = new Date(inputTime + "Z");
      if (isNaN(utcDate.getTime())) {
        setResult("-");
        setError(t("timezoneconverter_invalid_time"));
        return;
      }

      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: toTimezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      const parts = formatter.formatToParts(utcDate);
      const get = (type: string) => parts.find(p => p.type === type)?.value.padStart(2, '0');

      setResult(`${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`);
      setError("");
    } catch (error) {
      setResult("-");
      setError(t("timezoneconverter_invalid_time"));
    }
  }, [inputTime, toTimezone, t]);

  const getCurrentTime = () => {
    const now = new Date();
    const formatted = now.toISOString().slice(0, 19);
    setInputTime(formatted);
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

          <div className="flex items-center justify-center text-sm text-slate-500 border rounded-md bg-slate-50 py-2">
            <Clock className="w-4 h-4 mr-2" />
            <span>{t("timezoneconverter_convert")}</span>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("timezoneconverter_result")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-4 py-8">
            <div className="text-center">
              <Label className="text-sm text-muted-foreground">{t("timezoneconverter_input_time")}</Label>
              <div className="font-mono text-lg">{inputTime || "-"}</div>
              <div className="text-sm text-muted-foreground">{fromTimezone}</div>
            </div>
            <ArrowRight className="w-6 h-6 text-muted-foreground" />
            <div className="text-center">
              <Label className="text-sm text-muted-foreground">{t("timezoneconverter_result")}</Label>
              <div className="font-mono text-lg">{result}</div>
              <div className="text-sm text-muted-foreground">{toTimezone}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimezoneConverter;

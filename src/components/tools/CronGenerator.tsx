import { useState } from "react";
import { Copy, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const CronGenerator = () => {
  const { t } = useLanguage();
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [day, setDay] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");
  const [customCron, setCustomCron] = useState("");

  const cronExpression = `${minute} ${hour} ${day} ${month} ${dayOfWeek}`;

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t("copySuccess"));
    } catch (error) {
      toast.error(t("copyError"));
    }
  };

  const parseCustomCron = () => {
    if (!customCron.trim()) {
      toast.error(t("crongenerator_parse_input_required"));
      return;
    }

    const parts = customCron.trim().split(/\s+/);
    if (parts.length !== 5) {
      toast.error(t("crongenerator_parse_invalid_format"));
      return;
    }

    setMinute(parts[0]);
    setHour(parts[1]);
    setDay(parts[2]);
    setMonth(parts[3]);
    setDayOfWeek(parts[4]);
    toast.success(t("crongenerator_parsed"));
  };

  const getDescription = () => {
    try {
      if (minute === "*" && hour === "*" && day === "*" && month === "*" && dayOfWeek === "*") {
        return t("crongenerator_execute_every_minute");
      }
      
      if (minute !== "*" && hour !== "*" && day === "*" && month === "*" && dayOfWeek === "*") {
        return `${t("crongenerator_execute_daily_at")} ${hour}:${minute.padStart(2, '0')}에 실행`;
      }
      
      if (minute !== "*" && hour !== "*" && day !== "*" && month === "*" && dayOfWeek === "*") {
        return `${t("crongenerator_execute_monthly_at")} ${day}일 ${hour}:${minute.padStart(2, '0')}에 실행`;
      }
      
      if (dayOfWeek !== "*") {
        const days = [t("crongenerator_sunday"), t("crongenerator_monday"), t("crongenerator_tuesday"), t("crongenerator_wednesday"), t("crongenerator_thursday"), t("crongenerator_friday"), t("crongenerator_saturday")];
        const dayName = days[parseInt(dayOfWeek)] || dayOfWeek;
        return `${t("crongenerator_execute_weekly_on")} ${dayName}요일 ${hour === "*" ? t("crongenerator_every_hour_text") : hour + "시"} ${minute === "*" ? t("crongenerator_every_minute_text") : minute + "분"}에 실행`;
      }
      
      return t("crongenerator_custom_schedule");
    } catch {
      return t("crongenerator_complex_schedule");
    }
  };

  const presetSchedules = [
    { name: t("crongenerator_every_minute"), cron: "* * * * *" },
    { name: t("crongenerator_every_hour"), cron: "0 * * * *" },
    { name: t("crongenerator_daily_midnight"), cron: "0 0 * * *" },
    { name: t("crongenerator_daily_9am"), cron: "0 9 * * *" },
    { name: t("crongenerator_weekly_monday_9am"), cron: "0 9 * * 1" },
    { name: t("crongenerator_monthly_first"), cron: "0 0 1 * *" },
    { name: t("crongenerator_weekdays_9am"), cron: "0 9 * * 1-5" },
    { name: t("crongenerator_weekends_2pm"), cron: "0 14 * * 6,0" }
  ];

  const loadPreset = (cronStr: string) => {
    const parts = cronStr.split(" ");
    setMinute(parts[0]);
    setHour(parts[1]);
    setDay(parts[2]);
    setMonth(parts[3]);
    setDayOfWeek(parts[4]);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-5 gap-4">
        <div className="space-y-2">
          <Label>{t("crongenerator_minute")}</Label>
          <Input
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            placeholder="*"
            className="font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label>{t("crongenerator_hour")}</Label>
          <Input
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            placeholder="*"
            className="font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label>{t("crongenerator_day")}</Label>
          <Input
            value={day}
            onChange={(e) => setDay(e.target.value)}
            placeholder="*"
            className="font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label>{t("crongenerator_month")}</Label>
          <Input
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="*"
            className="font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label>{t("crongenerator_day_of_week")}</Label>
          <Input
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            placeholder="*"
            className="font-mono"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-semibold">{t("crongenerator_generated_title")}</Label>
          <Button variant="outline" size="sm" onClick={() => handleCopy(cronExpression)}>
            <Copy className="w-4 h-4 mr-2" />
            {t("copy")}
          </Button>
        </div>
        <div className="p-4 bg-slate-50 border rounded-md">
          <code className="text-lg font-mono font-bold">{cronExpression}</code>
        </div>
        <p className="text-sm text-slate-600">{getDescription()}</p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="customCron">{t("crongenerator_parse_title")}</Label>
        <div className="flex space-x-2">
          <Input
            id="customCron"
            value={customCron}
            onChange={(e) => setCustomCron(e.target.value)}
            placeholder="0 9 * * 1-5"
            className="font-mono"
          />
          <Button onClick={parseCustomCron}>
            <Clock className="w-4 h-4 mr-2" />
            {t("crongenerator_parse_button")}
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-lg font-semibold">{t("crongenerator_presets_title")}</Label>
        <div className="grid md:grid-cols-2 gap-2">
          {presetSchedules.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="justify-start text-left"
              onClick={() => loadPreset(preset.cron)}
            >
              <div>
                <div className="font-medium">{preset.name}</div>
                <div className="text-xs text-slate-500 font-mono">{preset.cron}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
        <Label className="text-sm font-medium text-orange-800 mb-2 block">{t("crongenerator_format_title")}</Label>
        <div className="text-sm text-orange-700 space-y-1">
          <p><code className="bg-orange-100 px-1 rounded">*</code> = {t("crongenerator_format_every")}</p>
          <p><code className="bg-orange-100 px-1 rounded">5</code> = {t("crongenerator_format_specific")}</p>
          <p><code className="bg-orange-100 px-1 rounded">1-5</code> = {t("crongenerator_format_range")}</p>
          <p><code className="bg-orange-100 px-1 rounded">1,3,5</code> = {t("crongenerator_format_multiple")}</p>
          <p><code className="bg-orange-100 px-1 rounded">*/5</code> = {t("crongenerator_format_interval")}</p>
          <p>{t("crongenerator_format_day_note")}</p>
        </div>
      </div>
    </div>
  );
};

export default CronGenerator;

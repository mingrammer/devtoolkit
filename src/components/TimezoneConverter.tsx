
import { useState } from "react";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const TimezoneConverter = () => {
  const [inputTime, setInputTime] = useState("");
  const [fromTimezone, setFromTimezone] = useState("UTC");
  const [toTimezone, setToTimezone] = useState("Asia/Seoul");
  const [result, setResult] = useState("");

  const timezones = [
    { value: "UTC", label: "UTC" },
    { value: "Asia/Seoul", label: "Asia/Seoul (KST)" },
    { value: "Asia/Tokyo", label: "Asia/Tokyo (JST)" },
    { value: "America/New_York", label: "America/New_York (EST)" },
    { value: "America/Los_Angeles", label: "America/Los_Angeles (PST)" },
    { value: "Europe/London", label: "Europe/London (GMT)" },
    { value: "Europe/Paris", label: "Europe/Paris (CET)" },
    { value: "Australia/Sydney", label: "Australia/Sydney (AEST)" },
  ];

  const convertTimezone = () => {
    if (!inputTime) return;

    try {
      const date = new Date(inputTime);
      if (isNaN(date.getTime())) {
        setResult("유효하지 않은 날짜/시간 형식입니다");
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
    } catch (error) {
      setResult("변환 중 오류가 발생했습니다");
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const formatted = now.toISOString().slice(0, 19);
    setInputTime(formatted);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="inputTime">날짜/시간</Label>
          <div className="flex space-x-2">
            <Input
              id="inputTime"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
              placeholder="2024-01-01T12:00:00 또는 2024-01-01 12:00:00"
              className="font-mono"
            />
            <Button variant="outline" onClick={getCurrentTime}>
              현재 시간
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>변환할 시간대</Label>
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
            <Label>변환될 시간대</Label>
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
          시간대 변환
        </Button>
      </div>

      {result && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <Label className="text-sm text-muted-foreground">입력</Label>
                <div className="font-mono">{inputTime}</div>
                <div className="text-sm text-muted-foreground">{fromTimezone}</div>
              </div>
              <ArrowRight className="w-6 h-6 text-muted-foreground" />
              <div className="text-center">
                <Label className="text-sm text-muted-foreground">결과</Label>
                <div className="font-mono font-semibold">{result}</div>
                <div className="text-sm text-muted-foreground">{toTimezone}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TimezoneConverter;


import { useState } from "react";
import { Copy, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const CronGenerator = () => {
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
      toast.success("클립보드에 복사되었습니다");
    } catch (error) {
      toast.error("복사 중 오류가 발생했습니다");
    }
  };

  const parseCustomCron = () => {
    if (!customCron.trim()) {
      toast.error("Cron 표현식을 입력해주세요");
      return;
    }

    const parts = customCron.trim().split(/\s+/);
    if (parts.length !== 5) {
      toast.error("올바른 Cron 형식이 아닙니다 (5개 필드 필요)");
      return;
    }

    setMinute(parts[0]);
    setHour(parts[1]);
    setDay(parts[2]);
    setMonth(parts[3]);
    setDayOfWeek(parts[4]);
    toast.success("Cron 표현식이 파싱되었습니다");
  };

  const getDescription = () => {
    try {
      let desc = "실행 시점: ";
      
      if (minute === "*" && hour === "*" && day === "*" && month === "*" && dayOfWeek === "*") {
        return "매분마다 실행";
      }
      
      if (minute !== "*" && hour !== "*" && day === "*" && month === "*" && dayOfWeek === "*") {
        return `매일 ${hour}:${minute.padStart(2, '0')}에 실행`;
      }
      
      if (minute !== "*" && hour !== "*" && day !== "*" && month === "*" && dayOfWeek === "*") {
        return `매월 ${day}일 ${hour}:${minute.padStart(2, '0')}에 실행`;
      }
      
      if (dayOfWeek !== "*") {
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        const dayName = days[parseInt(dayOfWeek)] || dayOfWeek;
        return `매주 ${dayName}요일 ${hour === "*" ? "매시간" : hour + "시"} ${minute === "*" ? "매분" : minute + "분"}에 실행`;
      }
      
      return "사용자 정의 스케줄";
    } catch {
      return "복잡한 스케줄";
    }
  };

  const presetSchedules = [
    { name: "매분", cron: "* * * * *" },
    { name: "매시간", cron: "0 * * * *" },
    { name: "매일 자정", cron: "0 0 * * *" },
    { name: "매일 오전 9시", cron: "0 9 * * *" },
    { name: "매주 월요일 오전 9시", cron: "0 9 * * 1" },
    { name: "매월 1일 자정", cron: "0 0 1 * *" },
    { name: "평일 오전 9시", cron: "0 9 * * 1-5" },
    { name: "주말 오후 2시", cron: "0 14 * * 6,0" }
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
          <Label>분 (0-59)</Label>
          <Input
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            placeholder="*"
            className="font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label>시 (0-23)</Label>
          <Input
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            placeholder="*"
            className="font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label>일 (1-31)</Label>
          <Input
            value={day}
            onChange={(e) => setDay(e.target.value)}
            placeholder="*"
            className="font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label>월 (1-12)</Label>
          <Input
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="*"
            className="font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label>요일 (0-6)</Label>
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
          <Label className="text-lg font-semibold">생성된 Cron 표현식</Label>
          <Button variant="outline" size="sm" onClick={() => handleCopy(cronExpression)}>
            <Copy className="w-4 h-4 mr-2" />
            복사
          </Button>
        </div>
        <div className="p-4 bg-slate-50 border rounded-md">
          <code className="text-lg font-mono font-bold">{cronExpression}</code>
        </div>
        <p className="text-sm text-slate-600">{getDescription()}</p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="customCron">Cron 표현식 파싱</Label>
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
            파싱
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-lg font-semibold">자주 사용하는 스케줄</Label>
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
        <Label className="text-sm font-medium text-orange-800 mb-2 block">Cron 형식 설명</Label>
        <div className="text-sm text-orange-700 space-y-1">
          <p><code className="bg-orange-100 px-1 rounded">*</code> = 모든 값</p>
          <p><code className="bg-orange-100 px-1 rounded">5</code> = 특정 값</p>
          <p><code className="bg-orange-100 px-1 rounded">1-5</code> = 범위</p>
          <p><code className="bg-orange-100 px-1 rounded">1,3,5</code> = 여러 값</p>
          <p><code className="bg-orange-100 px-1 rounded">*/5</code> = 5분마다</p>
          <p>요일: 0=일요일, 1=월요일, ..., 6=토요일</p>
        </div>
      </div>
    </div>
  );
};

export default CronGenerator;


import { useState } from "react";
import { Copy, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const TimeConverter = () => {
  const [epochTime, setEpochTime] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [currentEpoch, setCurrentEpoch] = useState(Math.floor(Date.now() / 1000));
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toISOString().slice(0, 16));

  const convertEpochToDate = () => {
    if (!epochTime) {
      toast.error("Epoch 시간을 입력해주세요");
      return;
    }

    try {
      const timestamp = parseInt(epochTime);
      const date = new Date(timestamp * 1000);
      setDateTime(date.toISOString().slice(0, 16));
      toast.success("변환이 완료되었습니다");
    } catch (error) {
      toast.error("올바른 Epoch 시간을 입력해주세요");
    }
  };

  const convertDateToEpoch = () => {
    if (!dateTime) {
      toast.error("날짜/시간을 입력해주세요");
      return;
    }

    try {
      const date = new Date(dateTime);
      const epoch = Math.floor(date.getTime() / 1000);
      setEpochTime(epoch.toString());
      toast.success("변환이 완료되었습니다");
    } catch (error) {
      toast.error("올바른 날짜/시간을 입력해주세요");
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
      toast.success("클립보드에 복사되었습니다");
    } catch (error) {
      toast.error("복사 중 오류가 발생했습니다");
    }
  };

  return (
    <div className="space-y-8">
      {/* Current Time */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <Label className="text-lg font-semibold text-blue-800">현재 시간</Label>
          <Button variant="outline" size="sm" onClick={getCurrentTime}>
            <Clock className="w-4 h-4 mr-2" />
            새로고침
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-blue-700">Epoch Timestamp</Label>
            <div className="flex space-x-2">
              <Input value={currentEpoch} readOnly className="font-mono" />
              <Button variant="outline" size="sm" onClick={() => handleCopy(currentEpoch.toString())}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-blue-700">Date Time</Label>
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
        <Label className="text-lg font-semibold">Epoch → Date/Time</Label>
        <div className="flex space-x-2">
          <Input
            value={epochTime}
            onChange={(e) => setEpochTime(e.target.value)}
            placeholder="Epoch timestamp (예: 1699999999)"
            className="font-mono"
          />
          <Button onClick={convertEpochToDate}>변환</Button>
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
        <Label className="text-lg font-semibold">Date/Time → Epoch</Label>
        <div className="flex space-x-2">
          <Input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
          <Button onClick={convertDateToEpoch}>변환</Button>
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

export default TimeConverter;

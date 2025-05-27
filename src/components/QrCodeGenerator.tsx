
import { useState } from "react";
import { Copy, QrCode, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const QrCodeGenerator = () => {
  const [text, setText] = useState("");
  const [size, setSize] = useState("200");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const generateQrCode = () => {
    if (!text.trim()) {
      toast.error("QR 코드로 변환할 텍스트를 입력해주세요");
      return;
    }

    // QR Server API 사용 (무료 서비스)
    const encodedText = encodeURIComponent(text);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`;
    setQrCodeUrl(url);
    toast.success("QR 코드가 생성되었습니다");
  };

  const handleDownload = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR 코드가 다운로드되었습니다");
  };

  const handleCopyImage = async () => {
    if (!qrCodeUrl) return;
    
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      toast.success("QR 코드가 클립보드에 복사되었습니다");
    } catch (error) {
      toast.error("이미지 복사 중 오류가 발생했습니다");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text">QR 코드로 변환할 텍스트/URL</Label>
          <Input
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="텍스트나 URL을 입력하세요 (예: https://example.com)"
            className="font-mono"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="space-y-2">
            <Label>크기</Label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="150">150x150</SelectItem>
                <SelectItem value="200">200x200</SelectItem>
                <SelectItem value="300">300x300</SelectItem>
                <SelectItem value="400">400x400</SelectItem>
                <SelectItem value="500">500x500</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={generateQrCode} className="mt-7">
            <QrCode className="w-4 h-4 mr-2" />
            QR 코드 생성
          </Button>
        </div>
      </div>

      {qrCodeUrl && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">생성된 QR 코드</Label>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopyImage}>
                <Copy className="w-4 h-4 mr-2" />
                이미지 복사
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                다운로드
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="p-4 bg-white rounded-lg border shadow-sm">
              <img 
                src={qrCodeUrl} 
                alt="Generated QR Code"
                className="block"
              />
            </div>
          </div>
        </div>
      )}

      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <Label className="text-sm font-medium text-green-800 mb-2 block">QR 코드 활용</Label>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• URL: 웹사이트 링크</li>
          <li>• 텍스트: 간단한 메시지나 정보</li>
          <li>• 연락처: vCard 형식</li>
          <li>• WiFi: WIFI:T:WPA;S:네트워크명;P:비밀번호;;</li>
          <li>• 이메일: mailto:example@email.com</li>
        </ul>
      </div>
    </div>
  );
};

export default QrCodeGenerator;

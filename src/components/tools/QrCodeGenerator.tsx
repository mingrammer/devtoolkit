import { useState } from "react";
import { Copy, QrCode, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const QrCodeGenerator = () => {
  const { t } = useLanguage();
  const [text, setText] = useState("");
  const [size, setSize] = useState("200");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const generateQrCode = () => {
    if (!text.trim()) {
      toast.error(t("qrgenerator_input_required"));
      return;
    }

    // QR Server API 사용 (무료 서비스)
    const encodedText = encodeURIComponent(text);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`;
    setQrCodeUrl(url);
    toast.success(t("qrgenerator_generated_success"));
  };

  const handleDownload = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(t("qrgenerator_download_success"));
  };

  const handleCopyImage = async () => {
    if (!qrCodeUrl) return;
    
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      toast.success(t("qrgenerator_image_copy_success"));
    } catch (error) {
      toast.error(t("qrgenerator_image_copy_error"));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      generateQrCode();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("qrgenerator_input_label")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">{t("qrgenerator_input_label")}</Label>
            <Input
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t("qrgenerator_input_placeholder")}
              className="font-mono"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="space-y-2">
              <Label>{t("qrgenerator_size")}</Label>
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
              {t("qrgenerator_generate")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{t("qrgenerator_generated")}</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopyImage} disabled={!qrCodeUrl}>
                <Copy className="w-4 h-4 mr-2" />
                {t("qrgenerator_image_copy")}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!qrCodeUrl}>
                <Download className="w-4 h-4 mr-2" />
                {t("qrgenerator_download")}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center min-h-[250px] items-center">
            {qrCodeUrl ? (
              <div className="p-4 bg-white rounded-lg border shadow-sm">
                <img 
                  src={qrCodeUrl} 
                  alt="Generated QR Code"
                  className="block"
                />
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <QrCode className="w-16 h-16 mx-auto mb-2 opacity-50" />
                <p>QR 코드가 여기에 표시됩니다</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 p-6 bg-green-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">{t("qrgenerator_what")}</h3>
        <p className="text-gray-700 mb-4">{t("qrgenerator_info")}</p>
        <div className="space-y-2">
          <h4 className="font-medium">{t("qrgenerator_features")}</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>{t("qrgenerator_feature_1")}</li>
            <li>{t("qrgenerator_feature_2")}</li>
            <li>{t("qrgenerator_feature_3")}</li>
            <li>{t("qrgenerator_feature_4")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QrCodeGenerator;

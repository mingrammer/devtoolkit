import { useState } from "react";
import { Copy, QrCode, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text">{t("qrgenerator_input_label")}</Label>
          <Input
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
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
      </div>

      {qrCodeUrl && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">{t("qrgenerator_generated")}</Label>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopyImage}>
                <Copy className="w-4 h-4 mr-2" />
                {t("qrgenerator_image_copy")}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                {t("qrgenerator_download")}
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
        <Label className="text-sm font-medium text-green-800 mb-2 block">{t("qrgenerator_usage_title")}</Label>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• {t("qrgenerator_usage_url")}</li>
          <li>• {t("qrgenerator_usage_text")}</li>
          <li>• {t("qrgenerator_usage_contact")}</li>
          <li>• {t("qrgenerator_usage_wifi")}</li>
          <li>• {t("qrgenerator_usage_email")}</li>
        </ul>
      </div>
    </div>
  );
};

export default QrCodeGenerator;

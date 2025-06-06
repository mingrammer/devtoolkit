import { useState } from "react";
import { Network, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const CidrCalculator = () => {
  const [cidr, setCidr] = useState("");
  const [result, setResult] = useState({
    cidr: "-",
    subnetMask: "-",
    networkAddress: "-",
    broadcastAddress: "-",
    firstHost: "-",
    lastHost: "-",
    totalHosts: "-",
    usableHosts: "-"
  });
  const { t } = useLanguage();

  const calculateCidr = () => {
    if (!cidr) {
      toast.error(t("cidrcalculator_required"));
      return;
    }

    try {
      const [ip, prefix] = cidr.split('/');
      const prefixNum = parseInt(prefix);
      
      if (!ip || isNaN(prefixNum) || prefixNum < 0 || prefixNum > 32) {
        throw new Error("Invalid CIDR");
      }

      const ipParts = ip.split('.').map(part => parseInt(part));
      if (ipParts.length !== 4 || ipParts.some(part => isNaN(part) || part < 0 || part > 255)) {
        throw new Error("Invalid IP");
      }

      // 서브넷 마스크 계산
      const mask = (0xFFFFFFFF << (32 - prefixNum)) >>> 0;
      const maskParts = [
        (mask >>> 24) & 0xFF,
        (mask >>> 16) & 0xFF,
        (mask >>> 8) & 0xFF,
        mask & 0xFF
      ];

      // 네트워크 주소 계산
      const ipNum = (ipParts[0] << 24) + (ipParts[1] << 16) + (ipParts[2] << 8) + ipParts[3];
      const networkNum = (ipNum & mask) >>> 0;
      const networkParts = [
        (networkNum >>> 24) & 0xFF,
        (networkNum >>> 16) & 0xFF,
        (networkNum >>> 8) & 0xFF,
        networkNum & 0xFF
      ];

      // 브로드캐스트 주소 계산
      const broadcastNum = (networkNum | (0xFFFFFFFF >>> prefixNum)) >>> 0;
      const broadcastParts = [
        (broadcastNum >>> 24) & 0xFF,
        (broadcastNum >>> 16) & 0xFF,
        (broadcastNum >>> 8) & 0xFF,
        broadcastNum & 0xFF
      ];

      // 첫 번째, 마지막 호스트 주소
      const firstHostNum = networkNum + 1;
      const lastHostNum = broadcastNum - 1;
      const firstHostParts = [
        (firstHostNum >>> 24) & 0xFF,
        (firstHostNum >>> 16) & 0xFF,
        (firstHostNum >>> 8) & 0xFF,
        firstHostNum & 0xFF
      ];
      const lastHostParts = [
        (lastHostNum >>> 24) & 0xFF,
        (lastHostNum >>> 16) & 0xFF,
        (lastHostNum >>> 8) & 0xFF,
        lastHostNum & 0xFF
      ];

      const totalHosts = Math.pow(2, 32 - prefixNum);
      const usableHosts = totalHosts - 2; // 네트워크와 브로드캐스트 제외

      setResult({
        cidr,
        subnetMask: maskParts.join('.'),
        networkAddress: networkParts.join('.'),
        broadcastAddress: broadcastParts.join('.'),
        firstHost: firstHostParts.join('.'),
        lastHost: lastHostParts.join('.'),
        totalHosts: totalHosts.toLocaleString(),
        usableHosts: usableHosts.toLocaleString()
      });

      toast.success(t("cidrcalculator_calculated"));
    } catch (error) {
      toast.error(t("cidrcalculator_invalid_format"));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      calculateCidr();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cidr">{t("cidrcalculator_input")}</Label>
          <Input
            id="cidr"
            value={cidr}
            onChange={(e) => setCidr(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t("cidrcalculator_input_placeholder")}
            className="font-mono"
          />
        </div>

        <Button onClick={calculateCidr} className="w-full">
          <Calculator className="w-4 h-4 mr-2" />
          {t("cidrcalculator_calculate")}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("cidrcalculator_network")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>CIDR:</span>
              <span className="font-mono">{result.cidr}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("cidrcalculator_subnet_mask")}:</span>
              <span className="font-mono">{result.subnetMask}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("cidrcalculator_network_address")}:</span>
              <span className="font-mono">{result.networkAddress}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("cidrcalculator_broadcast_address")}:</span>
              <span className="font-mono">{result.broadcastAddress}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("cidrcalculator_hosts")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>{t("cidrcalculator_first_host")}:</span>
              <span className="font-mono">{result.firstHost}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("cidrcalculator_last_host")}:</span>
              <span className="font-mono">{result.lastHost}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("cidrcalculator_total_hosts")}:</span>
              <span className="font-mono">{result.totalHosts}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("cidrcalculator_available_hosts")}:</span>
              <span className="font-mono">{result.usableHosts}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CidrCalculator;

import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTools } from '@/utils/toolsConfig';

const UsageStats = () => {
  const { t } = useLanguage();
  const tools = useTools();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        {/* Footer message */}
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{t("totalTools")}</span>
            <Badge variant="secondary" className="text-xs">
              {tools.length}개
            </Badge>
          </div>
          <p className="text-sm text-gray-500 text-center mt-2">
            {t("dailyUsers")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsageStats;

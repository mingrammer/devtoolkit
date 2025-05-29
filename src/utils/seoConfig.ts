import { textProcessingSEO } from './seo/textProcessing';
import { encodingConversionSEO } from './seo/encodingConversion';
import { timeDateSEO } from './seo/timeDate';
import { dataFormatSEO } from './seo/dataFormat';
import { devToolsSEO } from './seo/devTools';

export interface ToolSEO {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
}

// 모든 SEO 설정을 합치는 함수
function mergeSEOConfigs(...configs: Array<Record<string, ToolSEO>>) {
  const result: Record<string, ToolSEO> = {};
  
  configs.forEach(config => {
    Object.assign(result, config);
  });
  
  return result;
}

// 모든 SEO 설정을 합침
export const toolSEOConfig = mergeSEOConfigs(
  textProcessingSEO,
  encodingConversionSEO,
  timeDateSEO,
  dataFormatSEO,
  devToolsSEO
);

export const getToolSEO = (toolId: string): ToolSEO => {
  return toolSEOConfig[toolId] || {
    title: "DevToolkit - Free Online Tools for Developers",
    description: "Collection of various free online tools for developers. Provides various development tools including UUID generation, hash generation, data conversion, etc.",
    keywords: [
      "developer tools", "developer utilities", "dev tool kit", "dev tools", 
      "dev utilities",  "online tools", "개발자 도구", "개발자 유틸리티",
    ]
  };
};

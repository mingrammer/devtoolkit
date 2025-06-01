import { commonTranslations } from './common';
import { crongeneratorTranslations } from './crongenerator';
import { base64converterTranslations } from './base64converter';
import { hashgeneratorTranslations } from './hashgenerator';
import { jsonformatterTranslations } from './jsonformatter';
import { passwordgeneratorTranslations } from './passwordgenerator';
import { qrgeneratorTranslations } from './qrgenerator';
import { uuidgeneratorTranslations } from './uuidgenerator';
import { caseconverterTranslations } from './caseconverter';
import { loremipsumTranslations } from './loremipsum';
import { textdiffTranslations } from './textdiff';
import { escapeTranslations } from './escape';
import { texttoslugTranslations } from './texttoslug';
import { numberconverterTranslations } from './numberconverter';
import { unixtimeconverterTranslations } from './unixtimeconverter';
import { timezoneconverterTranslations } from './timezoneconverter';
import { localeconverterTranslations } from './localeconverter';
import { numberformatterTranslations } from './numberformatter';
import { regextesterTranslations } from './regextester';
import { markdownviewerTranslations } from './markdownviewer';
import { cidrcalculatorTranslations } from './cidrcalculator';
import { jsontocsvTranslations } from './jsontocsv';
import { csvtojsonTranslations } from './csvtojson';
import { yamltojsonTranslations } from './yamltojson';
import { jsontoyamlTranslations } from './jsontoyaml';
import { csvtoyamlTranslations } from './csvtoyaml';
import { yamltocsvTranslations } from './yamltocsv';
import { wordcounterTranslations } from './wordcounter';

export type Language = 'en' | 'ko';

// 모든 번역을 합치는 함수
function mergeTranslations(...translations: Array<Record<Language, Record<string, string>>>) {
  const result: Record<Language, Record<string, string>> = {
    en: {},
    ko: {}
  };

  translations.forEach(translation => {
    Object.assign(result.en, translation.en);
    Object.assign(result.ko, translation.ko);
  });

  return result;
}

// 모든 번역을 합침
export const translations = mergeTranslations(
  commonTranslations,
  crongeneratorTranslations,
  base64converterTranslations,
  hashgeneratorTranslations,
  jsonformatterTranslations,
  passwordgeneratorTranslations,
  qrgeneratorTranslations,
  uuidgeneratorTranslations,
  caseconverterTranslations,
  loremipsumTranslations,
  textdiffTranslations,
  escapeTranslations,
  texttoslugTranslations,
  numberconverterTranslations,
  unixtimeconverterTranslations,
  timezoneconverterTranslations,
  localeconverterTranslations,
  numberformatterTranslations,
  regextesterTranslations,
  markdownviewerTranslations,
  cidrcalculatorTranslations,
  jsontocsvTranslations,
  csvtojsonTranslations,
  yamltojsonTranslations,
  jsontoyamlTranslations,
  csvtoyamlTranslations,
  yamltocsvTranslations,
  wordcounterTranslations
);

// 타입 추론을 위한 키 타입
export type TranslationKey = keyof typeof translations.en;

// IP 기반 언어 감지 함수
export const detectLanguageFromIP = async (): Promise<Language> => {
  try {
    // IP 위치 정보를 가져오는 무료 API 사용
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    // 한국이면 한국어, 나머지는 영어
    if (data.country_code === 'KR') {
      return 'ko';
    }
    return 'en';
  } catch (error) {
    console.log('Language detection failed, using default:', error);
    return 'en'; // 기본값은 영어
  }
};

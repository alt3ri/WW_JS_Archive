"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherLanguageLib =
    exports.languageCultureMap =
    exports.LaunchLangDefine =
    exports.KOREAN_ISO639_1 =
    exports.ENGLISH_ISO639_1 =
      void 0);
const UE = require("ue");
const LauncherConfigLib_1 = require("../Define/LauncherConfigLib");
const LauncherLog_1 = require("./LauncherLog");
const LauncherStorageLib_1 = require("./LauncherStorageLib");
function objToMap(e) {
  const a = new Map();
  for (const L in e) {
    const n = Number(L);
    isNaN(n) || a.set(n, e[L]);
  }
  return a;
}
const TEXTLANGUAGE = 51;
const VOICELANGUAGE = 52;
const CHS = "zh-Hans";
const CHT = "zh-Hant";
const CHINESE_ISO639_1 = "zh";
const JAPANESE_ISO639_1 = ((exports.ENGLISH_ISO639_1 = "en"), "ja");
const RUSSIA_ISO639_1 = ((exports.KOREAN_ISO639_1 = "ko"), "ru");
const GERMANY_ISO639_1 = "de";
const SPAIN_ISO639_1 = "es";
const PORTUGAL_ISO639_1 = "pt";
const INDONESIA_ISO639_1 = "id";
const FRANCE_ISO639_1 = "fr";
const VIETNAM_ISO639_1 = "vi";
const THAILAND_ISO639_1 = "th";
const AVAILABLE_LANGUAGES = [
  CHS,
  exports.ENGLISH_ISO639_1,
  JAPANESE_ISO639_1,
  exports.KOREAN_ISO639_1,
  RUSSIA_ISO639_1,
  CHT,
  GERMANY_ISO639_1,
  SPAIN_ISO639_1,
  PORTUGAL_ISO639_1,
  INDONESIA_ISO639_1,
  FRANCE_ISO639_1,
  VIETNAM_ISO639_1,
  THAILAND_ISO639_1,
];
const CHS_AUDIO = CHINESE_ISO639_1;
const PUBLICATION_TYPE = "Publication";
class LaunchLangDefine {
  constructor(e, a, n) {
    (this.LanguageType = e), (this.LanguageCode = a), (this.AudioCode = n);
  }
}
const languageList = [
  new (exports.LaunchLangDefine = LaunchLangDefine)(0, "zh-Hans", "zh"),
  new LaunchLangDefine(1, "en", "en"),
  new LaunchLangDefine(2, "ja", "ja"),
  new LaunchLangDefine(3, "ko", "ko"),
  new LaunchLangDefine(4, "ru", "en"),
  new LaunchLangDefine(5, "zh-Hant", "zh"),
  new LaunchLangDefine(6, "de", "en"),
  new LaunchLangDefine(7, "es", "en"),
  new LaunchLangDefine(8, "pt", "en"),
  new LaunchLangDefine(9, "id", "en"),
  new LaunchLangDefine(10, "fr", "en"),
  new LaunchLangDefine(11, "vi", "en"),
  new LaunchLangDefine(12, "th", "en"),
];
const languageTypeMap =
  ((exports.languageCultureMap = new Map([
    ["zh-Hans", 11],
    ["en", 0],
    ["ja", 10],
    ["ko", 9],
    ["ru", 6],
    ["zh-Hant", 12],
    ["de", 3],
    ["es", 4],
    ["pt", 14],
    ["id", 16],
    ["fr", 1],
    ["vi", 17],
    ["th", 18],
  ])),
  new Map());
const languageCodeMap = new Map();
for (const h of languageList)
  languageTypeMap.set(h.LanguageType, h),
    languageCodeMap.set(h.LanguageCode, h);
class LauncherLanguageLib {
  static set Kyr(e) {
    (LauncherLanguageLib.T8 = e),
      UE.LGUIFontData.SetAllFontCurrentCulture(
        exports.languageCultureMap.get(e),
      );
  }
  static GetDefaultCulture(e) {
    return e.includes(CHINESE_ISO639_1) ? CHS : exports.ENGLISH_ISO639_1;
  }
  static Initialize(a) {
    if (!this.gU) {
      this.gU = !0;
      let n = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
        LauncherStorageLib_1.ELauncherStorageGlobalKey.PlayMenuInfo,
        "",
      );
      var L = n && n !== "";
      if (
        L ||
        a ||
        UE.KuroLauncherLibrary.GetAppInternalUseType() === PUBLICATION_TYPE
      ) {
        let e = void 0;
        L
          ? (e = objToMap(JSON.parse(n)))
          : ((e = new Map()),
            (a =
              LauncherConfigLib_1.LauncherConfigLib.GetMenuConfigByFunctionId(
                TEXTLANGUAGE,
              )),
            e.set(TEXTLANGUAGE, a ? a.OptionsDefault : 0),
            (L =
              LauncherConfigLib_1.LauncherConfigLib.GetMenuConfigByFunctionId(
                VOICELANGUAGE,
              )),
            e.set(VOICELANGUAGE, L ? L.OptionsDefault : 0));
        (n = e.get(TEXTLANGUAGE)),
          (a = LauncherLanguageLib.GetLanguageDefineByType(n)),
          (L =
            ((LauncherLanguageLib.Kyr = a
              ? a.LanguageCode
              : exports.ENGLISH_ISO639_1),
            e.get(VOICELANGUAGE))),
          (n = LauncherLanguageLib.GetLanguageDefineByType(L));
        LauncherLanguageLib.Qyr = n ? n.AudioCode : exports.ENGLISH_ISO639_1;
      } else {
        var a = UE.KismetSystemLibrary.GetDefaultLanguage();
        var L = this.GetDefaultCulture(a);
        const e = UE.NewArray(UE.BuiltinString);
        for (const u of AVAILABLE_LANGUAGES) e.Add(u);
        (n = UE.KismetInternationalizationLibrary.GetSuitableCulture(e, a, L)),
          (L = LauncherConfigLib_1.LauncherConfigLib.IsLanguageValid(n)),
          (n = L ? n : this.GetDefaultCulture(n)),
          (L =
            (L ||
              LauncherLog_1.LauncherLog.Info(
                "当前语种表格配置不允许生效",
                ["targetLanguage", n],
                ["currentCulture", a],
              ),
            LauncherLog_1.LauncherLog.Warn(
              "从本地获取语言配置失败，使用平台的配置",
              ["targetLanguage", n],
            ),
            LauncherLanguageLib.GetLanguageDefineByCode(n)));
        L
          ? ((LauncherLanguageLib.Kyr = L.LanguageCode),
            (LauncherLanguageLib.Qyr = L.AudioCode))
          : ((LauncherLanguageLib.Kyr = exports.ENGLISH_ISO639_1),
            (LauncherLanguageLib.Qyr = CHS_AUDIO));
      }
    }
  }
  static GetPackageLanguage() {
    return this.T8;
  }
  static GetPackageAudioLanguage() {
    return this.Qyr;
  }
  static GetAllLanguageDefines() {
    return languageList;
  }
  static GetLanguageDefineByType(e) {
    return languageTypeMap.get(e);
  }
  static GetLanguageDefineByCode(e) {
    return languageCodeMap.get(e);
  }
}
((exports.LauncherLanguageLib = LauncherLanguageLib).T8 = void 0),
  (LauncherLanguageLib.Qyr = void 0),
  (LauncherLanguageLib.gU = !1);
// # sourceMappingURL=LauncherLanguageLib.js.map

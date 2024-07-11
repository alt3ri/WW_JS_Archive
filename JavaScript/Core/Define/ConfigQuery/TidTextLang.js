"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTidTextLang = void 0);
const LanguageSystem_1 = require("../../Common/LanguageSystem");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DeserializeConfig_1 = require("../../Config/DeserializeConfig");
const StringUtils_1 = require("../../Utils/StringUtils");
const CommonDefine_1 = require("../CommonDefine");
const TEXTNOTFOUNT = "text not found";
const DB = "lang_tid_text.db";
const TABLE = "TidText";
const COMMAND = "select content from `TidText` where id = ?";
const logPair = [
  ["数据库", DB],
  ["表名", TABLE],
  ["语句", COMMAND],
];
const langCache = new Map();
const initStat = void 0;
const getLocalTextStat = void 0;
const LOCAL_TEXT_STAT_PREFIX = "configTidTextLang.GetLocalText(";
exports.configTidTextLang = {
  Init: () => {
    ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND);
  },
  GetLocalText: (e, o = void 0) => {
    if (LanguageSystem_1.LanguageSystem.GmShowLanguageKey)
      return (
        (n = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(o)),
        TABLE + `|${e}|` + n
      );
    let i = langCache.get(e);
    i || ((i = new Map()), langCache.set(e, i));
    var n = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(o);
    let t = i.get(n);
    if (t) return t;
    const g = ConfigCommon_1.ConfigCommon.GetLangStatementId(
      TABLE,
      DB,
      COMMAND,
      n,
    );
    if (
      (a =
        ConfigCommon_1.ConfigCommon.CheckStatement(g) &&
        ConfigCommon_1.ConfigCommon.BindInt(g, 1, e, ...logPair, ["Id", e]) &&
        ConfigCommon_1.ConfigCommon.Step(
          g,
          !0,
          ...logPair,
          ["传入语言", o],
          ["查询语言", n],
          ["文本Id", e],
        ) > 0)
    ) {
      let r = void 0;
      if (
        (([a, r] = ConfigCommon_1.ConfigCommon.GetValue(
          g,
          0,
          ...logPair,
          ["传入语言", o],
          ["查询语言", n],
          ["文本Id", e],
        )),
        a)
      ) {
        var a = DeserializeConfig_1.DeserializeConfig.ParseStringRange(
          r,
          0,
          r.byteLength,
          ...logPair,
          ["传入语言", o],
          ["查询语言", n],
          ["文本Id", e],
        );
        if (a.Success)
          return (
            (t = a.Value),
            ConfigCommon_1.ConfigCommon.Reset(g),
            StringUtils_1.StringUtils.IsEmpty(t) &&
              o !== CommonDefine_1.CHS &&
              ((r = exports.configTidTextLang.GetLocalText(
                e,
                CommonDefine_1.CHS,
              )),
              StringUtils_1.StringUtils.IsEmpty(r) ||
                ((a = void 0 === o ? "" : "|" + o),
                (t = TEXTNOTFOUNT + "|" + e + a))),
            i.set(n, t),
            t
          );
      }
    }
    ConfigCommon_1.ConfigCommon.Reset(g);
  },
};
// # sourceMappingURL=TidTextLang.js.map

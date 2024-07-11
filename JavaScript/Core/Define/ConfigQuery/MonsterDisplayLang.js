"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configMonsterDisplayLang = void 0);
const LanguageSystem_1 = require("../../Common/LanguageSystem");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DeserializeConfig_1 = require("../../Config/DeserializeConfig");
const StringUtils_1 = require("../../Utils/StringUtils");
const CommonDefine_1 = require("../CommonDefine");
const TEXTNOTFOUNT = "text not found";
const DB = "lang_monsterdisplay.db";
const TABLE = "MonsterDisplay";
const COMMAND = "select content from `MonsterDisplay` where id = ?";
const logPair = [
  ["数据库", DB],
  ["表名", TABLE],
  ["语句", COMMAND],
];
const langCache = new Map();
const initStat = void 0;
const getLocalTextStat = void 0;
const LOCAL_TEXT_STAT_PREFIX = "configMonsterDisplayLang.GetLocalText(";
exports.configMonsterDisplayLang = {
  Init: () => {
    ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND);
  },
  GetLocalText: (o, e = void 0) => {
    if (LanguageSystem_1.LanguageSystem.GmShowLanguageKey)
      return (
        (n = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(e)),
        TABLE + `|${o}|` + n
      );
    let i = langCache.get(o);
    i || ((i = new Map()), langCache.set(o, i));
    var n = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(e);
    let t = i.get(n);
    if (t) return t;
    const r = ConfigCommon_1.ConfigCommon.GetLangStatementId(
      TABLE,
      DB,
      COMMAND,
      n,
    );
    if (
      (g =
        ConfigCommon_1.ConfigCommon.CheckStatement(r) &&
        ConfigCommon_1.ConfigCommon.BindInt(r, 1, o, ...logPair, ["Id", o]) &&
        ConfigCommon_1.ConfigCommon.Step(
          r,
          !0,
          ...logPair,
          ["传入语言", e],
          ["查询语言", n],
          ["文本Id", o],
        ) > 0)
    ) {
      let a = void 0;
      if (
        (([g, a] = ConfigCommon_1.ConfigCommon.GetValue(
          r,
          0,
          ...logPair,
          ["传入语言", e],
          ["查询语言", n],
          ["文本Id", o],
        )),
        g)
      ) {
        var g = DeserializeConfig_1.DeserializeConfig.ParseStringRange(
          a,
          0,
          a.byteLength,
          ...logPair,
          ["传入语言", e],
          ["查询语言", n],
          ["文本Id", o],
        );
        if (g.Success)
          return (
            (t = g.Value),
            ConfigCommon_1.ConfigCommon.Reset(r),
            StringUtils_1.StringUtils.IsEmpty(t) &&
              e !== CommonDefine_1.CHS &&
              ((a = exports.configMonsterDisplayLang.GetLocalText(
                o,
                CommonDefine_1.CHS,
              )),
              StringUtils_1.StringUtils.IsEmpty(a) ||
                ((g = void 0 === e ? "" : "|" + e),
                (t = TEXTNOTFOUNT + "|" + o + g))),
            i.set(n, t),
            t
          );
      }
    }
    ConfigCommon_1.ConfigCommon.Reset(r);
  },
};
// # sourceMappingURL=MonsterDisplayLang.js.map

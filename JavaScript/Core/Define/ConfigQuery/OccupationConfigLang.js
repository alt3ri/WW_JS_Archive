"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configOccupationConfigLang = void 0);
const LanguageSystem_1 = require("../../Common/LanguageSystem"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  DeserializeConfig_1 = require("../../Config/DeserializeConfig"),
  StringUtils_1 = require("../../Utils/StringUtils"),
  CommonDefine_1 = require("../CommonDefine"),
  TEXTNOTFOUNT = "text not found",
  DB = "lang_occupation.db",
  TABLE = "OccupationConfig",
  COMMAND = "select content from `OccupationConfig` where id = ?",
  logPair = [
    ["数据库", DB],
    ["表名", TABLE],
    ["语句", COMMAND],
  ],
  langCache = new Map(),
  initStat = Stats_1.Stat.Create("configOccupationConfigLang.Init"),
  getLocalTextStat = Stats_1.Stat.Create(
    "configOccupationConfigLang.GetLocalText",
  ),
  LOCAL_TEXT_STAT_PREFIX = "configOccupationConfigLang.GetLocalText(";
exports.configOccupationConfigLang = {
  Init: () => {
    initStat.Start(),
      ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND),
      initStat.Stop();
  },
  GetLocalText: (o, n = void 0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getLocalTextStat.Start();
    var t = Stats_1.Stat.Create("" + LOCAL_TEXT_STAT_PREFIX + o + `, ${n})`);
    if ((t.Start(), LanguageSystem_1.LanguageSystem.GmShowLanguageKey))
      return (
        (e = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(n)),
        t.Stop(),
        getLocalTextStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        TABLE + `|${o}|` + e
      );
    let i = langCache.get(o);
    i || ((i = new Map()), langCache.set(o, i));
    var e = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(n);
    let a = i.get(e);
    if (a)
      return (
        t.Stop(),
        getLocalTextStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        a
      );
    var g = ConfigCommon_1.ConfigCommon.GetLangStatementId(
      TABLE,
      DB,
      COMMAND,
      e,
    );
    if (
      (m =
        ConfigCommon_1.ConfigCommon.CheckStatement(g) &&
        ConfigCommon_1.ConfigCommon.BindInt(g, 1, o, ...logPair, ["Id", o]) &&
        0 <
          ConfigCommon_1.ConfigCommon.Step(
            g,
            !0,
            ...logPair,
            ["传入语言", n],
            ["查询语言", e],
            ["文本Id", o],
          ))
    ) {
      var C = void 0;
      if (
        (([m, C] = ConfigCommon_1.ConfigCommon.GetValue(
          g,
          0,
          ...logPair,
          ["传入语言", n],
          ["查询语言", e],
          ["文本Id", o],
        )),
        m)
      ) {
        var m = DeserializeConfig_1.DeserializeConfig.ParseStringRange(
          C,
          0,
          C.byteLength,
          ...logPair,
          ["传入语言", n],
          ["查询语言", e],
          ["文本Id", o],
        );
        if (m.Success)
          return (
            (a = m.Value),
            ConfigCommon_1.ConfigCommon.Reset(g),
            t.Stop(),
            getLocalTextStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            StringUtils_1.StringUtils.IsEmpty(a) &&
              n !== CommonDefine_1.CHS &&
              ((C = exports.configOccupationConfigLang.GetLocalText(
                o,
                CommonDefine_1.CHS,
              )),
              StringUtils_1.StringUtils.IsEmpty(C) ||
                ((m = void 0 === n ? "" : "|" + n),
                (a = TEXTNOTFOUNT + "|" + o + m))),
            i.set(e, a),
            a
          );
      }
    }
    ConfigCommon_1.ConfigCommon.Reset(g),
      t.Stop(),
      getLocalTextStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=OccupationConfigLang.js.map

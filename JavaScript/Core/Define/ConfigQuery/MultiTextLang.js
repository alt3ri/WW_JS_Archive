"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configMultiTextLang = void 0);
const LanguageSystem_1 = require("../../Common/LanguageSystem"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  DeserializeConfig_1 = require("../../Config/DeserializeConfig"),
  StringUtils_1 = require("../../Utils/StringUtils"),
  CommonDefine_1 = require("../CommonDefine"),
  TEXTNOTFOUNT = "text not found",
  DB = "lang_multi_text.db",
  TABLE = "MultiText",
  COMMAND = "select content from `MultiText` where id = ?",
  logPair = [
    ["数据库", DB],
    ["表名", TABLE],
    ["语句", COMMAND],
  ],
  langCache = new Map(),
  initStat = Stats_1.Stat.Create("configMultiTextLang.Init"),
  getLocalTextStat = Stats_1.Stat.Create("configMultiTextLang.GetLocalTextNew"),
  LOCAL_TEXT_STAT_PREFIX = "configMultiTextLang.GetLocalTextNew(";
exports.configMultiTextLang = {
  Init: () => {
    initStat.Start(),
      ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND),
      initStat.Stop();
  },
  GetLocalText: (t, o = 0) => {},
  GetLocalTextNew: (t, o = void 0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getLocalTextStat.Start();
    var e = Stats_1.Stat.Create("" + LOCAL_TEXT_STAT_PREFIX + t + `, ${o})`);
    if ((e.Start(), LanguageSystem_1.LanguageSystem.GmShowLanguageKey))
      return (
        (i = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(o)),
        e.Stop(),
        getLocalTextStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        TABLE + `|${t}|` + i
      );
    let n = langCache.get(t);
    n || ((n = new Map()), langCache.set(t, n));
    var i = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(o);
    let a = n.get(i);
    if (a)
      return (
        e.Stop(),
        getLocalTextStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        a
      );
    var g = ConfigCommon_1.ConfigCommon.GetLangStatementId(
      TABLE,
      DB,
      COMMAND,
      i,
    );
    if (
      (m =
        ConfigCommon_1.ConfigCommon.CheckStatement(g) &&
        ConfigCommon_1.ConfigCommon.BindString(g, 1, t, ...logPair, [
          "Id",
          t,
        ]) &&
        0 <
          ConfigCommon_1.ConfigCommon.Step(
            g,
            !0,
            ...logPair,
            ["传入语言", o],
            ["查询语言", i],
            ["文本Id", t],
          ))
    ) {
      var C = void 0;
      if (
        (([m, C] = ConfigCommon_1.ConfigCommon.GetValue(
          g,
          0,
          ...logPair,
          ["传入语言", o],
          ["查询语言", i],
          ["文本Id", t],
        )),
        m)
      ) {
        var m = DeserializeConfig_1.DeserializeConfig.ParseStringRange(
          C,
          0,
          C.byteLength,
          ...logPair,
          ["传入语言", o],
          ["查询语言", i],
          ["文本Id", t],
        );
        if (m.Success)
          return (
            (a = m.Value),
            ConfigCommon_1.ConfigCommon.Reset(g),
            e.Stop(),
            getLocalTextStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            StringUtils_1.StringUtils.IsEmpty(a) &&
              o !== CommonDefine_1.CHS &&
              ((C = exports.configMultiTextLang.GetLocalTextNew(
                t,
                CommonDefine_1.CHS,
              )),
              StringUtils_1.StringUtils.IsEmpty(C) ||
                ((m = void 0 === o ? "" : "|" + o),
                (a = TEXTNOTFOUNT + "|" + t + m))),
            n.set(i, a),
            a
          );
      }
    }
    ConfigCommon_1.ConfigCommon.Reset(g),
      e.Stop(),
      getLocalTextStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=MultiTextLang.js.map

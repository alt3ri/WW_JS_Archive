"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configFlowTextLang = void 0);
const LanguageSystem_1 = require("../../Common/LanguageSystem"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  DeserializeConfig_1 = require("../../Config/DeserializeConfig"),
  StringUtils_1 = require("../../Utils/StringUtils"),
  CommonDefine_1 = require("../CommonDefine"),
  TEXTNOTFOUNT = "text not found",
  DB = "lang_flow_text.db",
  TABLE = "FlowText",
  COMMAND = "select content from `FlowText` where id = ?",
  logPair = [
    ["数据库", DB],
    ["表名", TABLE],
    ["语句", COMMAND],
  ],
  langCache = new Map(),
  initStat = Stats_1.Stat.Create("configFlowTextLang.Init"),
  getLocalTextStat = Stats_1.Stat.Create("configFlowTextLang.GetLocalText"),
  LOCAL_TEXT_STAT_PREFIX = "configFlowTextLang.GetLocalText(";
exports.configFlowTextLang = {
  Init: () => {
    initStat.Start(),
      ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND),
      initStat.Stop();
  },
  GetLocalText: (o, t = void 0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getLocalTextStat.Start();
    var e = Stats_1.Stat.Create("" + LOCAL_TEXT_STAT_PREFIX + o + `, ${t})`);
    if ((e.Start(), LanguageSystem_1.LanguageSystem.GmShowLanguageKey))
      return (
        (i = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(t)),
        e.Stop(),
        getLocalTextStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        TABLE + `|${o}|` + i
      );
    let n = langCache.get(o);
    n || ((n = new Map()), langCache.set(o, n));
    var i = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(t);
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
        ConfigCommon_1.ConfigCommon.BindInt(g, 1, o, ...logPair, ["Id", o]) &&
        0 <
          ConfigCommon_1.ConfigCommon.Step(
            g,
            !0,
            ...logPair,
            ["传入语言", t],
            ["查询语言", i],
            ["文本Id", o],
          ))
    ) {
      var C = void 0;
      if (
        (([m, C] = ConfigCommon_1.ConfigCommon.GetValue(
          g,
          0,
          ...logPair,
          ["传入语言", t],
          ["查询语言", i],
          ["文本Id", o],
        )),
        m)
      ) {
        var m = DeserializeConfig_1.DeserializeConfig.ParseStringRange(
          C,
          0,
          C.byteLength,
          ...logPair,
          ["传入语言", t],
          ["查询语言", i],
          ["文本Id", o],
        );
        if (m.Success)
          return (
            (a = m.Value),
            ConfigCommon_1.ConfigCommon.Reset(g),
            e.Stop(),
            getLocalTextStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            StringUtils_1.StringUtils.IsEmpty(a) &&
              t !== CommonDefine_1.CHS &&
              ((C = exports.configFlowTextLang.GetLocalText(
                o,
                CommonDefine_1.CHS,
              )),
              StringUtils_1.StringUtils.IsEmpty(C) ||
                ((m = void 0 === t ? "" : "|" + t),
                (a = TEXTNOTFOUNT + "|" + o + m))),
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
//# sourceMappingURL=FlowTextLang.js.map

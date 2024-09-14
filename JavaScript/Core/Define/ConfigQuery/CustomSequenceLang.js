"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configCustomSequenceLang = void 0);
const LanguageSystem_1 = require("../../Common/LanguageSystem"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  DeserializeConfig_1 = require("../../Config/DeserializeConfig"),
  StringUtils_1 = require("../../Utils/StringUtils"),
  CommonDefine_1 = require("../CommonDefine"),
  TEXTNOTFOUNT = "text not found",
  DB = "lang_custom_sequence.db",
  TABLE = "CustomSequence",
  COMMAND = "select content from `CustomSequence` where id = ?",
  logPair = [
    ["数据库", DB],
    ["表名", TABLE],
    ["语句", COMMAND],
  ],
  langCache = new Map(),
  initStat = Stats_1.Stat.Create("configCustomSequenceLang.Init"),
  getLocalTextStat = Stats_1.Stat.Create(
    "configCustomSequenceLang.GetLocalText",
  ),
  LOCAL_TEXT_STAT_PREFIX = "configCustomSequenceLang.GetLocalText(";
exports.configCustomSequenceLang = {
  Init: () => {
    initStat.Start(),
      ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND),
      initStat.Stop();
  },
  GetLocalText: (e, o = void 0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getLocalTextStat.Start();
    var t = Stats_1.Stat.Create("" + LOCAL_TEXT_STAT_PREFIX + e + `, ${o})`);
    if ((t.Start(), LanguageSystem_1.LanguageSystem.GmShowLanguageKey))
      return (
        (i = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(o)),
        t.Stop(),
        getLocalTextStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        TABLE + `|${e}|` + i
      );
    let n = langCache.get(e);
    n || ((n = new Map()), langCache.set(e, n));
    var i = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(o);
    let a = n.get(i);
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
      i,
    );
    if (
      (m =
        ConfigCommon_1.ConfigCommon.CheckStatement(g) &&
        ConfigCommon_1.ConfigCommon.BindInt(g, 1, e, ...logPair, ["Id", e]) &&
        0 <
          ConfigCommon_1.ConfigCommon.Step(
            g,
            !0,
            ...logPair,
            ["传入语言", o],
            ["查询语言", i],
            ["文本Id", e],
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
          ["文本Id", e],
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
          ["文本Id", e],
        );
        if (m.Success)
          return (
            (a = m.Value),
            ConfigCommon_1.ConfigCommon.Reset(g),
            t.Stop(),
            getLocalTextStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            StringUtils_1.StringUtils.IsEmpty(a) &&
              o !== CommonDefine_1.CHS &&
              ((C = exports.configCustomSequenceLang.GetLocalText(
                e,
                CommonDefine_1.CHS,
              )),
              StringUtils_1.StringUtils.IsEmpty(C) ||
                ((m = void 0 === o ? "" : "|" + o),
                (a = TEXTNOTFOUNT + "|" + e + m))),
            n.set(i, a),
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
//# sourceMappingURL=CustomSequenceLang.js.map

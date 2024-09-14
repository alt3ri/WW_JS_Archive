"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configCommonParamLang = void 0);
const LanguageSystem_1 = require("../../Common/LanguageSystem"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  DeserializeConfig_1 = require("../../Config/DeserializeConfig"),
  DB = "lang_common_param.db",
  TABLE = "CommonParam",
  COMMAND = "select content from `CommonParam` where id = ?",
  logPair = [
    ["数据库", DB],
    ["表名", TABLE],
    ["语句", COMMAND],
  ],
  langCache = new Map(),
  initStat = Stats_1.Stat.Create("configCommonParamLang.Init"),
  getLocalTextStat = Stats_1.Stat.Create("configCommonParamLang.GetLocalText"),
  LOCAL_TEXT_STAT_PREFIX = "configCommonParamLang.GetLocalText(";
exports.configCommonParamLang = {
  Init: () => {
    initStat.Start(),
      ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND),
      initStat.Stop();
  },
  GetLocalText: (o, a = void 0) => {
    var t = Stats_1.Stat.Create("" + LOCAL_TEXT_STAT_PREFIX + o + `, ${a})`);
    if (
      (getLocalTextStat.Start(),
      t.Start(),
      LanguageSystem_1.LanguageSystem.GmShowLanguageKey)
    )
      return (
        (n = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(a)),
        t.Stop(),
        getLocalTextStat.Stop(),
        `CommonParam|${o}|` + n
      );
    let e = langCache.get(o);
    e || ((e = new Map()), langCache.set(o, e));
    var n = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(a),
      i = e.get(n);
    if (i) return t.Stop(), getLocalTextStat.Stop(), i;
    var m = ConfigCommon_1.ConfigCommon.GetLangStatementId(
      TABLE,
      DB,
      COMMAND,
      a,
    );
    if ((C = ConfigCommon_1.ConfigCommon.CheckStatement(m))) {
      if (
        (C =
          (C = ConfigCommon_1.ConfigCommon.BindInt(m, 1, o, ...logPair, [
            "Id",
            o,
          ])) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              m,
              !0,
              ...logPair,
              ["传入语言", a],
              ["查询语言", n],
              ["文本Id", o],
            ))
      ) {
        var g = void 0;
        if (
          (([C, g] = ConfigCommon_1.ConfigCommon.GetValue(
            m,
            0,
            ...logPair,
            ["传入语言", a],
            ["查询语言", n],
            ["文本Id", o],
          )),
          C)
        ) {
          var C = DeserializeConfig_1.DeserializeConfig.ParseString(
            g,
            0,
            ...logPair,
            ["传入语言", a],
            ["查询语言", n],
            ["文本Id", o],
          );
          if (C.Success)
            return (
              (i = C.Value),
              e.set(n, i),
              ConfigCommon_1.ConfigCommon.Reset(m),
              t.Stop(),
              getLocalTextStat.Stop(),
              i
            );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(m);
    }
    t.Stop(), getLocalTextStat.Stop();
  },
};
//# sourceMappingURL=CommonParamLang.js.map

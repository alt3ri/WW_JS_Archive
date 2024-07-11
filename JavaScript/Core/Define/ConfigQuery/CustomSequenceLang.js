"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configCustomSequenceLang = void 0);
const LanguageSystem_1 = require("../../Common/LanguageSystem");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DeserializeConfig_1 = require("../../Config/DeserializeConfig");
const StringUtils_1 = require("../../Utils/StringUtils");
const CommonDefine_1 = require("../CommonDefine");
const TEXTNOTFOUNT = "text not found";
const DB = "lang_custom_sequence.db";
const TABLE = "CustomSequence";
const COMMAND = "select content from `CustomSequence` where id = ?";
const logPair = [
  ["数据库", DB],
  ["表名", TABLE],
  ["语句", COMMAND],
];
const langCache = new Map();
const initStat = void 0;
const getLocalTextStat = void 0;
const LOCAL_TEXT_STAT_PREFIX = "configCustomSequenceLang.GetLocalText(";
exports.configCustomSequenceLang = {
  Init: () => {
    ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND);
  },
  GetLocalText: (e, o = void 0) => {
    if (LanguageSystem_1.LanguageSystem.GmShowLanguageKey)
      return (
        (i = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(o)),
        TABLE + `|${e}|` + i
      );
    let n = langCache.get(e);
    n || ((n = new Map()), langCache.set(e, n));
    var i = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(o);
    let t = n.get(i);
    if (t) return t;
    const m = ConfigCommon_1.ConfigCommon.GetLangStatementId(
      TABLE,
      DB,
      COMMAND,
      i,
    );
    if (
      (g =
        ConfigCommon_1.ConfigCommon.CheckStatement(m) &&
        ConfigCommon_1.ConfigCommon.BindInt(m, 1, e, ...logPair, ["Id", e]) &&
        ConfigCommon_1.ConfigCommon.Step(
          m,
          !0,
          ...logPair,
          ["传入语言", o],
          ["查询语言", i],
          ["文本Id", e],
        ) > 0)
    ) {
      let C = void 0;
      if (
        (([g, C] = ConfigCommon_1.ConfigCommon.GetValue(
          m,
          0,
          ...logPair,
          ["传入语言", o],
          ["查询语言", i],
          ["文本Id", e],
        )),
        g)
      ) {
        var g = DeserializeConfig_1.DeserializeConfig.ParseStringRange(
          C,
          0,
          C.byteLength,
          ...logPair,
          ["传入语言", o],
          ["查询语言", i],
          ["文本Id", e],
        );
        if (g.Success)
          return (
            (t = g.Value),
            ConfigCommon_1.ConfigCommon.Reset(m),
            StringUtils_1.StringUtils.IsEmpty(t) &&
              o !== CommonDefine_1.CHS &&
              ((C = exports.configCustomSequenceLang.GetLocalText(
                e,
                CommonDefine_1.CHS,
              )),
              StringUtils_1.StringUtils.IsEmpty(C) ||
                ((g = void 0 === o ? "" : "|" + o),
                (t = TEXTNOTFOUNT + "|" + e + g))),
            n.set(i, t),
            t
          );
      }
    }
    ConfigCommon_1.ConfigCommon.Reset(m);
  },
};
// # sourceMappingURL=CustomSequenceLang.js.map

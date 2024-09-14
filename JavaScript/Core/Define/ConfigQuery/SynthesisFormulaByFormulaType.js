"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configSynthesisFormulaByFormulaType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  SynthesisFormula_1 = require("../Config/SynthesisFormula"),
  DB = "db_compose.db",
  FILE = "h.合成.xlsx",
  TABLE = "SynthesisFormula",
  COMMAND = "select BinData from `SynthesisFormula` where FormulaType=?",
  KEY_PREFIX = "SynthesisFormulaByFormulaType",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configSynthesisFormulaByFormulaType.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configSynthesisFormulaByFormulaType.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configSynthesisFormulaByFormulaType.GetConfigList(";
exports.configSynthesisFormulaByFormulaType = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      t =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (n) {
        var e = KEY_PREFIX + `#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r)
          return (
            i.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
      }
      if (
        (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const r = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "FormulaType",
              o,
            ])
          )
            break;
          var a = void 0;
          if (
            (([t, a] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["FormulaType", o],
            )),
            !t)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              i.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          a = SynthesisFormula_1.SynthesisFormula.getRootAsSynthesisFormula(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          r.push(a);
        }
        return (
          n &&
            ((e = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, r, r.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          i.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          r
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=SynthesisFormulaByFormulaType.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configForgeFormulaByTypeId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  ForgeFormula_1 = require("../Config/ForgeFormula"),
  DB = "db_forge.db",
  FILE = "d.锻造.xlsx",
  TABLE = "ForgeFormula",
  COMMAND = "select BinData from `ForgeFormula` where TypeId=?",
  KEY_PREFIX = "ForgeFormulaByTypeId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configForgeFormulaByTypeId.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configForgeFormulaByTypeId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configForgeFormulaByTypeId.GetConfigList(";
exports.configForgeFormulaByTypeId = {
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
      e =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (n) {
        var t = KEY_PREFIX + `#${o})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (g)
          return (
            i.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
      }
      if (
        (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const g = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "TypeId",
              o,
            ])
          )
            break;
          var r = void 0;
          if (
            (([e, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["TypeId", o],
            )),
            !e)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              i.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          r = ForgeFormula_1.ForgeFormula.getRootAsForgeFormula(
            new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
          );
          g.push(r);
        }
        return (
          n &&
            ((t = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(t, g, g.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          i.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          g
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=ForgeFormulaByTypeId.js.map

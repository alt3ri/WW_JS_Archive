"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configResonantChainByGroupIdAndGroupIndex = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  ResonantChain_1 = require("../Config/ResonantChain"),
  DB = "db_resonate_chain.db",
  FILE = "g.共鸣链.xlsx",
  TABLE = "ResonantChain",
  COMMAND =
    "select BinData from `ResonantChain` where GroupId=? AND GroupIndex=?",
  KEY_PREFIX = "ResonantChainByGroupIdAndGroupIndex",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configResonantChainByGroupIdAndGroupIndex.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configResonantChainByGroupIdAndGroupIndex.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configResonantChainByGroupIdAndGroupIndex.GetConfig(";
exports.configResonantChainByGroupIdAndGroupIndex = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (n, o, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${n}#${o})`),
      t =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (i) {
        var a = KEY_PREFIX + `#${n}#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (C)
          return (
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["GroupId", n],
              ["GroupIndex", o],
            ))
      ) {
        a = void 0;
        if (
          (([t, a] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["GroupId", n],
            ["GroupIndex", o],
          )),
          t)
        ) {
          const C = ResonantChain_1.ResonantChain.getRootAsResonantChain(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          return (
            i &&
              ((t = KEY_PREFIX + `#${n}#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, C)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=ResonantChainByGroupIdAndGroupIndex.js.map

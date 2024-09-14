"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configResonantChainByGroupIdAndNodeType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  ResonantChain_1 = require("../Config/ResonantChain"),
  DB = "db_resonate_chain.db",
  FILE = "g.共鸣链.xlsx",
  TABLE = "ResonantChain",
  COMMAND =
    "select BinData from `ResonantChain` where GroupId=? AND NodeType=?",
  KEY_PREFIX = "ResonantChainByGroupIdAndNodeType",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configResonantChainByGroupIdAndNodeType.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configResonantChainByGroupIdAndNodeType.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configResonantChainByGroupIdAndNodeType.GetConfigList(";
exports.configResonantChainByGroupIdAndNodeType = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o, n, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o}#${n})`),
      e =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (i) {
        var a = KEY_PREFIX + `#${o}#${n})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (r)
          return (
            t.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair))
      ) {
        const r = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !1,
              ...logPair,
              ["GroupId", o],
              ["NodeType", n],
            )
          )
            break;
          var C = void 0;
          if (
            (([e, C] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["GroupId", o],
              ["NodeType", n],
            )),
            !e)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              t.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          C = ResonantChain_1.ResonantChain.getRootAsResonantChain(
            new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
          );
          r.push(C);
        }
        return (
          i &&
            ((a = KEY_PREFIX + `#${o}#${n})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(a, r, r.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          t.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          r
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=ResonantChainByGroupIdAndNodeType.js.map

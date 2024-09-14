"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRogueBuffPoolById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RogueBuffPool_1 = require("../Config/RogueBuffPool"),
  DB = "db_rogue.db",
  FILE = "r.肉鸽.xlsx",
  TABLE = "RogueBuffPool",
  COMMAND = "select BinData from `RogueBuffPool` where Id=?",
  KEY_PREFIX = "RogueBuffPoolById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configRogueBuffPoolById.Init"),
  getConfigStat = Stats_1.Stat.Create("configRogueBuffPoolById.GetConfig"),
  CONFIG_STAT_PREFIX = "configRogueBuffPoolById.GetConfig(";
exports.configRogueBuffPoolById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      f =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (f) {
      if (n) {
        var i = KEY_PREFIX + `#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (t)
          return (
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            t
          );
      }
      if (
        (f =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              o,
            ]))
      ) {
        i = void 0;
        if (
          (([f, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          f)
        ) {
          const t = RogueBuffPool_1.RogueBuffPool.getRootAsRogueBuffPool(
            new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
          );
          return (
            n &&
              ((f = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(f, t)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            t
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
//# sourceMappingURL=RogueBuffPoolById.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configMonsterDetectionByMarkId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  MonsterDetection_1 = require("../Config/MonsterDetection"),
  DB = "db_adventure_detect.db",
  FILE = "k.开拓探测.xlsx",
  TABLE = "MonsterDetection",
  COMMAND = "select BinData from `MonsterDetection` where MarkId=?",
  KEY_PREFIX = "MonsterDetectionByMarkId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configMonsterDetectionByMarkId.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configMonsterDetectionByMarkId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configMonsterDetectionByMarkId.GetConfig(";
exports.configMonsterDetectionByMarkId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      e =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (t) {
        var i = KEY_PREFIX + `#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (r)
          return (
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "MarkId",
              o,
            ]))
      ) {
        i = void 0;
        if (
          (([e, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["MarkId", o],
          )),
          e)
        ) {
          const r =
            MonsterDetection_1.MonsterDetection.getRootAsMonsterDetection(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          return (
            t &&
              ((e = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, r)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=MonsterDetectionByMarkId.js.map

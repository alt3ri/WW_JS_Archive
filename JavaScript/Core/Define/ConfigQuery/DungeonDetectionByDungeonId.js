"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configDungeonDetectionByDungeonId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  DungeonDetection_1 = require("../Config/DungeonDetection"),
  DB = "db_adventure_detect.db",
  FILE = "k.开拓探测.xlsx",
  TABLE = "DungeonDetection",
  COMMAND = "select BinData from `DungeonDetection` where DungeonId=?",
  KEY_PREFIX = "DungeonDetectionByDungeonId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = void 0,
  getConfigStat = void 0,
  CONFIG_STAT_PREFIX = "configDungeonDetectionByDungeonId.GetConfig(";
exports.configDungeonDetectionByDungeonId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (n, o = !0) => {
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var e = KEY_PREFIX + `#${n})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (t) return t;
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "DungeonId",
              n,
            ]))
      ) {
        var i,
          e = void 0;
        if (
          (([i, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["DungeonId", n],
          )),
          i)
        ) {
          const t =
            DungeonDetection_1.DungeonDetection.getRootAsDungeonDetection(
              new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
            );
          return (
            o &&
              ((i = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, t)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
//# sourceMappingURL=DungeonDetectionByDungeonId.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configInstanceDungeonEntranceByMarkId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  InstanceDungeonEntrance_1 = require("../Config/InstanceDungeonEntrance"),
  DB = "db_instance_dungeon.db",
  FILE = "f.副本.xlsx",
  TABLE = "InstanceDungeonEntrance",
  COMMAND = "select BinData from `InstanceDungeonEntrance` where MarkId=?",
  KEY_PREFIX = "InstanceDungeonEntranceByMarkId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = void 0,
  getConfigStat = void 0,
  CONFIG_STAT_PREFIX = "configInstanceDungeonEntranceByMarkId.GetConfig(";
exports.configInstanceDungeonEntranceByMarkId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (n, o = !0) => {
    if (
      (t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var e = KEY_PREFIX + `#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a) return a;
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "MarkId",
              n,
            ]))
      ) {
        var t,
          e = void 0;
        if (
          (([t, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["MarkId", n],
          )),
          t)
        ) {
          const a =
            InstanceDungeonEntrance_1.InstanceDungeonEntrance.getRootAsInstanceDungeonEntrance(
              new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
            );
          return (
            o &&
              ((t = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
//# sourceMappingURL=InstanceDungeonEntranceByMarkId.js.map

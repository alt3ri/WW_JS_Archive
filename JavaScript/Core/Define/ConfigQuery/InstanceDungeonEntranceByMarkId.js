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
const initStat = Stats_1.Stat.Create(
    "configInstanceDungeonEntranceByMarkId.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configInstanceDungeonEntranceByMarkId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configInstanceDungeonEntranceByMarkId.GetConfig(";
exports.configInstanceDungeonEntranceByMarkId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (n, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${n})`),
      t =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (o) {
        var a = KEY_PREFIX + `#${n})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (i)
          return (
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
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
        a = void 0;
        if (
          (([t, a] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["MarkId", n],
          )),
          t)
        ) {
          const i =
            InstanceDungeonEntrance_1.InstanceDungeonEntrance.getRootAsInstanceDungeonEntrance(
              new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
            );
          return (
            o &&
              ((t = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, i)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
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
//# sourceMappingURL=InstanceDungeonEntranceByMarkId.js.map

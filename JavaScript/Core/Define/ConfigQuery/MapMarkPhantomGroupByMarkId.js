"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configMapMarkPhantomGroupByMarkId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  MapMarkPhantomGroup_1 = require("../Config/MapMarkPhantomGroup"),
  DB = "db_map_mark.db",
  FILE = "d.地图标记.xlsx",
  TABLE = "MapMarkPhantomGroup",
  COMMAND = "select BinData from `MapMarkPhantomGroup` where MarkId=?",
  KEY_PREFIX = "MapMarkPhantomGroupByMarkId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configMapMarkPhantomGroupByMarkId.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configMapMarkPhantomGroupByMarkId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configMapMarkPhantomGroupByMarkId.GetConfig(";
exports.configMapMarkPhantomGroupByMarkId = {
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
    var a = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      t =
        (a.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (n) {
        var i = KEY_PREFIX + `#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (r)
          return (
            a.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "MarkId",
              o,
            ]))
      ) {
        i = void 0;
        if (
          (([t, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["MarkId", o],
          )),
          t)
        ) {
          const r =
            MapMarkPhantomGroup_1.MapMarkPhantomGroup.getRootAsMapMarkPhantomGroup(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          return (
            n &&
              ((t = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, r)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            a.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=MapMarkPhantomGroupByMarkId.js.map

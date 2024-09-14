"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTemporaryTeleportMarkByMarkId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  TemporaryTeleportMark_1 = require("../Config/TemporaryTeleportMark"),
  DB = "db_map_mark.db",
  FILE = "d.地图标记.xlsx",
  TABLE = "TemporaryTeleportMark",
  COMMAND = "select BinData from `TemporaryTeleportMark` where MarkId=?",
  KEY_PREFIX = "TemporaryTeleportMarkByMarkId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configTemporaryTeleportMarkByMarkId.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configTemporaryTeleportMarkByMarkId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configTemporaryTeleportMarkByMarkId.GetConfig(";
exports.configTemporaryTeleportMarkByMarkId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var r = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      n =
        (r.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (e) {
        var t = KEY_PREFIX + `#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (a)
          return (
            r.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "MarkId",
              o,
            ]))
      ) {
        t = void 0;
        if (
          (([n, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["MarkId", o],
          )),
          n)
        ) {
          const a =
            TemporaryTeleportMark_1.TemporaryTeleportMark.getRootAsTemporaryTeleportMark(
              new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
            );
          return (
            e &&
              ((n = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            r.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    r.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=TemporaryTeleportMarkByMarkId.js.map

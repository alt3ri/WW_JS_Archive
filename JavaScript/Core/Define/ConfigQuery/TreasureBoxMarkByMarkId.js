"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTreasureBoxMarkByMarkId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  TreasureBoxMark_1 = require("../Config/TreasureBoxMark"),
  DB = "db_map_mark.db",
  FILE = "d.地图标记.xlsx",
  TABLE = "TreasureBoxMark",
  COMMAND = "select BinData from `TreasureBoxMark` where MarkId=?",
  KEY_PREFIX = "TreasureBoxMarkByMarkId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configTreasureBoxMarkByMarkId.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configTreasureBoxMarkByMarkId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configTreasureBoxMarkByMarkId.GetConfig(";
exports.configTreasureBoxMarkByMarkId = {
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
      r =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (r) {
      if (n) {
        var a = KEY_PREFIX + `#${o})`;
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
        (r =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "MarkId",
              o,
            ]))
      ) {
        a = void 0;
        if (
          (([r, a] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["MarkId", o],
          )),
          r)
        ) {
          const i = TreasureBoxMark_1.TreasureBoxMark.getRootAsTreasureBoxMark(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          return (
            n &&
              ((r = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(r, i)),
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
//# sourceMappingURL=TreasureBoxMarkByMarkId.js.map

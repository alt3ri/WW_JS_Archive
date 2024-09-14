"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBlockSwitchById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  BlockSwitch_1 = require("../Config/BlockSwitch"),
  DB = "db_map.db",
  FILE = "d.地图.xlsx",
  TABLE = "BlockSwitch",
  COMMAND = "select BinData from `BlockSwitch` where Id=?",
  KEY_PREFIX = "BlockSwitchById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configBlockSwitchById.Init"),
  getConfigStat = Stats_1.Stat.Create("configBlockSwitchById.GetConfig"),
  CONFIG_STAT_PREFIX = "configBlockSwitchById.GetConfig(";
exports.configBlockSwitchById = {
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
    var i = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      t =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (n) {
        var e = KEY_PREFIX + `#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (C)
          return (
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              o,
            ]))
      ) {
        e = void 0;
        if (
          (([t, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          t)
        ) {
          const C = BlockSwitch_1.BlockSwitch.getRootAsBlockSwitch(
            new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
          );
          return (
            n &&
              ((t = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, C)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=BlockSwitchById.js.map

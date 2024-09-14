"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configMapMarkByRelativeMainSubType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  MapMark_1 = require("../Config/MapMark"),
  DB = "db_map_mark.db",
  FILE = "d.地图标记.xlsx",
  TABLE = "MapMark",
  COMMAND =
    "select BinData from `MapMark` where RelativeType=? and RelativeSubType=?",
  KEY_PREFIX = "MapMarkByRelativeMainSubType",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configMapMarkByRelativeMainSubType.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configMapMarkByRelativeMainSubType.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configMapMarkByRelativeMainSubType.GetConfig(";
exports.configMapMarkByRelativeMainSubType = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, e, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${e})`),
      a =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (a) {
      if (n) {
        var t = KEY_PREFIX + `#${o}#${e})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C)
          return (
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (a =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, e, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["RelativeType", o],
              ["RelativeSubType", e],
            ))
      ) {
        t = void 0;
        if (
          (([a, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["RelativeType", o],
            ["RelativeSubType", e],
          )),
          a)
        ) {
          const C = MapMark_1.MapMark.getRootAsMapMark(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          return (
            n &&
              ((a = KEY_PREFIX + `#${o}#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(a, C)),
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
//# sourceMappingURL=MapMarkByRelativeMainSubType.js.map

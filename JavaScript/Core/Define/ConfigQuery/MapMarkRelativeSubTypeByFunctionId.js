"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configMapMarkRelativeSubTypeByFunctionId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  MapMarkRelativeSubType_1 = require("../Config/MapMarkRelativeSubType"),
  DB = "db_map_mark.db",
  FILE = "d.地图标记.xlsx",
  TABLE = "MapMarkRelativeSubType",
  COMMAND = "select BinData from `MapMarkRelativeSubType` where FunctionId=?",
  KEY_PREFIX = "MapMarkRelativeSubTypeByFunctionId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configMapMarkRelativeSubTypeByFunctionId.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configMapMarkRelativeSubTypeByFunctionId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configMapMarkRelativeSubTypeByFunctionId.GetConfig(";
exports.configMapMarkRelativeSubTypeByFunctionId = {
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
      i =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (n) {
        var t = KEY_PREFIX + `#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (a)
          return (
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "FunctionId",
              o,
            ]))
      ) {
        t = void 0;
        if (
          (([i, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["FunctionId", o],
          )),
          i)
        ) {
          const a =
            MapMarkRelativeSubType_1.MapMarkRelativeSubType.getRootAsMapMarkRelativeSubType(
              new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
            );
          return (
            n &&
              ((i = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
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
//# sourceMappingURL=MapMarkRelativeSubTypeByFunctionId.js.map

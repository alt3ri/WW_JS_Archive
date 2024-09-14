"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configMapBorderByBorderIdAndMapId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  MapBorder_1 = require("../Config/MapBorder"),
  DB = "db_map.db",
  FILE = "d.地图.xlsx",
  TABLE = "MapBorder",
  COMMAND = "select BinData from `MapBorder` where BorderId=? and MapId=?",
  KEY_PREFIX = "MapBorderByBorderIdAndMapId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configMapBorderByBorderIdAndMapId.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configMapBorderByBorderIdAndMapId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configMapBorderByBorderIdAndMapId.GetConfig(";
exports.configMapBorderByBorderIdAndMapId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, n, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var r = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${n})`),
      d =
        (r.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (d) {
      if (e) {
        var i = KEY_PREFIX + `#${o}#${n})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (t)
          return (
            r.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            t
          );
      }
      if (
        (d =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["BorderId", o],
              ["MapId", n],
            ))
      ) {
        i = void 0;
        if (
          (([d, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["BorderId", o],
            ["MapId", n],
          )),
          d)
        ) {
          const t = MapBorder_1.MapBorder.getRootAsMapBorder(
            new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
          );
          return (
            e &&
              ((d = KEY_PREFIX + `#${o}#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(d, t)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            r.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            t
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
//# sourceMappingURL=MapBorderByBorderIdAndMapId.js.map

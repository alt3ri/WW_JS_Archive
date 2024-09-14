"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBuildingUpGradeCurveByGroupIdAndLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  BuildingUpGradeCurve_1 = require("../Config/BuildingUpGradeCurve"),
  DB = "db_moonchasing.db",
  FILE = "z.追月节.xlsx",
  TABLE = "BuildingUpGradeCurve",
  COMMAND =
    "select BinData from `BuildingUpGradeCurve` where GroupId=? AND Level=?",
  KEY_PREFIX = "BuildingUpGradeCurveByGroupIdAndLevel",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configBuildingUpGradeCurveByGroupIdAndLevel.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configBuildingUpGradeCurveByGroupIdAndLevel.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configBuildingUpGradeCurveByGroupIdAndLevel.GetConfig(";
exports.configBuildingUpGradeCurveByGroupIdAndLevel = {
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
    var i = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${n})`),
      r =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (r) {
      if (e) {
        var t = KEY_PREFIX + `#${o}#${n})`;
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
        (r =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["GroupId", o],
              ["Level", n],
            ))
      ) {
        t = void 0;
        if (
          (([r, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["GroupId", o],
            ["Level", n],
          )),
          r)
        ) {
          const C =
            BuildingUpGradeCurve_1.BuildingUpGradeCurve.getRootAsBuildingUpGradeCurve(
              new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
            );
          return (
            e &&
              ((r = KEY_PREFIX + `#${o}#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(r, C)),
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
//# sourceMappingURL=BuildingUpGradeCurveByGroupIdAndLevel.js.map

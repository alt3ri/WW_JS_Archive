"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configChildUiCameraMappingById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  ChildUiCameraMapping_1 = require("../Config/ChildUiCameraMapping"),
  DB = "db_uicamera.db",
  FILE = "u.Ui相机.xlsx",
  TABLE = "ChildUiCameraMapping",
  COMMAND = "select BinData from `ChildUiCameraMapping` where Id=?",
  KEY_PREFIX = "ChildUiCameraMappingById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configChildUiCameraMappingById.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configChildUiCameraMappingById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configChildUiCameraMappingById.GetConfig(";
exports.configChildUiCameraMappingById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (i, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var o = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${i})`),
      a =
        (o.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (a) {
      if (n) {
        var C = KEY_PREFIX + `#${i})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (e)
          return (
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
      }
      if (
        (a =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              i,
            ]))
      ) {
        C = void 0;
        if (
          (([a, C] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", i],
          )),
          a)
        ) {
          const e =
            ChildUiCameraMapping_1.ChildUiCameraMapping.getRootAsChildUiCameraMapping(
              new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
            );
          return (
            n &&
              ((a = KEY_PREFIX + `#${i})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(a, e)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=ChildUiCameraMappingById.js.map

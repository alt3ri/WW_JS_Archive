"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configChildUiCameraMappingByViewName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  ChildUiCameraMapping_1 = require("../Config/ChildUiCameraMapping"),
  DB = "db_uicamera.db",
  FILE = "u.Ui相机.xlsx",
  TABLE = "ChildUiCameraMapping",
  COMMAND = "select BinData from `ChildUiCameraMapping` where ViewName=?",
  KEY_PREFIX = "ChildUiCameraMappingByViewName",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configChildUiCameraMappingByViewName.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configChildUiCameraMappingByViewName.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configChildUiCameraMappingByViewName.GetConfig(";
exports.configChildUiCameraMappingByViewName = {
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
      e =
        (o.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (n) {
        var a = KEY_PREFIX + `#${i})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (C)
          return (
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, i, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "ViewName",
              i,
            ]))
      ) {
        a = void 0;
        if (
          (([e, a] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["ViewName", i],
          )),
          e)
        ) {
          const C =
            ChildUiCameraMapping_1.ChildUiCameraMapping.getRootAsChildUiCameraMapping(
              new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
            );
          return (
            n &&
              ((e = KEY_PREFIX + `#${i})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, C)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
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
//# sourceMappingURL=ChildUiCameraMappingByViewName.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configUiCameraMappingAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  UiCameraMapping_1 = require("../Config/UiCameraMapping"),
  DB = "db_uicamera.db",
  FILE = "u.Ui相机.xlsx",
  TABLE = "UiCameraMapping",
  COMMAND = "select BinData from `UiCameraMapping`",
  KEY_PREFIX = "UiCameraMappingAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configUiCameraMappingAll.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configUiCameraMappingAll.GetConfigList",
  );
exports.configUiCameraMappingAll = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (i = !0) => {
    var o;
    if (
      (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start(),
      (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)))
    ) {
      if (i) {
        var n = KEY_PREFIX + ")";
        const a = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (a)
          return (
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      const a = new Array();
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
          break;
        var t = void 0;
        if (
          (([o, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !o)
        )
          return (
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            getConfigListStat.Stop(),
            void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
          );
        t = UiCameraMapping_1.UiCameraMapping.getRootAsUiCameraMapping(
          new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
        );
        a.push(t);
      }
      return (
        i &&
          ((n = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(n, a, a.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        getConfigListStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        a
      );
    }
    getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=UiCameraMappingAll.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configUiCameraMappingAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const UiCameraMapping_1 = require("../Config/UiCameraMapping");
const DB = "db_uicamera.db";
const FILE = "u.Ui相机.xlsx";
const TABLE = "UiCameraMapping";
const COMMAND = "select BinData from `UiCameraMapping`";
const KEY_PREFIX = "UiCameraMappingAll";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
exports.configUiCameraMappingAll = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (i = !0) => {
    let o;
    if (
      (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (i) {
        var n = KEY_PREFIX + ")";
        const a = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (a) return a;
      }
      const a = new Array();
      for (;;) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair) !== 1)
          break;
        let e = void 0;
        if (
          (([o, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !o)
        )
          return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        e = UiCameraMapping_1.UiCameraMapping.getRootAsUiCameraMapping(
          new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
        );
        a.push(e);
      }
      return (
        i &&
          ((n = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(n, a, a.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        a
      );
    }
  },
};
// # sourceMappingURL=UiCameraMappingAll.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configChildUiCameraMappingByViewName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ChildUiCameraMapping_1 = require("../Config/ChildUiCameraMapping");
const DB = "db_uicamera.db";
const FILE = "u.Ui相机.xlsx";
const TABLE = "ChildUiCameraMapping";
const COMMAND = "select BinData from `ChildUiCameraMapping` where ViewName=?";
const KEY_PREFIX = "ChildUiCameraMappingByViewName";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configChildUiCameraMappingByViewName.GetConfig(";
exports.configChildUiCameraMappingByViewName = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (i, e = !0) => {
    if (
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var o = KEY_PREFIX + `#${i})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(o);
        if (a) return a;
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, i, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "ViewName",
            i,
          ]) > 0)
      ) {
        var n;
        var o = void 0;
        if (
          (([n, o] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["ViewName", i],
          )),
          n)
        ) {
          const a =
            ChildUiCameraMapping_1.ChildUiCameraMapping.getRootAsChildUiCameraMapping(
              new byte_buffer_1.ByteBuffer(new Uint8Array(o.buffer)),
            );
          return (
            e &&
              ((n = KEY_PREFIX + `#${i})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=ChildUiCameraMappingByViewName.js.map

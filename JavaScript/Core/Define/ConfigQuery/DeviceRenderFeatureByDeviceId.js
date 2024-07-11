"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configDeviceRenderFeatureByDeviceId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DeviceRenderFeature_1 = require("../Config/DeviceRenderFeature");
const DB = "db_device_render_feature.db";
const FILE = "s.设置机型适配.xlsx";
const TABLE = "DeviceRenderFeature";
const COMMAND = "select BinData from `DeviceRenderFeature` where DeviceId = ?";
const KEY_PREFIX = "DeviceRenderFeatureByDeviceId";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
const CONFIG_LIST_STAT_PREFIX =
  "configDeviceRenderFeatureByDeviceId.GetConfigList(";
exports.configDeviceRenderFeatureByDeviceId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (e, o = !0) => {
    let i;
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var n = KEY_PREFIX + `#${e})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (t) return t;
      }
      if (
        (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair))
      ) {
        const t = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "DeviceId",
              e,
            ]) !== 1
          )
            break;
          let r = void 0;
          if (
            (([i, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["DeviceId", e],
            )),
            !i)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          r =
            DeviceRenderFeature_1.DeviceRenderFeature.getRootAsDeviceRenderFeature(
              new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
            );
          t.push(r);
        }
        return (
          o &&
            ((n = KEY_PREFIX + `#${e})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(n, t, t.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          t
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=DeviceRenderFeatureByDeviceId.js.map

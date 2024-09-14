"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configDeviceRenderFeatureByDeviceId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  DeviceRenderFeature_1 = require("../Config/DeviceRenderFeature"),
  DB = "db_device_render_feature.db",
  FILE = "s.设置机型适配.xlsx",
  TABLE = "DeviceRenderFeature",
  COMMAND = "select BinData from `DeviceRenderFeature` where DeviceId = ?",
  KEY_PREFIX = "DeviceRenderFeatureByDeviceId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configDeviceRenderFeatureByDeviceId.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configDeviceRenderFeatureByDeviceId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configDeviceRenderFeatureByDeviceId.GetConfigList(";
exports.configDeviceRenderFeatureByDeviceId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (e, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var o = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${e})`),
      n =
        (o.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (i) {
        var t = KEY_PREFIX + `#${e})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (a)
          return (
            o.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair))
      ) {
        const a = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "DeviceId",
              e,
            ])
          )
            break;
          var r = void 0;
          if (
            (([n, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["DeviceId", e],
            )),
            !n)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              o.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          r =
            DeviceRenderFeature_1.DeviceRenderFeature.getRootAsDeviceRenderFeature(
              new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
            );
          a.push(r);
        }
        return (
          i &&
            ((t = KEY_PREFIX + `#${e})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(t, a, a.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          o.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          a
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=DeviceRenderFeatureByDeviceId.js.map

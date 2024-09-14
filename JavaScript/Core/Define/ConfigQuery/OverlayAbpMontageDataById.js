"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configOverlayAbpMontageDataById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  OverlayAbpMontageData_1 = require("../Config/OverlayAbpMontageData"),
  DB = "db_overlayabpmontagedata.db",
  FILE = "k.可视化编辑/c.Csv/a.ABP叠加蒙太奇映射表/*.csv*",
  TABLE = "OverlayAbpMontageData",
  COMMAND = "select BinData from `OverlayAbpMontageData` where Id=?",
  KEY_PREFIX = "OverlayAbpMontageDataById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configOverlayAbpMontageDataById.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configOverlayAbpMontageDataById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configOverlayAbpMontageDataById.GetConfig(";
exports.configOverlayAbpMontageDataById = {
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
    var t = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      a =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (a) {
      if (n) {
        var e = KEY_PREFIX + `#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (i)
          return (
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
      }
      if (
        (a =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              o,
            ]))
      ) {
        e = void 0;
        if (
          (([a, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          a)
        ) {
          const i =
            OverlayAbpMontageData_1.OverlayAbpMontageData.getRootAsOverlayAbpMontageData(
              new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
            );
          return (
            n &&
              ((a = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(a, i)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=OverlayAbpMontageDataById.js.map

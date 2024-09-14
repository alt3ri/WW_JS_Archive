"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configDigitalScreenById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  DigitalScreen_1 = require("../Config/DigitalScreen"),
  DB = "db_digital_screen.db",
  FILE = "s.数码界面.xlsx",
  TABLE = "DigitalScreen",
  COMMAND = "select BinData from `DigitalScreen` where Id=?",
  KEY_PREFIX = "DigitalScreenById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configDigitalScreenById.Init"),
  getConfigStat = Stats_1.Stat.Create("configDigitalScreenById.GetConfig"),
  CONFIG_STAT_PREFIX = "configDigitalScreenById.GetConfig(";
exports.configDigitalScreenById = {
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
        var t = KEY_PREFIX + `#${i})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (g)
          return (
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              i,
            ]))
      ) {
        t = void 0;
        if (
          (([e, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", i],
          )),
          e)
        ) {
          const g = DigitalScreen_1.DigitalScreen.getRootAsDigitalScreen(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          return (
            n &&
              ((e = KEY_PREFIX + `#${i})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, g)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
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
//# sourceMappingURL=DigitalScreenById.js.map

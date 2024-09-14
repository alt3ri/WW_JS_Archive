"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configGamepadKeyByKeyName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  GamepadKey_1 = require("../Config/GamepadKey"),
  DB = "db_key.db",
  FILE = "a.按键.xlsx",
  TABLE = "GamepadKey",
  COMMAND = "select BinData from `GamepadKey` where KeyName=?",
  KEY_PREFIX = "GamepadKeyByKeyName",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configGamepadKeyByKeyName.Init"),
  getConfigStat = Stats_1.Stat.Create("configGamepadKeyByKeyName.GetConfig"),
  CONFIG_STAT_PREFIX = "configGamepadKeyByKeyName.GetConfig(";
exports.configGamepadKeyByKeyName = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (e, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${e})`),
      a =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (a) {
      if (o) {
        var i = KEY_PREFIX + `#${e})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (t)
          return (
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            t
          );
      }
      if (
        (a =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "KeyName",
              e,
            ]))
      ) {
        i = void 0;
        if (
          (([a, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["KeyName", e],
          )),
          a)
        ) {
          const t = GamepadKey_1.GamepadKey.getRootAsGamepadKey(
            new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
          );
          return (
            o &&
              ((a = KEY_PREFIX + `#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(a, t)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            t
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=GamepadKeyByKeyName.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configGamepadKeyByKeyName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const GamepadKey_1 = require("../Config/GamepadKey");
const DB = "db_key.db";
const FILE = "a.按键.xlsx";
const TABLE = "GamepadKey";
const COMMAND = "select BinData from `GamepadKey` where KeyName=?";
const KEY_PREFIX = "GamepadKeyByKeyName";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configGamepadKeyByKeyName.GetConfig(";
exports.configGamepadKeyByKeyName = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (e, o = !0) => {
    if (
      (a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var n = KEY_PREFIX + `#${e})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (i) return i;
      }
      if (
        (a =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "KeyName",
            e,
          ]) > 0)
      ) {
        var a;
        var n = void 0;
        if (
          (([a, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["KeyName", e],
          )),
          a)
        ) {
          const i = GamepadKey_1.GamepadKey.getRootAsGamepadKey(
            new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
          );
          return (
            o &&
              ((a = KEY_PREFIX + `#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(a, i)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=GamepadKeyByKeyName.js.map

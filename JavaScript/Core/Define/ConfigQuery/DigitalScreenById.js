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
const initStat = void 0,
  getConfigStat = void 0,
  CONFIG_STAT_PREFIX = "configDigitalScreenById.GetConfig(";
exports.configDigitalScreenById = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (e, i = !0) => {
    if (
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (i) {
        var o = KEY_PREFIX + `#${e})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(o);
        if (r) return r;
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              e,
            ]))
      ) {
        var n,
          o = void 0;
        if (
          (([n, o] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", e],
          )),
          n)
        ) {
          const r = DigitalScreen_1.DigitalScreen.getRootAsDigitalScreen(
            new byte_buffer_1.ByteBuffer(new Uint8Array(o.buffer)),
          );
          return (
            i &&
              ((n = KEY_PREFIX + `#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, r)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            r
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
//# sourceMappingURL=DigitalScreenById.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configDaySelectPresetById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  DaySelectPreset_1 = require("../Config/DaySelectPreset"),
  DB = "db_time_of_day.db",
  FILE = "s.时间系统.xlsx",
  TABLE = "DaySelectPreset",
  COMMAND = "select BinData from `DaySelectPreset` where Id=?",
  KEY_PREFIX = "DaySelectPresetById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = void 0,
  getConfigStat = void 0,
  CONFIG_STAT_PREFIX = "configDaySelectPresetById.GetConfig(";
exports.configDaySelectPresetById = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (e, o = !0) => {
    if (
      (t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var n = KEY_PREFIX + `#${e})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (i) return i;
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              e,
            ]))
      ) {
        var t,
          n = void 0;
        if (
          (([t, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", e],
          )),
          t)
        ) {
          const i = DaySelectPreset_1.DaySelectPreset.getRootAsDaySelectPreset(
            new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
          );
          return (
            o &&
              ((t = KEY_PREFIX + `#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, i)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
//# sourceMappingURL=DaySelectPresetById.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configCatchSignalDifficultyById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const CatchSignalDifficulty_1 = require("../Config/CatchSignalDifficulty");
const DB = "db_catchsignaldifficulty.db";
const FILE = "k.可视化编辑/c.Csv/m.捕获信号玩法难度/*.csv*";
const TABLE = "CatchSignalDifficulty";
const COMMAND = "select BinData from `CatchSignalDifficulty` where Id=?";
const KEY_PREFIX = "CatchSignalDifficultyById";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configCatchSignalDifficultyById.GetConfig(";
exports.configCatchSignalDifficultyById = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (i, o = !0) => {
    if (
      (t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var n = KEY_PREFIX + `#${i})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (f) return f;
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "Id",
            i,
          ]) > 0)
      ) {
        var t;
        var n = void 0;
        if (
          (([t, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", i],
          )),
          t)
        ) {
          const f =
            CatchSignalDifficulty_1.CatchSignalDifficulty.getRootAsCatchSignalDifficulty(
              new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
            );
          return (
            o &&
              ((t = KEY_PREFIX + `#${i})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, f)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            f
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=CatchSignalDifficultyById.js.map

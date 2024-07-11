"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configSkillLevelBySkillLevelGroupIdAndSkillId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SkillLevel_1 = require("../Config/SkillLevel");
const DB = "db_skill.db";
const FILE = "j.技能.xlsx";
const TABLE = "SkillLevel";
const COMMAND =
  "select BinData from `SkillLevel` where SkillLevelGroupId = ? AND SkillId = ?";
const KEY_PREFIX = "SkillLevelBySkillLevelGroupIdAndSkillId";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX =
  "configSkillLevelBySkillLevelGroupIdAndSkillId.GetConfig(";
exports.configSkillLevelBySkillLevelGroupIdAndSkillId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (l, e, o = !0) => {
    if (
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var i = KEY_PREFIX + `#${l}#${e})`;
        const d = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (d) return d;
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, l, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, e, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(
            handleId,
            !0,
            ...logPair,
            ["SkillLevelGroupId", l],
            ["SkillId", e],
          ) > 0)
      ) {
        var n;
        var i = void 0;
        if (
          (([n, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["SkillLevelGroupId", l],
            ["SkillId", e],
          )),
          n)
        ) {
          const d = SkillLevel_1.SkillLevel.getRootAsSkillLevel(
            new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
          );
          return (
            o &&
              ((n = KEY_PREFIX + `#${l}#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, d)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            d
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=SkillLevelBySkillLevelGroupIdAndSkillId.js.map

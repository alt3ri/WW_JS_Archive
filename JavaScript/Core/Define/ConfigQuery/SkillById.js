"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configSkillById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const Skill_1 = require("../Config/Skill");
const DB = "db_skill.db";
const FILE = "j.技能.xlsx";
const TABLE = "Skill";
const COMMAND = "select BinData from `Skill` where Id = ?";
const KEY_PREFIX = "SkillById";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configSkillById.GetConfig(";
exports.configSkillById = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, i = !0) => {
    if (
      (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (i) {
        var n = KEY_PREFIX + `#${o})`;
        const l = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (l) return l;
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "Id",
            o,
          ]) > 0)
      ) {
        var e;
        var n = void 0;
        if (
          (([e, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          e)
        ) {
          const l = Skill_1.Skill.getRootAsSkill(
            new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
          );
          return (
            i &&
              ((e = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, l)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            l
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=SkillById.js.map

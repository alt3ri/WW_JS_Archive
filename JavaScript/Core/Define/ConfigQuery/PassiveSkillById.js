"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPassiveSkillById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PassiveSkill_1 = require("../Config/PassiveSkill");
const DB = "db_passiveskill.db";
const FILE = "b.被动技能.xlsx";
const TABLE = "PassiveSkill";
const COMMAND = "select BinData from `PassiveSkill` where Id=?";
const KEY_PREFIX = "PassiveSkillById";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configPassiveSkillById.GetConfig(";
exports.configPassiveSkillById = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (i, o = !0) => {
    if (
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var e = KEY_PREFIX + `#${i})`;
        const l = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (l) return l;
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindBigInt(handleId, 1, i, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "Id",
            i,
          ]) > 0)
      ) {
        var n;
        var e = void 0;
        if (
          (([n, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", i],
          )),
          n)
        ) {
          const l = PassiveSkill_1.PassiveSkill.getRootAsPassiveSkill(
            new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
          );
          return (
            o &&
              ((n = KEY_PREFIX + `#${i})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, l)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            l
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=PassiveSkillById.js.map

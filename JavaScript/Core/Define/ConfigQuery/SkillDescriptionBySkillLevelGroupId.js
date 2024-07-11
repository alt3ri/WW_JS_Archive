"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configSkillDescriptionBySkillLevelGroupId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SkillDescription_1 = require("../Config/SkillDescription");
const DB = "db_skill.db";
const FILE = "j.技能.xlsx";
const TABLE = "SkillDescription";
const COMMAND =
  "select BinData from `SkillDescription` where SkillLevelGroupId = ?";
const KEY_PREFIX = "SkillDescriptionBySkillLevelGroupId";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
const CONFIG_LIST_STAT_PREFIX =
  "configSkillDescriptionBySkillLevelGroupId.GetConfigList(";
exports.configSkillDescriptionBySkillLevelGroupId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (i, o = !0) => {
    let e;
    if (
      (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var n = KEY_PREFIX + `#${i})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (r) return r;
      }
      if (
        (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair))
      ) {
        const r = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "SkillLevelGroupId",
              i,
            ]) !== 1
          )
            break;
          let l = void 0;
          if (
            (([e, l] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["SkillLevelGroupId", i],
            )),
            !e)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          l = SkillDescription_1.SkillDescription.getRootAsSkillDescription(
            new byte_buffer_1.ByteBuffer(new Uint8Array(l.buffer)),
          );
          r.push(l);
        }
        return (
          o &&
            ((n = KEY_PREFIX + `#${i})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(n, r, r.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          r
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=SkillDescriptionBySkillLevelGroupId.js.map

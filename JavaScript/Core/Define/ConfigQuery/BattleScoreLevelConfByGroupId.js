"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBattleScoreLevelConfByGroupId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const BattleScoreLevelConf_1 = require("../Config/BattleScoreLevelConf");
const DB = "db_battlescore.db";
const FILE = "z.战斗评分.xlsx";
const TABLE = "BattleScoreLevelConf";
const COMMAND = "select BinData from `BattleScoreLevelConf` where GroupId=?";
const KEY_PREFIX = "BattleScoreLevelConfByGroupId";
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
  "configBattleScoreLevelConfByGroupId.GetConfigList(";
exports.configBattleScoreLevelConfByGroupId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o, e = !0) => {
    let n;
    if (
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var r = KEY_PREFIX + `#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (i) return i;
      }
      if (
        (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const i = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "GroupId",
              o,
            ]) !== 1
          )
            break;
          let t = void 0;
          if (
            (([n, t] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["GroupId", o],
            )),
            !n)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t =
            BattleScoreLevelConf_1.BattleScoreLevelConf.getRootAsBattleScoreLevelConf(
              new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
            );
          i.push(t);
        }
        return (
          e &&
            ((r = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(r, i, i.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          i
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=BattleScoreLevelConfByGroupId.js.map

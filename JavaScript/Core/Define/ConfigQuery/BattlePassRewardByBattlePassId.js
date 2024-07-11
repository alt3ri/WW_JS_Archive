"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBattlePassRewardByBattlePassId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const BattlePassReward_1 = require("../Config/BattlePassReward");
const DB = "db_battle_pass.db";
const FILE = "z.战令.xlsx";
const TABLE = "BattlePassReward";
const COMMAND = "select BinData from `BattlePassReward` where BattlePassId=?";
const KEY_PREFIX = "BattlePassRewardByBattlePassId";
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
  "configBattlePassRewardByBattlePassId.GetConfigList(";
exports.configBattlePassRewardByBattlePassId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (e, o = !0) => {
    let a;
    if (
      (a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var t = KEY_PREFIX + `#${e})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (i) return i;
      }
      if (
        (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair))
      ) {
        const i = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "BattlePassId",
              e,
            ]) !== 1
          )
            break;
          let n = void 0;
          if (
            (([a, n] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["BattlePassId", e],
            )),
            !a)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n = BattlePassReward_1.BattlePassReward.getRootAsBattlePassReward(
            new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
          );
          i.push(n);
        }
        return (
          o &&
            ((t = KEY_PREFIX + `#${e})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(t, i, i.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          i
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=BattlePassRewardByBattlePassId.js.map

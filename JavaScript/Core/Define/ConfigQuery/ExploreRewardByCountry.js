"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configExploreRewardByCountry = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ExploreReward_1 = require("../Config/ExploreReward");
const DB = "db_explore_progress.db";
const FILE = "t.探索度.xlsx";
const TABLE = "ExploreReward";
const COMMAND = "select BinData from `ExploreReward` where Country=?";
const KEY_PREFIX = "ExploreRewardByCountry";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
const CONFIG_LIST_STAT_PREFIX = "configExploreRewardByCountry.GetConfigList(";
exports.configExploreRewardByCountry = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o, e = !0) => {
    let r;
    if (
      (r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var n = KEY_PREFIX + `#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (t) return t;
      }
      if (
        (r = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const t = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "Country",
              o,
            ]) !== 1
          )
            break;
          let i = void 0;
          if (
            (([r, i] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["Country", o],
            )),
            !r)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i = ExploreReward_1.ExploreReward.getRootAsExploreReward(
            new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
          );
          t.push(i);
        }
        return (
          e &&
            ((n = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(n, t, t.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          t
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=ExploreRewardByCountry.js.map

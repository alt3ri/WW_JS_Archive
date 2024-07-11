"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBossRushActivityByActivityIdAndInstanceId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const BossRushActivity_1 = require("../Config/BossRushActivity");
const DB = "db_activity.db";
const FILE = "b.bossrush活动.xlsx";
const TABLE = "BossRushActivity";
const COMMAND =
  "select BinData from `BossRushActivity` where ActivityId=? And InstId=?";
const KEY_PREFIX = "BossRushActivityByActivityIdAndInstanceId";
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
  "configBossRushActivityByActivityIdAndInstanceId.GetConfigList(";
exports.configBossRushActivityByActivityIdAndInstanceId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (i, o, n = !0) => {
    let t;
    if (
      (t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var e = KEY_PREFIX + `#${i}#${o})`;
        const d = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (d) return d;
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair))
      ) {
        const d = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !1,
              ...logPair,
              ["ActivityId", i],
              ["InstId", o],
            ) !== 1
          )
            break;
          let s = void 0;
          if (
            (([t, s] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["ActivityId", i],
              ["InstId", o],
            )),
            !t)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          s = BossRushActivity_1.BossRushActivity.getRootAsBossRushActivity(
            new byte_buffer_1.ByteBuffer(new Uint8Array(s.buffer)),
          );
          d.push(s);
        }
        return (
          n &&
            ((e = KEY_PREFIX + `#${i}#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, d, d.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          d
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=BossRushActivityByActivityIdAndInstanceId.js.map

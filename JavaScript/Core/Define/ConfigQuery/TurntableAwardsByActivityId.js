"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTurntableAwardsByActivityId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const TurntableAwards_1 = require("../Config/TurntableAwards");
const DB = "db_activity.db";
const FILE = "z.转盘活动.xlsx";
const TABLE = "TurntableAwards";
const COMMAND = "select BinData from `TurntableAwards` where ActivityId = ?";
const KEY_PREFIX = "TurntableAwardsByActivityId";
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
  "configTurntableAwardsByActivityId.GetConfigList(";
exports.configTurntableAwardsByActivityId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o, i = !0) => {
    let n;
    if (
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (i) {
        var e = KEY_PREFIX + `#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r) return r;
      }
      if (
        (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const r = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "ActivityId",
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
              ["ActivityId", o],
            )),
            !n)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t = TurntableAwards_1.TurntableAwards.getRootAsTurntableAwards(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          r.push(t);
        }
        return (
          i &&
            ((e = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, r, r.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          r
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=TurntableAwardsByActivityId.js.map

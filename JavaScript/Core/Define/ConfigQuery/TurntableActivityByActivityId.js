"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTurntableActivityByActivityId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const TurntableActivity_1 = require("../Config/TurntableActivity");
const DB = "db_activity.db";
const FILE = "z.转盘活动.xlsx";
const TABLE = "TurntableActivity";
const COMMAND = "select BinData from `TurntableActivity` where ActivityId = ?";
const KEY_PREFIX = "TurntableActivityByActivityId";
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
  "configTurntableActivityByActivityId.GetConfigList(";
exports.configTurntableActivityByActivityId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (i, t = !0) => {
    let o;
    if (
      (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (t) {
        var n = KEY_PREFIX + `#${i})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (r) return r;
      }
      if (
        (o = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair))
      ) {
        const r = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "ActivityId",
              i,
            ]) !== 1
          )
            break;
          let e = void 0;
          if (
            (([o, e] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["ActivityId", i],
            )),
            !o)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e = TurntableActivity_1.TurntableActivity.getRootAsTurntableActivity(
            new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
          );
          r.push(e);
        }
        return (
          t &&
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
// # sourceMappingURL=TurntableActivityByActivityId.js.map

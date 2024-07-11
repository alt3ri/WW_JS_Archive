"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configCalabashDevelopRewardAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const CalabashDevelopReward_1 = require("../Config/CalabashDevelopReward");
const DB = "db_calabash.db";
const FILE = "h.葫芦.xlsx";
const TABLE = "CalabashDevelopReward";
const COMMAND = "select BinData from `CalabashDevelopReward`";
const KEY_PREFIX = "CalabashDevelopRewardAll";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
exports.configCalabashDevelopRewardAll = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o = !0) => {
    let e;
    if (
      (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var a = KEY_PREFIX + ")";
        const i = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (i) return i;
      }
      const i = new Array();
      for (;;) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair) !== 1)
          break;
        let n = void 0;
        if (
          (([e, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !e)
        )
          return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n =
          CalabashDevelopReward_1.CalabashDevelopReward.getRootAsCalabashDevelopReward(
            new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
          );
        i.push(n);
      }
      return (
        o &&
          ((a = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(a, i, i.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        i
      );
    }
  },
};
// # sourceMappingURL=CalabashDevelopRewardAll.js.map

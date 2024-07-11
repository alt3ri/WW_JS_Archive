"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configFriendFilterAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FriendFilter_1 = require("../Config/FriendFilter");
const DB = "db_friend.db";
const FILE = "h.好友.xlsx";
const TABLE = "FriendFilter";
const COMMAND = "select BinData from `FriendFilter`";
const KEY_PREFIX = "FriendFilterAll";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
exports.configFriendFilterAll = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (e = !0) => {
    let i;
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var o = KEY_PREFIX + ")";
        const r = ConfigCommon_1.ConfigCommon.GetConfig(o);
        if (r) return r;
      }
      const r = new Array();
      for (;;) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair) !== 1)
          break;
        let n = void 0;
        if (
          (([i, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !i)
        )
          return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n = FriendFilter_1.FriendFilter.getRootAsFriendFilter(
          new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
        );
        r.push(n);
      }
      return (
        e &&
          ((o = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(o, r, r.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        r
      );
    }
  },
};
// # sourceMappingURL=FriendFilterAll.js.map

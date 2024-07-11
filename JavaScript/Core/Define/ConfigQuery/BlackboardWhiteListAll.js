"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBlackboardWhiteListAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const BlackboardWhiteList_1 = require("../Config/BlackboardWhiteList");
const DB = "db_ai.db";
const FILE = "a.AI黑板同步白名单.xlsx";
const TABLE = "BlackboardWhiteList";
const COMMAND = "select BinData from `BlackboardWhiteList`";
const KEY_PREFIX = "BlackboardWhiteListAll";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
exports.configBlackboardWhiteListAll = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o = !0) => {
    let i;
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var e = KEY_PREFIX + ")";
        const t = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (t) return t;
      }
      const t = new Array();
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
        n =
          BlackboardWhiteList_1.BlackboardWhiteList.getRootAsBlackboardWhiteList(
            new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
          );
        t.push(n);
      }
      return (
        o &&
          ((e = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(e, t, t.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        t
      );
    }
  },
};
// # sourceMappingURL=BlackboardWhiteListAll.js.map

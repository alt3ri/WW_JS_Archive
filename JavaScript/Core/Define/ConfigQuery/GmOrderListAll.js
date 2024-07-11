"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configGmOrderListAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const GmOrderList_1 = require("../Config/GmOrderList");
const DB = "db_gm.db";
const FILE = "g.GM.xlsx";
const TABLE = "GmOrderList";
const COMMAND = "select BinData from `GmOrderList`";
const KEY_PREFIX = "GmOrderListAll";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
exports.configGmOrderListAll = {
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
        var i = KEY_PREFIX + ")";
        const n = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (n) return n;
      }
      const n = new Array();
      for (;;) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair) !== 1)
          break;
        let r = void 0;
        if (
          (([e, r] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !e)
        )
          return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        r = GmOrderList_1.GmOrderList.getRootAsGmOrderList(
          new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
        );
        n.push(r);
      }
      return (
        o &&
          ((i = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(i, n, n.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        n
      );
    }
  },
};
// # sourceMappingURL=GmOrderListAll.js.map

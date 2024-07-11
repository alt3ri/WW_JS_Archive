"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configAdviceConjunctionAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AdviceConjunction_1 = require("../Config/AdviceConjunction");
const DB = "db_advice.db";
const FILE = "s.溯言.xlsx";
const TABLE = "AdviceConjunction";
const COMMAND = "select BinData from `AdviceConjunction`";
const KEY_PREFIX = "AdviceConjunctionAll";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
exports.configAdviceConjunctionAll = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o = !0) => {
    let n;
    if (
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var i = KEY_PREFIX + ")";
        const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (t) return t;
      }
      const t = new Array();
      for (;;) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair) !== 1)
          break;
        let e = void 0;
        if (
          (([n, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !n)
        )
          return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        e = AdviceConjunction_1.AdviceConjunction.getRootAsAdviceConjunction(
          new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
        );
        t.push(e);
      }
      return (
        o &&
          ((i = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(i, t, t.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        t
      );
    }
  },
};
// # sourceMappingURL=AdviceConjunctionAll.js.map

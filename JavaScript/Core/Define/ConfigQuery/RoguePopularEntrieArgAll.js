"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRoguePopularEntrieArgAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RoguePopularEntrieArg_1 = require("../Config/RoguePopularEntrieArg");
const DB = "db_rogue.db";
const FILE = "r.肉鸽.xlsx";
const TABLE = "RoguePopularEntrieArg";
const COMMAND = "select BinData from `RoguePopularEntrieArg`";
const KEY_PREFIX = "RoguePopularEntrieArgAll";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
exports.configRoguePopularEntrieArgAll = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o = !0) => {
    let r;
    if (
      (r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var e = KEY_PREFIX + ")";
        const i = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (i) return i;
      }
      const i = new Array();
      for (;;) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair) !== 1)
          break;
        let n = void 0;
        if (
          (([r, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !r)
        )
          return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n =
          RoguePopularEntrieArg_1.RoguePopularEntrieArg.getRootAsRoguePopularEntrieArg(
            new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
          );
        i.push(n);
      }
      return (
        o &&
          ((e = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(e, i, i.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        i
      );
    }
  },
};
// # sourceMappingURL=RoguePopularEntrieArgAll.js.map

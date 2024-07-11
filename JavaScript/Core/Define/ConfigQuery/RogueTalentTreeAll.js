"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRogueTalentTreeAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RogueTalentTree_1 = require("../Config/RogueTalentTree");
const DB = "db_rogue.db";
const FILE = "r.肉鸽.xlsx";
const TABLE = "RogueTalentTree";
const COMMAND = "select BinData from `RogueTalentTree`";
const KEY_PREFIX = "RogueTalentTreeAll";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
exports.configRogueTalentTreeAll = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (e = !0) => {
    let o;
    if (
      (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var n = KEY_PREFIX + ")";
        const i = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (i) return i;
      }
      const i = new Array();
      for (;;) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair) !== 1)
          break;
        let r = void 0;
        if (
          (([o, r] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !o)
        )
          return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        r = RogueTalentTree_1.RogueTalentTree.getRootAsRogueTalentTree(
          new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
        );
        i.push(r);
      }
      return (
        e &&
          ((n = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(n, i, i.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        i
      );
    }
  },
};
// # sourceMappingURL=RogueTalentTreeAll.js.map

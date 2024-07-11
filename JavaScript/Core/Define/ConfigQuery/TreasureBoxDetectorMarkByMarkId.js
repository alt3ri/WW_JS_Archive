"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTreasureBoxDetectorMarkByMarkId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const TreasureBoxDetectorMark_1 = require("../Config/TreasureBoxDetectorMark");
const DB = "db_map_mark.db";
const FILE = "d.地图标记.xlsx";
const TABLE = "TreasureBoxDetectorMark";
const COMMAND = "select BinData from `TreasureBoxDetectorMark` where MarkId=?";
const KEY_PREFIX = "TreasureBoxDetectorMarkByMarkId";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configTreasureBoxDetectorMarkByMarkId.GetConfig(";
exports.configTreasureBoxDetectorMarkByMarkId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, e = !0) => {
    if (
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var r = KEY_PREFIX + `#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (a) return a;
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "MarkId",
            o,
          ]) > 0)
      ) {
        var n;
        var r = void 0;
        if (
          (([n, r] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["MarkId", o],
          )),
          n)
        ) {
          const a =
            TreasureBoxDetectorMark_1.TreasureBoxDetectorMark.getRootAsTreasureBoxDetectorMark(
              new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
            );
          return (
            e &&
              ((n = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=TreasureBoxDetectorMarkByMarkId.js.map

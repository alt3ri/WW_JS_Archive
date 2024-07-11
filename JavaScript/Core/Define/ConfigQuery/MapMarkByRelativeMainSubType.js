"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configMapMarkByRelativeMainSubType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MapMark_1 = require("../Config/MapMark");
const DB = "db_map_mark.db";
const FILE = "d.地图标记.xlsx";
const TABLE = "MapMark";
const COMMAND =
  "select BinData from `MapMark` where RelativeType=? and RelativeSubType=?";
const KEY_PREFIX = "MapMarkByRelativeMainSubType";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configMapMarkByRelativeMainSubType.GetConfig(";
exports.configMapMarkByRelativeMainSubType = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (e, o, i = !0) => {
    if (
      (a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (i) {
        var n = KEY_PREFIX + `#${e}#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (r) return r;
      }
      if (
        (a =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(
            handleId,
            !0,
            ...logPair,
            ["RelativeType", e],
            ["RelativeSubType", o],
          ) > 0)
      ) {
        var a;
        var n = void 0;
        if (
          (([a, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["RelativeType", e],
            ["RelativeSubType", o],
          )),
          a)
        ) {
          const r = MapMark_1.MapMark.getRootAsMapMark(
            new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
          );
          return (
            i &&
              ((a = KEY_PREFIX + `#${e}#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(a, r)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            r
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=MapMarkByRelativeMainSubType.js.map

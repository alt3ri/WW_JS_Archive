"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configFilterSortGroupById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FilterSortGroup_1 = require("../Config/FilterSortGroup");
const DB = "db_filter_sort.db";
const FILE = "s.筛选排序总表.xlsx";
const TABLE = "FilterSortGroup";
const COMMAND = "select BinData from `FilterSortGroup` where Id = ?";
const KEY_PREFIX = "FilterSortGroupById";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configFilterSortGroupById.GetConfig(";
exports.configFilterSortGroupById = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, r = !0) => {
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (r) {
        var e = KEY_PREFIX + `#${o})`;
        const n = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (n) return n;
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "Id",
            o,
          ]) > 0)
      ) {
        var i;
        var e = void 0;
        if (
          (([i, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          i)
        ) {
          const n = FilterSortGroup_1.FilterSortGroup.getRootAsFilterSortGroup(
            new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
          );
          return (
            r &&
              ((i = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, n)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=FilterSortGroupById.js.map

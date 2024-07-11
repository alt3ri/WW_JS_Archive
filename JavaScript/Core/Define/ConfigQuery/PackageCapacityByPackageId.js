"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPackageCapacityByPackageId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PackageCapacity_1 = require("../Config/PackageCapacity");
const DB = "db_bag.db";
const FILE = "b.背包.xlsx";
const TABLE = "PackageCapacity";
const COMMAND = "select BinData from `PackageCapacity` where PackageId=?";
const KEY_PREFIX = "PackageCapacityByPackageId";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configPackageCapacityByPackageId.GetConfig(";
exports.configPackageCapacityByPackageId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (a, o = !0) => {
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var e = KEY_PREFIX + `#${a})`;
        const n = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (n) return n;
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, a, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "PackageId",
            a,
          ]) > 0)
      ) {
        var i;
        var e = void 0;
        if (
          (([i, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["PackageId", a],
          )),
          i)
        ) {
          const n = PackageCapacity_1.PackageCapacity.getRootAsPackageCapacity(
            new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
          );
          return (
            o &&
              ((i = KEY_PREFIX + `#${a})`),
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
// # sourceMappingURL=PackageCapacityByPackageId.js.map

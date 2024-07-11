"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPackageCapacityAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PackageCapacity_1 = require("../Config/PackageCapacity");
const DB = "db_bag.db";
const FILE = "b.背包.xlsx";
const TABLE = "PackageCapacity";
const COMMAND = "select BinData from `PackageCapacity`";
const KEY_PREFIX = "PackageCapacityAll";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
exports.configPackageCapacityAll = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o = !0) => {
    let a;
    if (
      (a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var e = KEY_PREFIX + ")";
        const n = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (n) return n;
      }
      const n = new Array();
      for (;;) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair) !== 1)
          break;
        let i = void 0;
        if (
          (([a, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !a)
        )
          return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i = PackageCapacity_1.PackageCapacity.getRootAsPackageCapacity(
          new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
        );
        n.push(i);
      }
      return (
        o &&
          ((e = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(e, n, n.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        n
      );
    }
  },
};
// # sourceMappingURL=PackageCapacityAll.js.map

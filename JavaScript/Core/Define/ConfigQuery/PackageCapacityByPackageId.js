"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPackageCapacityByPackageId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PackageCapacity_1 = require("../Config/PackageCapacity"),
  DB = "db_bag.db",
  FILE = "b.背包.xlsx",
  TABLE = "PackageCapacity",
  COMMAND = "select BinData from `PackageCapacity` where PackageId=?",
  KEY_PREFIX = "PackageCapacityByPackageId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configPackageCapacityByPackageId.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configPackageCapacityByPackageId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configPackageCapacityByPackageId.GetConfig(";
exports.configPackageCapacityByPackageId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (a, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${a})`),
      i =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (o) {
        var t = KEY_PREFIX + `#${a})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (e)
          return (
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, a, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "PackageId",
              a,
            ]))
      ) {
        t = void 0;
        if (
          (([i, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["PackageId", a],
          )),
          i)
        ) {
          const e = PackageCapacity_1.PackageCapacity.getRootAsPackageCapacity(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          return (
            o &&
              ((i = KEY_PREFIX + `#${a})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, e)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=PackageCapacityByPackageId.js.map

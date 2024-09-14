"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configEntityOwnerDataByGuid = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  EntityOwnerData_1 = require("../Config/EntityOwnerData"),
  DB = "db_entityownerdata.db",
  FILE = "UniverseEditor/EntityOwnerConfig/EntityOwner.csv",
  TABLE = "EntityOwnerData",
  COMMAND = "select BinData from `EntityOwnerData` where Guid=?",
  KEY_PREFIX = "EntityOwnerDataByGuid",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configEntityOwnerDataByGuid.Init"),
  getConfigStat = Stats_1.Stat.Create("configEntityOwnerDataByGuid.GetConfig"),
  CONFIG_STAT_PREFIX = "configEntityOwnerDataByGuid.GetConfig(";
exports.configEntityOwnerDataByGuid = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (n, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${n})`),
      o =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (o) {
      if (t) {
        var e = KEY_PREFIX + `#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a)
          return (
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (o =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Guid",
              n,
            ]))
      ) {
        e = void 0;
        if (
          (([o, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Guid", n],
          )),
          o)
        ) {
          const a = EntityOwnerData_1.EntityOwnerData.getRootAsEntityOwnerData(
            new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
          );
          return (
            t &&
              ((o = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(o, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=EntityOwnerDataByGuid.js.map

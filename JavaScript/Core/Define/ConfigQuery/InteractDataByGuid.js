"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configInteractDataByGuid = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  InteractData_1 = require("../Config/InteractData"),
  DB = "db_interactdata.db",
  FILE = "UniverseEditor/InteractOption/InteractOption.csv",
  TABLE = "InteractData",
  COMMAND = "select BinData from `InteractData` where Guid=?",
  KEY_PREFIX = "InteractDataByGuid",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configInteractDataByGuid.Init"),
  getConfigStat = Stats_1.Stat.Create("configInteractDataByGuid.GetConfig"),
  CONFIG_STAT_PREFIX = "configInteractDataByGuid.GetConfig(";
exports.configInteractDataByGuid = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (t, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var o = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${t})`),
      i =
        (o.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (n) {
        var a = KEY_PREFIX + `#${t})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (e)
          return (
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, t, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Guid",
              t,
            ]))
      ) {
        a = void 0;
        if (
          (([i, a] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Guid", t],
          )),
          i)
        ) {
          const e = InteractData_1.InteractData.getRootAsInteractData(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          return (
            n &&
              ((i = KEY_PREFIX + `#${t})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, e)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=InteractDataByGuid.js.map

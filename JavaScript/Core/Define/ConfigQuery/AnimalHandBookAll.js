"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configAnimalHandBookAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  AnimalHandBook_1 = require("../Config/AnimalHandBook"),
  DB = "db_handbook.db",
  FILE = "t.图鉴系统.xlsx",
  TABLE = "AnimalHandBook",
  COMMAND = "select BinData from `AnimalHandBook`",
  KEY_PREFIX = "AnimalHandBookAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configAnimalHandBookAll.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configAnimalHandBookAll.GetConfigList",
  );
exports.configAnimalHandBookAll = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o = !0) => {
    var n;
    if (
      (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start(),
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)))
    ) {
      if (o) {
        var i = KEY_PREFIX + ")";
        const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (a)
          return (
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      const a = new Array();
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
          break;
        var t = void 0;
        if (
          (([n, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !n)
        )
          return (
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            getConfigListStat.Stop(),
            void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
          );
        t = AnimalHandBook_1.AnimalHandBook.getRootAsAnimalHandBook(
          new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
        );
        a.push(t);
      }
      return (
        o &&
          ((i = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(i, a, a.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        getConfigListStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        a
      );
    }
    getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=AnimalHandBookAll.js.map

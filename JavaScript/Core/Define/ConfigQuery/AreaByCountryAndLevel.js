"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configAreaByCountryAndLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  Area_1 = require("../Config/Area"),
  DB = "db_area.db",
  FILE = "q.区域.xlsx",
  TABLE = "Area",
  COMMAND = "select BinData from `Area` where CountryId=? And Level=?",
  KEY_PREFIX = "AreaByCountryAndLevel",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configAreaByCountryAndLevel.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configAreaByCountryAndLevel.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configAreaByCountryAndLevel.GetConfigList(";
exports.configAreaByCountryAndLevel = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o, n, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o}#${n})`),
      i =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (e) {
        var C = KEY_PREFIX + `#${o}#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (a)
          return (
            t.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair))
      ) {
        const a = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !1,
              ...logPair,
              ["CountryId", o],
              ["Level", n],
            )
          )
            break;
          var r = void 0;
          if (
            (([i, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["CountryId", o],
              ["Level", n],
            )),
            !i)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              t.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          r = Area_1.Area.getRootAsArea(
            new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
          );
          a.push(r);
        }
        return (
          e &&
            ((C = KEY_PREFIX + `#${o}#${n})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(C, a, a.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          t.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          a
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=AreaByCountryAndLevel.js.map

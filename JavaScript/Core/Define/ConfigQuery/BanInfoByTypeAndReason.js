"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBanInfoByTypeAndReason = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  BanInfo_1 = require("../Config/BanInfo"),
  DB = "db_report.db",
  FILE = "f.封禁处罚.xlsx",
  TABLE = "BanInfo",
  COMMAND = "select BinData from `BanInfo` where BanType=? AND BanReason=?",
  KEY_PREFIX = "BanInfoByTypeAndReason",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configBanInfoByTypeAndReason.Init"),
  getConfigStat = Stats_1.Stat.Create("configBanInfoByTypeAndReason.GetConfig"),
  CONFIG_STAT_PREFIX = "configBanInfoByTypeAndReason.GetConfig(";
exports.configBanInfoByTypeAndReason = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (n, o, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${n}#${o})`),
      a =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (a) {
      if (e) {
        var t = KEY_PREFIX + `#${n}#${o})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (f)
          return (
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
      }
      if (
        (a =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["BanType", n],
              ["BanReason", o],
            ))
      ) {
        t = void 0;
        if (
          (([a, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["BanType", n],
            ["BanReason", o],
          )),
          a)
        ) {
          const f = BanInfo_1.BanInfo.getRootAsBanInfo(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          return (
            e &&
              ((a = KEY_PREFIX + `#${n}#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(a, f)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
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
//# sourceMappingURL=BanInfoByTypeAndReason.js.map

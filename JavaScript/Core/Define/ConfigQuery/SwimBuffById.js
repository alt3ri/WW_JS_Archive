"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configSwimBuffById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  SwimBuff_1 = require("../Config/SwimBuff"),
  DB = "db_swim.db",
  FILE = "y.游泳.xlsx",
  TABLE = "SwimBuff",
  COMMAND = "select BinData from `SwimBuff` where Id=?",
  KEY_PREFIX = "SwimBuffById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configSwimBuffById.Init"),
  getConfigStat = Stats_1.Stat.Create("configSwimBuffById.GetConfig"),
  CONFIG_STAT_PREFIX = "configSwimBuffById.GetConfig(";
exports.configSwimBuffById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      f =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (f) {
      if (i) {
        var t = KEY_PREFIX + `#${o})`;
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
        (f =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              o,
            ]))
      ) {
        t = void 0;
        if (
          (([f, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          f)
        ) {
          const e = SwimBuff_1.SwimBuff.getRootAsSwimBuff(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          return (
            i &&
              ((f = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(f, e)),
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
//# sourceMappingURL=SwimBuffById.js.map

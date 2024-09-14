"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configDamagePayloadById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  DamagePayload_1 = require("../Config/DamagePayload"),
  DB = "db_damagepayload.db",
  FILE = "j.结算参数.xlsx",
  TABLE = "DamagePayload",
  COMMAND = "select BinData from `DamagePayload` where Id=?",
  KEY_PREFIX = "DamagePayloadById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configDamagePayloadById.Init"),
  getConfigStat = Stats_1.Stat.Create("configDamagePayloadById.GetConfig"),
  CONFIG_STAT_PREFIX = "configDamagePayloadById.GetConfig(";
exports.configDamagePayloadById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, a = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      e =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (a) {
        var i = KEY_PREFIX + `#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (t)
          return (
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            t
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindBigInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              o,
            ]))
      ) {
        i = void 0;
        if (
          (([e, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          e)
        ) {
          const t = DamagePayload_1.DamagePayload.getRootAsDamagePayload(
            new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
          );
          return (
            a &&
              ((e = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, t)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            t
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
//# sourceMappingURL=DamagePayloadById.js.map

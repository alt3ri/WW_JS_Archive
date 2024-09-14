"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRogueCharacterBuffById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RogueCharacterBuff_1 = require("../Config/RogueCharacterBuff"),
  DB = "db_rogue.db",
  FILE = "r.肉鸽.xlsx",
  TABLE = "RogueCharacterBuff",
  COMMAND = "select BinData from `RogueCharacterBuff` where Id=?",
  KEY_PREFIX = "RogueCharacterBuffById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configRogueCharacterBuffById.Init"),
  getConfigStat = Stats_1.Stat.Create("configRogueCharacterBuffById.GetConfig"),
  CONFIG_STAT_PREFIX = "configRogueCharacterBuffById.GetConfig(";
exports.configRogueCharacterBuffById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      t =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (e) {
        var f = KEY_PREFIX + `#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (i)
          return (
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              o,
            ]))
      ) {
        f = void 0;
        if (
          (([t, f] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          t)
        ) {
          const i =
            RogueCharacterBuff_1.RogueCharacterBuff.getRootAsRogueCharacterBuff(
              new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)),
            );
          return (
            e &&
              ((t = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, i)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
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
//# sourceMappingURL=RogueCharacterBuffById.js.map

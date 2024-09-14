"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBattlePassUnlockPopByBattlePassTypeId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  BattlePassUnlockPop_1 = require("../Config/BattlePassUnlockPop"),
  DB = "db_battle_pass.db",
  FILE = "z.战令.xlsx",
  TABLE = "BattlePassUnlockPop",
  COMMAND = "select BinData from `BattlePassUnlockPop` where TpyeID=?",
  KEY_PREFIX = "BattlePassUnlockPopByBattlePassTypeId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configBattlePassUnlockPopByBattlePassTypeId.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configBattlePassUnlockPopByBattlePassTypeId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configBattlePassUnlockPopByBattlePassTypeId.GetConfig(";
exports.configBattlePassUnlockPopByBattlePassTypeId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      e =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (t) {
        var a = KEY_PREFIX + `#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (i)
          return (
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "TpyeID",
              o,
            ]))
      ) {
        a = void 0;
        if (
          (([e, a] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["TpyeID", o],
          )),
          e)
        ) {
          const i =
            BattlePassUnlockPop_1.BattlePassUnlockPop.getRootAsBattlePassUnlockPop(
              new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
            );
          return (
            t &&
              ((e = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, i)),
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
//# sourceMappingURL=BattlePassUnlockPopByBattlePassTypeId.js.map

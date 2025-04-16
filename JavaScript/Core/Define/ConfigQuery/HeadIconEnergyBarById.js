"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configHeadIconEnergyBarById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  HeadIconEnergyBar_1 = require("../Config/HeadIconEnergyBar"),
  DB = "db_battleheadicon.db",
  FILE = "j.角色战斗界面头像.xlsx",
  TABLE = "HeadIconEnergyBar",
  COMMAND = "select BinData from `HeadIconEnergyBar` where Id=?",
  KEY_PREFIX = "HeadIconEnergyBarById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configHeadIconEnergyBarById.Init",
  ),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configHeadIconEnergyBarById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configHeadIconEnergyBarById.GetConfig(";
exports.configHeadIconEnergyBarById = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfig: (n, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${n})`),
      t =
        (e?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (o) {
        var i = KEY_PREFIX + `#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (a)
          return (
            e?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              n,
            ]))
      ) {
        i = void 0;
        if (
          (([t, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", n],
          )),
          t)
        ) {
          const a =
            HeadIconEnergyBar_1.HeadIconEnergyBar.getRootAsHeadIconEnergyBar(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          return (
            o &&
              ((t = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop(),
      getConfigStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=HeadIconEnergyBarById.js.map

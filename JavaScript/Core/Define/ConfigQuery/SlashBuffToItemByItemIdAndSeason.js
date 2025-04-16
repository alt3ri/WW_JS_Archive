"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configSlashBuffToItemByItemIdAndSeason = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  SlashBuffToItem_1 = require("../Config/SlashBuffToItem"),
  DB = "db_shiptower.db",
  FILE = "g.割草爬塔常驻.xlsx",
  TABLE = "SlashBuffToItem",
  COMMAND = "select BinData from `SlashBuffToItem` where ItemId=? AND Season=?",
  KEY_PREFIX = "SlashBuffToItemByItemIdAndSeason",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configSlashBuffToItemByItemIdAndSeason.Init",
  ),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configSlashBuffToItemByItemIdAndSeason.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configSlashBuffToItemByItemIdAndSeason.GetConfig(";
exports.configSlashBuffToItemByItemIdAndSeason = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfig: (o, n, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${o}#${n})`),
      i =
        (e?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (t) {
        var f = KEY_PREFIX + `#${o}#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (a)
          return (
            e?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["ItemId", o],
              ["Season", n],
            ))
      ) {
        f = void 0;
        if (
          (([i, f] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["ItemId", o],
            ["Season", n],
          )),
          i)
        ) {
          const a = SlashBuffToItem_1.SlashBuffToItem.getRootAsSlashBuffToItem(
            new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)),
          );
          return (
            t &&
              ((i = KEY_PREFIX + `#${o}#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, a)),
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
//# sourceMappingURL=SlashBuffToItemByItemIdAndSeason.js.map

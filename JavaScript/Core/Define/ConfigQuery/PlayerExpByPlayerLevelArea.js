"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPlayerExpByPlayerLevelArea = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PlayerExp_1 = require("../Config/PlayerExp"),
  DB = "db_player_exp.db",
  FILE = "j.经验.xlsx",
  TABLE = "PlayerExp",
  COMMAND =
    "select BinData from `PlayerExp` where PlayerLevel >= ? AND PlayerLevel < ?",
  KEY_PREFIX = "PlayerExpByPlayerLevelArea",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configPlayerExpByPlayerLevelArea.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configPlayerExpByPlayerLevelArea.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configPlayerExpByPlayerLevelArea.GetConfigList(";
exports.configPlayerExpByPlayerLevelArea = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (e, o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${e}#${o})`),
      t =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (n) {
        var a = KEY_PREFIX + `#${e}#${o})`;
        const l = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (l)
          return (
            i.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            l
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair))
      ) {
        const l = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !1,
              ...logPair,
              ["PlayerLevel", e],
              ["PlayerLevel", o],
            )
          )
            break;
          var r = void 0;
          if (
            (([t, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["PlayerLevel", e],
              ["PlayerLevel", o],
            )),
            !t)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              i.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          r = PlayerExp_1.PlayerExp.getRootAsPlayerExp(
            new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
          );
          l.push(r);
        }
        return (
          n &&
            ((a = KEY_PREFIX + `#${e}#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(a, l, l.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          i.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          l
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=PlayerExpByPlayerLevelArea.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBlackCoastThemeStageReById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  BlackCoastThemeStageRe_1 = require("../Config/BlackCoastThemeStageRe"),
  DB = "db_activity.db",
  FILE = "h.黑海岸主题活动.xlsx",
  TABLE = "BlackCoastThemeStageRe",
  COMMAND = "select BinData from `BlackCoastThemeStageRe` where Id=?",
  KEY_PREFIX = "BlackCoastThemeStageReById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configBlackCoastThemeStageReById.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configBlackCoastThemeStageReById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configBlackCoastThemeStageReById.GetConfig(";
exports.configBlackCoastThemeStageReById = {
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
    var t = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      n =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (e) {
        var a = KEY_PREFIX + `#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (i)
          return (
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              o,
            ]))
      ) {
        a = void 0;
        if (
          (([n, a] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          n)
        ) {
          const i =
            BlackCoastThemeStageRe_1.BlackCoastThemeStageRe.getRootAsBlackCoastThemeStageRe(
              new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
            );
          return (
            e &&
              ((n = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, i)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=BlackCoastThemeStageReById.js.map

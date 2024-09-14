"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBlackCoastThemeStageReByActivityId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  BlackCoastThemeStageRe_1 = require("../Config/BlackCoastThemeStageRe"),
  DB = "db_activity.db",
  FILE = "h.黑海岸主题活动.xlsx",
  TABLE = "BlackCoastThemeStageRe",
  COMMAND = "select BinData from `BlackCoastThemeStageRe` where ActivityId=?",
  KEY_PREFIX = "BlackCoastThemeStageReByActivityId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configBlackCoastThemeStageReByActivityId.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configBlackCoastThemeStageReByActivityId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configBlackCoastThemeStageReByActivityId.GetConfigList(";
exports.configBlackCoastThemeStageReByActivityId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (t, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${t})`),
      i =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (o) {
        var n = KEY_PREFIX + `#${t})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (C)
          return (
            e.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair))
      ) {
        const C = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "ActivityId",
              t,
            ])
          )
            break;
          var a = void 0;
          if (
            (([i, a] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["ActivityId", t],
            )),
            !i)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              e.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          a =
            BlackCoastThemeStageRe_1.BlackCoastThemeStageRe.getRootAsBlackCoastThemeStageRe(
              new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
            );
          C.push(a);
        }
        return (
          o &&
            ((n = KEY_PREFIX + `#${t})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(n, C, C.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          e.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          C
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=BlackCoastThemeStageReByActivityId.js.map

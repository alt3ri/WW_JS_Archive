"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBlackCoastThemeRewardReByActivityId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  BlackCoastThemeRewardRe_1 = require("../Config/BlackCoastThemeRewardRe"),
  DB = "db_activity.db",
  FILE = "h.黑海岸主题活动.xlsx",
  TABLE = "BlackCoastThemeRewardRe",
  COMMAND = "select BinData from `BlackCoastThemeRewardRe` where ActivityId=?",
  KEY_PREFIX = "BlackCoastThemeRewardReByActivityId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configBlackCoastThemeRewardReByActivityId.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configBlackCoastThemeRewardReByActivityId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configBlackCoastThemeRewardReByActivityId.GetConfigList(";
exports.configBlackCoastThemeRewardReByActivityId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      i =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (t) {
        var n = KEY_PREFIX + `#${o})`;
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
        (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const C = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "ActivityId",
              o,
            ])
          )
            break;
          var a = void 0;
          if (
            (([i, a] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["ActivityId", o],
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
            BlackCoastThemeRewardRe_1.BlackCoastThemeRewardRe.getRootAsBlackCoastThemeRewardRe(
              new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
            );
          C.push(a);
        }
        return (
          t &&
            ((n = KEY_PREFIX + `#${o})`),
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
//# sourceMappingURL=BlackCoastThemeRewardReByActivityId.js.map

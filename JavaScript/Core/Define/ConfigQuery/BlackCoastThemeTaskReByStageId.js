"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBlackCoastThemeTaskReByStageId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  BlackCoastThemeTaskRe_1 = require("../Config/BlackCoastThemeTaskRe"),
  DB = "db_activity.db",
  FILE = "h.黑海岸主题活动.xlsx",
  TABLE = "BlackCoastThemeTaskRe",
  COMMAND = "select BinData from `BlackCoastThemeTaskRe` where StageId=?",
  KEY_PREFIX = "BlackCoastThemeTaskReByStageId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configBlackCoastThemeTaskReByStageId.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configBlackCoastThemeTaskReByStageId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configBlackCoastThemeTaskReByStageId.GetConfigList(";
exports.configBlackCoastThemeTaskReByStageId = {
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
      a =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (a) {
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
        (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const C = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "StageId",
              o,
            ])
          )
            break;
          var i = void 0;
          if (
            (([a, i] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["StageId", o],
            )),
            !a)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              e.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          i =
            BlackCoastThemeTaskRe_1.BlackCoastThemeTaskRe.getRootAsBlackCoastThemeTaskRe(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          C.push(i);
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
//# sourceMappingURL=BlackCoastThemeTaskReByStageId.js.map

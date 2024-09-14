"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configLoadingTipsTextByLevelAreaId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  LoadingTipsText_1 = require("../Config/LoadingTipsText"),
  DB = "db_loadingtips.db",
  FILE = "z.载入提示.xlsx",
  TABLE = "LoadingTipsText",
  COMMAND = "select BinData from `LoadingTipsText` where LevelAreaId=?",
  KEY_PREFIX = "LoadingTipsTextByLevelAreaId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configLoadingTipsTextByLevelAreaId.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configLoadingTipsTextByLevelAreaId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configLoadingTipsTextByLevelAreaId.GetConfigList(";
exports.configLoadingTipsTextByLevelAreaId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      e =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (i) {
        var t = KEY_PREFIX + `#${o})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (g)
          return (
            n.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
      }
      if (
        (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const g = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "LevelAreaId",
              o,
            ])
          )
            break;
          var a = void 0;
          if (
            (([e, a] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["LevelAreaId", o],
            )),
            !e)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              n.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          a = LoadingTipsText_1.LoadingTipsText.getRootAsLoadingTipsText(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          g.push(a);
        }
        return (
          i &&
            ((t = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(t, g, g.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          n.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          g
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=LoadingTipsTextByLevelAreaId.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configFavorWordByRoleIdAndType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  FavorWord_1 = require("../Config/FavorWord"),
  DB = "db_favor.db",
  FILE = "h.好感度.xlsx",
  TABLE = "FavorWord",
  COMMAND =
    "select BinData from `FavorWord` where RoleId=? and Type=? Order By Sort",
  KEY_PREFIX = "FavorWordByRoleIdAndType",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configFavorWordByRoleIdAndType.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configFavorWordByRoleIdAndType.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configFavorWordByRoleIdAndType.GetConfigList(";
exports.configFavorWordByRoleIdAndType = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o, n, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o}#${n})`),
      e =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (i) {
        var r = KEY_PREFIX + `#${o}#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (C)
          return (
            t.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair))
      ) {
        const C = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !1,
              ...logPair,
              ["RoleId", o],
              ["Type", n],
            )
          )
            break;
          var a = void 0;
          if (
            (([e, a] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["RoleId", o],
              ["Type", n],
            )),
            !e)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              t.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          a = FavorWord_1.FavorWord.getRootAsFavorWord(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          C.push(a);
        }
        return (
          i &&
            ((r = KEY_PREFIX + `#${o}#${n})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(r, C, C.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          t.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          C
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=FavorWordByRoleIdAndType.js.map

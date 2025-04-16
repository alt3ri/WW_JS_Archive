"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBulletPreloadByActorBlueprint = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  BulletPreload_1 = require("../Config/BulletPreload"),
  DB = "db_bullet_preload.db",
  FILE = "Preload/BulletPreload.csv",
  TABLE = "BulletPreload",
  COMMAND = "select BinData from `BulletPreload` where ActorBlueprint=?",
  KEY_PREFIX = "BulletPreloadByActorBlueprint",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configBulletPreloadByActorBlueprint.Init",
  ),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph(
    "configBulletPreloadByActorBlueprint.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configBulletPreloadByActorBlueprint.GetConfigList(";
exports.configBulletPreloadByActorBlueprint = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfigList: (o, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      n =
        (e?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (t) {
        var i = KEY_PREFIX + `#${o})`;
        const l = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (l)
          return (
            e?.Stop(),
            getConfigListStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            l
          );
      }
      if (
        (n = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair))
      ) {
        const l = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "ActorBlueprint",
              o,
            ])
          )
            break;
          var r = void 0;
          if (
            (([n, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["ActorBlueprint", o],
            )),
            !n)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              e?.Stop(),
              getConfigListStat?.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          r = BulletPreload_1.BulletPreload.getRootAsBulletPreload(
            new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
          );
          l.push(r);
        }
        return (
          t &&
            ((i = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(i, l, l.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          e?.Stop(),
          getConfigListStat?.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          l
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop(),
      getConfigListStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=BulletPreloadByActorBlueprint.js.map

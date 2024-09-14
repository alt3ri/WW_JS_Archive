"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBulletPreloadByActorBlueprintAndBulletId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  BulletPreload_1 = require("../Config/BulletPreload"),
  DB = "db_bullet_preload.db",
  FILE = "Preload/BulletPreload.csv",
  TABLE = "BulletPreload",
  COMMAND =
    "select BinData from `BulletPreload` where ActorBlueprint=? AND BulletId=?",
  KEY_PREFIX = "BulletPreloadByActorBlueprintAndBulletId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configBulletPreloadByActorBlueprintAndBulletId.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configBulletPreloadByActorBlueprintAndBulletId.GetConfig",
  ),
  CONFIG_STAT_PREFIX =
    "configBulletPreloadByActorBlueprintAndBulletId.GetConfig(";
exports.configBulletPreloadByActorBlueprintAndBulletId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, t, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${t})`),
      l =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (l) {
      if (e) {
        var i = KEY_PREFIX + `#${o}#${t})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (r)
          return (
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
      }
      if (
        (l =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindBigInt(handleId, 2, t, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["ActorBlueprint", o],
              ["BulletId", t],
            ))
      ) {
        i = void 0;
        if (
          (([l, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["ActorBlueprint", o],
            ["BulletId", t],
          )),
          l)
        ) {
          const r = BulletPreload_1.BulletPreload.getRootAsBulletPreload(
            new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
          );
          return (
            e &&
              ((l = KEY_PREFIX + `#${o}#${t})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(l, r)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=BulletPreloadByActorBlueprintAndBulletId.js.map

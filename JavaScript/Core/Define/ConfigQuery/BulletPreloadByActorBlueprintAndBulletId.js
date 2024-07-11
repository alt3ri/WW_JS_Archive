"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBulletPreloadByActorBlueprintAndBulletId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const BulletPreload_1 = require("../Config/BulletPreload");
const DB = "db_bullet_preload.db";
const FILE = "Preload/BulletPreload.csv";
const TABLE = "BulletPreload";
const COMMAND =
  "select BinData from `BulletPreload` where ActorBlueprint=? AND BulletId=?";
const KEY_PREFIX = "BulletPreloadByActorBlueprintAndBulletId";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX =
  "configBulletPreloadByActorBlueprintAndBulletId.GetConfig(";
exports.configBulletPreloadByActorBlueprintAndBulletId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, e, l = !0) => {
    if (
      (t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (l) {
        var n = KEY_PREFIX + `#${o}#${e})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (r) return r;
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindBigInt(handleId, 2, e, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(
            handleId,
            !0,
            ...logPair,
            ["ActorBlueprint", o],
            ["BulletId", e],
          ) > 0)
      ) {
        var t;
        var n = void 0;
        if (
          (([t, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["ActorBlueprint", o],
            ["BulletId", e],
          )),
          t)
        ) {
          const r = BulletPreload_1.BulletPreload.getRootAsBulletPreload(
            new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
          );
          return (
            l &&
              ((t = KEY_PREFIX + `#${o}#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, r)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            r
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=BulletPreloadByActorBlueprintAndBulletId.js.map

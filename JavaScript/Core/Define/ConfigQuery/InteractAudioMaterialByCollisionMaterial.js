"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configInteractAudioMaterialByCollisionMaterial = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  InteractAudioMaterial_1 = require("../Config/InteractAudioMaterial"),
  DB = "db_interactaudiomaterial.db",
  FILE = "k.可视化编辑/c.Csv/y.音频/j.交互材质音频/*.csv*",
  TABLE = "InteractAudioMaterial",
  COMMAND =
    "select BinData from `InteractAudioMaterial` where CollisionMaterial=?",
  KEY_PREFIX = "InteractAudioMaterialByCollisionMaterial",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configInteractAudioMaterialByCollisionMaterial.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configInteractAudioMaterialByCollisionMaterial.GetConfig",
  ),
  CONFIG_STAT_PREFIX =
    "configInteractAudioMaterialByCollisionMaterial.GetConfig(";
exports.configInteractAudioMaterialByCollisionMaterial = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      n =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (i) {
        var a = KEY_PREFIX + `#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (e)
          return (
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "CollisionMaterial",
              o,
            ]))
      ) {
        a = void 0;
        if (
          (([n, a] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["CollisionMaterial", o],
          )),
          n)
        ) {
          const e =
            InteractAudioMaterial_1.InteractAudioMaterial.getRootAsInteractAudioMaterial(
              new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
            );
          return (
            i &&
              ((n = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, e)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
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
//# sourceMappingURL=InteractAudioMaterialByCollisionMaterial.js.map

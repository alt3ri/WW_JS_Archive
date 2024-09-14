"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configFoleySynthConfigByIdWithDefaultId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  FoleySynthConfig_1 = require("../Config/FoleySynthConfig"),
  DB = "db_entity_audio.db",
  FILE = "y.音频组件配置.xlsx",
  TABLE = "FoleySynthConfig",
  COMMAND =
    "select BinData from `FoleySynthConfig` where id = ? AND (SELECT count() from `FoleySynthConfig` WHERE id = ?) <= 0 OR id = ? AND (SELECT count(0) from `FoleySynthConfig` WHERE id = ?) >0;",
  KEY_PREFIX = "FoleySynthConfigByIdWithDefaultId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configFoleySynthConfigByIdWithDefaultId.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configFoleySynthConfigByIdWithDefaultId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configFoleySynthConfigByIdWithDefaultId.GetConfig(";
exports.configFoleySynthConfigByIdWithDefaultId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, n, i, t, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var C = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${n}#${i}#${t})`),
      f =
        (C.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (f) {
      if (e) {
        var g = KEY_PREFIX + `#${o}#${n}#${i}#${t})`;
        const d = ConfigCommon_1.ConfigCommon.GetConfig(g);
        if (d)
          return (
            C.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            d
          );
      }
      if (
        (f =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, i, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 4, t, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["Id", o],
              ["Id", n],
              ["Id", i],
              ["Id", t],
            ))
      ) {
        g = void 0;
        if (
          (([f, g] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
            ["Id", n],
            ["Id", i],
            ["Id", t],
          )),
          f)
        ) {
          const d =
            FoleySynthConfig_1.FoleySynthConfig.getRootAsFoleySynthConfig(
              new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)),
            );
          return (
            e &&
              ((f = KEY_PREFIX + `#${o}#${n}#${i}#${t})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(f, d)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            C.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            d
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    C.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=FoleySynthConfigByIdWithDefaultId.js.map

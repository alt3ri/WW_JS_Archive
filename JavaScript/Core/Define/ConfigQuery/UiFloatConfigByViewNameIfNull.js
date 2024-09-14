"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configUiFloatConfigByViewNameIfNull = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  UiFloatConfig_1 = require("../Config/UiFloatConfig"),
  DB = "db_ui.db",
  FILE = "u.UiFloat层级配置.csv",
  TABLE = "UiFloatConfig",
  COMMAND =
    'select BinData from `UiFloatConfig` where ViewName = ? AND (SELECT count(0) from `UiFloatConfig` WHERE ViewName = ?) > 0 OR ViewName = "DefaultView" AND (SELECT count(0) from `UiFloatConfig` WHERE ViewName = ?) <= 0',
  KEY_PREFIX = "UiFloatConfigByViewNameIfNull",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configUiFloatConfigByViewNameIfNull.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configUiFloatConfigByViewNameIfNull.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configUiFloatConfigByViewNameIfNull.GetConfig(";
exports.configUiFloatConfigByViewNameIfNull = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, i, n, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${i}#${n})`),
      a =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (a) {
      if (e) {
        var C = KEY_PREFIX + `#${o}#${i}#${n})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (f)
          return (
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
      }
      if (
        (a =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindString(handleId, 2, i, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindString(handleId, 3, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["ViewName", o],
              ["ViewName", i],
              ["ViewName", n],
            ))
      ) {
        C = void 0;
        if (
          (([a, C] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["ViewName", o],
            ["ViewName", i],
            ["ViewName", n],
          )),
          a)
        ) {
          const f = UiFloatConfig_1.UiFloatConfig.getRootAsUiFloatConfig(
            new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
          );
          return (
            e &&
              ((a = KEY_PREFIX + `#${o}#${i}#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(a, f)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
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
//# sourceMappingURL=UiFloatConfigByViewNameIfNull.js.map

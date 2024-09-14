"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configUiNormalConfigByViewNameIfNull = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  UiNormalConfig_1 = require("../Config/UiNormalConfig"),
  DB = "db_ui.db",
  FILE = "u.UiNormal层级队列配置.csv",
  TABLE = "UiNormalConfig",
  COMMAND =
    'select BinData from `UiNormalConfig` where ViewName = ? AND (SELECT count(0) from `UiNormalConfig` WHERE ViewName = ?) > 0 OR ViewName = "DefaultView" AND (SELECT count(0) from `UiNormalConfig` WHERE ViewName = ?) <= 0',
  KEY_PREFIX = "UiNormalConfigByViewNameIfNull",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configUiNormalConfigByViewNameIfNull.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configUiNormalConfigByViewNameIfNull.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configUiNormalConfigByViewNameIfNull.GetConfig(";
exports.configUiNormalConfigByViewNameIfNull = {
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
    var a = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${i}#${n})`),
      m =
        (a.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (m) {
      if (e) {
        var C = KEY_PREFIX + `#${o}#${i}#${n})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (f)
          return (
            a.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
      }
      if (
        (m =
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
          (([m, C] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["ViewName", o],
            ["ViewName", i],
            ["ViewName", n],
          )),
          m)
        ) {
          const f = UiNormalConfig_1.UiNormalConfig.getRootAsUiNormalConfig(
            new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
          );
          return (
            e &&
              ((m = KEY_PREFIX + `#${o}#${i}#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(m, f)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            a.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=UiNormalConfigByViewNameIfNull.js.map

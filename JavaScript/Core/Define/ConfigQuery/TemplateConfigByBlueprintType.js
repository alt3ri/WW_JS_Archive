"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTemplateConfigByBlueprintType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  TemplateConfig_1 = require("../Config/TemplateConfig"),
  DB = "db_template.db",
  FILE = "UniverseEditor/Entity/Template.csv",
  TABLE = "TemplateConfig",
  COMMAND = "select BinData from `TemplateConfig` where BlueprintType=?",
  KEY_PREFIX = "TemplateConfigByBlueprintType",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configTemplateConfigByBlueprintType.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configTemplateConfigByBlueprintType.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configTemplateConfigByBlueprintType.GetConfig(";
exports.configTemplateConfigByBlueprintType = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (e, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${e})`),
      t =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (o) {
        var i = KEY_PREFIX + `#${e})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (C)
          return (
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "BlueprintType",
              e,
            ]))
      ) {
        i = void 0;
        if (
          (([t, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["BlueprintType", e],
          )),
          t)
        ) {
          const C = TemplateConfig_1.TemplateConfig.getRootAsTemplateConfig(
            new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
          );
          return (
            o &&
              ((t = KEY_PREFIX + `#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, C)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
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
//# sourceMappingURL=TemplateConfigByBlueprintType.js.map

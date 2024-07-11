"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configLevelEntityConfigByBlueprintType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const LevelEntityConfig_1 = require("../Config/LevelEntityConfig");
const DB = "db_level_entity.db";
const FILE = "UniverseEditor/Entity/LevelEntity.csv";
const TABLE = "LevelEntityConfig";
const COMMAND = "select BinData from `LevelEntityConfig` where BlueprintType=?";
const KEY_PREFIX = "LevelEntityConfigByBlueprintType";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
const CONFIG_LIST_STAT_PREFIX =
  "configLevelEntityConfigByBlueprintType.GetConfigList(";
exports.configLevelEntityConfigByBlueprintType = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (e, n = !0) => {
    let i;
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var o = KEY_PREFIX + `#${e})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(o);
        if (r) return r;
      }
      if (
        (i = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair))
      ) {
        const r = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "BlueprintType",
              e,
            ]) !== 1
          )
            break;
          let t = void 0;
          if (
            (([i, t] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["BlueprintType", e],
            )),
            !i)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t = LevelEntityConfig_1.LevelEntityConfig.getRootAsLevelEntityConfig(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          r.push(t);
        }
        return (
          n &&
            ((o = KEY_PREFIX + `#${e})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(o, r, r.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          r
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=LevelEntityConfigByBlueprintType.js.map

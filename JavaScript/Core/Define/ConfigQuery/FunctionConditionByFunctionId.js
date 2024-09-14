"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configFunctionConditionByFunctionId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  FunctionCondition_1 = require("../Config/FunctionCondition"),
  DB = "db_function.db",
  FILE = "g.功能开启.xlsx",
  TABLE = "FunctionCondition",
  COMMAND = "select BinData from `FunctionCondition` where FunctionId=?",
  KEY_PREFIX = "FunctionConditionByFunctionId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configFunctionConditionByFunctionId.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configFunctionConditionByFunctionId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configFunctionConditionByFunctionId.GetConfig(";
exports.configFunctionConditionByFunctionId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (n, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${n})`),
      t =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (o) {
        var C = KEY_PREFIX + `#${n})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (e)
          return (
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "FunctionId",
              n,
            ]))
      ) {
        C = void 0;
        if (
          (([t, C] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["FunctionId", n],
          )),
          t)
        ) {
          const e =
            FunctionCondition_1.FunctionCondition.getRootAsFunctionCondition(
              new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
            );
          return (
            o &&
              ((t = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, e)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=FunctionConditionByFunctionId.js.map

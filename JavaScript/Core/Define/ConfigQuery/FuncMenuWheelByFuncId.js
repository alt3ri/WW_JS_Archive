"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configFuncMenuWheelByFuncId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  FuncMenuWheel_1 = require("../Config/FuncMenuWheel"),
  DB = "db_roulette.db",
  FILE = "l.轮盘.xlsx",
  TABLE = "FuncMenuWheel",
  COMMAND = "select BinData from `FuncMenuWheel` where FuncId=?",
  KEY_PREFIX = "FuncMenuWheelByFuncId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configFuncMenuWheelByFuncId.Init"),
  getConfigStat = Stats_1.Stat.Create("configFuncMenuWheelByFuncId.GetConfig"),
  CONFIG_STAT_PREFIX = "configFuncMenuWheelByFuncId.GetConfig(";
exports.configFuncMenuWheelByFuncId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (n, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var o = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${n})`),
      t =
        (o.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (e) {
        var i = KEY_PREFIX + `#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (C)
          return (
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "FuncId",
              n,
            ]))
      ) {
        i = void 0;
        if (
          (([t, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["FuncId", n],
          )),
          t)
        ) {
          const C = FuncMenuWheel_1.FuncMenuWheel.getRootAsFuncMenuWheel(
            new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
          );
          return (
            e &&
              ((t = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, C)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=FuncMenuWheelByFuncId.js.map

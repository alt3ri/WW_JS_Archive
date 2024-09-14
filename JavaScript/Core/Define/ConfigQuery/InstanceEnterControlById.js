"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configInstanceEnterControlById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  InstanceEnterControl_1 = require("../Config/InstanceEnterControl"),
  DB = "db_instance_dungeon.db",
  FILE = "f.副本.xlsx",
  TABLE = "InstanceEnterControl",
  COMMAND = "select BinData from `InstanceEnterControl` where Id=?",
  KEY_PREFIX = "InstanceEnterControlById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configInstanceEnterControlById.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configInstanceEnterControlById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configInstanceEnterControlById.GetConfig(";
exports.configInstanceEnterControlById = {
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
    var t = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${n})`),
      e =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (o) {
        var i = KEY_PREFIX + `#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (C)
          return (
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              n,
            ]))
      ) {
        i = void 0;
        if (
          (([e, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", n],
          )),
          e)
        ) {
          const C =
            InstanceEnterControl_1.InstanceEnterControl.getRootAsInstanceEnterControl(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          return (
            o &&
              ((e = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, C)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
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
//# sourceMappingURL=InstanceEnterControlById.js.map

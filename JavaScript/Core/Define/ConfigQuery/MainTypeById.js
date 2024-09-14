"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configMainTypeById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  MainType_1 = require("../Config/MainType"),
  DB = "db_menu.db",
  FILE = "s.设置系统.xlsx",
  TABLE = "MainType",
  COMMAND = "select BinData from `MainType` where Id=?",
  KEY_PREFIX = "MainTypeById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configMainTypeById.Init"),
  getConfigStat = Stats_1.Stat.Create("configMainTypeById.GetConfig"),
  CONFIG_STAT_PREFIX = "configMainTypeById.GetConfig(";
exports.configMainTypeById = {
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
      e =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (o) {
        var t = KEY_PREFIX + `#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C)
          return (
            i.Stop(),
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
        t = void 0;
        if (
          (([e, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", n],
          )),
          e)
        ) {
          const C = MainType_1.MainType.getRootAsMainType(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          return (
            o &&
              ((e = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, C)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
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
//# sourceMappingURL=MainTypeById.js.map

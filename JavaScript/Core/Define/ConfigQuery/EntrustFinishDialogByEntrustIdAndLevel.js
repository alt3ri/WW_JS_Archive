"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configEntrustFinishDialogByEntrustIdAndLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  EntrustFinishDialog_1 = require("../Config/EntrustFinishDialog"),
  DB = "db_moonchasing.db",
  FILE = "z.追月节.xlsx",
  TABLE = "EntrustFinishDialog",
  COMMAND =
    "select BinData from `EntrustFinishDialog` where EntrustId=? AND Level=?",
  KEY_PREFIX = "EntrustFinishDialogByEntrustIdAndLevel",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configEntrustFinishDialogByEntrustIdAndLevel.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configEntrustFinishDialogByEntrustIdAndLevel.GetConfig",
  ),
  CONFIG_STAT_PREFIX =
    "configEntrustFinishDialogByEntrustIdAndLevel.GetConfig(";
exports.configEntrustFinishDialogByEntrustIdAndLevel = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (n, o, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${n}#${o})`),
      e =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (t) {
        var g = KEY_PREFIX + `#${n}#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(g);
        if (r)
          return (
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["EntrustId", n],
              ["Level", o],
            ))
      ) {
        g = void 0;
        if (
          (([e, g] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["EntrustId", n],
            ["Level", o],
          )),
          e)
        ) {
          const r =
            EntrustFinishDialog_1.EntrustFinishDialog.getRootAsEntrustFinishDialog(
              new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)),
            );
          return (
            t &&
              ((e = KEY_PREFIX + `#${n}#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, r)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
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
//# sourceMappingURL=EntrustFinishDialogByEntrustIdAndLevel.js.map

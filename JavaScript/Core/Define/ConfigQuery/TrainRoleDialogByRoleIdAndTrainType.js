"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTrainRoleDialogByRoleIdAndTrainType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  TrainRoleDialog_1 = require("../Config/TrainRoleDialog"),
  DB = "db_moonchasing.db",
  FILE = "z.追月节.xlsx",
  TABLE = "TrainRoleDialog",
  COMMAND =
    "select BinData from `TrainRoleDialog` where RoleId=? AND TrainType=?",
  KEY_PREFIX = "TrainRoleDialogByRoleIdAndTrainType",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configTrainRoleDialogByRoleIdAndTrainType.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configTrainRoleDialogByRoleIdAndTrainType.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configTrainRoleDialogByRoleIdAndTrainType.GetConfig(";
exports.configTrainRoleDialogByRoleIdAndTrainType = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, n, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${n})`),
      a =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (a) {
      if (i) {
        var t = KEY_PREFIX + `#${o}#${n})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (g)
          return (
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
      }
      if (
        (a =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["RoleId", o],
              ["TrainType", n],
            ))
      ) {
        t = void 0;
        if (
          (([a, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["RoleId", o],
            ["TrainType", n],
          )),
          a)
        ) {
          const g = TrainRoleDialog_1.TrainRoleDialog.getRootAsTrainRoleDialog(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          return (
            i &&
              ((a = KEY_PREFIX + `#${o}#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(a, g)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=TrainRoleDialogByRoleIdAndTrainType.js.map

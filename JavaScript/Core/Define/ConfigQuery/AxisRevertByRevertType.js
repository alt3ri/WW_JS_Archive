"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configAxisRevertByRevertType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  AxisRevert_1 = require("../Config/AxisRevert"),
  DB = "db_menu.db",
  FILE = "s.设置系统.xlsx",
  TABLE = "AxisRevert",
  COMMAND = "select BinData from `AxisRevert` where RevertType=?",
  KEY_PREFIX = "AxisRevertByRevertType",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configAxisRevertByRevertType.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configAxisRevertByRevertType.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configAxisRevertByRevertType.GetConfigList(";
exports.configAxisRevertByRevertType = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (e, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${e})`),
      i =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (o) {
        var n = KEY_PREFIX + `#${e})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (C)
          return (
            t.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair))
      ) {
        const C = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "RevertType",
              e,
            ])
          )
            break;
          var r = void 0;
          if (
            (([i, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["RevertType", e],
            )),
            !i)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              t.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          r = AxisRevert_1.AxisRevert.getRootAsAxisRevert(
            new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
          );
          C.push(r);
        }
        return (
          o &&
            ((n = KEY_PREFIX + `#${e})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(n, C, C.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          t.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          C
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=AxisRevertByRevertType.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPreviewItemAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PreviewItem_1 = require("../Config/PreviewItem"),
  DB = "db_item.db",
  FILE = "d.道具.xlsx",
  TABLE = "PreviewItem",
  COMMAND = "select BinData from `PreviewItem`",
  KEY_PREFIX = "PreviewItemAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configPreviewItemAll.Init"),
  getConfigListStat = Stats_1.Stat.Create("configPreviewItemAll.GetConfigList");
exports.configPreviewItemAll = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o = !0) => {
    var t;
    if (
      (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start(),
      (t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)))
    ) {
      if (o) {
        var e = KEY_PREFIX + ")";
        const n = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (n)
          return (
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            n
          );
      }
      const n = new Array();
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
          break;
        var i = void 0;
        if (
          (([t, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !t)
        )
          return (
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            getConfigListStat.Stop(),
            void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
          );
        i = PreviewItem_1.PreviewItem.getRootAsPreviewItem(
          new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
        );
        n.push(i);
      }
      return (
        o &&
          ((e = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(e, n, n.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        getConfigListStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        n
      );
    }
    getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=PreviewItemAll.js.map

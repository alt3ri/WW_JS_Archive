"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBuffItemByPublicCdGroup = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  BuffItem_1 = require("../Config/BuffItem"),
  DB = "db_itemattributereward.db",
  FILE = "s.属性奖励.xlsx",
  TABLE = "BuffItem",
  COMMAND = "select BinData from `BuffItem` where PublicCdGroup=?",
  KEY_PREFIX = "BuffItemByPublicCdGroup",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configBuffItemByPublicCdGroup.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configBuffItemByPublicCdGroup.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configBuffItemByPublicCdGroup.GetConfigList(";
exports.configBuffItemByPublicCdGroup = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      n =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (t) {
        var e = KEY_PREFIX + `#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (C)
          return (
            i.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const C = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "PublicCdGroup",
              o,
            ])
          )
            break;
          var f = void 0;
          if (
            (([n, f] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["PublicCdGroup", o],
            )),
            !n)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              i.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          f = BuffItem_1.BuffItem.getRootAsBuffItem(
            new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)),
          );
          C.push(f);
        }
        return (
          t &&
            ((e = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, C, C.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          i.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          C
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=BuffItemByPublicCdGroup.js.map

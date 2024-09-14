"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configItemInfoByItemType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  ItemInfo_1 = require("../Config/ItemInfo"),
  DB = "db_item.db",
  FILE = "d.道具.xlsx",
  TABLE = "ItemInfo",
  COMMAND = "select BinData from `ItemInfo` where ItemType=?",
  KEY_PREFIX = "ItemInfoByItemType",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configItemInfoByItemType.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configItemInfoByItemType.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configItemInfoByItemType.GetConfigList(";
exports.configItemInfoByItemType = {
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
    var n = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      e =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (t) {
        var i = KEY_PREFIX + `#${o})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (m)
          return (
            n.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            m
          );
      }
      if (
        (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const m = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "ItemType",
              o,
            ])
          )
            break;
          var f = void 0;
          if (
            (([e, f] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["ItemType", o],
            )),
            !e)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              n.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          f = ItemInfo_1.ItemInfo.getRootAsItemInfo(
            new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)),
          );
          m.push(f);
        }
        return (
          t &&
            ((i = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(i, m, m.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          n.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          m
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=ItemInfoByItemType.js.map

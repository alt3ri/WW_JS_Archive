"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPrefabTextItemByItemId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PrefabTextItem_1 = require("../Config/PrefabTextItem"),
  DB = "db_ui_prefabtextitem.db",
  FILE = "u.UiTextCollect/u.预制体文本收集.csv",
  TABLE = "PrefabTextItem",
  COMMAND = "select BinData from `PrefabTextItem` where ItemId = ?",
  KEY_PREFIX = "PrefabTextItemByItemId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configPrefabTextItemByItemId.Init"),
  getConfigStat = Stats_1.Stat.Create("configPrefabTextItemByItemId.GetConfig"),
  CONFIG_STAT_PREFIX = "configPrefabTextItemByItemId.GetConfig(";
exports.configPrefabTextItemByItemId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (e, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var o = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${e})`),
      n =
        (o.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (t) {
        var i = KEY_PREFIX + `#${e})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (f)
          return (
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindBigInt(handleId, 1, e, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "ItemId",
              e,
            ]))
      ) {
        i = void 0;
        if (
          (([n, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["ItemId", e],
          )),
          n)
        ) {
          const f = PrefabTextItem_1.PrefabTextItem.getRootAsPrefabTextItem(
            new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
          );
          return (
            t &&
              ((n = KEY_PREFIX + `#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, f)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
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
//# sourceMappingURL=PrefabTextItemByItemId.js.map

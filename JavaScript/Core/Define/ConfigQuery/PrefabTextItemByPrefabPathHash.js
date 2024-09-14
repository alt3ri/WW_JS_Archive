"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPrefabTextItemByPrefabPathHash = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PrefabTextItem_1 = require("../Config/PrefabTextItem"),
  DB = "db_ui_prefabtextitem.db",
  FILE = "u.UiTextCollect/u.预制体文本收集.csv",
  TABLE = "PrefabTextItem",
  COMMAND = "select BinData from `PrefabTextItem` where PrefabPathHash = ?",
  KEY_PREFIX = "PrefabTextItemByPrefabPathHash",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configPrefabTextItemByPrefabPathHash.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configPrefabTextItemByPrefabPathHash.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configPrefabTextItemByPrefabPathHash.GetConfigList(";
exports.configPrefabTextItemByPrefabPathHash = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (t, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var o = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${t})`),
      i =
        (o.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (e) {
        var n = KEY_PREFIX + `#${t})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (f)
          return (
            o.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
      }
      if (
        (i = ConfigCommon_1.ConfigCommon.BindBigInt(handleId, 1, t, ...logPair))
      ) {
        const f = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "PrefabPathHash",
              t,
            ])
          )
            break;
          var a = void 0;
          if (
            (([i, a] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["PrefabPathHash", t],
            )),
            !i)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              o.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          a = PrefabTextItem_1.PrefabTextItem.getRootAsPrefabTextItem(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          f.push(a);
        }
        return (
          e &&
            ((n = KEY_PREFIX + `#${t})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(n, f, f.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          o.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          f
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=PrefabTextItemByPrefabPathHash.js.map

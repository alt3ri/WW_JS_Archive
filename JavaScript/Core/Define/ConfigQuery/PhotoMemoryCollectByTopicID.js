"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPhotoMemoryCollectByTopicID = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PhotoMemoryCollect_1 = require("../Config/PhotoMemoryCollect"),
  DB = "db_fragmentmemory.db",
  FILE = "j.记忆手册.xlsx",
  TABLE = "PhotoMemoryCollect",
  COMMAND = "select BinData from `PhotoMemoryCollect` where TopicID=?",
  KEY_PREFIX = "PhotoMemoryCollectByTopicID",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configPhotoMemoryCollectByTopicID.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configPhotoMemoryCollectByTopicID.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configPhotoMemoryCollectByTopicID.GetConfigList(";
exports.configPhotoMemoryCollectByTopicID = {
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
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r)
          return (
            i.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
      }
      if (
        (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const r = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "TopicID",
              o,
            ])
          )
            break;
          var C = void 0;
          if (
            (([n, C] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["TopicID", o],
            )),
            !n)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              i.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          C =
            PhotoMemoryCollect_1.PhotoMemoryCollect.getRootAsPhotoMemoryCollect(
              new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
            );
          r.push(C);
        }
        return (
          t &&
            ((e = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, r, r.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          i.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          r
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=PhotoMemoryCollectByTopicID.js.map

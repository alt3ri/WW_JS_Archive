"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPhotoMemoryActivityById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PhotoMemoryActivity_1 = require("../Config/PhotoMemoryActivity"),
  DB = "db_fragmentmemory.db",
  FILE = "j.记忆手册活动.xlsx",
  TABLE = "PhotoMemoryActivity",
  COMMAND = "select BinData from `PhotoMemoryActivity` where Id=?",
  KEY_PREFIX = "PhotoMemoryActivityById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configPhotoMemoryActivityById.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configPhotoMemoryActivityById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configPhotoMemoryActivityById.GetConfig(";
exports.configPhotoMemoryActivityById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      n =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (t) {
        var e = KEY_PREFIX + `#${o})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (m)
          return (
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            m
          );
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              o,
            ]))
      ) {
        e = void 0;
        if (
          (([n, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          n)
        ) {
          const m =
            PhotoMemoryActivity_1.PhotoMemoryActivity.getRootAsPhotoMemoryActivity(
              new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
            );
          return (
            t &&
              ((n = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, m)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            m
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
//# sourceMappingURL=PhotoMemoryActivityById.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPhotoMemoryTopicById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PhotoMemoryTopic_1 = require("../Config/PhotoMemoryTopic"),
  DB = "db_fragmentmemory.db",
  FILE = "j.记忆手册.xlsx",
  TABLE = "PhotoMemoryTopic",
  COMMAND = "select BinData from `PhotoMemoryTopic` where Id=?",
  KEY_PREFIX = "PhotoMemoryTopicById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = void 0,
  getConfigStat = void 0,
  CONFIG_STAT_PREFIX = "configPhotoMemoryTopicById.GetConfig(";
exports.configPhotoMemoryTopicById = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, e = !0) => {
    if (
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var i = KEY_PREFIX + `#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (r) return r;
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
        var n,
          i = void 0;
        if (
          (([n, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          n)
        ) {
          const r =
            PhotoMemoryTopic_1.PhotoMemoryTopic.getRootAsPhotoMemoryTopic(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          return (
            e &&
              ((n = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, r)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            r
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
//# sourceMappingURL=PhotoMemoryTopicById.js.map

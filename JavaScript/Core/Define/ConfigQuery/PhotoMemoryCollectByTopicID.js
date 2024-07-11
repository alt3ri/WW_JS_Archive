"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPhotoMemoryCollectByTopicID = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PhotoMemoryCollect_1 = require("../Config/PhotoMemoryCollect");
const DB = "db_fragmentmemory.db";
const FILE = "j.记忆手册.xlsx";
const TABLE = "PhotoMemoryCollect";
const COMMAND = "select BinData from `PhotoMemoryCollect` where TopicID=?";
const KEY_PREFIX = "PhotoMemoryCollectByTopicID";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
const CONFIG_LIST_STAT_PREFIX =
  "configPhotoMemoryCollectByTopicID.GetConfigList(";
exports.configPhotoMemoryCollectByTopicID = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o, e = !0) => {
    let i;
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var n = KEY_PREFIX + `#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (r) return r;
      }
      if (
        (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const r = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "TopicID",
              o,
            ]) !== 1
          )
            break;
          let t = void 0;
          if (
            (([i, t] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["TopicID", o],
            )),
            !i)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t =
            PhotoMemoryCollect_1.PhotoMemoryCollect.getRootAsPhotoMemoryCollect(
              new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
            );
          r.push(t);
        }
        return (
          e &&
            ((n = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(n, r, r.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          r
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=PhotoMemoryCollectByTopicID.js.map

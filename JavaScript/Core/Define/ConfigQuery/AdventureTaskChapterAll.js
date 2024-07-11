"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configAdventureTaskChapterAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AdventureTaskChapter_1 = require("../Config/AdventureTaskChapter");
const DB = "db_adventuretask.db";
const FILE = "k.开拓任务.xlsx";
const TABLE = "AdventureTaskChapter";
const COMMAND = "select BinData from `AdventureTaskChapter`";
const KEY_PREFIX = "AdventureTaskChapterAll";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
exports.configAdventureTaskChapterAll = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (e = !0) => {
    let o;
    if (
      (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var n = KEY_PREFIX + ")";
        const t = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (t) return t;
      }
      const t = new Array();
      for (;;) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair) !== 1)
          break;
        let r = void 0;
        if (
          (([o, r] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !o)
        )
          return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        r =
          AdventureTaskChapter_1.AdventureTaskChapter.getRootAsAdventureTaskChapter(
            new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
          );
        t.push(r);
      }
      return (
        e &&
          ((n = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(n, t, t.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        t
      );
    }
  },
};
// # sourceMappingURL=AdventureTaskChapterAll.js.map

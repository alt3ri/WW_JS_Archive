"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPreviewItemAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PreviewItem_1 = require("../Config/PreviewItem");
const DB = "db_item.db";
const FILE = "d.道具.xlsx";
const TABLE = "PreviewItem";
const COMMAND = "select BinData from `PreviewItem`";
const KEY_PREFIX = "PreviewItemAll";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
exports.configPreviewItemAll = {
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
        var i = KEY_PREFIX + ")";
        const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (r) return r;
      }
      const r = new Array();
      for (;;) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair) !== 1)
          break;
        let n = void 0;
        if (
          (([o, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !o)
        )
          return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n = PreviewItem_1.PreviewItem.getRootAsPreviewItem(
          new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
        );
        r.push(n);
      }
      return (
        e &&
          ((i = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(i, r, r.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        r
      );
    }
  },
};
// # sourceMappingURL=PreviewItemAll.js.map

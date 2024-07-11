"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configItemInfoByItemType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ItemInfo_1 = require("../Config/ItemInfo");
const DB = "db_item.db";
const FILE = "d.道具.xlsx";
const TABLE = "ItemInfo";
const COMMAND = "select BinData from `ItemInfo` where ItemType=?";
const KEY_PREFIX = "ItemInfoByItemType";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
const CONFIG_LIST_STAT_PREFIX = "configItemInfoByItemType.GetConfigList(";
exports.configItemInfoByItemType = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o, e = !0) => {
    let n;
    if (
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var i = KEY_PREFIX + `#${o})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (f) return f;
      }
      if (
        (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const f = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "ItemType",
              o,
            ]) !== 1
          )
            break;
          let t = void 0;
          if (
            (([n, t] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["ItemType", o],
            )),
            !n)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t = ItemInfo_1.ItemInfo.getRootAsItemInfo(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          f.push(t);
        }
        return (
          e &&
            ((i = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(i, f, f.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          f
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=ItemInfoByItemType.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPrefabTextItemByPrefabPathHash = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PrefabTextItem_1 = require("../Config/PrefabTextItem");
const DB = "db_ui_prefabtextitem.db";
const FILE = "u.UiTextCollect/u.预制体文本收集.csv";
const TABLE = "PrefabTextItem";
const COMMAND = "select BinData from `PrefabTextItem` where PrefabPathHash = ?";
const KEY_PREFIX = "PrefabTextItemByPrefabPathHash";
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
  "configPrefabTextItemByPrefabPathHash.GetConfigList(";
exports.configPrefabTextItemByPrefabPathHash = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (e, o = !0) => {
    let t;
    if (
      (t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var n = KEY_PREFIX + `#${e})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (i) return i;
      }
      if (
        (t = ConfigCommon_1.ConfigCommon.BindBigInt(handleId, 1, e, ...logPair))
      ) {
        const i = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "PrefabPathHash",
              e,
            ]) !== 1
          )
            break;
          let a = void 0;
          if (
            (([t, a] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["PrefabPathHash", e],
            )),
            !t)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          a = PrefabTextItem_1.PrefabTextItem.getRootAsPrefabTextItem(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          i.push(a);
        }
        return (
          o &&
            ((n = KEY_PREFIX + `#${e})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(n, i, i.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          i
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=PrefabTextItemByPrefabPathHash.js.map

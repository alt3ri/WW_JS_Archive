"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBuffItemCdGroupById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const BuffItemCdGroup_1 = require("../Config/BuffItemCdGroup");
const DB = "db_itemattributereward.db";
const FILE = "s.属性奖励.xlsx";
const TABLE = "BuffItemCdGroup";
const COMMAND = "select BinData from `BuffItemCdGroup` where Id=?";
const KEY_PREFIX = "BuffItemCdGroupById";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configBuffItemCdGroupById.GetConfig(";
exports.configBuffItemCdGroupById = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, e = !0) => {
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var n = KEY_PREFIX + `#${o})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (f) return f;
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "Id",
            o,
          ]) > 0)
      ) {
        var i;
        var n = void 0;
        if (
          (([i, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          i)
        ) {
          const f = BuffItemCdGroup_1.BuffItemCdGroup.getRootAsBuffItemCdGroup(
            new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
          );
          return (
            e &&
              ((i = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, f)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            f
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=BuffItemCdGroupById.js.map

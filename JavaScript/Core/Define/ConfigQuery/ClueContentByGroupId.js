"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configClueContentByGroupId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ClueContent_1 = require("../Config/ClueContent");
const DB = "db_clue.db";
const FILE = "x.线索.xlsx";
const TABLE = "ClueContent";
const COMMAND = "select BinData from `ClueContent` where GroupId=?";
const KEY_PREFIX = "ClueContentByGroupId";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
const CONFIG_LIST_STAT_PREFIX = "configClueContentByGroupId.GetConfigList(";
exports.configClueContentByGroupId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o, n = !0) => {
    let e;
    if (
      (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var i = KEY_PREFIX + `#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (C) return C;
      }
      if (
        (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const C = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "GroupId",
              o,
            ]) !== 1
          )
            break;
          let t = void 0;
          if (
            (([e, t] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["GroupId", o],
            )),
            !e)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t = ClueContent_1.ClueContent.getRootAsClueContent(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          C.push(t);
        }
        return (
          n &&
            ((i = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(i, C, C.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          C
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=ClueContentByGroupId.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configChatExpressionById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ChatExpression_1 = require("../Config/ChatExpression");
const DB = "db_chat.db";
const FILE = "l.聊天.xlsx";
const TABLE = "ChatExpression";
const COMMAND = "select BinData from `ChatExpression` where Id=?";
const KEY_PREFIX = "ChatExpressionById";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configChatExpressionById.GetConfig(";
exports.configChatExpressionById = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, n = !0) => {
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var e = KEY_PREFIX + `#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (t) return t;
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
        var e = void 0;
        if (
          (([i, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          i)
        ) {
          const t = ChatExpression_1.ChatExpression.getRootAsChatExpression(
            new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
          );
          return (
            n &&
              ((i = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, t)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=ChatExpressionById.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configChatExpressionByGroupId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  ChatExpression_1 = require("../Config/ChatExpression"),
  DB = "db_chat.db",
  FILE = "l.聊天.xlsx",
  TABLE = "ChatExpression",
  COMMAND = "select BinData from `ChatExpression` where GroupId=?",
  KEY_PREFIX = "ChatExpressionByGroupId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = void 0,
  getConfigListStat = void 0,
  CONFIG_LIST_STAT_PREFIX = "configChatExpressionByGroupId.GetConfigList(";
exports.configChatExpressionByGroupId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o, n = !0) => {
    var i;
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var e = KEY_PREFIX + `#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (t) return t;
      }
      if (
        (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const t = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "GroupId",
              o,
            ])
          )
            break;
          var r = void 0;
          if (
            (([i, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["GroupId", o],
            )),
            !i)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          r = ChatExpression_1.ChatExpression.getRootAsChatExpression(
            new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
          );
          t.push(r);
        }
        return (
          n &&
            ((e = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, t, t.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          t
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
//# sourceMappingURL=ChatExpressionByGroupId.js.map

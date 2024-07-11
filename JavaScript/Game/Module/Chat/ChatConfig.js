"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatConfig = void 0);
const ChatById_1 = require("../../../Core/Define/ConfigQuery/ChatById");
const ChatExpressionAll_1 = require("../../../Core/Define/ConfigQuery/ChatExpressionAll");
const ChatExpressionByGroupId_1 = require("../../../Core/Define/ConfigQuery/ChatExpressionByGroupId");
const ChatExpressionById_1 = require("../../../Core/Define/ConfigQuery/ChatExpressionById");
const ChatExpressionGroupAll_1 = require("../../../Core/Define/ConfigQuery/ChatExpressionGroupAll");
const ChatExpressionGroupById_1 = require("../../../Core/Define/ConfigQuery/ChatExpressionGroupById");
const QuickChatAll_1 = require("../../../Core/Define/ConfigQuery/QuickChatAll");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ChatConfig extends ConfigBase_1.ConfigBase {
  GetChatConfig(e) {
    return ChatById_1.configChatById.GetConfig(e);
  }
  GetAllQuickChatConfigList() {
    return QuickChatAll_1.configQuickChatAll.GetConfigList();
  }
  GetAllExpressionConfigByGroupId(e) {
    return ChatExpressionByGroupId_1.configChatExpressionByGroupId.GetConfigList(
      e,
    );
  }
  GetAllExpressionGroupConfig() {
    return ChatExpressionGroupAll_1.configChatExpressionGroupAll.GetConfigList();
  }
  GetExpressionGroupConfig(e) {
    return ChatExpressionGroupById_1.configChatExpressionGroupById.GetConfig(e);
  }
  GetExpressionConfig(e) {
    return ChatExpressionById_1.configChatExpressionById.GetConfig(e);
  }
  GetAllExpressionConfig() {
    return ChatExpressionAll_1.configChatExpressionAll.GetConfigList();
  }
}
exports.ChatConfig = ChatConfig;
// # sourceMappingURL=ChatConfig.js.map

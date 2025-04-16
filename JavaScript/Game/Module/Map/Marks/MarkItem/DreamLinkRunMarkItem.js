"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DreamLinkRunMarkItem = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SceneGameplayMarkItem_1 = require("./SceneGameplayMarkItem");
class DreamLinkRunMarkItem extends SceneGameplayMarkItem_1.SceneGameplayMarkItem {
  CheckCanShowView() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityMapMarkState(
      Protocol_1.Aki.Protocol.uks.Proto_RogueWhiteCat,
      this.MarkId,
    );
  }
}
exports.DreamLinkRunMarkItem = DreamLinkRunMarkItem;
//# sourceMappingURL=DreamLinkRunMarkItem.js.map

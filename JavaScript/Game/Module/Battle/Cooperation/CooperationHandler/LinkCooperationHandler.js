"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LinkCooperationHandler = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  BattleLinkController_1 = require("../../Link/BattleLinkController"),
  BattleLinkDefine_1 = require("../../Link/BattleLinkDefine");
class LinkCooperationHandler {
  constructor() {
    this.Tsh = new Map();
  }
  Trigger(e, t) {
    var r;
    return !(
      !t.IsAutoRole() ||
      !(t = t.EntityHandle.Entity) ||
      !ModelManager_1.ModelManager.BattleLinkModel.CanUseLinkSkill(t.Id) ||
      ((r = this.Tsh.get(t.Id)) &&
        Date.now() - r < BattleLinkDefine_1.LINK_TRIGGER_INTERVAL) ||
      (this.Tsh.set(t.Id, Date.now()),
      BattleLinkController_1.BattleLinkController.UseLinkSkill(t),
      0)
    );
  }
  Clear() {
    this.Tsh.clear();
  }
}
exports.LinkCooperationHandler = LinkCooperationHandler;
//# sourceMappingURL=LinkCooperationHandler.js.map

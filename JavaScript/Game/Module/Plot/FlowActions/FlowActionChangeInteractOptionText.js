"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionChangeInteractOptionText = void 0);
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  FlowActionBase_1 = require("./FlowActionBase");
class FlowActionChangeInteractOptionText extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e,
      t = ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
    t &&
      (t = EntitySystem_1.EntitySystem.Get(t)) &&
      (t = t.GetComponent(181)) &&
      (t = t.GetInteractController()) &&
      (t = t.CurrentInteractOption) &&
      ((e = this.ActionInfo.Params), (t.TidContent = e.TidContent));
  }
}
exports.FlowActionChangeInteractOptionText = FlowActionChangeInteractOptionText;
//# sourceMappingURL=FlowActionChangeInteractOptionText.js.map

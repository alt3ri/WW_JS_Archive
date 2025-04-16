"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventInteractGravityFlip = void 0);
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventInteractGravityFlip extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    e &&
      ((e = e.EntityId),
      (e = EntitySystem_1.EntitySystem.GetComponent(e, 278))) &&
      (e.ExecuteInteract(), this.FinishExecute(!0));
  }
}
exports.LevelEventInteractGravityFlip = LevelEventInteractGravityFlip;
//# sourceMappingURL=LevelEventInteractGravityFlip.js.map

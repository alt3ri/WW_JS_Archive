"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckGravityFlipEntityDirectionSameAsPlayer = void 0);
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckGravityFlipEntityDirectionSameAsPlayer extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, t) {
    return (
      !!e &&
      ((e = e.EntityId),
      !!(e = EntitySystem_1.EntitySystem.GetComponent(e, 278))) &&
      e.CheckPlayerGravityDirectionAsSelf()
    );
  }
}
exports.LevelConditionCheckGravityFlipEntityDirectionSameAsPlayer =
  LevelConditionCheckGravityFlipEntityDirectionSameAsPlayer;
//# sourceMappingURL=LevelConditionCheckGravityFlipEntityDirectionSameAsPlayer.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventChangeSelfEntityState = void 0);
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  LevelGeneralCommons_1 = require("../LevelGeneralCommons");
class LevelEventChangeSelfEntityState extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), (this.tRl = 0), (this.E0 = 0);
  }
  ExecuteNew(e, t, s) {
    e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.EntityState);
    let a = void 0;
    switch (t.Type) {
      case 1:
        a = t.EntityId;
        break;
      case 5:
        a = t.TriggerEntityId;
        break;
      default:
        return;
    }
    e &&
      a &&
      ((this.tRl = e), (this.E0 = a), this.CreateWaitEntityTask(this.E0));
  }
  ExecuteWhenEntitiesReady() {
    LevelGeneralCommons_1.LevelGeneralCommons.PrechangeStateTag(
      this.E0,
      this.tRl,
      "LevelEventChangeSelfEntityState",
    ),
      this.FinishExecute(!0);
  }
  OnReset() {
    (this.tRl = 0), (this.E0 = 0);
  }
}
exports.LevelEventChangeSelfEntityState = LevelEventChangeSelfEntityState;
//# sourceMappingURL=LevelEventChangeSelfEntityState.js.map

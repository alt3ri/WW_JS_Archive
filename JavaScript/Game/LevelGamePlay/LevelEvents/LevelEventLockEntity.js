"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventLockEntity = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventLockEntity extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), (this.Lo = void 0);
  }
  ExecuteNew(e, t, s) {
    1 === t.Type && t.ClientExecuteActions
      ? ((this.Lo = e), this.CreateWaitEntityTask(this.Lo.EntityIds))
      : this.FinishExecute(!0);
  }
  ExecuteWhenEntitiesReady() {
    for (const t of this.Lo.EntityIds) {
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
      e?.IsInit &&
        e.Entity.GetComponent(194)?.AddServerTagByIdLocal(
          -662723379,
          "LevelEventLockEntity",
        );
    }
    this.FinishExecute(!0);
  }
  OnReset() {
    this.Lo = void 0;
  }
}
exports.LevelEventLockEntity = LevelEventLockEntity;
//# sourceMappingURL=LevelEventLockEntity.js.map

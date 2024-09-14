"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventForceLockOnSpecialTagTarget = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterLockOnComponent_1 = require("../../NewWorld/Character/Common/Component/LockOn/CharacterLockOnComponent"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventForceLockOnSpecialTagTarget extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o) {
    var a, r, n;
    e &&
      (e.EntityId ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            23,
            "LevelEventForceLockOnSpecialTagTarget 事件EntityId为空",
          )),
      (a =
        Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.GetComponent(
          29,
        ))?.Valid
        ? ((r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            e.EntityId,
          )),
          ((n = new CharacterLockOnComponent_1.LockOnInfo()).EntityHandle = r),
          a.ForceLookAtTarget(n, e.IsLocked))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            23,
            "LevelEventForceLockOnSpecialTagTarget 获取不到玩家lockon组件",
          ));
  }
}
exports.LevelEventForceLockOnSpecialTagTarget =
  LevelEventForceLockOnSpecialTagTarget;
//# sourceMappingURL=LevelEventForceLockOnSpecialTagTarget.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventForceLockOnSpecialTagTarget = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterLockOnComponent_1 = require("../../NewWorld/Character/Common/Component/LockOn/CharacterLockOnComponent"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventForceLockOnSpecialTagTarget extends LevelGeneralBase_1.LevelEventBase {
  Execute(e, o) {
    var a, n, r;
    e &&
      ((n = e.get("EntityId")),
      (e = e.get("IsLockOn"))
        ? (e = Boolean(e)) || n
          ? (a =
              Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.GetComponent(
                29,
              ))?.Valid
            ? ((n =
                ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                  Number(n),
                )),
              ((r = new CharacterLockOnComponent_1.LockOnInfo()).EntityHandle =
                n),
              a.ForceLookAtTarget(r, e))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Level",
                23,
                "LevelEventForceLockOnSpecialTagTarget 获取不到玩家lockon组件",
              )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              23,
              "LevelEventForceLockOnSpecialTagTarget 事件EntityId为空",
            )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            23,
            "LevelEventForceLockOnSpecialTagTarget 事件isLockOn为空",
          ));
  }
  ExecuteNew(e, o) {
    var a, n, r;
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
        ? ((n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            e.EntityId,
          )),
          ((r = new CharacterLockOnComponent_1.LockOnInfo()).EntityHandle = n),
          a.ForceLookAtTarget(r, e.IsLocked))
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

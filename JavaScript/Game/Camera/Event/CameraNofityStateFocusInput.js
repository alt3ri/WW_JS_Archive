"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterLockOnComponent_1 = require("../../NewWorld/Character/Common/Component/LockOn/CharacterLockOnComponent"),
  ActorUtils_1 = require("../../Utils/ActorUtils"),
  CameraController_1 = require("../CameraController");
class CameraFocusInputParams {
  constructor() {
    this.LockOnInfo = void 0;
  }
}
class CameraNofityStateFocusInput extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.FocusLimitLength = 0),
      (this.PitchSpeed = 0),
      (this.YawSpeed = 0),
      (this.MinDistance = -0),
      (this.MaxDistance = 1e3),
      (this.LockOnPart = ""),
      (this.ParamsMap = new Map()),
      (this.IsInitialize = !1);
  }
  K2_NotifyBegin(t, e, r) {
    this.Init();
    t = t?.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      this.ParamsMap.has(t.EntityId) ||
        this.ParamsMap.set(t.EntityId, new CameraFocusInputParams());
      var a = this.ParamsMap.get(t.EntityId);
      if (!a.LockOnInfo) {
        var s = ActorUtils_1.ActorUtils.GetEntityByActor(t),
          t = t.GetEntityNoBlueprint();
        if (t?.Valid) {
          var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
          if (!o) return !1;
          var t = t.GetComponent(1)?.ActorLocationProxy,
            i = o.Entity.GetComponent(1)?.ActorLocationProxy,
            t = Vector_1.Vector.Dist(t, i);
          if (t < this.MinDistance || t > this.MaxDistance) return !1;
          i = o?.Entity?.GetComponent(29);
          i &&
            (((t = new CharacterLockOnComponent_1.LockOnInfo()).EntityHandle =
              s),
            (t.SocketName = "None" === this.LockOnPart ? "" : this.LockOnPart),
            (a.LockOnInfo = t),
            i.ForceLookAtTarget(t, !0));
        }
        CameraController_1.CameraController.FightCamera.LogicComponent.OpenFocusInputController(
          !0,
          this.YawSpeed,
          this.PitchSpeed,
          this.FocusLimitLength,
        );
      }
    }
    return !1;
  }
  K2_NotifyEnd(t, e) {
    var r,
      t = t?.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !!(r = this.ParamsMap.get(t.EntityId)) &&
      !(
        !r.LockOnInfo ||
        !t?.IsValid() ||
        !(t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) ||
        ((t = t.Entity?.GetComponent(29)) &&
          t.ForceLookAtTarget(r.LockOnInfo, !1, !0),
        CameraController_1.CameraController.FightCamera.LogicComponent.OpenFocusInputController(
          !1,
          this.YawSpeed,
          this.PitchSpeed,
          this.FocusLimitLength,
        ),
        (r.LockOnInfo = void 0))
      )
    );
  }
  Init() {
    (this.IsInitialize && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.ParamsMap = new Map()), (this.IsInitialize = !0));
  }
  GetNotifyName() {
    return "强制锁定角色";
  }
}
exports.default = CameraNofityStateFocusInput;
//# sourceMappingURL=CameraNofityStateFocusInput.js.map

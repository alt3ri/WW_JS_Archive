"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterLockOnComponent_1 = require("../../NewWorld/Character/Common/Component/LockOn/CharacterLockOnComponent"),
  ActorUtils_1 = require("../../Utils/ActorUtils");
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
  Constructor() {
    (this.ParamsMap = new Map()), (this.IsInitialize = !1);
  }
  K2_NotifyBegin(t, r, e) {
    this.Init();
    t = t?.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      this.ParamsMap.has(t.EntityId) ||
        this.ParamsMap.set(t.EntityId, new CameraFocusInputParams());
      var a = this.ParamsMap.get(t.EntityId);
      if (!a.LockOnInfo) {
        var o = ActorUtils_1.ActorUtils.GetEntityByActor(t),
          t = t.GetEntityNoBlueprint();
        if (t?.Valid) {
          var s = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
          if (!s) return !1;
          var t = t.GetComponent(1)?.ActorLocationProxy,
            i = s.Entity.GetComponent(1)?.ActorLocationProxy,
            t = Vector_1.Vector.Dist(t, i);
          if (t < this.MinDistance || t > this.MaxDistance) return !1;
          i = s?.Entity?.GetComponent(32);
          i &&
            (((t = new CharacterLockOnComponent_1.LockOnInfo()).EntityHandle =
              o),
            (t.SocketName = "None" === this.LockOnPart ? "" : this.LockOnPart),
            (a.LockOnInfo = t),
            i.ForceLookAt(t, !0));
        }
        ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.OpenFocusInputController(
          !0,
          this.YawSpeed,
          this.PitchSpeed,
          this.FocusLimitLength,
        );
      }
    }
    return !1;
  }
  K2_NotifyEnd(t, r) {
    var e,
      t = t?.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !!(e = this.ParamsMap.get(t.EntityId)) &&
      !(
        !e.LockOnInfo ||
        !t?.IsValid() ||
        !(t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) ||
        ((t = t.Entity?.GetComponent(32)) &&
          t.ForceLookAt(e.LockOnInfo, !1, !0),
        ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.OpenFocusInputController(
          !1,
          this.YawSpeed,
          this.PitchSpeed,
          this.FocusLimitLength,
        ),
        (e.LockOnInfo = void 0))
      )
    );
  }
  Init() {
    (this.IsInitialize && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.ParamsMap = new Map()), (this.IsInitialize = !0));
  }
  GetNotifyName() {
    return "强制锁定目标";
  }
}
exports.default = CameraNofityStateFocusInput;
//# sourceMappingURL=CameraNofityStateFocusInput.js.map

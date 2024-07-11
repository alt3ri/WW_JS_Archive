"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulableMatchOutletState = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  SceneItemDynamicAttachTargetComponent_1 = require("../Common/Component/SceneItemDynamicAttachTargetComponent"),
  SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulableMatchOutletState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
  constructor(t) {
    super(t), (this.StateType = "MatchingOutlet");
  }
  OnEnter() {
    this.SceneItem.ClearCastDestroyTimer(),
      this.SceneItem.TryAddTagById(1370513573),
      (this.SceneItem.IsCanBeHeld = !0),
      this.OpenPhysicsSplit(),
      (this.PropComp.IsMoving = !1),
      this.Lnr();
  }
  OnExit() {
    this.SceneItem.TryRemoveTagById(1370513573),
      this.ClosePhysicsSplit(),
      (this.PropComp.IsMoving = !0),
      this.Dnr();
  }
  Lnr() {
    var t,
      e,
      a,
      i = this.SceneItem.Entity.GetComponent(110),
      s = this.SceneItem.ActivatedOutlet;
    i &&
      s?.GetIsNeedAttach() &&
      ((t = s.GetSocketLocationOffset(this.SceneItem.Entity)),
      (e = s.GetMatchSequenceOffset(this.SceneItem.Entity)),
      ((a =
        new SceneItemDynamicAttachTargetComponent_1.AttachParam()).PosAttachType =
        2),
      (a.PosAttachOffset = t.Addition(e, Vector_1.Vector.Create())),
      (a.PosAbsolute = !1),
      (a.RotAttachType = 2),
      (a.RotAttachOffset = s.GetSocketRotatorOffset(this.SceneItem.Entity)),
      (a.RotAbsolute = !1),
      i.RegEntityTarget(
        s.Entity.GetComponent(0).GetPbDataId(),
        s.GetSocketName(this.SceneItem.Entity),
        a,
        "[MatchOutletState] TryAttachToOutlet",
      ));
  }
  Dnr() {
    var t = this.SceneItem.Entity.GetComponent(110);
    t && t.UnRegTarget("[MatchOutletState] TryDetachFromOutlet");
  }
}
exports.SceneItemManipulableMatchOutletState =
  SceneItemManipulableMatchOutletState;
//# sourceMappingURL=SceneItemManipulableMatchOutletState.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulableDrawState = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  PortalUtils_1 = require("../../../Utils/PortalUtils"),
  SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulableDrawState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
  constructor(t, e, i) {
    super(t),
      (this.pYi = void 0),
      (this.esr = void 0),
      (this.tsr = void 0),
      (this.Znr = void 0),
      (this.x0a = !1),
      (this.pYi = e),
      (this.Znr = i),
      (this.StateType = "BeDrawing");
  }
  SetEnterCallback(t) {
    this.EnterCallback = t;
  }
  OnEnter() {
    (this.SceneItem.NeedRemoveControllerId = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Character",
          32,
          "[CharacterManipulateComp] DrawState OnEnter",
          ["PbDataId", this.SceneItem?.ActorComp?.CreatureData.GetPbDataId()],
          ["ActivatedOutlet", this.SceneItem.ActivatedOutlet?.Valid],
        ),
      this.SceneItem.ActivatedOutlet?.Valid &&
        this.SceneItem.MatchSequence &&
        ((this.SceneItem.PlayingMatchSequence = !0),
        this.SceneItem.PlayMatchSequence(() => {
          this.isr(),
            (this.SceneItem.PlayingMatchSequence = !1),
            (this.SceneItem.MatchSequence = void 0);
        }, !0)),
      void 0 === this.SceneItem.MatchSequence && this.isr(),
      FNameUtil_1.FNameUtil.IsNothing(
        this.SceneItem.ManipulateBaseConfig.吸取状态碰撞预设,
      ) ||
        this.SceneItem.ActorComp.GetPrimitiveComponent().SetCollisionProfileName(
          this.SceneItem.ManipulateBaseConfig.吸取状态碰撞预设,
        );
  }
  isr() {
    this.SceneItem.ActivatedOutlet?.Valid &&
      this.SceneItem.ClearAttachOutletInfo(),
      this.StartCameraShake(this.pYi),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AddSubCameraTag,
        this.Znr,
      ),
      (this.SceneItem.ActorComp.PhysicsMode = 0),
      (this.Timer = 0),
      (this.esr = this.SceneItem.GetDrawStartLocation().ToUeVector()),
      (this.tsr = this.SceneItem.ActorComp.ActorRotation),
      (this.x0a = !1),
      this.EnterCallback && this.EnterCallback();
  }
  OnTick(t) {
    return (
      this.SceneItem.PlayingMatchSequence ||
        ((this.Timer += t),
        (t = this.osr()),
        this.SceneItem.ActorComp.SetActorLocationAndRotation(
          t.Loc,
          t.Rot,
          "[ManipulableDrawState.Tick]",
          !0,
        )),
      !0
    );
  }
  OnExit() {
    this.StopCameraShake(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RemoveSubCameraTag,
        this.Znr,
      );
  }
  osr() {
    var t = this.SceneItem.ManipulateBaseConfig;
    let e = 1,
      i = 1;
    this.Timer < t.对齐时间 &&
      ((e = MathUtils_1.MathUtils.Clamp(this.Timer / t.对齐时间, 0, 1)),
      (e = UE.KismetMathLibrary.Ease(0, 1, e, 5))),
      this.Timer < t.吸取时间 &&
        ((i = MathUtils_1.MathUtils.Clamp(
          (this.Timer - t.吸取延迟) / (t.吸取时间 - t.吸取延迟),
          0,
          1,
        )),
        (i = UE.KismetMathLibrary.Ease(0, 1, i, 7)));
    var s = new UE.Vector(this.esr.X, this.esr.Y, this.esr.Z),
      t = ((s.Z += t.牵引高度 * e), this.tsr),
      r = this.SceneItem.UsingAssistantHoldOffset
        ? this.SceneItem.ConfigAssistantHoldOffset
        : this.SceneItem.ConfigHoldOffset,
      a = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorTransform,
      r = a.TransformPositionNoScale(r);
    let h = UE.KismetMathLibrary.ComposeRotators(
      this.SceneItem.ConfigHoldRotator,
      a.Rotator(),
    );
    var a = this.SceneItem.Entity.GetComponent(125);
    a?.Valid &&
      ((a = new UE.Rotator(0, -a.Rotation, 0)),
      (h = UE.KismetMathLibrary.ComposeRotators(a, h)));
    let o = r,
      l = h;
    var n,
      a = 0 !== this.SceneItem.GetPassThroughPortalType();
    let _ = 0,
      c = [];
    if (a) {
      if (4 !== (c = this.b0a(this.esr, r)).length) return { Loc: o, Rot: l };
      (n = Vector_1.Vector.Dist(c[0], c[1])),
        (n += Vector_1.Vector.Dist(c[2], c[3])),
        (_ = Vector_1.Vector.Dist(c[0], c[1]) / n);
    }
    return (
      i < 1 &&
        (a
          ? i < _
            ? (o = UE.KismetMathLibrary.VLerp(
                c[0].ToUeVector(),
                c[1].ToUeVector(),
                i / _,
              ))
            : ((o = UE.KismetMathLibrary.VLerp(
                c[2].ToUeVector(),
                c[3].ToUeVector(),
                (i - _) / (1 - _),
              )),
              this.x0a ||
                ((this.x0a = !0),
                this.SceneItem.ActorComp.SetActorLocation(
                  o,
                  "[ManipulableDrawState.PassThroughPortal]",
                  !1,
                )))
          : (o = UE.KismetMathLibrary.VLerp(s, r, i)),
        (l = UE.KismetMathLibrary.RLerp(t, h, i, !0))),
      { Loc: o, Rot: l }
    );
  }
  b0a(t, e) {
    var i = [],
      s = 1 === this.SceneItem.GetPassThroughPortalType(),
      r = Vector_1.Vector.Create(e),
      a = Vector_1.Vector.Create(),
      h =
        (PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(
          r,
          this.SceneItem.GetPassThroughPortalId(),
          s,
          a,
        ),
        ModelManager_1.ModelManager.PortalModel?.GetPortal(
          this.SceneItem.GetPassThroughPortalId(),
        )),
      o = Vector_1.Vector.Create(),
      l = Vector_1.Vector.Create(
        (s ? h?.PortalWorldTransform2 : h?.PortalWorldTransform1).GetLocation(),
      ),
      n = Vector_1.Vector.Create(
        (s ? h?.PortalWorldTransform2 : h?.PortalWorldTransform1)
          .GetRotation()
          .GetForwardVector(),
      );
    return (
      MathUtils_1.MathUtils.LinePlaneIntersectionOriginNormal(
        a,
        Vector_1.Vector.Create(t),
        l,
        n,
        o,
      ),
      o.IsZero() ||
        (i.push(Vector_1.Vector.Create(t)), i.push(Vector_1.Vector.Create(o))),
      r.DeepCopy(t),
      PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(
        r,
        this.SceneItem.GetPassThroughPortalId(),
        !s,
        a,
      ),
      (l = Vector_1.Vector.Create(
        (s ? h?.PortalWorldTransform1 : h?.PortalWorldTransform2).GetLocation(),
      )),
      (n = Vector_1.Vector.Create(
        (s ? h?.PortalWorldTransform1 : h?.PortalWorldTransform2)
          .GetRotation()
          .GetForwardVector(),
      )),
      MathUtils_1.MathUtils.LinePlaneIntersectionOriginNormal(
        a,
        Vector_1.Vector.Create(e),
        l,
        n,
        o,
      ),
      o.IsZero() || (i.push(o), i.push(Vector_1.Vector.Create(e))),
      i
    );
  }
}
exports.SceneItemManipulableDrawState = SceneItemManipulableDrawState;
//# sourceMappingURL=SceneItemManipulableDrawState.js.map

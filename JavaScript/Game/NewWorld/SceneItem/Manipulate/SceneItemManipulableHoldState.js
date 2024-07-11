"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulableHoldState = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../../Camera/CameraController"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  GameSplineUtils_1 = require("../../../LevelGamePlay/Common/GameSplineUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulableHoldState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
  constructor(t, e, i, s) {
    super(t),
      (this.M$i = void 0),
      (this.inr = void 0),
      (this.anr = void 0),
      (this.opi = 0),
      (this.jye = Vector_1.Vector.Create()),
      (this.k1t = Vector_1.Vector.Create()),
      (this.hnr = void 0),
      (this.lnr = void 0),
      (this._nr = (0, puerts_1.$ref)(void 0)),
      (this.unr = (0, puerts_1.$ref)(void 0)),
      (this.cnr = (0, puerts_1.$ref)(void 0)),
      (this.mnr = UE.NewArray(UE.Actor)),
      (this.dnr = void 0),
      (this.Cnr = void 0),
      (this.gnr = void 0),
      (this.fnr = void 0),
      (this.pnr = void 0),
      (this.M$i = e),
      (this.inr = i),
      (this.anr = s),
      (this.StateType = "BeHolding");
  }
  SetEnterCallback(t) {
    this.EnterCallback = t;
  }
  OnEnter() {
    this.StartCameraShake(this.M$i),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AddSubCameraTag,
        this.inr,
      ),
      (this.pnr = this.inr),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AddExtraHoldingTags,
        this.anr,
      ),
      (this.SceneItem.ActorComp.PhysicsMode = 2),
      this.SceneItem.ActorComp.GetPrimitiveComponent().SetPhysicsLinearVelocity(
        Vector_1.Vector.ZeroVector,
      ),
      this.mnr.Add(this.SceneItem.ActorComp.Owner),
      this.mnr.Add(Global_1.Global.BaseCharacter.CharacterActorComponent.Owner),
      this.EnterCallback && this.EnterCallback(),
      FNameUtil_1.FNameUtil.IsNothing(
        this.SceneItem.ManipulateBaseConfig.保持状态碰撞预设,
      ) ||
        this.SceneItem.ActorComp.GetPrimitiveComponent().SetCollisionProfileName(
          this.SceneItem.ManipulateBaseConfig.保持状态碰撞预设,
        ),
      this.SceneItem.Config?.HoldCfg?.TrackTarget && this.vnr(),
      this.SceneItem.IsProjectileAimMode && this.Yrr();
    var t =
        Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.GetComponent(
          185,
        ),
      e =
        (t.AddTag(-1011082332),
        this.SceneItem.ManipulateBaseConfig?.抛物瞄准模式开关 ||
          t.AddTag(510134989),
        this.SceneItem.Entity.GetComponent(122));
    e?.Valid ? t.AddTag(882475449) : t.AddTag(1892366727);
  }
  OnTick(t) {
    this.Timer += t;
    (t = this.snr()),
      (this.SceneItem.MovementTargetLocation = t.Loc),
      (this.SceneItem.MovementTargetRotation = t.Rot),
      (t = Vector_1.Vector.Distance(
        this.SceneItem.ActorComp.ActorLocationProxy,
        Vector_1.Vector.Create(t.Loc),
      ));
    return !(
      t > ConfigManager_1.ConfigManager.ManipulateConfig.DisconnectDistance ||
      (this.SceneItem.Config?.HoldCfg?.TrackTarget && this.Mnr(),
      this.SceneItem.IsProjectileAimMode && this.Snr(),
      0)
    );
  }
  OnExit() {
    this.StopCameraShake(),
      void 0 !== this.pnr &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RemoveSubCameraTag,
          this.pnr,
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RemoveExtraHoldingTags,
        this.anr,
      ),
      this.mnr.Empty(),
      this.SceneItem.Config?.HoldCfg?.TrackTarget && this.Enr(),
      this.ynr();
    var t =
      Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(
        185,
      );
    t?.RemoveTag(-1011082332),
      t?.RemoveTag(510134989),
      t?.RemoveTag(-624589333),
      t?.RemoveTag(-1070569477),
      this.SceneItem?.LastHoldingLocation.DeepCopy(
        this.SceneItem.ActorComp.ActorLocationProxy,
      );
  }
  snr() {
    var t = this.SceneItem.ManipulateBaseConfig,
      e = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorTransform,
      i = this.SceneItem.UsingAssistantHoldOffset
        ? this.SceneItem.ConfigAssistantHoldOffset
        : this.SceneItem.ConfigHoldOffset,
      i = e.TransformPositionNoScale(i);
    i.Z += Math.sin(this.Timer * Math.PI * t.摆动频率) * t.摆动范围;
    let s = UE.KismetMathLibrary.ComposeRotators(
      this.SceneItem.ConfigHoldRotator,
      e.Rotator(),
    );
    var e = new UE.Rotator(0, this.Timer * t.角速度, 0),
      t =
        ((s = UE.KismetMathLibrary.ComposeRotators(e, s)),
        this.SceneItem.Entity.GetComponent(122));
    return (
      t?.Valid &&
        ((e = new UE.Rotator(0, -t.Rotation, 0)),
        (s = UE.KismetMathLibrary.ComposeRotators(e, s))),
      { Loc: i, Rot: s }
    );
  }
  Mnr() {
    var t, e;
    this.lnr &&
      ((t = this.SceneItem.ActorComp.ActorLocationProxy),
      (e = this.Inr(t, this.k1t)),
      this.lnr.SetSplinePoints(e, 0, !0),
      this.hnr.K2_SetActorLocation(t.ToUeVector(), !1, void 0, !0));
  }
  Enr() {
    EffectSystem_1.EffectSystem.IsValid(this.opi) &&
      (EffectSystem_1.EffectSystem.StopEffectById(
        this.opi,
        "[SceneItemManipulableHoldState.ClearCurSplineAndEffectHandle]",
        !0,
      ),
      (this.opi = 0)),
      this.hnr?.IsValid() &&
        (ActorSystem_1.ActorSystem.Put(this.hnr),
        (this.hnr = void 0),
        (this.lnr = void 0));
  }
  vnr() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
      this.SceneItem.Config.HoldCfg.TrackTarget.EntityId,
    );
    t &&
      (this.k1t.Set(t.Transform.Pos.X, t.Transform.Pos.Y, t.Transform.Pos.Z),
      (t = this.Inr(this.SceneItem.ActorComp.ActorLocationProxy, this.k1t)),
      (t = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(
        this.k1t,
        t,
        this.SceneItem.Config.HoldCfg.TrackTarget.EffectPath,
      ))) &&
      ((this.opi = t.EffectHandle),
      (this.hnr = t.SplineActor),
      (this.lnr = t.SplineComp));
  }
  Inr(t, e) {
    var i = UE.NewArray(UE.Vector),
      s = (i.Add(Vector_1.Vector.ZeroVector), Vector_1.Vector.Distance(t, e)),
      h = this.SceneItem.Config.HoldCfg.TrackTarget.EffectLength;
    return (
      e.Subtraction(t, this.jye),
      h < s && (this.jye.Normalize(), this.jye.Multiply(h, this.jye)),
      i.Add(this.jye.ToUeVector()),
      i
    );
  }
  Yrr() {
    var t = this.SceneItem.ManipulateBaseConfig,
      e = this.SceneItem.ActorComp.ActorLocation,
      i = (0, puerts_1.$unref)(this.unr),
      e = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(
        Vector_1.Vector.Create(e),
        i,
        t.抛物瞄准模式样条特效.AssetPathName.toString(),
      );
    e &&
      ((this.dnr = e.EffectHandle),
      (this.Cnr = e.SplineActor),
      (this.gnr = e.SplineComp),
      (this.fnr = EffectSystem_1.EffectSystem.SpawnEffect(
        GlobalData_1.GlobalData.World,
        MathUtils_1.MathUtils.DefaultTransform,
        t.抛物瞄准模式终点特效.AssetPathName.toString(),
        "[SceneItemManipulableHoldState.GeneratePredictProjectilePoints]",
        new EffectContext_1.EffectContext(this.SceneItem?.Entity.Id),
      )));
  }
  Snr() {
    if (this.gnr) {
      var t = this.SceneItem.ManipulateBaseConfig,
        i = this.SceneItem.ActorComp.ActorLocation,
        e = Vector_1.Vector.Create(0, 0, 0),
        s = CameraController_1.CameraController.CameraRotator,
        s =
          ((s.Pitch += t.抛物瞄准模式仰角),
          s.Vector(e),
          e.Normalize(),
          e.MultiplyEqual(t.抛物瞄准模式初速度),
          UE.NewArray(UE.BuiltinByte)),
        h =
          (s.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic),
          s.Add(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster),
          s.Add(QueryTypeDefine_1.KuroObjectTypeQuery.Destructible),
          UE.GameplayStatics.Blueprint_PredictProjectilePath_ByObjectType(
            this.SceneItem.ActorComp.Owner,
            this._nr,
            this.unr,
            this.cnr,
            i,
            e.ToUeVector(),
            !0,
            this.SceneItem.ManipulateBaseConfig.抛物瞄准射线检测半径,
            s,
            !1,
            this.mnr,
            this.SceneItem?.ManipulateBaseConfig?.抛物瞄准射线Debug ? 1 : 0,
            5,
            10,
            10,
            t.抛物瞄准模式重力加速度,
          ),
          (0, puerts_1.$unref)(this.unr));
      for (let e = 0; e < h.Num(); e++) {
        let t = h.Get(e);
        (t = t.op_Subtraction(i)), h.Set(e, t);
      }
      this.gnr.SetSplinePoints(h, 0, !0),
        this.Cnr.K2_SetActorLocation(i, !1, void 0, !0),
        EffectSystem_1.EffectSystem.GetEffectActor(
          this.fnr,
        ).K2_SetActorLocation(
          h.Get(h.Num() - 1).op_Addition(i),
          !1,
          void 0,
          !0,
        );
    }
  }
  ynr() {
    EffectSystem_1.EffectSystem.IsValid(this.dnr) &&
      (EffectSystem_1.EffectSystem.StopEffectById(
        this.dnr,
        "[SceneItemManipulableHoldState.ClearProjectileSpline]",
        !0,
      ),
      (this.dnr = 0)),
      this.Cnr?.IsValid() &&
        (ActorSystem_1.ActorSystem.Put(this.Cnr),
        (this.Cnr = void 0),
        (this.gnr = void 0)),
      EffectSystem_1.EffectSystem.IsValid(this.fnr) &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.fnr,
          "[SceneItemManipulableHoldState.ClearProjectileSpline]",
          !0,
        ),
        (this.fnr = 0));
  }
  EnterProjectileAimMode() {
    this.Yrr(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RemoveSubCameraTag,
        this.inr,
      ),
      (this.pnr = void 0);
    var t = this.SceneItem.ManipulateBaseConfig.抛物瞄准模式镜头;
    void 0 !== t &&
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AddSubCameraTag,
        t,
      ),
      (this.pnr = t));
  }
  ExitProjectileAimMode() {
    this.ynr();
    var t = this.SceneItem.ManipulateBaseConfig.抛物瞄准模式镜头;
    void 0 !== t &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RemoveSubCameraTag,
        t,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AddSubCameraTag,
        this.inr,
      ),
      (this.pnr = this.inr);
  }
}
exports.SceneItemManipulableHoldState = SceneItemManipulableHoldState;
//# sourceMappingURL=SceneItemManipulableHoldState.js.map

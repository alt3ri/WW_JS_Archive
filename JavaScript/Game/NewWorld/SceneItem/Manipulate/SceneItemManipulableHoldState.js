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
      (this.pYi = void 0),
      (this.Znr = void 0),
      (this.rsr = void 0),
      (this.rvi = 0),
      (this.jye = Vector_1.Vector.Create()),
      (this.z_t = Vector_1.Vector.Create()),
      (this.nsr = void 0),
      (this.ssr = void 0),
      (this.asr = (0, puerts_1.$ref)(void 0)),
      (this.hsr = (0, puerts_1.$ref)(void 0)),
      (this.lsr = (0, puerts_1.$ref)(void 0)),
      (this._sr = UE.NewArray(UE.Actor)),
      (this.usr = void 0),
      (this.csr = void 0),
      (this.msr = void 0),
      (this.dsr = void 0),
      (this.Csr = void 0),
      (this.pYi = e),
      (this.Znr = i),
      (this.rsr = s),
      (this.StateType = "BeHolding");
  }
  SetEnterCallback(t) {
    this.EnterCallback = t;
  }
  OnEnter() {
    this.StartCameraShake(this.pYi),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AddSubCameraTag,
        this.Znr,
      ),
      (this.Csr = this.Znr),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AddExtraHoldingTags,
        this.rsr,
      ),
      (this.SceneItem.ActorComp.PhysicsMode = 2),
      this.SceneItem.ActorComp.GetPrimitiveComponent().SetPhysicsLinearVelocity(
        Vector_1.Vector.ZeroVector,
      ),
      this._sr.Add(this.SceneItem.ActorComp.Owner),
      this._sr.Add(Global_1.Global.BaseCharacter.CharacterActorComponent.Owner),
      this.EnterCallback && this.EnterCallback(),
      FNameUtil_1.FNameUtil.IsNothing(
        this.SceneItem.ManipulateBaseConfig.保持状态碰撞预设,
      ) ||
        this.SceneItem.ActorComp.GetPrimitiveComponent().SetCollisionProfileName(
          this.SceneItem.ManipulateBaseConfig.保持状态碰撞预设,
        ),
      this.SceneItem.Config?.HoldCfg?.TrackTarget && this.gsr(),
      this.SceneItem.IsProjectileAimMode && this.Qnr();
    var t =
        Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.GetComponent(
          188,
        ),
      e =
        (t.AddTag(-1011082332),
        this.SceneItem.ManipulateBaseConfig?.抛物瞄准模式开关 ||
          t.AddTag(510134989),
        this.SceneItem.Entity.GetComponent(124));
    e?.Valid ? t.AddTag(882475449) : t.AddTag(1892366727);
  }
  OnTick(t) {
    this.Timer += t;
    (t = this.osr()),
      (this.SceneItem.MovementTargetLocation = t.Loc),
      (this.SceneItem.MovementTargetRotation = t.Rot),
      (t = Vector_1.Vector.Distance(
        this.SceneItem.ActorComp.ActorLocationProxy,
        Vector_1.Vector.Create(t.Loc),
      ));
    return !(
      t > ConfigManager_1.ConfigManager.ManipulateConfig.DisconnectDistance ||
      (this.SceneItem.Config?.HoldCfg?.TrackTarget && this.fsr(),
      this.SceneItem.IsProjectileAimMode && this.psr(),
      0)
    );
  }
  OnExit() {
    this.StopCameraShake(),
      void 0 !== this.Csr &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RemoveSubCameraTag,
          this.Csr,
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RemoveExtraHoldingTags,
        this.rsr,
      ),
      this._sr.Empty(),
      this.SceneItem.Config?.HoldCfg?.TrackTarget && this.vsr(),
      this.Msr();
    var t =
      Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(
        188,
      );
    t?.RemoveTag(-1011082332),
      t?.RemoveTag(510134989),
      t?.RemoveTag(-624589333),
      t?.RemoveTag(-1070569477),
      this.SceneItem?.LastHoldingLocation.DeepCopy(
        this.SceneItem.ActorComp.ActorLocationProxy,
      );
  }
  osr() {
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
        this.SceneItem.Entity.GetComponent(124));
    return (
      t?.Valid &&
        ((e = new UE.Rotator(0, -t.Rotation, 0)),
        (s = UE.KismetMathLibrary.ComposeRotators(e, s))),
      { Loc: i, Rot: s }
    );
  }
  fsr() {
    var t, e;
    this.ssr &&
      ((t = this.SceneItem.ActorComp.ActorLocationProxy),
      (e = this.Esr(t, this.z_t)),
      this.ssr.SetSplinePoints(e, 0, !0),
      this.nsr.K2_SetActorLocation(t.ToUeVector(), !1, void 0, !0));
  }
  vsr() {
    EffectSystem_1.EffectSystem.IsValid(this.rvi) &&
      (EffectSystem_1.EffectSystem.StopEffectById(
        this.rvi,
        "[SceneItemManipulableHoldState.ClearCurSplineAndEffectHandle]",
        !0,
      ),
      (this.rvi = 0)),
      this.nsr?.IsValid() &&
        (ActorSystem_1.ActorSystem.Put(this.nsr),
        (this.nsr = void 0),
        (this.ssr = void 0));
  }
  gsr() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
      this.SceneItem.Config.HoldCfg.TrackTarget.EntityId,
    );
    t &&
      (this.z_t.Set(t.Transform.Pos.X, t.Transform.Pos.Y, t.Transform.Pos.Z),
      (t = this.Esr(this.SceneItem.ActorComp.ActorLocationProxy, this.z_t)),
      (t = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(
        this.z_t,
        t,
        this.SceneItem.Config.HoldCfg.TrackTarget.EffectPath,
      ))) &&
      ((this.rvi = t.EffectHandle),
      (this.nsr = t.SplineActor),
      (this.ssr = t.SplineComp));
  }
  Esr(t, e) {
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
  Qnr() {
    var t = this.SceneItem.ManipulateBaseConfig,
      e = this.SceneItem.ActorComp.ActorLocation,
      i = (0, puerts_1.$unref)(this.hsr),
      e = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(
        Vector_1.Vector.Create(e),
        i,
        t.抛物瞄准模式样条特效.AssetPathName.toString(),
      );
    e &&
      ((this.usr = e.EffectHandle),
      (this.csr = e.SplineActor),
      (this.msr = e.SplineComp),
      (this.dsr = EffectSystem_1.EffectSystem.SpawnEffect(
        GlobalData_1.GlobalData.World,
        MathUtils_1.MathUtils.DefaultTransform,
        t.抛物瞄准模式终点特效.AssetPathName.toString(),
        "[SceneItemManipulableHoldState.GeneratePredictProjectilePoints]",
        new EffectContext_1.EffectContext(this.SceneItem?.Entity.Id),
      )));
  }
  psr() {
    if (this.msr) {
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
            this.asr,
            this.hsr,
            this.lsr,
            i,
            e.ToUeVector(),
            !0,
            this.SceneItem.ManipulateBaseConfig.抛物瞄准射线检测半径,
            s,
            !1,
            this._sr,
            this.SceneItem?.ManipulateBaseConfig?.抛物瞄准射线Debug ? 1 : 0,
            5,
            10,
            10,
            t.抛物瞄准模式重力加速度,
          ),
          (0, puerts_1.$unref)(this.hsr));
      for (let e = 0; e < h.Num(); e++) {
        let t = h.Get(e);
        (t = t.op_Subtraction(i)), h.Set(e, t);
      }
      this.msr.SetSplinePoints(h, 0, !0),
        this.csr.K2_SetActorLocation(i, !1, void 0, !0),
        EffectSystem_1.EffectSystem.GetEffectActor(
          this.dsr,
        ).K2_SetActorLocation(
          h.Get(h.Num() - 1).op_Addition(i),
          !1,
          void 0,
          !0,
        );
    }
  }
  Msr() {
    EffectSystem_1.EffectSystem.IsValid(this.usr) &&
      (EffectSystem_1.EffectSystem.StopEffectById(
        this.usr,
        "[SceneItemManipulableHoldState.ClearProjectileSpline]",
        !0,
      ),
      (this.usr = 0)),
      this.csr?.IsValid() &&
        (ActorSystem_1.ActorSystem.Put(this.csr),
        (this.csr = void 0),
        (this.msr = void 0)),
      EffectSystem_1.EffectSystem.IsValid(this.dsr) &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.dsr,
          "[SceneItemManipulableHoldState.ClearProjectileSpline]",
          !0,
        ),
        (this.dsr = 0));
  }
  EnterProjectileAimMode() {
    this.Qnr(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RemoveSubCameraTag,
        this.Znr,
      ),
      (this.Csr = void 0);
    var t = this.SceneItem.ManipulateBaseConfig.抛物瞄准模式镜头;
    void 0 !== t &&
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AddSubCameraTag,
        t,
      ),
      (this.Csr = t));
  }
  ExitProjectileAimMode() {
    this.Msr();
    var t = this.SceneItem.ManipulateBaseConfig.抛物瞄准模式镜头;
    void 0 !== t &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RemoveSubCameraTag,
        t,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AddSubCameraTag,
        this.Znr,
      ),
      (this.Csr = this.Znr);
  }
}
exports.SceneItemManipulableHoldState = SceneItemManipulableHoldState;
//# sourceMappingURL=SceneItemManipulableHoldState.js.map

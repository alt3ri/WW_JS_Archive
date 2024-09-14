"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulableHoldState = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
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
  ActorUtils_1 = require("../../../Utils/ActorUtils"),
  SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState"),
  PORTAL_COLLISION = "PortalPlane";
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
      (this.asr = void 0),
      (this.B0a = void 0),
      (this.hsr = void 0),
      (this.q0a = void 0),
      (this.R0a = void 0),
      (this.lsr = void 0),
      (this._sr = UE.NewArray(UE.Actor)),
      (this.usr = void 0),
      (this.O0a = void 0),
      (this.csr = void 0),
      (this.k0a = void 0),
      (this.msr = void 0),
      (this.G0a = void 0),
      (this.dsr = void 0),
      (this.Csr = void 0),
      (this.N0a = !1),
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
          190,
        ),
      e =
        (t.AddTag(-1011082332),
        this.SceneItem.ManipulateBaseConfig?.抛物瞄准模式开关 ||
          t.AddTag(510134989),
        this.SceneItem.Entity.GetComponent(125));
    e?.Valid ? t.AddTag(882475449) : t.AddTag(1892366727);
  }
  OnTick(t) {
    this.Timer += t;
    (t = this.UpdateTargetLocationAndRotation()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Temp", 32, "[LocRot]Tick", ["loc", t.Loc]),
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
        190,
      );
    t?.RemoveTag(-1011082332),
      t?.RemoveTag(510134989),
      t?.RemoveTag(-624589333),
      t?.RemoveTag(-1070569477),
      this.SceneItem?.LastHoldingLocation.DeepCopy(
        this.SceneItem.ActorComp.ActorLocationProxy,
      );
  }
  UpdateTargetLocationAndRotation() {
    var t = this.osr();
    return (
      (this.SceneItem.MovementTargetLocation = t.Loc),
      (this.SceneItem.MovementTargetRotation = t.Rot),
      t
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
        this.SceneItem.Entity.GetComponent(125));
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
    this.hsr || (this.hsr = UE.NewArray(UE.Vector));
    var t = this.SceneItem.ManipulateBaseConfig,
      e = this.SceneItem.ActorComp.ActorLocation,
      e = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(
        Vector_1.Vector.Create(e),
        this.hsr,
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
        new EffectContext_1.EffectContext(this.SceneItem.Entity.Id),
      )),
      this.q0a || (this.q0a = UE.NewArray(UE.Vector)),
      (e = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(
        Vector_1.Vector.Create(this.R0a),
        this.q0a,
        t.抛物瞄准模式样条特效.AssetPathName.toString(),
      ))) &&
      ((this.O0a = e.EffectHandle),
      (this.k0a = e.SplineActor),
      (this.G0a = e.SplineComp));
  }
  psr() {
    if (this.msr) {
      var t = this.SceneItem.ManipulateBaseConfig,
        s = this.SceneItem.ActorComp.ActorLocation,
        e = Vector_1.Vector.Create(0, 0, 0),
        h = CameraController_1.CameraController.CameraRotator,
        h =
          ((h.Pitch += t.抛物瞄准模式仰角),
          h.Vector(e),
          e.Normalize(),
          e.MultiplyEqual(t.抛物瞄准模式初速度),
          UE.NewArray(UE.BuiltinByte)),
        r =
          (h.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic),
          h.Add(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster),
          h.Add(QueryTypeDefine_1.KuroObjectTypeQuery.Destructible),
          h.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet),
          new UE.PredictProjectilePathParams());
      (r.StartLocation = s),
        (r.LaunchVelocity = e.ToUeVector()),
        (r.bTraceWithCollision = !0),
        (r.ProjectileRadius = t.抛物瞄准射线检测半径),
        (r.ObjectTypes = h),
        (r.bTraceComplex = !1),
        (r.ActorsToIgnore = this._sr),
        (r.DrawDebugType = this.SceneItem?.ManipulateBaseConfig
          ?.抛物瞄准射线Debug
          ? 1
          : 0),
        (r.DrawDebugTime = 5),
        (r.MaxSimTime = 10),
        (r.SimFrequency = 10),
        (r.OverrideGravityZ = t.抛物瞄准模式重力加速度);
      const v = (0, puerts_1.$ref)(new UE.PredictProjectilePathResult());
      UE.GameplayStatics.Blueprint_PredictProjectilePath_Advanced(
        this.SceneItem.ActorComp.Owner,
        r,
        v,
      );
      var o,
        a = (0, puerts_1.$unref)(v);
      (this.asr = a.HitResult),
        (this.lsr = a.LastTraceDestination),
        (this.B0a = a.PathData),
        (this.N0a =
          this.asr.bBlockingHit &&
          this.asr.Component.GetCollisionProfileName().op_Equality(
            FNameUtil_1.FNameUtil.GetDynamicFName(PORTAL_COLLISION),
          )),
        this.N0a &&
          ((e = Vector_1.Vector.Create(this.asr.Location)),
          (h = this.asr.Actor),
          (t = Vector_1.Vector.Create(h.GetActorForwardVector())),
          (h = Vector_1.Vector.Create(this.SceneItem.ActorComp.ActorLocation)),
          (o = Vector_1.Vector.Create()),
          h.Subtraction(e, o),
          (o.Z = 0),
          o.Normalize(),
          o.DotProduct(t) < -MathUtils_1.MathUtils.KindaSmallNumber) &&
          (this.N0a = !1),
        void 0 === this.hsr
          ? (this.hsr = UE.NewArray(UE.Vector))
          : this.hsr?.Empty();
      for (let e = 0; e < this.B0a.Num(); e++) {
        let t = this.B0a.Get(e).Location;
        (t = t.op_Subtraction(s)), this.hsr.Add(t);
      }
      ModelManager_1.ModelManager.ManipulaterModel?.SetProjectilePath(this.hsr),
        this.msr.SetSplinePoints(this.hsr, 0, !0),
        this.csr.K2_SetActorLocation(s, !1, void 0, !0);
      let i = Vector_1.Vector.ZeroVectorProxy;
      if (this.N0a)
        do {
          var n = this.asr.Actor;
          let t = void 0;
          n = (t = (
            UE.KuroStaticLibrary.IsImplementInterface(
              n.GetClass(),
              UE.BPI_CreatureInterface_C.StaticClass(),
            )
              ? ActorUtils_1.ActorUtils
              : ModelManager_1.ModelManager.SceneInteractionModel
          ).GetEntityByActor(n))?.Entity?.GetComponent(200);
          if (n) {
            var l = n.GetPortalModel();
            let t = n.GetCreatureDataId(),
              e = !0;
            "B" === l && ((t = n.GetPairCreatureDataId()), (e = !1));
            l = ModelManager_1.ModelManager.PortalModel.GetPortal(t);
            if (!l || !l.Portal1Enable || !l.Portal2Enable) break;
            var [n, l] = e
              ? [l.PortalWorldTransform1, l.PortalWorldTransform2]
              : [l.PortalWorldTransform2, l.PortalWorldTransform1];
            if (!n || !l) break;
            var _ = n.InverseTransformVector(this.lsr.Velocity),
              _ = new UE.Transform(
                new UE.Quat(Vector_1.Vector.ZAxisVector, Math.PI),
              ).TransformVector(_),
              _ = l.TransformVector(_),
              n =
                ((r.LaunchVelocity = _),
                n.InverseTransformPosition(
                  this.B0a.Get(this.B0a.Num() - 1).Location,
                )),
              n = new UE.Transform(
                new UE.Quat(Vector_1.Vector.ZAxisVector, Math.PI),
              ).TransformPosition(n),
              l = ((n.X = -n.X), l.TransformPosition(n)),
              n = Vector_1.Vector.Create(_),
              c = (n.Normalize(), l.op_Addition(n.ToUeVector()));
            r.StartLocation = c;
            const v = (0, puerts_1.$ref)(new UE.PredictProjectilePathResult());
            UE.GameplayStatics.Blueprint_PredictProjectilePath_Advanced(
              this.SceneItem.ActorComp.Owner,
              r,
              v,
            ),
              (a = (0, puerts_1.$unref)(v)),
              void 0 === this.q0a
                ? (this.q0a = UE.NewArray(UE.Vector))
                : this.q0a?.Empty();
            for (let e = 0; e < a.PathData.Num(); e++) {
              let t = a.PathData.Get(e).Location;
              (t = t.op_Subtraction(c)), this.q0a.Add(t);
            }
            ModelManager_1.ModelManager.ManipulaterModel?.SetAfterPortalProjectilePath(
              this.q0a,
            ),
              ModelManager_1.ModelManager.ManipulaterModel?.SetAfterPortalStartPosition(
                c,
              ),
              this.G0a.SetSplinePoints(this.q0a, 0, !0),
              this.k0a.K2_SetActorLocation(c, !1, void 0, !0),
              (i = Vector_1.Vector.Create(a.LastTraceDestination.Location)),
              (this.R0a = c);
          }
        } while (0);
      else
        (i = Vector_1.Vector.Create(
          this.hsr.Get(this.hsr.Num() - 1),
        )).AdditionEqual(Vector_1.Vector.Create(s)),
          (this.q0a = void 0),
          ModelManager_1.ModelManager.ManipulaterModel?.SetAfterPortalProjectilePath(
            void 0,
          ),
          ModelManager_1.ModelManager.ManipulaterModel?.SetAfterPortalStartPosition(
            void 0,
          ),
          this.G0a.SetSplinePoints(UE.NewArray(UE.Vector), 0, !0),
          this.k0a.K2_SetActorLocation(
            Vector_1.Vector.ZeroVector,
            !1,
            void 0,
            !0,
          );
      EffectSystem_1.EffectSystem.GetEffectActor(this.dsr).K2_SetActorLocation(
        i.ToUeVector(),
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
      EffectSystem_1.EffectSystem.IsValid(this.O0a) &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.O0a,
          "[SceneItemManipulableHoldState.ClearProjectileSpline]",
          !0,
        ),
        (this.usr = 0)),
      this.csr?.IsValid() &&
        (ActorSystem_1.ActorSystem.Put(this.csr),
        (this.csr = void 0),
        (this.msr = void 0)),
      this.k0a?.IsValid() &&
        (ActorSystem_1.ActorSystem.Put(this.k0a),
        (this.k0a = void 0),
        (this.G0a = void 0)),
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

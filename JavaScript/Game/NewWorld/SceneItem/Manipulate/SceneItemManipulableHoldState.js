"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulableHoldState = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
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
      (this.qga = void 0),
      (this.hsr = void 0),
      (this.Oga = void 0),
      (this.N0a = void 0),
      (this.lsr = void 0),
      (this._sr = UE.NewArray(UE.Actor)),
      (this.usr = void 0),
      (this.kga = void 0),
      (this.csr = void 0),
      (this.Gga = void 0),
      (this.msr = void 0),
      (this.Nga = void 0),
      (this.dsr = void 0),
      (this.Csr = void 0),
      (this.Fga = !1),
      (this.pYi = e),
      (this.Znr = i),
      (this.rsr = s);
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
          203,
        ),
      e =
        (t.AddTag(-1011082332),
        this.SceneItem.ManipulateBaseConfig?.抛物瞄准模式开关 ||
          t.AddTag(510134989),
        this.SceneItem.Entity.GetComponent(136));
    e?.Valid ? t.AddTag(882475449) : t.AddTag(1892366727);
  }
  OnTick(t) {
    this.Timer += t;
    t = this.UpdateTargetLocationAndRotation();
    return !(
      Vector_1.Vector.Distance(
        this.SceneItem.ActorComp.ActorLocationProxy,
        Vector_1.Vector.Create(t.Loc),
      ) > ConfigManager_1.ConfigManager.ManipulateConfig.DisconnectDistance ||
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
        203,
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
        this.SceneItem.Entity.GetComponent(136));
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
      this.ssr.D_SetSplinePoints(e, 0, !0),
      this.nsr.D_K2_SetActorLocation(t.ToUeVector(), !1, void 0, !0));
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
        (ActorSystem_1.ActorSystem.Put(
          "SceneItemManipulableHoldState.ClearEffectSpline",
          this.nsr,
        ),
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
    var i = UE.NewArray(UE.VectorDouble),
      s =
        (i.Add(Vector_1.Vector.ZeroVectorDouble),
        Vector_1.Vector.Distance(t, e)),
      h = this.SceneItem.Config.HoldCfg.TrackTarget.EffectLength;
    return (
      e.Subtraction(t, this.jye),
      h < s && (this.jye.Normalize(), this.jye.Multiply(h, this.jye)),
      i.Add(this.jye.ToUeVector()),
      i
    );
  }
  Qnr() {
    this.hsr || (this.hsr = UE.NewArray(UE.VectorDouble));
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
        MathUtils_1.MathUtils.DefaultTransformDouble,
        t.抛物瞄准模式终点特效.AssetPathName.toString(),
        "[SceneItemManipulableHoldState.GeneratePredictProjectilePoints]",
        new EffectContext_1.EffectContext(this.SceneItem.Entity.Id),
      )),
      this.Oga || (this.Oga = UE.NewArray(UE.VectorDouble)),
      (e = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(
        Vector_1.Vector.Create(this.N0a),
        this.Oga,
        t.抛物瞄准模式样条特效.AssetPathName.toString(),
      ))) &&
      ((this.kga = e.EffectHandle),
      (this.Gga = e.SplineActor),
      (this.Nga = e.SplineComp));
  }
  psr() {
    if (this.msr) {
      var t = this.SceneItem.ManipulateBaseConfig,
        e = this.SceneItem.ActorComp.ActorLocation,
        s = Vector_1.Vector.Create(0, 0, 0),
        h = CameraController_1.CameraController.CameraRotator,
        r = Rotator_1.Rotator.Create(t.抛物瞄准模式仰角, 0, 0),
        a = Rotator_1.Rotator.Create(),
        r =
          (MathUtils_1.MathUtils.ComposeRotator(r, h, a),
          a.Vector(s),
          s.Normalize(),
          s.MultiplyEqual(t.抛物瞄准模式初速度),
          UE.NewArray(UE.BuiltinByte)),
        o =
          (r.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic),
          r.Add(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster),
          r.Add(QueryTypeDefine_1.KuroObjectTypeQuery.Destructible),
          r.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet),
          new UE.PredictProjectilePathParams()),
        h = UE.KismetMathLibrary.WD_WorldToLocal(
          GlobalData_1.GlobalData.World,
          e,
        );
      (o.StartLocation = h),
        (o.LaunchVelocity = s.ToUeVectorOld()),
        (o.bTraceWithCollision = !0),
        (o.ProjectileRadius = t.抛物瞄准射线检测半径),
        (o.ObjectTypes = r),
        (o.bTraceComplex = !1),
        (o.ActorsToIgnore = this._sr),
        (o.DrawDebugType = this.SceneItem?.ManipulateBaseConfig
          ?.抛物瞄准射线Debug
          ? 1
          : 0),
        (o.DrawDebugTime = 5),
        (o.MaxSimTime = 10),
        (o.SimFrequency = 10),
        this.SceneItem.ActorComp.ActorInitNotStandardGravity &&
          ((o.bOverrideGravity = !0),
          (o.OverrideGravity = this.SceneItem.ActorComp.FakeGravityValue)),
        (o.OverrideGravityZ = t.抛物瞄准模式重力加速度);
      const f = (0, puerts_1.$ref)(new UE.PredictProjectilePathResult());
      UE.GameplayStatics.Blueprint_PredictProjectilePath_Advanced(
        this.SceneItem.ActorComp.Owner,
        o,
        f,
      );
      var n = (0, puerts_1.$unref)(f),
        l =
          ((this.asr = n.HitResult),
          (this.lsr = n.LastTraceDestination),
          (this.qga = n.PathData),
          (this.Fga =
            this.asr.bBlockingHit &&
            this.asr.Component.GetCollisionProfileName().op_Equality(
              FNameUtil_1.FNameUtil.GetDynamicFName(PORTAL_COLLISION),
            )),
          this.Fga &&
            ((a = Vector_1.Vector.Create(this.asr.Location)),
            (s = this.asr.Actor),
            (r = Vector_1.Vector.Create(s.GetActorForwardVector())),
            (t = Vector_1.Vector.Create(
              this.SceneItem.ActorComp.ActorLocation,
            )),
            (s = Vector_1.Vector.Create()),
            t.Subtraction(a, s),
            (s.Z = 0),
            s.Normalize(),
            s.DotProduct(r) < -MathUtils_1.MathUtils.KindaSmallNumber) &&
            (this.Fga = !1),
          void 0 === this.hsr
            ? (this.hsr = UE.NewArray(UE.VectorDouble))
            : this.hsr?.Empty(),
          new UE.VectorDouble(h));
      for (let e = 0; e < this.qga.Num(); e++) {
        let t = new UE.VectorDouble(this.qga.Get(e).Location);
        (t = t.op_Subtraction(l)), this.hsr.Add(t);
      }
      ModelManager_1.ModelManager.ManipulaterModel?.SetProjectilePath(this.hsr),
        this.msr.D_SetSplinePoints(this.hsr, 0, !0),
        this.csr.D_K2_SetActorLocation(e, !1, void 0, !0);
      let i = Vector_1.Vector.ZeroVectorProxy;
      if (this.Fga)
        do {
          var _ = this.asr.Actor;
          let t = void 0;
          _ = (t = (
            UE.KuroStaticLibrary.IsImplementInterface(
              _.GetClass(),
              UE.BPI_CreatureInterface_C.StaticClass(),
            )
              ? ActorUtils_1.ActorUtils
              : ModelManager_1.ModelManager.SceneInteractionModel
          ).GetEntityByActor(_))?.Entity?.GetComponent(213);
          if (_) {
            var c = _.GetPortalModel();
            let t = _.GetCreatureDataId(),
              e = !0;
            "B" === c && ((t = _.GetPairCreatureDataId()), (e = !1));
            c = ModelManager_1.ModelManager.PortalModel.GetPortal(t);
            if (!c || !c.Portal1Enable || !c.Portal2Enable) break;
            var [_, c] = e
              ? [c.PortalWorldTransform1, c.PortalWorldTransform2]
              : [c.PortalWorldTransform2, c.PortalWorldTransform1];
            if (!_ || !c) break;
            var v = _.InverseTransformVector(
                new UE.VectorDouble(this.lsr.Velocity),
              ),
              v = new UE.TransformDouble(
                new UE.Quat(Vector_1.Vector.ZAxisVector, Math.PI),
              ).TransformVector(v),
              v = c.TransformVector(v),
              E =
                ((o.LaunchVelocity = v.op_ToVector()),
                UE.KismetMathLibrary.WD_LocalToWorld(
                  GlobalData_1.GlobalData.World,
                  this.qga.Get(this.qga.Num() - 1).Location,
                )),
              _ = _.InverseTransformPosition(E),
              E = new UE.TransformDouble(
                new UE.Quat(Vector_1.Vector.ZAxisVector, Math.PI),
              ).TransformPosition(_),
              _ = ((E.X = -E.X), c.TransformPosition(E)),
              c = Vector_1.Vector.Create(v),
              E = (c.Normalize(), _.op_Addition(c.ToUeVector())),
              v = UE.KismetMathLibrary.WD_WorldToLocal(
                GlobalData_1.GlobalData.World,
                E,
              );
            o.StartLocation = v;
            const f = (0, puerts_1.$ref)(new UE.PredictProjectilePathResult());
            UE.GameplayStatics.Blueprint_PredictProjectilePath_Advanced(
              this.SceneItem.ActorComp.Owner,
              o,
              f,
            ),
              (n = (0, puerts_1.$unref)(f)),
              void 0 === this.Oga
                ? (this.Oga = UE.NewArray(UE.VectorDouble))
                : this.Oga?.Empty();
            var d = new UE.VectorDouble(v);
            for (let e = 0; e < n.PathData.Num(); e++) {
              let t = new UE.VectorDouble(n.PathData.Get(e).Location);
              (t = t.op_Subtraction(d)), this.Oga.Add(t);
            }
            ModelManager_1.ModelManager.ManipulaterModel?.SetAfterPortalProjectilePath(
              this.Oga,
            ),
              ModelManager_1.ModelManager.ManipulaterModel?.SetAfterPortalStartPosition(
                E,
              ),
              this.Nga.D_SetSplinePoints(this.Oga, 0, !0),
              this.Gga.D_K2_SetActorLocation(E, !1, void 0, !0),
              (i = Vector_1.Vector.Create(
                this.Oga.Get(this.Oga.Num() - 1),
              )).AdditionEqual(Vector_1.Vector.Create(E)),
              (this.N0a = E);
          }
        } while (0);
      else
        (i = Vector_1.Vector.Create(
          this.hsr.Get(this.hsr.Num() - 1),
        )).AdditionEqual(Vector_1.Vector.Create(e)),
          (this.Oga = void 0),
          ModelManager_1.ModelManager.ManipulaterModel?.SetAfterPortalProjectilePath(
            void 0,
          ),
          ModelManager_1.ModelManager.ManipulaterModel?.SetAfterPortalStartPosition(
            void 0,
          ),
          this.Nga.D_SetSplinePoints(UE.NewArray(UE.VectorDouble), 0, !0),
          this.Gga.D_K2_SetActorLocation(
            Vector_1.Vector.ZeroVectorDouble,
            !1,
            void 0,
            !0,
          );
      EffectSystem_1.EffectSystem.GetEffectActor(
        this.dsr,
      ).D_K2_SetActorLocation(i.ToUeVector(), !1, void 0, !0);
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
      EffectSystem_1.EffectSystem.IsValid(this.kga) &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.kga,
          "[SceneItemManipulableHoldState.ClearProjectileSpline]",
          !0,
        ),
        (this.usr = 0)),
      this.csr?.IsValid() &&
        (ActorSystem_1.ActorSystem.Put(
          "SceneItemManipulableHoldState.ClearProjectileSpline1",
          this.csr,
        ),
        (this.csr = void 0),
        (this.msr = void 0)),
      this.Gga?.IsValid() &&
        (ActorSystem_1.ActorSystem.Put(
          "SceneItemManipulableHoldState.ClearProjectileSpline2",
          this.Gga,
        ),
        (this.Gga = void 0),
        (this.Nga = void 0)),
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

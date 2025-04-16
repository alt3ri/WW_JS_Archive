"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, r) {
    var s,
      o = arguments.length,
      h =
        o < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(e, t, i, r);
    else
      for (var n = e.length - 1; 0 <= n; n--)
        (s = e[n]) && (h = (o < 3 ? s(h) : 3 < o ? s(t, i, h) : s(t, i)) || h);
    return 3 < o && h && Object.defineProperty(t, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehiclePerformComponent = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  InputEnums_1 = require("../../../Input/InputEnums"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GameBudgetAllocatorConfigCreator_1 = require("../../../World/Define/GameBudgetAllocatorConfigCreator"),
  BaseVehiclePerformComponent_1 = require("./BaseVehiclePerformComponent");
let VehiclePerformComponent = class VehiclePerformComponent extends BaseVehiclePerformComponent_1.BaseVehiclePerformComponent {
  constructor() {
    super(...arguments),
      (this.ActorComp = void 0),
      (this.AnimComp = void 0),
      (this.MoveComp = void 0),
      (this.TagComp = void 0),
      (this.IsBeingImpacted = !1),
      (this.CollisionStrength = 0),
      (this.CollisionDirection = 0),
      (this.CollisionVelocity = Vector_1.Vector.Create()),
      (this.HasRoleAndCtrlByMe = !1),
      (this.IsHidePassenger = !1),
      (this.LastActorRotation = Rotator_1.Rotator.Create()),
      (this.VehicleTagListeners = void 0),
      (this.nEc = void 0),
      (this.OnEnterHitCollision = (e, t, i, r, s) => {
        this.CalculateImpactStrength(s),
          this.CalculateImpactDirection(s),
          (this.IsBeingImpacted = !0),
          this.MoveComp?.EnableUeMovementTick("载具受到碰撞");
      });
  }
  OnStart() {
    if (!super.OnStart()) return !1;
    (this.ActorComp = this.Entity.GetComponent(231)),
      (this.AnimComp = this.Entity.GetComponent(232)),
      (this.MoveComp = this.Entity.GetComponent(233)),
      (this.TagComp = this.Entity.GetComponent(203)),
      (this.HasRoleAndCtrlByMe = !1);
    var e = this.ActorComp?.Owner;
    return (
      e?.IsValid() &&
        e.CapsuleComponent.OnComponentHit.Add(this.OnEnterHitCollision),
      !!this.InitVehicleConfig()
    );
  }
  OnTick(e) {
    this.UpdateRotYawSpeed(e);
  }
  LoadVehicleConfigAsset() {
    if (this.ActorComp?.Actor.VehicleMovementComponent?.IsValid())
      return super.LoadVehicleConfigAsset();
  }
  Enter(e, t) {
    super.Enter(e, t);
    for (const i of this.PassengerInfoMap.values())
      if (i.IsDriver && i.IsRolePassenger()) {
        this.Entity.GameBudgetManagedToken &&
          cpp_1.FKuroGameBudgetAllocatorInterface.MarkActorInFighting(
            GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
              .TsNormalEntityGroupConfig.GroupName,
            this.Entity.GameBudgetManagedToken,
            !0,
          );
        break;
      }
    e.GetComponent(3)?.IsAutonomousProxy && this.AddVehicleTagListeners();
  }
  Leave(e, t = 0) {
    super.Leave(e, t);
    let i = !1;
    for (const r of this.PassengerInfoMap.values())
      if (r.IsDriver && r.IsRolePassenger()) {
        i = !0;
        break;
      }
    i ||
      (this.Entity.GameBudgetManagedToken &&
        cpp_1.FKuroGameBudgetAllocatorInterface.MarkActorInFighting(
          GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
            .TsNormalEntityGroupConfig.GroupName,
          this.Entity.GameBudgetManagedToken,
          !1,
        )),
      e.GetComponent(3)?.Owner?.IsAutonomousProxy &&
        this.RemoveVehicleTagListeners();
  }
  CheckIfCanLeave() {
    return !0;
  }
  CheckIfCanSprint() {
    return !0;
  }
  CheckIfCanRiderSharing() {
    return (
      !!ModelManager_1.ModelManager.VehicleModel?.IsReadyRiderSharing &&
      !ModelManager_1.ModelManager.VehicleModel.IsForbidRiderSharing
    );
  }
  AddVehicleTagListeners() {}
  RemoveVehicleTagListeners() {}
  RefreshRideSharingSkillState() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnVehicleSkillEnableChanged,
      this.CheckIfCanRiderSharing(),
      InputEnums_1.EInputAction.技能1,
    );
  }
  CalculateImpactStrength(e) {
    var t = e.Component,
      i = this.TmpVector1,
      r = this.TmpVector2;
    i.FromUeVector(e.ImpactNormal),
      r.Reset(),
      t && r.FromUeVector(t.GetComponentVelocity()),
      this.ActorComp.ActorVelocityProxy.Subtraction(r, this.CollisionVelocity),
      (this.CollisionStrength = Math.abs(
        Vector_1.Vector.DotProduct(this.CollisionVelocity, i),
      ));
  }
  CalculateImpactDirection(e) {
    var t = this.CollisionVelocity.ToUeVector(),
      i = this.ActorComp.ActorRight,
      i = t.CosineAngle2D(i),
      i = MathCommon_1.MathCommon.RadianToDegree(Math.acos(i)),
      r = this.ActorComp.ActorForward,
      t = t.CosineAngle2D(r),
      r = MathCommon_1.MathCommon.RadianToDegree(Math.acos(t));
    i > MathCommon_1.MathCommon.RightAngle
      ? (this.CollisionDirection = -1 * r)
      : (this.CollisionDirection = r);
  }
  EnterVehiclePerform(e) {
    e.IsRolePassenger(!0) &&
      ((this.HasRoleAndCtrlByMe = !0),
      this.IgnorePlatformCollisionToCamera(!0)),
      this.IsHidePassenger &&
        e.PassengerEntity &&
        this.sEc(e.PassengerEntity, !1);
  }
  LeaveVehiclePerform(e) {
    e.IsRolePassenger(!0) &&
      ((this.HasRoleAndCtrlByMe = !1),
      this.IgnorePlatformCollisionToCamera(!1)),
      this.IsHidePassenger &&
        e.PassengerEntity &&
        this.sEc(e.PassengerEntity, !0);
  }
  sEc(e, t) {
    var i = e.GetComponent(1);
    i?.Valid &&
      ((e = e.Id),
      t
        ? (t = this.nEc?.get(e)) && (i.EnableActor(t), this.nEc.delete(e))
        : (this.nEc || (this.nEc = new Map()),
          (t = i.DisableActor("SetPassengerVisible")),
          this.nEc.set(e, t)));
  }
  IgnorePlatformCollisionToCamera(e) {
    var t = this.ActorComp?.Actor.PlatformActor;
    t?.IsValid() &&
      (t = t.GetComponentByClass(
        UE.StaticMeshComponent.StaticClass(),
      ))?.IsValid() &&
      (e
        ? t.SetCollisionResponseToChannel(
            QueryTypeDefine_1.KuroCollisionChannel.Camera,
            0,
          )
        : t.SetCollisionResponseToChannel(
            QueryTypeDefine_1.KuroCollisionChannel.Camera,
            2,
          ));
  }
  CheckCanPerformHit() {
    return !0;
  }
  OnBulletHit(e, t) {}
  SetGravityDirectForVehicle(e) {
    this.MoveComp.SetGravityDirect(e);
    for (const t of this.PassengerInfoMap.values())
      t.PassengerEntity?.GetComponent(44)?.SetGravityDirectWithoutRotate(e);
  }
  SetGravityDirectForVehicleWithoutRotate(e) {
    this.MoveComp.SetGravityDirectWithoutRotate(e);
    for (const t of this.PassengerInfoMap.values())
      t.PassengerEntity?.GetComponent(44)?.SetGravityDirectWithoutRotate(e);
  }
  GetVehicleVelocity(e) {
    this.ActorComp && e.DeepCopy(this.ActorComp.ActorVelocityProxy);
  }
  UpdateRotYawSpeed(e) {
    var t = this.LastActorRotation.Yaw,
      i = this.ActorComp.ActorRotationProxy.Yaw;
    (this.ActorComp.SimulatedRotYawSpeed =
      MathUtils_1.MathUtils.WrapAngle(i - t) / (0.001 * e)),
      this.LastActorRotation.DeepCopy(this.ActorComp.ActorRotationProxy);
  }
};
(VehiclePerformComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(234)],
  VehiclePerformComponent,
)),
  (exports.VehiclePerformComponent = VehiclePerformComponent);
//# sourceMappingURL=VehiclePerformComponent.js.map

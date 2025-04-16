"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var o,
      n = arguments.length,
      h =
        n < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(t, e, i, s);
    else
      for (var r = t.length - 1; 0 <= r; r--)
        (o = t[r]) && (h = (n < 3 ? o(h) : 3 < n ? o(e, i, h) : o(e, i)) || h);
    return 3 < n && h && Object.defineProperty(e, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UeVehicleMovementTickManageComponent = void 0);
const UE = require("ue"),
  Time_1 = require("../../../../Core/Common/Time"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  UeMovementTickManageComponent_1 = require("../../Common/Component/UeMovementTickManageComponent"),
  MIN_MODEL_BUFFER_TIME = 60;
let UeVehicleMovementTickManageComponent = class UeVehicleMovementTickManageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.ActorComp = void 0),
      (this.VehicleMovement = void 0),
      (this.AnimComp = void 0),
      (this.VehiclePerformComp = void 0),
      (this.VehicleMoveComp = void 0),
      (this.DebugComp = void 0),
      (this.SkelTickMgr = void 0),
      (this.CacheActorLocation = Vector_1.Vector.Create()),
      (this.CacheActorRotator = Rotator_1.Rotator.Create()),
      (this.ForbiddenTickPoseInternal = !1),
      (this.Frozen = !1),
      (this.OnEntityBudgetTickEnableChange = (t) => {});
  }
  static get Dependencies() {
    return [231];
  }
  get ForbiddenTickPose() {
    return this.ForbiddenTickPoseInternal;
  }
  set ForbiddenTickPose(t) {
    this.ForbiddenTickPoseInternal !== t &&
      ((this.ForbiddenTickPoseInternal = t),
      (this.VehicleMovement.bForbiddenTickPose = t));
  }
  OnInit() {
    return !0;
  }
  OnStart() {
    if (
      ((this.ActorComp = this.Entity.GetComponent(231)),
      (this.VehicleMoveComp = this.Entity.GetComponent(233)),
      (this.AnimComp = this.Entity.GetComponent(232)),
      (this.VehiclePerformComp = this.Entity.GetComponent(230)),
      (this.DebugComp = this.Entity.GetComponent(30)),
      (this.SkelTickMgr = this.Entity.GetComponent(112)),
      (this.VehicleMovement = this.ActorComp.Owner.GetComponentByClass(
        UE.KuroVehicleMovementComponent.StaticClass(),
      )),
      !this.VehicleMovement)
    )
      return !1;
    this.VehicleMovement.SetKuroOnlyTickOutside(!0),
      this.VehicleMovement.SetComponentTickEnabled(!1);
    var t = this.ActorComp.Owner.GetComponentByClass(
      UE.CharacterMovementComponent.StaticClass(),
    );
    return (
      !!t &&
      (t.SetKuroOnlyTickOutside(!0),
      t.SetComponentTickEnabled(!1),
      (this.ForbiddenTickPose = 1 < this.Entity.GetTickInterval()),
      UeMovementTickManageComponent_1.UeMovementTickController.AddManager(
        this,
        1,
      ),
      !0)
    );
  }
  OnEnd() {
    return (
      UeMovementTickManageComponent_1.UeMovementTickController.DeleteManager(
        this,
        1,
      ),
      !0
    );
  }
  OnDisable() {}
  OnEnable() {}
  PreProxyTick(t) {
    this.TickMovement(t);
  }
  ProxyTick() {}
  TickMovement(t) {
    if (this.VehicleMovement) {
      this.DebugComp &&
        this.DebugComp.MarkDebugRecord("移动组件更新前 ", void 0, !0);
      for (const n of this.VehiclePerformComp.PassengerInfoMap.values())
        n.PassengerEntity?.GetComponent(30)?.MarkDebugRecord(
          "载具移动组件更新前",
          void 0,
          !0,
        );
      var e,
        i,
        s = this.ActorComp.Owner.CustomTimeDilation;
      this.VehicleMoveComp.CanMove() &&
        !this.VehicleMoveComp.IsSpecialMove &&
        ((e = 1 < this.Entity.GetTickInterval()),
        (this.ForbiddenTickPose = e || this.Frozen),
        e &&
        this.AnimComp?.Valid &&
        this.ActorComp.Owner.WasRecentlyRenderedOnScreen()
          ? t * s < MIN_MODEL_BUFFER_TIME
            ? this.VehicleMovement.KuroTickComponentOutside(
                t * MathUtils_1.MathUtils.MillisecondToSecond * s,
              )
            : ((i = this.AnimComp.GetMeshTransform()),
              this.CacheActorLocation.DeepCopy(
                this.ActorComp.ActorLocationProxy,
              ),
              this.CacheActorRotator.DeepCopy(
                this.ActorComp.ActorRotationProxy,
              ),
              this.VehicleMovement.KuroTickComponentOutside(
                t * MathUtils_1.MathUtils.MillisecondToSecond * s,
              ),
              this.ActorComp.ResetAllCachedTime(),
              (this.CacheActorLocation.Equals(
                this.ActorComp.ActorLocationProxy,
              ) &&
                this.CacheActorRotator.Equals(
                  this.ActorComp.ActorRotationProxy,
                )) ||
                this.AnimComp.SetModelBuffer(i, t))
          : ((i = e ? t : Time_1.Time.DeltaTime),
            this.VehicleMovement.KuroTickComponentOutside(
              i * MathUtils_1.MathUtils.MillisecondToSecond * s,
            ),
            this.ActorComp.ResetAllCachedTime())),
        this.DebugComp &&
          this.DebugComp.MarkDebugRecord("移动组件更新后", void 0, !0);
      for (const h of this.VehiclePerformComp.PassengerInfoMap.values()) {
        var o = h.PassengerEntity?.GetComponent(30);
        h.PassengerEntity?.GetComponent(1)?.ResetAllCachedTime(),
          o?.MarkDebugRecord("载具移动组件更新后", void 0, !0);
      }
    }
  }
};
(UeVehicleMovementTickManageComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(241)],
  UeVehicleMovementTickManageComponent,
)),
  (exports.UeVehicleMovementTickManageComponent =
    UeVehicleMovementTickManageComponent);
//# sourceMappingURL=UeVehicleMovementTickManageComponent.js.map

"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, e, s) {
    var o,
      h = arguments.length,
      n =
        h < 3
          ? i
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(i, e))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, i, e, s);
    else
      for (var r = t.length - 1; 0 <= r; r--)
        (o = t[r]) && (n = (h < 3 ? o(n) : 3 < h ? o(i, e, n) : o(i, e)) || n);
    return 3 < h && n && Object.defineProperty(i, e, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UeMovementTickManageComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  MIN_MODEL_BUFFER_TIME = 60;
let UeMovementTickManageComponent = class UeMovementTickManageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.o4o = void 0),
      (this.oRe = void 0),
      (this.Msn = void 0),
      (this.Esn = void 0),
      (this.Ssn = Vector_1.Vector.Create()),
      (this.Gwa = Rotator_1.Rotator.Create()),
      (this.ysn = !1),
      (this.Frozen = !1),
      (this.Isn = 0),
      (this.OnEntityBudgetTickEnableChange = (t) => {
        this.oRe?.Valid && t && this.oRe.ConsumeRootMotion();
      });
  }
  static get Dependencies() {
    return [3];
  }
  get ForbiddenTickPose() {
    return this.ysn;
  }
  set ForbiddenTickPose(t) {
    this.ysn !== t && ((this.ysn = t), (this.o4o.bForbiddenTickPose = t));
  }
  OnInit() {
    return !0;
  }
  OnStart() {
    return (
      (this.Hte = this.Entity.GetComponent(3)),
      (this.Msn = this.Entity.GetComponent(38)),
      (this.o4o = this.Hte.Owner.GetComponentByClass(
        UE.CharacterMovementComponent.StaticClass(),
      )),
      (this.Esn = this.Entity.GetComponent(27)),
      !!this.o4o &&
        (this.o4o.SetKuroOnlyTickOutside(!0),
        this.o4o.SetComponentTickEnabled(!1),
        (this.oRe = this.Entity.GetComponent(163)),
        (this.ForbiddenTickPose = 1 < this.Entity.GetTickInterval()),
        (this.Isn = Time_1.Time.Frame),
        !0)
    );
  }
  OnDisable() {
    this.Hte?.Actor && (this.Hte.Actor.BasedMovement.MovementBase = void 0),
      this.Hte?.IsRoleAndCtrlByMe &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Movement",
          6,
          "UeMovementTickManageComponent Disable",
          ["Entity", this.Entity.Id],
          ["DisableInfo", this.DumpDisableInfo()],
        );
  }
  OnEnable() {
    this.Hte?.IsRoleAndCtrlByMe &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Movement", 6, "UeMovementTickManageComponent Enable", [
        "Entity",
        this.Entity.Id,
      ]),
      (this.Isn = Time_1.Time.Frame);
  }
  OnTick(t) {
    var i, e, s;
    this.Hte?.LastActorLocation.DeepCopy(this.Hte.ActorLocationProxy),
      this.Hte?.IsRoleAndCtrlByMe &&
        1 < Time_1.Time.Frame - this.Isn &&
        Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Movement",
          6,
          "[b1057126] 角色更新异常",
          ["DebugLastTickFrame", this.Isn],
          ["Current", Time_1.Time.Frame],
        ),
      (this.Isn = Time_1.Time.Frame),
      this.o4o &&
        (this.Esn && this.Esn.MarkDebugRecord("移动组件更新前 ", void 0, !0),
        this.Msn.ConsumeForceFallingSpeed(),
        (i = this.Hte.Owner.CustomTimeDilation),
        this.Msn.CanMove &&
          !this.Msn.IsSpecialMove &&
          ((e = 1 < this.Entity.GetTickInterval()),
          (this.ForbiddenTickPose = e || this.Frozen),
          e && this.oRe?.Valid && this.Hte.Owner.WasRecentlyRenderedOnScreen()
            ? t * i < MIN_MODEL_BUFFER_TIME
              ? this.o4o.KuroTickComponentOutside(
                  t * MathUtils_1.MathUtils.MillisecondToSecond * i,
                )
              : ((s = this.oRe.GetMeshTransform()),
                this.Ssn.DeepCopy(this.Hte.ActorLocationProxy),
                this.Gwa.DeepCopy(this.Hte.ActorRotationProxy),
                this.o4o.KuroTickComponentOutside(
                  t * MathUtils_1.MathUtils.MillisecondToSecond * i,
                ),
                this.Hte.ResetAllCachedTime(),
                (this.Ssn.Equals(this.Hte.ActorLocationProxy) &&
                  this.Gwa.Equals(this.Hte.ActorRotationProxy)) ||
                  this.oRe.SetModelBuffer(s, t))
            : ((s = e ? t : Time_1.Time.DeltaTime),
              this.o4o.KuroTickComponentOutside(
                s * MathUtils_1.MathUtils.MillisecondToSecond * i,
              ),
              this.Hte.ResetAllCachedTime())),
        this.Msn.ApplyForceSpeedAndRecordSpeed(),
        this.Esn) &&
        this.Esn.MarkDebugRecord("移动组件更新后", void 0, !0);
  }
};
(UeMovementTickManageComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(101)],
  UeMovementTickManageComponent,
)),
  (exports.UeMovementTickManageComponent = UeMovementTickManageComponent);
//# sourceMappingURL=UeMovementTickManageComponent.js.map

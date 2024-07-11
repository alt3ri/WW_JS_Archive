"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var o,
      h = arguments.length,
      n =
        h < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, i, s);
    else
      for (var r = t.length - 1; 0 <= r; r--)
        (o = t[r]) && (n = (h < 3 ? o(n) : 3 < h ? o(e, i, n) : o(e, i)) || n);
    return 3 < h && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UeMovementTickManageComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils");
let UeMovementTickManageComponent = class UeMovementTickManageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.s3o = void 0),
      (this.oRe = void 0),
      (this.Osn = void 0),
      (this.ksn = void 0),
      (this.Fsn = Vector_1.Vector.Create()),
      (this.Vsn = !1),
      (this.Frozen = !1),
      (this.Hsn = 0),
      (this.OnEntityBudgetTickEnableChange = (t) => {
        this.oRe?.Valid && t && this.oRe.ConsumeRootMotion();
      });
  }
  static get Dependencies() {
    return [3];
  }
  get ForbiddenTickPose() {
    return this.Vsn;
  }
  set ForbiddenTickPose(t) {
    this.Vsn !== t && ((this.Vsn = t), (this.s3o.bForbiddenTickPose = t));
  }
  OnInit() {
    return !0;
  }
  OnStart() {
    return (
      (this.Hte = this.Entity.GetComponent(3)),
      (this.Osn = this.Entity.GetComponent(36)),
      (this.s3o = this.Hte.Owner.GetComponentByClass(
        UE.CharacterMovementComponent.StaticClass(),
      )),
      (this.ksn = this.Entity.GetComponent(27)),
      !!this.s3o &&
        (this.s3o.SetKuroOnlyTickOutside(!0),
        this.s3o.SetComponentTickEnabled(!1),
        (this.oRe = this.Entity.GetComponent(160)),
        (this.ForbiddenTickPose = 1 < this.Entity.GetTickInterval()),
        (this.Hsn = Time_1.Time.Frame),
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
      (this.Hsn = Time_1.Time.Frame);
  }
  OnTick(t) {
    var e, i, s;
    this.Hte?.IsRoleAndCtrlByMe &&
      1 < Time_1.Time.Frame - this.Hsn &&
      Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn(
        "Movement",
        6,
        "[b1057126] 角色更新异常",
        ["DebugLastTickFrame", this.Hsn],
        ["Current", Time_1.Time.Frame],
      ),
      (this.Hsn = Time_1.Time.Frame),
      this.s3o &&
        (this.ksn && this.ksn.MarkDebugRecord("移动组件更新前 "),
        this.Osn.ConsumeForceFallingSpeed(),
        (e = this.Hte.Owner.CustomTimeDilation),
        this.Osn.CanMove &&
          !this.Osn.IsSpecialMove &&
          ((i = 1 < this.Entity.GetTickInterval()),
          (this.ForbiddenTickPose = i || this.Frozen),
          i && this.oRe?.Valid && this.Hte.Owner.WasRecentlyRenderedOnScreen()
            ? ((s = this.oRe.GetMeshTransform()),
              this.Fsn.DeepCopy(this.Hte.ActorLocationProxy),
              this.s3o.KuroTickComponentOutside(
                t * MathUtils_1.MathUtils.MillisecondToSecond * e,
              ),
              this.Hte.ResetAllCachedTime(),
              this.Fsn.Equals(this.Hte.ActorLocationProxy) ||
                this.oRe.SetModelBuffer(s, t))
            : ((s = i ? t : Time_1.Time.DeltaTime),
              this.s3o.KuroTickComponentOutside(
                s * MathUtils_1.MathUtils.MillisecondToSecond * e,
              ),
              this.Hte.ResetAllCachedTime())),
        this.Osn.ApplyForceSpeedAndRecordSpeed(),
        this.ksn) &&
        this.ksn.MarkDebugRecord("移动组件更新后");
  }
};
(UeMovementTickManageComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(98)],
  UeMovementTickManageComponent,
)),
  (exports.UeMovementTickManageComponent = UeMovementTickManageComponent);
//# sourceMappingURL=UeMovementTickManageComponent.js.map

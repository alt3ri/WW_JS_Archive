"use strict";
var UeMovementTickManageComponent_1,
  __decorate =
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
          (o = t[r]) &&
            (h = (n < 3 ? o(h) : 3 < n ? o(e, i, h) : o(e, i)) || h);
      return 3 < n && h && Object.defineProperty(e, i, h), h;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UeMovementTickManageComponent = exports.UeMovementTickController =
    void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  TickSystem_1 = require("../../../../Core/Tick/TickSystem"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  CharacterAnimationComponent_1 = require("../../Character/Common/Component/CharacterAnimationComponent"),
  UeSkeletalTickManageComponent_1 = require("./UeSkeletalTickManageComponent");
class UeMovementTickController {
  static AddManager(t, e) {
    for (; this.Managers.length <= e; ) this.Managers.push(new Set());
    this.Managers[e].add(t);
  }
  static DeleteManager(t, e) {
    for (; this.Managers.length <= e; ) this.Managers.push(new Set());
    this.Managers[e].delete(t);
  }
  static TickManagersPriority1(o) {
    if (
      ((this.PreTickedManagers.length = 0),
      UeSkeletalTickManageComponent_1.UeSkeletalTickController
        .EnabledNewSkelTickTiming)
    )
      for (let s = this.Managers.length - 1; 0 <= s; --s) {
        let t = new Array();
        for (const h of this.Managers[s])
          h.Active &&
            (!h.SkelTickMgr?.MainSkelComp ||
            1 < h.SkelTickMgr.MainSkelComp.GetAnimInstanceUpdateState()
              ? (this.PreTickedManagers.push(h), h.PreProxyTick(o))
              : t.push(h));
        let e = new Array(),
          i = t.length + 1;
        for (; 0 < t.length && t.length < i; ) {
          i = t.length;
          for (const r of t)
            1 !== r.SkelTickMgr.MainSkelComp.GetAnimInstanceUpdateState()
              ? (this.PreTickedManagers.push(r), r.PreProxyTick(o))
              : e.push(r);
          var n = t;
          (t = e), ((e = n).length = 0);
        }
        if (0 < t.length)
          for (const a of t) this.PreTickedManagers.push(a), a.PreProxyTick(o);
      }
    else
      for (let t = this.Managers.length - 1; 0 <= t; --t)
        for (const e of this.Managers[t])
          e.Active && (this.PreTickedManagers.push(e), e.PreProxyTick(o));
  }
  static TickManagers() {
    for (const t of this.PreTickedManagers) t.ProxyTick();
    this.PreTickedManagers.length = 0;
  }
  static get EnabledMovementParallel() {
    return this.dtc;
  }
  static set EnabledMovementParallel(t) {
    this.dtc = t;
  }
}
((exports.UeMovementTickController = UeMovementTickController).Managers =
  new Array()),
  (UeMovementTickController.PreTickedManagers = new Array()),
  (UeMovementTickController.dtc = !0);
let UeMovementTickManageComponent =
  (UeMovementTickManageComponent_1 = class UeMovementTickManageComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.o4o = void 0),
        (this.oRe = void 0),
        (this.tr_ = void 0),
        (this.Msn = void 0),
        (this.Esn = void 0),
        (this.SkelTickMgr = void 0),
        (this.dzl = 0),
        (this.mzl = 0),
        (this.Dsn = 0),
        (this.$k_ = !1),
        (this.Qzl = 0),
        (this.Kzl = void 0),
        (this.$zl = Vector_1.Vector.Create()),
        (this.Xzl = Rotator_1.Rotator.Create()),
        (this.ysn = !1),
        (this.prl = (0, puerts_1.$ref)(void 0)),
        (this.utl = !1),
        (this.Frozen = !1),
        (this.Isn = 0),
        (this.OnEntityBudgetTickEnableChange = (t) => {
          this.oRe?.Valid && t && this.oRe.ConsumeRootMotion();
        });
    }
    static get Dependencies() {
      return [3];
    }
    get TickMode() {
      return this.Dsn;
    }
    set TickMode(t) {
      var e;
      this.Dsn !== t &&
        ((e = this.Dsn),
        (this.Dsn = t),
        1 === e
          ? (UeMovementTickController.DeleteManager(this, 0),
            TickSystem_1.TickSystem.CleanMovementProxyTickFunction(this.o4o),
            (this.dzl = 0),
            (this.mzl = 0))
          : 1 === t &&
            (UeMovementTickController.AddManager(this, 0),
            TickSystem_1.TickSystem.SetMovementProxyTickFunction(
              0,
              this.o4o,
              1,
            )),
        3 === e
          ? (this.o4o.SetKuroOnlyTickOutside(!0),
            this.o4o.SetComponentTickEnabled(!1))
          : 3 === t &&
            (this.o4o.SetKuroOnlyTickOutside(!1),
            this.o4o.SetComponentTickEnabled(!0)));
    }
    get ForbiddenTickPose() {
      return this.ysn;
    }
    set ForbiddenTickPose(t) {
      this.ysn !== t && ((this.ysn = t), (this.o4o.bForbiddenTickPose = t));
    }
    get TeleportLock() {
      return this.utl;
    }
    set TeleportLock(t) {
      this.utl = t;
    }
    OnInit() {
      return !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(3)),
        (this.Msn = this.Entity.GetComponent(44)),
        (this.tr_ = this.Entity.GetComponent(230)),
        (this.o4o = this.Hte.Owner.GetComponentByClass(
          UE.CharacterMovementComponent.StaticClass(),
        )),
        !!this.o4o &&
          ((this.Esn = this.Entity.GetComponent(30)),
          (this.SkelTickMgr = this.Entity.GetComponent(112)),
          this.o4o.SetKuroOnlyTickOutside(!0),
          this.o4o.SetComponentTickEnabled(!1),
          (this.oRe = this.Entity.GetComponent(175)),
          (this.ForbiddenTickPose =
            1 < this.Entity.GetTickInterval() ||
            UeSkeletalTickManageComponent_1.UeSkeletalTickController
              .EnabledNewSkelTickTiming),
          (this.Isn = Time_1.Time.Frame),
          (this.utl = !1),
          (this.TickMode = UeMovementTickController.EnabledMovementParallel
            ? 1
            : 2),
          !0)
      );
    }
    OnEnd() {
      return (this.TickMode = 0), !(this.Kzl = void 0);
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
      2 === this.TickMode &&
        (this.TickMovement(t),
        this.ResetCachedTransformAndSetModelBuffer(),
        UeMovementTickController.EnabledMovementParallel) &&
        (this.TickMode = 1);
    }
    PreProxyTick(t) {
      this.dzl++,
        (this.mzl += this.Entity.TimeDilation * t),
        this.dzl >= this.Entity.GetTickInterval() &&
          this.TickMovement(this.mzl);
    }
    ProxyTick() {
      this.dzl >= this.Entity.GetTickInterval() &&
        (this.ResetCachedTransformAndSetModelBuffer(),
        (this.dzl = 0),
        (this.mzl = 0)),
        UeMovementTickController.EnabledMovementParallel || (this.TickMode = 2);
    }
    TickMovement(t) {
      if (
        ((this.$k_ = !1),
        this.Hte?.LastActorLocation.DeepCopy(this.Hte.ActorLocationProxy),
        this.frl(),
        this.o4o &&
          !this.TeleportLock &&
          !ControllerHolder_1.ControllerHolder.WorldController.GetIsWorldOriginInUiMode() &&
          !this.Hte?.Actor.GetAttachRootParentActor())
      ) {
        if (
          (this.Esn && this.Esn.MarkDebugRecord("移动组件更新前 ", void 0, !0),
          this.tr_)
        )
          for (const o of this.tr_.PassengerInfoMap.values())
            o.PassengerEntity?.GetComponent(30)?.MarkDebugRecord(
              "载具移动组件更新前",
              void 0,
              !0,
            );
        this.Msn.ConsumeForceFallingSpeed();
        var e,
          i,
          s = this.Entity.GetComponent(120)?.CurrentTimeScale ?? 1;
        this.Msn.IsSpecialMove ||
          (this.Msn &&
            (this.Msn.GetAndConsumeAddMove(
              t * MathUtils_1.MathUtils.MillisecondToSecond * s,
              UeMovementTickManageComponent_1.Lz,
              UeMovementTickManageComponent_1.Gue,
            ),
            UeMovementTickManageComponent_1.Lz.IsNearlyZero() ||
              (3 === this.o4o.MovementMode
                ? this.Hte.AddActorWorldOffset(
                    UeMovementTickManageComponent_1.Lz.ToUeVector(),
                    "AddMove",
                    !0,
                  )
                : this.o4o.SetAddMove(
                    UeMovementTickManageComponent_1.Lz.ToUeVector(),
                  )),
            UeMovementTickManageComponent_1.Gue.IsNearlyZero() ||
              this.Hte?.AddActorLocalRotation(
                UeMovementTickManageComponent_1.Gue.ToUeRotator(),
                "叠加旋转",
                !1,
              )),
          (e = 1 < this.Entity.GetTickInterval()),
          (this.ForbiddenTickPose =
            e ||
            this.Frozen ||
            UeSkeletalTickManageComponent_1.UeSkeletalTickController
              .EnabledNewSkelTickTiming),
          (this.Qzl = 0),
          (i = this.oRe?.Actor?.Mesh) &&
            i.bEnableUpdateRateOptimizations &&
            !this.Msn.BasePlatform &&
            (i.GetAnimUpdateRateParameters(this.prl),
            (i = (0, puerts_1.$unref)(this.prl)).bSkipUpdate) &&
            i.UpdateRate > this.Entity.GetTickInterval() &&
            (this.Qzl =
              (i.UpdateRate * t) / Math.max(1, this.Entity.GetTickInterval())),
          e &&
            this.oRe?.Valid &&
            this.Hte.Owner.WasRecentlyRenderedOnScreen() &&
            (this.Qzl = Math.max(t, this.Qzl)),
          this.Qzl <= CharacterAnimationComponent_1.MIN_BUFFER_TIME_LENGTH ||
          !this.oRe
            ? this.o4o.KuroTickComponentOutside(
                t * MathUtils_1.MathUtils.MillisecondToSecond * s,
              )
            : ((this.Kzl = this.oRe.GetMeshTransform()),
              this.$zl.DeepCopy(this.Hte.ActorLocationProxy),
              this.Xzl.DeepCopy(this.Hte.ActorRotationProxy),
              this.o4o.KuroTickComponentOutside(
                t * MathUtils_1.MathUtils.MillisecondToSecond * s,
              ),
              this.Hte.ResetAllCachedTime())),
          (this.$k_ = !0);
      }
    }
    ResetCachedTransformAndSetModelBuffer() {
      if (
        this.$k_ &&
        (this.Msn.IsSpecialMove || this.Hte.ResetAllCachedTime(),
        !(
          this.Kzl &&
          this.Qzl >= CharacterAnimationComponent_1.MIN_BUFFER_TIME_LENGTH
        ) ||
          (this.$zl.Equals(this.Hte.ActorLocationProxy) &&
            this.Xzl.Equals(this.Hte.ActorRotationProxy)) ||
          (this.oRe.SetModelBuffer(this.Kzl, this.Qzl), (this.Kzl = void 0)),
        this.Msn.ApplyForceSpeedAndRecordSpeed(),
        this.Esn && this.Esn.MarkDebugRecord("移动组件更新后", void 0, !0),
        this.tr_)
      )
        for (const e of this.tr_.PassengerInfoMap.values()) {
          var t = e.PassengerEntity?.GetComponent(30);
          e.PassengerEntity?.GetComponent(1)?.ResetAllCachedTime(),
            t?.MarkDebugRecord("载具移动组件更新后", void 0, !0);
        }
    }
    frl() {
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
        (this.Isn = Time_1.Time.Frame);
    }
  });
(UeMovementTickManageComponent.Lz = Vector_1.Vector.Create()),
  (UeMovementTickManageComponent.Gue = Rotator_1.Rotator.Create()),
  (UeMovementTickManageComponent = UeMovementTickManageComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(111)],
      UeMovementTickManageComponent,
    )),
  (exports.UeMovementTickManageComponent = UeMovementTickManageComponent);
//# sourceMappingURL=UeMovementTickManageComponent.js.map

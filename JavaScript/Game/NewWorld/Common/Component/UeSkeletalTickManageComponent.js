"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var o,
      r = arguments.length,
      h =
        r < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(t, e, i, s);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (o = t[n]) && (h = (r < 3 ? o(h) : 3 < r ? o(e, i, h) : o(e, i)) || h);
    return 3 < r && h && Object.defineProperty(e, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UeSkeletalTickManageComponent = exports.UeSkeletalTickController =
    void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  Time_1 = require("../../../../Core/Common/Time"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  PerformanceController_1 = require("../../../../Core/Performance/PerformanceController"),
  PerformanceDecorators_1 = require("../../../../Core/Performance/PerformanceDecorators"),
  TickProcessSystem_1 = require("../../../../Core/Tick/TickProcessSystem"),
  TickSystem_1 = require("../../../../Core/Tick/TickSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  Global_1 = require("../../../Global"),
  MAX_TIME_DELAY_ANIM = 2,
  MAX_COLLECT_PERIOD_DELAY_ANIM = 0.125;
class UeSkeletalTickController {
  static y01(t, e, i) {
    for (const s of t.SkeletalComps)
      s.SetUseProxyDataBuffer(e),
        (s.bUseDelayComplete = e),
        (s.bUseKuroParallel = i);
  }
  static AddManager(t) {
    1 === t.TickMode
      ? (this.Managers.add(t),
        this.y01(t, this.EnabledNewSkelTickTiming, this.EnabledKuroParallel))
      : this.NotParallelManagers.add(t);
  }
  static DeleteManager(t) {
    this.Managers.delete(t), this.NotParallelManagers.delete(t);
    for (const e of t.SkeletalComps)
      e.SetUseProxyDataBuffer(!1),
        (e.bUseDelayComplete = !1),
        (e.bUseKuroParallel = !1);
  }
  static TickManagers(t) {
    if (this.EnabledNewSkelTickTiming) {
      this.TickedManagers.length = 0;
      for (const e of this.Managers)
        e.Active && (this.TickedManagers.push(e), e.ProxyTick(t, !0));
      for (const i of this.NotParallelManagers)
        i.Active && (this.TickedManagers.push(i), i.ProxyTick(t, !0));
    } else {
      for (const s of this.Managers) s.Active && s.ProxyTick(t);
      for (const o of this.NotParallelManagers) o.Active && o.ProxyTick(t);
    }
  }
  static TickManagersStep2() {
    for (const t of this.TickedManagers) t.UnlockEvaluation();
  }
  static DealCompleteSkeletalComp() {
    for (const t of this.TickedManagers) t.DealComplete();
    this.TickedManagers.length = 0;
  }
  static AfterTickManagers(t) {
    for (const e of this.Managers) e.Active && e.AfterProxyTick(t);
    for (const i of this.NotParallelManagers) i.Active && i.AfterProxyTick(t);
  }
  static get EnabledNewSkelTickTiming() {
    return this.ftc;
  }
  static set EnabledNewSkelTickTiming(t) {
    if (this.ftc !== t) {
      this.ftc = t;
      for (const e of this.Managers)
        this.y01(e, this.EnabledNewSkelTickTiming, this.EnabledKuroParallel);
    }
  }
  static get EnabledKuroParallel() {
    return this.S01;
  }
  static set EnabledKuroParallel(t) {
    if (this.S01 !== t) {
      this.S01 = t;
      for (const e of this.Managers)
        this.y01(e, this.EnabledNewSkelTickTiming, this.EnabledKuroParallel);
    }
  }
  static get MainRoleParallel() {
    return this.gU || (this.MainRoleParallel = !0), this.dGl;
  }
  static set MainRoleParallel(t) {
    (this.dGl = t), (this.gU = !0);
  }
}
((exports.UeSkeletalTickController = UeSkeletalTickController).Managers =
  new Set()),
  (UeSkeletalTickController.NotParallelManagers = new Set()),
  (UeSkeletalTickController.TickedManagers = new Array()),
  (UeSkeletalTickController.ftc = !0),
  (UeSkeletalTickController.S01 = !0),
  (UeSkeletalTickController.gU = !1),
  (UeSkeletalTickController.dGl = !1);
let UeSkeletalTickManageComponent = class UeSkeletalTickManageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Tsn = !1),
      (this.Hte = void 0),
      (this.I5r = void 0),
      (this.d3r = -1),
      (this.Lsn = !1),
      (this.Dsn = 0),
      (this.Rsn = void 0),
      (this.MainSkelComp = void 0),
      (this.mYs = void 0),
      (this.ForceDisableAnimDelaySet = new Set()),
      (this.TickType = 0),
      (this.SkeletalComps = new Array()),
      (this.Asn = new Array()),
      (this.gtc = new Array());
  }
  get TickMode() {
    return this.Dsn;
  }
  set TickMode(t) {
    if (this.Dsn !== t) {
      var e = this.Dsn;
      if (1 === (this.Dsn = t))
        if (2 === e)
          0 < this.SkeletalComps.length &&
            TickSystem_1.TickSystem.SetSkeletalMeshProxyTickFunction(
              0,
              this.SkeletalComps[0],
              0,
            );
        else {
          for (const i of this.SkeletalComps)
            TickSystem_1.TickSystem.SetSkeletalMeshProxyTickFunction(0, i, 0);
          for (const s of this.Asn)
            TickSystem_1.TickSystem.SetSkeletalMeshProxyTickFunction(4, s, 0);
        }
      else if (2 === t)
        if (1 === e)
          0 < this.SkeletalComps.length &&
            TickSystem_1.TickSystem.CleanSkeletalMeshProxyTickFunction(
              this.SkeletalComps[0],
            );
        else {
          let t = 0;
          for (const o of this.SkeletalComps)
            0 < t &&
              TickSystem_1.TickSystem.SetSkeletalMeshProxyTickFunction(0, o, 0),
              ++t;
          for (const r of this.Asn)
            TickSystem_1.TickSystem.SetSkeletalMeshProxyTickFunction(4, r, 0);
        }
      else {
        for (const h of this.SkeletalComps)
          h ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Test",
                6,
                "NoSkeletalMesh",
                ["EntityId", this.Entity.Id],
                ["Actor", this.Hte?.Owner?.GetName()],
              )),
            TickSystem_1.TickSystem.CleanSkeletalMeshProxyTickFunction(h);
        for (const n of this.Asn)
          n ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Test",
                6,
                "NoSkeletalMesh",
                ["EntityId", this.Entity.Id],
                ["Actor", this.Hte?.Owner?.GetName()],
              )),
            TickSystem_1.TickSystem.CleanSkeletalMeshProxyTickFunction(n);
      }
      if (
        (UeSkeletalTickController.DeleteManager(this),
        (1 !== t && 2 !== t) || UeSkeletalTickController.AddManager(this),
        4 === t)
      ) {
        for (const a of this.SkeletalComps)
          a.SetTickGroup(1),
            a.SetComponentTickEnabled(this.Active),
            a.SetKuroOnlyTickOutside(!1);
        for (const l of this.Asn)
          l.SetTickGroup(1),
            l.SetComponentTickEnabled(this.Active),
            l.SetKuroOnlyTickOutside(!1);
      } else {
        for (const c of this.SkeletalComps)
          c.SetTickGroup(0),
            c.SetComponentTickEnabled(!1),
            c.SetKuroOnlyTickOutside(!0);
        for (const f of this.Asn)
          f.SetTickGroup(4),
            f.SetComponentTickEnabled(!1),
            f.SetKuroOnlyTickOutside(!0);
      }
    }
  }
  static get Dependencies() {
    return [1];
  }
  OnInit() {
    return !0;
  }
  OnActivate() {
    (this.Hte = this.Entity.GetComponent(1)),
      (this.I5r = this.Entity.GetComponent(99));
    var e = this.Hte.Owner.K2_GetComponentsByClass(
        UE.SkeletalMeshComponent.StaticClass(),
      ),
      i = e.Num();
    for (let t = 0; t < i; ++t) {
      var s = e.Get(t);
      s instanceof UE.SkeletalMeshComponent &&
        ((s.bConsumeAllRootMotion = !0),
        s.MasterPoseComponent
          ? this.Asn.push(s)
          : (this.SkeletalComps.push(s),
            this.MainSkelComp || (this.MainSkelComp = s)),
        this.mYs || (this.mYs = s.GetAnimInstance()));
    }
    this.mYs && this.mYs.SetDelayAnimTime(0, 0),
      PerformanceController_1.PerformanceController.IsEntityTickPerformanceTest
        ? (this.TickMode = 1)
        : this.Psn();
    var t = this.Entity.GetComponent(175);
    !this.Active &&
      t &&
      TickProcessSystem_1.TickProcessSystem.RegisterOnceTickProcess(
        5,
        !0,
        t.EndAnimNotifyStates,
      ),
      (this.TickType = 1),
      (this.Rsn = Stats_1.Stat.CreateNoFlameGraph(
        "ProxyTick " + this.Hte?.Owner?.GetName(),
      ));
  }
  OnEnd() {
    (this.TickMode = 0), (this.TickType = 0);
    for (const t of this.SkeletalComps) t.SetComponentTickEnabled(!1);
    return !0;
  }
  OnTick(t) {
    t =
      t *
      MathUtils_1.MathUtils.MillisecondToSecond *
      (this.Entity.GetComponent(120)?.CurrentTimeScale ?? 1);
    1 < this.Entity.GetTickInterval() &&
    0 === this.ForceDisableAnimDelaySet.size
      ? this.mYs?.SetDelayAnimTime(
          Math.min(MAX_TIME_DELAY_ANIM, t),
          Math.min(MAX_COLLECT_PERIOD_DELAY_ANIM, t / 2),
        )
      : this.I5r?.IsInFighting
        ? this.mYs?.SetDelayAnimTime(0, MAX_TIME_DELAY_ANIM)
        : this.mYs?.SetDelayAnimTime(
            0,
            Math.min(MAX_COLLECT_PERIOD_DELAY_ANIM, t),
          ),
      3 === this.TickMode && this.TakeOverModeTick(t),
      this.Psn();
  }
  TakeOverModeTick(t) {
    if (3 === this.TickMode) {
      (this.d3r = Time_1.Time.Frame), this.mYs?.AddDeltaForDelayAnim(t);
      for (const e of this.SkeletalComps)
        (2 === this.TickType && !this.CheckMainMesh(e)) ||
          e.KuroTickComponentOutside(t);
      if (2 !== this.TickType)
        for (const i of this.Asn) i.KuroTickComponentOutside(t);
    }
  }
  ProxyTick(t, e = !1) {
    if (1 === this.TickType || 2 === this.TickType) {
      this.Rsn?.Start(), (this.d3r = Time_1.Time.Frame);
      var i = this.Entity.GetComponent(120)?.CurrentTimeScale,
        s =
          t *
          this.TimeDilation *
          (void 0 === i || (this.Tsn && 0 === i) ? 1 : i);
      this.mYs?.AddDeltaForDelayAnim(s), (this.gtc.length = 0);
      for (const r of this.SkeletalComps) {
        var o = this.CheckMainMesh(r);
        (2 === this.TickType && !o) ||
          (r
            ? (!e || (o && 2 === this.TickMode) || this.gtc.push(r),
              r.KuroTickComponentOutside(s))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Test",
                6,
                "NoSkeletalMesh",
                ["EntityId", this.Entity.Id],
                ["Actor", this.Hte?.Owner?.GetName()],
              ));
      }
      this.Rsn?.Stop();
    }
  }
  UnlockEvaluation() {
    for (const t of this.gtc) t.UnlockKuroEvaluation();
  }
  DealComplete() {
    for (const t of this.gtc) t.DealCompleteParallelEvaluation();
  }
  AfterProxyTick(t) {
    if (1 === this.TickType) {
      this.Rsn?.Start();
      var e = this.Entity.GetComponent(120)?.CurrentTimeScale,
        i =
          t *
          this.TimeDilation *
          (void 0 === e || (this.Tsn && 0 === e) ? 1 : e);
      if (this.Tsn && ((this.Tsn = !1), this.d3r !== Time_1.Time.Frame))
        for (const s of this.SkeletalComps) s.KuroTickComponentOutside(t);
      if (this.MainSkelComp?.RenderedAndNotSkipUpdate())
        for (const o of this.Asn)
          o
            ? o.KuroTickComponentOutside(i)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Test",
                6,
                "NoSkeletalMesh",
                ["EntityId", this.Entity.Id],
                ["Actor", this.Hte?.Owner?.GetName()],
              );
      this.Rsn?.Stop();
    }
  }
  OnEnable() {
    if ((3 !== this.TickMode && (this.Tsn = !0), 4 === this.TickMode))
      for (const t of this.SkeletalComps) t.SetComponentTickEnabled(!0);
  }
  OnDisable() {
    if (4 === this.TickMode)
      for (const t of this.SkeletalComps) t.SetComponentTickEnabled(!1);
  }
  SetTakeOverTick(t) {
    (this.Lsn = t), this.Psn();
  }
  SetLodBias(t) {
    for (const e of this.SkeletalComps) e.SetLODBias(t);
  }
  SetSkeletalMeshTickType(t) {
    var e;
    return (
      this.TickType !== t &&
        ((e = this.Hte?.CreatureData.GetPbDataId()),
        (this.TickType = t),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info(
          "Character",
          50,
          "[SetSkeletalMeshTickType] 设置SkeletalMeshTickType",
          ["Type", t],
          ["PbDataId", e],
        ),
      !0
    );
  }
  CheckMainMesh(t) {
    return !!t.IsValid() && "CharacterMesh0" === t.GetName();
  }
  Psn() {
    this.Lsn
      ? (this.TickMode = 3)
      : !UeSkeletalTickController.MainRoleParallel && this.IsMainRole()
        ? (this.TickMode = 2)
        : (this.TickMode = 1);
  }
  IsMainRole() {
    return this.Hte?.Owner === Global_1.Global.BaseCharacter;
  }
  StartForceDisableAnimDelay(t) {
    return this.ForceDisableAnimDelaySet.has(t)
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Character", 31, "动画缓动强制关闭 - 重复", [
            "Reason",
            t,
          ]),
        !1)
      : (this.ForceDisableAnimDelaySet.add(t), !0);
  }
  CancelForceDisableAnimDelay(t) {
    this.ForceDisableAnimDelaySet.delete(t);
  }
};
(UeSkeletalTickManageComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(112)],
  UeSkeletalTickManageComponent,
)),
  (exports.UeSkeletalTickManageComponent = UeSkeletalTickManageComponent);
//# sourceMappingURL=UeSkeletalTickManageComponent.js.map

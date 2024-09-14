"use strict";
var UeSkeletalTickManageComponent_1,
  __decorate =
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
          (o = t[n]) &&
            (h = (r < 3 ? o(h) : 3 < r ? o(e, i, h) : o(e, i)) || h);
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
  TickSystem_1 = require("../../../../Core/Tick/TickSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  Global_1 = require("../../../Global"),
  MAX_TIME_DELAY_ANIM = 2,
  MAX_COLLECT_PERIOD_DELAY_ANIM = 0.125;
class UeSkeletalTickController {
  static AddManager(t) {
    (1 === t.TickMode ? this.Managers : this.NotParallelManagers).add(t);
  }
  static DeleteManager(t) {
    this.Managers.delete(t), this.NotParallelManagers.delete(t);
  }
  static TickManagers(t) {
    for (const e of this.Managers) e.Active && e.ProxyTick(t);
    for (const i of this.NotParallelManagers) i.Active && i.ProxyTick(t);
  }
  static AfterTickManagers(t) {
    for (const e of this.Managers) e.Active && e.AfterProxyTick(t);
    for (const i of this.NotParallelManagers) i.Active && i.AfterProxyTick(t);
  }
}
((exports.UeSkeletalTickController = UeSkeletalTickController).Managers =
  new Set()),
  (UeSkeletalTickController.NotParallelManagers = new Set());
let UeSkeletalTickManageComponent =
  (UeSkeletalTickManageComponent_1 = class UeSkeletalTickManageComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Tsn = !1),
        (this.Hte = void 0),
        (this.I5r = void 0),
        (this.d3r = -1),
        (this.Lsn = !1),
        (this.Dsn = 0),
        (this.Rsn = void 0),
        (this.GSa = void 0),
        (this.mYs = void 0),
        (this.TickType = 0),
        (this.Usn = new Array()),
        (this.Asn = new Array());
    }
    get TickMode() {
      return this.Dsn;
    }
    set TickMode(t) {
      if (this.Dsn !== t) {
        var e = this.Dsn;
        if (1 === (this.Dsn = t))
          if (2 === e)
            0 < this.Usn.length &&
              TickSystem_1.TickSystem.SetSkeletalMeshProxyTickFunction(
                0,
                this.Usn[0],
              );
          else {
            for (const i of this.Usn)
              TickSystem_1.TickSystem.SetSkeletalMeshProxyTickFunction(0, i);
            for (const s of this.Asn)
              TickSystem_1.TickSystem.SetSkeletalMeshProxyTickFunction(4, s);
          }
        else if (2 === t)
          if (1 === e)
            0 < this.Usn.length &&
              TickSystem_1.TickSystem.CleanSkeletalMeshProxyTickFunction(
                this.Usn[0],
              );
          else {
            let t = 0;
            for (const o of this.Usn)
              0 < t &&
                TickSystem_1.TickSystem.SetSkeletalMeshProxyTickFunction(0, o),
                ++t;
            for (const r of this.Asn)
              TickSystem_1.TickSystem.SetSkeletalMeshProxyTickFunction(4, r);
          }
        else {
          for (const h of this.Usn)
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
          for (const a of this.Usn)
            a.SetTickGroup(1),
              a.SetComponentTickEnabled(this.Active),
              a.SetKuroOnlyTickOutside(!1);
          for (const c of this.Asn)
            c.SetTickGroup(1),
              c.SetComponentTickEnabled(this.Active),
              c.SetKuroOnlyTickOutside(!1);
        } else {
          for (const l of this.Usn)
            l.SetTickGroup(0),
              l.SetComponentTickEnabled(!1),
              l.SetKuroOnlyTickOutside(!0);
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
        (this.I5r = this.Entity.GetComponent(92));
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
            : (this.Usn.push(s), this.GSa || (this.GSa = s)),
          this.mYs || (this.mYs = s.GetAnimInstance()));
      }
      this.mYs && this.mYs.SetDelayAnimTime(0, 0),
        PerformanceController_1.PerformanceController
          .IsEntityTickPerformanceTest
          ? (this.TickMode = 1)
          : this.Psn(),
        (this.TickType = 1),
        (this.Rsn = Stats_1.Stat.Create(
          "ProxyTick " + this.Hte?.Owner?.GetName(),
        ));
    }
    OnEnd() {
      (this.TickMode = 0), (this.TickType = 0);
      for (const t of this.Usn) t.SetComponentTickEnabled(!1);
      return !0;
    }
    OnTick(t) {
      var e =
        t *
        MathUtils_1.MathUtils.MillisecondToSecond *
        this.TimeDilation *
        (this.Entity.GetComponent(110)?.CurrentTimeScale ?? 1);
      if (
        (1 < this.Entity.GetTickInterval()
          ? this.mYs?.SetDelayAnimTime(
              Math.min(MAX_TIME_DELAY_ANIM, e),
              Math.min(MAX_COLLECT_PERIOD_DELAY_ANIM, e / 2),
            )
          : this.I5r?.IsInFighting
            ? this.mYs?.SetDelayAnimTime(0, MAX_TIME_DELAY_ANIM)
            : this.mYs?.SetDelayAnimTime(
                0,
                Math.min(MAX_COLLECT_PERIOD_DELAY_ANIM, e),
              ),
        this.Psn(),
        3 === this.TickMode)
      ) {
        (this.d3r = Time_1.Time.Frame), this.mYs?.AddDeltaForDelayAnim(e);
        for (const i of this.Usn)
          (2 === this.TickType && !this.CheckMainMesh(i)) ||
            i.KuroTickComponentOutside(e);
        if (2 !== this.TickType)
          for (const s of this.Asn) s.KuroTickComponentOutside(e);
      }
    }
    ProxyTick(t) {
      if (1 === this.TickType || 2 === this.TickType) {
        this.Rsn?.Start(), (this.d3r = Time_1.Time.Frame);
        var e =
          t *
          this.TimeDilation *
          (this.Entity.GetComponent(110)?.CurrentTimeScale ?? 1);
        this.mYs?.AddDeltaForDelayAnim(e);
        for (const i of this.Usn)
          (2 === this.TickType && !this.CheckMainMesh(i)) ||
            (i
              ? i.KuroTickComponentOutside(e)
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Test",
                  6,
                  "NoSkeletalMesh",
                  ["EntityId", this.Entity.Id],
                  ["Actor", this.Hte?.Owner?.GetName()],
                ));
        this.Rsn?.Stop();
      }
    }
    AfterProxyTick(t) {
      if (1 === this.TickType) {
        this.Rsn?.Start();
        var e =
          t *
          this.TimeDilation *
          (this.Entity.GetComponent(110)?.CurrentTimeScale ?? 1);
        if (this.Tsn && ((this.Tsn = !1), this.d3r !== Time_1.Time.Frame))
          for (const i of this.Usn) i.KuroTickComponentOutside(t);
        if (this.GSa?.RenderedAndNotSkipUpdate())
          for (const s of this.Asn)
            s
              ? s.KuroTickComponentOutside(e)
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
        for (const t of this.Usn) t.SetComponentTickEnabled(!0);
    }
    OnDisable() {
      if (4 === this.TickMode)
        for (const t of this.Usn) t.SetComponentTickEnabled(!1);
    }
    SetTakeOverTick(t) {
      (this.Lsn = t), this.Psn();
    }
    SetLodBias(t) {
      for (const e of this.Usn) e.SetLODBias(t);
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
            51,
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
        : !UeSkeletalTickManageComponent_1.MainRoleParallel && this.IsMainRole()
          ? (this.TickMode = 2)
          : (this.TickMode = 1);
    }
    IsMainRole() {
      return this.Hte?.Owner === Global_1.Global.BaseCharacter;
    }
  });
(UeSkeletalTickManageComponent.MainRoleParallel = !1),
  (UeSkeletalTickManageComponent = UeSkeletalTickManageComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(102)],
      UeSkeletalTickManageComponent,
    )),
  (exports.UeSkeletalTickManageComponent = UeSkeletalTickManageComponent);
//# sourceMappingURL=UeSkeletalTickManageComponent.js.map

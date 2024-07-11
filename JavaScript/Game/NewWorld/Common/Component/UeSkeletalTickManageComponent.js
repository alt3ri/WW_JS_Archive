"use strict";
var UeSkeletalTickManageComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, o) {
      var s,
        r = arguments.length,
        n =
          r < 3
            ? e
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(e, i))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        n = Reflect.decorate(t, e, i, o);
      else
        for (var h = t.length - 1; 0 <= h; h--)
          (s = t[h]) &&
            (n = (r < 3 ? s(n) : 3 < r ? s(e, i, n) : s(e, i)) || n);
      return 3 < r && n && Object.defineProperty(e, i, n), n;
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
        (this.d3r = -1),
        (this.Lsn = !1),
        (this.Dsn = 0),
        (this.Rsn = void 0),
        (this.Gpa = void 0),
        (this.XQs = void 0),
        (this.TickType = 0),
        (this.Usn = new Array()),
        (this.Asn = new Array());
    }
    get TickMode() {
      return this.Dsn;
    }
    set TickMode(t) {
      if (this.Dsn !== t) {
        if (1 === (this.Dsn = t)) {
          for (const e of this.Usn)
            TickSystem_1.TickSystem.SetSkeletalMeshProxyTickFunction(0, e);
          for (const i of this.Asn)
            TickSystem_1.TickSystem.SetSkeletalMeshProxyTickFunction(4, i);
        } else {
          for (const o of this.Usn)
            o
              ? Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Test",
                  6,
                  "HasSkeletalMesh",
                  ["EntityId", this.Entity.Id],
                  ["Actor", this.Hte?.Owner?.GetName()],
                  ["SkelMesh", o.GetName()],
                )
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Test",
                  6,
                  "NoSkeletalMesh",
                  ["EntityId", this.Entity.Id],
                  ["Actor", this.Hte?.Owner?.GetName()],
                ),
              TickSystem_1.TickSystem.CleanSkeletalMeshProxyTickFunction(o);
          for (const s of this.Asn)
            s ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Test",
                  6,
                  "NoSkeletalMesh",
                  ["EntityId", this.Entity.Id],
                  ["Actor", this.Hte?.Owner?.GetName()],
                )),
              TickSystem_1.TickSystem.CleanSkeletalMeshProxyTickFunction(s);
        }
        if (
          (UeSkeletalTickController.DeleteManager(this),
          (1 !== t && 2 !== t) || UeSkeletalTickController.AddManager(this),
          4 === t)
        ) {
          for (const r of this.Usn)
            r.SetTickGroup(1),
              r.SetComponentTickEnabled(this.Active),
              r.SetKuroOnlyTickOutside(!1);
          for (const n of this.Asn)
            n.SetTickGroup(1),
              n.SetComponentTickEnabled(this.Active),
              n.SetKuroOnlyTickOutside(!1);
        } else {
          for (const h of this.Usn)
            h.SetTickGroup(0),
              h.SetComponentTickEnabled(!1),
              h.SetKuroOnlyTickOutside(!0);
          for (const a of this.Asn)
            a.SetTickGroup(4),
              a.SetComponentTickEnabled(!1),
              a.SetKuroOnlyTickOutside(!0);
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
      this.Hte = this.Entity.GetComponent(1);
      var e = this.Hte.Owner.K2_GetComponentsByClass(
          UE.SkeletalMeshComponent.StaticClass(),
        ),
        i = e.Num();
      for (let t = 0; t < i; ++t) {
        var o = e.Get(t);
        o instanceof UE.SkeletalMeshComponent &&
          (o.MasterPoseComponent
            ? this.Asn.push(o)
            : (this.Usn.push(o), this.Gpa || (this.Gpa = o)),
          this.XQs || (this.XQs = o.GetAnimInstance()));
      }
      this.XQs && this.XQs.SetDelayAnimTime(0, 0),
        PerformanceController_1.PerformanceController
          .IsEntityTickPerformanceTest
          ? (this.TickMode = 1)
          : this.Psn(),
        (this.TickType = 1),
        (this.Rsn = void 0);
    }
    OnEnd() {
      (this.TickMode = 0), (this.TickType = 0);
      for (const t of this.Usn) t.SetComponentTickEnabled(!1);
      return !0;
    }
    OnTick(t) {
      var e;
      if (
        (1 < this.Entity.GetTickInterval() &&
          ((e =
            t *
            MathUtils_1.MathUtils.MillisecondToSecond *
            this.TimeDilation *
            (this.Entity.GetComponent(109)?.CurrentTimeScale ?? 1)),
          this.XQs?.SetDelayAnimTime(
            Math.min(MAX_TIME_DELAY_ANIM, e),
            Math.min(MAX_COLLECT_PERIOD_DELAY_ANIM, e / 2),
          )),
        this.Psn(),
        3 === this.TickMode)
      ) {
        var i =
          t *
          MathUtils_1.MathUtils.MillisecondToSecond *
          this.TimeDilation *
          (this.Entity.GetComponent(109)?.CurrentTimeScale ?? 1);
        (this.d3r = Time_1.Time.Frame), this.XQs?.AddDeltaForDelayAnim(i);
        for (const o of this.Usn)
          (2 === this.TickType && !this.CheckMainMesh(o)) ||
            o.KuroTickComponentOutside(i);
        if (2 !== this.TickType)
          for (const s of this.Asn) s.KuroTickComponentOutside(i);
      }
    }
    ProxyTick(t) {
      if (1 === this.TickType || 2 === this.TickType) {
        this.d3r = Time_1.Time.Frame;
        var e =
          t *
          this.TimeDilation *
          (this.Entity.GetComponent(109)?.CurrentTimeScale ?? 1);
        this.XQs?.AddDeltaForDelayAnim(e);
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
      }
    }
    AfterProxyTick(t) {
      if (1 === this.TickType) {
        var e =
          t *
          this.TimeDilation *
          (this.Entity.GetComponent(109)?.CurrentTimeScale ?? 1);
        if (this.Tsn && ((this.Tsn = !1), this.d3r !== Time_1.Time.Frame))
          for (const i of this.Usn) i.KuroTickComponentOutside(t);
        if (this.Gpa?.RenderedAndNotSkipUpdate())
          for (const o of this.Asn)
            o
              ? o.KuroTickComponentOutside(e)
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Test",
                  6,
                  "NoSkeletalMesh",
                  ["EntityId", this.Entity.Id],
                  ["Actor", this.Hte?.Owner?.GetName()],
                );
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
  __decorate(
    [(0, PerformanceDecorators_1.TickEntitySkeletonProxyPerformance)()],
    UeSkeletalTickManageComponent.prototype,
    "ProxyTick",
    null,
  ),
  __decorate(
    [(0, PerformanceDecorators_1.TickEntitySkeletonProxyPerformance)()],
    UeSkeletalTickManageComponent.prototype,
    "AfterProxyTick",
    null,
  ),
  (UeSkeletalTickManageComponent = UeSkeletalTickManageComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(101)],
      UeSkeletalTickManageComponent,
    )),
  (exports.UeSkeletalTickManageComponent = UeSkeletalTickManageComponent);
//# sourceMappingURL=UeSkeletalTickManageComponent.js.map

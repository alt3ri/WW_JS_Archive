"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    let s;
    const r = arguments.length;
    let h =
      r < 3 ? e : o === null ? (o = Object.getOwnPropertyDescriptor(e, i)) : o;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      h = Reflect.decorate(t, e, i, o);
    else
      for (let n = t.length - 1; n >= 0; n--)
        (s = t[n]) && (h = (r < 3 ? s(h) : r > 3 ? s(e, i, h) : s(e, i)) || h);
    return r > 3 && h && Object.defineProperty(e, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UeSkeletalTickManageComponent = exports.UeSkeletalTickController =
    void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const Time_1 = require("../../../../Core/Common/Time");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const PerformanceController_1 = require("../../../../Core/Performance/PerformanceController");
const PerformanceDecorators_1 = require("../../../../Core/Performance/PerformanceDecorators");
const TickSystem_1 = require("../../../../Core/Tick/TickSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const Global_1 = require("../../../Global");
class UeSkeletalTickController {
  static AddManager(t) {
    this.Managers.add(t);
  }
  static DeleteManager(t) {
    this.Managers.delete(t);
  }
  static TickManagers(t) {
    for (const e of this.Managers) e.Active && e.ProxyTick(t);
  }
  static AfterTickManagers(t) {
    for (const e of this.Managers) e.Active && e.AfterProxyTick(t);
  }
}
(exports.UeSkeletalTickController = UeSkeletalTickController).Managers =
  new Set();
let UeSkeletalTickManageComponent = class UeSkeletalTickManageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.jsn = !1),
      (this.Hte = void 0),
      (this.b3r = -1),
      (this.Wsn = !1),
      (this.Ksn = 0),
      (this.Qsn = void 0),
      (this.TickType = 0),
      (this.Xsn = new Array()),
      (this.$sn = new Array());
  }
  get TickMode() {
    return this.Ksn;
  }
  set TickMode(t) {
    if (this.Ksn !== t) {
      if (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            6,
            "Set Skeletal TickMode",
            ["Entity", this.Entity.Id],
            ["TickMode", t],
          ),
        (this.Ksn = t) === 1)
      ) {
        for (const e of this.Xsn)
          TickSystem_1.TickSystem.SetSkeletalMeshProxyTickFunction(0, e);
        for (const i of this.$sn)
          TickSystem_1.TickSystem.SetSkeletalMeshProxyTickFunction(4, i);
      } else {
        for (const o of this.Xsn)
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
        for (const s of this.$sn)
          s
            ? Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Test",
                6,
                "HasSkeletalMesh",
                ["EntityId", this.Entity.Id],
                ["Actor", this.Hte?.Owner?.GetName()],
                ["SkelMesh", s.GetName()],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Test",
                6,
                "NoSkeletalMesh",
                ["EntityId", this.Entity.Id],
                ["Actor", this.Hte?.Owner?.GetName()],
              ),
            TickSystem_1.TickSystem.CleanSkeletalMeshProxyTickFunction(s);
      }
      if (
        (t === 1 || t === 2
          ? UeSkeletalTickController.AddManager(this)
          : UeSkeletalTickController.DeleteManager(this),
        t === 4)
      ) {
        for (const r of this.Xsn)
          r.SetTickGroup(1),
            r.SetComponentTickEnabled(this.Active),
            r.SetKuroOnlyTickOutside(!1);
        for (const h of this.$sn)
          h.SetTickGroup(1),
            h.SetComponentTickEnabled(this.Active),
            h.SetKuroOnlyTickOutside(!1);
      } else {
        for (const n of this.Xsn)
          n.SetTickGroup(0),
            n.SetComponentTickEnabled(!1),
            n.SetKuroOnlyTickOutside(!0);
        for (const a of this.$sn)
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
    const e = this.Hte.Owner.K2_GetComponentsByClass(
      UE.SkeletalMeshComponent.StaticClass(),
    );
    const i = e.Num();
    for (let t = 0; t < i; ++t) {
      const o = e.Get(t);
      o instanceof UE.SkeletalMeshComponent &&
        (o.MasterPoseComponent ? this.$sn : this.Xsn).push(o);
    }
    PerformanceController_1.PerformanceController.IsEntityTickPerformanceTest
      ? (this.TickMode = 1)
      : this.Ysn(),
      (this.TickType = 1),
      (this.Qsn = void 0);
  }
  OnEnd() {
    (this.TickMode = 0), (this.TickType = 0);
    for (const t of this.Xsn) t.SetComponentTickEnabled(!1);
    return !0;
  }
  OnTick(t) {
    if ((this.Ysn(), this.TickMode === 3)) {
      this.b3r = Time_1.Time.Frame;
      const e =
        t *
        MathUtils_1.MathUtils.MillisecondToSecond *
        this.TimeDilation *
        (this.Entity.GetComponent(107)?.CurrentTimeScale ?? 1);
      for (const i of this.Xsn)
        (this.TickType === 2 && !this.CheckMainMesh(i)) ||
          i.KuroTickComponentOutside(e);
      if (this.TickType !== 2)
        for (const o of this.$sn) o.KuroTickComponentOutside(e);
    }
  }
  OnAfterTick(t) {
    if (this.jsn && ((this.jsn = !1), this.b3r !== Time_1.Time.Frame)) {
      const e = this.Hte.Owner.CustomTimeDilation;
      const i = t * MathUtils_1.MathUtils.MillisecondToSecond * e;
      for (const o of this.Xsn) o.KuroTickComponentOutside(i);
    }
  }
  ProxyTick(t) {
    if (this.TickType === 1 || this.TickType === 2) {
      this.b3r = Time_1.Time.Frame;
      const e =
        t *
        this.TimeDilation *
        (this.Entity.GetComponent(107)?.CurrentTimeScale ?? 1);
      for (const i of this.Xsn)
        (this.TickType === 2 && !this.CheckMainMesh(i)) ||
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
    if (this.TickType === 1) {
      this.b3r = Time_1.Time.Frame;
      const e =
        t *
        this.TimeDilation *
        (this.Entity.GetComponent(107)?.CurrentTimeScale ?? 1);
      for (const i of this.$sn)
        i
          ? i.KuroTickComponentOutside(e)
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
    if ((this.TickMode !== 3 && (this.jsn = !0), this.TickMode === 4))
      for (const t of this.Xsn) t.SetComponentTickEnabled(!0);
  }
  OnDisable() {
    if (this.TickMode === 4)
      for (const t of this.Xsn) t.SetComponentTickEnabled(!1);
  }
  SetTakeOverTick(t) {
    (this.Wsn = t), this.Ysn();
  }
  SetLodBias(t) {
    for (const e of this.Xsn) e.SetLODBias(t);
  }
  SetSkeletalMeshTickType(t) {
    let e;
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
    return !!t.IsValid() && t.GetName() === "CharacterMesh0";
  }
  Ysn() {
    this.Wsn
      ? (this.TickMode = 3)
      : this.IsMainRole()
        ? (this.TickMode = 2)
        : (this.TickMode = 1);
  }
  IsMainRole() {
    return this.Hte?.Owner === Global_1.Global.BaseCharacter;
  }
};
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
  (UeSkeletalTickManageComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(99)],
    UeSkeletalTickManageComponent,
  )),
  (exports.UeSkeletalTickManageComponent = UeSkeletalTickManageComponent);
// # sourceMappingURL=UeSkeletalTickManageComponent.js.map

"use strict";
let SceneItemTurntableControllerComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    let n;
    const h = arguments.length;
    let r =
      h < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(t, e, i, s);
    else
      for (let o = t.length - 1; o >= 0; o--)
        (n = t[o]) && (r = (h < 3 ? n(r) : h > 3 ? n(e, i, r) : n(e, i)) || r);
    return h > 3 && r && Object.defineProperty(e, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemTurntableControllerComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
class RotatingRing {
  constructor() {
    (this.Index = 0),
      (this.ControllerRingActor = void 0),
      (this.RingRotator = void 0),
      (this.CurSpeed = -0),
      (this.AccumulateAngle = -0),
      (this.IsSelected = !1),
      (this.IsAtTarget = !1),
      (this.IsRotating = !1);
  }
}
let SceneItemTurntableControllerComponent =
  (SceneItemTurntableControllerComponent_1 = class SceneItemTurntableControllerComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.O_n = void 0),
        (this.k_n = void 0),
        (this.Rne = void 0),
        (this.Xte = void 0),
        (this.zht = void 0),
        (this.F_n = !1),
        (this.Qnn = () => {
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.Qnn,
          ),
            this.V_n() &&
              (this.H_n(), (this.F_n = !0), this.UpdateAllRingsAtTarget(!0)) &&
              !this.Xte?.HasTag(1298716444) &&
              this.j_n();
        }),
        (this.B1n = (t, e) => {
          if (this.F_n && t === 1298716444) {
            this.SetAllowRotate(!1);
            for (const s of this.k_n) {
              const i = this.O_n.ItemConfig[s.Index];
              s?.IsAtTarget ||
                (this.W_n(s, i.TargetAngle),
                this.UpdateRingAtTarget(s.Index, !1));
            }
            this.UpdateAllRingsAtTargetEffect(),
              e &&
                EventSystem_1.EventSystem.EmitWithTarget(
                  this.Entity,
                  EventDefine_1.EEventName.OnTurntableControllerBusyStateChange,
                  !1,
                  !1,
                );
          }
        });
    }
    OnInitData(t) {
      var t = t.GetParam(SceneItemTurntableControllerComponent_1)[0];
      const e = this.Entity?.GetComponent(0);
      if (!e) return !1;
      if (t) {
        const i = t.Config.ItemConfig?.length;
        if (void 0 === i || i <= 0)
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              40,
              "稷廷开门机关组件创建错误，圈数不对",
            );
        else {
          (this.zht = e), (this.O_n = t.Config), (this.k_n = []);
          for (let t = 0; t < i; t++) {
            const s = new RotatingRing();
            (s.Index = t),
              (s.IsAtTarget = !1),
              (s.IsSelected = !1),
              (s.IsRotating = !1),
              (s.CurSpeed = 0),
              (s.AccumulateAngle = 0),
              this.k_n.push(s);
          }
          this.F_n = !1;
        }
      }
      return !0;
    }
    OnStart() {
      return (
        (this.Xte = this.Entity.GetComponent(177)),
        this.Xte
          ? (this.O_n &&
              EventSystem_1.EventSystem.AddWithTarget(
                this.Entity,
                EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
                this.Qnn,
              ),
            !0)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                40,
                "稷廷开门机关组件初始化错误，找不到LevelTagComponent",
              ),
            !1)
      );
    }
    OnActivate() {
      this.SetAllowRotate(!1),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.B1n,
        );
    }
    OnTick(t) {
      this.F_n &&
        (this.GetControlType() === IComponent_1.EControllerType.FixedAngle
          ? this.K_n(t)
          : this.Q_n(t),
        this.X_n(t));
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.B1n,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.B1n,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Qnn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.Qnn,
          ),
        !0
      );
    }
    V_n() {
      const t = this.Entity?.GetComponent(182);
      if (!t)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              40,
              "稷廷开门机关组件初始化错误，SceneItemActorComponent组件获取失败",
            ),
          !1
        );
      for (const s of this.k_n) {
        const e = "Ring" + s.Index;
        const i = t.GetActorInSceneInteraction(e);
        if (!i?.IsValid())
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                40,
                "稷廷开门机关组件初始化错误，对应Actor无效",
                ["key", e],
              ),
            !1
          );
        s.ControllerRingActor = i;
      }
      return !0;
    }
    H_n() {
      const t = this.Xte?.HasTag(1298716444) ?? !1;
      for (const i of this.k_n) {
        const e = this.O_n.ItemConfig[i.Index];
        t ? this.W_n(i, e.TargetAngle) : this.W_n(i, e.InitAngle);
      }
    }
    DeselectAllRings(t) {
      for (const e of this.k_n) e.IsSelected = !1;
      t && this.UpdateAllRingsSelectedEffect();
    }
    SelectRingByIndex(t, e) {
      t = this.k_n[t];
      t &&
        ((t.IsSelected = !0), e) &&
        this.UpdateRingSelectedEffectByIndex(t.Index);
    }
    DeselectRingByIndex(t, e) {
      t = this.k_n[t];
      t &&
        ((t.IsSelected = !1), e) &&
        this.UpdateRingSelectedEffectByIndex(t.Index);
    }
    $_n(t) {
      switch (t) {
        case 0:
          return 981971147;
        case 1:
          return 965193528;
        case 2:
          return 1015526385;
      }
      return 0;
    }
    Y_n(t) {
      switch (t) {
        case 0:
          return -639326900;
        case 1:
          return -622549281;
        case 2:
          return -605771662;
      }
      return 0;
    }
    J_n(t, e) {
      t = this.k_n[t];
      t &&
        this.F_n &&
        this.GetRotateAllowed() &&
        !this.IsBusyRotating() &&
        ((t.AccumulateAngle = 0),
        (t.CurSpeed =
          (Math.abs(this.O_n.RotationSpeed) * (e ? 1 : -1)) /
          CommonDefine_1.MILLIONSECOND_PER_SECOND),
        (t.IsRotating = !0));
    }
    z_n(t) {
      t = this.k_n[t];
      t &&
        this.F_n &&
        this.GetRotateAllowed() &&
        ((t.AccumulateAngle = 0), (t.CurSpeed = 0), (t.IsRotating = !1));
    }
    TriggerStartSelectedRingsRotate() {
      this.O_n.Type === IComponent_1.EControllerType.FixedAngle
        ? this.Z_n()
        : this.eun();
    }
    Z_n() {
      this.F_n &&
        this.GetRotateAllowed() &&
        this.O_n.Type === IComponent_1.EControllerType.FixedAngle &&
        (this.k_n.forEach((t) => {
          let e;
          t.IsSelected &&
            ((e = this.O_n.RotationSpeed > 0), this.J_n(t.Index, e));
        }),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnTurntableControllerBusyStateChange,
          !0,
          !1,
        ));
    }
    eun() {
      this.F_n &&
        this.GetRotateAllowed() &&
        this.O_n.Type === IComponent_1.EControllerType.FreeAngle &&
        (this.k_n.forEach((t) => {
          let e;
          t.IsSelected &&
            ((e = this.O_n.RotationSpeed > 0), this.J_n(t.Index, e));
        }),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnTurntableControllerBusyStateChange,
          !0,
          !1,
        ));
    }
    TriggerStopAllRingsRotate() {
      this.O_n.Type === IComponent_1.EControllerType.FixedAngle
        ? this.tun()
        : this.iun();
    }
    tun() {
      this.F_n &&
        this.GetRotateAllowed() &&
        this.IsBusyRotating() &&
        this.O_n.Type === IComponent_1.EControllerType.FixedAngle &&
        (this.k_n.forEach((t) => {
          t.IsRotating && this.oun(t, -t.AccumulateAngle), this.z_n(t.Index);
        }),
        this.UpdateAllRingsAtTarget(!0) && this.j_n(),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnTurntableControllerBusyStateChange,
          !1,
          this.IsAllRingsAtTarget(),
        ));
    }
    iun() {
      this.F_n &&
        this.GetRotateAllowed() &&
        this.IsBusyRotating() &&
        this.O_n.Type === IComponent_1.EControllerType.FreeAngle &&
        (this.k_n.forEach((t) => {
          this.z_n(t.Index);
        }),
        this.UpdateAllRingsAtTarget(!0) && this.j_n(),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnTurntableControllerBusyStateChange,
          !1,
          this.IsAllRingsAtTarget(),
        ));
    }
    TriggerResetAllRingsToInitAngle(t = !1) {
      !this.F_n ||
        !this.GetRotateAllowed() ||
        this.IsBusyRotating() ||
        (this.IsAllRingsAtTarget() && !t) ||
        (this.k_n.forEach((t) => {
          const e = this.O_n.ItemConfig[t.Index];
          this.W_n(t, e.InitAngle);
        }),
        this.UpdateAllRingsAtTarget(!0));
    }
    K_n(e) {
      if (this.F_n) {
        const i = this.O_n;
        if (i)
          for (const r of this.k_n)
            if (r.IsRotating) {
              let t = r.CurSpeed * e;
              var s;
              const n = r.AccumulateAngle + t;
              const h = i.ItemConfig[r.Index].RotateAngle;
              Math.abs(n) >= Math.abs(h)
                ? ((s = r.CurSpeed > 0),
                  (t -= n - Math.abs(h) * (s ? 1 : -1)),
                  this.oun(r, t),
                  (r.AccumulateAngle += t),
                  this.z_n(r.Index),
                  this.IsBusyRotating()
                    ? this.UpdateRingAtTarget(r.Index, !0)
                    : (this.UpdateAllRingsAtTarget(!0) && this.j_n(),
                      EventSystem_1.EventSystem.EmitWithTarget(
                        this.Entity,
                        EventDefine_1.EEventName
                          .OnTurntableControllerBusyStateChange,
                        !1,
                        this.IsAllRingsAtTarget(),
                      )))
                : (this.oun(r, t),
                  (r.AccumulateAngle += t),
                  r.IsAtTarget && this.UpdateRingAtTarget(r.Index, !0));
            }
      }
    }
    Q_n(t) {
      if (this.F_n)
        for (const i of this.k_n) {
          var e;
          i.IsRotating &&
            ((e = i.CurSpeed * t), this.oun(i, e), i.IsAtTarget) &&
            this.UpdateRingAtTarget(i.Index, !0);
        }
    }
    X_n(t) {
      if (this.F_n)
        for (const n of this.k_n) {
          var e, i, s;
          n.IsRotating ||
            !n.IsAtTarget ||
            ((s = this.O_n.ItemConfig[n.Index]),
            (s = this.run(this.nun(n), s.TargetAngle)),
            MathUtils_1.MathUtils.IsNearlyZero(s)) ||
            ((e = s > 0),
            (i =
              this.O_n.RotationSpeed / CommonDefine_1.MILLIONSECOND_PER_SECOND),
            (s = Math.min(Math.abs(s), Math.abs(i * t)) * (e ? 1 : -1)),
            this.oun(n, s));
        }
    }
    nun(t) {
      if (t?.ControllerRingActor?.IsValid())
        return (
          t.RingRotator ||
            (t.RingRotator = Rotator_1.Rotator.Create(
              t.ControllerRingActor.RootComponent.GetRelativeTransform().Rotator(),
            )),
          -t.RingRotator.Pitch
        );
    }
    W_n(t, e) {
      t.ControllerRingActor?.IsValid() &&
        (t.RingRotator || (t.RingRotator = Rotator_1.Rotator.Create()),
        (t.RingRotator.Pitch = -e),
        t.ControllerRingActor.RootComponent.K2_SetRelativeRotation(
          t.RingRotator.ToUeRotator(),
          !1,
          void 0,
          !1,
        ));
    }
    oun(t, e) {
      t.ControllerRingActor?.IsValid() &&
        (t.RingRotator || (t.RingRotator = Rotator_1.Rotator.Create()),
        (t.RingRotator.Pitch -= e),
        t.ControllerRingActor.RootComponent.K2_SetRelativeRotation(
          t.RingRotator.ToUeRotator(),
          !1,
          void 0,
          !1,
        ));
    }
    UpdateAllRingsAtTarget(t) {
      let e = !0;
      for (const i of this.k_n)
        this.UpdateRingAtTarget(i.Index, !1) || (e = !1);
      return t && this.UpdateAllRingsAtTargetEffect(), e;
    }
    UpdateRingAtTarget(t, e) {
      let i;
      let s;
      let n;
      var t = this.k_n[t];
      return (
        !(!t || !this.F_n || !t?.RingRotator) &&
        ((n = this.nun(t)),
        (i = (s = this.O_n).ItemConfig[t.Index]?.TargetAngle),
        (s =
          this.O_n.Type === IComponent_1.EControllerType.FixedAngle
            ? 1
            : s.IntervalAngle),
        (n = Math.abs(this.run(n, i))),
        (t.IsAtTarget = n <= s),
        e && this.UpdateRingAtTargetEffectByIndex(t.Index),
        t.IsAtTarget)
      );
    }
    IsBusyRotating() {
      for (const t of this.k_n) if (t.IsRotating) return !0;
      return !1;
    }
    IsRingRotatingByIndex(t) {
      t = this.k_n[t];
      return !(!t || !this.F_n) && t.IsRotating;
    }
    GetRingsNum() {
      return this.k_n?.length;
    }
    GetControlType() {
      return this.O_n.Type;
    }
    IsAllRingsAtTarget() {
      for (const t of this.k_n) if (!t.IsAtTarget) return !1;
      return !0;
    }
    IsRingAtTargetByIndex(t) {
      t = this.k_n[t];
      return !(!t || !this.F_n) && t.IsAtTarget;
    }
    IsRingSelectedByIndex(t) {
      t = this.k_n[t];
      return !(!t || !this.F_n) && t.IsSelected;
    }
    UpdateAllRingsAtTargetEffect() {
      if (this.Xte) {
        this.Xte.NotifyLock++;
        for (const e of this.k_n) {
          var t;
          e.IsAtTarget
            ? ((t = this.Y_n(e.Index)),
              this.Xte.HasTag(t) || this.Xte.AddTag(t))
            : ((t = this.Y_n(e.Index)),
              this.Xte.HasTag(t) && this.Xte.RemoveTag(t));
        }
        this.Xte.NotifyLock--;
      }
    }
    UpdateRingAtTargetEffectByIndex(t) {
      let e;
      var t = this.k_n[t];
      t &&
        this.F_n &&
        (t.IsAtTarget
          ? ((e = this.Y_n(t.Index)), this.Xte.HasTag(e) || this.Xte.AddTag(e))
          : ((e = this.Y_n(t.Index)),
            this.Xte.HasTag(e) && this.Xte.RemoveTag(e)));
    }
    UpdateAllRingsSelectedEffect() {
      if (this.Xte) {
        this.Xte.NotifyLock++;
        for (const e of this.k_n) {
          var t;
          e.IsSelected
            ? ((t = this.$_n(e.Index)),
              this.Xte.HasTag(t) || this.Xte.AddTag(t))
            : ((t = this.$_n(e.Index)),
              this.Xte.HasTag(t) && this.Xte.RemoveTag(t));
        }
        this.Xte.NotifyLock--;
      }
    }
    UpdateRingSelectedEffectByIndex(t) {
      let e;
      var t = this.k_n[t];
      t &&
        this.F_n &&
        (t.IsSelected
          ? ((e = this.$_n(t.Index)), this.Xte.HasTag(e) || this.Xte.AddTag(e))
          : ((e = this.$_n(t.Index)),
            this.Xte.HasTag(e) && this.Xte.RemoveTag(e)));
    }
    SetAllowRotate(t) {
      t && !this.GetRotateAllowed()
        ? (this.Enable(
            this.Rne,
            "SceneItemTurntableControllerComponent.SetAllowRotate",
          ),
          (this.Rne = void 0))
        : !t &&
          this.GetRotateAllowed() &&
          (this.Rne = this.Disable("稷廷开门主控机关: 旋转被禁止，禁用组件"));
    }
    GetRotateAllowed() {
      return void 0 === this.Rne;
    }
    j_n() {
      let t;
      this.zht &&
        (((t = Protocol_1.Aki.Protocol.Ccs.create()).rkn =
          MathUtils_1.MathUtils.NumberToLong(this.zht.GetCreatureDataId())),
        Net_1.Net.Call(9599, t, (t) => {
          t?.X5n !== Protocol_1.Aki.Protocol.lkn.Sys &&
            t?.X5n !==
              Protocol_1.Aki.Protocol.lkn.Proto_ErrStateEntityStateNoChange &&
            (this.F_n &&
              this.GetRotateAllowed() &&
              this.IsBusyRotating() &&
              this.TriggerStopAllRingsRotate(),
            this.TriggerResetAllRingsToInitAngle(!0),
            EventSystem_1.EventSystem.EmitWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnTurntableControllerBusyStateChange,
              !1,
              !1,
            ));
        }));
    }
    run(t, e) {
      return this.sun(e - t, -180, 180);
    }
    sun(t, e, i) {
      let s = t;
      for (; s < e; ) s += 360;
      for (; s >= i; ) s -= 360;
      return s;
    }
  });
(SceneItemTurntableControllerComponent =
  SceneItemTurntableControllerComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(119)],
      SceneItemTurntableControllerComponent,
    )),
  (exports.SceneItemTurntableControllerComponent =
    SceneItemTurntableControllerComponent);
// # sourceMappingURL=SceneItemTurntableControllerComponent.js.map

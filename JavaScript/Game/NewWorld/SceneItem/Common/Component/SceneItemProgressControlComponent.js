"use strict";
var SceneItemProgressControlComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var r,
        h = arguments.length,
        a =
          h < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, s);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (r = t[n]) &&
            (a = (h < 3 ? r(a) : 3 < h ? r(e, i, a) : r(e, i)) || a);
      return 3 < h && a && Object.defineProperty(e, i, a), a;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemProgressControlComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IUtil_1 = require("../../../../../UniverseEditor/Interface/IUtil"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CHARGING_DEVICE_DISABLE_OFFSET = 2e3;
let SceneItemProgressControlComponent =
  (SceneItemProgressControlComponent_1 = class SceneItemProgressControlComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Rne = void 0),
        (this.Lo = void 0),
        (this.EIe = void 0),
        (this.mBe = void 0),
        (this.Hte = void 0),
        (this.Lie = void 0),
        (this.u1n = void 0),
        (this.c1n = void 0),
        (this.m1n = (t, e) => {
          switch (t) {
            case -1152559349:
              this.d1n(
                "[SceneItemProgressControlComponent.HandleUpdateState] 状态变为常态, 停止进度控制",
              ),
                this.C1n(),
                this.H1t(),
                this.g1n();
              break;
            case -3775711:
              this.f1n();
              break;
            case 1298716444:
              var i = this.Lo.Control,
                s = this.EIe.GetBaseInfo().HeadStateViewConfig;
              "ChargingDevice" === i.Type && 10 === s?.HeadStateViewType
                ? TimerSystem_1.TimerSystem.Delay(() => {
                    this.d1n(
                      "[SceneItemProgressControlComponent.HandleUpdateState] 状态变为完成, 停止进度控制",
                    );
                  }, CHARGING_DEVICE_DISABLE_OFFSET)
                : this.d1n(
                    "[SceneItemProgressControlComponent.HandleUpdateState] 状态变为完成, 停止进度控制",
                  );
          }
        }),
        (this.vtn = void 0),
        (this.p1n = !1),
        (this.v1n = void 0),
        (this.M1n = 0),
        (this.E1n = (t) => {
          var e = this.Lo.Control;
          ("CaptureStrategicPoint" !== e.Type &&
            "CaptureStrategicPoint2" !== e.Type) ||
            (this.p1n !== t && ((this.p1n = t), this.S1n()));
        }),
        (this.y1n = (t, e) => {
          var i = this.Lo.Control;
          if (
            ("CaptureStrategicPoint" === i.Type ||
              "CaptureStrategicPoint2" === i.Type) &&
            e?.Valid
          ) {
            var s = e.Entity.GetComponent(3);
            if (!s?.IsRoleAndCtrlByMe) {
              if (t) {
                (s = i.EnemyEntitiyMatch),
                  (t = e.Entity.GetComponent(0).GetBaseInfo()?.Category);
                if (!t) return;
                if (!(0, IUtil_1.isEntitiyMatch)(s, t)) return;
                this.v1n.add(e);
              } else this.v1n.delete(e);
              this.S1n();
            }
          }
        }),
        (this.zpe = (t, e) => {
          this.v1n.has(e) && this.y1n(!1, e);
        }),
        (this.$br = void 0),
        (this.Zln = (t) => {
          if (this.D1n() && this.lcn(t) && 0 !== t.DamageId) {
            this.u1n.CurrentValue;
            var e,
              i = this.Lo?.Control;
            switch (i?.Type) {
              case "ChargingDevice":
                (e = MathUtils_1.MathUtils.Clamp(
                  this.u1n.CurrentValue + i.HitExtraValue,
                  0,
                  i.MaxValue,
                )) !== this.u1n.CurrentValue &&
                  ((this.u1n.CurrentValue = e), this.H1t(), this.g1n());
                break;
              case "TimedStrikeDevice":
                0 !== this.GI1 &&
                  6 !== this.GI1 &&
                  this.u1n.CurrentValue < i.MaxValue &&
                  ((this.GI1 = 1), this.zMc(0));
            }
          }
        }),
        (this.l_l = !0),
        (this.GI1 = 0),
        (this.KMc = 0),
        (this.XMc = 0);
    }
    OnInitData(t) {
      (t = t.GetParam(SceneItemProgressControlComponent_1)[0]),
        (this.Lo = t),
        (this.EIe = this.Entity.GetComponent(0)),
        (this.c1n = new Set()),
        (this.Rne = void 0),
        this.C1n(),
        (t = this.Lo.Control);
      switch (t.Type) {
        case "CaptureStrategicPoint":
        case "CaptureStrategicPoint2":
          (this.p1n = !1), (this.v1n = new Set());
          break;
        case "ChargingDevice":
        case "TimedStrikeDevice":
          break;
        default:
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelPlay",
                39,
                "[SceneItemProgressControlComponent.OnCreate] 不支持的进度控制类型",
                ["PbDataId", this.EIe.GetPbDataId()],
              ),
            !1
          );
      }
      return !0;
    }
    OnStart() {
      if (
        ((this.mBe = this.Entity.CheckGetComponent(131)),
        (this.Lie = this.Entity.CheckGetComponent(194)),
        (this.Hte = this.Entity.CheckGetComponent(200)),
        !this.mBe || !this.Lie || !this.Hte)
      )
        return !1;
      switch (this.Lo.Control.Type) {
        case "CaptureStrategicPoint":
        case "CaptureStrategicPoint2":
          if (((this.vtn = this.Entity.CheckGetComponent(84)), !this.vtn))
            return !1;
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
            this.E1n,
          ),
            EventSystem_1.EventSystem.AddWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnEntityInOutRangeLocal,
              this.y1n,
            ),
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.RemoveEntity,
              this.zpe,
            );
          break;
        case "ChargingDevice":
        case "TimedStrikeDevice":
          (this.$br = this.Entity.CheckGetComponent(152)),
            this.$br && this.$br.RegisterComponent(this, this.Lo),
            EventSystem_1.EventSystem.AddWithTarget(
              this,
              EventDefine_1.EEventName.OnSceneItemHitByHitData,
              this.Zln,
            );
      }
      return !0;
    }
    OnActivate() {
      this.d1n(
        "[SceneItemProgressControlComponent.OnActivate] 初始停止进度控制",
      ),
        this.I1n(),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.m1n,
        )
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Temp",
              31,
              "SceneItemProgressControlComponent.OnActivate: 重复添加事件",
              ["PbDataId", this.EIe.GetPbDataId()],
            )
          : EventSystem_1.EventSystem.AddWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSceneItemStateChange,
              this.m1n,
            ),
        this.g1n();
    }
    OnEnd() {
      switch (this.Lo.Control.Type) {
        case "CaptureStrategicPoint":
        case "CaptureStrategicPoint2":
          this.vtn &&
            (EventSystem_1.EventSystem.RemoveWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
              this.E1n,
            ),
            EventSystem_1.EventSystem.RemoveWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnEntityInOutRangeLocal,
              this.y1n,
            ),
            (this.vtn = void 0)),
            EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.RemoveEntity,
              this.zpe,
            );
          break;
        case "ChargingDevice":
          EventSystem_1.EventSystem.HasWithTarget(
            this,
            EventDefine_1.EEventName.OnSceneItemHitByHitData,
            this.Zln,
          ) &&
            EventSystem_1.EventSystem.RemoveWithTarget(
              this,
              EventDefine_1.EEventName.OnSceneItemHitByHitData,
              this.Zln,
            );
      }
      return (
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.m1n,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.m1n,
          ),
        !(this.mBe = void 0)
      );
    }
    OnTick(t) {
      switch (this.Lo.Control.Type) {
        case "CaptureStrategicPoint":
        case "CaptureStrategicPoint2":
          this.T1n(t);
          break;
        case "ChargingDevice":
          this.lQs(t);
          break;
        case "TimedStrikeDevice":
          this.zMc(t);
      }
    }
    I1n() {
      this.mBe?.IsInState(2)
        ? this.f1n()
        : this.d1n(
            "[SceneItemProgressControlComponent.HandleUpdateState] 状态未激活, 停止进度控制",
          );
    }
    L1n() {
      var t = Protocol_1.Aki.Protocol.zls.create();
      (t.F4n = MathUtils_1.MathUtils.NumberToLong(
        this.EIe.GetCreatureDataId(),
      )),
        Net_1.Net.Call(17993, t, (t) => {});
    }
    g1n() {
      var t = this.Lo.Control;
      switch (t.Type) {
        case "CaptureStrategicPoint":
        case "CaptureStrategicPoint2":
        case "ChargingDevice":
        case "TimedStrikeDevice":
          this.u1n?.CurrentValue !== t.MaxValue ||
            this.mBe?.IsInState(4) ||
            this.L1n();
      }
    }
    D1n() {
      return void 0 === this.Rne;
    }
    f1n() {
      !this.D1n() &&
        this.Enable(
          this.Rne,
          "SceneItemProgressControlComponent.EnableProgressControl",
        ) &&
        ((this.Rne = void 0), this.R1n(!0));
    }
    d1n(t) {
      this.D1n() && ((this.Rne = this.Disable(t)), this.R1n(!1));
    }
    R1n(t) {
      var e = this.Lo.Control;
      switch (e.Type) {
        case "CaptureStrategicPoint":
        case "CaptureStrategicPoint2":
          this.S1n();
          break;
        case "TimedStrikeDevice":
          t
            ? this.u1n?.CurrentValue === e.InitValue
              ? (this.GI1 = 5)
              : (this.GI1 = 4)
            : (this.GI1 = 0),
            this.YMc();
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAnyProgressControlEnableStateChange,
        this.Entity,
        t,
        this.u1n,
      );
    }
    H1t() {
      this.c1n.forEach((t) => {
        t?.(this.u1n);
      });
    }
    AddProgressDataChangedCallback(t) {
      return !(!t || !this.c1n || (this.c1n.add(t), 0));
    }
    RemoveProgressDataChangedCallback(t) {
      return !(!t || !this.c1n) && this.c1n.delete(t);
    }
    GetProgressData() {
      return this.u1n;
    }
    C1n() {
      var t = this.Lo.Control;
      switch (t.Type) {
        case "CaptureStrategicPoint":
        case "CaptureStrategicPoint2":
        case "TimedStrikeDevice":
          this.u1n = {
            ProgressCtrlType: t.Type,
            CurrentValue: t.InitValue,
            MaxValue: t.MaxValue,
          };
          break;
        case "ChargingDevice":
          (this.u1n = {
            ProgressCtrlType: t.Type,
            CurrentValue: t.InitValue,
            MaxValue: t.MaxValue,
          }),
            (this.l_l = !0);
      }
    }
    U1n(t, e = 0) {
      if (0 === e)
        switch (t) {
          case 3:
            return 1803735224;
          case 1:
          case 2:
          case 4:
            return -1726296883;
        }
      else if (1 === e)
        switch (t) {
          case 1:
            return -975252567;
          case 2:
            return -582657804;
          case 3:
            return 852682560;
          case 4:
            return 1345839869;
        }
    }
    e4a(t) {
      var e = this.Lo.Control;
      if ("CaptureStrategicPoint" === e.Type)
        switch (t) {
          case 1:
          case 2:
            return -e.DecreaseSpeed;
          case 3:
            return e.IncreaseSpeed;
          case 4:
            return -(e.UnoccupiedDecreaseSpeed ?? 0);
          default:
            return 0;
        }
      else if ("CaptureStrategicPoint2" === e.Type)
        switch (t) {
          case 1:
            return e.PlayerInMonsterInCaptureSpeed;
          case 2:
            return e.PlayerOutMonsterInCaptureSpeed;
          case 3:
            return e.PlayerInMonsterOutCaptureSpeed;
          case 4:
            return e.PlayerOutMonsterOutCaptureSpeed;
          default:
            return 0;
        }
      return 0;
    }
    S1n() {
      var i = this.Lo.Control;
      if (
        "CaptureStrategicPoint" === i.Type ||
        "CaptureStrategicPoint2" === i.Type
      ) {
        var s = this.M1n;
        let e = 0;
        if (
          s !==
          (e = this.D1n()
            ? 0 < this.v1n.size
              ? this.p1n
                ? 1
                : 2
              : this.p1n
                ? 3
                : 4
            : e)
        ) {
          if (((this.M1n = e), i.ProgressPerformanceAttribute)) {
            var r = i.ProgressPerformanceAttribute,
              h = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r);
            this.Lie.HasTag(r) &&
              void 0 === this.Hte?.GetActiveTagSequencePlaybackProgress(h) &&
              this.Lie.RemoveTag(r);
            let t = !1;
            this.Lie.HasTag(r) || (this.Lie.AddTag(r), (t = !0));
            var a,
              r = this.e4a(s),
              n = this.e4a(e);
            (!t && r === n) ||
              (0 !== n &&
                ((a = Math.abs(this.u1n.MaxValue / n)),
                this.Hte?.SetActiveTagSequenceDurationTime(h, a)),
              (a = MathUtils_1.MathUtils.Clamp(
                this.u1n.CurrentValue / this.u1n.MaxValue,
                0,
                1,
              )),
              0 === n
                ? (this.Hte?.ResumeActiveTagSequence(h, r < 0),
                  this.Hte?.PauseActiveTagSequence(h),
                  this.Hte?.SetActiveTagSequencePlaybackProgress(
                    h,
                    0 < r ? a : 1 - a,
                  ))
                : (this.Hte?.ResumeActiveTagSequence(h, n < 0),
                  this.Hte?.SetActiveTagSequencePlaybackProgress(
                    h,
                    0 < n ? a : 1 - a,
                  )));
          }
          (r = "CaptureStrategicPoint" === i.Type ? (i.CaptureType ?? 0) : 1),
            (h = this.U1n(s, r)),
            (n = this.U1n(e, r));
          h !== n &&
            this.Lie &&
            (this.Lie.NotifyLock++,
            void 0 !== h && this.Lie.RemoveTag(h),
            void 0 !== n && this.Lie.AddTag(n),
            this.Lie.NotifyLock--);
        }
      }
    }
    T1n(t) {
      var e,
        i = this.Lo.Control;
      ("CaptureStrategicPoint" !== i.Type &&
        "CaptureStrategicPoint2" !== i.Type) ||
        ((e = this.e4a(this.M1n)),
        (t = MathUtils_1.MathUtils.Clamp(
          this.u1n.CurrentValue +
            (t / CommonDefine_1.MILLIONSECOND_PER_SECOND) * e,
          Math.min(0, i.MaxValue),
          Math.max(0, i.MaxValue),
        )) !== this.u1n.CurrentValue &&
          ((this.u1n.CurrentValue = t), this.H1t(), this.g1n()));
    }
    lcn(t) {
      return (
        !ModelManager_1.ModelManager.GameModeModel.IsMulti ||
        (!!t.Attacker?.Valid && t.Attacker.GetComponent(3).IsAutonomousProxy)
      );
    }
    lQs(t) {
      var e;
      this.l_l
        ? (this.l_l = !1)
        : "ChargingDevice" === (e = this.Lo?.Control)?.Type &&
          (t = MathUtils_1.MathUtils.Clamp(
            this.u1n.CurrentValue +
              (t / CommonDefine_1.MILLIONSECOND_PER_SECOND) * e.IncreaseSpeed,
            0,
            e.MaxValue,
          )) !== this.u1n.CurrentValue &&
          ((this.u1n.CurrentValue = t), this.H1t(), this.g1n());
    }
    zMc(t) {
      var e = this.Lo?.Control;
      if ("TimedStrikeDevice" === e?.Type)
        switch (this.GI1) {
          case 2:
            (this.KMc = Math.max(0, this.KMc - t)),
              0 < this.KMc ||
                (this.u1n.CurrentValue === e.MaxValue
                  ? (this.GI1 = 6)
                  : (this.GI1 = 3));
            break;
          case 4:
            (this.XMc = Math.max(0, this.XMc - t)),
              0 < this.XMc ||
                (0 === this.u1n.CurrentValue ? (this.GI1 = 5) : (this.GI1 = 3));
            break;
          case 3:
            var i = this.u1n.CurrentValue,
              s = MathUtils_1.MathUtils.Clamp(
                i - e.FallbackValue,
                0,
                e.MaxValue,
              );
            s !== i &&
              ((this.u1n.CurrentValue = s), this.H1t(), this.g1n(), this.YMc()),
              (this.XMc = e.FallbackInterval),
              (this.GI1 = 4);
            break;
          case 1:
            (i = this.u1n.CurrentValue),
              (s = MathUtils_1.MathUtils.Clamp(i + e.AddValue, 0, e.MaxValue));
            s !== i &&
              ((this.u1n.CurrentValue = s), this.H1t(), this.g1n(), this.YMc()),
              this.u1n.CurrentValue === e.MaxValue
                ? (this.GI1 = 6)
                : ((this.KMc = e.Timeout), (this.GI1 = 2));
            break;
          case 5:
            this.YMc();
        }
    }
    YMc() {
      var t = this.Lo?.Control;
      if ("TimedStrikeDevice" === t?.Type) {
        var i = t.ZeroValuePerformanceAttribute,
          s = !!i && this.Lie.HasTag(i),
          r = t.ProgressPerformanceAttribute,
          h = !!r && this.Lie.HasTag(r),
          a = t.AscendPerformanceAttribute,
          n = !!a && this.Lie.HasTag(a),
          o = t.DescendPerformanceAttribute,
          c = !!o && this.Lie.HasTag(o),
          v = t.AddValue;
        switch (this.GI1) {
          case 0:
            s && this.Lie.RemoveTag(i);
            break;
          case 1: {
            let e = !1;
            if ((s && this.Lie.RemoveTag(i), r)) {
              var _ = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r),
                C =
                  (h
                    ? void 0 ===
                        this.Hte?.GetActiveTagSequencePlaybackProgress(_) &&
                      (this.Lie.RemoveTag(r),
                      this.Lie.AddTag(r),
                      this.Hte?.PauseActiveTagSequence(_),
                      this.Hte?.SetActiveTagSequencePlaybackProgress(_, 0))
                    : (this.Lie.AddTag(r),
                      this.Hte?.PauseActiveTagSequence(_),
                      this.Hte?.SetActiveTagSequencePlaybackProgress(_, 0)),
                  MathUtils_1.MathUtils.Clamp(
                    (this.u1n.CurrentValue - v) / this.u1n.MaxValue,
                    0,
                    1,
                  )),
                g = MathUtils_1.MathUtils.Clamp(
                  this.u1n.CurrentValue / this.u1n.MaxValue,
                  0,
                  1,
                ),
                l = this.Hte?.GetIsActiveTagSequencePlayReverseFromConfig(_);
              let t = this.Hte?.GetActiveTagSequencePlaybackProgress(_);
              l &&
                ((t = 1 - t),
                this.Hte?.ResumeActiveTagSequence(_, !1),
                this.Hte?.PauseActiveTagSequence(_),
                this.Hte?.SetActiveTagSequencePlaybackProgress(_, t)),
                (e =
                  void 0 === t ||
                  C > t ||
                  MathUtils_1.MathUtils.IsNearlyEqual(C, t)),
                t !== g &&
                  (C > (t ?? 0) &&
                    this.Hte?.SetActiveTagSequencePlaybackProgress(_, C),
                  this.Hte?.PlayActiveTagSequenceTo(_, g, !1));
            }
            c && this.Lie.RemoveTag(o),
              a && e && (n && this.Lie?.RemoveTag(a), this.Lie?.AddTag(a));
            break;
          }
          case 5:
            r &&
              ((l = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r)),
              !1 ===
              (C = this.Hte?.GetIsActiveTagSequencePlayReverseFromConfig(l))
                ? this.Hte?.SetActiveTagSequencePlaybackProgress(l, 0)
                : !0 === C &&
                  this.Hte?.SetActiveTagSequencePlaybackProgress(l, 1)),
              h && this.Lie.RemoveTag(r),
              !s && i && this.Lie.AddTag(i),
              c && this.Lie.RemoveTag(o);
            break;
          case 3:
            s && this.Lie.RemoveTag(i),
              r &&
                ((_ =
                  GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r)),
                h
                  ? void 0 ===
                      this.Hte?.GetActiveTagSequencePlaybackProgress(_) &&
                    (this.Lie.RemoveTag(r),
                    this.Lie.AddTag(r),
                    this.Hte?.PauseActiveTagSequence(_),
                    this.Hte?.SetActiveTagSequencePlaybackProgress(_, 0))
                  : (this.Lie.AddTag(r),
                    this.Hte?.PauseActiveTagSequence(_),
                    this.Hte?.SetActiveTagSequencePlaybackProgress(_, 0)),
                (g = MathUtils_1.MathUtils.Clamp(
                  this.u1n.CurrentValue / this.u1n.MaxValue,
                  0,
                  1,
                )),
                (C = this.Hte?.GetIsActiveTagSequencePlayReverseFromConfig(_)),
                (l = this.Hte?.GetActiveTagSequencePlaybackProgress(_)),
                (C && l === g) ||
                  this.Hte?.PlayActiveTagSequenceTo(_, 1 - g, !0)),
              n && this.Lie.RemoveTag(a),
              o && (c && this.Lie?.RemoveTag(o), this.Lie?.AddTag(o));
        }
      }
    }
  });
(SceneItemProgressControlComponent = SceneItemProgressControlComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(127)],
    SceneItemProgressControlComponent,
  )),
  (exports.SceneItemProgressControlComponent =
    SceneItemProgressControlComponent);
//# sourceMappingURL=SceneItemProgressControlComponent.js.map

"use strict";
var SceneItemGravityComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var n,
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
        for (var r = t.length - 1; 0 <= r; r--)
          (n = t[r]) &&
            (a = (h < 3 ? n(a) : 3 < h ? n(e, i, a) : n(e, i)) || a);
      return 3 < h && a && Object.defineProperty(e, i, a), a;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemGravityComponent = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  LevelGeneralNetworks_1 = require("../../LevelGamePlay/LevelGeneralNetworks"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CHECK_DISTANCE_INTERVAL = 100;
let SceneItemGravityComponent =
  (SceneItemGravityComponent_1 = class SceneItemGravityComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.EIe = void 0),
        (this.Hte = void 0),
        (this.Lie = void 0),
        (this.mBe = void 0),
        (this._un = void 0),
        (this.R0n = void 0),
        (this.U0n = 0),
        (this.P0n = 0),
        (this.pFn = 0),
        (this.B0n = void 0),
        (this.nxe = 1),
        (this.q0n = -1),
        (this.G0n = -1),
        (this.N0n = !1),
        (this.O0n = void 0),
        (this.g_n = () => {
          this.k0n();
        }),
        (this.F0n = () => {
          this.V0n("[SceneItemGravityComponent] 锁定属性改变");
        }),
        (this.Rnn = () => {
          this.V0n("[SceneItemGravityComponent] 场景交互物加载完毕");
        }),
        (this.H0n = (t, e) => {
          var e = e.Entity;
          (e?.GetComponent(3) ?? !t) ||
            (!1 !== this.R0n.StopTeleControlMove &&
              ((t = e?.GetComponent(143)), (e = e?.GetComponent(187)), t) &&
              e?.IsAutonomousProxy &&
              t.ForceStopDropping());
        }),
        (this.j0n = () => {
          var t = Global_1.Global.BaseCharacter;
          t &&
            ((t = t.GetDistanceTo(this.Hte?.Owner)),
            this.N0n && t > this.G0n
              ? ((this.N0n = !1),
                ModelManager_1.ModelManager.ManipulaterModel?.RemoveShowLandTipsCount(
                  this.Entity,
                ))
              : !this.N0n &&
                t < this.q0n &&
                ((this.N0n = !0),
                ModelManager_1.ModelManager.ManipulaterModel?.AddShowLandTipsCount(
                  this.Entity,
                )));
        });
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemGravityComponent_1)[0];
      return (
        !!t &&
        ((this.EIe = this.Entity.CheckGetComponent(0)),
        (this.R0n = t),
        (this.P0n =
          this.R0n.DownTime / MathUtils_1.MathUtils.MillisecondToSecond),
        this.R0n.ShowLandTipRadius &&
          ((this.q0n = this.R0n.ShowLandTipRadius.EnterRadius),
          (this.G0n = this.R0n.ShowLandTipRadius.LeaveRadius)),
        !0)
      );
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.CheckGetComponent(187)),
        (this.Lie = this.Entity.CheckGetComponent(181)),
        (this.mBe = this.Entity.CheckGetComponent(120)),
        (this._un = this.Entity.CheckGetComponent(118)),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnEntityInOutRangeLocal,
          this.H0n,
        ) ||
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnEntityInOutRangeLocal,
            this.H0n,
          ),
        !0
      );
    }
    OnActivate() {
      return (
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.g_n,
        )
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Temp",
              32,
              "SceneItemGravityComponent.OnActivate: 重复添加事件",
              ["PbDataId", this.EIe?.GetPbDataId()],
            )
          : EventSystem_1.EventSystem.AddWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSceneItemStateChange,
              this.g_n,
            ),
        0 !== this.mBe.State && this.g_n(),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemLockPropChange,
          this.F0n,
        ),
        this.Hte.GetIsSceneInteractionLoadCompleted()
          ? this.V0n(
              "[SceneItemGravityComponent] OnActivate:场景交互物加载完毕",
            )
          : EventSystem_1.EventSystem.OnceWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
              this.Rnn,
            ),
        this.R0n?.ShowLandTipRadius &&
          (this.O0n = TimerSystem_1.TimerSystem.Forever(
            this.j0n,
            CHECK_DISTANCE_INTERVAL,
          )),
        !0
      );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnEntityInOutRangeLocal,
          this.H0n,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnEntityInOutRangeLocal,
            this.H0n,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemLockPropChange,
          this.F0n,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemLockPropChange,
            this.F0n,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.g_n,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.g_n,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Rnn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.Rnn,
          ),
        void 0 !== this.O0n &&
          (TimerSystem_1.TimerSystem.Remove(this.O0n), (this.O0n = void 0)),
        !0
      );
    }
    OnTick(t) {
      this.W0n(t * this.nxe);
    }
    OnChangeTimeDilation(t) {
      var e = this.Entity.GetComponent(110);
      (this.nxe = e ? t * e.CurrentTimeScale : 1),
        LevelGeneralNetworks_1.LevelGeneralNetworks.CheckEntityCanPushTimeDilation(
          this.EIe.GetEntityTimeScaleModifyStrategy(),
        ) &&
          LevelGeneralNetworks_1.LevelGeneralNetworks.PushEntityTimeDilation(
            this.EIe.GetCreatureDataId(),
            this.nxe,
          );
    }
    k0n() {
      switch (this.mBe.State) {
        case 1:
          this.ChangeTransition(!0);
          break;
        case 2:
          this.vFn(1);
          break;
        case 4:
          this.K0n("[SceneItemGravityComponent] 重力机关处于完成态");
          break;
        case 5:
          this.Lie?.HasTag(-709838471) &&
            this.K0n("[SceneItemGravityComponent] 重力机关处于静默态");
      }
    }
    ChangeTransition(t) {
      switch (this.U0n) {
        case 2:
        case 0:
          t || this.vFn(3);
          break;
        case 3:
        case 1:
          t && this.vFn(2);
      }
    }
    vFn(t) {
      this.U0n !== t &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneItem",
            40,
            "[SceneItemGravityComponent] ChangeAnimState",
            ["PbDataId", this.EIe?.GetPbDataId()],
            ["FromAnimState", this.U0n],
            ["ToAnimState", t],
          ),
        this.MLn(this.U0n, t),
        (this.U0n = t),
        this.W0n(0));
    }
    W0n(t = 0) {
      if (this.Q0n())
        if (this.X0n())
          switch (this.U0n) {
            case 0:
              this.$0n(t);
              break;
            case 1:
              this.Y0n(t);
              break;
            case 2:
              this.J0n(t);
              break;
            case 3:
              this.z0n(t);
          }
        else
          this.K0n(
            "[SceneItemGravityComponent] 重力机关被停用(完成态或被锁定或静默)",
          );
      else this.K0n("[SceneItemGravityComponent] 场景交互物未初始化");
    }
    $0n(t) {
      (this.pFn = 0), this.K0n("[SceneItemGravityComponent] 到达顶部");
    }
    Y0n(t) {
      (this.pFn = this.P0n), this.K0n("[SceneItemGravityComponent] 到达底部");
    }
    J0n(t) {
      (this.pFn = MathUtils_1.MathUtils.Clamp(this.pFn - t, 0, this.P0n)),
        this.V0n("[SceneItemGravityComponent] 上升中"),
        this.pFn <= 0 && this.vFn(0);
    }
    z0n(t) {
      (this.pFn = MathUtils_1.MathUtils.Clamp(this.pFn + t, 0, this.P0n)),
        this.V0n("[SceneItemGravityComponent] 下降中");
    }
    MLn(t, e) {
      this.Z0n(e), this.ELn(t, e);
    }
    Z0n(s) {
      if (this.Lie) {
        let e = void 0,
          i = void 0;
        switch (s) {
          case 3:
          case 2: {
            e =
              3 === s
                ? ((i = -223738243), 232332034)
                : ((i = 232332034), -223738243);
            var n = this.Lie.HasTag(i),
              h = !this.Lie.HasTag(e);
            if (!n && !h) break;
            let t = void 0;
            n &&
              ((t = this.Hte.GetActiveTagSequencePlaybackProgress(
                GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(i),
              )),
              this.Lie.RemoveTag(i)),
              h &&
                (this.Lie.AddTag(e),
                t &&
                  t < 1 &&
                  ((n = MathUtils_1.MathUtils.Clamp(1 - t, 0, 1)),
                  this.Hte.SetActiveTagSequencePlaybackProgress(
                    GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e),
                    n,
                  )),
                this.Hte.SetActiveTagSequenceDurationTime(
                  GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e),
                  this.R0n.DownTime,
                ));
            break;
          }
          case 0:
          case 1:
            if (((i = 0 === s ? -223738243 : 232332034), !this.Lie.HasTag(i))) {
              for (const t of [-223738243, 232332034])
                this.Lie.HasTag(t) && this.Lie.RemoveTag(t);
              this.Lie.AddTag(i);
            }
            this.Hte.SetActiveTagSequencePlaybackProgress(
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(i),
              1,
            ),
              this.Lie.RemoveTag(i);
        }
      }
    }
    ELn(i, s) {
      if (this.Lie) {
        let t = void 0,
          e = void 0;
        switch (i) {
          case 3:
            (e = -724436488), 1 === s && (t = -1498653671);
            break;
          case 2:
            (e = 1750799296), 0 === s && (t = -741524141);
            break;
          case 0:
            (e = -741524141), 3 === s && (t = -724436488);
            break;
          case 1:
            (e = -1498653671), 2 === s && (t = 1750799296);
        }
        e && this.Lie.HasTag(e) && this.Lie.RemoveTag(e),
          t && !this.Lie.HasTag(t) && this.Lie.AddTag(t);
      }
    }
    Q0n() {
      return !!this.Hte?.GetIsSceneInteractionLoadCompleted();
    }
    X0n() {
      return !(
        !(this.mBe && this._un && this.Lie) ||
        this.mBe.IsInState(4) ||
        this._un.IsLocked ||
        this.Lie.HasTag(-709838471)
      );
    }
    efn() {
      return void 0 === this.B0n;
    }
    V0n(t) {
      !this.efn() && this.Enable(this.B0n, t) && (this.B0n = void 0);
    }
    K0n(t) {
      this.efn() && (this.B0n = this.Disable(t));
    }
    get ActivateActions() {
      return this.R0n?.EnterActions;
    }
    get DeactivateActions() {
      return this.R0n?.ExitActions;
    }
  });
(SceneItemGravityComponent = SceneItemGravityComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(139)],
    SceneItemGravityComponent,
  )),
  (exports.SceneItemGravityComponent = SceneItemGravityComponent);
//# sourceMappingURL=SceneItemGravityComponent.js.map

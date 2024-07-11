"use strict";
var SceneItemGravityComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var h,
        n = arguments.length,
        a =
          n < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, s);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (h = t[r]) &&
            (a = (n < 3 ? h(a) : 3 < n ? h(e, i, a) : h(e, i)) || a);
      return 3 < n && a && Object.defineProperty(e, i, a), a;
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
  ModelManager_1 = require("../../Manager/ModelManager"),
  CHECK_DISTANCE_INTERVAL = 100;
let SceneItemGravityComponent =
  (SceneItemGravityComponent_1 = class SceneItemGravityComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.SIe = void 0),
        (this.Hte = void 0),
        (this.Lie = void 0),
        (this.mBe = void 0),
        (this.xun = void 0),
        (this.$0n = void 0),
        (this.Y0n = 0),
        (this.z0n = 0),
        (this.wOn = 0),
        (this.tfn = void 0),
        (this.nxe = 1),
        (this.ofn = -1),
        (this.rfn = -1),
        (this.nfn = !1),
        (this.sfn = void 0),
        (this.G_n = () => {
          this.afn();
        }),
        (this.hfn = () => {
          this.lfn("[SceneItemGravityComponent] 锁定属性改变");
        }),
        (this.Qnn = () => {
          this.lfn("[SceneItemGravityComponent] 场景交互物加载完毕");
        }),
        (this._fn = (t, e) => {
          var e = e.Entity;
          (e?.GetComponent(3) ?? !t) ||
            (!1 !== this.$0n.StopTeleControlMove &&
              ((t = e?.GetComponent(140)), (e = e?.GetComponent(182)), t) &&
              e?.IsAutonomousProxy &&
              t.ForceStopDropping());
        }),
        (this.ufn = () => {
          var t = Global_1.Global.BaseCharacter;
          t &&
            ((t = t.GetDistanceTo(this.Hte?.Owner)),
            this.nfn && t > this.rfn
              ? ((this.nfn = !1),
                ModelManager_1.ModelManager.ManipulaterModel?.RemoveShowLandTipsCount(
                  this.Entity,
                ))
              : !this.nfn &&
                t < this.ofn &&
                ((this.nfn = !0),
                ModelManager_1.ModelManager.ManipulaterModel?.AddShowLandTipsCount(
                  this.Entity,
                )));
        });
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemGravityComponent_1)[0];
      return (
        !!t &&
        ((this.SIe = this.Entity.CheckGetComponent(0)),
        (this.$0n = t),
        (this.z0n =
          this.$0n.DownTime / MathUtils_1.MathUtils.MillisecondToSecond),
        this.$0n.ShowLandTipRadius &&
          ((this.ofn = this.$0n.ShowLandTipRadius.EnterRadius),
          (this.rfn = this.$0n.ShowLandTipRadius.LeaveRadius)),
        !0)
      );
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.CheckGetComponent(182)),
        (this.Lie = this.Entity.CheckGetComponent(177)),
        (this.mBe = this.Entity.CheckGetComponent(117)),
        (this.xun = this.Entity.CheckGetComponent(115)),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnEntityInOutRangeLocal,
          this._fn,
        ) ||
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnEntityInOutRangeLocal,
            this._fn,
          ),
        !0
      );
    }
    OnActivate() {
      return (
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.G_n,
        ),
        0 !== this.mBe.State && this.G_n(),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemLockPropChange,
          this.hfn,
        ),
        this.Hte.GetIsSceneInteractionLoadCompleted()
          ? this.lfn(
              "[SceneItemGravityComponent] OnActivate:场景交互物加载完毕",
            )
          : EventSystem_1.EventSystem.OnceWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
              this.Qnn,
            ),
        this.$0n?.ShowLandTipRadius &&
          (this.sfn = TimerSystem_1.TimerSystem.Forever(
            this.ufn,
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
          this._fn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnEntityInOutRangeLocal,
            this._fn,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemLockPropChange,
          this.hfn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemLockPropChange,
            this.hfn,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.G_n,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.G_n,
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
        void 0 !== this.sfn &&
          (TimerSystem_1.TimerSystem.Remove(this.sfn), (this.sfn = void 0)),
        !0
      );
    }
    OnTick(t) {
      this.cfn(t * this.nxe);
    }
    OnChangeTimeDilation(t) {
      var e = this.Entity.GetComponent(107);
      this.nxe = e ? t * e.CurrentTimeScale : 1;
    }
    afn() {
      switch (this.mBe.State) {
        case 1:
          this.ChangeTransition(!0);
          break;
        case 2:
          this.bOn(1);
          break;
        case 4:
          this.mfn("[SceneItemGravityComponent] 重力机关处于完成态");
          break;
        case 5:
          this.Lie?.HasTag(-709838471) &&
            this.mfn("[SceneItemGravityComponent] 重力机关处于静默态");
      }
    }
    ChangeTransition(t) {
      switch (this.Y0n) {
        case 2:
        case 0:
          t || this.bOn(3);
          break;
        case 3:
        case 1:
          t && this.bOn(2);
      }
    }
    bOn(t) {
      this.Y0n !== t &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneItem",
            40,
            "[SceneItemGravityComponent] ChangeAnimState",
            ["PbDataId", this.SIe?.GetPbDataId()],
            ["FromAnimState", this.Y0n],
            ["ToAnimState", t],
          ),
        this.tTn(this.Y0n, t),
        (this.Y0n = t),
        this.cfn(0));
    }
    cfn(t = 0) {
      if (this.dfn())
        if (this.Cfn())
          switch (this.Y0n) {
            case 0:
              this.gfn(t);
              break;
            case 1:
              this.ffn(t);
              break;
            case 2:
              this.pfn(t);
              break;
            case 3:
              this.vfn(t);
          }
        else
          this.mfn(
            "[SceneItemGravityComponent] 重力机关被停用(完成态或被锁定或静默)",
          );
      else this.mfn("[SceneItemGravityComponent] 场景交互物未初始化");
    }
    gfn(t) {
      (this.wOn = 0), this.mfn("[SceneItemGravityComponent] 到达顶部");
    }
    ffn(t) {
      (this.wOn = this.z0n), this.mfn("[SceneItemGravityComponent] 到达底部");
    }
    pfn(t) {
      (this.wOn = MathUtils_1.MathUtils.Clamp(this.wOn - t, 0, this.z0n)),
        this.lfn("[SceneItemGravityComponent] 上升中"),
        this.wOn <= 0 && this.bOn(0);
    }
    vfn(t) {
      (this.wOn = MathUtils_1.MathUtils.Clamp(this.wOn + t, 0, this.z0n)),
        this.lfn("[SceneItemGravityComponent] 下降中");
    }
    tTn(t, e) {
      this.Mfn(e), this.iTn(t, e);
    }
    Mfn(s) {
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
            var h = this.Lie.HasTag(i),
              n = !this.Lie.HasTag(e);
            if (!h && !n) break;
            let t = void 0;
            h &&
              ((t = this.Hte.GetActiveTagSequencePlaybackProgress(
                GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(i),
              )),
              this.Lie.RemoveTag(i)),
              n &&
                (this.Lie.AddTag(e),
                t &&
                  t < 1 &&
                  ((h = MathUtils_1.MathUtils.Clamp(1 - t, 0, 1)),
                  this.Hte.SetActiveTagSequencePlaybackProgress(
                    GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e),
                    h,
                  )),
                this.Hte.SetActiveTagSequenceDurationTime(
                  GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e),
                  this.$0n.DownTime,
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
    iTn(i, s) {
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
    dfn() {
      return !!this.Hte?.GetIsSceneInteractionLoadCompleted();
    }
    Cfn() {
      return !(
        !(this.mBe && this.xun && this.Lie) ||
        this.mBe.IsInState(4) ||
        this.xun.IsLocked ||
        this.Lie.HasTag(-709838471)
      );
    }
    Sfn() {
      return void 0 === this.tfn;
    }
    lfn(t) {
      !this.Sfn() && this.Enable(this.tfn, t) && (this.tfn = void 0);
    }
    mfn(t) {
      this.Sfn() && (this.tfn = this.Disable(t));
    }
  });
(SceneItemGravityComponent = SceneItemGravityComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(136)],
    SceneItemGravityComponent,
  )),
  (exports.SceneItemGravityComponent = SceneItemGravityComponent);
//# sourceMappingURL=SceneItemGravityComponent.js.map

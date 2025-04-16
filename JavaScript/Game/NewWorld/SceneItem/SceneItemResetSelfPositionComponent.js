"use strict";
var SceneItemResetSelfPositionComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, i, s) {
      var o,
        n = arguments.length,
        h =
          n < 3
            ? t
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(t, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        h = Reflect.decorate(e, t, i, s);
      else
        for (var r = e.length - 1; 0 <= r; r--)
          (o = e[r]) &&
            (h = (n < 3 ? o(h) : 3 < n ? o(t, i, h) : o(t, i)) || h);
      return 3 < n && h && Object.defineProperty(t, i, h), h;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemResetSelfPositionComponent = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  TICK_CHECK_INTERVAL = 500,
  FIX_DELAY = 0.35;
let SceneItemResetSelfPositionComponent =
  (SceneItemResetSelfPositionComponent_1 = class SceneItemResetSelfPositionComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.Hte = void 0),
        (this.tVr = void 0),
        (this.EMn = -1),
        (this.j6 = 0),
        (this.SMn = !0),
        (this.yMn = void 0),
        (this.IMn = !1),
        (this.TDe = void 0),
        (this.LDe = void 0),
        (this.TMn = (e, t, i, s, o) => {
          this.tVr?.HasMoveAuthority() &&
            ((!this.LMn(e) && 11 !== e) ||
              this.IMn ||
              (this.DMn(
                "[SceneItemResetSelfPositionComponent] 结束被当前主控移动，停止检查距离Tick",
              ),
              -1 !== this.EMn && this.RMn()),
            3 === t && this.UMn(),
            this.Lo?.IsDisableResetPosAfterThrow &&
              this.LMn(t) &&
              (this.DMn(
                "[SceneItemResetSelfPositionComponent] 被控物配置丢出时停止检测",
              ),
              (this.IMn = !0)),
            this.Lo?.IsResetPosAfterThrow &&
              11 === t &&
              (void 0 !== this.TDe &&
                (TimerSystem_1.TimerSystem.Remove(this.TDe),
                (this.TDe = void 0)),
              (this.TDe = TimerSystem_1.TimerSystem.Delay(() => {
                (this.TDe = void 0), this.AMn("ResetPositionTip2");
              }, FIX_DELAY * TimeUtil_1.TimeUtil.InverseMillisecond))),
            this.Lo?.ResetPosDelayTime &&
              !s?.IsNoLockCasting() &&
              o?.IsNoLockCasting() &&
              (void 0 !== this.TDe &&
                (TimerSystem_1.TimerSystem.Remove(this.TDe),
                (this.TDe = void 0)),
              (this.TDe = TimerSystem_1.TimerSystem.Delay(() => {
                (this.TDe = void 0), this.AMn(void 0);
              }, this.Lo.ResetPosDelayTime * TimeUtil_1.TimeUtil.InverseMillisecond))),
            12 === t) &&
            void 0 !== this.TDe &&
            (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
        });
    }
    OnInitData(e) {
      e = e.GetParam(SceneItemResetSelfPositionComponent_1)[0];
      return (
        (this.Lo = e),
        void 0 !== this.Lo.ResetRadius &&
          (this.EMn = this.Lo.ResetRadius * this.Lo.ResetRadius),
        (this.j6 = TICK_CHECK_INTERVAL),
        !0
      );
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.CheckGetComponent(200)),
        (this.tVr = this.Entity.CheckGetComponent(156)),
        this.Entity.CheckGetComponent(154)
          ? (this.DMn(
              "[SceneItemResetSelfPositionComponent] 初始关闭检查距离Tick",
            ),
            EventSystem_1.EventSystem.AddWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnManipulatableItemStateModified,
              this.TMn,
            ),
            !0)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                39,
                "[SceneItemResetSelfPositionComponent] OnStart失败，实体不是可被控物",
                ["PbDataID", this.Hte.CreatureData.GetPbDataId()],
              ),
            !1)
      );
    }
    OnActivate() {
      -1 !== this.EMn &&
        (this.LDe = TimerSystem_1.TimerSystem.Forever(() => {
          this.RMn();
        }, this.j6));
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnManipulatableItemStateModified,
          this.TMn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnManipulatableItemStateModified,
            this.TMn,
          ),
        void 0 !== this.LDe &&
          (TimerSystem_1.TimerSystem.Remove(this.LDe), (this.LDe = void 0)),
        !0
      );
    }
    UMn() {
      this.PMn() || this.LDe?.Resume();
    }
    DMn(e) {
      this.PMn() && this.LDe?.Pause();
    }
    PMn() {
      return !this.LDe?.IsPause() ?? !1;
    }
    RMn() {
      var e = this.SMn;
      !this.xMn() && e && this.AMn(void 0);
    }
    xMn() {
      var e,
        t = this.Hte.ActorLocationProxy;
      return (
        t !== this.yMn &&
          ((this.yMn = Vector_1.Vector.Create(t)),
          (e = this.Hte.CreatureData.GetInitLocation())) &&
          ((e = Vector_1.Vector.Create(e)),
          (this.SMn = Vector_1.Vector.DistSquared(e, t) <= this.EMn)),
        this.SMn
      );
    }
    AMn(e) {
      LevelGamePlayController_1.LevelGamePlayController.OnManipulatableItemExitAreaInternal(
        this.Entity,
        e,
        0,
      );
    }
    LMn(e) {
      return 6 === e || 7 === e || 9 === e || 8 === e;
    }
    StopTimerOnResetPos() {
      void 0 !== this.TDe &&
        (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
    }
  });
(SceneItemResetSelfPositionComponent = SceneItemResetSelfPositionComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(164)],
    SceneItemResetSelfPositionComponent,
  )),
  (exports.SceneItemResetSelfPositionComponent =
    SceneItemResetSelfPositionComponent);
//# sourceMappingURL=SceneItemResetSelfPositionComponent.js.map

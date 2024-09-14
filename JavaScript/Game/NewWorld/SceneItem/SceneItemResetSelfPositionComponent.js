"use strict";
var SceneItemResetSelfPositionComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, i, s) {
      var o,
        n = arguments.length,
        r =
          n < 3
            ? t
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(t, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(e, t, i, s);
      else
        for (var h = e.length - 1; 0 <= h; h--)
          (o = e[h]) &&
            (r = (n < 3 ? o(r) : 3 < n ? o(t, i, r) : o(t, i)) || r);
      return 3 < n && r && Object.defineProperty(t, i, r), r;
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
        (this.EMn = 0),
        (this.j6 = 0),
        (this.SMn = !0),
        (this.yMn = void 0),
        (this.IMn = !1),
        (this.TDe = void 0),
        (this.LDe = void 0),
        (this.TMn = (e, t) => {
          this.Hte.IsMoveAutonomousProxy &&
            ((!this.LMn(e) && "BeDropping" !== e) ||
              this.IMn ||
              (this.DMn(
                "[SceneItemResetSelfPositionComponent] 结束被当前主控移动，停止检查距离Tick",
              ),
              this.RMn()),
            "BeDrawing" === t && this.UMn(),
            this.Lo?.IsDisableResetPosAfterThrow &&
              this.LMn(t) &&
              (this.DMn(
                "[SceneItemResetSelfPositionComponent] 被控物配置丢出时停止检测",
              ),
              (this.IMn = !0)),
            this.Lo?.IsResetPosAfterThrow &&
              "BeDropping" === t &&
              (void 0 !== this.TDe &&
                (TimerSystem_1.TimerSystem.Remove(this.TDe),
                (this.TDe = void 0)),
              (this.TDe = TimerSystem_1.TimerSystem.Delay(() => {
                (this.TDe = void 0), this.AMn("ResetPositionTip2");
              }, FIX_DELAY * TimeUtil_1.TimeUtil.InverseMillisecond))),
            void 0 !== this.Lo?.ResetPosDelayTime &&
              "BeCastingFree" !== e &&
              "BeCastingFree" === t &&
              (void 0 !== this.TDe &&
                (TimerSystem_1.TimerSystem.Remove(this.TDe),
                (this.TDe = void 0)),
              (this.TDe = TimerSystem_1.TimerSystem.Delay(() => {
                (this.TDe = void 0), this.AMn(void 0);
              }, this.Lo.ResetPosDelayTime * TimeUtil_1.TimeUtil.InverseMillisecond))),
            "BeAdsorbed" === t) &&
            void 0 !== this.TDe &&
            (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
        });
    }
    OnInitData(e) {
      e = e.GetParam(SceneItemResetSelfPositionComponent_1)[0];
      return (
        (this.Lo = e),
        (this.EMn = this.Lo.ResetRadius * this.Lo.ResetRadius),
        (this.j6 = TICK_CHECK_INTERVAL),
        !0
      );
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.CheckGetComponent(187)),
        this.Entity.CheckGetComponent(143)
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
                40,
                "[SceneItemResetSelfPositionComponent] OnStart失败，实体不是可被控物",
                ["PbDataID", this.Hte.CreatureData.GetPbDataId()],
              ),
            !1)
      );
    }
    OnActivate() {
      this.LDe = TimerSystem_1.TimerSystem.Forever(() => {
        this.RMn();
      }, this.j6);
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
      void 0 !== this.TDe &&
        (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0)),
        LevelGamePlayController_1.LevelGamePlayController.OnManipulatableItemExitAreaInternal(
          this.Entity,
          e,
          0,
          !0,
        );
    }
    LMn(e) {
      return (
        "BeCastingToTarget" === e ||
        "BeCastingToOutlet" === e ||
        "BeCastingFree" === e
      );
    }
  });
(SceneItemResetSelfPositionComponent = SceneItemResetSelfPositionComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(152)],
    SceneItemResetSelfPositionComponent,
  )),
  (exports.SceneItemResetSelfPositionComponent =
    SceneItemResetSelfPositionComponent);
//# sourceMappingURL=SceneItemResetSelfPositionComponent.js.map

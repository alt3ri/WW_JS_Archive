"use strict";
var SceneItemInhaledItemComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var n,
        o = arguments.length,
        h =
          o < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        h = Reflect.decorate(t, e, i, s);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (n = t[r]) &&
            (h = (o < 3 ? n(h) : 3 < o ? n(e, i, h) : n(e, i)) || h);
      return 3 < o && h && Object.defineProperty(e, i, h), h;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemInhaledItemComponent = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SENSORY_RANGE = 3e3,
  performanceStateTag = new Map([
    [0, 1854980392],
    [1, -600747586],
    [2, 213628921],
    [3, 1534204131],
  ]);
let SceneItemInhaledItemComponent =
  (SceneItemInhaledItemComponent_1 = class SceneItemInhaledItemComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.Lie = void 0),
        (this.Hte = void 0),
        (this.etl = -1),
        (this.ttl = -1),
        (this.Rne = -1),
        (this.ac = 0),
        (this.kTl = 5),
        (this.e_l = -1),
        (this.wmo = -1),
        (this.t_l = -1),
        (this.cAl = void 0),
        (this.mAl = -1),
        (this.IsInCooldown = !1),
        (this.g_n = (t, e) => {
          this.OTl();
        });
    }
    get IsHaling() {
      return 0 !== this.ac;
    }
    get InhaledStrength() {
      return this.Lo?.InhaledStrength;
    }
    get NTl() {
      return this.kTl;
    }
    set NTl(t) {
      var e;
      this.kTl !== t &&
        (void 0 !== (e = performanceStateTag.get(this.kTl)) &&
          this.Lie?.RemoveTag(e),
        (this.kTl = t),
        void 0 !== (e = performanceStateTag.get(this.kTl))) &&
        this.Lie?.AddTag(e);
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemInhaledItemComponent_1)[0];
      return (
        (this.Lo = t),
        (this.etl =
          this.Lo.InhaledPerformance.InhaledTime *
          TimeUtil_1.TimeUtil.InverseMillisecond),
        this.Lo.InhaledInterruptionRecoveryTime &&
          (this.mAl =
            this.Lo.InhaledInterruptionRecoveryTime *
            TimeUtil_1.TimeUtil.InverseMillisecond),
        !0
      );
    }
    OnStart() {
      (this.Lie = this.Entity.GetComponent(203)),
        (this.Hte = this.Entity.GetComponent(200)),
        (this.Rne = this.Disable("SceneItemInhaledItemComponent 默认关闭Tick"));
      this.Entity.GetComponent(119).SetLogicRange(SENSORY_RANGE),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.g_n,
        );
      var t = this.Hte.CreatureData.GetBaseInfo();
      switch (t.Category.InhaledItemType) {
        case "LonelyDollPollutant":
          this.Lie.AddTag(36602954);
          break;
        case "LonelyDollPinkPollutant":
          this.Lie.AddTag(-422907888);
          break;
        case "LonelyDollRedPollutant":
          this.Lie.AddTag(-368786161);
      }
      return this.OTl(), !0;
    }
    OnEnd() {
      return (
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
        !0
      );
    }
    OnTick(t) {
      switch (this.ac) {
        case 0:
          break;
        case 1:
          this.itl(t);
      }
    }
    itl(t) {
      -1 === this.ttl ? (this.ttl = t) : (this.ttl += t),
        this.ttl >= this.etl && (this.StopInhalation(!1), this.rtl());
    }
    StartInhalation(t) {
      if (0 === this.ac) {
        (this.ac = 1),
          this.Enable(this.Rne, "SceneItemInhaledItemComponent 开始吸入"),
          (this.Rne = -1),
          this.Lie?.AddTag(-729639866),
          this.OTl();
        var e = t.GetComponent(0);
        if (void 0 !== e)
          switch (e.GetEntityType()) {
            case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
              (this.e_l = e.GetCreatureDataId()),
                (this.wmo = 0),
                (this.t_l = 0);
              break;
            case Protocol_1.Aki.Protocol.kks.Proto_Player:
              (this.e_l = 0),
                (this.wmo = t.GetComponent(39)?.CurrentSkill?.SkillId ?? -1),
                (this.t_l = 1);
          }
      }
    }
    StopInhalation(t = !0) {
      0 !== this.ac &&
        ((this.ac = 0),
        (this.Rne = this.Disable("sceneItemInhaledItemComponent 停止吸入")),
        this.Lie?.RemoveTag(-729639866),
        t && (this.OTl(), this.dAl()),
        (this.ttl = -1));
    }
    dAl() {
      void 0 !== this.cAl && TimerSystem_1.TimerSystem.Remove(this.cAl),
        this.mAl <= 0 ||
          ((this.IsInCooldown = !0),
          (this.cAl = TimerSystem_1.TimerSystem.Delay(() => {
            (this.IsInCooldown = !1), (this.cAl = void 0);
          }, this.mAl)));
    }
    rtl() {
      var t;
      this.e_l < 0 ||
        this.wmo < 0 ||
        this.t_l < 0 ||
        (((t = Protocol_1.Aki.Protocol.CC_.create()).uhh = ModelManager_1
          .ModelManager.GameModeModel.IsMulti
          ? ModelManager_1.ModelManager.OnlineModel.OwnerId
          : ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
        (t.h5n = this.t_l),
        (t.i_l = MathUtils_1.MathUtils.NumberToLong(this.e_l)),
        (t.r5n = this.wmo),
        (t.r_l = [
          MathUtils_1.MathUtils.NumberToLong(
            this.Hte.CreatureData.GetCreatureDataId(),
          ),
        ]),
        Net_1.Net.Call(22017, t, (t) => {
          t?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              t.Q4n,
              21377,
            );
        }),
        Log_1.Log.CheckInfo() && Log_1.Log.Info("Temp", 31, "成功吸取污染物"));
    }
    OTl() {
      var t = this.IsHaling;
      this.Lie?.HasTag(-1152559349)
        ? (this.NTl = t ? 2 : 0)
        : this.Lie?.HasTag(-3775711)
          ? (this.NTl = t ? 3 : 1)
          : this.Lie?.HasTag(-1278190765) && (this.NTl = 4);
    }
  });
(SceneItemInhaledItemComponent = SceneItemInhaledItemComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(258)],
    SceneItemInhaledItemComponent,
  )),
  (exports.SceneItemInhaledItemComponent = SceneItemInhaledItemComponent);
//# sourceMappingURL=SceneItemInhaledItemComponent.js.map

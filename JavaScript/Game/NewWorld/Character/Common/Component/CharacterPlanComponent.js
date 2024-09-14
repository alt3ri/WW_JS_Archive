"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, n) {
    var r,
      s = arguments.length,
      o =
        s < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, i))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      o = Reflect.decorate(e, t, i, n);
    else
      for (var h = e.length - 1; 0 <= h; h--)
        (r = e[h]) && (o = (s < 3 ? r(o) : 3 < s ? r(t, i, o) : r(t, i)) || o);
    return 3 < s && o && Object.defineProperty(t, i, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterPlanComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  IVar_1 = require("../../../../../UniverseEditor/Interface/IVar"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  BehaviorTreeDefines_1 = require("../../../../LevelGamePlay/LevelAi/BehaviorTree/BehaviorTreeDefines"),
  LevelAi_1 = require("../../../../LevelGamePlay/LevelAi/LevelAi"),
  LevelAiPlanInstance_1 = require("../../../../LevelGamePlay/LevelAi/LevelAiPlanInstance"),
  LevelAiRegistry_1 = require("../../../../LevelGamePlay/LevelAi/LevelAiRegistry"),
  LevelAiWorldState_1 = require("../../../../LevelGamePlay/LevelAi/LevelAiWorldState"),
  LevelAiNodeBehaviourActions_1 = require("../../../../LevelGamePlay/LevelAi/Nodes/LevelAiNodeBehaviourActions"),
  LevelAiNodeBehaviourSpline_1 = require("../../../../LevelGamePlay/LevelAi/Nodes/LevelAiNodeBehaviourSpline"),
  BaseActorComponent_1 = require("../../../Common/Component/BaseActorComponent");
let CharacterPlanComponent = class CharacterPlanComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.u1t = void 0),
      (this.ConfigId = 0),
      (this.Pjr = void 0),
      (this.xjr = void 0),
      (this.wjr = void 0),
      (this.Bjr = void 0),
      (this.OPt = void 0),
      (this.bjr = !0),
      (this.qjr = !0),
      (this.Gjr = !1),
      (this.sxr = void 0),
      (this.DisableAiHandle = void 0),
      (this.EFr = new Map()),
      (this.C$a = (e, t) => {
        if (this.g$a(e, t))
          switch ((0, IVar_1.getVarTypeByIndex)(t.iTs)) {
            case "Boolean":
              this.wjr?.SetBooleanWorldState(e, t.rTs);
              break;
            case "Int":
              this.wjr?.SetIntWorldState(
                e,
                MathUtils_1.MathUtils.LongToNumber(t.oTs),
              );
          }
      });
  }
  get PlanInstance() {
    return this.xjr;
  }
  get WorldState() {
    return this.wjr;
  }
  get WorldStateProxy() {
    return this.Bjr;
  }
  set WorldStateProxy(e) {
    this.Bjr = e;
  }
  get Paused() {
    return this.Gjr;
  }
  OnInitData() {
    (this.u1t = this.Entity.GetComponent(0)),
      (this.ConfigId = this.u1t.GetPbDataId());
    var e = this.u1t.GetPbEntityInitData();
    if (!e?.ComponentsData) return !(this.bjr = !1);
    if (
      ((this.OPt = (0, IComponent_1.getComponent)(
        e.ComponentsData,
        "LevelAiComponent",
      )),
      !this.OPt?.States)
    )
      return !(this.bjr = !1);
    if (BehaviorTreeDefines_1.BehaviorTreeDefines.UseLevelAiBehaviorTree)
      return !(this.bjr = !1);
    (this.wjr = new LevelAiWorldState_1.LevelAiWorldState()),
      (this.DisableAiHandle = new BaseActorComponent_1.DisableEntityHandle(
        "SetLevelAiDisableInGame",
      ));
    var t,
      e = (0, IComponent_1.getComponent)(e.ComponentsData, "VarComponent");
    if (e) {
      for (const i of e.Vars)
        "Int" === i.Type &&
          ((t = i.Value),
          BehaviorTreeDefines_1.BehaviorTreeDefines.UseLevelAiBehaviorTree ||
            this.wjr.SetIntWorldState(i.Name, t));
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.EntityVarUpdate,
        this.C$a,
      );
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "LevelAi",
          43,
          "实体未勾选VarComponent组件，请检查是否确定不使用配置变量。",
          ["实体ID", this.ConfigId],
        );
    return !0;
  }
  OnStart() {
    if (this.bjr && this.OPt?.States) {
      (this.xjr = new LevelAiPlanInstance_1.LevelAiPlanInstance()),
        this.xjr.Initialize(this),
        (this.Pjr = new LevelAi_1.LevelAi());
      let e = 1;
      for (const t of this.OPt.States) {
        switch (t.Behaviour.Type) {
          case "Actions":
            this.Njr(t, e);
            break;
          case "Spline":
            this.Ojr(t, e);
        }
        e++;
      }
    }
    return !0;
  }
  OnActivate() {
    this.bjr &&
      this.Entity.GetComponent(39)?.InLevelAiControl() &&
      this.StartLevelAi();
  }
  OnTick(e) {
    this.bjr && this.qjr && this.xjr.Tick(e);
  }
  OnEnd() {
    return (
      this.bjr &&
        (this.xjr.Stop(),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.EntityVarUpdate,
          this.C$a,
        )),
      !0
    );
  }
  StartLevelAi() {
    this.bjr && (this.xjr.Start(), (this.qjr = !0));
  }
  StopLevelAi() {
    this.bjr && (this.xjr.Stop(), (this.qjr = !1));
  }
  Pause(e) {
    var t;
    return (
      !!this.bjr &&
      (this.EFr.has(e)
        ? (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "LevelAi",
              51,
              "[CharacterPlanComponent] 重复使用关闭Ai的Key",
              ["entity", this.constructor.name],
              ["PbDataId", this.ConfigId],
              ["Key", e],
            ),
          !1)
        : ((t = this.DisableAiHandle.Disable(e, this.constructor.name)),
          this.EFr.set(e, t),
          void 0 === this.sxr &&
            ((this.Gjr = !0),
            (this.qjr = !1),
            this.xjr.Pause(),
            (this.sxr = this.Disable("[CharacterPlanComponent.PauseAi]"))),
          !0))
    );
  }
  Resume(e) {
    var t;
    return !(
      !this.bjr ||
      ((t = this.EFr.get(e)),
      this.EFr.delete(e)
        ? !this.DisableAiHandle.Enable(t, this.constructor.name) ||
          (this.DisableAiHandle.Empty &&
            ((this.Gjr = !1),
            (this.qjr = !0),
            this.xjr.Resume(),
            this.Enable(this.sxr, "CharacterPlanComponent.Resume"),
            (this.sxr = void 0)),
          0)
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "LevelAi",
              51,
              "[CharacterPlanComponent] 开启Ai使用了未定义的Key",
              ["entity", this.constructor.name],
              ["PbDataId", this.ConfigId],
              ["Key", e],
            ),
          1))
    );
  }
  GetCreatureDataComponent() {
    return this.u1t;
  }
  GetCurrentLevelAiAsset() {
    return this.Pjr;
  }
  FindPlanInstanceBy(e) {
    if (this.xjr && e(this.xjr)) return this.xjr;
  }
  FindActiveTaskInfo(t) {
    let i = void 0;
    var e = this.FindPlanInstanceBy(
      (e) => void 0 !== (i = e.FindActiveTaskInfo(t)),
    );
    if (e && i.PlanInstance === e) return i;
  }
  FindActiveDecoratorInfo(t) {
    let i = void 0;
    var e = this.FindPlanInstanceBy(
      (e) => void 0 !== (i = e.FindActiveDecoratorInfo(t)),
    );
    if (e && i.PlanInstance === e) return i;
  }
  Njr(e, t) {
    if ("Actions" === e.Behaviour.Type) {
      var i = LevelAiRegistry_1.LevelAiRegistry.Instance(),
        n = new LevelAiNodeBehaviourActions_1.LevelAiNodeBehaviourActions();
      n.Serialize(this, this.u1t, "状态" + t),
        (n.Actions = e.Behaviour.Actions);
      for (const s of e.Condition.Conditions) {
        var r = new (i.FindDecoratorCtor(s.Type))();
        r.Serialize(this, this.u1t, "状态" + t, s), n.Decorators.push(r);
      }
      (n.Cost = t), this.Pjr.StartNodes.push(n);
    }
  }
  Ojr(e, t) {
    if (
      "Spline" === e.Behaviour.Type &&
      void 0 !== e.Behaviour.SplineEntityId
    ) {
      var i = LevelAiRegistry_1.LevelAiRegistry.Instance(),
        n = new LevelAiNodeBehaviourSpline_1.LevelAiNodeBehaviourSpline();
      n.Serialize(this, this.u1t, "状态" + t),
        (n.SplineId = e.Behaviour.SplineEntityId);
      for (const s of e.Condition.Conditions) {
        var r = new (i.FindDecoratorCtor(s.Type))();
        r.Serialize(this, this.u1t, "状态" + t, s), n.Decorators.push(r);
      }
      (n.Cost = t), this.Pjr.StartNodes.push(n);
    }
  }
  g$a(e, t) {
    var i = this.Entity?.GetComponent(0);
    if (i?.IsNpc() || i?.IsAnimal()) {
      i = i.GetPbEntityInitData();
      if (i) {
        i = (0, IComponent_1.getComponent)(i.ComponentsData, "VarComponent");
        if (i) {
          var n = (0, IVar_1.getVarTypeByIndex)(t.iTs);
          for (const r of i.Vars)
            if (e === r.Name) return !!r.IsClient && r.Type === n;
        }
      }
    }
    return !1;
  }
};
(CharacterPlanComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(65)],
  CharacterPlanComponent,
)),
  (exports.CharacterPlanComponent = CharacterPlanComponent);
//# sourceMappingURL=CharacterPlanComponent.js.map

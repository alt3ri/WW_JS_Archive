"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, r) {
    var o,
      n = arguments.length,
      s =
        n < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, i, r);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (o = e[a]) && (s = (n < 3 ? o(s) : 3 < n ? o(t, i, s) : o(t, i)) || s);
    return 3 < n && s && Object.defineProperty(t, i, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterPlanComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  BehaviorTreeDefines_1 = require("../../../../LevelGamePlay/LevelAi/BehaviorTree/BehaviorTreeDefines"),
  LevelAi_1 = require("../../../../LevelGamePlay/LevelAi/LevelAi"),
  LevelAiPlanInstance_1 = require("../../../../LevelGamePlay/LevelAi/LevelAiPlanInstance"),
  LevelAiRegistry_1 = require("../../../../LevelGamePlay/LevelAi/LevelAiRegistry"),
  LevelAiWorldState_1 = require("../../../../LevelGamePlay/LevelAi/LevelAiWorldState"),
  LevelAiNodeBehaviourActions_1 = require("../../../../LevelGamePlay/LevelAi/Nodes/LevelAiNodeBehaviourActions"),
  LevelAiNodeBehaviourSpline_1 = require("../../../../LevelGamePlay/LevelAi/Nodes/LevelAiNodeBehaviourSpline"),
  BlackboardController_1 = require("../../../../World/Controller/BlackboardController"),
  BaseActorComponent_1 = require("../../../Common/Component/BaseActorComponent");
let CharacterPlanComponent = class CharacterPlanComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.zht = void 0),
      (this.ConfigId = 0),
      (this.Jjr = void 0),
      (this.zjr = void 0),
      (this.Zjr = void 0),
      (this.eWr = void 0),
      (this.qAt = void 0),
      (this.tWr = !0),
      (this.iWr = !0),
      (this.oWr = !1),
      (this.Uxr = void 0),
      (this.DisableAiHandle = void 0),
      (this.VFr = new Map());
  }
  get PlanInstance() {
    return this.zjr;
  }
  get WorldState() {
    return this.Zjr;
  }
  get WorldStateProxy() {
    return this.eWr;
  }
  set WorldStateProxy(e) {
    this.eWr = e;
  }
  get Paused() {
    return this.oWr;
  }
  OnInitData() {
    (this.zht = this.Entity.GetComponent(0)),
      (this.ConfigId = this.zht.GetPbDataId());
    var e = this.zht.GetPbEntityInitData();
    if (!e?.ComponentsData) return !(this.tWr = !1);
    if (
      ((this.qAt = (0, IComponent_1.getComponent)(
        e.ComponentsData,
        "LevelAiComponent",
      )),
      !this.qAt)
    )
      return !(this.tWr = !1);
    BehaviorTreeDefines_1.BehaviorTreeDefines.UseLevelAiBehaviorTree &&
      (this.tWr = !1),
      (this.Zjr = new LevelAiWorldState_1.LevelAiWorldState()),
      (this.DisableAiHandle = new BaseActorComponent_1.DisableEntityHandle(
        "SetLevelAiDisableInGame",
      ));
    var t,
      e = (0, IComponent_1.getComponent)(e.ComponentsData, "VarComponent");
    if (e)
      for (const i of e.Vars)
        "Int" === i.Type &&
          ((t = i.Value),
          BehaviorTreeDefines_1.BehaviorTreeDefines.UseLevelAiBehaviorTree
            ? BlackboardController_1.BlackboardController.SetIntValueByEntity(
                this.Entity.Id,
                i.Name,
                t,
              )
            : this.Zjr.SetIntWorldState(i.Name, t));
    else
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
    if (this.tWr) {
      (this.zjr = new LevelAiPlanInstance_1.LevelAiPlanInstance()),
        this.zjr.Initialize(this),
        (this.Jjr = new LevelAi_1.LevelAi());
      let e = 1;
      for (const t of this.qAt.States) {
        switch (t.Behaviour.Type) {
          case "Actions":
            this.rWr(t, e);
            break;
          case "Spline":
            this.nWr(t, e);
        }
        e++;
      }
    }
    return !0;
  }
  OnActivate() {
    this.tWr &&
      this.Entity.GetComponent(37)?.InLevelAiControl() &&
      this.StartLevelAi();
  }
  OnTick(e) {
    this.tWr && this.iWr && this.zjr.Tick(e);
  }
  OnEnd() {
    return this.tWr && this.zjr.Stop(), !0;
  }
  StartLevelAi() {
    this.tWr && (this.zjr.Start(), (this.iWr = !0));
  }
  StopLevelAi() {
    this.tWr && (this.zjr.Stop(), (this.iWr = !1));
  }
  Pause(e) {
    var t;
    return (
      !!this.tWr &&
      (this.VFr.has(e)
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
          this.VFr.set(e, t),
          void 0 === this.Uxr &&
            ((this.oWr = !0),
            (this.iWr = !1),
            this.zjr.Pause(),
            (this.Uxr = this.Disable("[CharacterPlanComponent.PauseAi]"))),
          !0))
    );
  }
  Resume(e) {
    var t;
    return !(
      !this.tWr ||
      ((t = this.VFr.get(e)),
      this.VFr.delete(e)
        ? !this.DisableAiHandle.Enable(t, this.constructor.name) ||
          (this.DisableAiHandle.Empty &&
            ((this.oWr = !1),
            (this.iWr = !0),
            this.zjr.Resume(),
            this.Enable(this.Uxr, "CharacterPlanComponent.Resume"),
            (this.Uxr = void 0)),
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
    return this.zht;
  }
  GetCurrentLevelAiAsset() {
    return this.Jjr;
  }
  FindPlanInstanceBy(e) {
    if (this.zjr && e(this.zjr)) return this.zjr;
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
  rWr(e, t) {
    if ("Actions" === e.Behaviour.Type) {
      var i = LevelAiRegistry_1.LevelAiRegistry.Instance(),
        r = new LevelAiNodeBehaviourActions_1.LevelAiNodeBehaviourActions();
      r.Serialize(this, this.zht, "状态" + t),
        (r.Actions = e.Behaviour.Actions);
      for (const n of e.Condition.Conditions) {
        var o = new (i.FindDecoratorCtor(n.Type))();
        o.Serialize(this, this.zht, "状态" + t, n), r.Decorators.push(o);
      }
      (r.Cost = t), this.Jjr.StartNodes.push(r);
    }
  }
  nWr(e, t) {
    if (
      "Spline" === e.Behaviour.Type &&
      void 0 !== e.Behaviour.SplineEntityId
    ) {
      var i = LevelAiRegistry_1.LevelAiRegistry.Instance(),
        r = new LevelAiNodeBehaviourSpline_1.LevelAiNodeBehaviourSpline();
      r.Serialize(this, this.zht, "状态" + t),
        (r.SplineId = e.Behaviour.SplineEntityId);
      for (const n of e.Condition.Conditions) {
        var o = new (i.FindDecoratorCtor(n.Type))();
        o.Serialize(this, this.zht, "状态" + t, n), r.Decorators.push(o);
      }
      (r.Cost = t), this.Jjr.StartNodes.push(r);
    }
  }
};
(CharacterPlanComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(62)],
  CharacterPlanComponent,
)),
  (exports.CharacterPlanComponent = CharacterPlanComponent);
//# sourceMappingURL=CharacterPlanComponent.js.map

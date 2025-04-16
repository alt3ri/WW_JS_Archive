"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, n) {
    var i,
      r = arguments.length,
      a =
        r < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, o))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(e, t, o, n);
    else
      for (var s = e.length - 1; 0 <= s; s--)
        (i = e[s]) && (a = (r < 3 ? i(a) : 3 < r ? i(t, o, a) : i(t, o)) || a);
    return 3 < r && a && Object.defineProperty(t, o, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemGroupAiComponent = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  WaitEntityTask_1 = require("../../World/Define/WaitEntityTask"),
  EACH_WAIT_ENTITY_OVER_TIME = 6e4;
let SceneItemGroupAiComponent = class SceneItemGroupAiComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.WAl = IComponent_1.EGroupAiMode.Patrol),
      (this.Bih = []),
      (this.QAl = void 0);
  }
  OnStart() {
    var e = this.Entity.GetComponent(0),
      t = e?.GetPbEntityInitData();
    return (
      e &&
        t &&
        (e = (0, IComponent_1.getComponent)(
          t.ComponentsData,
          "GroupAiComponent",
        )) &&
        ((this.WAl = e.Option.Type),
        this.Bih.push(...e.Entities),
        (this.QAl = e),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SceneItem",
            42,
            "[GroupAi] OnStart.CreateWaitEntityTask",
          ),
        this.WAl === IComponent_1.EGroupAiMode.Patrol &&
          ModelManager_1.ModelManager.MonsterGroupPatrolModel?.RecordGroupMonsterPbDataId(
            this.Bih,
          ),
        this.CreateWaitEntityTask(this.Bih)),
      !0
    );
  }
  CreateWaitEntityTask(t) {
    let o = 1;
    Array.isArray(t) && (o = t.length),
      WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
        "SceneItemGroupAiComponent.CreateWaitEntityTask",
        t,
        (e) => {
          e ||
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "SceneItem",
                42,
                "[GroupAi] 没等到全员加载齐",
                ["EntityCount", o],
                ["entityIds", t],
              )),
            this.Gih();
        },
        EACH_WAIT_ENTITY_OVER_TIME,
        !0,
        !0,
      );
  }
  Gih() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("SceneItem", 42, "[GroupAi] ExecuteWhenEntitiesReady"),
      this.WAl === IComponent_1.EGroupAiMode.Patrol && this.KAl();
  }
  OnEnd() {
    return this.WAl === IComponent_1.EGroupAiMode.Patrol && this.$Al(), !0;
  }
  KAl() {
    this.ePl(),
      ModelManager_1.ModelManager.MonsterGroupPatrolModel?.GenerateAddMonsterGroup(
        this.Entity.Id,
        this.QAl,
      );
  }
  $Al() {
    this.ePl(!0),
      ModelManager_1.ModelManager.MonsterGroupPatrolModel?.RemoveMonsterGroup(
        this.Entity.Id,
      );
  }
  ePl(e = !1) {
    for (const o of this.Bih) {
      var t =
        ModelManager_1.ModelManager.CreatureModel?.GetEntityIdByPbDataId(o);
      t &&
        (t =
          ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
            t,
          )?.Entity?.GetComponent(203)) &&
        (e ? t.RemoveTag(-1250067672) : t.AddTag(-1250067672));
    }
  }
};
(SceneItemGroupAiComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(254)],
  SceneItemGroupAiComponent,
)),
  (exports.SceneItemGroupAiComponent = SceneItemGroupAiComponent);
//# sourceMappingURL=SceneItemGroupAiComponent.js.map

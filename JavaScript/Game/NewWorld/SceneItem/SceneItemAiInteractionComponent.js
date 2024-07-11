"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, n, i) {
    let r;
    const s = arguments.length;
    let o =
      s < 3 ? t : i === null ? (i = Object.getOwnPropertyDescriptor(t, n)) : i;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      o = Reflect.decorate(e, t, n, i);
    else
      for (let h = e.length - 1; h >= 0; h--)
        (r = e[h]) && (o = (s < 3 ? r(o) : s > 3 ? r(t, n, o) : r(t, n)) || o);
    return s > 3 && o && Object.defineProperty(t, n, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemAiInteractionComponent = void 0);
const Time_1 = require("../../../Core/Common/Time");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const AiInteractionItemQueryManager_1 = require("./AiInteraction/AiInteractionItemQueryManager");
const AI_USED_COLD_DOWN = 2e3;
let SceneItemAiInteractionComponent = class SceneItemAiInteractionComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.IsSearchByAi = void 0),
      (this.SearchEntity = void 0),
      (this.IsUsingByAi = void 0),
      (this.LastUsedTime = -AI_USED_COLD_DOWN),
      (this.EnableHandler = void 0),
      (this.MoveComp = void 0),
      (this.OnEntityDeadEvent = void 0);
  }
  static get Dependencies() {
    return [182];
  }
  OnStart() {
    (this.LastUsedTime = -AI_USED_COLD_DOWN),
      (this.IsUsingByAi = !1),
      this.Vmn(),
      (this.OnEntityDeadEvent = () => {
        this.OnEntityDead();
      });
    const e = this.Entity.GetComponent(0).GetVisible();
    return (
      (this.EnableHandler = e
        ? -1
        : this.Entity.Disable(
            "[SceneItemAiInteractionComponent.OnStart] visible为false",
          )),
      (this.MoveComp = this.Entity.GetComponent(108)),
      AiInteractionItemQueryManager_1.AiInteractionItemQueryManager.Get().RegisterItem(
        this.Entity,
      ),
      !0
    );
  }
  OnEnd() {
    return (
      AiInteractionItemQueryManager_1.AiInteractionItemQueryManager.Get().UnRegisterItem(
        this.Entity,
      ),
      !0
    );
  }
  Vmn() {
    (this.IsSearchByAi = !1), (this.SearchEntity = void 0);
  }
  OnEntityDead() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.SearchEntity,
      EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
      this.OnEntityDeadEvent,
    ),
      this.Vmn();
  }
  SetSearched(e) {
    this.IsSearchByAi ||
      ((this.IsSearchByAi = !0),
      (this.SearchEntity = e),
      EventSystem_1.EventSystem.AddWithTarget(
        e,
        EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
        this.OnEntityDeadEvent,
      ));
  }
  SetUnSearched() {
    this.IsSearchByAi && this.OnEntityDead();
  }
  OnLastUsed() {
    this.SetUnSearched(), (this.LastUsedTime = Time_1.Time.WorldTime);
  }
  CanBeUsed() {
    return this.MoveComp
      ? !this.MoveComp.EnableMovement
      : Time_1.Time.WorldTime - this.LastUsedTime > AI_USED_COLD_DOWN;
  }
  HiddenItem(e) {
    return (
      e !== (this.EnableHandler !== -1) &&
      (e
        ? (this.EnableHandler = this.Entity.Disable(
            "[SceneItemAiInteractionComponent.HiddenItem] bHidden为true",
          ))
        : (this.Entity.Enable(
            this.EnableHandler,
            "[SceneItemAiInteractionComponent.HiddenItem] bHidden为false",
          ),
          (this.EnableHandler = -1)),
      !0)
    );
  }
  ItemAttachEntity(e) {}
  IsSearchByOther(e) {
    return !!this.IsSearchByAi && this.SearchEntity.Id !== e;
  }
};
(SceneItemAiInteractionComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(128)],
  SceneItemAiInteractionComponent,
)),
  (exports.SceneItemAiInteractionComponent = SceneItemAiInteractionComponent);
// # sourceMappingURL=SceneItemAiInteractionComponent.js.map

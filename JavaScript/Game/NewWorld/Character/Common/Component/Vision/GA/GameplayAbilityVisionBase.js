"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayAbilityVisionBase = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
class GameplayAbilityVisionBase {
  constructor(t) {
    this.VisionComponent = t;
  }
  static Spawn(t) {
    t = new this(t);
    return t.Create(), t;
  }
  Create() {
    this.OnCreate();
  }
  Destroy() {
    this.OnDestroy();
  }
  Tick(t) {
    this.OnTick(t);
  }
  ActivateAbility() {
    return this.OnActivateAbility();
  }
  EndAbility() {
    return this.OnEndAbility();
  }
  ChangeVision() {
    this.OnChangeVision();
  }
  OnCreate() {}
  OnDestroy() {}
  OnTick(t) {}
  OnActivateAbility() {
    return !0;
  }
  OnEndAbility() {
    return !0;
  }
  OnChangeVision() {}
  OnGoDown() {}
  get Entity() {
    return this.VisionComponent.Entity;
  }
  get EntityHandle() {
    return ModelManager_1.ModelManager.CreatureModel.GetEntityById(
      this.VisionComponent.Entity.Id,
    );
  }
  get CreatureDataComponent() {
    return this.Entity.GetComponent(0);
  }
  get ActorComponent() {
    return this.Entity.GetComponent(3);
  }
  get AttributeComponent() {
    return this.Entity.GetComponent(159);
  }
  get GameplayTagComponent() {
    return this.Entity.GetComponent(190);
  }
  get SkillComponent() {
    return this.Entity.GetComponent(34);
  }
  get BuffComponent() {
    return this.Entity.GetComponent(160);
  }
  get MoveComponent() {
    return this.Entity.GetComponent(164);
  }
  get AudioComponent() {
    return this.Entity.GetComponent(44);
  }
  get TeamComponent() {
    return this.Entity.GetComponent(84);
  }
}
exports.GameplayAbilityVisionBase = GameplayAbilityVisionBase;
//# sourceMappingURL=GameplayAbilityVisionBase.js.map

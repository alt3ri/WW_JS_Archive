"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiTaskSetItemCollision = void 0);
const puerts_1 = require("puerts");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskSetItemCollision extends LevelAiTask_1.LevelAiTask {
  constructor() {
    super(...arguments), (this.ItemEntity = void 0), (this.IsIgnore = !1);
  }
  ExecuteTask() {
    return this.IsIgnore ? this.FTe() : this.VTe(), 0;
  }
  HTe(e, s) {
    var t = e.Entity.GetComponent(0);
    const i = this.CreatureDataComponent.Entity.GetComponent(2);
    var t = t.GetPbDataId();
    var t = ModelManager_1.ModelManager.CreatureModel.GetOwnerEntity(t);
    let r = void 0;
    if (
      (r =
        t &&
        (t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t))
          ? t.Entity.GetComponent(182)
          : e)
    ) {
      var t = (0, puerts_1.$ref)(void 0);
      const o = (r.Owner.GetAttachedActors(t), (0, puerts_1.$unref)(t));
      const a = o.Num();
      for (let e = 0; e < a; ++e) {
        const l = o.Get(e);
        const v = (0, puerts_1.$ref)(void 0);
        const _ = (l.GetAttachedActors(v), (0, puerts_1.$unref)(v));
        const n = _.Num();
        for (let e = 0; e < n; ++e)
          i.Actor.CapsuleComponent.IgnoreActorWhenMoving(_.Get(e), s);
      }
    }
  }
  VTe() {
    let e;
    const s = this.ItemEntity.Entity.GetComponent(182);
    s &&
      ((e = this.CreatureDataComponent.Entity.GetComponent(2)),
      this.HTe(s, !1),
      e.Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 2));
  }
  FTe() {
    const e = this.ItemEntity.Entity.GetComponent(182);
    e &&
      (this.HTe(e, !0),
      this.CreatureDataComponent.Entity.GetComponent(
        2,
      ).Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 0));
  }
}
exports.LevelAiTaskSetItemCollision = LevelAiTaskSetItemCollision;
// # sourceMappingURL=LevelAiTaskSetItemCollision.js.map

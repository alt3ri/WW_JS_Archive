"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiTaskSetItemCollision = void 0);
const puerts_1 = require("puerts"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskSetItemCollision extends LevelAiTask_1.LevelAiTask {
  constructor() {
    super(...arguments), (this.ItemEntity = void 0), (this.IsIgnore = !1);
  }
  ExecuteTask() {
    return this.IsIgnore ? this.FTe() : this.VTe(), 0;
  }
  HTe(e, s) {
    var t = e.Entity.GetComponent(0),
      i = this.CreatureDataComponent.Entity.GetComponent(2),
      t = t.GetPbDataId(),
      t = ModelManager_1.ModelManager.CreatureModel.GetOwnerEntity(t);
    let r = void 0;
    if (
      (r =
        t &&
        (t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t))
          ? t.Entity.GetComponent(187)
          : e)
    ) {
      var t = (0, puerts_1.$ref)(void 0),
        o = (r.Owner.GetAttachedActors(t), (0, puerts_1.$unref)(t)),
        a = o.Num();
      for (let e = 0; e < a; ++e) {
        var l = o.Get(e),
          v = (0, puerts_1.$ref)(void 0),
          _ = (l.GetAttachedActors(v), (0, puerts_1.$unref)(v)),
          n = _.Num();
        for (let e = 0; e < n; ++e)
          i.Actor.CapsuleComponent.IgnoreActorWhenMoving(_.Get(e), s);
      }
    }
  }
  VTe() {
    var e,
      s = this.ItemEntity.Entity.GetComponent(187);
    s &&
      ((e = this.CreatureDataComponent.Entity.GetComponent(2)),
      this.HTe(s, !1),
      e.Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 2));
  }
  FTe() {
    var e = this.ItemEntity.Entity.GetComponent(187);
    e &&
      (this.HTe(e, !0),
      this.CreatureDataComponent.Entity.GetComponent(
        2,
      ).Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 0));
  }
}
exports.LevelAiTaskSetItemCollision = LevelAiTaskSetItemCollision;
//# sourceMappingURL=LevelAiTaskSetItemCollision.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicManipulatableTagsChange = void 0);
const BulletHitActorData_1 = require("../Model/BulletHitActorData");
const BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicManipulatableTagsChange extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e), (this.Parameter = t);
  }
  BulletLogicActionOnHitObstacles(t = void 0) {
    if (
      t &&
      t instanceof BulletHitActorData_1.BulletHitActorData &&
      t.Entity &&
      t.Entity.GetComponent(0).IsSceneItem()
    ) {
      var t = t.Entity;
      const e = t?.GetComponent(140);
      const r = this.Parameter;
      const l = t?.GetComponent(177);
      if (e && this.CheckCondition(t) && l) {
        const o = r.AddTags.GameplayTags;
        const a = o.Num();
        for (let t = 0; t < a; t++) {
          const i = o.Get(t).TagId;
          l.AddServerTagByIdLocal(i, "特定子弹命中可控物添加标签");
        }
        const u = r.RemoveTags.GameplayTags;
        const s = u.Num();
        for (let t = 0; t < s; t++) {
          const n = u.Get(t).TagId;
          l.RemoveServerTagByIdLocal(n, "特定子弹命中可控物移除标签");
        }
      }
    }
  }
  CheckCondition(t) {
    const e = this.Parameter;
    const r = t?.GetComponent(177);
    if (!r) return !1;
    const l = e.ExistTagsCondition.GameplayTags;
    const o = l.Num();
    for (let t = 0; t < o; t++) {
      const a = l.Get(t).TagId;
      if (!r.HasTag(a)) return !1;
    }
    const i = e.UnExistTagsCondition.GameplayTags;
    const u = i.Num();
    for (let t = 0; t < u; t++) {
      const s = i.Get(t).TagId;
      if (r.HasTag(s)) return !1;
    }
    return !0;
  }
}
exports.BulletLogicManipulatableTagsChange = BulletLogicManipulatableTagsChange;
// # sourceMappingURL=BulletLogicManipulatableTagsChange.js.map

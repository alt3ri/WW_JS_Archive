"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicManipulatableTagsChange = void 0);
const BulletHitActorData_1 = require("../Model/BulletHitActorData"),
  BulletLogicController_1 = require("./BulletLogicController");
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
      var t = t.Entity,
        e = t?.GetComponent(142),
        r = this.Parameter,
        l = t?.GetComponent(180);
      if (e && this.CheckCondition(t) && l) {
        var o = r.AddTags.GameplayTags,
          a = o.Num();
        for (let t = 0; t < a; t++) {
          var i = o.Get(t).TagId;
          l.AddServerTagByIdLocal(i, "特定子弹命中可控物添加标签");
        }
        var u = r.RemoveTags.GameplayTags,
          s = u.Num();
        for (let t = 0; t < s; t++) {
          var n = u.Get(t).TagId;
          l.RemoveServerTagByIdLocal(n, "特定子弹命中可控物移除标签");
        }
      }
    }
  }
  CheckCondition(t) {
    var e = this.Parameter,
      r = t?.GetComponent(180);
    if (!r) return !1;
    var l = e.ExistTagsCondition.GameplayTags,
      o = l.Num();
    for (let t = 0; t < o; t++) {
      var a = l.Get(t).TagId;
      if (!r.HasTag(a)) return !1;
    }
    var i = e.UnExistTagsCondition.GameplayTags,
      u = i.Num();
    for (let t = 0; t < u; t++) {
      var s = i.Get(t).TagId;
      if (r.HasTag(s)) return !1;
    }
    return !0;
  }
}
exports.BulletLogicManipulatableTagsChange = BulletLogicManipulatableTagsChange;
//# sourceMappingURL=BulletLogicManipulatableTagsChange.js.map

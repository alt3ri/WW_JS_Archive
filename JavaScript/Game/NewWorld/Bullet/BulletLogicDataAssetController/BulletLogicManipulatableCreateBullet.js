"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicManipulatableCreateBullet = void 0);
const MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  BulletController_1 = require("../BulletController"),
  BulletHitActorData_1 = require("../Model/BulletHitActorData"),
  BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicManipulatableCreateBullet extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e), (this.h7o = t);
  }
  BulletLogicActionOnHitObstacles(t = void 0) {
    if (
      t &&
      t instanceof BulletHitActorData_1.BulletHitActorData &&
      t.Entity &&
      t.Entity.GetComponent(0).IsSceneItem()
    ) {
      var e = t.Entity;
      if (e?.GetComponent(143) && this.CheckCondition(e)) {
        var l = this.Bullet.GetBulletInfo(),
          r = l.AttackerActorComp.Actor,
          i =
            e.GetComponent(1)?.ActorTransform ??
            MathUtils_1.MathUtils.DefaultTransform,
          o = this.h7o.CreateBulletRowName.Num(),
          a = l.ContextId;
        for (let t = 0; t < o; t++) {
          var u = this.h7o.CreateBulletRowName.Get(t);
          BulletController_1.BulletController.CreateBulletCustomTarget(
            r,
            u,
            i,
            {
              SkillId: l.BulletInitParams.SkillId,
              ParentVictimId: e?.Id,
              ParentTargetId: l.Target?.Id,
              ParentId: this.Bullet.Id,
              DtType: l.BulletInitParams.DtType,
            },
            a,
          );
        }
      }
    }
  }
  CheckCondition(t) {
    var e = this.h7o,
      l = t?.GetComponent(181);
    if (!l) return !1;
    var r = e.ExistTagsCondition.GameplayTags,
      i = r.Num();
    for (let t = 0; t < i; t++) {
      var o = r.Get(t).TagId;
      if (!l.HasTag(o)) return !1;
    }
    var a = e.UnExistTagsCondition.GameplayTags,
      u = a.Num();
    for (let t = 0; t < u; t++) {
      var s = a.Get(t).TagId;
      if (l.HasTag(s)) return !1;
    }
    return !0;
  }
}
exports.BulletLogicManipulatableCreateBullet =
  BulletLogicManipulatableCreateBullet;
//# sourceMappingURL=BulletLogicManipulatableCreateBullet.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicManipulatableCreateBullet = void 0);
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const BulletController_1 = require("../BulletController");
const BulletHitActorData_1 = require("../Model/BulletHitActorData");
const BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicManipulatableCreateBullet extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e), (this.u9o = t);
  }
  BulletLogicActionOnHitObstacles(t = void 0) {
    if (
      t &&
      t instanceof BulletHitActorData_1.BulletHitActorData &&
      t.Entity &&
      t.Entity.GetComponent(0).IsSceneItem()
    ) {
      const e = t.Entity;
      if (e?.GetComponent(140) && this.CheckCondition(e)) {
        const l = this.Bullet.GetBulletInfo();
        const r = l.AttackerActorComp.Actor;
        const i =
          e.GetComponent(1)?.ActorTransform ??
          MathUtils_1.MathUtils.DefaultTransform;
        const o = this.u9o.CreateBulletRowName.Num();
        const a = l.ContextId;
        for (let t = 0; t < o; t++) {
          const u = this.u9o.CreateBulletRowName.Get(t);
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
    const e = this.u9o;
    const l = t?.GetComponent(177);
    if (!l) return !1;
    const r = e.ExistTagsCondition.GameplayTags;
    const i = r.Num();
    for (let t = 0; t < i; t++) {
      const o = r.Get(t).TagId;
      if (!l.HasTag(o)) return !1;
    }
    const a = e.UnExistTagsCondition.GameplayTags;
    const u = a.Num();
    for (let t = 0; t < u; t++) {
      const s = a.Get(t).TagId;
      if (l.HasTag(s)) return !1;
    }
    return !0;
  }
}
exports.BulletLogicManipulatableCreateBullet =
  BulletLogicManipulatableCreateBullet;
// # sourceMappingURL=BulletLogicManipulatableCreateBullet.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicSuiGuang = void 0);
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const BulletController_1 = require("../BulletController");
const BulletEntity_1 = require("../Entity/BulletEntity");
const BulletHitActorData_1 = require("../Model/BulletHitActorData");
const BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicSuiGuang extends BulletLogicController_1.BulletLogicController {
  constructor(t, l) {
    super(t, l), (this._9o = this.Bullet.GetBulletInfo()), (this.u9o = t);
  }
  BulletLogicAction(t = void 0) {
    t instanceof BulletHitActorData_1.BulletHitActorData &&
      (this.u9o.IncludeBullet
        ? t.Entity instanceof BulletEntity_1.BulletEntity &&
          t.Entity.GetBulletInfo().HasTag(this.u9o.NeedTag) &&
          this.$9o(this.u9o.NewBulletId, t.Entity.Id)
        : t.Entity?.GetComponent(0)?.IsRole() &&
          t.Entity.GetComponent(185)?.HasTag(this.u9o.NeedTag.TagId) &&
          this.$9o(this.u9o.NewBulletId, t.Entity.Id));
  }
  $9o(t, l) {
    const e = this.Bullet.GetComponent(152).ActorTransform;
    BulletController_1.BulletController.CreateBulletCustomTarget(
      this.Bullet.GetBulletInfo().BulletInitParams.Owner,
      t,
      e ?? MathUtils_1.MathUtils.DefaultTransform,
      {
        SkillId: this._9o.BulletInitParams.SkillId,
        ParentVictimId: l,
        ParentTargetId: this._9o.Target?.Id,
        ParentId: this.Bullet.Id,
        DtType: this._9o.BulletInitParams.DtType,
      },
      this._9o.ContextId,
    ),
      BulletController_1.BulletController.DestroyBullet(this.Bullet.Id, !1);
  }
}
exports.BulletLogicSuiGuang = BulletLogicSuiGuang;
// # sourceMappingURL=BulletLogicSuiGuang.js.map

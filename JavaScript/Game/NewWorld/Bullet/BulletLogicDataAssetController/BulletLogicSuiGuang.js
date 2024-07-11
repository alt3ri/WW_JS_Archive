"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicSuiGuang = void 0);
const MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  BulletController_1 = require("../BulletController"),
  BulletEntity_1 = require("../Entity/BulletEntity"),
  BulletHitActorData_1 = require("../Model/BulletHitActorData"),
  BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicSuiGuang extends BulletLogicController_1.BulletLogicController {
  constructor(t, l) {
    super(t, l), (this.a7o = this.Bullet.GetBulletInfo()), (this.h7o = t);
  }
  BulletLogicAction(t = void 0) {
    t instanceof BulletHitActorData_1.BulletHitActorData &&
      (this.h7o.IncludeBullet
        ? t.Entity instanceof BulletEntity_1.BulletEntity &&
          t.Entity.GetBulletInfo().HasTag(this.h7o.NeedTag) &&
          this.K7o(this.h7o.NewBulletId, t.Entity.Id)
        : t.Entity?.GetComponent(0)?.IsRole() &&
          t.Entity.GetComponent(188)?.HasTag(this.h7o.NeedTag.TagId) &&
          this.K7o(this.h7o.NewBulletId, t.Entity.Id));
  }
  K7o(t, l) {
    var e = this.Bullet.GetComponent(154).ActorTransform;
    BulletController_1.BulletController.CreateBulletCustomTarget(
      this.Bullet.GetBulletInfo().BulletInitParams.Owner,
      t,
      e ?? MathUtils_1.MathUtils.DefaultTransform,
      {
        SkillId: this.a7o.BulletInitParams.SkillId,
        ParentVictimId: l,
        ParentTargetId: this.a7o.Target?.Id,
        ParentId: this.Bullet.Id,
        DtType: this.a7o.BulletInitParams.DtType,
      },
      this.a7o.ContextId,
    ),
      BulletController_1.BulletController.DestroyBullet(this.Bullet.Id, !1);
  }
}
exports.BulletLogicSuiGuang = BulletLogicSuiGuang;
//# sourceMappingURL=BulletLogicSuiGuang.js.map

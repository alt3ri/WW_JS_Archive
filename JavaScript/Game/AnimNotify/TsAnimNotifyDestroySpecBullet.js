"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ModelManager_1 = require("../Manager/ModelManager"),
  BulletController_1 = require("../NewWorld/Bullet/BulletController");
class TsAnimNotifyDestroySpecBullet extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments),
      (this.bulletName = void 0),
      (this.是否召唤子子弹 = !1),
      (this.角色拥有标签执行判定 = void 0);
  }
  K2_Notify(e, r) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      if (0 < this.角色拥有标签执行判定.GameplayTags.Num()) {
        var t = e.GetComponentByClass(
          UE.BaseAbilitySystemComponent.StaticClass(),
        );
        if (!t || !t.HasAnyGameplayTag(this.角色拥有标签执行判定)) return !1;
      }
      t = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(
        e.EntityId,
      );
      const s = [],
        o = this.bulletName.toString();
      if (
        (t?.forEach((e) => {
          o === e.GetBulletInfo()?.BulletDataMain.BulletName && s.push(e.Id);
        }),
        0 === s.length)
      )
        return !1;
      for (let e = s.length - 1; 0 <= e; e--)
        BulletController_1.BulletController.DestroyBullet(
          s[e],
          this.是否召唤子子弹,
        );
    }
    return !0;
  }
  GetNotifyName() {
    return "销毁子弹";
  }
}
exports.default = TsAnimNotifyDestroySpecBullet;
//# sourceMappingURL=TsAnimNotifyDestroySpecBullet.js.map

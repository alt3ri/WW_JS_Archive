"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager");
class TsAnimNotifyDestroySpecBullet extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments),
      (this.bulletName = void 0),
      (this.是否召唤子子弹 = !1),
      (this.角色拥有标签执行判定 = void 0);
  }
  Constructor() {}
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
      const o = [],
        s = this.bulletName.toString();
      if (
        (t?.forEach((e) => {
          s === e.GetBulletInfo()?.BulletDataMain.BulletName && o.push(e.Id);
        }),
        0 === o.length)
      )
        return !1;
      for (let e = o.length - 1; 0 <= e; e--)
        ControllerHolder_1.ControllerHolder.BulletController.DestroyBullet(
          o[e],
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

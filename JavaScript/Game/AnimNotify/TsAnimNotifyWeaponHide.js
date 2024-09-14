"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyWeaponHide extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments),
      (this.Hide = !0),
      (this.WeaponIndex = -1),
      (this.HideEffect = !0),
      (this.UseHighPriority = !1);
  }
  K2_Notify(e, t) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      e = e?.CharacterActorComponent?.Entity;
      if (!e?.Valid) return !1;
      e.GetComponent(72)?.HideWeapon(
        this.WeaponIndex,
        this.Hide,
        this.HideEffect,
        !1,
        this.UseHighPriority ? 1 : 0,
      );
    }
    return !0;
  }
  GetNotifyName() {
    return "武器隐藏";
  }
}
exports.default = TsAnimNotifyWeaponHide;
//# sourceMappingURL=TsAnimNotifyWeaponHide.js.map

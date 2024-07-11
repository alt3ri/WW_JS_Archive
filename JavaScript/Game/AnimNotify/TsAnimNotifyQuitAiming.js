"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyQuitAiming extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.Tag = void 0);
  }
  K2_Notify(e, t) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      var r = e.CharacterActorComponent.Entity;
      if (!e.CharacterActorComponent.IsWorldOwner()) return !1;
      if (
        "None" === this.Tag.TagName ||
        r.GetComponent(185).HasTag(this.Tag.TagId)
      )
        return r.GetComponent(158).ExitAimStatus(), !0;
    }
    return !1;
  }
  GetNotifyName() {
    return "退出瞄准模式";
  }
}
exports.default = TsAnimNotifyQuitAiming;
//# sourceMappingURL=TsAnimNotifyQuitAiming.js.map

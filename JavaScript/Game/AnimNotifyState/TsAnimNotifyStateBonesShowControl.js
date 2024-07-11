"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateBonesShowControl extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.EndPlay = !0), (this.BoneName = void 0);
  }
  K2_NotifyBegin(t, e, r) {
    let s = t.GetOwner();
    if (s instanceof TsBaseCharacter_1.default) {
      s = s.CharacterActorComponent.Entity;
      if (!s?.Valid) return !1;
      t.IsBoneHiddenByName(this.BoneName) ||
        (t.HideBoneByName(this.BoneName, 0),
        s.GetComponent(69)?.HideWeaponsWhenHideBones(!0, this.BoneName));
    }
    return !1;
  }
  K2_NotifyEnd(t, e) {
    let r = t.GetOwner();
    if (r instanceof TsBaseCharacter_1.default) {
      r = r.CharacterActorComponent?.Entity;
      if (!r?.Valid) return !1;
      t.IsBoneHiddenByName(this.BoneName) &&
        (t.UnHideBoneByName(this.BoneName),
        r.GetComponent(69)?.HideWeaponsWhenHideBones(!1, this.BoneName));
    }
    return !1;
  }
  GetNotifyName() {
    return "骨骼显示控制";
  }
}
exports.default = TsAnimNotifyStateBonesShowControl;
// # sourceMappingURL=TsAnimNotifyStateBonesShowControl.js.map

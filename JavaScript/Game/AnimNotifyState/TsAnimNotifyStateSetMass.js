"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateSetMass extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.NewMass = -0), (this.OldMass = -0);
  }
  Constructor() {}
  K2_NotifyBegin(t, e, s) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      ((this.OldMass = t.CharacterMovement.Mass),
      (t.CharacterMovement.Mass = this.NewMass),
      !0)
    );
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      ((t.CharacterMovement.Mass = this.OldMass), !0)
    );
  }
  GetNotifyName() {
    return "设置质量";
  }
}
exports.default = TsAnimNotifyStateSetMass;
//# sourceMappingURL=TsAnimNotifyStateSetMass.js.map

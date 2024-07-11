"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateSetMass extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.NewMass = -0), (this.OldMass = -0);
  }
  K2_NotifyBegin(e, t, s) {
    e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      ((this.OldMass = e.CharacterMovement.Mass),
      (e.CharacterMovement.Mass = this.NewMass),
      !0)
    );
  }
  K2_NotifyEnd(e, t) {
    e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      ((e.CharacterMovement.Mass = this.OldMass), !0)
    );
  }
  GetNotifyName() {
    return "设置质量";
  }
}
exports.default = TsAnimNotifyStateSetMass;
// # sourceMappingURL=TsAnimNotifyStateSetMass.js.map

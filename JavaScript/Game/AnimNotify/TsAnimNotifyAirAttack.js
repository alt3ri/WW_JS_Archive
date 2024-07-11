"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyAirAttack extends UE.KuroAnimNotify {
  K2_Notify(e, t) {
    e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
        e.CharacterMovement.Velocity.Set(0, 0, 130),
      !0
    );
  }
}
exports.default = TsAnimNotifyAirAttack;
// # sourceMappingURL=TsAnimNotifyAirAttack.js.map

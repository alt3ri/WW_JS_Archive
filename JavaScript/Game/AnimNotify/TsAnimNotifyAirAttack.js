"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyAirAttack extends UE.KuroAnimNotify {
  Constructor() {}
  K2_Notify(e, r) {
    e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
        e.CharacterActorComponent?.SetActorVelocity(
          Vector_1.Vector.Create(0, 0, 130),
        ),
      !0
    );
  }
}
exports.default = TsAnimNotifyAirAttack;
//# sourceMappingURL=TsAnimNotifyAirAttack.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateSetCollisionLv extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.HitPriority = 0);
  }
  K2_NotifyBegin(e, t, s) {
    e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      ((e.CharacterMovement.HitPriority = this.HitPriority),
      !(this.HitPriority = 0))
    );
  }
  K2_NotifyEnd(e, t) {
    e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      ((e.CharacterMovement.HitPriority = this.HitPriority), !0)
    );
  }
}
exports.default = TsAnimNotifyStateSetCollisionLv;
//# sourceMappingURL=TsAnimNotifyStateSetCollisionLv.js.map

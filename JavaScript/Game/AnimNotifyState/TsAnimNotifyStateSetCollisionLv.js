"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateSetCollisionLv extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.HitPriority = 0);
  }
  Constructor() {}
  K2_NotifyBegin(t, e, s) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      ((t.CharacterMovement.HitPriority = this.HitPriority),
      !(this.HitPriority = 0))
    );
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      ((t.CharacterMovement.HitPriority = this.HitPriority), !0)
    );
  }
}
exports.default = TsAnimNotifyStateSetCollisionLv;
//# sourceMappingURL=TsAnimNotifyStateSetCollisionLv.js.map

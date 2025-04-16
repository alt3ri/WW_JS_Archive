"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyBreakConstraint extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments),
      (this.分离骨骼名 = void 0),
      (this.Impulse = new UE.Vector(0, 0, 0)),
      (this.HitLocation = new UE.Vector(0, 0, 0));
  }
  Constructor() {}
  K2_Notify(t, e) {
    return (
      t.GetOwner() instanceof TsBaseCharacter_1.default &&
        t.BreakConstraint(this.Impulse, this.HitLocation, this.分离骨骼名),
      !0
    );
  }
  GetNotifyName() {
    return "分离骨骼网格体";
  }
}
exports.default = TsAnimNotifyBreakConstraint;
//# sourceMappingURL=TsAnimNotifyBreakConstraint.js.map

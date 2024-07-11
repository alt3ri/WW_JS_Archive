"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyBreakConstraint extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments),
      (this.分离骨骼名 = void 0),
      (this.Impulse = new UE.Vector(0, 0, 0)),
      (this.HitLocation = new UE.Vector(0, 0, 0));
  }
  K2_Notify(e, t) {
    return (
      e.GetOwner() instanceof TsBaseCharacter_1.default &&
        e.BreakConstraint(this.Impulse, this.HitLocation, this.分离骨骼名),
      !0
    );
  }
  GetNotifyName() {
    return "分离骨骼网格体";
  }
}
exports.default = TsAnimNotifyBreakConstraint;
// # sourceMappingURL=TsAnimNotifyBreakConstraint.js.map

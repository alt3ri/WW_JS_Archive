"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateWalkOnWater extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.Key = ""), (this.FixLocation = !0);
  }
  Constructor() {}
  K2_NotifyBegin(t, e, r) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
        t?.CharacterActorComponent?.Entity?.GetComponent(
          78,
        )?.EnableOrDisableWalkOnWater(!0, this.Key, this.FixLocation),
      !0
    );
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
        t?.CharacterActorComponent?.Entity?.GetComponent(
          78,
        )?.EnableOrDisableWalkOnWater(!1, this.Key),
      !0
    );
  }
  GetNotifyName() {
    return "水上行走";
  }
}
exports.default = TsAnimNotifyStateWalkOnWater;
//# sourceMappingURL=TsAnimNotifyStateWalkOnWater.js.map

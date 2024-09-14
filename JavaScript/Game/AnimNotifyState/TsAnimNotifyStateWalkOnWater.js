"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateWalkOnWater extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.Key = ""), (this.FixLocation = !0);
  }
  K2_NotifyBegin(e, t, r) {
    e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
        e?.CharacterActorComponent?.Entity?.GetComponent(
          71,
        )?.EnableOrDisableWalkOnWater(!0, this.Key, this.FixLocation),
      !0
    );
  }
  K2_NotifyEnd(e, t) {
    e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
        e?.CharacterActorComponent?.Entity?.GetComponent(
          71,
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

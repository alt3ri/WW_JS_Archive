"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateClearInputCache extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.InputAction = 0), (this.InputState = 0);
  }
  K2_NotifyEnd(e, t) {
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
        (e = e.CharacterActorComponent.Entity.GetComponent(52)) &&
        e.ClearInputCache(this.InputAction, this.InputState),
      !0
    );
  }
}
exports.default = TsAnimNotifyStateClearInputCache;
// # sourceMappingURL=TsAnimNotifyStateClearInputCache.js.map

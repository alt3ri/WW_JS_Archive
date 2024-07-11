"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateLimitInputCache extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.Action = 0),
      (this.State = 0),
      (this.ReleaseHoldCache = !1),
      (this.ForbidExecuteCommand = !1);
  }
  K2_NotifyBegin(t, e) {
    var t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
        (t = t.CharacterActorComponent.Entity.GetComponent(52)) &&
        t.LimitInputCache(this),
      !0
    );
  }
  K2_NotifyEnd(t, e) {
    var t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
        (t = t.CharacterActorComponent.Entity.GetComponent(52)) &&
        t.CancelLimitInputCache(this),
      !0
    );
  }
  GetNotifyName() {
    return "限制输入";
  }
}
exports.default = TsAnimNotifyStateLimitInputCache;
// # sourceMappingURL=TsAnimNotifyStateLimitInputCache.js.map

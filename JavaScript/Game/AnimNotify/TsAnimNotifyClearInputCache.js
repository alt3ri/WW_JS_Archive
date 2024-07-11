"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyClearInputCache extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.InputAction = 0), (this.InputState = 0);
  }
  K2_Notify(e, t) {
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
        (e = e.CharacterActorComponent.Entity.GetComponent(52)) &&
        e.ClearInputCache(this.InputAction, this.InputState),
      !0
    );
  }
  GetNotifyName() {
    return "清除角色所有输入缓存";
  }
}
exports.default = TsAnimNotifyClearInputCache;
// # sourceMappingURL=TsAnimNotifyClearInputCache.js.map

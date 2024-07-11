"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifySendGamePlayEvent extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.事件Tag = void 0);
  }
  K2_Notify(e, t) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      e = e.CharacterActorComponent.Entity.GetComponent(17);
      if (!e?.Valid) return !1;
      e.SendGameplayEventToActor(this.事件Tag);
    }
    return !1;
  }
  GetNotifyName() {
    return "发送动画通知广播";
  }
}
exports.default = TsAnimNotifySendGamePlayEvent;
// # sourceMappingURL=TsAnimNotifySendGamePlayEvent.js.map

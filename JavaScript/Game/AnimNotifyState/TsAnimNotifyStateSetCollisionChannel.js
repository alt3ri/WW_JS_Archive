"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateSetCollisionChannel extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.IgnoreChannels = void 0);
  }
  K2_NotifyBegin(e, t, r) {
    const s = e.GetOwner();
    if (s instanceof TsBaseCharacter_1.default) {
      const a = this.IgnoreChannels.Num();
      for (let e = 0; e < a; e++)
        s.CapsuleComponent.SetCollisionResponseToChannel(
          this.IgnoreChannels.Get(e),
          0,
        );
      return !0;
    }
    return !1;
  }
  K2_NotifyEnd(e, t) {
    const r = e.GetOwner();
    if (r instanceof TsBaseCharacter_1.default) {
      const s = this.IgnoreChannels.Num();
      for (let e = 0; e < s; e++)
        r.CapsuleComponent.SetCollisionResponseToChannel(
          this.IgnoreChannels.Get(e),
          2,
        );
      return !0;
    }
    return !1;
  }
  GetNotifyName() {
    return "设置碰撞预设";
  }
}
exports.default = TsAnimNotifyStateSetCollisionChannel;
// # sourceMappingURL=TsAnimNotifyStateSetCollisionChannel.js.map

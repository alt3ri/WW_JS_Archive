"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  GameplayCueController_1 = require("../NewWorld/Character/Common/Component/Abilities/GameplayCueSFX/Controller/GameplayCueController");
class TsAnimNotifyStateAddGameplayCue extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.Buff特效Id列表 = void 0),
      (this.GameplayCueHandleIdList = void 0);
  }
  Constructor() {}
  K2_NotifyBegin(e, r, t) {
    e = e.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) return !1;
    var a = e?.CharacterActorComponent?.Entity?.GetComponent(21);
    if (!a) return !1;
    if (this.Buff特效Id列表)
      for (let e = 0; e < this.Buff特效Id列表.Num(); e++) {
        var i = this.Buff特效Id列表.Get(e),
          i = a.AddCue(Number(i));
        i !== GameplayCueController_1.INVALID_CUE_HANDLE &&
          (this.GameplayCueHandleIdList || (this.GameplayCueHandleIdList = []),
          this.GameplayCueHandleIdList.push(i));
      }
    return !0;
  }
  K2_NotifyEnd(e, r) {
    e = e.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) return !1;
    var t = e?.CharacterActorComponent?.Entity?.GetComponent(21);
    if (!t) return !1;
    if (this.GameplayCueHandleIdList) {
      for (const a of this.GameplayCueHandleIdList)
        t?.GetCueByHandle(a)?.Destroy();
      this.GameplayCueHandleIdList = void 0;
    }
    return !0;
  }
  GetNotifyName() {
    return "播放Buff特效";
  }
}
exports.default = TsAnimNotifyStateAddGameplayCue;
//# sourceMappingURL=TsAnimNotifyStateAddGameplayCue.js.map

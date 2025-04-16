"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateReplaceHitEffect extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.Setting = void 0);
  }
  Constructor() {}
  K2_NotifyBegin(e, t, r) {
    var s,
      e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      (this.Setting
        ? !!(s = e.CharacterActorComponent?.Entity)?.Valid &&
          !!(s = s.GetComponent(60))?.Valid &&
          (s.ReplaceHitEffect(this.Setting), !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 17, "替换受击效果的ANS缺少配置", [
              "",
              e?.GetName(),
            ]),
          !1))
    );
  }
  K2_NotifyEnd(e, t) {
    var e = e?.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      !!(e = e.CharacterActorComponent?.Entity)?.Valid &&
      !!(e = e.GetComponent(60))?.Valid &&
      (e.RemoveHitEffectReplaced(), !0)
    );
  }
  GetNotifyName() {
    return "替换受击效果";
  }
}
exports.default = TsAnimNotifyStateReplaceHitEffect;
//# sourceMappingURL=TsAnimNotifyStateReplaceHitEffect.js.map

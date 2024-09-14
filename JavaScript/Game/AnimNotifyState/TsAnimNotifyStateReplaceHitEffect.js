"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateReplaceHitEffect extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.Setting = void 0);
  }
  K2_NotifyBegin(e, t, r) {
    var a,
      e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      (this.Setting
        ? !!(a = e.CharacterActorComponent?.Entity)?.Valid &&
          !!(a = a.GetComponent(53))?.Valid &&
          (a.ReplaceHitEffect(this.Setting), !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 18, "替换受击效果的ANS缺少配置", [
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
      !!(e = e.GetComponent(53))?.Valid &&
      (e.RemoveHitEffectReplaced(), !0)
    );
  }
  GetNotifyName() {
    return "替换受击效果";
  }
}
exports.default = TsAnimNotifyStateReplaceHitEffect;
//# sourceMappingURL=TsAnimNotifyStateReplaceHitEffect.js.map

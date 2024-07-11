"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const CharacterAttributeTypes_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const MIN_JUMP_UP_RATE = 0.3;
const MAX_JUMP_UP_RATE = 1;
class TsAnimNotifyStateSetRootMotionScale extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.Tag = void 0);
  }
  K2_NotifyBegin(t, e, r) {
    let o;
    let a;
    var t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !!(o = t.CharacterActorComponent)?.Valid &&
      !(
        o.GetSequenceBinding() ||
        !o.IsAutonomousProxy ||
        !o.Entity.GetComponent(185)?.HasTag(this.Tag.TagId) ||
        (this.Tag?.TagId === -451106150 &&
          ((a = (a = o.Entity.GetComponent(156))
            ? a.GetCurrentValue(Protocol_1.Aki.Protocol.KBs.Proto_Jump) /
              CharacterAttributeTypes_1.PER_TEN_THOUSAND
            : 1),
          t.SetAnimRootMotionTranslationScale(a),
          (t = o.Entity.GetComponent(161))) &&
          (t.JumpUpRate = MathUtils_1.MathUtils.Clamp(
            MIN_JUMP_UP_RATE + 1 / a,
            MIN_JUMP_UP_RATE,
            MAX_JUMP_UP_RATE,
          )),
        0)
      )
    );
  }
  K2_NotifyEnd(t, e) {
    let r;
    var t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !(
        !(r = t.CharacterActorComponent)?.Valid ||
        r.GetSequenceBinding() ||
        !r.IsAutonomousProxy ||
        ((r = r.Entity.GetComponent(161)) && (r.JumpUpRate = 1),
        t.SetAnimRootMotionTranslationScale(),
        0)
      )
    );
  }
  GetNotifyName() {
    return "设置RootMotion缩放比例";
  }
}
exports.default = TsAnimNotifyStateSetRootMotionScale;
// # sourceMappingURL=TsAnimNotifyStateSetRootMotionScale.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyDetach extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.IsDetachFollower = !1), (this.IsRecursion = !1);
  }
  Constructor() {}
  K2_Notify(t, e) {
    var s,
      r,
      t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !(
        !(s = t.CharacterActorComponent)?.Valid ||
        !s.IsAutonomousProxy ||
        !(r = s.Entity.GetComponent(39))?.Valid ||
        !r.SkillTarget?.Entity ||
        !(r = t.GetEntityNoBlueprint()?.GetComponent(178))?.Valid ||
        ((t = s.Entity.GetComponent(207).CreateAnimNotifyContent(
          e.GetName(),
          this.exportIndex,
        )),
        r.DetachFromHost(this.IsDetachFollower, this.IsRecursion, !0, t),
        0)
      )
    );
  }
  GetNotifyName() {
    return "从目标身上解绑";
  }
}
exports.default = TsAnimNotifyDetach;
//# sourceMappingURL=TsAnimNotifyDetach.js.map

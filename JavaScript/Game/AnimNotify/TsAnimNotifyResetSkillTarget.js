"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyResetSkillTarget extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.技能目标配置 = void 0);
  }
  K2_Notify(e, t) {
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      !!(e = e.CharacterActorComponent.Entity.GetComponent(33)) &&
      (e.SelectTargetAndSetShow(this.技能目标配置), !0)
    );
  }
  GetNotifyName() {
    return "重置技能目标";
  }
}
exports.default = TsAnimNotifyResetSkillTarget;
//# sourceMappingURL=TsAnimNotifyResetSkillTarget.js.map

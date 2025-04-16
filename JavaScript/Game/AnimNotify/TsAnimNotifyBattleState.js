"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyBattleState extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.取消无敌 = !1);
  }
  Constructor() {}
  K2_Notify(t, e) {
    var t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
        ((t = (t?.CharacterActorComponent?.Entity).GetComponent(203)),
        this.取消无敌) &&
        t &&
        t.RemoveTag(501201e3),
      !0
    );
  }
  GetNotifyName() {
    return "设置战斗状态";
  }
}
exports.default = TsAnimNotifyBattleState;
//# sourceMappingURL=TsAnimNotifyBattleState.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyBattleState extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.取消无敌 = !1);
  }
  K2_Notify(e, t) {
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
        ((e = (e?.CharacterActorComponent?.Entity).GetComponent(190)),
        this.取消无敌) &&
        e &&
        e.RemoveTag(501201e3),
      !0
    );
  }
  GetNotifyName() {
    return "设置战斗状态";
  }
}
exports.default = TsAnimNotifyBattleState;
//# sourceMappingURL=TsAnimNotifyBattleState.js.map

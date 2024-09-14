"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateSwitchNpcFaceExpression extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.FaceExpressionId = -1);
  }
  K2_NotifyBegin(e, t, s) {
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      !!(e = e.CharacterActorComponent?.Entity.GetComponent(172)) &&
      (e.ExpressionController.ChangeFaceForExpressionFromAnimNotify(
        this.FaceExpressionId,
        this,
      ),
      !0)
    );
  }
  K2_NotifyEnd(e, t) {
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      !!(e = e.CharacterActorComponent?.Entity.GetComponent(172)) &&
      (e.ExpressionController.ResetFaceForExpressionFromAnimNotify(this), !0)
    );
  }
  GetNotifyName() {
    return "切换Npc表情";
  }
}
exports.default = TsAnimNotifyStateSwitchNpcFaceExpression;
//# sourceMappingURL=TsAnimNotifyStateSwitchNpcFaceExpression.js.map

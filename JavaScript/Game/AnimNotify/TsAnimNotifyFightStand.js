"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  BATLLE_IDLE_TIME = 5e3;
class TsAnimNotifyFightStand extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.BattleIdleTime = BATLLE_IDLE_TIME);
  }
  Constructor() {}
  K2_Notify(t, e) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
        t?.CharacterActorComponent?.Entity?.GetComponent(175)?.EnterBattleIdle(
          this.BattleIdleTime,
        ),
      !0
    );
  }
  GetNotifyName() {
    return "设置战斗待机";
  }
}
exports.default = TsAnimNotifyFightStand;
//# sourceMappingURL=TsAnimNotifyFightStand.js.map

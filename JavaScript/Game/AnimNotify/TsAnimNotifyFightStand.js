"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyFightStand extends UE.KuroAnimNotify {
  K2_Notify(e, t) {
    e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
        e?.CharacterActorComponent?.Entity?.GetComponent(
          160,
        )?.EnterBattleIdle(),
      !0
    );
  }
  GetNotifyName() {
    return "设置战斗待机";
  }
}
exports.default = TsAnimNotifyFightStand;
// # sourceMappingURL=TsAnimNotifyFightStand.js.map

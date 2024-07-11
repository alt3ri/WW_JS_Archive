"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyDisableCollision extends UE.KuroAnimNotify {
  K2_Notify(e, s) {
    e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default && e.SetActorEnableCollision(!1),
      !0
    );
  }
  GetNotifyName() {
    return "禁用Actor碰撞";
  }
}
exports.default = TsAnimNotifyDisableCollision;
// # sourceMappingURL=TsAnimNotifyDisableCollision.js.map

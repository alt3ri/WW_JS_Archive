"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyEnableCollision extends UE.KuroAnimNotify {
  K2_Notify(e, r) {
    e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default && e.SetActorEnableCollision(!1),
      !0
    );
  }
  GetNotifyName() {
    return "启用Actor碰撞";
  }
}
exports.default = TsAnimNotifyEnableCollision;
// # sourceMappingURL=TsAnimNotifyEnableCollision.js.map

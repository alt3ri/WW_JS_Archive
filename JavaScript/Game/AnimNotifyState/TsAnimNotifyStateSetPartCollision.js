"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateSetPartCollision extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.CompName = ""),
      (this.IsBlockPawn = !1),
      (this.IsBulletDetect = !1),
      (this.IsBlockCamera = !1);
  }
  K2_NotifyBegin(t, e, s) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      (t.CharacterActorComponent.SetPartCollisionSwitch(
        this.CompName,
        this.IsBlockPawn,
        this.IsBulletDetect,
        this.IsBlockCamera,
      ),
      !0)
    );
  }
  K2_NotifyEnd(t, e) {
    var s,
      t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      ((s = t.CharacterActorComponent.GetPartConf(this.CompName)),
      t.CharacterActorComponent.SetPartCollisionSwitch(
        this.CompName,
        s.IsBlockPawn,
        s.IsBulletDetect,
        s.IsBlockCamera,
      ),
      !0)
    );
  }
  GetNotifyName() {
    return "设置部位碰撞";
  }
}
exports.default = TsAnimNotifyStateSetPartCollision;
//# sourceMappingURL=TsAnimNotifyStateSetPartCollision.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateSetPartCollision extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.CompName = ""),
      (this.CompNames = void 0),
      (this.IsBlockPawn = !1),
      (this.IsBulletDetect = !1),
      (this.IsBlockCamera = !1);
  }
  K2_NotifyBegin(t, s, i) {
    var e = t.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      this.SetPartCollisionSwitch(
        e,
        this.CompName,
        this.IsBlockPawn,
        this.IsBulletDetect,
        this.IsBlockCamera,
      );
      for (let t = 0; t < this.CompNames.Num(); t++) {
        var r = this.CompNames.Get(t);
        this.SetPartCollisionSwitch(
          e,
          r,
          this.IsBlockPawn,
          this.IsBulletDetect,
          this.IsBlockCamera,
        );
      }
      return !0;
    }
    return !1;
  }
  K2_NotifyEnd(t, s) {
    var i = t.GetOwner();
    if (i instanceof TsBaseCharacter_1.default) {
      t = i.CharacterActorComponent.GetPartConf(this.CompName);
      this.SetPartCollisionSwitch(
        i,
        this.CompName,
        t.IsBlockPawn,
        t.IsBulletDetect,
        t.IsBlockCamera,
      );
      for (let t = 0; t < this.CompNames.Num(); t++) {
        var e = this.CompNames.Get(t),
          r = i.CharacterActorComponent.GetPartConf(e);
        this.SetPartCollisionSwitch(
          i,
          e,
          r.IsBlockPawn,
          r.IsBulletDetect,
          r.IsBlockCamera,
        );
      }
      return !0;
    }
    return !1;
  }
  GetNotifyName() {
    return "设置部位碰撞";
  }
  SetPartCollisionSwitch(t, s, i, e, r) {
    t.CharacterActorComponent.SetPartCollisionSwitch(s, i, e, r);
  }
}
exports.default = TsAnimNotifyStateSetPartCollision;
//# sourceMappingURL=TsAnimNotifyStateSetPartCollision.js.map

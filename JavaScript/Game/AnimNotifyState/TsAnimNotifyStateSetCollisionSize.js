"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const saveId = new Map();
class TsAnimNotifyStateSetCollisionSize extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.Id = 1),
      (this.Radius = 30),
      (this.HalfHeight = 100);
  }
  K2_NotifyBegin(e, t) {
    e = e.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) return !1;
    (this.HalfHeight <= 0 || this.Radius <= 0) &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Character",
        6,
        "TsAnimNotifyStateSetCollisionSize配置了错误的大小。为避免穿墙，必须大于0",
        ["Actor", e.GetName()],
        ["HalfHeight", this.HalfHeight],
        ["Radius", this.Radius],
      );
    var e = e.CharacterActorComponent;
    const s = e.Entity.Id;
    return (
      saveId.set(s, this.Id),
      e.SetRadiusAndHalfHeight(this.Radius, this.HalfHeight, !1),
      !0
    );
  }
  K2_NotifyEnd(e, t) {
    let s;
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      ((s = (e = e.CharacterActorComponent).Entity.Id),
      saveId.get(s) === this.Id &&
        (e.ResetCapsuleRadiusAndHeight(), saveId.delete(s)),
      !0)
    );
  }
  GetNotifyName() {
    return "设置胶囊体大小";
  }
}
exports.default = TsAnimNotifyStateSetCollisionSize;
// # sourceMappingURL=TsAnimNotifyStateSetCollisionSize.js.map

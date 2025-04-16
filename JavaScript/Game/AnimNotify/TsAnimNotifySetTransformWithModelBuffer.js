"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  WorldGlobal_1 = require("../World/WorldGlobal");
class TsAnimNotifySetTransformWithModelBuffer extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments),
      (this.LocationKey = ""),
      (this.RotatorKey = ""),
      (this.TimeLength = 300);
  }
  Constructor() {}
  K2_Notify(r, e) {
    var t,
      o,
      s,
      r = r.GetOwner();
    return (
      r instanceof TsBaseCharacter_1.default &&
      ((o = (t = r.CharacterActorComponent).Entity),
      (r = r.D_GetTransform()),
      this.LocationKey &&
        (s =
          ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(
            o.Id,
            this.LocationKey,
          )) &&
        r.SetLocation(WorldGlobal_1.WorldGlobal.ToUeVector(s)),
      this.RotatorKey &&
        (s =
          ControllerHolder_1.ControllerHolder.BlackboardController.GetRotatorValueByEntity(
            o.Id,
            this.RotatorKey,
          )) &&
        r.SetRotation(WorldGlobal_1.WorldGlobal.ToUeRotator(s).Quaternion()),
      (s = o.GetComponent(175))?.Valid
        ? s.SetTransformWithModelBuffer(r, this.TimeLength)
        : t.SetActorTransform(r, "TsAnimNotifySetTransformWithModelBuffer", !0),
      !0)
    );
  }
  GetNotifyName() {
    return "怪物趴墙";
  }
}
exports.default = TsAnimNotifySetTransformWithModelBuffer;
//# sourceMappingURL=TsAnimNotifySetTransformWithModelBuffer.js.map

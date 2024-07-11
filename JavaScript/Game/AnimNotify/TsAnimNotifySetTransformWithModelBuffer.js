"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const BlackboardController_1 = require("../World/Controller/BlackboardController");
const WorldGlobal_1 = require("../World/WorldGlobal");
class TsAnimNotifySetTransformWithModelBuffer extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments),
      (this.LocationKey = ""),
      (this.RotatorKey = ""),
      (this.TimeLength = 300);
  }
  K2_Notify(r, e) {
    let o;
    let t;
    let l;
    var r = r.GetOwner();
    return (
      r instanceof TsBaseCharacter_1.default &&
      ((t = (o = r.CharacterActorComponent).Entity),
      (r = r.GetTransform()),
      this.LocationKey &&
        (l = BlackboardController_1.BlackboardController.GetVectorValueByEntity(
          t.Id,
          this.LocationKey,
        )) &&
        r.SetLocation(WorldGlobal_1.WorldGlobal.ToUeVector(l)),
      this.RotatorKey &&
        (l =
          BlackboardController_1.BlackboardController.GetRotatorValueByEntity(
            t.Id,
            this.RotatorKey,
          )) &&
        r.SetRotation(WorldGlobal_1.WorldGlobal.ToUeRotator(l).Quaternion()),
      (l = t.GetComponent(160))?.Valid
        ? l.SetTransformWithModelBuffer(r, this.TimeLength)
        : o.SetActorTransform(r, "TsAnimNotifySetTransformWithModelBuffer", !0),
      !0)
    );
  }
  GetNotifyName() {
    return "怪物趴墙";
  }
}
exports.default = TsAnimNotifySetTransformWithModelBuffer;
// # sourceMappingURL=TsAnimNotifySetTransformWithModelBuffer.js.map

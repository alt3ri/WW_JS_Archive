"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AimPart = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Transform_1 = require("../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../Core/Utils/Math/Vector");
class AimPart {
  constructor(t) {
    (this.OwnerBase = t),
      (this.BoneName = FNameUtil_1.FNameUtil.NONE),
      (this.BoneNameString = ""),
      (this.Offset = Vector_1.Vector.Create()),
      (this.RadiusIn = 0),
      (this.RadiusOut = 0),
      (this.RadiusOutOnStart = 0),
      (this.MobileCorrect = 0),
      (this.GamePadCorrect = 0),
      (this.IgnoreCollisionBoneName = ""),
      (this.OwnerCharacter = void 0),
      (this.SceneItemHit = void 0);
  }
  Init(t) {
    (this.OwnerCharacter = this.OwnerBase),
      (this.BoneNameString = t.BoneName),
      this.Offset.DeepCopy(t.Offset),
      (this.IgnoreCollisionBoneName = t.忽略的骨骼碰撞),
      (this.BoneName = new UE.FName(this.BoneNameString)),
      (this.RadiusIn = t.RadiusIn),
      (this.RadiusOut = t.RadiusOut),
      (this.RadiusOutOnStart = t.RadiusOutOnStart),
      (this.MobileCorrect = t.MobileCorrect),
      (this.GamePadCorrect = t.GamePadCorrect);
  }
  InitSceneItem(t) {
    (this.SceneItemHit = this.OwnerBase.Entity.GetComponent(141)),
      (this.BoneNameString = t.BoneName ?? ""),
      (this.Offset.X = t.Offset.X ?? 0),
      (this.Offset.Y = t.Offset.Y ?? 0),
      (this.Offset.Z = t.Offset.Z ?? 0),
      (this.BoneName = new UE.FName(this.BoneNameString)),
      (this.RadiusIn = t.RadiusIn),
      (this.RadiusOut = t.RadiusOut),
      (this.RadiusOutOnStart = t.RadiusOutOnStart),
      (this.MobileCorrect = t.MobileCorrect),
      (this.GamePadCorrect = t.GamePadCorrect);
  }
  GetRadius(t) {
    let i = t ? this.RadiusOutOnStart : this.RadiusOut;
    return (
      Info_1.Info.IsInGamepad()
        ? (i *= this.GamePadCorrect)
        : Info_1.Info.IsInTouch() && (i *= this.MobileCorrect),
      i
    );
  }
  GetAimPointLocation(t) {
    if (this.OwnerCharacter)
      AimPart.tga.FromUeTransform(
        this.OwnerCharacter.Actor.Mesh.GetSocketTransform(this.BoneName),
      );
    else {
      if (!this.SceneItemHit) return !1;
      if (this.BoneNameString) {
        let t = this.OwnerBase.GetActorInSceneInteraction(this.BoneNameString);
        if (!t && !(t = this.OwnerBase.Owner)) return !1;
        AimPart.tga.FromUeTransform(t.GetTransform());
      } else {
        var i = this.OwnerBase.Owner;
        if (!i) return !1;
        AimPart.tga.FromUeTransform(i.GetTransform());
      }
    }
    return AimPart.tga.TransformPosition(this.Offset, t), !0;
  }
}
(exports.AimPart = AimPart).tga = Transform_1.Transform.Create();
//# sourceMappingURL=AimPartUtils.js.map

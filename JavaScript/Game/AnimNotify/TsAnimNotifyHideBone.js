"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  MeshComponentUtils_1 = require("../NewWorld/Character/Common/Component/MeshHelper/MeshComponentUtils");
class TsAnimNotifyHideBone extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments),
      (this.BoneName = ""),
      (this.Hide = !1),
      (this.IgnoreTsBaseCharacter = !1);
  }
  K2_Notify(e, t) {
    return (
      this.IgnoreTsBaseCharacter
        ? MeshComponentUtils_1.MeshComponentUtils.HideBone(
            e,
            this.BoneName,
            this.Hide,
          )
        : (e = e.GetOwner()) instanceof TsBaseCharacter_1.default &&
          e.CharacterActorComponent &&
          e.CharacterActorComponent.Entity.GetComponent(160)?.HideBone(
            FNameUtil_1.FNameUtil.GetDynamicFName(this.BoneName),
            this.Hide,
          ),
      !0
    );
  }
  GetNotifyName() {
    return "隐藏骨骼";
  }
}
exports.default = TsAnimNotifyHideBone;
//# sourceMappingURL=TsAnimNotifyHideBone.js.map

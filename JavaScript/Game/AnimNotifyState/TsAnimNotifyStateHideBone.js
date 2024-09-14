"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  MeshComponentUtils_1 = require("../NewWorld/Character/Common/Component/MeshHelper/MeshComponentUtils");
class TsAnimNotifyStateHideBone extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.BoneName = ""),
      (this.IgnoreTsBaseCharacter = "");
  }
  K2_NotifyBegin(e, t, s) {
    return (
      this.IgnoreTsBaseCharacter
        ? MeshComponentUtils_1.MeshComponentUtils.HideBone(e, this.BoneName, !0)
        : (e = e.GetOwner()) instanceof TsBaseCharacter_1.default &&
          e.CharacterActorComponent.Entity.GetComponent(163)?.HideBone(
            FNameUtil_1.FNameUtil.GetDynamicFName(this.BoneName),
            !0,
            !1,
          ),
      !0
    );
  }
  K2_NotifyEnd(e, t) {
    return (
      this.IgnoreTsBaseCharacter
        ? MeshComponentUtils_1.MeshComponentUtils.HideBone(e, this.BoneName, !1)
        : (e = e.GetOwner()) instanceof TsBaseCharacter_1.default &&
          e.CharacterActorComponent.Entity.GetComponent(163)?.HideBone(
            FNameUtil_1.FNameUtil.GetDynamicFName(this.BoneName),
            !1,
            !1,
          ),
      !0
    );
  }
  GetNotifyName() {
    return "隐藏骨骼";
  }
}
exports.default = TsAnimNotifyStateHideBone;
//# sourceMappingURL=TsAnimNotifyStateHideBone.js.map

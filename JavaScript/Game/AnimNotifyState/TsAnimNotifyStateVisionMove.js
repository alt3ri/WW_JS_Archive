"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines");
class TsAnimNotifyStateVisionMove extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.移动速度 = void 0),
      (this.Velocity = void 0),
      (this.TmpVector = void 0);
  }
  Constructor() {
    (this.Velocity = void 0), (this.TmpVector = void 0);
  }
  K2_NotifyBegin(t, e, i) {
    this.Init();
    t = t.GetOwner();
    return (
      !!UE.KuroStaticLibrary.IsObjectClassByName(
        t,
        CharacterNameDefines_1.CharacterNameDefines.BP_BASEVISION,
      ) && (this.Velocity.FromUeVector(this.移动速度), !0)
    );
  }
  K2_NotifyTick(t, e, i) {
    var t = t.GetOwner();
    return (
      !!UE.KuroStaticLibrary.IsObjectClassByName(
        t,
        CharacterNameDefines_1.CharacterNameDefines.BP_BASEVISION,
      ) &&
      !!(t = EntitySystem_1.EntitySystem.GetComponent(t.EntityId, 3))?.Valid &&
      (t.AddActorLocalOffset(
        this.Velocity.Multiply(i, this.TmpVector).ToUeVector(),
        "TsAnimNotifyStateVisionMove",
        !0,
      ),
      !0)
    );
  }
  Init() {
    (this.Velocity = Vector_1.Vector.Create()),
      (this.TmpVector = Vector_1.Vector.Create());
  }
  GetNotifyName() {
    return "幻象移动";
  }
}
exports.default = TsAnimNotifyStateVisionMove;
//# sourceMappingURL=TsAnimNotifyStateVisionMove.js.map

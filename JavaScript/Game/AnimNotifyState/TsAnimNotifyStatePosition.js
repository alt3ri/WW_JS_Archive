"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStatePosition extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.移动速度 = void 0),
      (this.速度曲线 = void 0),
      (this.是否持续朝向目标 = !1);
  }
  Constructor() {}
  K2_NotifyBegin(t, e, s) {
    var r = t.GetOwner();
    return (
      r instanceof TsBaseCharacter_1.default &&
      (r.CharacterActorComponent?.Entity?.GetComponent(44)?.SetAddMoveWithMesh(
        t,
        new UE.VectorDouble(this.移动速度),
        s,
        this.速度曲线,
      ),
      !0)
    );
  }
  K2_NotifyTick(t, e, s) {
    var r;
    return (
      !!this.是否持续朝向目标 &&
      (r = t.GetOwner()) instanceof TsBaseCharacter_1.default &&
      (r.CharacterActorComponent?.Entity?.GetComponent(
        44,
      )?.SetAddMoveWorldSpeedWithMesh(
        t,
        UE.KismetMathLibrary.D_TransformDirection(
          r.D_GetTransform(),
          new UE.VectorDouble(this.移动速度),
        ),
      ),
      !0)
    );
  }
  K2_NotifyEnd(t, e) {
    var s = t.GetOwner();
    return (
      s instanceof TsBaseCharacter_1.default &&
      (s.CharacterActorComponent?.Entity?.GetComponent(44)?.StopAddMoveWithMesh(
        t,
      ),
      !0)
    );
  }
  GetNotifyName() {
    return "位移到坐标点";
  }
}
exports.default = TsAnimNotifyStatePosition;
//# sourceMappingURL=TsAnimNotifyStatePosition.js.map

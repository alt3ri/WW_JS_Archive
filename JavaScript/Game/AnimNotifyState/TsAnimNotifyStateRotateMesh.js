"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Transform_1 = require("../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateRotateMesh extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.旋转速度 = 100),
      (this.是否自动朝向目标 = !1),
      (this.是否平滑旋转 = !1),
      (this.是否接受输入控制 = !1),
      (this.BaseChar = void 0),
      (this.TmpVector = void 0),
      (this.ActorTransform = void 0);
  }
  K2_NotifyBegin(t, i, s) {
    this.Init();
    t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && ((this.BaseChar = t), !0);
  }
  K2_NotifyTick(t, i, s) {
    if (this.BaseChar?.IsValid()) {
      var e = this.BaseChar.CharacterActorComponent?.Entity;
      if (!e?.Valid) return !1;
      var r = e.GetComponent(34),
        e = e.GetComponent(38);
      if (!r?.Valid || !e?.Valid) return !1;
      let t = 0;
      r = r.GetSkillTargetForAns()?.Entity?.GetComponent(1)?.Owner;
      if (
        (this.ActorTransform.FromUeTransform(this.BaseChar.GetTransform()),
        this.是否自动朝向目标 && r?.IsValid())
      )
        this.TmpVector.FromUeVector(r.K2_GetActorLocation());
      else {
        if (!e.HasMoveInput || !this.是否接受输入控制) return !0;
        this.TmpVector.FromUeVector(
          this.BaseChar.CharacterActorComponent.InputDirect,
        );
      }
      MathUtils_1.MathUtils.InverseTransformPosition(
        this.ActorTransform.GetLocation(),
        this.ActorTransform.GetRotation().Rotator(),
        this.ActorTransform.GetScale3D(),
        this.TmpVector,
        this.TmpVector,
      ),
        (t =
          UE.KismetMathLibrary.MakeRotFromX(this.TmpVector.ToUeVector()).Yaw -
          90);
      for (var h = this.BaseChar.Mesh.RelativeRotation.Yaw; 180 < t - h; )
        t -= 360;
      for (; 180 < h - t; ) t += 360;
      r = t - h;
      return (
        0 != r &&
          (0 < this.旋转速度 &&
            ((e = MathUtils_1.MathUtils.Clamp(
              (this.旋转速度 * s) / Math.abs(r),
              0,
              1,
            )),
            (t = e * r + h)),
          this.BaseChar.Mesh.K2_SetRelativeRotation(
            new UE.Rotator(0, t, 0),
            !1,
            void 0,
            !1,
          )),
        !0
      );
    }
    return !1;
  }
  K2_NotifyEnd(t, i) {
    t = t.GetOwner();
    return (
      !!(t?.IsValid() && t instanceof TsBaseCharacter_1.default) &&
      (t.CharacterActorComponent.SetActorRotationWithPriority(
        UE.KismetMathLibrary.ComposeRotators(
          t.Mesh.K2_GetComponentRotation(),
          new UE.Rotator(0, 90, 0),
        ),
        "TsAnimNotifyStateRotateMesh",
        0,
        !0,
        !1,
      ),
      t.Mesh.K2_SetRelativeRotation(new UE.Rotator(0, -90, 0), !1, void 0, !1),
      !0)
    );
  }
  Init() {
    (this.BaseChar = void 0),
      (this.TmpVector = Vector_1.Vector.Create()),
      (this.ActorTransform = Transform_1.Transform.Create());
  }
  GetNotifyName() {
    return "旋转网格体";
  }
}
exports.default = TsAnimNotifyStateRotateMesh;
//# sourceMappingURL=TsAnimNotifyStateRotateMesh.js.map

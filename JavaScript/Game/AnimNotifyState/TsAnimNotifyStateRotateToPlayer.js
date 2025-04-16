"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Quat_1 = require("../../Core/Utils/Math/Quat"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  Global_1 = require("../Global"),
  GravityUtils_1 = require("../Utils/GravityUtils");
class AnsRotateParam {
  constructor(t) {
    (this.NowTime = 0),
      (this.TotalDurationReciprocal = 0),
      (this.NowTime = 0),
      (this.TotalDurationReciprocal = 1 / t);
  }
  Update(t, i) {
    (this.NowTime = t), (this.TotalDurationReciprocal = 1 / i);
  }
}
class TsAnimNotifyStateRotateToPlayer extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.旋转速度 = 100),
      (this.Curve = void 0),
      (this.屏蔽标签列表 = void 0),
      (this.ParamsMap = void 0),
      (this.IsInitialize = !1),
      (this.TmpVector = void 0),
      (this.TmpQuat = void 0);
  }
  Constructor() {
    (this.ParamsMap = void 0),
      (this.IsInitialize = !1),
      (this.TmpVector = void 0),
      (this.TmpQuat = void 0);
  }
  K2_NotifyBegin(t, i, s) {
    this.Initialize();
    var t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !t.AbilitySystemComponent?.HasAnyGameplayTag(this.屏蔽标签列表) &&
      !!(t = t.CharacterActorComponent?.Entity)?.Valid &&
      (this.ParamsMap.has(t.Id)
        ? this.ParamsMap.get(t.Id).Update(0, s)
        : this.ParamsMap.set(t.Id, new AnsRotateParam(s)),
      !0)
    );
  }
  K2_NotifyTick(t, i, s) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !!t.CharacterActorComponent?.Entity?.Valid &&
      this.UpdateRotationRole(t.CharacterActorComponent, s)
    );
  }
  UpdateRotationRole(t, i) {
    var s = this.ParamsMap.get(t.Entity.Id);
    if (!s) return !1;
    var a = s.NowTime;
    (s.NowTime += i), this.旋转速度;
    let e = a * s.TotalDurationReciprocal,
      r = s.NowTime * s.TotalDurationReciprocal;
    this.Curve &&
      ((e = this.Curve.GetFloatValue(MathUtils_1.MathUtils.Clamp(e, 0, 1))),
      (r = this.Curve.GetFloatValue(MathUtils_1.MathUtils.Clamp(r, 0, 1))));
    (a =
      (this.GetRotationRoleAngle(t) *
        MathUtils_1.MathUtils.Clamp((r - e) / (1 - e), 0, 1)) /
      i),
      (s =
        Math.sign(a) *
        MathUtils_1.MathUtils.Clamp(Math.abs(a), 0, this.旋转速度) *
        i);
    return (
      MathUtils_1.MathUtils.CommonTempQuat.DeepCopy(t.ActorQuatProxy),
      MathUtils_1.MathUtils.CommonTempRotator.Set(0, s, 0),
      MathUtils_1.MathUtils.CommonTempQuat.Multiply(
        MathUtils_1.MathUtils.CommonTempRotator.Quaternion(),
        this.TmpQuat,
      ),
      this.TmpQuat.Rotator(MathUtils_1.MathUtils.CommonTempRotator),
      t.SetActorRotation(
        MathUtils_1.MathUtils.CommonTempRotator.ToUeRotator(),
        "TsAnimNotifyStateRotate",
        !1,
      ),
      t.SetInputRotator(MathUtils_1.MathUtils.CommonTempRotator),
      !0
    );
  }
  GetRotationRoleAngle(t) {
    var i, s, a;
    return Global_1.Global.BaseCharacter?.IsValid()
      ? ((i = t.ActorForwardProxy),
        (s = this.TmpVector),
        (a = Global_1.Global.BaseCharacter.CharacterActorComponent),
        s.DeepCopy(a.ActorLocationProxy),
        s.SubtractionEqual(t.ActorLocationProxy),
        s.Normalize(),
        GravityUtils_1.GravityUtils.GetAngleOffsetInGravityForActor(t, i, s))
      : 0;
  }
  K2_NotifyEnd(t, i) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
        this.ParamsMap?.delete(t.CharacterActorComponent?.Entity.Id ?? 0),
      !1
    );
  }
  Initialize() {
    this.IsInitialize ||
      ((this.IsInitialize = !0),
      (this.ParamsMap = new Map()),
      (this.TmpVector = Vector_1.Vector.Create()),
      (this.TmpQuat = Quat_1.Quat.Create()));
  }
  GetNotifyName() {
    return "旋转朝向玩家";
  }
}
exports.default = TsAnimNotifyStateRotateToPlayer;
//# sourceMappingURL=TsAnimNotifyStateRotateToPlayer.js.map

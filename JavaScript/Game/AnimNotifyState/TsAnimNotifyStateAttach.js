"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../Core/Utils/StringUtils"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines"),
  AnimationUtils_1 = require("../Utils/AnimationUtils"),
  MAX_ANIM_TIME = 9999,
  ATTACH_SOCKET_NAME = CharacterNameDefines_1.CharacterNameDefines.ROOT;
class AttachParams {
  constructor() {
    (this.AttachStartLocation = Vector_1.Vector.Create()),
      (this.AttachEndLocation = Vector_1.Vector.Create()),
      (this.AttachRotator = Rotator_1.Rotator.Create()),
      (this.AnimEndLocation = Vector_1.Vector.Create()),
      (this.AnimDeltaLocation = Vector_1.Vector.Create()),
      (this.AnimScale = Vector_1.Vector.Create()),
      (this.PreFrameAnimLocation = Vector_1.Vector.Create()),
      (this.TotalAnimDuration = 0),
      (this.ElpasedDuration = 0);
  }
  Initialize(t, i, a) {
    (this.ElpasedDuration = 0),
      (this.TotalAnimDuration = a),
      AnimationUtils_1.AnimationUtils.GetRootLocationCurveValue(
        t.Entity,
        this.PreFrameAnimLocation,
      ),
      AnimationUtils_1.AnimationUtils.GetRootLocationCurveValueWithDelta(
        t.Entity,
        a,
        this.AnimEndLocation,
      ),
      this.UpdateAttachLocation(t, i);
  }
  UpdateAttachLocation(t, i) {
    i.Equals(this.AttachEndLocation, MathUtils_1.MathUtils.KindaSmallNumber) ||
      (this.AttachStartLocation.DeepCopy(t.FloorLocation),
      this.AttachEndLocation.DeepCopy(i),
      this.AnimEndLocation.Subtraction(
        this.PreFrameAnimLocation,
        this.AnimDeltaLocation,
      ),
      this.i4a());
  }
  i4a() {
    var t = AttachParams.dHo,
      i = AttachParams.Tz;
    this.AttachEndLocation.Subtraction(this.AttachStartLocation, t),
      this.AttachRotator.Set(0, t.HeadingAngle(), 0),
      MathUtils_1.MathUtils.InverseTransformPositionNoScale(
        Vector_1.Vector.ZeroVectorProxy,
        this.AttachRotator,
        this.AnimDeltaLocation,
        i,
      ),
      this.AnimScale.Set(
        MathUtils_1.MathUtils.IsNearlyZero(
          i.X,
          MathUtils_1.MathUtils.KindaSmallNumber,
        )
          ? 1
          : t.X / i.X,
        MathUtils_1.MathUtils.IsNearlyZero(
          i.Y,
          MathUtils_1.MathUtils.KindaSmallNumber,
        )
          ? 1
          : t.Y / i.Y,
        MathUtils_1.MathUtils.IsNearlyZero(
          i.Z,
          MathUtils_1.MathUtils.KindaSmallNumber,
        )
          ? 1
          : t.Z / i.Z,
      );
  }
  StepFrameLocationOffset(t, i) {
    this.ElpasedDuration += i;
    var i = AttachParams.dHo,
      a = AttachParams.Tz,
      e = AttachParams.fHo;
    return (
      this.ElpasedDuration > this.TotalAnimDuration
        ? i.DeepCopy(this.AnimEndLocation)
        : AnimationUtils_1.AnimationUtils.GetRootLocationCurveValue(
            t.Entity,
            i,
          ),
      i.Subtraction(this.PreFrameAnimLocation, a),
      this.PreFrameAnimLocation.DeepCopy(i),
      MathUtils_1.MathUtils.InverseTransformPosition(
        Vector_1.Vector.ZeroVectorProxy,
        this.AttachRotator,
        this.AnimScale,
        a,
        e,
      ),
      e
    );
  }
}
(AttachParams.dHo = Vector_1.Vector.Create()),
  (AttachParams.Tz = Vector_1.Vector.Create()),
  (AttachParams.fHo = Vector_1.Vector.Create());
class TsAnimNotifyStateAttach extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.GameplayTag = void 0),
      (this.AttachSocketName = void 0),
      (this.AttachSocketOffset = void 0);
  }
  Constructor() {}
  K2_NotifyBegin(t, i, a) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    var e = t.CharacterActorComponent;
    if (!e?.Valid || !e?.IsAutonomousProxy) return !1;
    var s = e.Entity.GetComponent(39);
    if (!s?.Valid || !s.SkillTarget?.Entity) return !1;
    var s = s.SkillTarget.Entity,
      r = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(s);
    if (!r?.Valid) return !1;
    var h = s.GetComponent(3);
    if (!h?.Valid) return !1;
    if (!s.GetComponent(178)?.Valid) return !1;
    var o = t.GetEntityNoBlueprint()?.GetComponent(178);
    if (!o?.Valid) return !1;
    s = s.GetComponent(68);
    if (!s?.Valid) return !1;
    this.AttachSocketName = this.GetAttachSocketName();
    var c,
      s = s.GetPartByCombineBoneName(this.AttachSocketName.toString());
    return s
      ? ((c = new AttachParams()).Initialize(
          e,
          this.GetAttachTargetLocation(h),
          a,
        ),
        TsAnimNotifyStateAttach.Initialize(),
        TsAnimNotifyStateAttach.CacheMap.set(t, c),
        o.StartAttachToTarget(
          r,
          this.AttachSocketName,
          this.AttachSocketOffset,
          s.Index,
          this.GameplayTag,
        ),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Character", 57, "部位表中不存在合体部位配置", [
            "this.AttachSocketName",
            this.AttachSocketName,
          ]),
        !1);
  }
  K2_NotifyTick(t, i, a) {
    var e,
      s,
      t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !(
        !(e = t.CharacterActorComponent)?.Valid ||
        !e.IsAutonomousProxy ||
        !e.Entity.GetComponent(175)?.Valid ||
        !(s = e.Entity.GetComponent(39))?.Valid ||
        !s.SkillTarget?.Entity ||
        !(s = s.SkillTarget.Entity).GetComponent(178)?.Valid ||
        !(s = s.GetComponent(3))?.Valid ||
        !(t = TsAnimNotifyStateAttach.CacheMap.get(t)) ||
        (t.UpdateAttachLocation(e, this.GetAttachTargetLocation(s)),
        e.AddActorWorldOffset(
          t.StepFrameLocationOffset(e, a).ToUeVector(),
          "TsAnimNotifyStateAttach",
          !1,
        ),
        0)
      )
    );
  }
  K2_NotifyEnd(t, i) {
    var a,
      e,
      s,
      r,
      h,
      t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !(
        !(a = t.CharacterActorComponent)?.Valid ||
        !a.IsAutonomousProxy ||
        !(e = a.Entity.GetComponent(39))?.Valid ||
        !e.SkillTarget?.Entity ||
        !(e = e.SkillTarget.Entity).GetComponent(178)?.Valid ||
        !(s = e.GetComponent(3))?.Valid ||
        !(r = t.GetEntityNoBlueprint()?.GetComponent(178))?.Valid ||
        !(h = TsAnimNotifyStateAttach.CacheMap.get(t)) ||
        ((i = a.Entity.GetComponent(207).CreateAnimNotifyContent(
          i.GetName(),
          this.exportIndex,
        )),
        h.UpdateAttachLocation(a, this.GetAttachTargetLocation(s)),
        a.AddActorWorldOffset(
          h.StepFrameLocationOffset(a, MAX_ANIM_TIME).ToUeVector(),
          "TsAnimNotifyStateAttach",
          !1,
        ),
        r.AttachToTarget(
          ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(e),
          i,
          !0,
        ),
        TsAnimNotifyStateAttach.CacheMap?.delete(t),
        0)
      )
    );
  }
  GetAttachSocketName() {
    return !this.AttachSocketName ||
      StringUtils_1.StringUtils.IsNothing(this.AttachSocketName.toString())
      ? ATTACH_SOCKET_NAME
      : this.AttachSocketName;
  }
  GetAttachTargetLocation(t) {
    return (
      TsAnimNotifyStateAttach.TmpVector1.FromUeVector(this.AttachSocketOffset),
      TsAnimNotifyStateAttach.TmpVector2.DeepCopy(
        t.GetSocketLocation(this.AttachSocketName),
      ),
      TsAnimNotifyStateAttach.TmpVector2.AdditionEqual(
        TsAnimNotifyStateAttach.TmpVector1,
      ),
      TsAnimNotifyStateAttach.TmpVector2
    );
  }
  GetNotifyName() {
    return "绑定到目标身上";
  }
  static Initialize() {
    TsAnimNotifyStateAttach.IsInit ||
      ((TsAnimNotifyStateAttach.CacheMap = new Map()),
      (TsAnimNotifyStateAttach.IsInit = !0));
  }
}
(TsAnimNotifyStateAttach.IsInit = !1),
  (TsAnimNotifyStateAttach.CacheMap = void 0),
  (TsAnimNotifyStateAttach.TmpVector1 = Vector_1.Vector.Create()),
  (TsAnimNotifyStateAttach.TmpVector2 = Vector_1.Vector.Create()),
  (exports.default = TsAnimNotifyStateAttach);
//# sourceMappingURL=TsAnimNotifyStateAttach.js.map

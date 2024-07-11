"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStatePositionTarget extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.最大速度 = 500),
      (this.速度变化曲线 = void 0),
      (this.最小距离 = -0),
      (this.达成条件后终止逻辑 = !1),
      (this.经过时间 = -0),
      (this.速度 = void 0),
      (this.TmpVector = void 0),
      (this.终止逻辑 = !1);
  }
  K2_NotifyBegin(t, i, s) {
    this.Init();
    var r,
      t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !(
        !(r = t.CharacterActorComponent.Entity)?.Valid ||
        !(r = r.GetComponent(33))?.Valid ||
        !(r = r?.SkillTarget?.Entity?.GetComponent(1)?.Owner)?.IsValid() ||
        ((t = Vector_1.Vector.Create(t.K2_GetActorLocation())),
        Vector_1.Vector.Create(r.K2_GetActorLocation()).Subtraction(
          t,
          this.速度,
        ),
        this.速度.DivisionEqual(s),
        0)
      )
    );
  }
  K2_NotifyTick(t, i, s) {
    if (this.终止逻辑) return !1;
    this.经过时间 += s;
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    var r = t.CharacterActorComponent.Entity;
    if (!r?.Valid) return !1;
    var e = r.GetComponent(33);
    if (!e?.Valid) return !1;
    e = e?.SkillTarget?.Entity?.GetComponent(1)?.Owner;
    if (!e?.IsValid()) return !1;
    if (0 < this.最小距离) {
      (t = Vector_1.Vector.Create(t.K2_GetActorLocation())),
        (e = Vector_1.Vector.Create(e.K2_GetActorLocation()));
      if (
        Vector_1.Vector.DistSquared(t, e) <= this.最小距离 * this.最小距离 &&
        this.达成条件后终止逻辑
      )
        return (this.终止逻辑 = !0);
    }
    t = this.速度变化曲线?.IsValid()
      ? this.速度变化曲线.GetFloatValue(this.经过时间)
      : 1;
    return (
      this.速度.Multiply(t, this.TmpVector),
      this.TmpVector.GetClampedToMaxSize(this.最大速度, this.TmpVector),
      this.TmpVector.MultiplyEqual(s),
      r.GetComponent(37)?.SetAddMoveOffset(this.TmpVector.ToUeVector()),
      !0
    );
  }
  K2_NotifyEnd(t, i) {
    return !(this.经过时间 = 0);
  }
  Init() {
    (this.经过时间 = 0),
      (this.速度 = Vector_1.Vector.Create()),
      (this.TmpVector = Vector_1.Vector.Create()),
      (this.终止逻辑 = !1);
  }
  GetNotifyName() {
    return "位移到目标身前";
  }
}
exports.default = TsAnimNotifyStatePositionTarget;
//# sourceMappingURL=TsAnimNotifyStatePositionTarget.js.map

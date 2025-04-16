"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  CombatLog_1 = require("../Utils/CombatLog");
class AddMoveParams {
  constructor() {
    (this.NowTime = 0),
      (this.CurrentSpeed = 0),
      (this.InputDirectCache = Vector_1.Vector.Create());
  }
}
const paramMap = new Map();
class TsAnimNotifyStateAddMoveByInputDirect extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.MaxSpeed = 10),
      (this.AccelerationTime = 0),
      (this.DecelerationTime = 0),
      (this.Acceleration = 0),
      (this.Deceleration = 0),
      (this.TotalTime = 0),
      (this.TmpVector = void 0);
  }
  Constructor() {
    (this.Acceleration = 0),
      (this.Deceleration = 0),
      (this.TotalTime = 0),
      (this.TmpVector = void 0);
  }
  K2_NotifyBegin(t, s, i) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    this.TmpVector || (this.TmpVector = Vector_1.Vector.Create());
    var e = new AddMoveParams();
    return (
      paramMap.set(t.CharacterActorComponent.Entity.Id, e),
      (this.TotalTime = i),
      this.AccelerationTime + this.DecelerationTime > i
        ? (CombatLog_1.CombatLog.Error(
            "Skill",
            t.CharacterActorComponent.Entity,
            "加速时间+减速时间大于帧事件总时长",
            ["加速时间", this.AccelerationTime],
            ["减速时间", this.DecelerationTime],
            ["总时长", this.TotalTime],
            ["动画", s.GetName()],
          ),
          !1)
        : (0 < this.AccelerationTime &&
            (this.Acceleration = this.MaxSpeed / this.AccelerationTime),
          0 < this.DecelerationTime &&
            (this.Deceleration = this.MaxSpeed / this.DecelerationTime),
          !0)
    );
  }
  K2_NotifyTick(t, s, i) {
    var e,
      r,
      t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      ((e = t.CharacterActorComponent.Entity),
      (r = paramMap.get(e.Id)),
      (t = this.GetOffset(t.CharacterActorComponent.InputDirectProxy, i, r)),
      e
        .GetComponent(44)
        ?.MoveCharacter(t, i, "TsAnimNotifyStateAddMoveByInputDirect"),
      (r.NowTime += i),
      !0)
    );
  }
  K2_NotifyEnd(t, s) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      (paramMap.delete(t.CharacterActorComponent.Entity.Id), !0)
    );
  }
  GetNotifyName() {
    return "输入向量叠加位移";
  }
  GetOffset(t, s, i) {
    return (
      t.IsNearlyZero() || i.NowTime > this.TotalTime - this.DecelerationTime
        ? this.Deceleration
          ? ((i.CurrentSpeed -= this.Deceleration * s),
            (i.CurrentSpeed = Math.max(i.CurrentSpeed, 0)))
          : (i.CurrentSpeed = 0)
        : (this.Acceleration
            ? ((i.CurrentSpeed += this.Acceleration * s),
              (i.CurrentSpeed = Math.min(i.CurrentSpeed, this.MaxSpeed)))
            : (i.CurrentSpeed = this.MaxSpeed),
          i.InputDirectCache.DeepCopy(t)),
      this.TmpVector.DeepCopy(i.InputDirectCache),
      this.TmpVector.Normalize(),
      this.TmpVector.MultiplyEqual(i.CurrentSpeed * s),
      this.TmpVector
    );
  }
}
exports.default = TsAnimNotifyStateAddMoveByInputDirect;
//# sourceMappingURL=TsAnimNotifyStateAddMoveByInputDirect.js.map

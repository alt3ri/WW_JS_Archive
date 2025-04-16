"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class KeepAwayFromGroundParam {
  constructor() {
    (this.NowTime = -0), (this.TotalTime = -0);
  }
}
const paramsMap = new Map();
class TsAnimNotifyStateKeepAwayFromGround extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.距离水平面最小高度 = 0),
      (this.距离水平面最大高度 = 2e3),
      (this.MoveCurve = void 0),
      (this.MaxSpeed = 2e3),
      (this.TsMinHeight = -0),
      (this.TsMaxHeight = -0),
      (this.TsMaxSpeed = -0),
      (this.TsTmpVector = void 0);
  }
  Constructor() {
    (this.TsMinHeight = -0),
      (this.TsMaxHeight = -0),
      (this.TsMaxSpeed = -0),
      (this.TsTmpVector = void 0);
  }
  K2_NotifyBegin(t, s, e) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    if (
      ((this.TsMinHeight = this.距离水平面最小高度),
      (this.TsMaxHeight = this.距离水平面最大高度),
      (this.TsMaxSpeed = this.MaxSpeed),
      (this.TsTmpVector = Vector_1.Vector.Create()),
      this.TsMaxHeight < this.TsMinHeight)
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Test", 28, "Z轴帧事件参数错误"),
        !1
      );
    if (this.TsMaxSpeed <= 0) return !1;
    let r = paramsMap.get(t.CharacterActorComponent.Entity.Id);
    return (
      r ||
        ((r = new KeepAwayFromGroundParam()),
        paramsMap.set(t.CharacterActorComponent.Entity.Id, r)),
      (r.NowTime = 0),
      (r.TotalTime = e),
      !0
    );
  }
  K2_NotifyTick(t, s, e) {
    var r;
    return (
      !(e < MathUtils_1.MathUtils.KindaSmallNumber) &&
      (t = t.GetOwner()) instanceof TsBaseCharacter_1.default &&
      ((t = t.CharacterActorComponent), !!(r = paramsMap.get(t.Entity.Id))) &&
      (this.MoveToTarget(e, r, t), (r.NowTime += e), !0)
    );
  }
  K2_NotifyEnd(t, s) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      (paramsMap.delete(t.CharacterActorComponent.Entity.Id), !0)
    );
  }
  GetRate(t, s) {
    let e = 1;
    t = s.NowTime + t;
    if (s.TotalTime <= t) e = 1;
    else if (this.MoveCurve) {
      var r = this.MoveCurve.GetFloatValue(s.NowTime / s.TotalTime),
        i = this.MoveCurve.GetFloatValue(t / s.TotalTime);
      if (1 <= r) return 0;
      e = (i - r) / (1 - r);
    } else {
      (i = MathUtils_1.MathUtils.GetCubicValue(s.NowTime / s.TotalTime)),
        (r = MathUtils_1.MathUtils.GetCubicValue(t / s.TotalTime));
      if (1 <= i) return 0;
      e = (r - i) / (1 - i);
    }
    return e;
  }
  MoveToTarget(t, s, e) {
    var r = e.Entity.GetComponent(176).GetHeightAboveGround(this.TsMaxHeight);
    if (r < this.TsMinHeight) {
      this.TsTmpVector.Set(0, 0, this.TsMinHeight - r);
      s = this.GetRate(t, s);
      if (s <= 0) return;
      this.TsTmpVector.Z = Math.min(
        this.TsTmpVector.Z * s,
        this.TsMaxSpeed * t,
      );
    } else {
      if (
        !(
          r >= this.TsMaxHeight &&
          e.ActorLocationProxy.Z > e.LastActorLocation.Z
        )
      )
        return;
      this.TsTmpVector.Set(
        0,
        0,
        e.LastActorLocation.Z - e.ActorLocationProxy.Z,
      );
    }
    e.AddActorWorldOffset(
      this.TsTmpVector.ToUeVector(),
      "TsAnimNotifyStateKeepAwayFromGround.AddActorWorldOffset",
      !0,
    );
  }
  GetNotifyName() {
    return "角色和地面保持一定距离";
  }
}
exports.default = TsAnimNotifyStateKeepAwayFromGround;
//# sourceMappingURL=TsAnimNotifyStateKeepAwayFromGround.js.map

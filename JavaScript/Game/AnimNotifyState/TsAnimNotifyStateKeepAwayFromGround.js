"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
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
  K2_NotifyBegin(t, e, r) {
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
          Log_1.Log.Error("Test", 29, "Z轴帧事件参数错误"),
        !1
      );
    if (this.TsMaxSpeed <= 0) return !1;
    let s = paramsMap.get(t.CharacterActorComponent.Entity.Id);
    return (
      s ||
        ((s = new KeepAwayFromGroundParam()),
        paramsMap.set(t.CharacterActorComponent.Entity.Id, s)),
      (s.NowTime = 0),
      (s.TotalTime = r),
      !0
    );
  }
  K2_NotifyTick(t, e, r) {
    let s;
    return (
      !(r < MathUtils_1.MathUtils.KindaSmallNumber) &&
      (t = t.GetOwner()) instanceof TsBaseCharacter_1.default &&
      ((t = t.CharacterActorComponent), !!(s = paramsMap.get(t.Entity.Id))) &&
      (this.MoveToTarget(r, s, t), (s.NowTime += r), !0)
    );
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      (paramsMap.delete(t.CharacterActorComponent.Entity.Id), !0)
    );
  }
  GetRate(t, e) {
    let r = 1;
    t = e.NowTime + t;
    if (e.TotalTime <= t) r = 1;
    else if (this.MoveCurve) {
      var s = this.MoveCurve.GetFloatValue(e.NowTime / e.TotalTime);
      var i = this.MoveCurve.GetFloatValue(t / e.TotalTime);
      if (s >= 1) return 0;
      r = (i - s) / (1 - s);
    } else {
      (i = MathUtils_1.MathUtils.GetCubicValue(e.NowTime / e.TotalTime)),
        (s = MathUtils_1.MathUtils.GetCubicValue(t / e.TotalTime));
      if (i >= 1) return 0;
      r = (s - i) / (1 - i);
    }
    return r;
  }
  MoveToTarget(t, e, r) {
    const s = r.Entity.GetComponent(161).GetHeightAboveGround(this.TsMaxHeight);
    if (s < this.TsMinHeight) {
      this.TsTmpVector.Set(0, 0, this.TsMinHeight - s);
      e = this.GetRate(t, e);
      if (e <= 0) return;
      this.TsTmpVector.Z = Math.min(
        this.TsTmpVector.Z * e,
        this.TsMaxSpeed * t,
      );
    } else {
      if (
        !(
          s >= this.TsMaxHeight &&
          r.ActorLocationProxy.Z > r.LastActorLocation.Z
        )
      )
        return;
      this.TsTmpVector.Set(
        0,
        0,
        r.LastActorLocation.Z - r.ActorLocationProxy.Z,
      );
    }
    r.AddActorWorldOffset(
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
// # sourceMappingURL=TsAnimNotifyStateKeepAwayFromGround.js.map

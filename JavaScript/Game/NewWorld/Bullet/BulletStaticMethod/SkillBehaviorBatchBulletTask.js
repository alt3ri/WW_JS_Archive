"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillBehaviorBatchBulletTask = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  BulletUtil_1 = require("../BulletUtil");
class BatchBulletPositionCircle {
  constructor() {
    (this.AngleInterval = 0),
      (this.Center = void 0),
      (this.Clockwise = !0),
      (this.Forward = Vector_1.Vector.Create()),
      (this.Radius = 0),
      (this.BeginAngle = 0),
      (this.BeginRotator = 1);
  }
  static Create(t, i) {
    var s = new BatchBulletPositionCircle();
    return s.FromUeConfig(t, i), s;
  }
  FromUeConfig(t, i) {
    (this.AngleInterval = t.GetBlackboard(i.AngleIntervalKey, 0)),
      (this.Center = t.GetBlackboard(i.CenterKey)),
      (this.Clockwise = i.Clockwise),
      t.GetBlackboard(i.ForwardKey).Vector(this.Forward),
      (this.Radius = t.GetBlackboard(i.RadiusKey)),
      (this.BeginAngle = i.BeginAngle),
      (this.BeginRotator = i.BeginRotator);
  }
  ToTransform(t) {
    var i = Transform_1.Transform.Create(),
      s = (i.SetLocation(this.Center), Vector_1.Vector.Create()),
      t = this.BeginAngle + t * this.AngleInterval * (this.Clockwise ? 1 : -1);
    return (
      this.Forward.RotateAngleAxis(t, Vector_1.Vector.UpVectorProxy, s),
      s.MultiplyEqual(this.Radius),
      i.GetLocation().AdditionEqual(s),
      1 === this.BeginRotator &&
        (this.Forward.RotateAngleAxis(t + 90, Vector_1.Vector.UpVectorProxy, s),
        (t = Rotator_1.Rotator.Create()),
        s.Rotation(t),
        t.Quaternion(i.GetRotation())),
      i
    );
  }
}
class BatchBulletPositionDotMatrix {
  constructor() {
    (this.Center = void 0),
      (this.PositionOffset = void 0),
      (this.PositionOffsetScale = 0),
      (this.Rotator = void 0),
      (this.RotatorOffset = void 0),
      (this.BeginRotator = 1);
  }
  static Create(t, i) {
    var s = new BatchBulletPositionDotMatrix();
    return s.FromUeConfig(t, i), s;
  }
  FromUeConfig(t, i) {
    (this.Center = t.GetBlackboard(i.CenterKey)),
      (this.PositionOffset = new Array());
    var s = i.PositionOffset,
      r = s.Num();
    for (let t = 0; t < r; t++)
      this.PositionOffset.push(Vector_1.Vector.Create(s.Get(t)));
    (this.PositionOffsetScale = i.PositionOffsetScale),
      (this.Rotator = t.GetBlackboard(i.RotatorKey)),
      (this.RotatorOffset = Rotator_1.Rotator.Create(i.RotatorOffset)),
      (this.BeginRotator = i.BeginRotator);
  }
  ToTransform(t) {
    var i, s;
    if (!(this.PositionOffset.length <= t))
      return (
        (i = Transform_1.Transform.Create()).SetLocation(this.Center),
        i.SetRotation(this.Rotator.Quaternion()),
        (t = this.PositionOffset[t]),
        (s = Vector_1.Vector.Create()),
        t.Multiply(this.PositionOffsetScale, s),
        i.TransformPosition(s, s),
        i.SetLocation(s),
        1 === this.BeginRotator &&
          (s.SubtractionEqual(this.Center),
          s.Normalize(),
          (t = Rotator_1.Rotator.Create()),
          s.Rotation(t),
          MathUtils_1.MathUtils.ComposeRotator(
            t,
            this.RotatorOffset,
            i.GetRotation(),
          )),
        i
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Bullet",
        20,
        "批量生成子弹失败，生成子弹数量超出 位置偏移 数量",
      );
  }
}
class SkillBehaviorBatchBulletTask {
  constructor() {
    (this.xe = void 0),
      (this.ZZt = 0),
      (this.Vso = 0),
      (this.bjo = void 0),
      (this.EQ_ = !1),
      (this.IQ_ = 0),
      (this.Xte = void 0),
      (this.tRr = void 0),
      (this.OQt = void 0),
      (this.wmo = 0),
      (this.OSc = !1),
      (this.B7o = 0),
      (this.TQ_ = void 0),
      (this.TDe = void 0),
      (this.IO = (t = 0) => {
        if (this.bQ_()) {
          var i = this.oZo(this.B7o);
          if (
            (i
              ? (this.TQ_.push(i),
                this.EQ_ &&
                  (ControllerHolder_1.ControllerHolder.BulletController.SetBulletSpeedRatio(
                    i,
                    0,
                  ),
                  ControllerHolder_1.ControllerHolder.BulletController.SetBulletLiveRatio(
                    i,
                    0,
                  )))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error("Bullet", 20, "批量生成子弹失败"),
            this.B7o++,
            this.EQ_ && this.B7o >= this.Vso)
          )
            for (let t = 0; t < this.Vso; t++) {
              var s = this.TQ_[t];
              ControllerHolder_1.ControllerHolder.BulletController.SetBulletSpeedRatio(
                s,
                1,
              ),
                ControllerHolder_1.ControllerHolder.BulletController.SetBulletLiveRatio(
                  s,
                  1,
                );
            }
        } else if (
          (this.TDe?.Remove() ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Bullet", 20, "停止批量生成子弹失败")),
          this.EQ_)
        )
          for (let t = 0; t < this.Vso; t++)
            ControllerHolder_1.ControllerHolder.BulletController.SetBulletSpeedRatio(
              this.TQ_[t],
              1,
            );
      });
  }
  static Create(t, i, s) {
    var i = ResourceSystem_1.ResourceSystem.Load(
        i.ToAssetPathName(),
        UE.DAC_BatchCreateBullet_C,
      ),
      r = i.Base,
      e = new SkillBehaviorBatchBulletTask(),
      s =
        ((e.wmo = s),
        (e.OQt = t.GetComponent(3)?.Actor),
        StringUtils_1.NONE_STRING !== r.ContinueWithTag.TagName &&
          (e.Xte = t.GetComponent(203)),
        (e.tRr = t.GetComponent(38)),
        (e.OSc = r.StopOnSkillEnd),
        t.GetComponent(275)),
      o = ((e.IQ_ = r.ContinueWithTag.TagId), (e.xe = new Array()), r.Id.Num());
    for (let t = 0; t < o; t++) e.xe.push(r.Id.Get(t));
    return (
      (e.ZZt = r.Interval),
      (e.Vso = r.Number),
      0 === i.BeginPos
        ? ((t = i), (e.bjo = BatchBulletPositionDotMatrix.Create(s, t.Shape)))
        : 1 === i.BeginPos &&
          ((t = i),
          (e.bjo = BatchBulletPositionCircle.Create(s, t.Shape)),
          0 === (i = e.bjo).AngleInterval) &&
          (i.AngleInterval = MathCommon_1.MathCommon.RoundAngle / e.Vso),
      (e.EQ_ = 1 === r.StartMoving),
      e
    );
  }
  Start() {
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Bullet", 20, "开始批量生成子弹"),
      (this.TQ_ = new Array()),
      0 < this.ZZt)
    )
      this.IO(),
        (this.TDe = TimerSystem_1.TimerSystem.Loop(
          this.IO,
          this.ZZt * MathUtils_1.MathUtils.SecondToMillisecond,
          this.Vso - 1,
          1,
          void 0,
          "[批量生成子弹]",
        ));
    else
      for (
        let t = 0;
        t < this.Vso &&
        (!this.Xte || this.Xte.HasTag(this.IQ_)) &&
        (0 === this.wmo ||
          !this.OSc ||
          (this.tRr.CurrentSkill &&
            this.tRr.CurrentSkill.SkillId === this.wmo));
        t++
      ) {
        var i = this.oZo(t);
        i && this.TQ_.push(i);
      }
  }
  oZo(t) {
    var i,
      s = this.xe[t % this.xe.length],
      t = this.bjo.ToTransform(t);
    return t
      ? ((i =
          (i = this.tRr?.GetSkill(this.wmo))
            ?.SkillBehaviorAnimNotifyMessageId || i?.LFc),
        BulletUtil_1.BulletUtil.CreateBulletFromAN(
          this.OQt,
          s,
          t.ToUeTransform(),
          this.wmo.toString(),
          !1,
          i,
        ))
      : 0;
  }
  bQ_() {
    return !(
      (this.Xte && !this.Xte.HasTag(this.IQ_)) ||
      (this.OSc &&
        (!this.tRr.CurrentSkill || this.tRr.CurrentSkill.SkillId !== this.wmo))
    );
  }
}
exports.SkillBehaviorBatchBulletTask = SkillBehaviorBatchBulletTask;
//# sourceMappingURL=SkillBehaviorBatchBulletTask.js.map

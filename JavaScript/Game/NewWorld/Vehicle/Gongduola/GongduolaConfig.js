"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GongduolaConfig = void 0);
const VehicleConfig_1 = require("../Common/VehicleConfig");
class GongduolaConfig extends VehicleConfig_1.VehicleConfig {
  constructor(t, i) {
    super(t, i),
      (this.RotaryIntertia = 0),
      (this.SpeedImpactFactor = 0),
      (this.RotationImpactFactor = 0),
      (this.TurnForwardInputMinX = 0),
      (this.TurnBackwardInputMaxX = 0),
      (this.MaxFloatingSpeed = 0),
      (this.FloatingFrictionFactor = 0),
      (this.BuoyancyBalanceRatio = 0),
      (this.StrandedWaterDepthThreshold = 0),
      (this.BaseMaxSpeed = 0),
      (this.BaseMaxAcceleration = 0),
      (this.BaseMinAcceleration = 0),
      (this.BaseBrakeAcceleration = 0),
      (this.BaseMaxBackwardSpeed = 0),
      (this.BaseBackwardAcceleration = 0),
      (this.BaseMaxRotYawAcc = 0),
      (this.BaseMinRotYawAcc = 0),
      (this.BaseRotAngleCoef = 0),
      (this.BaseRotSpeedCoef = 0),
      (this.BaseRotConstCoef = 0),
      (this.BaseMinFriction = 0),
      (this.BaseMaxFriction = 0),
      (this.BaseMaxRotationSpeed = 0),
      (this.BaseRotFrictionFactor = 0),
      (this.BaseStaticRotFriction = 0),
      (this.BaseTurningForceForwardFactor = 0),
      (this.BaseMaxForwardThreshold = 0),
      (this.BaseMaxRightThreshold = 0),
      (this.SprintExceedLimitSpeed = 0),
      (this.SprintExceedLimitDuration = 0),
      (this.SprintMaxSpeed = 0),
      (this.SprintMaxAcceleration = 0),
      (this.SprintMinAcceleration = 0),
      (this.SprintBrakeAcceleration = 0),
      (this.SprintMaxBackwardSpeed = 0),
      (this.SprintBackwardAcceleration = 0),
      (this.SprintMaxRotYawAcc = 0),
      (this.SprintMinRotYawAcc = 0),
      (this.SprintDuration = 0),
      (this.SprintStopSpeed = 0),
      (this.SprintExtraFriction = 0),
      (this.SprintRotAngleCoef = 0),
      (this.SprintRotSpeedCoef = 0),
      (this.SprintRotConstCoef = 0),
      (this.SprintMinFriction = 0),
      (this.SprintMaxFriction = 0),
      (this.SprintMaxRotationSpeed = 0),
      (this.SprintRotFrictionFactor = 0),
      (this.SprintStaticRotFriction = 0),
      (this.SprintForceInputDuration = 0),
      (this.SprintTurningForceForwardFactor = 0),
      (this.SprintMaxForwardThreshold = 0),
      (this.SprintMaxRightThreshold = 0),
      (this.SprintCoolDown = 0),
      (this.SprintMaxUsableCount = 0),
      i?.IsValid() &&
        ((this.RotaryIntertia = i.转动惯量),
        (this.SpeedImpactFactor = i.速度冲击力系数),
        (this.RotationImpactFactor = i.旋转冲击力系数),
        (this.TurnForwardInputMinX = i.前向转弯最小X输入),
        (this.TurnBackwardInputMaxX = i.后向转向最大X输入),
        (this.MaxFloatingSpeed = i.最大上浮速度),
        (this.FloatingFrictionFactor = i.漂浮阻力系数),
        (this.BuoyancyBalanceRatio = i.浮力平衡位置),
        (this.StrandedWaterDepthThreshold = i.搁浅位置),
        (this.BaseMaxSpeed = i.前进最大移动速度),
        (this.BaseMaxAcceleration = i.常态前进加速度),
        (this.BaseMinAcceleration = i.常态最小加速度),
        (this.BaseMaxRotYawAcc = i.常态最大转向加速度),
        (this.BaseMinRotYawAcc = i.常态最小转向加速度),
        (this.BaseMaxBackwardSpeed = i.常态后退最大移动速度),
        (this.BaseBackwardAcceleration = i.常态后退加速度),
        (this.BaseBrakeAcceleration = i.常态刹车加速度),
        (this.BaseTurningForceForwardFactor = i.常态转向强制前向输入系数),
        (this.BaseMaxForwardThreshold = i.常态最大前后输入阈值),
        (this.BaseMaxRightThreshold = i.常态最大左右输入阈值),
        (this.BaseRotAngleCoef = i.常态转向公式角度修正系数),
        (this.BaseRotSpeedCoef = i.常态转向公式速度修正系数),
        (this.BaseRotConstCoef = i.常态转向公式最终修正系数),
        (this.BaseMinFriction = i.常态径向运动摩擦力),
        (this.BaseMaxFriction = i.常态横向运动摩擦力),
        (this.BaseMaxRotationSpeed = i.常态最大转向速度),
        (this.BaseRotFrictionFactor = i.常态转向摩擦力系数),
        (this.BaseStaticRotFriction = i.常态转向静止摩擦力),
        (this.SprintExceedLimitSpeed = i.冲刺超限移动速度),
        (this.SprintExceedLimitDuration = i.冲刺超限持续时间),
        (this.SprintMaxSpeed = i.冲刺最大移动速度),
        (this.SprintMaxAcceleration = i.冲刺前进加速度),
        (this.SprintMinAcceleration = i.冲刺最小加速度),
        (this.SprintMaxRotYawAcc = i.冲刺最大转向加速度),
        (this.SprintMinRotYawAcc = i.冲刺最小转向加速度),
        (this.SprintMaxBackwardSpeed = i.冲刺后退最大移动速度),
        (this.SprintBackwardAcceleration = i.冲刺后退加速度),
        (this.SprintBrakeAcceleration = i.冲刺刹车加速度),
        (this.SprintDuration = i.冲刺持续时间),
        (this.SprintExtraFriction = i.超出最大速度时的额外摩擦力),
        (this.SprintTurningForceForwardFactor = i.冲刺转向强制前向输入系数),
        (this.SprintMaxForwardThreshold = i.冲刺最大前后输入阈值),
        (this.SprintMaxRightThreshold = i.冲刺最大左右输入阈值),
        (this.SprintStopSpeed = i.冲刺停止速度),
        (this.SprintCoolDown = i.冲刺冷却时间),
        (this.SprintMaxUsableCount = i.冲刺最大使用次数),
        (this.SprintRotAngleCoef = i.冲刺转向公式角度修正系数),
        (this.SprintRotSpeedCoef = i.冲刺转向公式速度修正系数),
        (this.SprintRotConstCoef = i.冲刺转向公式最终修正系数),
        (this.SprintMinFriction = i.冲刺径向运动摩擦力),
        (this.SprintMaxFriction = i.冲刺横向运动摩擦力),
        (this.SprintMaxRotationSpeed = i.冲刺最大转向速度),
        (this.SprintRotFrictionFactor = i.冲刺转向摩擦力系数),
        (this.SprintStaticRotFriction = i.冲刺转向静止摩擦力),
        (this.SprintForceInputDuration = i.冲刺固定前向输入时间));
  }
  DeepCopy() {
    var t = new GongduolaConfig(this.VehicleEntity, void 0);
    return this.DeepCopyInternal(t), t;
  }
  Init() {
    var t;
    return (
      !!super.Init() &&
      !!(t = this.VehicleEntity?.GetComponent(231)) &&
      (this.InitGongduolaMovement(t.Actor.VehicleMovementComponent),
      this.InitGongduolaBaseInfo(),
      !0)
    );
  }
  InitGongduolaBaseInfo() {
    var t = this.VehicleEntity?.GetComponent(242);
    t &&
      ((t.SprintStopSpeedSquared = this.SprintStopSpeed * this.SprintStopSpeed),
      (t.SprintCd = this.SprintCoolDown),
      (t.SprintUsableCount = this.SprintMaxUsableCount));
  }
  InitGongduolaMovement(t) {
    (t.RotaryInertia = this.RotaryIntertia),
      (t.SpeedImpactFactor = this.SpeedImpactFactor),
      (t.RotationImpactFactor = this.RotationImpactFactor),
      (t.ExtraFrictionWhenExceedMaxSpeed = this.SprintExtraFriction),
      this.SetBaseStateMoveConfig(t),
      this.SetBuoyancyRelatedConfig(t);
    t = this.VehicleEntity?.GetComponent(243);
    t &&
      ((t.TurnForwardInputMinX = this.TurnForwardInputMinX),
      (t.TurnBackwardInputMaxX = this.TurnBackwardInputMaxX));
  }
  SetBaseStateMoveConfig(t) {
    var i = this.VehicleEntity?.GetComponent(243);
    i &&
      ((i.TurningForceInputFactor = this.BaseTurningForceForwardFactor),
      (i.MaxForwardThreshold = this.BaseMaxForwardThreshold),
      (i.MaxRightThreshold = this.BaseMaxRightThreshold)),
      (t.MaxSpeed = this.BaseMaxSpeed),
      (t.MaxAcceleration = this.BaseMaxAcceleration),
      (t.MinAcceleration = this.BaseMinAcceleration),
      (t.MaxBackwardSpeed = this.BaseMaxBackwardSpeed),
      (t.MaxBackwardAcceleration = this.BaseBackwardAcceleration),
      (t.MaxBrakeAcceleration = this.BaseBrakeAcceleration),
      (t.MaxRotationYawAcceleration = this.BaseMaxRotYawAcc),
      (t.MinRotationYawAcceleration = this.BaseMinRotYawAcc),
      (t.RotAngleCoef = this.BaseRotAngleCoef),
      (t.RotSpeedCoef = this.BaseRotSpeedCoef),
      (t.RotConstCoef = this.BaseRotConstCoef),
      (t.MinFriction = this.BaseMinFriction),
      (t.MaxFriction = this.BaseMaxFriction),
      (t.MaxRotationSpeed = this.BaseMaxRotationSpeed),
      (t.RotFrictionFactor = this.BaseRotFrictionFactor),
      (t.StaticRotFriction = this.BaseStaticRotFriction);
  }
  SetSprintStateMoveConfig(t) {
    var i = this.VehicleEntity?.GetComponent(243);
    i &&
      ((i.TurningForceInputFactor = this.SprintTurningForceForwardFactor),
      (i.MaxForwardThreshold = this.SprintMaxForwardThreshold),
      (i.MaxRightThreshold = this.SprintMaxRightThreshold)),
      (t.MaxSpeed = this.SprintMaxSpeed),
      (t.MaxAcceleration = this.SprintMaxAcceleration),
      (t.MinAcceleration = this.SprintMinAcceleration),
      (t.MaxBackwardSpeed = this.SprintMaxBackwardSpeed),
      (t.MaxBackwardAcceleration = this.SprintBackwardAcceleration),
      (t.MaxBrakeAcceleration = this.SprintBrakeAcceleration),
      (t.MaxRotationYawAcceleration = this.SprintMaxRotYawAcc),
      (t.MinRotationYawAcceleration = this.SprintMinRotYawAcc),
      (t.RotAngleCoef = this.SprintRotAngleCoef),
      (t.RotSpeedCoef = this.SprintRotSpeedCoef),
      (t.RotConstCoef = this.SprintRotConstCoef),
      (t.MinFriction = this.SprintMinFriction),
      (t.MaxFriction = this.SprintMaxFriction),
      (t.MaxRotationSpeed = this.SprintMaxRotationSpeed),
      (t.RotFrictionFactor = this.SprintRotFrictionFactor),
      (t.StaticRotFriction = this.SprintStaticRotFriction);
  }
  SetBuoyancyRelatedConfig(t) {
    (t.MaxFloatingSpeed = this.MaxFloatingSpeed),
      (t.FloatingFrictionFactor = this.FloatingFrictionFactor),
      (t.BuoyancyBalanceRatio = this.BuoyancyBalanceRatio),
      (t.StrandedWaterDepthThreshold = this.StrandedWaterDepthThreshold);
  }
}
exports.GongduolaConfig = GongduolaConfig;
//# sourceMappingURL=GongduolaConfig.js.map

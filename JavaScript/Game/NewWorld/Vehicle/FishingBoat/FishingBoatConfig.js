"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingBoatConfig = void 0);
const CharacterAttributeTypes_1 = require("../../Character/Common/Component/Abilities/CharacterAttributeTypes"),
  GongduolaConfig_1 = require("../Gongduola/GongduolaConfig");
class FishingBoatConfig extends GongduolaConfig_1.GongduolaConfig {
  constructor() {
    super(...arguments), (this.fu_ = 0);
  }
  DeepCopy() {
    var t = new FishingBoatConfig(this.VehicleEntity, void 0);
    return this.DeepCopyInternal(t), t;
  }
  SetBaseStateMoveConfig(t) {
    var i = this.VehicleEntity?.GetComponent(243);
    i &&
      ((i.TurningForceInputFactor = this.BaseTurningForceForwardFactor),
      (i.MaxForwardThreshold = this.BaseMaxForwardThreshold),
      (i.MaxRightThreshold = this.BaseMaxRightThreshold));
    let s = 1;
    i = this.VehicleEntity?.GetComponent(170);
    i &&
      ((s = i.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.vVn)),
      (s /= CharacterAttributeTypes_1.PER_TEN_THOUSAND)),
      (this.fu_ = this.BaseMaxSpeed * s),
      (t.MaxSpeed = this.fu_),
      (t.MaxAcceleration = this.BaseMaxAcceleration),
      (t.MinAcceleration = this.BaseMinAcceleration),
      (t.MaxBackwardSpeed = this.BaseMaxBackwardSpeed * s),
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
  RefreshSprintConfig(t, i, s) {
    t = this.fu_ * t;
    (this.SprintMaxSpeed =
      t <= this.SprintExceedLimitSpeed ? t : this.SprintExceedLimitSpeed),
      (this.SprintExceedLimitDuration = i <= s ? i : s),
      (this.SprintDuration = s),
      (this.SprintBrakeAcceleration = 3e3);
  }
}
exports.FishingBoatConfig = FishingBoatConfig;
//# sourceMappingURL=FishingBoatConfig.js.map

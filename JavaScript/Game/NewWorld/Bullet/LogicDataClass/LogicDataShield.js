"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataShield extends LogicDataBase_1.default {
  constructor() {
    super(...arguments),
      (this.DefenseCanDodgeBullet = !1),
      (this.DefenseBulletIdList = void 0),
      (this.NotDefenseBulletIdList = void 0),
      (this.SelfCampType = 0),
      (this.FriendCampType = 0),
      (this.EnemyCampType = 0),
      (this.DefenseAngle = 0),
      (this.AddBuffToSelf = void 0),
      (this.AddBuffToEnemy = void 0),
      (this.DecreaseBulletHitCount = 0),
      (this.SelfCalcTypeArray = void 0),
      (this.FriendCalcTypeArray = void 0),
      (this.EnemyCalcTypeArray = void 0);
  }
  Constructor() {
    super.Constructor();
  }
}
exports.default = LogicDataShield;
//# sourceMappingURL=LogicDataShield.js.map

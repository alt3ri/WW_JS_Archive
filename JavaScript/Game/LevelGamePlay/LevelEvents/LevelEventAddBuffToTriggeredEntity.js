"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventAddBuffToTriggeredEntity = void 0);
const LevelEventAddBuffClientPrePerformance_1 = require("./LevelEventAddBuffClientPrePerformance");
class LevelEventAddBuffToTriggeredEntity extends LevelEventAddBuffClientPrePerformance_1.LevelEventAddBuffClientPrePerformance {
  GetTargetEntity(e) {
    return this.GetOtherEntity(e);
  }
  GetBuffIds(e) {
    return e.BuffIds;
  }
}
exports.LevelEventAddBuffToTriggeredEntity = LevelEventAddBuffToTriggeredEntity;
//# sourceMappingURL=LevelEventAddBuffToTriggeredEntity.js.map

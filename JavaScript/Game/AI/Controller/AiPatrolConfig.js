"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiPatrolConfig = void 0);
class AiPatrolConfig {
  constructor() {
    (this.Id = 0),
      (this.CirclePatrol = !1),
      (this.SplineEntityId = 0),
      (this.IsNavigation = !1),
      (this.StartIndex = 0),
      (this.LimitNpcDistance = 0),
      (this.TurnSpeed = 0),
      (this.Loop = !1),
      (this.EndDistance = 0),
      (this.Sampling = 0),
      (this.ContainZ = !1);
  }
  Init(t) {
    (this.Id = t.Id),
      (this.CirclePatrol = t.CirclePatrol),
      (this.IsNavigation = t.IsNavigation),
      (this.StartIndex = t.StartIndex),
      (this.LimitNpcDistance = t.LimitNpcDistance),
      (this.TurnSpeed = t.TurnSpeed),
      (this.Loop = t.Loop),
      (this.EndDistance = t.EndDistance),
      (this.Sampling = t.Sampling),
      (this.ContainZ = t.ContainZ);
  }
}
exports.AiPatrolConfig = AiPatrolConfig;
//# sourceMappingURL=AiPatrolConfig.js.map

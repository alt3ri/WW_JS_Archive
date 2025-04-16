"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapTravelLockAreaData =
    exports.FinalTravelTaskData =
    exports.SoarChallengePlayData =
    exports.MapTravelAreaData =
      void 0);
class MapTravelAreaData {
  constructor(t) {
    (this.AreaId = t),
      (this.TravelTaskIdSet = new Set()),
      (this.PhantomTaskIdSet = new Set()),
      (this.IsUnlock = !1);
  }
}
exports.MapTravelAreaData = MapTravelAreaData;
class SoarChallengePlayData {
  constructor() {
    (this.TabIndex = 0),
      (this.PlayId = 0),
      (this.JumpId = 0),
      (this.NameTextId = ""),
      (this.RewardIds = []),
      (this.IsUnlock = !1),
      (this.IsNew = !1),
      (this.HighestPoint = 0),
      (this.CheckRedDot = void 0),
      (this.CheckFinished = void 0);
  }
  get HasRedDot() {
    return this.CheckRedDot(this.RewardIds);
  }
  get IsFinished() {
    return this.CheckFinished(this.RewardIds);
  }
}
exports.SoarChallengePlayData = SoarChallengePlayData;
class FinalTravelTaskData {
  constructor() {
    (this.Target = 1), (this.FinishedIdSet = new Set()), (this.IsReceived = !1);
  }
  get Current() {
    return this.FinishedIdSet.size;
  }
  CanReceive() {
    return !this.IsReceived && this.Current === this.Target;
  }
}
exports.FinalTravelTaskData = FinalTravelTaskData;
class MapTravelLockAreaData {
  constructor(t) {
    (this.AreaId = t), (this.ConditionGroupId = 0), (this.JumpId = 0);
  }
}
exports.MapTravelLockAreaData = MapTravelLockAreaData;
//# sourceMappingURL=ActivityMapTravelDefine.js.map

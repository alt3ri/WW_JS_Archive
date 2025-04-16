"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsGroupRewardData = void 0);
class RacingBetsGroupRewardData {
  constructor(t) {
    (this.Id = 0), (this.avt = []), (this.Id = t);
  }
  AddRewardData(e) {
    this.avt.find((t) => t.Id === e.Id) || this.avt.push(e);
  }
  GetRewardDataList() {
    return (
      this.avt.sort((t, e) =>
        t.CanReceiveReward() && !e.CanReceiveReward()
          ? -1
          : !t.CanReceiveReward() && e.CanReceiveReward()
            ? 1
            : !t.IsTaskReceived() && e.IsTaskReceived()
              ? -1
              : t.IsTaskReceived() && !e.IsTaskReceived()
                ? 1
                : t.Id - e.Id,
      ),
      this.avt
    );
  }
  CanReceiveRewards() {
    return this.avt.some((t) => t.CanReceiveReward());
  }
}
exports.RacingBetsGroupRewardData = RacingBetsGroupRewardData;
//# sourceMappingURL=RacingBetsGroupRewardData.js.map

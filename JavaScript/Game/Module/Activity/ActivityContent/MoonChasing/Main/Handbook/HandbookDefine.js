"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandbookRewardData = void 0);
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
class HandbookRewardData {
  constructor() {
    (this.Id = 0),
      (this.Goal = 0),
      (this.Achieved = !1),
      (this.DropId = 0),
      (this.cbe = []);
  }
  GetPreviewReward() {
    if (0 === this.cbe.length) {
      var t = [];
      if (0 === this.DropId) return t;
      var r,
        e,
        a = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
          this.DropId,
        )?.DropPreview;
      if (!a) return t;
      for ([r, e] of a) {
        var i = [{ IncId: 0, ItemId: r }, e];
        t.push(i);
      }
      this.cbe = t;
    }
    return this.cbe;
  }
  GetState(t) {
    return this.Achieved ? 2 : t < this.Goal ? 0 : 1;
  }
}
exports.HandbookRewardData = HandbookRewardData;
//# sourceMappingURL=HandbookDefine.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRogueReceiveReward = void 0);
class FbRogueReceiveReward {
  constructor(e) {
    (this.FbDataInternal = e), (this.w5_ = !1), (this.R5_ = void 0);
  }
  static Create(e) {
    if (e) return new FbRogueReceiveReward(e);
  }
  get RogueRewardReceiveType() {
    return (
      this.w5_ ||
        ((this.w5_ = !0),
        (this.R5_ = this.FbDataInternal.rogueRewardReceiveType())),
      this.R5_
    );
  }
}
exports.FbRogueReceiveReward = FbRogueReceiveReward;
//# sourceMappingURL=FbRogueReceiveReward.js.map

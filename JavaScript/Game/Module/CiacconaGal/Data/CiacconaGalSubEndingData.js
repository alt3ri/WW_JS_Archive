"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalSubEndingData = void 0);
class CiacconaGalSubEndingData {
  constructor(t) {
    (this.Lo = t), (this.KOc = !1), (this.n4c = !1), (this.a4c = !1);
  }
  get Id() {
    return this.Lo.Id;
  }
  get Title() {
    return this.Lo.Title;
  }
  get Desc() {
    return this.Lo.Desc;
  }
  get ImagePath() {
    return this.Lo.BackgroundImage;
  }
  get Type() {
    return this.Lo.Type;
  }
  get RewardId() {
    return this.Lo.Reward;
  }
  get IsFinished() {
    return this.KOc;
  }
  get IsRewarded() {
    return this.n4c;
  }
  get ShouldExitOnFirstFinish() {
    return this.Lo.ExitOnFinish;
  }
  get IsFaked() {
    return this.a4c;
  }
  UpdateByServerData(t) {
    (this.KOc = t.a3_), (this.n4c = t.d3c), (this.a4c = !1);
  }
  ClientSetFinished(t) {
    this.KOc !== t && ((this.KOc = t), (this.a4c = !0));
  }
}
exports.CiacconaGalSubEndingData = CiacconaGalSubEndingData;
//# sourceMappingURL=CiacconaGalSubEndingData.js.map

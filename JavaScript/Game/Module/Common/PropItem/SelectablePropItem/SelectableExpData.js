"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SelectableExpData = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
class SelectableExpData {
  constructor() {
    (this.ArrivedLevel = 0),
      (this.ArrivedExp = 0),
      (this.ArrivedFillAmount = 0),
      (this.CurrentMaxExp = 0),
      (this.CurrentLevel = 0),
      (this.CurrentExp = 0),
      (this.CurrentMaxLevel = 0),
      (this.LimitLevel = 0),
      (this.FrontExp = 0),
      (this.vwt = !1),
      (this.Mwt = 0),
      (this.MaxExpCacheMap = new Map()),
      (this.GetMaxExpFunction = void 0),
      (this.Swt = !1);
  }
  static PhraseData(t) {
    var e = new SelectableExpData();
    return (
      t.MaxExpFunction && e.SetMaxExpFunction(t.MaxExpFunction),
      e.UpdateComponent(t.CurrentLevel, t.CurrentMaxLevel, t.CurrentExp),
      e.UpdateExp(0),
      e
    );
  }
  UpdateComponent(t, e, i, s = void 0, h = !1) {
    (this.ArrivedLevel = t),
      (this.CurrentLevel = t),
      (this.CurrentMaxLevel = e),
      (this.CurrentExp = i),
      (this.LimitLevel = s),
      (this.Swt = h),
      this.CurrentLevel === this.CurrentMaxLevel
        ? (this.CurrentMaxExp = this.StageMaxExp(this.CurrentLevel - 1))
        : (this.CurrentMaxExp = this.StageMaxExp(this.CurrentLevel));
  }
  UpdateExp(t) {
    return !((this.IsInMax() && t > this.FrontExp) || (this.FPt(t), 0));
  }
  FPt(t) {
    var e;
    (this.FrontExp = t),
      (this.Mwt = t),
      (this.vwt = this.CurrentExp + t >= this.CurrentMaxExp),
      this.vwt
        ? ((e = this.CurrentExp + t - this.CurrentMaxExp),
          this.UpdateNextExp(e, this.CurrentLevel + 1))
        : ((e = (this.CurrentExp + t) / this.CurrentMaxExp),
          this.UpdateCurrentExp(t, this.CurrentLevel, e));
  }
  UpdateNextExp(e, i) {
    if (i >= this.CurrentMaxLevel) this.UpdateCurrentExp(e, i, 1);
    else {
      let t = this.MaxExpCacheMap.get(i);
      t || ((t = this.GetMaxExpFunction(i)), this.MaxExpCacheMap.set(i, t)),
        e >= t
          ? this.UpdateNextExp(e - t, i + 1)
          : this.UpdateCurrentExp(e, i, e / t);
    }
  }
  UpdateCurrentExp(t, e, i) {
    (this.ArrivedExp = t),
      (this.ArrivedFillAmount = i),
      (this.ArrivedLevel = e);
  }
  StageMaxExp(t) {
    if (!this.GetMaxExpFunction)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelExperienceComponent",
            11,
            "Unregistered SetMaxExpFunction CallBack",
          ),
        0
      );
    let e = this.MaxExpCacheMap.get(t);
    return (e = e || this.GetMaxExpFunction(t));
  }
  GetMaxExp(t) {
    return this.Swt ? this.AddUpMaxExp(t) : this.StageMaxExp(t);
  }
  AddUpMaxExp(e) {
    let i = 0;
    for (let t = 1; t <= e; t++) i += this.StageMaxExp(t);
    return i;
  }
  IsInMax() {
    return this.ArrivedLevel === this.CurrentMaxLevel;
  }
  GetOverExp() {
    var t = this.GetExpDistanceToMax(),
      t = this.Mwt - t;
    return 0 < t ? t : 0;
  }
  GetIsAddUp() {
    return this.Swt;
  }
  SetMaxExpFunction(t) {
    this.GetMaxExpFunction = t;
  }
  GetCurrentLevel() {
    return this.CurrentLevel;
  }
  GetExpDistanceToMax() {
    let e = 0;
    for (let t = 0; t <= this.CurrentMaxLevel - 1; t++)
      e += this.StageMaxExp(t);
    let i = 0;
    for (let t = 0; t <= this.CurrentLevel - 1; t++) i += this.StageMaxExp(t);
    return e - i - this.CurrentExp;
  }
  GetCurrentExp() {
    return this.CurrentExp;
  }
  GetCurrentMaxLevel() {
    return this.CurrentMaxLevel;
  }
  GetLimitLevel() {
    return this.LimitLevel;
  }
  GetArrivedAddExp() {
    return this.ArrivedExp;
  }
  GetCurrentAddExp() {
    return this.Mwt;
  }
  GetArrivedLevel() {
    return this.ArrivedLevel;
  }
  GetArrivedFillAmount() {
    return this.ArrivedFillAmount;
  }
  GetIfNext() {
    return this.vwt;
  }
}
exports.SelectableExpData = SelectableExpData;
//# sourceMappingURL=SelectableExpData.js.map

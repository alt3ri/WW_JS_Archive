"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CountryExploreLevelData = void 0);
const CountryExploreLevelRewardData_1 = require("./CountryExploreLevelRewardData"),
  CountryExploreScoreData_1 = require("./CountryExploreScoreData");
class CountryExploreLevelData {
  constructor() {
    (this.z5t = 0),
      (this.Z5t = 0),
      (this.eVt = 0),
      (this.tVt = new Map()),
      (this.iVt = []),
      (this.oVt = []),
      (this.rVt = new Map()),
      (this.nVt = []),
      (this.sVt = 0);
  }
  Initialize(e, t) {
    (this.z5t = e), (this.sVt = 0);
    for (const a of t) {
      var r =
          new CountryExploreLevelRewardData_1.CountryExploreLevelRewardData(),
        o = (r.Initialize(a), a.ExploreLevel);
      this.tVt.set(o, r),
        this.iVt.push(r),
        a.Show && this.oVt.push(r),
        this.sVt < o && (this.sVt = o);
    }
  }
  AddExploreScoreData(e, t, r, o) {
    var a = new CountryExploreScoreData_1.CountryExploreScoreData();
    a.Initialize(this.z5t, e, t, r, o);
    let s = this.rVt.get(e);
    s || ((s = new Map()), this.rVt.set(e, s)), s.set(t, a), this.nVt.push(a);
  }
  GetExploreScoreData(e, t) {
    return this.rVt.get(e)?.get(t);
  }
  GetAllExploreScoreData() {
    return this.nVt;
  }
  GetVisibleExploreScoreDataList() {
    var e = [];
    for (const a of this.rVt.values())
      for (var [t, r] of a) {
        var o = r.LastProgress,
          o = a.get(o);
        (o && !o.GetIsReceived()) ||
          ((r.CanReceive() || r.GetIsReceived() || t > r.GetAreaProgress()) &&
            e.push(r));
      }
    return e;
  }
  SetExploreScoreDataReceived(e, t, r) {
    this.GetExploreScoreData(e, t)?.SetReceived(r);
  }
  GetCountryId() {
    return this.z5t;
  }
  SetExploreLevel(e) {
    this.Z5t = e;
  }
  GetExploreLevel() {
    return this.Z5t;
  }
  SetExploreScore(e) {
    this.eVt = e;
  }
  GetExploreScore() {
    return this.eVt;
  }
  GetExploreLevelRewardData(e) {
    return this.tVt.get(e);
  }
  GetExploreLevelRewardDataMap() {
    return this.tVt;
  }
  GetCurrentExploreLevelRewardData() {
    return this.tVt.get(this.Z5t);
  }
  GetAllExploreLevelRewardData() {
    return this.iVt;
  }
  GetUnlockFunctionExploreLevelRewardDataList() {
    return this.oVt;
  }
  GetMaxExploreLevel() {
    return this.sVt;
  }
  CanLevelUp() {
    let e = 0;
    for (const r of this.nVt) r.CanReceive() && (e += r.Score);
    var t = this.GetCurrentExploreLevelRewardData();
    return (
      !(0 === e || this.eVt >= t.GetMaxExploreScore()) &&
      this.eVt + e >= t.GetMaxExploreScore()
    );
  }
}
exports.CountryExploreLevelData = CountryExploreLevelData;
//# sourceMappingURL=CountryExploreLevelData.js.map

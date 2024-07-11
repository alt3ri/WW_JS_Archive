"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardData = void 0);
class RewardData {
  constructor(t, e) {
    (this.G0i = void 0),
      (this.N0i = void 0),
      (this.O0i = new Map()),
      (this.k0i = new Map()),
      t && (this.G0i = t),
      (this.N0i = e || { ItemList: [] });
  }
  SetItemList(t) {
    if (t)
      for (const s of (this.N0i.ItemList = t)) {
        var e = s.UniqueId;
        if (void 0 !== e && 0 < e) this.k0i.set(e, s);
        else {
          e = s.ConfigId;
          if (void 0 !== e && 0 < e) {
            var i = this.O0i.get(e);
            if (!i) return void this.O0i.set(e, s);
            i.Count += s.Count;
          }
        }
      }
  }
  AddItem(t) {
    let e = this.GetItemList();
    e = e || [];
    var i,
      s = t.UniqueId;
    void 0 !== s && 0 < s
      ? (e.push(t), this.k0i.set(s, t))
      : void 0 !== (s = t.ConfigId) &&
        0 < s &&
        ((i = this.O0i.get(s))
          ? (i.Count += t.Count)
          : (e.push(t), this.O0i.set(s, t)));
  }
  AddItemList(t) {
    if (t) for (const e of t) this.AddItem(e);
  }
  SetProgressQueue(t) {
    this.N0i.ProgressQueue = t;
  }
  SetExploreRecordInfo(t) {
    this.N0i.ExploreRecordInfo = t;
  }
  SetExploreBarDataList(t) {
    this.N0i.ExploreBarDataList = t;
  }
  SetButtonInfoList(t) {
    this.N0i.ButtonInfoList = t;
  }
  SetExploreFriendDataList(t) {
    this.N0i.ExploreFriendDataList = t;
  }
  SetTargetReached(t) {
    this.N0i.TargetReached = t;
  }
  SetStateToggle(t) {
    this.N0i.StateToggle = t;
  }
  SetScoreReached(t) {
    this.N0i.ScoreReached = t;
  }
  SetRewardInfo(t) {
    this.G0i = t;
  }
  GetRewardInfo() {
    return this.G0i;
  }
  GetExtendRewardInfo() {
    return this.N0i;
  }
  GetItemList() {
    return this.N0i.ItemList;
  }
  GetItemByConfigId(t) {
    return this.O0i.get(t);
  }
  GetItemByUniqueId(t) {
    return this.k0i.get(t);
  }
}
exports.RewardData = RewardData;
//# sourceMappingURL=RewardData.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TopBuffYouHu = void 0);
const TopBuffContainer_1 = require("./TopBuffContainer"),
  TopBuffItemYouHu_1 = require("./TopBuffItemYouHu"),
  tagIds = [-1776747611, -2102795492, 166342785, 789955629];
class TopBuffYouHu extends TopBuffContainer_1.TopBuffContainer {
  constructor() {
    super(...arguments),
      (this.x5e = []),
      (this.Zmt = (t) => {
        this.qYt();
      });
  }
  async OnInitAsync() {
    var s = [];
    for (let t = 0; t < 4; t++) {
      var o = new TopBuffItemYouHu_1.TopBuffItemYouHu();
      s.push(
        o.CreateByResourceIdAsync("UiItem_BuffItemYouhu", this.ParentItem),
      ),
        this.x5e.push(o);
    }
    await Promise.all(s), this.Ore(), this.qYt();
  }
  SetVisible(t) {
    for (const s of this.x5e) s.SetVisible(0, t);
  }
  Ore() {
    for (const t of tagIds) this.ListenForTagCountChanged(t, this.Zmt);
  }
  kre() {}
  qYt() {
    var t = this.RoleData?.GameplayTagComponent;
    if (t) {
      let s = 0;
      var o = this.x5e.length;
      for (const i of tagIds) {
        var e = t.GetTagCount(i);
        for (let t = 0; t < e; t++)
          if (
            (this.x5e[s].RefreshByTag(i),
            this.x5e[s].SetVisible(1, !0),
            ++s >= o)
          )
            return;
      }
      for (let t = s; t < o; t++) this.x5e[t].SetVisible(1, !1);
    } else for (const s of this.x5e) s.SetVisible(1, !1);
  }
  OnDestroy() {
    this.kre();
    for (const t of this.x5e) t.Destroy();
  }
}
exports.TopBuffYouHu = TopBuffYouHu;
//# sourceMappingURL=TopBuffYouHu.js.map

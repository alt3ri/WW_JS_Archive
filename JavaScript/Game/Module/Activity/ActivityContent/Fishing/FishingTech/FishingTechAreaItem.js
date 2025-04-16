"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingTechAreaItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  FishingTechNodeItem_1 = require("./FishingTechNodeItem"),
  FishingTechSecondaryNodeItem_1 = require("./FishingTechSecondaryNodeItem");
class FishingTechAreaItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.lh_ = []),
      (this._h_ = []),
      (this.OnClickToggleBack = void 0),
      (this.kqe = (e, i) => {
        this.OnClickToggleBack?.(e, i);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [13, UE.UISprite],
    ];
  }
  async OnBeforeStartAsync() {
    var e = [],
      i = new FishingTechNodeItem_1.FishingTechNodeItem(),
      s =
        (e.push(i.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())),
        new FishingTechNodeItem_1.FishingTechNodeItem()),
      t =
        (e.push(s.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())),
        new FishingTechNodeItem_1.FishingTechNodeItem()),
      h =
        (e.push(t.CreateThenShowByActorAsync(this.GetItem(2).GetOwner())),
        new FishingTechNodeItem_1.FishingTechNodeItem()),
      o =
        (e.push(h.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())),
        new FishingTechSecondaryNodeItem_1.FishingTechSecondaryNodeItem()),
      n =
        (e.push(o.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())),
        new FishingTechSecondaryNodeItem_1.FishingTechSecondaryNodeItem());
    e.push(n.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())),
      await Promise.all(e),
      this.lh_.push(i),
      this.lh_.push(s),
      this.lh_.push(t),
      this.lh_.push(h),
      this._h_.push(o),
      this._h_.push(n);
  }
  RefreshNodeList(e) {
    let i = 0,
      s = 0;
    for (const t of e)
      3 === t.NodeType
        ? this._h_[s++].RefreshNode(t)
        : this.lh_[i++].RefreshNode(t);
    for (const h of this.lh_) h.OnClickToggleBack = this.kqe;
    for (const o of this._h_) o.OnClickToggleBack = this.kqe;
  }
  FindAndSelectNode(e) {
    for (const i of this.lh_)
      if (i.CurrentNode === e) return void i.SelectNode();
    for (const s of this._h_)
      if (s.CurrentNode === e) return void s.SelectNode();
  }
}
exports.FishingTechAreaItem = FishingTechAreaItem;
//# sourceMappingURL=FishingTechAreaItem.js.map

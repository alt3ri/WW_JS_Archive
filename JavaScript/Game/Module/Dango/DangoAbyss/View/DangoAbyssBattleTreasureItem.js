"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssBattleTreasureItem = exports.DangoAbyssBattleTreasureRoot =
    void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class DangoAbyssBattleTreasureRoot extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.H2c = void 0),
      (this.$2c = void 0),
      (this.sOe = []),
      (this.W2c = []);
  }
  InitItem(e, s) {
    (this.H2c = e), (this.$2c = s);
  }
  async Init(e, s) {
    var t,
      i = [],
      r = this.H2c.Width;
    let a = -1;
    for ([t] of e) {
      a++;
      var o,
        h,
        n = 1 - (s - t) / s;
      this.W2c.length > a
        ? ((this.W2c[a].RewardId = t),
          (this.W2c[a].NeedPercentage = 100 * n),
          (o = n * r),
          this.W2c[a].GetRootItem().SetAnchorOffsetX(o))
        : ((o = LguiUtil_1.LguiUtil.CopyItem(this.$2c, this.H2c)),
          (h = (this.sOe.push(o), new DangoAbyssBattleTreasureItem())),
          (n =
            (this.W2c.push(h),
            (h.NeedPercentage = 100 * n),
            (h.RewardId = t),
            n * r)),
          o.SetAnchorOffsetX(n),
          i.push(h.CreateThenShowByActorAsync(o.GetOwner())));
    }
    this.$2c.SetUIActive(!1), await Promise.all(i);
  }
  RefreshRewardItem(e) {
    for (const s of this.W2c) s.RefreshByCurrentPercentage(e);
  }
}
exports.DangoAbyssBattleTreasureRoot = DangoAbyssBattleTreasureRoot;
class DangoAbyssBattleTreasureItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.NeedPercentage = 0), (this.RewardId = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  RefreshByCurrentPercentage(e) {
    this.GetSprite(0)?.SetUIActive(this.NeedPercentage <= e);
  }
}
exports.DangoAbyssBattleTreasureItem = DangoAbyssBattleTreasureItem;
//# sourceMappingURL=DangoAbyssBattleTreasureItem.js.map

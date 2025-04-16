"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardExploreScoreSubTitle = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  RewardExploreScoreSubTitleItem_1 = require("./RewardExploreScoreSubTitleItem");
class RewardExploreScoreSubTitle extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.RUl = []), (this.UUl = []), (this.Lyn = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var e =
        new RewardExploreScoreSubTitleItem_1.RewardExploreScoreSubTitleItem(),
      e =
        (await e.CreateByActorAsync(this.GetItem(0).GetOwner()),
        this.RUl.push(e),
        new RewardExploreScoreSubTitleItem_1.RewardExploreScoreSubTitleItem()),
      e =
        (await e.CreateByActorAsync(this.GetItem(1).GetOwner()),
        this.RUl.push(e),
        new RewardExploreScoreSubTitleItem_1.RewardExploreScoreSubTitleItem()),
      e =
        (await e.CreateByActorAsync(this.GetItem(2).GetOwner()),
        this.UUl.push(e),
        new RewardExploreScoreSubTitleItem_1.RewardExploreScoreSubTitleItem());
    await e.CreateByActorAsync(this.GetItem(3).GetOwner()),
      this.UUl.push(e),
      (this.Lyn = new NewRecordItem()),
      await this.Lyn.CreateByActorAsync(this.GetItem(4).GetOwner()),
      this.Lyn.SetActive(!0);
  }
  RefreshData(e) {
    let t = 0,
      i = 0;
    for (const r of e.ItemList) {
      var s;
      0 === r.Belong
        ? t < this.RUl.length &&
          ((s = this.RUl[t++]).SetUiActive(!0), s.RefreshText(r))
        : 1 === r.Belong &&
          i < this.UUl.length &&
          ((s = this.UUl[i++]).SetUiActive(!0), s.RefreshText(r));
    }
    this.Lyn?.Refresh(e);
  }
}
exports.RewardExploreScoreSubTitle = RewardExploreScoreSubTitle;
class NewRecordItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = []);
  }
  Refresh(e) {
    this.Dyn(e), this.Dfi(e.IfNewRecord);
  }
  Dyn(e) {
    this.GetText(1)?.SetText(e.FullScore.toString());
  }
  Dfi(e) {
    this.GetItem(2)?.SetUIActive(e);
  }
}
//# sourceMappingURL=RewardExploreScoreSubTitle.js.map

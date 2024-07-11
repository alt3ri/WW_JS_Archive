"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardExploreScore = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreScore extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ZHe = void 0),
      (this.Lyn = void 0),
      (this.VOe = () => {
        return new ScoreItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.Lyn = new NewRecordItem()),
      await this.Lyn.CreateByActorAsync(this.GetItem(1).GetOwner()),
      this.Lyn.SetActive(!0);
  }
  OnStart() {
    var e = this.GetScrollViewWithScrollbar(0);
    this.ZHe = new GenericLayout_1.GenericLayout(
      e.GetContent().GetComponentByClass(UE.UILayoutBase.StaticClass()),
      this.VOe,
    );
  }
  OnBeforeDestroy() {}
  Refresh(e) {
    this.ZHe?.RefreshByData(e.TargetReached), this.Lyn?.Refresh(e);
  }
}
exports.RewardExploreScore = RewardExploreScore;
class ScoreItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0);
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {}
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
    ]),
      (this.BtnBindInfo = []);
  }
  Refresh(e, t, s) {
    this.P5e(e), this.Pqe(e);
  }
  P5e(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.DescriptionTextId);
  }
  Pqe(e) {
    this.GetText(2)?.SetText(e.Target[0]);
  }
}
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
    this.mGe(e), this.Dyn(e), this.Dfi(e.IfNewRecord);
  }
  mGe(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.RecordTextId);
  }
  Dyn(e) {
    this.GetText(1)?.SetText(e.FullScore.toString());
  }
  Dfi(e) {
    this.GetItem(2)?.SetUIActive(e);
  }
}
//# sourceMappingURL=RewardExploreScore.js.map

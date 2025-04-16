"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapExploreStoryView = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  MapAreaOnlyShowItem_1 = require("./MapAreaOnlyShowItem"),
  MapExploreStoryItem_1 = require("./MapExploreStoryItem");
class MapExploreStoryView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.DNl = void 0),
      (this.zJa = void 0),
      (this.xqe = void 0),
      (this.RNl = void 0),
      (this.xnl = -1),
      (this.U8l = []),
      (this.hNl = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    (this.DNl = this.OpenParam),
      (this.zJa = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.zJa.SetCloseCallBack(this.hNl),
      this.zJa.SetHelpBtnActive(!1),
      (this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(1),
        () => new MapExploreStoryItem_1.MapExploreStoryItem(),
      )),
      (this.U8l = this.DNl.AreaData.GetStoryList()),
      await this.xqe.RefreshByDataAsync(this.U8l, !0),
      (this.xnl = this.U8l.findIndex((i) => !!i.IsNewOpen)),
      this.xqe.LateScrollTo(this.xqe.GetItemByIndex(this.xnl)),
      (this.RNl = new MapAreaOnlyShowItem_1.MapAreaOnlyShowItem());
    var i = this.GetItem(3).GetOwner();
    await this.RNl.CreateThenShowByActorAsync(i);
  }
  OnBeforeShow() {
    var i = this.DNl.AreaData,
      t = i.GetStoryViewTitle(),
      t = (this.GetText(5)?.SetText(t), i.GetProgress());
    this.GetText(4)?.SetText(t + "%"),
      this.RNl?.Refresh(i.GetIconPercentDataAreaStory());
  }
  OnAfterPlayStartSequence() {
    if (0 <= this.xnl)
      for (let i = this.xnl; i < this.U8l.length; i++)
        this.U8l[i].IsNewOpen &&
          this.xqe.GetScrollItemByIndex(i)?.PlayNewOpenAnim();
  }
  OnBeforeDestroy() {
    this.DNl?.AreaData.SaveLocalAreaStoryProgress(),
      this.DNl?.AreaData.SaveLocalIconPercentAreaStory(),
      (this.zJa = void 0),
      (this.xqe = void 0),
      (this.RNl = void 0);
  }
}
exports.MapExploreStoryView = MapExploreStoryView;
//# sourceMappingURL=MapExploreStoryView.js.map

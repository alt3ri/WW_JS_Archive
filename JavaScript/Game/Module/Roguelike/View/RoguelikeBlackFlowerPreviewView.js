"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackFlowerRewardPreviewListItem =
    exports.RoguelikeBlackFlowerPreviewView =
      void 0);
const UE = require("ue"),
  DropPackageById_1 = require("../../../../Core/Define/ConfigQuery/DropPackageById"),
  ExchangeRewardById_1 = require("../../../../Core/Define/ConfigQuery/ExchangeRewardById"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  RewardPreviewListItem_1 = require("../../WorldMap/SubViews/Popup/RewardPreviewListItem");
class RoguelikeBlackFlowerPreviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.J2o = 0),
      (this.T8e = void 0),
      (this.z2o = () => new BlackFlowerRewardPreviewListItem());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIText],
      [2, UE.UIScrollViewWithScrollbarComponent],
    ]),
      (this.BtnBindInfo = []);
  }
  OnStart() {
    (this.T8e = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(2),
      this.z2o,
    )),
      (this.J2o = this.OpenParam.DropId),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        "BlackFlower_RewardInfo",
      );
  }
  OnBeforeShow() {
    this.Wni();
  }
  Wni() {
    var e = [];
    for (const l of ExchangeRewardById_1.configExchangeRewardById.GetConfig(
      this.J2o,
    ).RewardId)
      e.push(l);
    e.sort((e, i) => e[0] - i[0]);
    var i,
      r,
      t = [],
      s = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
    let a = 0,
      o = 0;
    for ([i, r] of e)
      t.push([i, r]), a < i && s >= i && ((a = i), (o = t.length - 1));
    this.T8e?.RefreshByDataAsync(e).finally(() => {
      TimerSystem_1.TimerSystem.Next(() => {
        this.T8e.ScrollToTop(o);
      });
    });
  }
}
exports.RoguelikeBlackFlowerPreviewView = RoguelikeBlackFlowerPreviewView;
class BlackFlowerRewardPreviewListItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.THs = 0),
      (this.$2o = void 0),
      (this.Y2o = () => new RewardPreviewListItem_1.RewardItem());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIGridLayout],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = []);
  }
  OnStart() {
    this.$2o = new GenericLayout_1.GenericLayout(
      this.GetGridLayout(2),
      this.Y2o,
    );
  }
  Refresh(e, i, r) {
    this.THs = e[1];
    var e = DropPackageById_1.configDropPackageById.GetConfig(this.THs),
      t =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          "BlackFlower_Reward_Title",
        ),
        this.GetItem(1).SetUIActive(!1),
        []);
    for (const s of e.DropPreview) t.push(s);
    this.$2o?.RefreshByData(t);
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, i) {
    return this.GridIndex;
  }
}
exports.BlackFlowerRewardPreviewListItem = BlackFlowerRewardPreviewListItem;
//# sourceMappingURL=RoguelikeBlackFlowerPreviewView.js.map

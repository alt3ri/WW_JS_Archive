"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingNormalTechView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../../Ui/Base/UiTabViewBase"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  FishingDefine_1 = require("../FishingDefine"),
  FishingNormalTechCostItem_1 = require("./FishingNormalTechCostItem"),
  FishingNormalTechViewLevelUpItem_1 = require("./FishingNormalTechViewLevelUpItem"),
  FishingTechAreaItem_1 = require("./FishingTechAreaItem"),
  FishingTechNodeItem_1 = require("./FishingTechNodeItem"),
  TECH_NODE_AREA_ONE = 1,
  TECH_NODE_AREA_TWO = 2,
  TECH_NODE_AREA_THREE = 3;
class FishingNormalTechView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.ja_ = void 0),
      (this.Ha_ = void 0),
      (this.Wa_ = void 0),
      (this.Qa_ = void 0),
      (this.Ka_ = void 0),
      (this.$a_ = void 0),
      (this.Xa_ = void 0),
      (this.ebl = void 0),
      (this.z9_ = 0),
      (this.jbe = (i, e) => {
        !this.z9_ ||
        ModelManager_1.ModelManager.FishingModel.GetFishingTechUnlock(this.z9_)
          ? this.ebl?.SetToggleState(0)
          : this.ebl?.SetToggleState(2),
          (this.ebl = e),
          (this.z9_ = i.ConfigId),
          this.$a_?.SetUiActive(!0),
          this.$a_?.RefreshView(i);
      }),
      (this.sGe = () => {
        return new FishingNormalTechCostItem_1.FishingNormalTechCostItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIHorizontalLayout],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIScrollViewWithScrollbarComponent],
      [9, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var i = [];
    (this.Ha_ = new FishingTechAreaItem_1.FishingTechAreaItem()),
      i.push(this.Ha_.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())),
      (this.Wa_ = new FishingTechAreaItem_1.FishingTechAreaItem()),
      i.push(this.Wa_.CreateThenShowByActorAsync(this.GetItem(2).GetOwner())),
      (this.Qa_ = new FishingTechAreaItem_1.FishingTechAreaItem()),
      i.push(this.Qa_.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())),
      (this.ja_ = new FishingTechNodeItem_1.FishingTechNodeItem()),
      i.push(this.ja_.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())),
      (this.Ka_ = new FishingTechNodeItem_1.FishingTechNodeItem()),
      i.push(this.Ka_.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())),
      (this.$a_ =
        new FishingNormalTechViewLevelUpItem_1.FishingNormalTechViewLevelUpItem()),
      i.push(this.$a_.CreateThenShowByActorAsync(this.GetItem(7).GetOwner())),
      (this.Xa_ = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(5),
        this.sGe,
      )),
      await Promise.all(i),
      (this.Ka_.OnClickToggleBack = this.jbe),
      (this.ja_.OnClickToggleBack = this.jbe);
  }
  OnStart() {
    var i, e;
    (this.Ha_.OnClickToggleBack = this.jbe),
      (this.Wa_.OnClickToggleBack = this.jbe),
      (this.Qa_.OnClickToggleBack = this.jbe);
    for ([i, e] of ModelManager_1.ModelManager.FishingModel.NormalTechNodeMap)
      switch (i) {
        case TECH_NODE_AREA_ONE:
          this.Ha_?.RefreshNodeList(e);
          break;
        case TECH_NODE_AREA_TWO:
          this.Wa_?.RefreshNodeList(e);
          break;
        case TECH_NODE_AREA_THREE:
          this.Qa_?.RefreshNodeList(e);
      }
    var s = ModelManager_1.ModelManager.FishingModel.GetFirstNode(),
      s =
        (this.ja_?.RefreshNode(s),
        ModelManager_1.ModelManager.FishingModel.GetLastNode());
    this.Ka_?.RefreshNode(s);
    let h = void 0;
    (h = this.ExtraParams
      ? ModelManager_1.ModelManager.FishingModel.GetNormalTechNodeById(
          this.ExtraParams,
        )
      : ModelManager_1.ModelManager.FishingModel.GetFirstUnlockNode()) &&
      (h.Area === FishingDefine_1.FISHING_TECH_FIRST_NODE_AREA
        ? this.ja_.SelectNode()
        : h.Area === FishingDefine_1.FISHING_TECH_LAST_NODE_AREA
          ? this.Ka_.SelectNode()
          : (this.Ha_?.FindAndSelectNode(h),
            this.Wa_?.FindAndSelectNode(h),
            this.Qa_?.FindAndSelectNode(h)),
      h.Area >= FishingDefine_1.FISHING_TECH_BEHIND_NODE_AREA) &&
      this.GetScrollViewWithScrollbar(8).OnLateUpdate.Bind(() => {
        TimerSystem_1.TimerSystem.Next(() => {
          this.GetScrollViewWithScrollbar(8).ScrollTo(this.Ka_.GetRootItem());
        }),
          this.GetScrollViewWithScrollbar(8).OnLateUpdate.Unbind();
      });
  }
  OnBeforeShow() {
    this.Og();
  }
  Og() {
    this.Xa_?.RefreshByData([
      FishingDefine_1.FISHING_TECH_SHOW_ITEM_ONE,
      FishingDefine_1.FISHING_TECH_SHOW_ITEM_TWO,
      FishingDefine_1.FISHING_TECH_SHOW_ITEM_THREE,
      FishingDefine_1.FISHING_TECH_SHOW_ITEM_FOUR,
      FishingDefine_1.FISHING_TECH_SHOW_ITEM_FIVE,
    ]);
  }
}
exports.FishingNormalTechView = FishingNormalTechView;
//# sourceMappingURL=FishingNormalTechView.js.map

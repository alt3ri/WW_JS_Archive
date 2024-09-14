"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardShopTabView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../../../../Ui/Base/UiTabViewBase"),
  UiTabSequence_1 = require("../../../../../../DynamicTab/UiTabViewBehavior/UiTabSequence"),
  LoopScrollView_1 = require("../../../../../../Util/ScrollView/LoopScrollView"),
  RewardShopGridItem_1 = require("./RewardShopGridItem");
class RewardShopTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.LoopScrollView = void 0),
      (this.t3i = (e, i, t) => {
        this.LoopScrollView.RefreshAllGridProxies();
      }),
      (this.sGe = () => {
        return new RewardShopGridItem_1.RewardShopGridItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    this.LoopScrollView = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(0),
      this.GetItem(1).GetOwner(),
      this.sGe,
    );
  }
  async OnShowAsyncImplementImplement() {
    var e =
      ModelManager_1.ModelManager.MoonChasingRewardModel.GetShopDataList();
    await this.LoopScrollView.RefreshByDataAsync(e, !1, !0),
      ModelManager_1.ModelManager.MoonChasingRewardModel.ReadShopItemCheckFlag(
        e,
      );
  }
  OnBeforeShow() {
    this.GetTabBehavior(UiTabSequence_1.UiTabSequence)
      ?.GetLevelSequencePlayer()
      ?.PlayLevelSequenceByName("Start");
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshGoods,
      this.t3i,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshGoods,
      this.t3i,
    );
  }
}
exports.RewardShopTabView = RewardShopTabView;
//# sourceMappingURL=RewardShopTabView.js.map

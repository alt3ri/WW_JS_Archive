"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardShopTabView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../../../../Ui/Base/UiTabViewBase"),
  UiTabSequence_1 = require("../../../../../../DynamicTab/UiTabViewBehavior/UiTabSequence"),
  PayShopItem_1 = require("../../../../../../PayShop/PayShopTab/TabItem/PayShopItem"),
  LoopScrollView_1 = require("../../../../../../Util/ScrollView/LoopScrollView");
class RewardShopTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.LoopScrollView = void 0),
      (this.t3i = (e, t, i) => {
        this.LoopScrollView.RefreshAllGridProxies();
      }),
      (this.sGe = () => {
        var e = new PayShopItem_1.PayShopItem();
        return e.SetExtraFunction(this.q0a), e;
      }),
      (this.q0a = (e, t) => {
        ModelManager_1.ModelManager.MoonChasingRewardModel.ReadShopItemUnlockFlag(
          t,
        ) && e.SetNewFlagState(!1);
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
    var t =
      ModelManager_1.ModelManager.MoonChasingRewardModel.GetShopDataList();
    await this.LoopScrollView.RefreshByDataAsync(t, !1, !0),
      ModelManager_1.ModelManager.MoonChasingRewardModel.ReadShopItemCheckFlag(
        t,
      );
    for (let e = 0; e < t.length; e++) {
      var i =
        ModelManager_1.ModelManager.MoonChasingRewardModel.CheckShopItemRedDotState(
          t[e],
        );
      this.LoopScrollView.UnsafeGetGridProxy(e)?.SetNewFlagState(i);
    }
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

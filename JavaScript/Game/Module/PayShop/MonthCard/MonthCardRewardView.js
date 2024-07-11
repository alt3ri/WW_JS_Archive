"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonthCardRewardView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ItemRewardController_1 = require("../../ItemReward/ItemRewardController");
const RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData");
class MonthCardRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.YOt = 0),
      (this.Yki = 0),
      (this.Jki = () => {
        var e = new RewardItemData_1.RewardItemData(this.YOt, this.Yki);
        const r = new Array();
        var e =
          (r.push(e),
          ConfigManager_1.ConfigManager.PayShopConfig.GetMonthCardRewardId());
        ItemRewardController_1.ItemRewardController.OpenCommonRewardView(e, r),
          UiManager_1.UiManager.CloseView(this.Info.Name);
      }),
      (this.JSi = () => {
        this.Og();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.Jki]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ReceiveMonthCardDataEvent,
      this.JSi,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ReceiveMonthCardDataEvent,
      this.JSi,
    );
  }
  OnBeforeShow() {
    const e = ModelManager_1.ModelManager.MonthCardModel.LocalDailyReward;
    (this.YOt = e[0].ItemId),
      (this.Yki = e[1]),
      this.Og(),
      this.UiViewSequence.PlaySequence("Loop");
  }
  Og() {
    (ModelManager_1.ModelManager.MonthCardModel.CanShowDailyRewardView = !1),
      this.GetText(1).SetText(
        ModelManager_1.ModelManager.MonthCardModel.GetRemainDayText("e2b54e"),
      );
  }
}
exports.MonthCardRewardView = MonthCardRewardView;
// # sourceMappingURL=MonthCardRewardView.js.map

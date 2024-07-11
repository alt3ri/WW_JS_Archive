"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneGameplayItemRewardView = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  CommonResultButtonData_1 = require("../Common/ResultView/CommonResultButtonData"),
  CommonResultView_1 = require("../Common/ResultView/CommonResultView"),
  ItemHintController_1 = require("../ItemHint/ItemHintController");
class SceneGameplayItemRewardView extends CommonResultView_1.CommonResultView {
  constructor() {
    super(...arguments),
      (this.evi = () => {
        this.SetActive(!1);
      }),
      (this.tvi = () => {
        this.SetActive(!0);
      }),
      (this.L1i = () => {
        UiManager_1.UiManager.IsViewShow(this.Info.Name) && this.CloseMe();
      });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PlotNetworkStart,
      this.evi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkEnd,
        this.tvi,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlotNetworkStart,
      this.evi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotNetworkEnd,
        this.tvi,
      );
  }
  OnStart() {
    super.OnStart(), this.FTt();
  }
  FTt() {
    this.Yli();
  }
  Yli() {
    var e =
        ModelManager_1.ModelManager.ItemHintModel.ShiftItemRewardListFirst(),
      e = ItemHintController_1.ItemHintController.CombineAllShowItems(
        e.ItemReward,
        !0,
      ),
      e = ItemHintController_1.ItemHintController.ConvertRewardListToItem(e);
    this.RewardLayout.RebuildLayoutByDataNew(e);
  }
  SetupButtonFormat() {
    var e = this.z1i();
    this.RefreshButtonList(e);
  }
  z1i() {
    var e = new Array();
    return e.push(this.Z1i()), e;
  }
  Z1i() {
    var e = new CommonResultButtonData_1.CommonResultButtonData();
    return (
      e.SetRefreshCallBack((e) => {
        e.SetBtnText("ButtonTextConfirm");
      }),
      e.SetClickCallBack(this.L1i),
      e
    );
  }
}
exports.SceneGameplayItemRewardView = SceneGameplayItemRewardView;
//# sourceMappingURL=SceneGameplayItemRewardView.js.map

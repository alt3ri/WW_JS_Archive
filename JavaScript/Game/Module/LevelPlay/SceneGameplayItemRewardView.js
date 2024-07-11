"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneGameplayItemRewardView = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const CommonResultButtonData_1 = require("../Common/ResultView/CommonResultButtonData");
const CommonResultView_1 = require("../Common/ResultView/CommonResultView");
const ItemHintController_1 = require("../ItemHint/ItemHintController");
class SceneGameplayItemRewardView extends CommonResultView_1.CommonResultView {
  constructor() {
    super(...arguments),
      (this.Zfi = () => {
        this.SetActive(!1);
      }),
      (this.epi = () => {
        this.SetActive(!0);
      }),
      (this.Lli = () => {
        UiManager_1.UiManager.IsViewShow(this.Info.Name) && this.CloseMe();
      });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PlotNetworkStart,
      this.Zfi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkEnd,
        this.epi,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlotNetworkStart,
      this.Zfi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotNetworkEnd,
        this.epi,
      );
  }
  OnStart() {
    super.OnStart(), this.qIt();
  }
  qIt() {
    this.Yhi();
  }
  Yhi() {
    var e =
      ModelManager_1.ModelManager.ItemHintModel.ShiftItemRewardListFirst();
    var e = ItemHintController_1.ItemHintController.CombineAllShowItems(
      e.ItemReward,
      !0,
    );
    var e = ItemHintController_1.ItemHintController.ConvertRewardListToItem(e);
    this.RewardLayout.RebuildLayoutByDataNew(e);
  }
  SetupButtonFormat() {
    const e = this.zli();
    this.RefreshButtonList(e);
  }
  zli() {
    const e = new Array();
    return e.push(this.Zli()), e;
  }
  Zli() {
    const e = new CommonResultButtonData_1.CommonResultButtonData();
    return (
      e.SetRefreshCallBack((e) => {
        e.SetBtnText("ButtonTextConfirm");
      }),
      e.SetClickCallBack(this.Lli),
      e
    );
  }
}
exports.SceneGameplayItemRewardView = SceneGameplayItemRewardView;
// # sourceMappingURL=SceneGameplayItemRewardView.js.map

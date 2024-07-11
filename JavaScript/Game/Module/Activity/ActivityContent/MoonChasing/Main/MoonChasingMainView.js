"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoonChasingMainView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem"),
  ButtonItem_1 = require("../../../../Common/Button/ButtonItem"),
  BuildingMainModule_1 = require("./Build/BuildingMainModule"),
  MoonChasingViewController_1 = require("./MoonChasingViewController"),
  PopularityModule_1 = require("./PopularityModule");
class MoonChasingMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.eke = void 0),
      (this.lqe = void 0),
      (this.vRn = void 0),
      (this.kWs = void 0),
      (this.FWs = void 0),
      (this.VWs = void 0),
      (this.wCa = void 0),
      (this.s6e = void 0),
      (this.zGn = new MoonChasingViewController_1.MoonChasingViewController()),
      (this.u2e = () => {
        this.eke.RefreshPopularity();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ];
  }
  async ERn() {
    (this.eke = new PopularityModule_1.PopularityModule()),
      await this.eke.CreateByActorAsync(this.GetItem(6).GetOwner()),
      this.AddChild(this.eke);
  }
  async zDn() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(5))),
      this.lqe.SetCloseCallBack(this.zGn.CloseSelf),
      this.lqe.SetHelpCallBack(this.zGn.OpenHelpView);
    var i = ConfigManager_1.ConfigManager.BusinessConfig.GetCoinItemId();
    await this.lqe.SetCurrencyItemList([i]);
  }
  async SRn() {
    (this.vRn = new BuildingMainModule_1.BuildingMainModule()),
      await this.vRn.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
  }
  HWs() {
    (this.kWs = new ButtonItem_1.ButtonItem(this.GetItem(2))),
      this.kWs.SetFunction(this.zGn.SkipToBusiness),
      (this.FWs = new ButtonItem_1.ButtonItem(this.GetItem(3))),
      this.FWs.SetFunction(this.zGn.SkipToBuild),
      (this.VWs = new ButtonItem_1.ButtonItem(this.GetItem(4))),
      this.VWs.SetFunction(this.zGn.SkipToTask),
      (this.wCa = new ButtonItem_1.ButtonItem(this.GetItem(0))),
      this.wCa.SetFunction(this.zGn.SkipToHandbook),
      (this.s6e = new ButtonItem_1.ButtonItem(this.GetItem(1))),
      this.s6e.SetFunction(this.zGn.SkipToReward);
  }
  async OnBeforeStartAsync() {
    this.zGn.RegisterView(this),
      await ControllerHolder_1.ControllerHolder.MoonChasingController.TrackMoonAllDataRequest(),
      await Promise.all([this.zDn(), this.ERn(), this.SRn()]),
      this.HWs();
  }
  OnBeforeShow() {
    this.zGn.Show();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PopularityChange,
      this.u2e,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PopularityChange,
      this.u2e,
    );
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    var t, e;
    if (!(i.length < 1))
      return "Cost" === (t = i[0])
        ? void 0 === (e = this.lqe.GetCostContent())
          ? void 0
          : [e, e]
        : "BuildMap" === t
          ? this.vRn.GetGuideUiItemAndUiItemForShowEx(i)
          : void 0;
  }
  RefreshBuildingModule() {
    this.vRn.RefreshModule();
  }
  BuildingBackToMainView() {
    this.GetItem(7)?.SetUIActive(!0), this.vRn.HideBuildingModule();
  }
  SkipToBuild() {
    this.GetItem(7)?.SetUIActive(!1), this.vRn.ShowBuilding();
  }
  RefreshMainModule(i) {
    this.vRn.RefreshBuilding(i);
  }
  RefreshRedDot() {
    this.kWs.BindRedDot("MoonChasingDelegation"),
      this.FWs.BindRedDot("MoonChasingBuilding"),
      this.wCa.BindRedDot("MoonChasingHandbook"),
      this.s6e.BindRedDot("MoonChasingRewardAndShop"),
      this.VWs.BindRedDot("MoonChasingAllQuest");
  }
}
exports.MoonChasingMainView = MoonChasingMainView;
//# sourceMappingURL=MoonChasingMainView.js.map

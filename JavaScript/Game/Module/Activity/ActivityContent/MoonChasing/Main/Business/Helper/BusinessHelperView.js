"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BusinessHelperView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../../../Ui/Common/PopupCaptionItem"),
  ScrollingTipsController_1 = require("../../../../../../ScrollingTips/ScrollingTipsController"),
  ActivityMoonChasingController_1 = require("../../../Activity/ActivityMoonChasingController"),
  BusinessHelperPanel_1 = require("./BusinessHelperPanel"),
  BusinessHelperViewController_1 = require("./BusinessHelperViewController"),
  BusinessInteractivePanel_1 = require("./BusinessInteractivePanel");
class BusinessHelperView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.CaptionItem = void 0),
      (this.HelperPanel = void 0),
      (this.InteractivePanel = void 0),
      (this.aOn =
        new BusinessHelperViewController_1.BusinessHelperViewController());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.SpineSkeletonAnimationComponent],
      [5, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  async D1a() {
    (this.HelperPanel = new BusinessHelperPanel_1.BusinessHelperPanel()),
      this.HelperPanel.RegisterViewController(this.aOn),
      await this.HelperPanel.CreateByActorAsync(this.GetItem(1).GetOwner());
  }
  async A1a() {
    (this.InteractivePanel =
      new BusinessInteractivePanel_1.BusinessInteractivePanel()),
      this.InteractivePanel.RegisterViewController(this.aOn),
      await this.InteractivePanel.CreateByActorAsync(
        this.GetItem(2).GetOwner(),
      );
  }
  async U3e() {
    (this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(
      this.GetItem(0),
    )),
      this.CaptionItem.SetCloseCallBack(this.aOn.BackToLastState),
      this.CaptionItem.SetHelpCallBack(this.aOn.OpenHelpView);
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetWishItemId();
    await Promise.all([
      this.CaptionItem.SetTitleIconByResourceId("SP_ChasingMoonIcon8"),
      this.CaptionItem.SetCurrencyItemList([e]),
    ]);
  }
  async OnBeforeStartAsync() {
    this.aOn.RegisterView(this),
      await Promise.all([this.U3e(), this.D1a(), this.A1a()]);
  }
  OnBeforeShow() {
    this.aOn.Show(),
      ActivityMoonChasingController_1.ActivityMoonChasingController.CheckIsActivityClose();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OpenTipsShopView,
      this.aOn.RefreshInteractivePanel,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OpenTipsShopView,
      this.aOn.RefreshInteractivePanel,
    );
  }
  async RefreshSpine(e) {
    var i =
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetEditTeamDataById(
          e,
        ),
      e = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(e),
      e =
        (await this.SetSpineAssetByPath(
          e.SpineAtlas,
          e.SpineSkeletonData,
          this.GetSpine(4),
        ),
        this.GetSpine(4).SetAnimation(0, "idle", !0),
        this.GetItem(5).SetUIActive(!i.IsOwn),
        this.GetItem(3));
    e.SetChangeColor(!i.IsOwn, e.changeColor);
  }
  SkipToHelpPanel() {
    this.HelperPanel?.SetActive(!0),
      this.CaptionItem.SetTitleIconByResourceId("SP_ChasingMoonIcon8"),
      this.PlaySequenceAsync("SwitchOut", !0).finally(() => {
        this.InteractivePanel?.SetActive(!1);
      });
  }
  SkipToInteractivePanel() {
    this.InteractivePanel?.SetActive(!0),
      this.CaptionItem.SetTitleIconByResourceId("SP_ChasingMoonIcon1"),
      this.PlaySequenceAsync("SwitchIn", !0).finally(() => {
        this.HelperPanel?.SetActive(!1),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MoonChasingOnOpenInteractive,
          );
      });
  }
  RefreshInteractivePanel() {
    this.InteractivePanel?.Refresh();
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (!(e.length < 1))
      switch (e[0]) {
        case "Helper":
        case "HelperFirst":
          return this.HelperPanel?.GetGuideUiItemAndUiItemForShowEx(e);
        case "Interactive":
          return this.InteractivePanel?.GetGuideUiItemAndUiItemForShowEx(e);
        default:
          return;
      }
  }
  ShowView(e) {
    ModelManager_1.ModelManager.MoonChasingModel.CheckRoleFosterTipsRedDotState() &&
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
        "Moonfiesta_HeartFullTip",
      ),
      e || this.HelperPanel?.SetActive(!0);
  }
}
exports.BusinessHelperView = BusinessHelperView;
//# sourceMappingURL=BusinessHelperView.js.map

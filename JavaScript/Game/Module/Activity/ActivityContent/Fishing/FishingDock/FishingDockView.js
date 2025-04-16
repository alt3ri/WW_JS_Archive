"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingDockView = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../../RedDot/RedDotController"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  ActivityFishingController_1 = require("../Activity/ActivityFishingController"),
  FishingRewardLimitTimeButton_1 = require("../Activity/View/Components/FishingRewardLimitTimeButton"),
  FishingController_1 = require("../FishingController"),
  FishingDefine_1 = require("../FishingDefine"),
  FishingCurrencyItem_1 = require("./FishingCurrencyItem"),
  FishingDockQuestItem_1 = require("./FishingDockQuestItem"),
  FishingDockReputationItem_1 = require("./FishingDockReputationItem"),
  FishingPermanentRewardButton_1 = require("./FishingPermanentRewardButton");
class FishingDockView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.Dd_ = void 0),
      (this.Bd_ = void 0),
      (this.Atl = void 0),
      (this.hx_ = void 0),
      (this.XV_ = void 0),
      (this.mX_ = void 0),
      (this.Awe = () => {
        FishingController_1.FishingController.IsInFishingShip()
          ? FishingController_1.FishingController.ConfirmToTeleportToPort(
              () => {
                FishingController_1.FishingController.TeleportToPortPosition(
                  ModelManager_1.ModelManager.FishingModel.DockId,
                ),
                  UiManager_1.UiManager.OpenView(
                    "FishingLoadingView",
                    !1,
                    () => {
                      this.CloseMe();
                    },
                  );
              },
            )
          : UiManager_1.UiManager.OpenView("FishingLoadingView", !1, () => {
              this.CloseMe();
            });
      }),
      (this.aZl = () => {
        UiManager_1.UiManager.OpenView("SailingView");
      }),
      (this._Zl = () => {
        FishingController_1.FishingController.OpenFishingHandBookView();
      }),
      (this.cZl = () => {
        FishingController_1.FishingController.OpenDockyardView();
      }),
      (this.uZl = () => {
        FishingController_1.FishingController.OpenFishingTechRootView();
      }),
      (this.dZl = () => {
        FishingController_1.FishingController.OpenDockyardShopView();
      }),
      (this.kx_ = () => {
        this.Auc();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIButtonComponent],
      [9, UE.UIText],
      [10, UE.UIButtonComponent],
      [11, UE.UIText],
      [12, UE.UIButtonComponent],
      [13, UE.UIText],
      [14, UE.UIButtonComponent],
      [15, UE.UIButtonComponent],
      [16, UE.UIText],
      [17, UE.UIItem],
      [18, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [8, this._Zl],
        [10, this.cZl],
        [12, this.uZl],
        [14, this.dZl],
        [15, this.aZl],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.FishingRefreshBackpackData,
      this.kx_,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.FishingRefreshBackpackData,
      this.kx_,
    );
  }
  async OnBeforeStartAsync() {
    (this.Bd_ = new FishingDockReputationItem_1.FishingDockReputationItem()),
      await this.Bd_.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
      (this.Dd_ = new FishingDockQuestItem_1.FishingDockQuestItem()),
      await this.Dd_.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
    var i =
        ActivityFishingController_1.ActivityFishingController.GetCurrentActivityData(),
      e = this.GetItem(6),
      i =
        (i
          ? ((this.Atl =
              new FishingRewardLimitTimeButton_1.FishingRewardLimitTimeButton(
                i,
              )),
            await this.Atl.CreateByActorAsync(e.GetOwner()))
          : e.SetUIActive(!1),
        this.GetItem(4));
    (this.hx_ =
      new FishingPermanentRewardButton_1.FishingPermanentRewardButton()),
      await this.hx_.CreateByActorAsync(i.GetOwner()),
      this.AddChild(this.hx_),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.Awe),
      (this.mX_ = new FishingCurrencyItem_1.FishingCurrencyItem()),
      await this.mX_.CreateThenShowByResourceIdAsync(
        "UIItem_CommonCurrencyItem",
        this.lqe.GetCostContent(),
      ),
      (this.XV_ = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetItem(3),
      )),
      FishingController_1.FishingController.HideEffectInWorld();
  }
  OnStart() {
    this.Atl?.RefreshActive(),
      this.XV_?.PlayLevelSequenceByName("Start"),
      RedDotController_1.RedDotController.BindRedDot(
        "FishingTech",
        this.GetItem(17),
      );
  }
  OnBeforeShow() {
    this.Og(),
      this.Atl?.RefreshActive(),
      this.b7_(),
      this.uH_(),
      this.mX_?.RefreshItem();
  }
  OnBeforeDestroy() {
    (ModelManager_1.ModelManager.FishingModel.DockId = 0),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "FishingTech",
        this.GetItem(17),
      ),
      FishingController_1.FishingController.ShowEffectInWorld();
  }
  b7_() {
    var i = ModelManager_1.ModelManager.DockyardModel.ShopId,
      i = ModelManager_1.ModelManager.PayShopModel.CheckShopItemCheckFlag(i);
    this.GetItem(18).SetUIActive(i);
  }
  Og() {
    this.Dd_?.RefreshItem(), this.Bd_?.RefreshItem();
    var i = ModelManager_1.ModelManager.FunctionModel.IsOpen(10077),
      i =
        (this.GetButton(14)?.RootUIComp.SetUIActive(i),
        this.Auc(),
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10078)),
      i =
        (this.GetButton(12)?.RootUIComp.SetUIActive(i),
        ModelManager_1.ModelManager.FishingModel.AllFishingTechCount),
      e = ModelManager_1.ModelManager.FishingModel.UnlockFishingTechCount,
      e =
        (this.GetText(13).SetText(e + "/" + i),
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10079)),
      i =
        (this.GetButton(8)?.RootUIComp.SetUIActive(e),
        this.hx_?.SetUiActive(e),
        ModelManager_1.ModelManager.FishingModel.AllFishingItemCount),
      e = ModelManager_1.ModelManager.FishingModel.UnLockFishingItemCount,
      e =
        (this.GetText(9).SetText(e + "/" + i),
        ModelManager_1.ModelManager.FishingModel.RoleTalkIds);
    e?.sort((i, e) => e - i),
      e && e[0]
        ? (this.GetItem(3).SetUIActive(!0),
          (i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingNotice(
            e[0],
          )),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(16), i.AlertTip))
        : this.GetItem(3).SetUIActive(!1);
  }
  uH_() {
    ModelManager_1.ModelManager.FishingModel.RefreshTechCanLevelUp();
  }
  Auc() {
    var i = ModelManager_1.ModelManager.DockyardModel.BackpackSize,
      e = ModelManager_1.ModelManager.DockyardModel.BackpackUseSize,
      t =
        (e / i) * 100 >=
        ModelManager_1.ModelManager.FishingModel.FishingBagRedPercentage;
    let n = "";
    (n = t
      ? StringUtils_1.StringUtils.Format(
          FishingDefine_1.FISHING_TECH_MATERIAL_NOT_ENOUGHT,
          e + "",
        )
      : StringUtils_1.StringUtils.Format(
          FishingDefine_1.FISHING_TECH_MATERIAL_WHITE_ENOUGHT,
          e + "",
        )),
      this.GetText(11).SetText(n + "/" + i);
  }
}
exports.FishingDockView = FishingDockView;
//# sourceMappingURL=FishingDockView.js.map

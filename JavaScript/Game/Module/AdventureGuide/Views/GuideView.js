"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdventureGuideView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem"),
  CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem"),
  TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent"),
  ItemDefines_1 = require("../../Item/Data/ItemDefines"),
  PowerController_1 = require("../../Power/PowerController"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class AdventureGuideView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.TabViewComponent = void 0),
      (this.TabComponent = void 0),
      (this.lVe = void 0),
      (this._Ve = 0),
      (this.TabDataList = []),
      (this.uVe = void 0),
      (this.cVe = void 0),
      (this.mVe = !1),
      (this.dVe = (e, t) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.pqe = (e) => {
        this.cVe = Time_1.Time.Now;
        var t = this.TabDataList[e],
          i = t.ChildViewName;
        (ModelManager_1.ModelManager.AdventureGuideModel.CurrentGuideTabName =
          i),
          this.CVe(!1);
        for (const o of this.TabComponent.GetCurrencyItemList())
          o.SetUiActive(
            "NewSoundAreaView" === i || "DisposableChallengeView" === i,
          );
        this.gVe();
        var n = this.TabComponent.GetTabItemByIndex(e);
        this.TabViewComponent.ToggleCallBack(t, i, n, this.uVe), (this._Ve = e);
      }),
      (this.yqe = (e) => {
        e = this.TabDataList[e];
        return new CommonTabData_1.CommonTabData(
          e.Icon,
          new CommonTabTitleData_1.CommonTabTitleData(e.TabName),
        );
      }),
      (this.CanToggleChange = () => {
        var e;
        return (
          !!ModelManager_1.ModelManager.PlatformModel.IsGamepad() ||
          ((e = CommonParamById_1.configCommonParamById.GetIntConfig(
            "panel_interval_time",
          )),
          !this.cVe) ||
          Time_1.Time.Now - this.cVe >= e
        );
      }),
      (this.fVe = (e, t) => {
        (this.uVe = [e, t]),
          (this._Ve = this.pVe(e)),
          this.TabComponent.SelectToggleByIndex(this._Ve, !0),
          (ModelManager_1.ModelManager.AdventureGuideModel.CurrentGuideTabName =
            e);
      }),
      (this.vVe = (e) => {
        StringUtils_1.StringUtils.IsEmpty(e)
          ? this.GetText(5).SetText("")
          : (this.mVe || this.CVe(!0),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(5),
              "Text_RefreshText_Text",
              e,
            ));
      }),
      (this.MVe = () => {
        UiManager_1.UiManager.CloseView("AdventureGuideView");
      }),
      (this.CloseClick = () => {
        this.CloseMe();
      }),
      (this.SVe = (e) => {
        this.GetButton(3).RootUIComp.SetUIActive(0 !== e),
          (this.lVe.HelpGroupId = e);
      }),
      (this.gVe = () => {
        var e = this.TabComponent?.GetCurrencyItemList();
        if (e) {
          var t = ModelManager_1.ModelManager.PowerModel.PowerCount,
            i =
              ConfigManager_1.ConfigManager.PowerConfig.GetPowerNaturalLimit();
          for (const n of e)
            n.RefreshTemp(ItemDefines_1.EItemId.Power, t + "/" + i);
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
      [5, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.MVe]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.AdventureHelpBtn,
      this.SVe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DailyActivityCountDownUpdate,
        this.vVe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeChildView,
        this.fVe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPowerChanged,
        this.gVe,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.AdventureHelpBtn,
      this.SVe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DailyActivityCountDownUpdate,
        this.vVe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeChildView,
        this.fVe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPowerChanged,
        this.gVe,
      );
  }
  async OnBeforeStartAsync() {
    (this.lVe = this.GetButton(3)),
      await this.InitTabComponent(),
      (this.uVe = this.OpenParam);
    var e,
      t,
      i,
      n = this.uVe[0];
    n
      ? (this._Ve = this.pVe(n))
      : ((n =
          ModelManager_1.ModelManager.DailyActivityModel.CheckIsRewardWaitTake()),
        (e = ModelManager_1.ModelManager.DailyActivityModel.CheckIsFinish()),
        (t =
          ControllerHolder_1.ControllerHolder.AdventureGuideController.CheckCanGetTaskAward()),
        (i =
          ModelManager_1.ModelManager.AdventureGuideModel.GetAllTaskFinish()),
        (this._Ve = n
          ? this.pVe("DailyActivityTabView")
          : this.pVe(
              t
                ? "AdventureTargetView"
                : e
                  ? i
                    ? "NewSoundAreaView"
                    : "AdventureTargetView"
                  : "DailyActivityTabView",
            ))),
      await this.TabComponent.SetCurrencyItemList([
        ItemDefines_1.EItemId.Power,
      ]);
    for (const o of this.TabComponent.GetCurrencyItemList())
      o.SetButtonFunction(() => {
        PowerController_1.PowerController.OpenPowerView();
      }),
        o.SetUiActive(!1);
    ModelManager_1.ModelManager.AdventureGuideModel.CurrentGuideTabName =
      this.TabDataList[this._Ve].ChildViewName;
  }
  OnBeforeShow() {
    this.TabComponent.SelectToggleByIndex(this._Ve, !0);
  }
  pVe(t) {
    var i = this.TabDataList.length;
    for (let e = 0; e < i; e++)
      if (this.TabDataList[e].ChildViewName === t) return e;
    return 0;
  }
  async InitTabComponent() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(
      this.dVe,
      this.pqe,
      this.yqe,
    );
    (this.TabComponent =
      new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
        this.GetItem(1),
        e,
        this.CloseClick,
      )),
      (this.cVe = void 0),
      this.TabComponent.SetCanChange(this.CanToggleChange),
      (this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
        this.GetItem(2),
      )),
      await this.RebuildTabItem();
  }
  async RebuildTabItem() {
    this.TabDataList =
      ModelManager_1.ModelManager.AdventureGuideModel.GetAdventureGuideTabList();
    var t = this.TabDataList.length,
      i = this.TabComponent.CreateTabItemDataByLength(t);
    for (let e = 0; e < t; e++) {
      var n = this.TabDataList[e].ChildViewName;
      "AdventureTargetView" === n
        ? (i[e].RedDotName = "AdventureManual")
        : "DailyActivityTabView" === n &&
          (i[e].RedDotName = "AdventureDailyActivityTab");
    }
    await this.TabComponent.RefreshTabItemAsync(i);
  }
  CVe(e) {
    e && this.vVe(""), this.GetItem(4).SetUIActive(e), (this.mVe = e);
  }
  OnBeforeDestroy() {
    (ModelManager_1.ModelManager.AdventureGuideModel.CurrentGuideTabName =
      void 0),
      (this.uVe = void 0),
      this.TabComponent &&
        (this.TabComponent.Destroy(), (this.TabComponent = void 0)),
      this.TabViewComponent &&
        (this.TabViewComponent.DestroyTabViewComponent(),
        (this.TabViewComponent = void 0));
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    const t = Number(e[0]);
    var i = this.TabComponent.GetTabItemByIndex(
      this.TabDataList.findIndex((e) => e.Id === t),
    ).GetRootItem();
    if (i) return [i, i];
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
        "configParams",
        e,
      ]);
  }
}
exports.AdventureGuideView = AdventureGuideView;
//# sourceMappingURL=GuideView.js.map

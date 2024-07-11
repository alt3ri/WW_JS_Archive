"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdventureGuideView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
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
      (this.y6e = void 0),
      (this.I6e = 0),
      (this.TabDataList = []),
      (this.T6e = void 0),
      (this.L6e = void 0),
      (this.D6e = !1),
      (this.R6e = (e, t) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.pqe = (e) => {
        this.L6e = Time_1.Time.Now;
        var t = this.TabDataList[e],
          i = t.ChildViewName;
        (ModelManager_1.ModelManager.AdventureGuideModel.CurrentGuideTabName =
          i),
          this.U6e(!1);
        for (const n of this.TabComponent.GetCurrencyItemList())
          n.SetUiActive(
            "NewSoundAreaView" === i || "DisposableChallengeView" === i,
          );
        var o = this.TabComponent.GetTabItemByIndex(e);
        this.TabViewComponent.ToggleCallBack(t, i, o, this.T6e), (this.I6e = e);
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
          !!Info_1.Info.IsInGamepad() ||
          ((e = CommonParamById_1.configCommonParamById.GetIntConfig(
            "panel_interval_time",
          )),
          !this.L6e) ||
          Time_1.Time.Now - this.L6e >= e
        );
      }),
      (this.P6e = (e, t) => {
        (this.T6e = [e, t]),
          (this.I6e = this.x6e(e)),
          this.TabComponent.SelectToggleByIndex(this.I6e, !0),
          (ModelManager_1.ModelManager.AdventureGuideModel.CurrentGuideTabName =
            e);
      }),
      (this.w6e = (e) => {
        StringUtils_1.StringUtils.IsEmpty(e)
          ? this.GetText(5).SetText("")
          : (this.D6e || this.U6e(!0),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(5),
              "Text_RefreshText_Text",
              e,
            ));
      }),
      (this.B6e = () => {
        UiManager_1.UiManager.CloseView("AdventureGuideView");
      }),
      (this.CloseClick = () => {
        this.CloseMe();
      }),
      (this.b6e = (e) => {
        this.GetButton(3).RootUIComp.SetUIActive(0 !== e),
          (this.y6e.HelpGroupId = e);
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
      (this.BtnBindInfo = [[0, this.B6e]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.AdventureHelpBtn,
      this.b6e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DailyActivityCountDownUpdate,
        this.w6e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeChildView,
        this.P6e,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.AdventureHelpBtn,
      this.b6e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DailyActivityCountDownUpdate,
        this.w6e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeChildView,
        this.P6e,
      );
  }
  async OnBeforeStartAsync() {
    (this.y6e = this.GetButton(3)),
      await ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForAdventureManual(),
      await this.InitTabComponent(),
      (this.T6e = this.OpenParam);
    var e,
      t,
      i,
      o = this.T6e[0];
    o
      ? (this.I6e = this.x6e(o))
      : ((o =
          ModelManager_1.ModelManager.DailyActivityModel.CheckIsRewardWaitTake()),
        (e = ModelManager_1.ModelManager.DailyActivityModel.CheckIsFinish()),
        (t =
          ControllerHolder_1.ControllerHolder.AdventureGuideController.CheckCanGetTaskAward()),
        (i =
          ModelManager_1.ModelManager.AdventureGuideModel.GetAllTaskFinish()),
        (this.I6e = o
          ? this.x6e("DailyActivityTabView")
          : this.x6e(
              t
                ? "AdventureTargetView"
                : e
                  ? i
                    ? "NewSoundAreaView"
                    : "AdventureTargetView"
                  : "DailyActivityTabView",
            )));
    let n = void 0;
    (n = ModelManager_1.ModelManager.FunctionModel.IsOpen(10066)
      ? [ItemDefines_1.EItemId.OverPower, ItemDefines_1.EItemId.Power]
      : [ItemDefines_1.EItemId.Power]),
      await this.TabComponent.SetCurrencyItemList(n);
    for (const r of this.TabComponent.GetCurrencyItemList())
      r.SetButtonFunction(() => {
        PowerController_1.PowerController.OpenPowerView();
      }),
        r.SetUiActive(!1);
    ModelManager_1.ModelManager.AdventureGuideModel.CurrentGuideTabName =
      this.TabDataList[this.I6e].ChildViewName;
  }
  OnBeforeShow() {
    this.TabComponent.SelectToggleByIndex(this.I6e, !0);
  }
  x6e(t) {
    var i = this.TabDataList.length;
    for (let e = 0; e < i; e++)
      if (this.TabDataList[e].ChildViewName === t) return e;
    return 0;
  }
  async InitTabComponent() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(
      this.R6e,
      this.pqe,
      this.yqe,
    );
    (this.TabComponent =
      new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
        this.GetItem(1),
        e,
        this.CloseClick,
      )),
      (this.L6e = void 0),
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
      var o = this.TabDataList[e].ChildViewName;
      "AdventureTargetView" === o
        ? (i[e].RedDotName = "AdventureManual")
        : "DailyActivityTabView" === o &&
          (i[e].RedDotName = "AdventureDailyActivityTab");
    }
    await this.TabComponent.RefreshTabItemAsync(i);
  }
  U6e(e) {
    e && this.w6e(""), this.GetItem(4).SetUIActive(e), (this.D6e = e);
  }
  OnBeforeDestroy() {
    (ModelManager_1.ModelManager.AdventureGuideModel.CurrentGuideTabName =
      void 0),
      (this.T6e = void 0),
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdventureGuideView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem");
const TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const PowerController_1 = require("../../Power/PowerController");
const LguiUtil_1 = require("../../Util/LguiUtil");
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
        const t = this.TabDataList[e];
        const i = t.ChildViewName;
        (ModelManager_1.ModelManager.AdventureGuideModel.CurrentGuideTabName =
          i),
          this.CVe(!1);
        for (const o of this.TabComponent.GetCurrencyItemList())
          o.SetUiActive(
            i === "NewSoundAreaView" || i === "DisposableChallengeView",
          );
        this.gVe();
        const n = this.TabComponent.GetTabItemByIndex(e);
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
        let e;
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
        this.GetButton(3).RootUIComp.SetUIActive(e !== 0),
          (this.lVe.HelpGroupId = e);
      }),
      (this.gVe = () => {
        const e = this.TabComponent?.GetCurrencyItemList();
        if (e) {
          const t = ModelManager_1.ModelManager.PowerModel.PowerCount;
          const i =
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
    let e;
    let t;
    let i;
    let n = this.uVe[0];
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
    const i = this.TabDataList.length;
    for (let e = 0; e < i; e++)
      if (this.TabDataList[e].ChildViewName === t) return e;
    return 0;
  }
  async InitTabComponent() {
    const e = new CommonTabComponentData_1.CommonTabComponentData(
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
    const t = this.TabDataList.length;
    const i = this.TabComponent.CreateTabItemDataByLength(t);
    for (let e = 0; e < t; e++) {
      const n = this.TabDataList[e].ChildViewName;
      n === "AdventureTargetView"
        ? (i[e].RedDotName = "AdventureManual")
        : n === "DailyActivityTabView" &&
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
    const i = this.TabComponent.GetTabItemByIndex(
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
// # sourceMappingURL=GuideView.js.map

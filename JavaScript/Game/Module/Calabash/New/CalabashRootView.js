"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalabashRootView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem"),
  TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent"),
  HandBookController_1 = require("../../HandBook/HandBookController"),
  HelpController_1 = require("../../Help/HelpController"),
  CalabashTabItem_1 = require("./CalabashTabItem"),
  CALABASH_LEVEL_UP_HELP_ID = 48,
  CALABASH_COLLECT_HELP_ID = 47,
  VISION_RECOVERY_HELP_ID = 70;
class CalabashRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.yvt = void 0),
      (this.Ivt = void 0),
      (this.Tvt = void 0),
      (this.Lvt = void 0),
      (this.Dvt = !1),
      (this.t5e = 0),
      (this.Rvt = () => {
        this.CloseMe();
      }),
      (this.dpt = () => {
        HelpController_1.HelpController.OpenHelpById(this.t5e);
      }),
      (this.Uvt = (e) => {
        var t = this.yvt.findIndex(
          (e) => "CalabashCollectTabView" === e.ChildViewName,
        );
        this.Lvt
          ? ((this.Lvt.TabViewName = "CalabashCollectTabView"),
            (this.Lvt.Param = e))
          : (this.Lvt = { TabViewName: "CalabashCollectTabView", Param: e }),
          this.Ivt.SelectToggleByIndex(t);
      }),
      (this.Avt = (e) => {
        var t = this.yvt.findIndex(
          (e) => "PhantomBattleFettersTabView" === e.ChildViewName,
        );
        this.Lvt
          ? ((this.Lvt.TabViewName = "PhantomBattleFettersTabView"),
            (this.Lvt.Param = e))
          : (this.Lvt = {
              TabViewName: "PhantomBattleFettersTabView",
              Param: e,
            }),
          this.Ivt.SelectToggleByIndex(t);
      }),
      (this.Pvt = () => {
        this.Ivt?.HideItem();
      }),
      (this.xvt = () => {
        this.Ivt?.ShowItem();
      }),
      (this.wvt = (e) => {
        e
          ? this.UiViewSequence.PlaySequence("SwitchA")
          : this.UiViewSequence.PlaySequence("SwitchB");
      }),
      (this.fqe = (e) => new CalabashTabItem_1.CalabashTabItem()),
      (this.pqe = (e) => {
        var t = this.yvt[e],
          i = t.ChildViewName,
          e = this.Ivt.GetTabItemByIndex(e),
          a = i === this.Lvt?.TabViewName ? this.Lvt?.Param : void 0;
        this.Tvt.ToggleCallBack(t, i, e, a),
          this.Lvt && (this.Lvt.Param = void 0);
        let s = !1;
        "CalabashLevelUpTabView" === i
          ? ((this.t5e = CALABASH_LEVEL_UP_HELP_ID), (s = !0))
          : "CalabashCollectTabView" === i
            ? ((this.t5e = CALABASH_COLLECT_HELP_ID), (s = !0))
            : "VisionRecoveryTabView" === i &&
              ((this.t5e = VISION_RECOVERY_HELP_ID), (s = !0)),
          this.Ivt.SetHelpButtonShowState(s),
          this.GetItem(3)?.SetUIActive("CalabashCollectTabView" === i);
      }),
      (this.yqe = (e) => {
        e = this.yvt[e];
        return new CommonTabData_1.CommonTabData(
          e.Icon,
          new CommonTabTitleData_1.CommonTabTitleData(e.TabName),
        );
      }),
      (this.Bvt = (e) => {
        ModelManager_1.ModelManager.CalabashModel.SaveIfSimpleState(!e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIExtendToggle],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.Bvt]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.JumpToCalabashCollect,
      this.Uvt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.JumpToPhantomBattleFettersTabView,
        this.Avt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CalabashEnterInternalView,
        this.Pvt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CalabashQuitInternalView,
        this.xvt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshCalabashTabShowState,
        this.wvt,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.JumpToCalabashCollect,
      this.Uvt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.JumpToPhantomBattleFettersTabView,
        this.Avt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CalabashEnterInternalView,
        this.Pvt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CalabashQuitInternalView,
        this.xvt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshCalabashTabShowState,
        this.wvt,
      );
  }
  async OnBeforeStartAsync() {
    (this.Dvt = !0),
      await HandBookController_1.HandBookController.SendIllustratedInfoRequestAsync(
        [1],
      ),
      ModelManager_1.ModelManager.CalabashModel.CheckSimpleStateSave();
    var e = ModelManager_1.ModelManager.CalabashModel.GetIfSimpleState()
      ? 0
      : 1;
    this.GetExtendToggle(2)?.SetToggleState(e),
      (this.Lvt = this.OpenParam),
      this.bvt(),
      await this.qvt(),
      this.Gvt();
  }
  bvt() {
    this.yvt = ModelManager_1.ModelManager.CalabashModel?.GetViewTabList();
  }
  async qvt() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(
        this.fqe,
        this.pqe,
        this.yqe,
      ),
      e =
        ((this.Ivt =
          new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
            this.GetItem(0),
            e,
            this.Rvt,
          )),
        this.Ivt.SetHelpButtonCallBack(this.dpt),
        this.yvt.length);
    await this.Ivt.RefreshTabItemByLengthAsync(e);
  }
  Gvt() {
    this.Tvt = new TabViewComponent_1.TabViewComponent(this.GetItem(1));
  }
  Nvt() {
    const t = this.Lvt?.TabViewName;
    let e = 0;
    var i;
    (e = t
      ? this.yvt.findIndex((e) => e.ChildViewName === t)
      : (i = this.Ivt.GetSelectedIndex()) !== CommonDefine_1.INVALID_VALUE
        ? i
        : 0),
      this.Ivt.SelectToggleByIndex(e);
  }
  K8e() {
    var e = this.yvt.findIndex(
      (e) => "CalabashLevelUpTabView" === e.ChildViewName,
    );
    0 <= e && this.Ivt.GetTabItemByIndex(e)?.BindRedDot("CalabashTab"),
      0 <=
        (e = this.yvt.findIndex(
          (e) => "VisionRecoveryTabView" === e.ChildViewName,
        )) && this.Ivt.GetTabItemByIndex(e)?.BindRedDot("VisionRecovery");
  }
  OnBeforeShow() {
    this.Dvt ? this.Nvt() : this.Tvt.SetCurrentTabViewState(!0),
      (this.Dvt = !1),
      this.K8e();
  }
  OnBeforeHide() {
    this.Ovt(), this.Tvt.SetCurrentTabViewState(!1);
  }
  OnAfterHide() {
    var e = this.Tvt.GetTabViewByTabName("VisionRecoveryTabView");
    void 0 !== e && e.RemoveAllVisionItemOutside();
  }
  Ovt() {
    var e = this.yvt.findIndex(
      (e) => "CalabashLevelUpTabView" === e.ChildViewName,
    );
    this.Ivt.GetTabItemByIndex(e)?.UnBindRedDot();
  }
  OnBeforeDestroy() {
    this.Ivt.Destroy(), this.Tvt.DestroyTabViewComponent();
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    const t = Number(e[0]);
    var i = this.Ivt.GetTabItemByIndex(
      this.yvt.findIndex((e) => e.Id === t),
    ).GetRootItem();
    if (i) return [i, i];
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
        "configParams",
        e,
      ]);
  }
}
exports.CalabashRootView = CalabashRootView;
//# sourceMappingURL=CalabashRootView.js.map

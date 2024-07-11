"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalabashRootView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem");
const TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent");
const HandBookController_1 = require("../../HandBook/HandBookController");
const HelpController_1 = require("../../Help/HelpController");
const CalabashTabItem_1 = require("./CalabashTabItem");
const CALABASH_LEVEL_UP_HELP_ID = 48;
const CALABASH_COLLECT_HELP_ID = 47;
const VISION_RECOVERY_HELP_ID = 70;
class CalabashRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.upt = void 0),
      (this.cpt = void 0),
      (this.mpt = void 0),
      (this.dpt = void 0),
      (this.Cpt = !1),
      (this.O3e = 0),
      (this.gpt = () => {
        this.CloseMe();
      }),
      (this.ift = () => {
        HelpController_1.HelpController.OpenHelpById(this.O3e);
      }),
      (this.fpt = (e) => {
        const t = this.upt.findIndex(
          (e) => e.ChildViewName === "CalabashCollectTabView",
        );
        this.dpt
          ? ((this.dpt.TabViewName = "CalabashCollectTabView"),
            (this.dpt.Param = e))
          : (this.dpt = { TabViewName: "CalabashCollectTabView", Param: e }),
          this.cpt.SelectToggleByIndex(t);
      }),
      (this.ppt = (e) => {
        const t = this.upt.findIndex(
          (e) => e.ChildViewName === "PhantomBattleFettersTabView",
        );
        this.dpt
          ? ((this.dpt.TabViewName = "PhantomBattleFettersTabView"),
            (this.dpt.Param = e))
          : (this.dpt = {
              TabViewName: "PhantomBattleFettersTabView",
              Param: e,
            }),
          this.cpt.SelectToggleByIndex(t);
      }),
      (this.vpt = () => {
        this.cpt?.HideItem();
      }),
      (this.Mpt = () => {
        this.cpt?.ShowItem();
      }),
      (this.Spt = (e) => {
        e
          ? this.UiViewSequence.PlaySequence("SwitchA")
          : this.UiViewSequence.PlaySequence("SwitchB");
      }),
      (this.fqe = (e) => new CalabashTabItem_1.CalabashTabItem()),
      (this.pqe = (e) => {
        const t = this.upt[e];
        const i = t.ChildViewName;
        var e = this.cpt.GetTabItemByIndex(e);
        const a = i === this.dpt?.TabViewName ? this.dpt?.Param : void 0;
        this.mpt.ToggleCallBack(t, i, e, a),
          this.dpt && (this.dpt.Param = void 0);
        let n = !1;
        i === "CalabashLevelUpTabView"
          ? ((this.O3e = CALABASH_LEVEL_UP_HELP_ID), (n = !0))
          : i === "CalabashCollectTabView"
            ? ((this.O3e = CALABASH_COLLECT_HELP_ID), (n = !0))
            : i === "VisionRecoveryTabView" &&
              ((this.O3e = VISION_RECOVERY_HELP_ID), (n = !0)),
          this.cpt.SetHelpButtonShowState(n),
          this.GetItem(3)?.SetUIActive(i === "CalabashCollectTabView");
      }),
      (this.yqe = (e) => {
        e = this.upt[e];
        return new CommonTabData_1.CommonTabData(
          e.Icon,
          new CommonTabTitleData_1.CommonTabTitleData(e.TabName),
        );
      }),
      (this.Ept = (e) => {
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
      (this.BtnBindInfo = [[2, this.Ept]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.JumpToCalabashCollect,
      this.fpt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.JumpToPhantomBattleFettersTabView,
        this.ppt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CalabashEnterInternalView,
        this.vpt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CalabashQuitInternalView,
        this.Mpt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshCalabashTabShowState,
        this.Spt,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.JumpToCalabashCollect,
      this.fpt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.JumpToPhantomBattleFettersTabView,
        this.ppt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CalabashEnterInternalView,
        this.vpt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CalabashQuitInternalView,
        this.Mpt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshCalabashTabShowState,
        this.Spt,
      );
  }
  async OnBeforeStartAsync() {
    (this.Cpt = !0),
      await HandBookController_1.HandBookController.SendIllustratedInfoRequestAsync(
        [1],
      ),
      ModelManager_1.ModelManager.CalabashModel.CheckSimpleStateSave();
    const e = ModelManager_1.ModelManager.CalabashModel.GetIfSimpleState()
      ? 0
      : 1;
    this.GetExtendToggle(2)?.SetToggleState(e),
      (this.dpt = this.OpenParam),
      this.ypt(),
      await this.Ipt(),
      this.Tpt();
  }
  ypt() {
    this.upt = ModelManager_1.ModelManager.CalabashModel?.GetViewTabList();
  }
  async Ipt() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(
      this.fqe,
      this.pqe,
      this.yqe,
    );
    var e =
      ((this.cpt =
        new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
          this.GetItem(0),
          e,
          this.gpt,
        )),
      this.cpt.SetHelpButtonCallBack(this.ift),
      this.upt.length);
    await this.cpt.RefreshTabItemByLengthAsync(e);
  }
  Tpt() {
    this.mpt = new TabViewComponent_1.TabViewComponent(this.GetItem(1));
  }
  Lpt() {
    const t = this.dpt?.TabViewName;
    let e = 0;
    let i;
    (e = t
      ? this.upt.findIndex((e) => e.ChildViewName === t)
      : (i = this.cpt.GetSelectedIndex()) !== CommonDefine_1.INVALID_VALUE
        ? i
        : 0),
      this.cpt.SelectToggleByIndex(e);
  }
  x6e() {
    const e = this.upt.findIndex(
      (e) => e.ChildViewName === "CalabashLevelUpTabView",
    );
    e >= 0 && this.cpt.GetTabItemByIndex(e)?.BindRedDot("CalabashTab");
  }
  OnBeforeShow() {
    this.Cpt ? this.Lpt() : this.mpt.SetCurrentTabViewState(!0),
      (this.Cpt = !1),
      this.x6e();
  }
  OnBeforeHide() {
    this.Dpt(), this.mpt.SetCurrentTabViewState(!1);
  }
  OnAfterHide() {
    const e = this.mpt.GetTabViewByTabName("VisionRecoveryTabView");
    void 0 !== e && e.RemoveAllVisionItemOutside();
  }
  Dpt() {
    const e = this.upt.findIndex(
      (e) => e.ChildViewName === "CalabashLevelUpTabView",
    );
    this.cpt.GetTabItemByIndex(e)?.UnBindRedDot();
  }
  OnBeforeDestroy() {
    this.cpt.Destroy(), this.mpt.DestroyTabViewComponent();
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    const t = Number(e[0]);
    const i = this.cpt
      .GetTabItemByIndex(this.upt.findIndex((e) => e.Id === t))
      .GetRootItem();
    if (i) return [i, i];
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
        "configParams",
        e,
      ]);
  }
}
exports.CalabashRootView = CalabashRootView;
// # sourceMappingURL=CalabashRootView.js.map

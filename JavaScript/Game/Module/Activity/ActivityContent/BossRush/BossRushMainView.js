"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossRushMainView = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData");
const TabComponentWithCaptionItem_1 = require("../../../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../../../Common/TabComponent/TabItem/CommonTabItem");
const TabViewComponent_1 = require("../../../Common/TabComponent/TabViewComponent");
class BossRushMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.upt = []),
      (this.TabViewComponent = void 0),
      (this.TabComponent = void 0),
      (this.q8i = 0),
      (this.nPr = (e) => {
        this.TabComponent?.SelectToggleByIndex(this.sPr(e));
      }),
      (this.fqe = (e, t) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.pqe = (e) => {
        this.q8i = e;
        const t = this.upt[e];
        const i = t.ChildViewName;
        var e = this.TabComponent.GetTabItemByIndex(e);
        this.TabViewComponent.ToggleCallBack(t, i, e);
      }),
      (this.yqe = (e) => new CommonTabData_1.CommonTabData("", void 0)),
      (this.W9t = () => {
        let e;
        this.q8i !== 0
          ? ((e = this.upt[this.q8i - 1].ChildViewName),
            (ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation = !0),
            this.nPr(e))
          : this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (ModelManager_1.ModelManager.BossRushModel.CurrentSelectActivityId =
      this.OpenParam),
      (this.upt =
        ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
          "BossRushMainView",
        )),
      await this.aPr(),
      (this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
        this.GetItem(1),
      ));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RequestChangeBossRushView,
      this.nPr,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RequestChangeBossRushView,
      this.nPr,
    );
  }
  OnStart() {
    this.TabComponent.SelectToggleByIndex(0, !0);
  }
  async aPr() {
    const e = new CommonTabComponentData_1.CommonTabComponentData(
      this.fqe,
      this.pqe,
      this.yqe,
    );
    (this.TabComponent =
      new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
        this.GetItem(0),
        e,
        this.W9t,
      )),
      this.TabComponent.SetScrollViewVisible(!1),
      (this.TabComponent.NeedCaptionSwitchWithToggle = !1),
      this.TabComponent.SetHelpButtonShowState(!1),
      this.TabComponent.SetTitle(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Activity_100805001_Title",
        ),
      ),
      await this.TabComponent.RefreshTabItemByLengthAsync(this.upt.length);
  }
  OnBeforeShow() {
    this.TabComponent?.SelectToggleByIndex(this.sPr("BossRushSelectView"), !0);
  }
  sPr(t) {
    for (let e = 0; e < this.upt.length; e++)
      if (this.upt[e].ChildViewName === t) return e;
    return 0;
  }
}
exports.BossRushMainView = BossRushMainView;
// # sourceMappingURL=BossRushMainView.js.map

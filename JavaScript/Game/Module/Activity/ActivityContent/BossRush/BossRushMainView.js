"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossRushMainView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData"),
  TabComponentWithCaptionItem_1 = require("../../../Common/TabComponent/TabComponentWithCaptionItem"),
  CommonTabItem_1 = require("../../../Common/TabComponent/TabItem/CommonTabItem"),
  TabViewComponent_1 = require("../../../Common/TabComponent/TabViewComponent");
class BossRushMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.yvt = []),
      (this.TabViewComponent = void 0),
      (this.TabComponent = void 0),
      (this.b9i = 0),
      (this.hyn = (e) => {
        this.TabComponent?.SelectToggleByIndex(this.lyn(e)),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.BossRushSubViewChanged,
            e,
          );
      }),
      (this.fqe = (e, t) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.pqe = (e) => {
        this.b9i = e;
        var t = this.yvt[e],
          i = t.ChildViewName,
          e = this.TabComponent.GetTabItemByIndex(e);
        this.TabViewComponent.ToggleCallBack(t, i, e);
      }),
      (this.yqe = (e) => new CommonTabData_1.CommonTabData("", void 0)),
      (this.W7t = () => {
        if (0 !== this.b9i) {
          if (this.b9i === this.lyn("BossRushRewardView"))
            return (
              (ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation =
                !0),
              ModelManager_1.ModelManager.BossRushModel.OnlyOpenRewardView
                ? ((ModelManager_1.ModelManager.BossRushModel.OnlyOpenRewardView =
                    !1),
                  void this.CloseMe())
                : void this.hyn("BossRushSelectView")
            );
          var e = this.yvt[this.b9i - 1].ChildViewName;
          (ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation = !0),
            this.hyn(e);
        } else
          ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
            ? ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon()
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
      (this.yvt =
        ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
          "BossRushMainView",
        )),
      await this._yn(),
      (this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
        this.GetItem(1),
      ));
  }
  OnBeforeDestroy() {
    this.TabViewComponent?.DestroyTabViewComponent(),
      (this.TabViewComponent = void 0);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RequestChangeBossRushView,
      this.hyn,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RequestChangeBossRushView,
      this.hyn,
    );
  }
  OnStart() {
    this.TabComponent?.SelectToggleByIndex(
      this.lyn(
        ModelManager_1.ModelManager.BossRushModel.OnlyOpenRewardView
          ? "BossRushRewardView"
          : "BossRushSelectView",
      ),
      !0,
    );
  }
  async _yn() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(
      this.fqe,
      this.pqe,
      this.yqe,
    );
    (this.TabComponent =
      new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
        this.GetItem(0),
        e,
        this.W7t,
      )),
      this.TabComponent.SetScrollViewVisible(!1),
      (this.TabComponent.NeedCaptionSwitchWithToggle = !1),
      this.TabComponent.SetHelpButtonShowState(!1),
      this.TabComponent.SetTitle(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Activity_100805001_Title",
        ),
      ),
      await this.TabComponent.RefreshTabItemByLengthAsync(this.yvt.length);
  }
  lyn(t) {
    for (let e = 0; e < this.yvt.length; e++)
      if (this.yvt[e].ChildViewName === t) return e;
    return 0;
  }
}
exports.BossRushMainView = BossRushMainView;
//# sourceMappingURL=BossRushMainView.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueIllustratedEventView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Time_1 = require("../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  RogueResThemeAll_1 = require("../../../../Core/Define/ConfigQuery/RogueResThemeAll"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem"),
  CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem"),
  TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent"),
  RogueResOutDefine_1 = require("../Define/RogueResOutDefine");
class RogueIllustratedEventView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.TabComponent = void 0),
      (this.TabViewComponent = void 0),
      (this.L6e = void 0),
      (this.TabDataList = []),
      (this.IsNormalEvent = !0),
      (this.u6c = 0),
      (this.j0c = () => {
        this.CloseMe();
      }),
      (this.CanToggleChange = (e) => {
        var t;
        return (
          !!Info_1.Info.IsInGamepad() ||
          ((t = CommonParamById_1.configCommonParamById.GetIntConfig(
            "panel_interval_time",
          )),
          !this.L6e) ||
          Time_1.Time.Now - this.L6e >= t
        );
      }),
      (this.R6e = (e, t) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.pqe = (e) => {
        this.L6e = Time_1.Time.Now;
        var t = this.TabDataList[e],
          i = this.d6c(),
          e = this.TabComponent.GetTabItemByIndex(e);
        this.TabViewComponent.ToggleCallBack(t, i, e, this.IsNormalEvent),
          (this.u6c = t.Config ? t.Config.Id : 0);
      }),
      (this.yqe = (e) => {
        e = this.TabDataList[e];
        return new CommonTabData_1.CommonTabData(
          e.Icon,
          new CommonTabTitleData_1.CommonTabTitleData(e.TabName),
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {}
  OnStart() {
    (this.IsNormalEvent = this.OpenParam), this.InitTabComponent();
  }
  OnBeforeShow() {
    this.Q0c();
  }
  OnBeforeDestroy() {
    this.TabComponent = void 0;
  }
  InitTabComponent() {
    (this.TabComponent =
      new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
        this.GetItem(0),
        new CommonTabComponentData_1.CommonTabComponentData(
          this.R6e,
          this.pqe,
          this.yqe,
        ),
        this.j0c,
      )),
      (this.L6e = void 0),
      this.TabComponent.SetCanChange(this.CanToggleChange),
      this.TabComponent.SetHelpButtonShowState(!1),
      (this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
        this.GetItem(1),
      ));
  }
  async Q0c() {
    var e = this.m6c(),
      t = this.TabDataList.toString() !== e.toString(),
      e = ((this.TabDataList = e), this.ICi(this.TabDataList));
    if ((await this.TabComponent.RefreshTabItemAsync(e, t), t)) {
      let t = 0;
      if (0 !== this.u6c)
        for (let e = 0; e < this.TabDataList.length; e++)
          if (this.TabDataList[e].Config.Id === this.u6c) {
            t = e;
            break;
          }
      this.TabComponent.SelectToggleByIndex(t, !0);
    }
  }
  d6c() {
    return ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
      "RogueEventIllustratedView",
    )[0].ChildViewName;
  }
  ICi(t) {
    var i = t.length,
      o = this.TabComponent.CreateTabItemDataByLength(i);
    for (let e = 0; e < i; e++) {
      var a = t[e];
      a &&
        ((o[e].RedDotName = this.IsNormalEvent
          ? "RogueResIllustratedNormalTab"
          : "RogueResIllustratedMapTab"),
        (o[e].RedDotUid = a.Config?.Id ?? 0));
    }
    return o;
  }
  m6c() {
    var t = new Array(),
      e = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
        "RogueEventIllustratedView",
      );
    if (0 !== e.length) {
      var e = e[0],
        i = new RogueResOutDefine_1.RogueIllustratedTabData(),
        o =
          ((i.TabType = this.IsNormalEvent ? 1 : 2),
          (i.Icon = e.Icon),
          (i.TabName = this.IsNormalEvent
            ? "UiDynamicTab_114_TabName_Normal"
            : "UiDynamicTab_114_TabName_Map"),
          (i.Index = e.TabIndex),
          (i.Config = void 0),
          t.push(i),
          RogueResThemeAll_1.configRogueResThemeAll.GetConfigList());
      if (o)
        for (let e = 0; e < o.length; e++) {
          var a = new RogueResOutDefine_1.RogueIllustratedTabData();
          (a.TabType = this.IsNormalEvent ? 1 : 2),
            (a.Icon = o[e].Icon),
            (a.TabName = o[e].Name),
            (a.Config = o[e]),
            (a.Index = e + 2),
            t.push(a);
        }
    }
    return t;
  }
}
exports.RogueIllustratedEventView = RogueIllustratedEventView;
//# sourceMappingURL=RogueIllustratedEventView.js.map

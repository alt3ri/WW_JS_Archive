"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueTokenIllustratedView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  RogueResThemeAll_1 = require("../../../../Core/Define/ConfigQuery/RogueResThemeAll"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem"),
  CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem"),
  TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent"),
  RogueResOutDefine_1 = require("../Define/RogueResOutDefine");
class RogueTokenIllustratedView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.TabComponent = void 0),
      (this.TabViewComponent = void 0),
      (this.L6e = void 0),
      (this.TabDataList = []),
      (this.u6c = 0),
      (this.j0c = () => {
        this.CloseMe();
      }),
      (this.yqe = (e) => {
        e = this.TabDataList[e];
        return new CommonTabData_1.CommonTabData(
          e.Icon,
          new CommonTabTitleData_1.CommonTabTitleData(e.TabName),
        );
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
          o = this.d6c(),
          e = this.TabComponent.GetTabItemByIndex(e),
          i = this.GetExtendToggle(3).GetToggleState();
        this.TabViewComponent.ToggleCallBack(t, o, e, i),
          (this.u6c = t.Config ? t.Config.Id : 0);
      }),
      (this.W0c = (e) => {
        ModelManager_1.ModelManager.RogueBattleModel.ChangeDescMode();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIExtendToggle],
    ];
  }
  OnStart() {
    this.GetItem(2)?.SetUIActive(!1),
      this.InitTabComponent(),
      this.InitExtendToggle();
  }
  OnBeforeShow() {
    this.Q0c();
  }
  OnBeforeDestroy() {
    this.TabComponent &&
      (this.TabComponent.Destroy(), (this.TabComponent = void 0));
  }
  InitTabComponent() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(
      this.R6e,
      this.pqe,
      this.yqe,
    );
    (this.TabComponent =
      new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
        this.GetItem(0),
        e,
        this.j0c,
      )),
      (this.L6e = void 0),
      this.TabComponent.SetHelpButtonShowState(!1),
      this.TabComponent.SetCanChange(this.CanToggleChange),
      (this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
        this.GetItem(1),
      ));
  }
  InitExtendToggle() {
    var e = this.GetExtendToggle(3),
      t = 1 === ModelManager_1.ModelManager.RogueBattleModel.DescMode ? 1 : 0;
    e?.SetToggleState(t), e?.OnStateChange.Add(this.W0c);
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
  ICi(t) {
    var o = t.length,
      i = this.TabComponent.CreateTabItemDataByLength(o);
    for (let e = 0; e < o; e++) {
      var n = t[e];
      n &&
        ((i[e].RedDotName = "RogueResIllustratedTokenTab"),
        (i[e].RedDotUid = n.Config ? n.Config.Id : 0));
    }
    return i;
  }
  d6c() {
    var e = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
      "RogueTokenIllustratedView",
    );
    return 0 === e.length
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Activity",
            77,
            "Missing Rogue Illustrated View Config, Use Default",
          ),
        "RogueIllustratedTokenTabView")
      : e[0].ChildViewName;
  }
  m6c() {
    var t = new Array(),
      e = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
        "RogueTokenIllustratedView",
      );
    if (0 !== e.length) {
      var e = e[0],
        o = new RogueResOutDefine_1.RogueIllustratedTabData(),
        i =
          ((o.TabType = 0),
          (o.Icon = e.Icon),
          (o.TabName = e.TabName),
          (o.Index = e.TabIndex),
          (o.Config = void 0),
          t.push(o),
          RogueResThemeAll_1.configRogueResThemeAll.GetConfigList());
      if (i)
        for (let e = 0; e < i.length; e++) {
          var n = new RogueResOutDefine_1.RogueIllustratedTabData();
          (n.TabType = 0),
            (n.Icon = i[e].Icon),
            (n.TabName = i[e].Name),
            (n.Config = i[e]),
            (n.Index = e + 2),
            t.push(n);
        }
    }
    return t;
  }
}
exports.RogueTokenIllustratedView = RogueTokenIllustratedView;
//# sourceMappingURL=RogueTokenIllustratedView.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapAreaShowView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
  TabComponent_1 = require("../../Common/TabComponent/TabComponent"),
  TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  MapAreaShowCountryItem_1 = require("./MapAreaShowCountryItem"),
  MapAreaShowItem_1 = require("./MapAreaShowItem"),
  MapAreaShowTabItem_1 = require("./MapAreaShowTabItem");
class MapAreaShowView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.OOl = void 0),
      (this.Ivt = void 0),
      (this.NOl = 0),
      (this.ZZt = void 0),
      (this.L6e = void 0),
      (this.AreaScroll = void 0),
      (this.FOl = void 0),
      (this.VOl = void 0),
      (this.HOl = 0),
      (this.DNl = void 0),
      (this.R6e = () => {
        return new MapAreaShowCountryItem_1.MapAreaShowCountryItem();
      }),
      (this.pqe = (e) => {
        (this.L6e = Time_1.Time.Now),
          (this.NOl = e),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Map", 69, "触发选择", ["index", this.NOl]),
          this.jOl();
      }),
      (this.WOl = (e) => {
        e = this.OOl[e];
        return new CommonTabData_1.CommonTabData(
          e.Icon,
          new CommonTabTitleData_1.CommonTabTitleData(e.TitleId, e),
        );
      }),
      (this.lyt = () => {
        this.CloseMe();
      }),
      (this.Bpt = () =>
        !!Info_1.Info.IsInGamepad() ||
        !this.L6e ||
        Time_1.Time.Now - this.L6e >= this.ZZt),
      (this.QOl = () => {
        var e, t;
        let i = !1;
        for ([e, t] of this.FOl.GetTabItemMap())
          t.UpdateView(this.VOl[e]), this.VOl[e].IsNoneState || (i = !0);
        this.FOl.SelectToggleByIndex(0, !0), this.GetItem(3).SetUIActive(i);
      }),
      (this.fqe = () => {
        return new MapAreaShowTabItem_1.MapAreaShowTabItem();
      }),
      (this.KOl = (e) => {
        (this.HOl = e), this.$Ol();
      }),
      (this.KPn = () => {
        return new MapAreaShowItem_1.MapAreaShowItem();
      }),
      (this.mNl = (e) => {
        this.DNl?.OnClickArea?.(e);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIHorizontalLayout],
      [5, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.OOl =
      ModelManager_1.ModelManager.ExploreProgressModel.GetExploreCountryDataList()),
      await this.InitCommonOneTab();
  }
  OnStart() {
    this.Ivt.SetHelpButtonShowState(!1);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.MapAreaShowClickArea,
      this.mNl,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.MapAreaShowClickArea,
      this.mNl,
    );
  }
  OnBeforeShow() {
    this.DNl = this.OpenParam;
    let t = 0;
    if (this.DNl) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Map",
          69,
          "params",
          ["国家id", this.DNl.CountryId],
          ["区域ID", this.DNl.AreaId],
        );
      for (let e = 0; e < this.OOl.length; e++) {
        var i = this.OOl[e];
        if (this.DNl.CountryId === i.CountryId) {
          t = e;
          break;
        }
      }
    }
    this.Ivt.SelectToggleByIndex(t, !0);
  }
  OnBeforeDestroy() {
    this.FOl && (this.FOl.Destroy(), (this.FOl = void 0));
  }
  async InitCommonOneTab() {
    this.ZZt = CommonParamById_1.configCommonParamById.GetIntConfig(
      "panel_interval_time",
    );
    var e = new CommonTabComponentData_1.CommonTabComponentData(
        this.R6e,
        this.pqe,
        this.WOl,
      ),
      e =
        ((this.Ivt =
          new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
            this.GetItem(0),
            e,
            this.lyt,
          )),
        this.Ivt.SetCanChange(this.Bpt),
        this.OOl.length),
      e = this.Ivt.CreateTabItemDataByLength(e);
    await this.Ivt.RefreshTabItemAsync(e);
  }
  jOl() {
    this.FOl ||
      (this.FOl = new TabComponent_1.TabComponent(
        this.GetItem(3),
        this.fqe,
        this.KOl,
        this.GetItem(5),
      ));
    var e = this.OOl[this.NOl],
      e = ((this.VOl = e.GetStateDataList()), this.VOl.length);
    this.FOl.RefreshTabItemByLength(e, this.QOl);
  }
  $Ol() {
    this.RefreshLoopScrollView();
  }
  RefreshLoopScrollView() {
    var e = this.GetLoopScrollViewComponent(1),
      e =
        (this.AreaScroll ||
          (this.AreaScroll = new LoopScrollView_1.LoopScrollView(
            e,
            this.GetItem(2).GetOwner(),
            this.KPn,
            !0,
          )),
        this.VOl[this.HOl].ExploreAreaDataList);
    this.AreaScroll.RefreshByData(e, !1, () => {}, !0);
  }
}
exports.MapAreaShowView = MapAreaShowView;
//# sourceMappingURL=MapAreaShowView.js.map

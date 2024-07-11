"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookQuestView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Time_1 = require("../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem"),
  CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../Util/ScrollView/GenericScrollViewNew"),
  HandBookController_1 = require("./HandBookController"),
  HandBookQuestItem_1 = require("./HandBookQuestItem");
class HandBookQuestView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.RoleRootUiCameraHandleData = void 0),
      (this.GenericScroll = void 0),
      (this.s8e = void 0),
      (this.WPn = []),
      (this.Ivt = void 0),
      (this.I6e = 0),
      (this.yvt = void 0),
      (this.L6e = void 0),
      (this.ZZt = void 0),
      (this.Refresh = () => {
        this.RefreshLoopScrollView(), this.RefreshCollectText();
      }),
      (this.R6e = (t, e) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.pqe = (t) => {
        (this.L6e = Time_1.Time.Now),
          (this.I6e = t),
          this.Refresh(),
          this.GetScrollViewWithScrollbar(1)
            .GetContent()
            .GetComponentByClass(UE.UIInturnAnimController.StaticClass())
            .Play();
      }),
      (this.yqe = (t) => {
        t = this.yvt[t];
        return new CommonTabData_1.CommonTabData(
          t.Icon,
          new CommonTabTitleData_1.CommonTabTitleData(t.Name),
        );
      }),
      (this.CanToggleChange = () =>
        !!Info_1.Info.IsInGamepad() ||
        !this.L6e ||
        Time_1.Time.Now - this.L6e >= this.ZZt),
      (this.KPn = () => {
        var t = new HandBookQuestItem_1.HandBookQuestItem();
        return this.WPn.push(t), t;
      }),
      (this.aei = (t, e) => t.Id - e.Id),
      (this.lyt = () => {
        this.CloseMe();
      }),
      (this.OnHandBookRead = (t, e) => {
        if (t === this.yvt[this.I6e].Type) {
          var i = this.WPn.length;
          for (let t = 0; t < i; t++) {
            var o = this.WPn[t].GetChildItemList(),
              n = o.length;
            for (let t = 0; t < n; t++) {
              var s = o[t];
              if (s.GetData()?.ConfigId === e) return void s.SetNewState(!1);
            }
          }
        }
      }),
      (this.OnPhotoSelect = (t) => {
        for (const e of this.WPn)
          for (const i of e.GetChildItemList())
            i.GetTog().SetToggleStateForce(0, !1, !0);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    this.QPn(), await this.InitCommonTabTitle();
  }
  OnStart() {
    this.Ivt?.SetHelpButtonShowState(!1), this.Refresh(), this.AddEvent();
  }
  AddEvent() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnHandBookDataInit,
      this.Refresh,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnHandBookDataUpdate,
        this.Refresh,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnHandBookRead,
        this.OnHandBookRead,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPhotoSelect,
        this.OnPhotoSelect,
      );
  }
  RemoveEvent() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnHandBookDataInit,
      this.Refresh,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnHandBookDataUpdate,
        this.Refresh,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnHandBookRead,
        this.OnHandBookRead,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPhotoSelect,
        this.OnPhotoSelect,
      );
  }
  OnBeforeShow() {
    let t = !0;
    for (const i of this.WPn)
      for (const o of i.GetChildItemList()) {
        var e = o.GetTog();
        t && o.GetIsUnlock()
          ? (e.SetToggleStateForce(1, !1, !0), (t = !1))
          : e.SetToggleStateForce(0, !1, !0);
      }
    this.Ivt.SelectToggleByIndex(this.I6e);
  }
  async InitCommonTabTitle() {
    this.ZZt = CommonParamById_1.configCommonParamById.GetIntConfig(
      "panel_interval_time",
    );
    var t = new CommonTabComponentData_1.CommonTabComponentData(
        this.R6e,
        this.pqe,
        this.yqe,
      ),
      t =
        ((this.Ivt =
          new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
            this.GetItem(0),
            t,
            this.lyt,
          )),
        this.Ivt.SetCanChange(this.CanToggleChange),
        this.yvt.length),
      t = this.Ivt.CreateTabItemDataByLength(t);
    await this.Ivt.RefreshTabItemAsync(t);
  }
  RefreshLoopScrollView() {
    this.s8e ||
      (this.s8e =
        ConfigManager_1.ConfigManager.HandBookConfig.GetPlotTypeConfigList());
    var e = [],
      t = this.yvt[this.I6e].Type;
    for (const s of this.s8e)
      if (s.Type === t) {
        var i =
          ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(
            s.Id,
          );
        if (i) {
          let t = !0;
          for (const r of i) {
            var o = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
              s.Type,
              r.Id,
            );
            t = void 0 === o && t;
          }
          t || e.push(s);
        }
      }
    e.sort(this.aei);
    var n = this.GetScrollViewWithScrollbar(1);
    this.GenericScroll ||
      (this.GenericScroll = new GenericScrollViewNew_1.GenericScrollViewNew(
        n,
        this.KPn,
        this.GetItem(3).GetOwner(),
      )),
      e.length <= 0
        ? (this.GenericScroll.SetActive(!1), this.GetItem(4)?.SetUIActive(!0))
        : (this.GenericScroll.SetActive(!0),
          this.GetItem(4)?.SetUIActive(!1),
          this.GenericScroll.RefreshByData(e, () => {
            var t = this.GenericScroll?.GetItemByIndex(0);
            t && this.GenericScroll?.ScrollTo(t);
          }));
  }
  RefreshCollectText() {
    var t = HandBookController_1.HandBookController.GetCollectProgress(
      this.yvt[this.I6e].Type,
    );
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "RoleExp", t[0], t[1]),
      this.GetText(2)?.SetUIActive(!1);
  }
  OnBeforeDestroy() {
    (this.RoleRootUiCameraHandleData = void 0),
      (this.GenericScroll = void 0),
      (this.s8e = []),
      (this.WPn = []),
      this.RemoveEvent();
  }
  QPn() {
    this.yvt = ConfigManager_1.ConfigManager.HandBookConfig.GetQuestTabList();
  }
}
exports.HandBookQuestView = HandBookQuestView;
//# sourceMappingURL=HandBookQuestView.js.map

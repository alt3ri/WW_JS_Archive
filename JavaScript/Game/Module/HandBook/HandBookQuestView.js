"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookQuestView = void 0);
const UE = require("ue");
const Time_1 = require("../../../Core/Common/Time");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem");
const LguiUtil_1 = require("../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../Util/ScrollView/GenericScrollViewNew");
const HandBookController_1 = require("./HandBookController");
const HandBookQuestItem_1 = require("./HandBookQuestItem");
class HandBookQuestView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.RoleRootUiCameraHandleData = void 0),
      (this.GenericScroll = void 0),
      (this.KVe = void 0),
      (this.mUn = []),
      (this.cpt = void 0),
      (this._Ve = 0),
      (this.upt = void 0),
      (this.cVe = void 0),
      (this.Zzt = void 0),
      (this.Refresh = () => {
        this.RefreshLoopScrollView(), this.RefreshCollectText();
      }),
      (this.dVe = (t, e) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.pqe = (t) => {
        (this.cVe = Time_1.Time.Now), (this._Ve = t), this.Refresh();
      }),
      (this.yqe = (t) => {
        t = this.upt[t];
        return new CommonTabData_1.CommonTabData(
          t.Icon,
          new CommonTabTitleData_1.CommonTabTitleData(t.Name),
        );
      }),
      (this.CanToggleChange = () =>
        !!ModelManager_1.ModelManager.PlatformModel.IsGamepad() ||
        !this.cVe ||
        Time_1.Time.Now - this.cVe >= this.Zzt),
      (this.dUn = () => {
        const t = new HandBookQuestItem_1.HandBookQuestItem();
        return this.mUn.push(t), t;
      }),
      (this.aZt = (t, e) => t.Id - e.Id),
      (this.JSt = () => {
        this.CloseMe();
      }),
      (this.OnHandBookRead = (t, e) => {
        if (t === this.upt[this._Ve].Type) {
          const i = this.mUn.length;
          for (let t = 0; t < i; t++) {
            const o = this.mUn[t].GetChildItemList();
            const n = o.length;
            for (let t = 0; t < n; t++) {
              const s = o[t];
              if (s.GetData()?.ConfigId === e) return void s.SetNewState(!1);
            }
          }
        }
      }),
      (this.OnPhotoSelect = (t) => {
        for (const i of this.mUn)
          for (const o of i.GetChildItemList()) {
            const e = o.GetTog();
            o.GetData()?.ConfigId === t
              ? e.SetToggleStateForce(1, !1, !0)
              : e.SetToggleStateForce(0, !1, !0);
          }
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
    this.CUn(), await this.InitCommonTabTitle();
  }
  OnStart() {
    this.cpt?.SetHelpButtonShowState(!1), this.Refresh(), this.AddEvent();
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
    for (const i of this.mUn)
      for (const o of i.GetChildItemList()) {
        const e = o.GetTog();
        t && o.GetIsUnlock()
          ? (e.SetToggleStateForce(1, !1, !0), (t = !1))
          : e.SetToggleStateForce(0, !1, !0);
      }
    this.cpt.SelectToggleByIndex(this._Ve);
  }
  async InitCommonTabTitle() {
    this.Zzt = CommonParamById_1.configCommonParamById.GetIntConfig(
      "panel_interval_time",
    );
    var t = new CommonTabComponentData_1.CommonTabComponentData(
      this.dVe,
      this.pqe,
      this.yqe,
    );
    var t =
      ((this.cpt =
        new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
          this.GetItem(0),
          t,
          this.JSt,
        )),
      this.cpt.SetCanChange(this.CanToggleChange),
      this.upt.length);
    var t = this.cpt.CreateTabItemDataByLength(t);
    await this.cpt.RefreshTabItemAsync(t);
  }
  RefreshLoopScrollView() {
    this.KVe ||
      (this.KVe =
        ConfigManager_1.ConfigManager.HandBookConfig.GetPlotTypeConfigList());
    const e = [];
    const t = this.upt[this._Ve].Type;
    for (const s of this.KVe)
      if (s.Type === t) {
        const i =
          ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(
            s.Id,
          );
        if (i) {
          let t = !0;
          for (const a of i) {
            const o = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
              s.Type,
              a.Id,
            );
            t = void 0 === o && t;
          }
          t || e.push(s);
        }
      }
    e.sort(this.aZt);
    const n = this.GetScrollViewWithScrollbar(1);
    this.GenericScroll ||
      (this.GenericScroll = new GenericScrollViewNew_1.GenericScrollViewNew(
        n,
        this.dUn,
        this.GetItem(3).GetOwner(),
      )),
      e.length <= 0
        ? (this.GenericScroll.SetActive(!1), this.GetItem(4)?.SetUIActive(!0))
        : (this.GenericScroll.SetActive(!0),
          this.GetItem(4)?.SetUIActive(!1),
          this.GenericScroll.RefreshByData(e, () => {
            const t = this.GenericScroll?.GetItemByIndex(0);
            t && this.GenericScroll?.ScrollTo(t);
          }));
  }
  RefreshCollectText() {
    const t = HandBookController_1.HandBookController.GetCollectProgress(
      this.upt[this._Ve].Type,
    );
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "RoleExp", t[0], t[1]),
      this.GetText(2)?.SetUIActive(!1);
  }
  OnBeforeDestroy() {
    (this.RoleRootUiCameraHandleData = void 0),
      (this.GenericScroll = void 0),
      (this.KVe = []),
      (this.mUn = []),
      this.RemoveEvent();
  }
  CUn() {
    this.upt = ConfigManager_1.ConfigManager.HandBookConfig.GetQuestTabList();
  }
}
exports.HandBookQuestView = HandBookQuestView;
// # sourceMappingURL=HandBookQuestView.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRecoveryChoosePanel = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence"),
  CommonItemSelectView_1 = require("../../../Common/CommonItemSelectView"),
  FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance"),
  SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance"),
  ItemTipsComponent_1 = require("../../../Common/ItemTips/ItemTipsComponent"),
  ItemTipsUtilTool_1 = require("../../../Common/ItemTips/ItemTipsUtilTool"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
class VisionRecoveryChoosePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.UiViewSequence = void 0),
      (this.Fvt = void 0),
      (this.Vvt = void 0),
      (this.Mpt = void 0),
      (this.vpt = void 0),
      (this.Hvt = void 0),
      (this.jvt = void 0),
      (this.OnClickMask = () => {
        this.GetItem(3).SetUIActive(!1),
          this.GetButton(2).RootUIComp.SetUIActive(!1);
      }),
      (this.OnClickCloseBtn = () => {
        this.Hvt ? this.Hvt() : this.SetActive(!1);
      }),
      (this.Wvt = (e, t) => {
        e = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(e, t);
        (e.CanClickLockButton = this.Kvt),
          this.Vvt.Refresh(e),
          this.GetItem(3).SetUIActive(!0),
          this.GetButton(2).RootUIComp.SetUIActive(!0);
      }),
      (this.Kvt = (t) => {
        var i = this.Fvt.GetCurrentSelectedData(),
          s = i?.length;
        for (let e = 0; e < s; e++)
          if (i[e].IncId === t)
            return (
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "NoLock",
              ),
              !1
            );
        return !0;
      }),
      (this.Qvt = (e) => {
        this.Fvt.UpdateByDataList(e), this.jvt && this.jvt(e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [2, this.OnClickMask],
        [6, this.OnClickCloseBtn],
      ]);
  }
  OnBeforeCreateImplement() {
    (this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this)),
      this.AddUiBehavior(this.UiViewSequence);
  }
  async OnBeforeStartAsync() {
    (this.Vvt = new ItemTipsComponent_1.ItemTipsComponentContentComponent()),
      await this.Vvt.CreateByActorAsync(this.GetItem(3).GetOwner());
  }
  OnStart() {
    (this.Fvt = new CommonItemSelectView_1.CommonItemSelectView(
      this.GetItem(0),
    )),
      (this.Mpt = new SortEntrance_1.SortEntrance(this.GetItem(5), this.Qvt)),
      (this.vpt = new FilterEntrance_1.FilterEntrance(
        this.GetItem(4),
        this.Qvt,
      ));
  }
  OnAfterShow() {
    this.OnAddEventListener();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSelectItemAdd,
      this.Wvt,
    );
  }
  RefreshUi(e) {
    this.Fvt.UpdateSelectableComponent(
      e.SelectableComponentType,
      e.ItemDataBaseList,
      e.SelectedDataList,
      e.SelectableComponentData,
      e.ExpData,
    ),
      this.Mpt.SetSortToggleState(e.InitSortToggleState),
      this.UpdateFilterComponent(e.UseWayId, e.ItemDataBaseList);
  }
  UpdateFilterComponent(e, t) {
    let i = !1,
      s = !1;
    var n;
    e &&
      ((n = ConfigManager_1.ConfigManager.SortConfig.GetSortId(e)) &&
        0 < n &&
        (i = !0),
      (n = ConfigManager_1.ConfigManager.FilterConfig.GetFilterId(e))) &&
      0 < n &&
      (s = !0),
      this.Mpt.GetRootItem().SetUIActive(i),
      this.vpt.GetRootItem().SetUIActive(s),
      i || s
        ? (i && this.Mpt.UpdateData(e, t), s && this.vpt.UpdateData(e, t))
        : this.Fvt.UpdateByDataList(t);
  }
  BindClickCloseCallBack(e) {
    this.Hvt = e;
  }
  BindFilterSortRefresh(e) {
    this.jvt = e;
  }
  OnBeforeHide() {
    this.OnRemoveEventListener();
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSelectItemAdd,
      this.Wvt,
    );
  }
  OnBeforeDestroy() {
    this.Fvt.Destroy(), this.Vvt.Destroy();
  }
}
exports.VisionRecoveryChoosePanel = VisionRecoveryChoosePanel;
//# sourceMappingURL=VisionRecoveryChoosePanel.js.map

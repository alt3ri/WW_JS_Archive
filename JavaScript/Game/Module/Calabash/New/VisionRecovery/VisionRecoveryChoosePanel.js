"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRecoveryChoosePanel = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const CommonItemSelectView_1 = require("../../../Common/CommonItemSelectView");
const FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance");
const SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance");
const ItemTipsComponent_1 = require("../../../Common/ItemTips/ItemTipsComponent");
const ItemTipsUtilTool_1 = require("../../../Common/ItemTips/ItemTipsUtilTool");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
class VisionRecoveryChoosePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.UiViewSequence = void 0),
      (this.Upt = void 0),
      (this.Apt = void 0),
      (this.hft = void 0),
      (this.aft = void 0),
      (this.Ppt = void 0),
      (this.xpt = void 0),
      (this.OnClickMask = () => {
        this.GetItem(3).SetUIActive(!1),
          this.GetButton(2).RootUIComp.SetUIActive(!1);
      }),
      (this.OnClickCloseBtn = () => {
        this.Ppt ? this.Ppt() : this.SetActive(!1);
      }),
      (this.wpt = (e, t) => {
        e = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(e, t);
        (e.CanClickLockButton = this.Bpt),
          this.Apt.Refresh(e),
          this.GetItem(3).SetUIActive(!0),
          this.GetButton(2).RootUIComp.SetUIActive(!0);
      }),
      (this.Bpt = (t) => {
        const i = this.Upt.GetCurrentSelectedData();
        const s = i?.length;
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
      (this.bpt = (e) => {
        this.Upt.UpdateByDataList(e), this.xpt && this.xpt(e);
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
    (this.Apt = new ItemTipsComponent_1.ItemTipsComponent()),
      await this.Apt.CreateByActorAsync(this.GetItem(3).GetOwner());
  }
  OnStart() {
    (this.Upt = new CommonItemSelectView_1.CommonItemSelectView(
      this.GetItem(0),
    )),
      (this.hft = new SortEntrance_1.SortEntrance(this.GetItem(5), this.bpt)),
      (this.aft = new FilterEntrance_1.FilterEntrance(
        this.GetItem(4),
        this.bpt,
      ));
  }
  OnAfterShow() {
    this.OnAddEventListener();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSelectItemAdd,
      this.wpt,
    );
  }
  RefreshUi(e) {
    this.Upt.UpdateSelectableComponent(
      e.SelectableComponentType,
      e.ItemDataBaseList,
      e.SelectedDataList,
      e.SelectableComponentData,
      e.ExpData,
    ),
      this.hft.SetSortToggleState(e.InitSortToggleState),
      this.UpdateFilterComponent(e.UseWayId, e.ItemDataBaseList);
  }
  UpdateFilterComponent(e, t) {
    let i = !1;
    let s = !1;
    let n;
    e &&
      ((n = ConfigManager_1.ConfigManager.SortConfig.GetSortId(e)) &&
        n > 0 &&
        (i = !0),
      (n = ConfigManager_1.ConfigManager.FilterConfig.GetFilterId(e))) &&
      n > 0 &&
      (s = !0),
      this.hft.GetRootItem().SetUIActive(i),
      this.aft.GetRootItem().SetUIActive(s),
      i || s
        ? (i && this.hft.UpdateData(e, t), s && this.aft.UpdateData(e, t))
        : this.Upt.UpdateByDataList(t);
  }
  BindClickCloseCallBack(e) {
    this.Ppt = e;
  }
  BindFilterSortRefresh(e) {
    this.xpt = e;
  }
  OnBeforeHide() {
    this.OnRemoveEventListener();
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSelectItemAdd,
      this.wpt,
    );
  }
  OnBeforeDestroy() {
    this.Upt.Destroy(), this.Apt.Destroy();
  }
}
exports.VisionRecoveryChoosePanel = VisionRecoveryChoosePanel;
// # sourceMappingURL=VisionRecoveryChoosePanel.js.map

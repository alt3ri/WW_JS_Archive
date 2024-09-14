"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemSelectView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  CommonItemSelectView_1 = require("./CommonItemSelectView"),
  FilterEntrance_1 = require("./FilterSort/Filter/View/FilterEntrance"),
  SortEntrance_1 = require("./FilterSort/Sort/View/SortEntrance"),
  ItemTipsComponent_1 = require("./ItemTips/ItemTipsComponent"),
  ItemTipsUtilTool_1 = require("./ItemTips/ItemTipsUtilTool");
class ItemSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Fvt = void 0),
      (this.GXs = void 0),
      (this.Mpt = void 0),
      (this.vpt = void 0),
      (this.OnClickMask = () => {
        this.GetItem(3).SetUIActive(!1), this.CloseMe();
      }),
      (this.Wvt = (e, t) => {
        e = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(e, t);
        this.GXs.Refresh(e), this.GetItem(3).SetUIActive(!0);
      }),
      (this.Qvt = (e) => {
        this.Fvt.UpdateByDataList(e);
      }),
      (this.SNa = (t) => {
        var e,
          i,
          s = this.OpenParam;
        void 0 === s ||
          void 0 === s.ItemDataBaseList ||
          (e = s.ItemDataBaseList.findIndex((e) => e.GetUniqueId() === t)) <
            0 ||
          ((i = s.ItemDataBaseList[e].GetIsLock()),
          void 0 !== s.SelectedDataList &&
            i &&
            0 <= (i = s.SelectedDataList.findIndex((e) => e.IncId === t)) &&
            s.SelectedDataList.splice(i, 1),
          this.Fvt.UpdateSelectableComponent(
            s.SelectableComponentType,
            s.ItemDataBaseList,
            s.SelectedDataList,
            s.SelectableComponentData,
            s.ExpData,
          ),
          this.Fvt.RefreshPartByIndex(e),
          this.Fvt.UpdateChangeItemSelectList());
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
    ]),
      (this.BtnBindInfo = [[2, this.OnClickMask]]);
  }
  async OnBeforeStartAsync() {
    (this.GXs = new ItemTipsComponent_1.ItemTipsComponentContentComponent()),
      await this.GXs.CreateByActorAsync(this.GetItem(3).GetOwner());
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
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSelectItemAdd,
      this.Wvt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnItemFuncValueChange,
        this.SNa,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSelectItemAdd,
      this.Wvt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnItemFuncValueChange,
        this.SNa,
      );
  }
  OnBeforeShow() {
    var e = this.OpenParam;
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
  OnBeforeDestroy() {
    this.Fvt.Destroy(), this.GXs.Destroy();
  }
}
exports.ItemSelectView = ItemSelectView;
//# sourceMappingURL=ItemSelectView.js.map

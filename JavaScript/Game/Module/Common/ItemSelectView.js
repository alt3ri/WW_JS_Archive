"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemSelectView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  CommonItemSelectView_1 = require("./CommonItemSelectView"),
  FilterEntrance_1 = require("./FilterSort/Filter/View/FilterEntrance"),
  SortEntrance_1 = require("./FilterSort/Sort/View/SortEntrance"),
  ItemTipsComponent_1 = require("./ItemTips/ItemTipsComponent"),
  ItemTipsUtilTool_1 = require("./ItemTips/ItemTipsUtilTool");
class ItemSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Upt = void 0),
      (this.Apt = void 0),
      (this.hft = void 0),
      (this.aft = void 0),
      (this.OnClickMask = () => {
        this.GetItem(3).SetUIActive(!1), this.CloseMe();
      }),
      (this.wpt = (e, t) => {
        e = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(e, t);
        (e.CanClickLockButton = this.Bpt),
          this.Apt.Refresh(e),
          this.GetItem(3).SetUIActive(!0);
      }),
      (this.Bpt = (t) => {
        var i = this.Upt.GetCurrentSelectedData(),
          r = i?.length;
        for (let e = 0; e < r; e++)
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
        this.Upt.UpdateByDataList(e);
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
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSelectItemAdd,
      this.wpt,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSelectItemAdd,
      this.wpt,
    );
  }
  OnBeforeShow() {
    var e = this.OpenParam;
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
    let i = !1,
      r = !1;
    var s;
    e &&
      ((s = ConfigManager_1.ConfigManager.SortConfig.GetSortId(e)) &&
        0 < s &&
        (i = !0),
      (s = ConfigManager_1.ConfigManager.FilterConfig.GetFilterId(e))) &&
      0 < s &&
      (r = !0),
      this.hft.GetRootItem().SetUIActive(i),
      this.aft.GetRootItem().SetUIActive(r),
      i || r
        ? (i && this.hft.UpdateData(e, t), r && this.aft.UpdateData(e, t))
        : this.Upt.UpdateByDataList(t);
  }
  OnBeforeDestroy() {
    this.Upt.Destroy(), this.Apt.Destroy();
  }
}
exports.ItemSelectView = ItemSelectView;
//# sourceMappingURL=ItemSelectView.js.map

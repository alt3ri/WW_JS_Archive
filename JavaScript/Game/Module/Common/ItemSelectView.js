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
      (this.Fvt = void 0),
      (this.vQs = void 0),
      (this.Mpt = void 0),
      (this.vpt = void 0),
      (this.OnClickMask = () => {
        this.GetItem(3).SetUIActive(!1), this.CloseMe();
      }),
      (this.Wvt = (e, t) => {
        e = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(e, t);
        (e.CanClickLockButton = this.Kvt),
          this.vQs.Refresh(e),
          this.GetItem(3).SetUIActive(!0);
      }),
      (this.Kvt = (t) => {
        var i = this.Fvt.GetCurrentSelectedData(),
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
      (this.Qvt = (e) => {
        this.Fvt.UpdateByDataList(e);
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
    (this.vQs = new ItemTipsComponent_1.ItemTipsComponentContentComponent()),
      await this.vQs.CreateByActorAsync(this.GetItem(3).GetOwner());
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
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSelectItemAdd,
      this.Wvt,
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
      r = !1;
    var s;
    e &&
      ((s = ConfigManager_1.ConfigManager.SortConfig.GetSortId(e)) &&
        0 < s &&
        (i = !0),
      (s = ConfigManager_1.ConfigManager.FilterConfig.GetFilterId(e))) &&
      0 < s &&
      (r = !0),
      this.Mpt.GetRootItem().SetUIActive(i),
      this.vpt.GetRootItem().SetUIActive(r),
      i || r
        ? (i && this.Mpt.UpdateData(e, t), r && this.vpt.UpdateData(e, t))
        : this.Fvt.UpdateByDataList(t);
  }
  OnBeforeDestroy() {
    this.Fvt.Destroy(), this.vQs.Destroy();
  }
}
exports.ItemSelectView = ItemSelectView;
//# sourceMappingURL=ItemSelectView.js.map

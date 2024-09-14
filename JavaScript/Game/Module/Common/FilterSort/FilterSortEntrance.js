"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FilterSortEntrance = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  FilterEntrance_1 = require("./Filter/View/FilterEntrance"),
  SortEntrance_1 = require("./Sort/View/SortEntrance");
class FilterSortEntrance extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super(),
      (this.UpdateList = t),
      (this.vpt = void 0),
      (this.Mpt = void 0),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    (this.vpt = new FilterEntrance_1.FilterEntrance(
      this.GetItem(0),
      this.UpdateList,
    )),
      (this.Mpt = new SortEntrance_1.SortEntrance(
        this.GetItem(1),
        this.UpdateList,
      ));
  }
  UpdateData(e, t) {
    this.vpt.UpdateData(e, t), this.Mpt.UpdateData(e, t);
  }
  UpdateDataWithConfig(e, t, r) {
    this.vpt.UpdateData(e, r), this.Mpt.UpdateDataWithConfig(e, t, r);
  }
  ClearData(e) {
    var t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterId(e),
      t =
        (t && ModelManager_1.ModelManager.FilterModel.ClearData(t),
        ConfigManager_1.ConfigManager.SortConfig.GetSortId(e));
    t && ModelManager_1.ModelManager.SortModel.DeleteSortResultData(t);
  }
}
exports.FilterSortEntrance = FilterSortEntrance;
//# sourceMappingURL=FilterSortEntrance.js.map

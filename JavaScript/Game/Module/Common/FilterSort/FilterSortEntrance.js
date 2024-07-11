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
  constructor(e, r) {
    super(),
      (this.UpdateList = r),
      (this.aft = void 0),
      (this.hft = void 0),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    (this.aft = new FilterEntrance_1.FilterEntrance(
      this.GetItem(0),
      this.UpdateList,
    )),
      (this.hft = new SortEntrance_1.SortEntrance(
        this.GetItem(1),
        this.UpdateList,
      ));
  }
  UpdateData(e, r) {
    this.aft.UpdateData(e, r), this.hft.UpdateData(e, r);
  }
  ClearData(e) {
    var r = ConfigManager_1.ConfigManager.FilterConfig.GetFilterId(e),
      r =
        (r && ModelManager_1.ModelManager.FilterModel.ClearData(r),
        ConfigManager_1.ConfigManager.SortConfig.GetSortId(e));
    r && ModelManager_1.ModelManager.SortModel.DeleteSortResultData(r);
  }
}
exports.FilterSortEntrance = FilterSortEntrance;
//# sourceMappingURL=FilterSortEntrance.js.map

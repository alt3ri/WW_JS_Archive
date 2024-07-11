"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FilterEntrance = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const FilterSortController_1 = require("../../FilterSortController");
const FilterViewData_1 = require("../Model/FilterViewData");
class FilterEntrance extends UiPanelBase_1.UiPanelBase {
  constructor(t, e) {
    super(),
      (this.UpdateDataListFunction = e),
      (this.rLt = void 0),
      (this.uft = []),
      (this.nLt = []),
      (this.sLt = void 0),
      (this.Mne = 0),
      (this.aLt = () => {
        const t = new FilterViewData_1.FilterViewData(this.Mne, this.cIt);
        FilterSortController_1.FilterSortController.OpenFilterView(t);
      }),
      (this.cIt = () => {
        this.C4e(), this.Ift(!1);
      }),
      (this.gPe = () => {
        ModelManager_1.ModelManager.FilterModel.ClearData(this.Mne),
          this.GetItem(1).SetUIActive(!1),
          this.Ift(!1);
      }),
      (this.hLt = (t) => {
        this.Mne === t && (this.Ift(!0), this.C4e());
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this.aLt],
        [3, this.gPe],
      ]);
  }
  OnStart() {
    this.GetItem(1).SetUIActive(!1), this.AddEventListener();
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.FilterModel.DeleteFilterResultData(this.Mne),
      this.RemoveEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnFilterDataUpdate,
      this.hLt,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnFilterDataUpdate,
      this.hLt,
    );
  }
  C4e() {
    const t = this.rLt.ShowAllFilterContent();
    const e = this.GetItem(1);
    StringUtils_1.StringUtils.IsBlank(t)
      ? e.SetUIActive(!1)
      : (e.SetUIActive(!0), this.GetText(2).SetText(t));
  }
  Ift(t) {
    var e = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(
      this.Mne,
    );
    var i = e.DataType;
    var s = this.rLt.GetSelectRuleData();
    var i = ModelManager_1.ModelManager.FilterModel.GetFilterList(
      this.uft,
      i,
      e.IsSupportSelectAll,
      s,
    );
    var e = ConfigManager_1.ConfigManager.SortConfig.GetSortId(this.sLt);
    var s = ModelManager_1.ModelManager.SortModel.GetSortResultData(e);
    s &&
      ModelManager_1.ModelManager.SortModel.SortDataList(i, e, s, ...this.nLt),
      this.UpdateDataListFunction?.(i, t, 0);
  }
  lLt(t) {
    (this.sLt = t),
      (this.Mne = ConfigManager_1.ConfigManager.FilterConfig.GetFilterId(t));
  }
  _Lt() {
    (this.rLt = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(
      this.Mne,
    )),
      this.rLt ||
        ((this.rLt = new FilterViewData_1.FilterResultData()),
        this.rLt.SetConfigId(this.Mne),
        ModelManager_1.ModelManager.FilterModel.SetFilterResultData(
          this.Mne,
          this.rLt,
        ));
  }
  uLt() {
    this.SetActive(this.Mne > 0);
  }
  UpdateData(t, e, ...i) {
    this.lLt(t),
      this.uLt(),
      this.Mne <= 0 ||
        ((this.uft = e),
        (this.nLt = i),
        this._Lt(),
        this.C4e(),
        ConfigManager_1.ConfigManager.SortConfig.GetSortId(this.sLt) === 0 &&
          this.Ift(!0));
  }
}
exports.FilterEntrance = FilterEntrance;
// # sourceMappingURL=FilterEntrance.js.map

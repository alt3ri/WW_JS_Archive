"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FilterEntrance = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  FilterSortController_1 = require("../../FilterSortController"),
  FilterViewData_1 = require("../Model/FilterViewData");
class FilterEntrance extends UiPanelBase_1.UiPanelBase {
  constructor(t, e) {
    super(),
      (this.UpdateDataListFunction = e),
      (this.hDt = void 0),
      (this.ypt = []),
      (this.lDt = []),
      (this._Dt = void 0),
      (this.Mne = 0),
      (this.uDt = () => {
        var t = new FilterViewData_1.FilterViewData(this.Mne, this.vTt);
        FilterSortController_1.FilterSortController.OpenFilterView(t);
      }),
      (this.vTt = () => {
        this.P5e(), this.qpt(!1);
      }),
      (this.gPe = () => {
        ModelManager_1.ModelManager.FilterModel.ClearData(this.Mne),
          this.GetItem(1).SetUIActive(!1),
          this.qpt(!1);
      }),
      (this.cDt = (t) => {
        this.Mne === t && (this.qpt(!0), this.P5e());
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
        [0, this.uDt],
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
      this.cDt,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnFilterDataUpdate,
      this.cDt,
    );
  }
  P5e() {
    var t = this.hDt.ShowAllFilterContent(),
      e = this.GetItem(1);
    StringUtils_1.StringUtils.IsBlank(t)
      ? e.SetUIActive(!1)
      : (e.SetUIActive(!0), this.GetText(2).SetText(t));
  }
  qpt(t) {
    var e = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(
        this.Mne,
      ),
      i = e.DataType,
      s = this.hDt.GetSelectRuleData(),
      i = ModelManager_1.ModelManager.FilterModel.GetFilterList(
        this.ypt,
        i,
        e.IsSupportSelectAll,
        s,
      ),
      e = ConfigManager_1.ConfigManager.SortConfig.GetSortId(this._Dt),
      s = ModelManager_1.ModelManager.SortModel.GetSortResultData(e);
    s &&
      ModelManager_1.ModelManager.SortModel.SortDataList(i, e, s, ...this.lDt),
      this.UpdateDataListFunction?.(i, t, 0);
  }
  mDt(t) {
    (this._Dt = t),
      (this.Mne = ConfigManager_1.ConfigManager.FilterConfig.GetFilterId(t));
  }
  dDt() {
    (this.hDt = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(
      this.Mne,
    )),
      this.hDt ||
        ((this.hDt = new FilterViewData_1.FilterResultData()),
        this.hDt.SetConfigId(this.Mne),
        ModelManager_1.ModelManager.FilterModel.SetFilterResultData(
          this.Mne,
          this.hDt,
        ));
  }
  CDt() {
    this.SetActive(0 < this.Mne);
  }
  UpdateData(t, e, ...i) {
    this.mDt(t),
      this.CDt(),
      this.Mne <= 0 ||
        ((this.ypt = e),
        (this.lDt = i),
        this.dDt(),
        this.P5e(),
        0 === ConfigManager_1.ConfigManager.SortConfig.GetSortId(this._Dt) &&
          this.qpt(!0));
  }
}
exports.FilterEntrance = FilterEntrance;
//# sourceMappingURL=FilterEntrance.js.map

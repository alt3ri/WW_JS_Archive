"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlySkinTabViewModel = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  FlySkinDefine_1 = require("./FlySkinDefine"),
  FlySkinGridData_1 = require("./FlySkinGridData");
class FlySkinTabViewModel {
  constructor() {
    (this.RoleDataId = 0),
      (this.SelectedTab = void 0),
      (this.SelectedFlySkinType = 1),
      (this.SelectedGridIndex = -1),
      (this.SelectedFlySkinId = -1),
      (this.SelectedFlySkinConfig = void 0),
      (this.SelectedGridData = void 0),
      (this.GridDataList = []),
      (this.SkinIdToGridIndexMap = new Map()),
      (this.GetWayDataList = void 0),
      (this.UiShowState = !0),
      (this.IsApplyToAll = !1),
      (this.ModelCase = "");
  }
  SelectTab(i) {
    (this.SelectedTab = i),
      (this.SelectedFlySkinType = FlySkinDefine_1.flySkinTabToType[i]),
      (this.ModelCase =
        FlySkinDefine_1.flySkinTypeToCase[this.SelectedFlySkinType]),
      (this.SelectedGridIndex = -1),
      this.UpdateGridData();
  }
  UpdateGridData() {
    (this.GridDataList.length = 0), this.SkinIdToGridIndexMap.clear();
    var i = this.SelectedFlySkinType,
      t =
        (this.GridDataList.push(
          new FlySkinGridData_1.FlySkinGridData(0, this.RoleDataId, i),
        ),
        ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfigListByType(i));
    for (const e of t) {
      var s = new FlySkinGridData_1.FlySkinGridData(
        e.Id,
        this.RoleDataId,
        i,
        e,
      );
      this.GridDataList.push(s);
    }
    this.GridDataList.sort((i, t) =>
      void 0 === i.SkinConfig
        ? -1
        : void 0 === t.SkinConfig
          ? 1
          : i.SkinConfig.SortIndex - t.SkinConfig.SortIndex,
    );
    for (let i = 0; i < this.GridDataList.length; i++)
      this.SkinIdToGridIndexMap.set(this.GridDataList[i].SkinId, i);
  }
  GetGridIndexBySkinId(i) {
    return this.SkinIdToGridIndexMap?.get(i);
  }
  SelectGridByIndex(i) {
    (this.SelectedGridIndex = i),
      (this.SelectedGridData = this.GridDataList[i]),
      (this.SelectedFlySkinId = this.SelectedGridData.SkinId),
      (this.SelectedFlySkinConfig =
        0 < this.SelectedFlySkinId
          ? ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(
              this.SelectedFlySkinId,
            )
          : void 0),
      this.UpdateGetWayDataList();
  }
  UpdateGetWayDataList() {
    if (((this.GetWayDataList = []), this.SelectedFlySkinConfig)) {
      for (const t of this.SelectedFlySkinConfig.ItemAccess) {
        var i = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(t);
        i &&
          ((i = {
            Id: t,
            ConfigId: this.SelectedFlySkinId,
            Type: i?.Type,
            Text: i.Description,
            SortIndex: i.SortIndex,
          }),
          this.GetWayDataList.push(i));
      }
      this.GetWayDataList.sort((i, t) => {
        var s = i.SortIndex,
          e = t.SortIndex;
        return s === e ? t.Id - i.Id : e - s;
      });
    }
  }
  SetUiShowState(i) {
    this.UiShowState = i;
  }
  SetIsApplyToAll(i) {
    this.IsApplyToAll = i;
  }
  ResetSelectedTab() {
    (this.SelectedTab = void 0), (this.SelectedGridIndex = -1);
  }
}
exports.FlySkinTabViewModel = FlySkinTabViewModel;
//# sourceMappingURL=FlySkinTabViewModel.js.map

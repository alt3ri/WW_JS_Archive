"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyGridData = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Macro_1 = require("../../../../../Core/Preprocessor/Macro"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager");
class DangoMonopolyGridData {
  constructor(t, i, s) {
    (this.Id = 0),
      (this.GroupId = 0),
      (this.Index = 0),
      (this.AddPropertyId = 0),
      (this.RemovePropertyId = 0),
      (this.GridInfo = []),
      (this.GridType = 0),
      (this.DangoId = 0),
      (this.ItemId = 0),
      (this.ItemCount = 0),
      (this.BelongBoard = void 0),
      (this.MoveFinishBuffId = 0),
      (this.Id = t),
      (this.Index = i),
      (this.BelongBoard = s);
  }
  static Create(t, i, s) {
    i = new DangoMonopolyGridData(t.GridId, i, s);
    return i.AU(t), i;
  }
  AU(t) {
    switch (
      ((this.GroupId = t.GridGroupId),
      (this.AddPropertyId = t.AddPropertyId),
      (this.RemovePropertyId = t.RemovePropertyId),
      (this.GridInfo = t.GridInfo),
      (this.GridType = this.GridInfo[0]),
      this.GridType)
    ) {
      case 2:
        this.DangoId = this.GridInfo[1] ?? 0;
        break;
      case 1:
        (this.ItemId = this.GridInfo[1] ?? 0),
          (this.ItemCount = this.GridInfo[2] ?? 0);
    }
  }
  IsGreaterIndex(t) {
    return this.Index > t;
  }
  IsEqualIndex(t) {
    return this.Index === t;
  }
  IsLessIndex(t) {
    return this.Index < t;
  }
  IsExistDango() {
    return 2 === this.GridType;
  }
  IsExistItem() {
    return 1 === this.GridType;
  }
  IsExistEmpty() {
    return 0 === this.GridType;
  }
  GetPosition() {
    return this.Index + 1;
  }
  GetDangoData() {
    if (this.IsExistDango())
      return DangoManager_1.DangoManager.GetDangoData(this.DangoId);
  }
  GetAddPropertyConfig() {
    if (this.AddPropertyId)
      return ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig?.GetProperty(
        this.AddPropertyId,
      );
  }
  GetAddPropertyType() {
    var t = this.GetAddPropertyConfig();
    return t ? t.PropertyInfo[0] : 0;
  }
  IsAddPropertyType(t) {
    return this.GetAddPropertyType() === t;
  }
  PropertyIsDouble() {
    return this.IsAddPropertyType(2);
  }
  IsFinish() {
    return this.BelongBoard.GetFinishGridNum() >= this.GetPosition();
  }
  IsActiveDouble() {
    var t = this.BelongBoard.GetFirstDoubleGrid();
    return !!t && !this.IsLessIndex(t.Index) && !!t.IsFinish();
  }
  GetDangoRunningGridId() {
    return this.IsExistDango() && this.IsFinish()
      ? (this.BelongBoard.GetCurrentGridData()?.Id ?? this.Id)
      : this.Id;
  }
  UpdateMoveFinishBuffId(t) {
    this.MoveFinishBuffId = t;
  }
  IsNeedTriggerBuff() {
    return 0 < this.GetFireBuffId();
  }
  GetFireBuffId() {
    return this.MoveFinishBuffId || this.AddPropertyId || 0;
  }
}
exports.DangoMonopolyGridData = DangoMonopolyGridData;
//# sourceMappingURL=DangoMonopolyGridData.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiSetPanelItemData = void 0);
class BattleUiSetPanelItemData {
  constructor(t, s) {
    (this.HierarchyIndex = -1),
      (this.EditorHierarchyIndex = -1),
      (this.SourceHierarchyIndex = -1),
      (this.PanelIndex = s.PanelIndex),
      (this.PanelItemIndex = t),
      (this.ConfigId = s.Id),
      (this.Size = s.SourceSize),
      (this.EditSize = this.Size),
      (this.SourceSize = this.Size),
      (this.Alpha = s.SourceAlpha),
      (this.EditAlpha = this.Alpha),
      (this.SourceAlpha = this.Alpha),
      (this.OffsetX = s.SourceOffsetX),
      (this.EditOffsetX = this.OffsetX),
      (this.SourceOffsetX = this.OffsetX),
      (this.OffsetY = s.SourceOffsetY),
      (this.EditOffsetY = this.OffsetY),
      (this.SourceOffsetY = this.OffsetY),
      (this.he = s.Name),
      (this.CanEdit = s.CanEdit),
      (this.IsDefaultSelected = s.IsDefaultSelected),
      (this.IsCheckOverlap = s.IsCheckOverlap),
      (this.HierarchyIndex = s.SourceHierarchyIndex),
      (this.EditorHierarchyIndex = this.HierarchyIndex),
      (this.SourceHierarchyIndex = this.HierarchyIndex);
  }
  ReInit() {
    (this.EditSize = this.Size),
      (this.EditAlpha = this.Alpha),
      (this.EditOffsetX = this.OffsetX),
      (this.EditOffsetY = this.OffsetY);
  }
  IsEdited() {
    return (
      this.EditSize !== this.Size ||
      this.EditAlpha !== this.Alpha ||
      this.EditOffsetY !== this.OffsetY ||
      this.EditOffsetX !== this.OffsetX
    );
  }
  IsInitialized() {
    return (
      0 !== this.Size ||
      0 !== this.Alpha ||
      0 !== this.OffsetX ||
      0 !== this.OffsetY
    );
  }
  GetDebugString() {
    return (
      `按键名称：${this.he}，尺寸：${this.Size}，透明度：${this.Alpha}，位置：${this.OffsetX},` +
      this.OffsetY
    );
  }
}
exports.BattleUiSetPanelItemData = BattleUiSetPanelItemData;
//# sourceMappingURL=BattleUiSetPanelItemData.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponReplaceMediumItemGrid = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class WeaponReplaceMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnSelected(e) {
    e && this.SetSelected(!0, !0);
  }
  OnDeselected(e) {
    this.SetSelected(!1, !0);
  }
  OnRefresh(e, o, t) {
    var r = e.IncId;
    var r = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(r);
    var d = r.GetWeaponConfig();
    var d = {
      Type: 4,
      Data: e,
      ItemConfigId: e.ItemId,
      IsLockVisible: e.GetIsLock(),
      StarLevel: d.QualityId,
      Level: r.GetResonanceLevel(),
      BottomTextId: "Text_LevelShow_Text",
      BottomTextParameter: [r.GetLevel()],
      RoleHeadInfo: { RoleConfigId: e.RoleId },
    };
    this.Apply(d), this.SetSelected(o);
  }
}
exports.WeaponReplaceMediumItemGrid = WeaponReplaceMediumItemGrid;
// # sourceMappingURL=WeaponReplaceMediumItemGrid.js.map

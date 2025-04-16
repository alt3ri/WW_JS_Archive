"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRefineMediumItemGrid = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class VisionRefineMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments),
      (this.ZBt = () => {
        var e = this.Data;
        e &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSelectItemAdd,
            e.GetConfigId(),
            e.GetUniqueId(),
          );
      });
  }
  OnStart() {
    super.OnStart(),
      this.GetItemGridExtendToggle().FocusListenerDelegate.Bind(this.ZBt);
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy(),
      this.GetItemGridExtendToggle().FocusListenerDelegate.Unbind();
  }
  OnRefresh(e, t, i) {
    var r = e.GetUniqueId(),
      r =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(r),
      s = e.GetItemDataType(),
      n = {
        Type: 4,
        Data: e,
        ItemConfigId: e.GetConfigId(),
        IsLockVisible: e.GetIsLock(),
        IsDeprecate: e.GetIsDeprecated(),
        StarLevel: e.GetQuality(),
        IsGreenSelected: t && r.GetVisionIfCanRefine(),
      };
    3 === s
      ? ((n.Level = r.GetCost()),
        (n.IsLevelTextUseChangeColor = !0),
        (n.BottomTextId = "VisionLevel"),
        (n.BottomTextParameter = [r.GetPhantomLevel()]),
        (n.VisionFetterGroupId = r.GetFetterGroupId()),
        (n.IsOmitBottomText = !0),
        (n.IsDisable = !r.GetVisionIfCanRefine()))
      : (n.BottomText = e.GetCount().toString()),
      this.SetSelected(t && r.GetVisionIfCanRefine(), !0),
      this.Apply(n);
  }
  OnSelected(e) {
    this.SetSelected(!0, !0), this.SetGreenSelected(!0);
  }
  OnDeselected(e) {
    this.SetSelected(!1, !0), this.SetGreenSelected(!1);
  }
}
exports.VisionRefineMediumItemGrid = VisionRefineMediumItemGrid;
//# sourceMappingURL=VisionRefineMediumItemGrid.js.map

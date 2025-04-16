"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlySkinGridItem = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class FlySkinGridItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnSelected(e) {
    this.SetSelected(!0, !0);
    var r = this.Data;
    r.GetIsNew() &&
      (ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.FlySkinRedDot,
        r.SkinId,
      ),
      this.SetNewFlagVisible(!1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshFlySkinChildTabRed,
        r.SkinType,
      ),
      ControllerHolder_1.ControllerHolder.FlySkinController.UpdateAllRoleSkinRedDot());
  }
  OnDeselected(e) {
    this.SetSelected(!1, !0);
  }
  OnRefresh(e, r, t) {
    var o = {
      Type: 4,
      Data: (this.Data = e),
      IconPath: e.IsEmptyData
        ? ConfigManager_1.ConfigManager.SkinConfig.GetDefaultFlySkinIconPath(
            e.SkinType,
          )
        : void 0,
      ItemConfigId: e.IsEmptyData ? void 0 : e.SkinId,
      IsNewVisible: e.GetIsNew(),
    };
    this.Apply(o),
      this.SetSelected(r),
      this.SetLockBlackVisible(e.GetIsLock()),
      this.RefreshEquipState(),
      this.SetRoleHead(void 0);
  }
  RefreshEquipState() {
    var e = this.Data;
    this.SetSelectVisible(e.IsCurrentEquipSkinId());
  }
}
exports.FlySkinGridItem = FlySkinGridItem;
//# sourceMappingURL=FlySkinGridItem.js.map

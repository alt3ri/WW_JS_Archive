"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponSkinGridItem = void 0);
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class WeaponSkinGridItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnSelected(e) {
    e && this.SetSelected(!0, !0);
    e = this.Data;
    e.IsNew &&
      (ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.WeaponSkinRedDot,
        e.SkinId,
      ),
      this.SetNewFlagVisible(!1));
  }
  OnDeselected(e) {
    this.SetSelected(!1, !0);
  }
  OnRefresh(e, i, o) {
    var a = {
      Type: 4,
      Data: (this.Data = e),
      IconPath: e.IsEmptyData
        ? ConfigManager_1.ConfigManager.SkinConfig.GetDefaultWeaponSkinIconPath()
        : void 0,
      ItemConfigId: e.IsEmptyData ? void 0 : e.SkinId,
      IsNewVisible: e.IsNew,
    };
    this.Apply(a),
      this.SetSelected(i),
      this.SetLockBlackVisible(e.GetIsLock()),
      this.RefreshVisible();
  }
  RefreshVisible() {
    var e = this.Data;
    this.SetSelectVisible(e.IsCurrentEquipSkinId()),
      !e.IsCurrentEquipSkinId() &&
      (e = ModelManager_1.ModelManager.WeaponSkinModel?.GetRoleIdBySkinId(
        e.SkinId,
      ))
        ? ((e =
            ModelManager_1.ModelManager.RoleSkinModel?.GetRoleSkinDataByRoleId(
              e,
            )),
          this.SetRoleHead(e?.GetItemId()))
        : this.SetRoleHead(void 0);
  }
}
exports.WeaponSkinGridItem = WeaponSkinGridItem;
//# sourceMappingURL=WeaponSkinGridItem.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemGridAbstract = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  PhantomItemData_1 = require("../../Inventory/ItemData/PhantomItemData"),
  WeaponItemData_1 = require("../../Inventory/ItemData/WeaponItemData"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class ItemGridAbstract extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t = void 0, e = void 0, i = void 0) {
    super(),
      (this.apt = void 0),
      (this.ETt = 0),
      (this.hPt = 0),
      (this.wTt = 0),
      (this.GTt = void 0),
      (this.wqe = e),
      this.SetBelongViewName(i),
      t && this.CreateThenShowByActor(t);
  }
  GetItemConfig() {
    return this.wqe ? this.wqe.GetItemConfig() : this.apt;
  }
  GetItemId() {
    return this.wqe ? this.wqe.GetItemId() : this.ETt;
  }
  GetBelongView() {
    return this.wqe ? this.wqe.GetBelongView() : this.GTt;
  }
  Refresh(t, e, i) {
    var r = t[0];
    this.RefreshByItemId(r.ItemId), (this.hPt = t[1]), (this.wTt = r.IncId);
  }
  RefreshByItemId(t) {
    (this.ETt = t),
      (this.apt =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t)),
      this.lPt(this) &&
        (this.RefreshQualitySprite(), this.RefreshTextureIcon());
  }
  ShowDefaultDownText() {
    this.lPt(this) && this.RefreshTextDown(!0, this.GetDefaultDownText());
  }
  GetDefaultDownText() {
    var t,
      e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(
        this.wTt,
      );
    if (
      !(
        1 < this.hPt ||
        StringUtils_1.StringUtils.IsEmpty(e?.GetDefaultDownText())
      )
    ) {
      if (e instanceof PhantomItemData_1.PhantomItemData)
        return (
          (t =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              this.wTt,
            ).GetPhantomLevel()),
          StringUtils_1.StringUtils.Format(e.GetDefaultDownText(), t.toString())
        );
      if (e instanceof WeaponItemData_1.WeaponItemData)
        return (
          (t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
            this.wTt,
          ).GetLevel()),
          StringUtils_1.StringUtils.Format(e.GetDefaultDownText(), t.toString())
        );
    }
    return this.hPt.toString();
  }
  lPt(t) {
    return !0 === t.IsItemGrid;
  }
  SetBelongViewName(t) {
    this.GTt = t;
  }
}
exports.ItemGridAbstract = ItemGridAbstract;
//# sourceMappingURL=ItemGridAbstract.js.map

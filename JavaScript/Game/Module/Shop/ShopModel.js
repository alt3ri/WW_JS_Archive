"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShopModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ShopDefine_1 = require("./ShopDefine"),
  ShopItemFullInfo_1 = require("./SubViews/ShopItemFullInfo");
class ShopModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.OpenItemInfo = void 0),
      (this.cMo = void 0),
      (this.Qre = ""),
      (this.InteractTarget = 0),
      (this.CurrentInteractCreatureDataLongId = void 0);
  }
  get VersionId() {
    return this.Qre;
  }
  set VersionId(e) {
    this.Qre = e;
  }
  OnInit() {
    return (this.cMo = new Map()), !0;
  }
  GetShopInfo(e) {
    return this.cMo.get(e);
  }
  GetShopItem(e, t) {
    e = this.GetShopInfo(e);
    if (e) return e.GetItemInfo(t);
  }
  GetShopConfig(e) {
    return ConfigManager_1.ConfigManager.ShopConfig.GetShopInfoConfig(e);
  }
  UpdateShopListData(e) {
    for (const t of e) this.UpdateShopData(t);
  }
  UpdateShopData(e) {
    let t = this.GetShopInfo(e.KHn);
    t
      ? (t.UpdateRefreshTime(e.pxs), t.UpdateShopItemList(e.Kqs))
      : ((t = new ShopDefine_1.Shop(e)), this.cMo.set(e.KHn, t)),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ShopUpdate,
        e.KHn,
      );
  }
  UpdateItemData(e) {
    var t = this.GetShopItem(e.KHn, e.J4n);
    t && (t.N7n = e.N7n);
  }
  IsOpen(e) {
    e = this.GetShopConfig(e);
    return !!e && ModelManager_1.ModelManager.FunctionModel.IsOpen(e.OpenId);
  }
  GetShopItemList(e) {
    this.GetShopInfo(e);
    var t = this.GetShopInfo(e),
      o = [];
    if (t) {
      for (var [, r] of t.GetItemList()) {
        var n = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          r.f8n,
          !0,
        );
        n &&
          ((n = new ShopItemFullInfo_1.ShopItemFullInfo(n, r, e)), o.push(n));
      }
      o.sort((e, t) =>
        e.IsInteractive() !== t.IsInteractive()
          ? e.IsInteractive()
            ? -1
            : 1
          : e.IsUnlocked() !== t.IsUnlocked()
            ? e.IsUnlocked()
              ? 1
              : -1
            : e.IsOutOfStock() !== t.IsOutOfStock()
              ? e.IsOutOfStock()
                ? 1
                : -1
              : e.Id <= t.Id
                ? -1
                : 1,
      );
    }
    return o;
  }
  GetShopItemFullInfoByShopIdAndItemId(e, t) {
    for (const o of this.GetShopItemList(e)) if (o.Id === t) return o;
  }
}
exports.ShopModel = ShopModel;
//# sourceMappingURL=ShopModel.js.map

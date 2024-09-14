"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayPackageData = void 0);
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  PayShopGoods_1 = require("./PayShopGoods"),
  PayShopGoodsData_1 = require("./PayShopGoodsData");
class PayPackageData {
  constructor() {
    (this.he = ""),
      (this.vFi = void 0),
      (this.Id = 0),
      (this.PayId = 0),
      (this.ItemId = 0),
      (this.ItemCount = 0),
      (this.Sort = 0),
      (this.BuyLimit = 0),
      (this.BoughtCount = 0),
      (this.StageImage = ""),
      (this.BeginTime = 0),
      (this.EndTime = 0),
      (this.ProductId = ""),
      (this.Amount = ""),
      (this.TabId = 0),
      (this.Type = 3),
      (this.IsLock = !1),
      (this.IsCanBuy = !0),
      (this.IsRemind = !1),
      (this.BuyCondition = 0),
      (this.vFi = new PayShopGoods_1.PayShopGoods(3));
  }
  Phrase(t) {
    (this.Id = t.s5n ?? 0),
      (this.PayId = t.sBs ?? 0),
      (this.ItemId = t.L8n ?? 0),
      (this.ItemCount = t.n9n ?? 0),
      (this.Sort = t.cBs ?? 0),
      (this.BuyLimit = t.dBs ?? 0),
      (this.BoughtCount = t.X7n ?? 0),
      (this.StageImage = t._Bs ?? ""),
      (this.BeginTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.cps))),
      (this.EndTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.dps))),
      (this.ProductId = t.uBs ?? ""),
      (this.Amount = t.$6n ?? ""),
      (this.TabId = t.mBs ?? 0),
      (this.Type = t.h5n ?? 3),
      (this.IsLock = t.pBs ?? !1),
      (this.IsCanBuy = t.Arh ?? !0),
      (this.IsRemind = t.Drh ?? !1),
      (this.BuyCondition = t.wrh ?? []),
      this.MFi(),
      this.vFi.SetGoodsData(this.ConvertToPayShopGoodsData()),
      this.vFi.SetPayGiftId(this.Id);
  }
  MFi() {
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
      this.ItemId,
    );
    (this.he = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name)),
      1 < this.ItemCount &&
        ((t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "GoodsName",
          )),
        (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t)),
        (this.he = StringUtils_1.StringUtils.Format(
          t,
          this.he,
          this.ItemCount.toString(),
        )));
  }
  ShowInShop() {
    return 2 !== this.Type;
  }
  GetName() {
    return this.he;
  }
  GetPayShopGoods() {
    return this.vFi;
  }
  ConvertToPayShopGoodsData() {
    var t = new PayShopGoodsData_1.PayShopGoodsData();
    return t.PhraseFromPayPackageData(this), t;
  }
  CanShowInShopTab() {
    var t =
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedConfirmSdkProductInfo();
    if (
      t &&
      !ModelManager_1.ModelManager.PayItemModel.GetProductInfoByGoodsId(
        this.ProductId,
      )
    )
      return !1;
    return !0;
  }
}
exports.PayPackageData = PayPackageData;
//# sourceMappingURL=PayPackageData.js.map

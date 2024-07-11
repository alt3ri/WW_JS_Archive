"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayPackageData = void 0);
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
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
      (this.vFi = new PayShopGoods_1.PayShopGoods(3));
  }
  Phrase(t) {
    (this.Id = t.J4n ?? 0),
      (this.PayId = t.Zbs ?? 0),
      (this.ItemId = t.f8n ?? 0),
      (this.ItemCount = t.YVn ?? 0),
      (this.Sort = t.nBs ?? 0),
      (this.BuyLimit = t.sBs ?? 0),
      (this.BoughtCount = t.N7n ?? 0),
      (this.StageImage = t.rBs ?? ""),
      (this.BeginTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.nps))),
      (this.EndTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.sps))),
      (this.ProductId = t.oBs ?? ""),
      (this.Amount = t.k6n ?? ""),
      (this.TabId = t.aBs ?? 0),
      (this.Type = t.Z4n ?? 3),
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
}
exports.PayPackageData = PayPackageData;
//# sourceMappingURL=PayPackageData.js.map

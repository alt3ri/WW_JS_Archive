"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleTokenDetailGridBottom =
    exports.RogueBattleShopDiscount =
    exports.RogueBattleDiscountTagComponent =
    exports.RogueBattleGridElementComponent =
      void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  MediumItemGridComponent_1 = require("../../Common/MediumItemGrid/MediumItemGridComponent/MediumItemGridComponent"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RogueBattleUtils_1 = require("../RogueBattleUtils"),
  RogueBattleTokenElement_1 = require("./RogueBattleTokenElement");
class RogueBattleGridElementComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  constructor() {
    super(...arguments),
      (this.Sui = void 0),
      (this.Fao = () => {
        return new RogueBattleTokenElement_1.RogueBattleTokenElement();
      });
  }
  GetResourceId() {
    return "UiItem_ItemRogueElement";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout]];
  }
  OnActivate() {
    this.Sui = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(0),
      this.Fao,
    );
  }
  OnRefresh(e) {
    e = RogueBattleUtils_1.RogueBattleUtils.GetTokenSortElementInfoByCount(e);
    this.Sui?.RefreshByData(e);
  }
}
exports.RogueBattleGridElementComponent = RogueBattleGridElementComponent;
class RogueBattleDiscountTagComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  GetResourceId() {
    return "UiItem_ItemDiscountTag";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnRefresh(e) {
    var t;
    e.Rac &&
      ((t = e.Rac.kN_),
      (e = e.Rac.qN_),
      (e = Math.floor((e / t) * 100)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(0),
        "RogueInfoViewShopDiscount",
        (100 - e).toString(),
      ));
  }
}
exports.RogueBattleDiscountTagComponent = RogueBattleDiscountTagComponent;
class RogueBattleShopDiscount extends MediumItemGridComponent_1.MediumItemGridComponent {
  GetResourceId() {
    return "UiItem_ItemDiscount";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [1, UE.UIText],
      [0, UE.UITexture],
    ];
  }
  OnRefresh(e) {
    e.Rac &&
      (e.Rac.qN_ !== e.Rac.kN_
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(1),
            "RogueInfoViewShopPriceWithDiscount",
            e.Rac.qN_,
            e.Rac.kN_,
          )
        : LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(1),
            "RogueInfoViewShopPrice",
            e.Rac.kN_,
          ),
      0 !== e.Rac.L8n) &&
      ((e =
        ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueCurrencyConfig(
          e.Rac.L8n,
        )),
      this.SetTextureByPath(e?.IconSmall ?? "", this.GetTexture(0)));
  }
}
exports.RogueBattleShopDiscount = RogueBattleShopDiscount;
class RogueBattleTokenDetailGridBottom extends MediumItemGridComponent_1.MediumItemGridComponent {
  constructor() {
    super(...arguments), (this.Zao = void 0);
  }
  GetResourceId() {
    return "UiItem_ItemRogue";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
    ];
  }
  OnActivate() {
    (this.Zao = new RogueBattleTokenElement_1.RogueBattleTokenElement()),
      this.Zao.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnRefresh(e) {
    e = RogueBattleUtils_1.RogueBattleUtils.GetTokenSortElementInfo(e);
    e.length <= 0 ||
      (this.Zao.Refresh(e[0].ElementId, !1, 0),
      this.GetText(1).SetText(e[0].Count.toString()));
  }
}
exports.RogueBattleTokenDetailGridBottom = RogueBattleTokenDetailGridBottom;
//# sourceMappingURL=RogueBattleShopGridComponent.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleShopDetail = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  RoguelikeDefine_1 = require("../../Roguelike/Define/RoguelikeDefine"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleShopDetail extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ilo = () => {
        this.GetButton(7)?.SetSelfInteractive(!1);
        var e = ModelManager_1.ModelManager.RogueBattleModel.SelectGainData;
        void 0 !== e &&
          ControllerHolder_1.ControllerHolder.RogueBattleController.SelectTokenRequest(
            e.Rac.c5n,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIButtonComponent],
      [8, UE.UITexture],
      [9, UE.UIText],
      [10, UE.UIText],
      [11, UE.UIHorizontalLayout],
    ]),
      (this.BtnBindInfo = [[7, this.ilo]]);
  }
  Refresh(e) {
    var i,
      r,
      t,
      o =
        ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBuffPoolById(
          e.Rac.v9n,
        );
    void 0 !== o &&
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), o.BuffName),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(3),
        o.BuffDesc,
        ...o.BuffDescParam,
      ),
      (i = (o = e.Rac.qN_ !== e.Rac.kN_) ? e.Rac.qN_ : e.Rac.kN_),
      (r = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCurrencyConfig(
        RoguelikeDefine_1.INSIDE_CURRENCY_ID,
      )),
      (t = ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeCurrency(
        RoguelikeDefine_1.INSIDE_CURRENCY_ID,
      )),
      o
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(10),
            "RogueShopOriginPriceDiscount",
            e.Rac.kN_.toString(),
          )
        : this.GetText(10)?.SetText(""),
      this.GetText(9)?.SetText(i.toString()),
      (this.GetText(9).useChangeColor = t < i),
      this.SetTextureByPath(r?.IconSmall ?? "", this.GetTexture(8)),
      this.GetItem(6)?.SetUIActive(!e.Rac.O2s),
      this.GetButton(7)?.SetSelfInteractive(!0),
      this.GetButton(7)?.RootUIComp.SetUIActive(!e.Rac.O2s),
      this.GetHorizontalLayout(11)?.RootUIComp.SetUIActive(!1));
  }
}
exports.RogueBattleShopDetail = RogueBattleShopDetail;
//# sourceMappingURL=RogueBattleShopDetail.js.map

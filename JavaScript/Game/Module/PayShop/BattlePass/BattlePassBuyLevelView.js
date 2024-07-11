"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattlePassBuyLevelView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  NumberSelectComponent_1 = require("../../Common/NumberSelect/NumberSelectComponent"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
class BattlePassBuyLevelView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.bOe = void 0),
      (this.ZOi = void 0),
      (this.WGe = void 0),
      (this.Wft = 0),
      (this.eki = 0),
      (this.tki = 0),
      (this.iki = 0),
      (this.oki = !1),
      (this.rki = () => {
        this.CloseMe();
      }),
      (this.nki = () => {
        ControllerHolder_1.ControllerHolder.BattlePassController.RequestBuyBattlePassLevel(
          this.WGe.GetSelectNumber(),
        ),
          this.CloseMe();
      }),
      (this.aki = () => {
        this.CloseMe();
      }),
      (this.Pgi = () => {
        this.CloseMe();
      }),
      (this.rOe = () =>
        new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
      (this.KGe = (e) =>
        new LguiUtil_1.TableTextArgNew("Text_BattlePassLevelBuy2_Text", e)),
      (this.QGe = (e) => {
        this.bl(e);
      }),
      (this.hki = () => {
        0 < this.iki && (this.lki(this.iki).then(this.hki), (this.iki = 0));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UITexture],
      [9, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [2, this.rki],
        [3, this.nki],
      ]);
  }
  OnStart() {
    this.Wft = ModelManager_1.ModelManager.BattlePassModel.BattlePassLevel;
    var e = ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassData(
        ModelManager_1.ModelManager.BattlePassModel.BattlePassId,
      ),
      t =
        ((this.eki = e.ConsumeId),
        ConfigManager_1.ConfigManager.ItemConfig.GetConfig(this.eki));
    (this.tki = e.ConsumeCount),
      this.SetTextureByPath(t.IconSmall, this.GetTexture(8)),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(9),
        "CurrencyNotEnough",
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name),
      ),
      (this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(0),
        this.rOe,
      )),
      (this.ZOi = []);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattlePassMainViewHide,
      this.aki,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattlePassMainViewHide,
      this.aki,
    );
  }
  OnBeforeShow() {
    var e = this.ChildPopView?.PopItem,
      e =
        (e &&
          (e.SetCurrencyItemList([this.eki]),
          (e = e
            .GetCurrencyComponent()
            .GetCurrencyItemList()[0]).SetBeforeButtonFunction(this.Pgi),
          e.SetToPayShopFunction()),
        (this.WGe = new NumberSelectComponent_1.NumberSelectComponent(
          this.GetItem(5),
        )),
        {
          MaxNumber:
            ModelManager_1.ModelManager.BattlePassModel.GetMaxLevel() -
            this.Wft,
          GetExchangeTableText: this.KGe,
          ValueChangeFunction: this.QGe,
        });
    this.WGe.Init(e);
  }
  bl(e) {
    var t = this.Wft + e,
      e =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(4),
          "Text_BattlePassLevelBuy1_Text",
          t,
        ),
        e * this.tki),
      i = this.GetText(6),
      s =
        (i.SetText(e.toString()),
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          this.eki,
        ));
    i.SetChangeColor(s < e, i.changeColor),
      this.GetButton(3).SetSelfInteractive(e <= s),
      this.GetItem(7).SetUIActive(s < e),
      (this.iki = t),
      this.oki || this.hki();
  }
  async lki(e) {
    (this.oki = !0),
      ModelManager_1.ModelManager.BattlePassModel.GetTargetLevelRewardList(
        e,
        this.ZOi,
      ),
      await this.bOe.RefreshByDataAsync(this.ZOi),
      8 < this.ZOi.length && this.bOe?.ScrollToLeft(0),
      (this.oki = !1);
  }
  OnDestroy() {
    (this.iki = 0),
      (this.bOe = void 0),
      (this.ZOi.length = 0),
      (this.ZOi = void 0),
      this.WGe.Destroy(),
      (this.WGe = void 0);
  }
}
exports.BattlePassBuyLevelView = BattlePassBuyLevelView;
//# sourceMappingURL=BattlePassBuyLevelView.js.map

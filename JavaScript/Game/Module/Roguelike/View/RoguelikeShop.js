"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeShop = void 0);
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const RogueSelectResult_1 = require("../Define/RogueSelectResult");
const RoguelikeController_1 = require("../RoguelikeController");
const ElementPanel_1 = require("./ElementPanel");
const RogueInfoViewTokenDetail_1 = require("./RogueInfoViewTokenDetail");
const RoguelikeShopDetail_1 = require("./RoguelikeShopDetail");
class RoguelikeShop extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.LoopScrollView = void 0),
      (this.ElementPanel = void 0),
      (this.ShopDetailPanel = void 0),
      (this.Data = void 0),
      (this.ShopIndex = 0),
      (this.LevelSequencePlayer = void 0),
      (this.CaptionItem = void 0),
      (this.Eho = () => {
        RoguelikeController_1.RoguelikeController.RoguelikeRefreshGainRequest(
          Protocol_1.Aki.Protocol._3s.Proto_ShopBindId,
        );
      }),
      (this.yho = () => {
        RoguelikeController_1.RoguelikeController.OpenRogueInfoView();
      }),
      (this.Iho = (e, i, t) => {
        this.Tho(this.ShopIndex),
          this.ElementPanel?.Refresh(),
          this.CaptionItem?.SetCurrencyItemList([
            RoguelikeDefine_1.INSIDE_CURRENCY_ID,
          ]),
          UiManager_1.UiManager.OpenView(
            "CommonSelectResultView",
            new RogueSelectResult_1.RogueSelectResult(
              ModelManager_1.ModelManager.RoguelikeModel.RogueInfo?.PhantomEntry,
              i,
              e,
              !0,
            ),
          );
      }),
      (this.Oao = (e, i) => {
        (ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry = e),
          this.LoopScrollView.SelectGridProxy(i, !1),
          this.ShopDetailPanel.Refresh(e);
      }),
      (this.Tho = (e) => {
        (this.ShopIndex = e),
          (this.Data =
            ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(
              e,
            )),
          this.UpdateItemList(),
          this.GLn();
      }),
      (this.Hao = () => {
        return new RogueInfoViewTokenDetail_1.RogueInfoViewTokenDetailGrid();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [5, UE.UILoopScrollViewComponent],
      [6, UE.UIItem],
      [1, UE.UIItem],
      [3, UE.UIButtonComponent],
      [2, UE.UIItem],
      [0, UE.UIItem],
      [4, UE.UIText],
      [7, UE.UITexture],
      [8, UE.UIText],
      [9, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [3, this.Eho],
        [9, this.yho],
      ]);
  }
  OnAfterShow() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Show"),
      this.Tho(this.ShopIndex);
  }
  async OnBeforeStartAsync() {
    (this.ElementPanel = new ElementPanel_1.ElementPanel()),
      await this.ElementPanel.CreateThenShowByActorAsync(
        this.GetItem(2).GetOwner(),
      ),
      (this.ShopDetailPanel = new RoguelikeShopDetail_1.RoguelikeShopDetail()),
      await this.ShopDetailPanel.CreateThenShowByActorAsync(
        this.GetItem(1).GetOwner(),
      ),
      (this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(
        this.GetItem(0),
      )),
      this.CaptionItem.SetCloseCallBack(() => {
        UiManager_1.UiManager.CloseView(this.Info.Name);
      }),
      await this.CaptionItem.SetCurrencyItemList([
        RoguelikeDefine_1.INSIDE_CURRENCY_ID,
      ]);
  }
  OnStart() {
    this.ElementPanel.Refresh(),
      (this.LoopScrollView = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(5),
        this.GetItem(6).GetOwner(),
        this.Hao,
      )),
      (this.Data = this.OpenParam),
      (this.ShopIndex = this.Data.Index),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetRootItem(),
      )),
      this.UpdateItemList(),
      this.GLn();
  }
  UpdateItemList() {
    const e = this.Data.RogueGainEntryList;
    e.sort((e, i) =>
      e.IsSell !== i.IsSell
        ? e.IsSell
          ? 1
          : -1
        : e.IsDiscounted() !== i.IsDiscounted()
          ? e.IsDiscounted()
            ? -1
            : 1
          : e.IsDiscounted() && i.IsDiscounted()
            ? e.CurrentPrice - i.CurrentPrice
            : e.IsDiscounted() || i.IsDiscounted()
              ? e.Index - i.Index
              : e.OriginalPrice - i.OriginalPrice,
    ),
      this.LoopScrollView.RefreshByData(e),
      this.Data.RogueGainEntryList.length > 0 &&
        ((ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry =
          this.Data.RogueGainEntryList[0]),
        this.LoopScrollView.SelectGridProxy(0, !1),
        this.ShopDetailPanel.Refresh(this.Data.RogueGainEntryList[0]));
  }
  GLn() {
    var e = this.Data.UseTime;
    var i = this.Data.MaxTime;
    let t = this.GetButton(3);
    var e = (t.RootUIComp.SetUIActive(i > 0), i - e);
    const s = this.GetText(4);
    e <= 0
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(s, "RoguelikeView_29_Text", e, i)
      : LguiUtil_1.LguiUtil.SetLocalTextNew(s, "RoguelikeView_28_Text", e, i);
    i = this.Data.CostCurrency;
    if (i.length > 0) {
      var i = i[0];
      const o =
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          i.Ekn,
        ) >= i.I5n;
      const s = o ? "RogueSpecialRefreshCost" : "RogueSpecialRefreshCost_Not";
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), s, i.I5n),
        t.SetSelfInteractive(e > 0 && o);
      t = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCurrencyConfig(
        i.Ekn,
      );
      this.SetTextureByPath(t.IconSmall, this.GetTexture(7));
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoguelikeInfoSelectedToken,
      this.Oao,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoguelikeRefreshGain,
        this.Tho,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoguelikeChooseDataResult,
        this.Iho,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoguelikeInfoSelectedToken,
      this.Oao,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoguelikeRefreshGain,
        this.Tho,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoguelikeChooseDataResult,
        this.Iho,
      );
  }
  OnBeforeHide() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Hide");
  }
}
exports.RoguelikeShop = RoguelikeShop;
// # sourceMappingURL=RoguelikeShop.js.map

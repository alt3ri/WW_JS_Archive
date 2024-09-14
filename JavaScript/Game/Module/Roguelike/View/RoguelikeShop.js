"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeShop = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
  RogueSelectResult_1 = require("../Define/RogueSelectResult"),
  RoguelikeController_1 = require("../RoguelikeController"),
  ElementPanel_1 = require("./ElementPanel"),
  RogueInfoViewTokenDetail_1 = require("./RogueInfoViewTokenDetail"),
  RoguelikeShopDetail_1 = require("./RoguelikeShopDetail");
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
      (this.vlo = () => {
        var e = this.Data.CostCurrency;
        if (0 < e.length) {
          e = e[0];
          if (
            !(
              ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
                e.s5n,
              ) >= e.m9n
            )
          )
            return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "RogueSpecialRefreshCost_NotEnough",
            );
        }
        RoguelikeController_1.RoguelikeController.RoguelikeRefreshGainRequest(
          Protocol_1.Aki.Protocol.s8s.Proto_ShopBindId,
        );
      }),
      (this.Mlo = () => {
        RoguelikeController_1.RoguelikeController.OpenRogueInfoView();
      }),
      (this.Elo = (e, i, t) => {
        this.Slo(this.ShopIndex),
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
      (this.bho = (e, i) => {
        (ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry = e),
          this.LoopScrollView.SelectGridProxy(i, !1),
          this.ShopDetailPanel.Refresh(e);
      }),
      (this.Slo = (e) => {
        (this.ShopIndex = e),
          (this.Data =
            ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(
              e,
            )),
          this.UpdateItemList(),
          this.DDn();
      }),
      (this.Oho = () => {
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
        [3, this.vlo],
        [9, this.Mlo],
      ]);
  }
  OnAfterShow() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Show"),
      this.Slo(this.ShopIndex);
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
        this.Oho,
      )),
      (this.Data = this.OpenParam),
      (this.ShopIndex = this.Data.Index),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetRootItem(),
      )),
      this.UpdateItemList(),
      this.DDn();
  }
  UpdateItemList() {
    var e = this.Data.RogueGainEntryList;
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
      0 < this.Data.RogueGainEntryList.length &&
        ((ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry =
          this.Data.RogueGainEntryList[0]),
        this.LoopScrollView.SelectGridProxy(0, !1),
        this.ShopDetailPanel.Refresh(this.Data.RogueGainEntryList[0]));
  }
  DDn() {
    var e = this.Data.UseTime,
      i = this.Data.MaxTime,
      e = (this.GetButton(3).RootUIComp.SetUIActive(0 < i), i - e);
    const t = this.GetText(4);
    e <= 0
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(t, "RoguelikeView_29_Text", e, i)
      : LguiUtil_1.LguiUtil.SetLocalTextNew(t, "RoguelikeView_28_Text", e, i);
    e = this.Data.CostCurrency;
    if (0 < e.length) {
      i = e[0];
      const t =
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          i.s5n,
        ) >= i.m9n
          ? "RogueSpecialRefreshCost"
          : "RogueSpecialRefreshCost_Not";
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), t, i.m9n);
      e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCurrencyConfig(
        i.s5n,
      );
      this.SetTextureByPath(e.IconSmall, this.GetTexture(7));
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoguelikeInfoSelectedToken,
      this.bho,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoguelikeRefreshGain,
        this.Slo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoguelikeChooseDataResult,
        this.Elo,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoguelikeInfoSelectedToken,
      this.bho,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoguelikeRefreshGain,
        this.Slo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoguelikeChooseDataResult,
        this.Elo,
      );
  }
  OnBeforeHide() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Hide");
  }
}
exports.RoguelikeShop = RoguelikeShop;
//# sourceMappingURL=RoguelikeShop.js.map

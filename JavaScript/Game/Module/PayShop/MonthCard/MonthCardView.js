"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonthCardView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  ButtonAndTextItem_1 = require("../../Common/Button/ButtonAndTextItem"),
  UiTabSequence_1 = require("../../DynamicTab/UiTabViewBehavior/UiTabSequence"),
  HelpController_1 = require("../../Help/HelpController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  PayShopDefine_1 = require("../PayShopDefine"),
  MONTH_CARD_HELP_ID = 9;
class MonthCardView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.z2i = void 0),
      (this.Z2i = void 0),
      (this.eFi = void 0),
      (this.tFi = !1),
      (this.zki = () => {
        this.iFi();
      }),
      (this.dtt = () => {
        HelpController_1.HelpController.OpenHelpById(MONTH_CARD_HELP_ID);
      }),
      (this.oFi = () => {
        var e;
        this.tFi &&
          ((e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(
            PayShopDefine_1.MONTH_CARD_SHOP_ID,
          )),
          ControllerHolder_1.ControllerHolder.PayGiftController.SendPayGiftRequest(
            e.GetGoodsData().Id,
          ));
      }),
      (this.rFi = () => {
        this.nFi(), this.sFi();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIText],
    ]),
      (this.BtnBindInfo = [[2, this.dtt]]);
  }
  async OnBeforeStartAsync() {
    await ControllerHolder_1.ControllerHolder.PayGiftController.SendPayGiftInfoRequestAsync(),
      await ControllerHolder_1.ControllerHolder.MonthCardController.RequestMonthCardData(),
      (this.Z2i = new GetItemPanel()),
      await this.Z2i.CreateByActorAsync(this.GetItem(5).GetOwner()),
      this.AddChild(this.Z2i),
      (this.eFi = new GetItemPanel()),
      await this.eFi.CreateByActorAsync(this.GetItem(6).GetOwner()),
      this.AddChild(this.eFi);
  }
  OnStart() {
    var e = new Array(),
      t = PayShopDefine_1.MONTH_CARD_SHOP_ID,
      t =
        ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(
          t,
        ).GetGetPayGiftData().ProductId,
      t =
        (e.push(t.toString()),
        ControllerHolder_1.ControllerHolder.KuroSdkController.QueryProductByProductId(
          e,
        ),
        (this.z2i = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(4))),
        this.z2i.BindCallback(this.oFi),
        ModelManager_1.ModelManager.MonthCardModel.LocalOnceReward),
      e = ModelManager_1.ModelManager.MonthCardModel.LocalDailyReward;
    this.Z2i.Refresh(t[0].ItemId, t[1]),
      this.eFi.Refresh(e[0].ItemId, e[1]),
      this.rFi(),
      this.iFi(),
      this.GetText(9).ShowTextNew("MonthCardDes_1"),
      this.GetTabBehavior(UiTabSequence_1.UiTabSequence)
        ?.GetLevelSequencePlayer()
        .PlayLevelSequenceByName("Loop");
  }
  iFi() {
    var e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(
      PayShopDefine_1.MONTH_CARD_SHOP_ID,
    );
    this.GetText(3).SetText(e.GetDirectPriceText());
  }
  OnBeforeDestroy() {
    this.z2i?.Destroy(), (this.z2i = void 0);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ReceiveMonthCardDataEvent,
      this.rFi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnQueryProductInfo,
        this.zki,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ReceiveMonthCardDataEvent,
      this.rFi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnQueryProductInfo,
        this.zki,
      );
  }
  OnAfterShow() {
    this.GetTabBehavior(UiTabSequence_1.UiTabSequence)
      ?.GetLevelSequencePlayer()
      .PlayLevelSequenceByName("Start"),
      ModelManager_1.ModelManager.MonthCardModel.RefreshNextShowPayButtonRedDotTime();
  }
  nFi() {
    var e = 0 <= ModelManager_1.ModelManager.MonthCardModel.GetRemainDays();
    this.GetItem(0).SetUIActive(e),
      this.GetText(1).SetUIActive(e),
      e &&
        this.GetText(1)?.SetText(
          ModelManager_1.ModelManager.MonthCardModel.GetRemainDayText("ec7172"),
        );
  }
  sFi() {
    var e = ModelManager_1.ModelManager.MonthCardModel.IsRemainDayInMaxLimit(),
      t = this.GetItem(8),
      i = this.GetItem(7);
    e
      ? ((this.tFi = !0),
        this.z2i.RefreshEnable(!0),
        this.z2i.SetActive(!0),
        i.SetUIActive(!0),
        t.SetUIActive(!1))
      : ((this.tFi = !1),
        this.z2i.RefreshEnable(!1),
        this.z2i.SetActive(!1),
        i.SetUIActive(!1),
        t.SetUIActive(!0));
  }
}
exports.MonthCardView = MonthCardView;
class GetItemPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ETt = 0),
      (this.aFi = () => {
        0 !== this.ETt &&
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
            this.ETt,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.aFi]]);
  }
  OnStart() {
    this.GetTexture(1).SetUIActive(!1);
  }
  Refresh(e, t) {
    this.ETt = e;
    const i = this.GetTexture(1);
    this.SetItemIcon(i, e, void 0, () => {
      i.SetUIActive(!0);
    });
    e = this.GetText(2);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, "Text_RoleCount_Text", t.toString());
  }
}
//# sourceMappingURL=MonthCardView.js.map

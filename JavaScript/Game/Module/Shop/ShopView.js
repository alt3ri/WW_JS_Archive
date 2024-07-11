"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShopView = void 0);
const UE = require("ue"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
  AsyncTask_1 = require("../../World/Task/AsyncTask"),
  TaskSystem_1 = require("../../World/Task/TaskSystem"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView"),
  ShopController_1 = require("./ShopController"),
  ShopPanelData_1 = require("./ShopPanelData"),
  ShopUtils_1 = require("./ShopUtils"),
  ShopItemInfoDetailPanel_1 = require("./SubViews/ShopItemInfoDetailPanel"),
  ShopMediumItemGrid_1 = require("./SubViews/ShopMediumItemGrid");
class ShopView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.mMo = 0),
      (this.ShopItemScrollView = void 0),
      (this.dMo = void 0),
      (this.PTt = []),
      (this.CMo = void 0),
      (this.gMo = void 0),
      (this.Jgt = (e) => {
        (e = e.Data), (e = this.CMo.indexOf(e));
        this.ShopItemScrollView.DeselectCurrentGridProxy(),
          e < 0 || this.ShopItemScrollView.SelectGridProxy(e);
      }),
      (this.Mxe = () => {
        var e = new ShopPanelData_1.ShopPanelData(),
          t = ModelManager_1.ModelManager.ShopModel.OpenItemInfo;
        (e.ItemId = t.ItemId),
          (e.ParamData = t.Id),
          (e.CurrencyId = t.GetMoneyId()),
          (e.SingleBuyCount = t.StackSize),
          (e.SingleBuyPrice = t.DefaultPrice.CoinPrice),
          (e.BoughtCount = t.BoughtCount),
          (e.BuyLimit = t.BuyLimit),
          (e.IsLock = t.IsLocked),
          (e.LockText = t.LockInfo),
          (e.InSellTime = t.InSellTime()),
          (e.BuySuccessFunction = this.fMo),
          this.dMo.UpdatePanel(e);
      }),
      (this.fMo = (e, t, i, s) => {
        ShopController_1.ShopController.SendShopBuyRequest(
          this.mMo,
          s,
          i,
          t,
          () => {
            var e = new ShopPanelData_1.ShopPanelData(),
              t =
                ((ModelManager_1.ModelManager.ShopModel.OpenItemInfo =
                  ModelManager_1.ModelManager.ShopModel.GetShopItemFullInfoByShopIdAndItemId(
                    this.mMo,
                    ModelManager_1.ModelManager.ShopModel.OpenItemInfo.Id,
                  )),
                ModelManager_1.ModelManager.ShopModel.OpenItemInfo);
            (e.ItemId = t.ItemId),
              (e.ParamData = t.Id),
              (e.CurrencyId = t.GetMoneyId()),
              (e.SingleBuyCount = t.StackSize),
              (e.SingleBuyPrice = t.DefaultPrice.CoinPrice),
              (e.BoughtCount = t.BoughtCount),
              (e.BuyLimit = t.BuyLimit),
              (e.IsLock = t.IsLocked),
              (e.LockText = t.LockInfo),
              (e.InSellTime = t.InSellTime()),
              (e.BuySuccessFunction = this.fMo),
              this.dMo.UpdatePanel(e);
          },
        );
      }),
      (this.pMo = (e, t) => {
        this.RefreshShopItemList(), this.UpdateCurrency();
      }),
      (this.aoo = (e) => {
        this.mMo === e && this.RefreshShopItemList();
      }),
      (this.vMo = () => {
        this.PlaySequence("Sle", this.Mxe),
          (ModelManager_1.ModelManager.ShopModel.OpenItemInfo =
            ModelManager_1.ModelManager.ShopModel.GetShopItemFullInfoByShopIdAndItemId(
              this.mMo,
              ModelManager_1.ModelManager.ShopModel.OpenItemInfo.Id,
            ));
        var e = new ShopPanelData_1.ShopPanelData(),
          t = ModelManager_1.ModelManager.ShopModel.OpenItemInfo;
        (e.ItemId = t.ItemId),
          (e.ParamData = t.Id),
          (e.CurrencyId = t.GetMoneyId()),
          (e.SingleBuyCount = t.StackSize),
          (e.SingleBuyPrice = t.DefaultPrice.CoinPrice),
          (e.BoughtCount = t.BoughtCount),
          (e.BuyLimit = t.BuyLimit),
          (e.IsLock = t.IsLocked),
          (e.LockText = t.LockInfo),
          (e.InSellTime = t.InSellTime()),
          (e.BuySuccessFunction = this.fMo),
          this.dMo.UpdatePanel(e);
      }),
      (this.MMo = () => {
        this.UiViewSequence.PlaySequence("UnSle");
      });
  }
  get ShopInfo() {
    return ModelManager_1.ModelManager.ShopModel.GetShopInfo(this.mMo);
  }
  get u3e() {
    return this.ShopInfo?.UpdateTime;
  }
  get SecondsToRefresh() {
    return this.gMo;
  }
  set SecondsToRefresh(e) {
    e <= 0 && 0 < this.gMo && this.EMo(), (this.gMo = e);
  }
  OnBeforeCreate() {
    var e = "ShopView" + (1e4 + this.OpenParam);
    this.Info.CommonPopBgKey = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [4, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.dMo = new ShopItemInfoDetailPanel_1.ShopItemInfoDetailPanel()),
      await Promise.all([
        this.dMo.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()),
        ShopController_1.ShopController.SendShopInfoRequest(
          ModelManager_1.ModelManager.ShopModel.VersionId,
        ),
      ]);
  }
  OnStart() {
    (this.mMo = this.OpenParam),
      (this.ShopItemScrollView = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(4),
        this.GetItem(6).GetOwner(),
        () => {
          var e = new ShopMediumItemGrid_1.ShopMediumItemGrid();
          return e.BindOnExtendToggleStateChanged(this.Jgt), e;
        },
      )),
      this.ChildPopView?.PopItem.SetMaskResponsibleState(!1),
      this.UpdateCurrency(),
      this.SetShopName(),
      this.RefreshShopItemList(!0),
      this.SMo(),
      this.GetItem(1).SetUIActive(void 0 !== this.u3e && 0 < this.u3e),
      (ModelManager_1.ModelManager.ShopModel.CurrentInteractCreatureDataLongId =
        ModelManager_1.ModelManager.InteractionModel.InteractCreatureDataLongId);
  }
  yMo(e) {
    let t = "";
    var i = EntitySystem_1.EntitySystem.Get(
      ModelManager_1.ModelManager.ShopModel.InteractTarget,
    );
    i && (t = i.GetComponent(104)?.PawnName ?? ""), this.GetText(2).SetText(t);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OpenItemInfo,
      this.vMo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseItemInfo,
        this.MMo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BoughtItem,
        this.pMo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ShopUpdate,
        this.aoo,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OpenItemInfo,
      this.vMo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseItemInfo,
        this.MMo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BoughtItem,
        this.pMo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ShopUpdate,
        this.aoo,
      );
  }
  OnTick(e) {
    this.SMo();
  }
  SMo() {
    var e;
    void 0 === this.u3e || 0 === this.u3e
      ? this.GetItem(1).SetUIActive(!1)
      : (e = this.FormatCountdown()) &&
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "RefreshTime", e);
  }
  OnBeforeDestroy() {
    (this.CMo.length = 0),
      this.ShopItemScrollView && this.ShopItemScrollView.ClearGridProxies(),
      this.dMo && this.dMo.Destroy();
    for (const e of this.PTt) e.Destroy();
    this.RootActor.OnSequencePlayEvent.Unbind();
  }
  SetShopName() {}
  UpdateCurrency() {
    var e = ModelManager_1.ModelManager.ShopModel.GetShopConfig(this.mMo);
    e && this.yMo(e);
  }
  RefreshShopItemList(i = !1) {
    var e = new AsyncTask_1.AsyncTask(
      "ShopView.RefreshShopItemList",
      async () => {
        if (this.CMo)
          for (let e = 0; e < this.CMo.length; e++) {
            var t = this.CMo[e],
              t =
                ModelManager_1.ModelManager.ShopModel.GetShopItemFullInfoByShopIdAndItemId(
                  this.mMo,
                  t.Id,
                );
            t && (this.CMo[e] = t);
          }
        else {
          var e = ModelManager_1.ModelManager.ShopModel.GetShopItemList(
            this.mMo,
          );
          this.CMo = e;
        }
        return (
          await this.ShopItemScrollView.RefreshByDataAsync(this.CMo, !1),
          i &&
            (this.ShopItemScrollView.ClearSelectInfo(),
            this.ShopItemScrollView.SelectGridProxy(0, !0),
            this.vMo()),
          !0
        );
      },
    );
    TaskSystem_1.TaskSystem.AddTask(e), TaskSystem_1.TaskSystem.Run();
  }
  FormatCountdown() {
    var e = Math.trunc(this.u3e - TimeUtil_1.TimeUtil.GetServerTime());
    if (!((this.SecondsToRefresh = e) <= 0))
      return ShopUtils_1.ShopUtils.FormatTime(e);
    ShopController_1.ShopController.SendShopUpdateRequest(this.mMo);
  }
  EMo() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(36);
    e.FunctionMap.set(1, () => {
      ShopController_1.ShopController.SendShopUpdateRequest(this.mMo);
    }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      );
  }
}
exports.ShopView = ShopView;
//# sourceMappingURL=ShopView.js.map

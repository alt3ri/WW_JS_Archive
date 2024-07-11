"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShopView = void 0);
const UE = require("ue");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const AsyncTask_1 = require("../../World/Task/AsyncTask");
const TaskSystem_1 = require("../../World/Task/TaskSystem");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const LguiUtil_1 = require("../Util/LguiUtil");
const LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView");
const ShopController_1 = require("./ShopController");
const ShopPanelData_1 = require("./ShopPanelData");
const ShopUtils_1 = require("./ShopUtils");
const ShopItemInfoDetailPanel_1 = require("./SubViews/ShopItemInfoDetailPanel");
const ShopMediumItemGrid_1 = require("./SubViews/ShopMediumItemGrid");
class ShopView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.gvo = 0),
      (this.ShopItemScrollView = void 0),
      (this.fvo = void 0),
      (this.LIt = []),
      (this.pvo = void 0),
      (this.vvo = void 0),
      (this.OCt = (e) => {
        (e = e.Data), (e = this.pvo.indexOf(e));
        this.ShopItemScrollView.DeselectCurrentGridProxy(),
          e < 0 || this.ShopItemScrollView.SelectGridProxy(e);
      }),
      (this.Mxe = () => {
        const e = new ShopPanelData_1.ShopPanelData();
        const t = ModelManager_1.ModelManager.ShopModel.OpenItemInfo;
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
          (e.BuySuccessFunction = this.Mvo),
          this.fvo.UpdatePanel(e);
      }),
      (this.Mvo = (e, t, i, s) => {
        ShopController_1.ShopController.SendShopBuyRequest(
          this.gvo,
          s,
          i,
          t,
          () => {
            const e = new ShopPanelData_1.ShopPanelData();
            const t =
              ((ModelManager_1.ModelManager.ShopModel.OpenItemInfo =
                ModelManager_1.ModelManager.ShopModel.GetShopItemFullInfoByShopIdAndItemId(
                  this.gvo,
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
              (e.BuySuccessFunction = this.Mvo),
              this.fvo.UpdatePanel(e);
          },
        );
      }),
      (this.Svo = (e, t) => {
        this.RefreshShopItemList(), this.UpdateCurrency();
      }),
      (this.uio = (e) => {
        this.gvo === e && this.RefreshShopItemList();
      }),
      (this.Evo = () => {
        this.PlaySequence("Sle", this.Mxe),
          (ModelManager_1.ModelManager.ShopModel.OpenItemInfo =
            ModelManager_1.ModelManager.ShopModel.GetShopItemFullInfoByShopIdAndItemId(
              this.gvo,
              ModelManager_1.ModelManager.ShopModel.OpenItemInfo.Id,
            ));
        const e = new ShopPanelData_1.ShopPanelData();
        const t = ModelManager_1.ModelManager.ShopModel.OpenItemInfo;
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
          (e.BuySuccessFunction = this.Mvo),
          this.fvo.UpdatePanel(e);
      }),
      (this.yvo = () => {
        this.UiViewSequence.PlaySequence("UnSle");
      });
  }
  get ShopInfo() {
    return ModelManager_1.ModelManager.ShopModel.GetShopInfo(this.gvo);
  }
  get $2e() {
    return this.ShopInfo?.UpdateTime;
  }
  get SecondsToRefresh() {
    return this.vvo;
  }
  set SecondsToRefresh(e) {
    e <= 0 && this.vvo > 0 && this.Ivo(), (this.vvo = e);
  }
  OnBeforeCreate() {
    const e = "ShopView" + (1e4 + this.OpenParam);
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
    (this.fvo = new ShopItemInfoDetailPanel_1.ShopItemInfoDetailPanel()),
      await Promise.all([
        this.fvo.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()),
        ShopController_1.ShopController.SendShopInfoRequest(
          ModelManager_1.ModelManager.ShopModel.VersionId,
        ),
      ]);
  }
  OnStart() {
    (this.gvo = this.OpenParam),
      (this.ShopItemScrollView = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(4),
        this.GetItem(6).GetOwner(),
        () => {
          const e = new ShopMediumItemGrid_1.ShopMediumItemGrid();
          return e.BindOnExtendToggleStateChanged(this.OCt), e;
        },
      )),
      this.ChildPopView?.PopItem.SetMaskResponsibleState(!1),
      this.UpdateCurrency(),
      this.SetShopName(),
      this.RefreshShopItemList(!0),
      this.Tvo(),
      this.GetItem(1).SetUIActive(void 0 !== this.$2e && this.$2e > 0),
      (ModelManager_1.ModelManager.ShopModel.CurrentInteractCreatureDataLongId =
        ModelManager_1.ModelManager.InteractionModel.InteractCreatureDataLongId);
  }
  Lvo(e) {
    let t = "";
    const i = EntitySystem_1.EntitySystem.Get(
      ModelManager_1.ModelManager.ShopModel.InteractTarget,
    );
    i && (t = i.GetComponent(102)?.PawnName ?? ""), this.GetText(2).SetText(t);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OpenItemInfo,
      this.Evo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseItemInfo,
        this.yvo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BoughtItem,
        this.Svo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ShopUpdate,
        this.uio,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OpenItemInfo,
      this.Evo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseItemInfo,
        this.yvo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BoughtItem,
        this.Svo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ShopUpdate,
        this.uio,
      );
  }
  OnTick(e) {
    this.Tvo();
  }
  Tvo() {
    let e;
    void 0 === this.$2e || this.$2e === 0
      ? this.GetItem(1).SetUIActive(!1)
      : (e = this.FormatCountdown()) &&
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "RefreshTime", e);
  }
  OnBeforeDestroy() {
    (this.pvo.length = 0),
      this.ShopItemScrollView && this.ShopItemScrollView.ClearGridProxies(),
      this.fvo && this.fvo.Destroy();
    for (const e of this.LIt) e.Destroy();
    this.RootActor.OnSequencePlayEvent.Unbind();
  }
  SetShopName() {}
  UpdateCurrency() {
    const e = ModelManager_1.ModelManager.ShopModel.GetShopConfig(this.gvo);
    e && this.Lvo(e);
  }
  RefreshShopItemList(i = !1) {
    const e = new AsyncTask_1.AsyncTask(
      "ShopView.RefreshShopItemList",
      async () => {
        if (this.pvo)
          for (let e = 0; e < this.pvo.length; e++) {
            var t = this.pvo[e];
            var t =
              ModelManager_1.ModelManager.ShopModel.GetShopItemFullInfoByShopIdAndItemId(
                this.gvo,
                t.Id,
              );
            t && (this.pvo[e] = t);
          }
        else {
          const e = ModelManager_1.ModelManager.ShopModel.GetShopItemList(
            this.gvo,
          );
          this.pvo = e;
        }
        return (
          await this.ShopItemScrollView.RefreshByDataAsync(this.pvo, !1),
          i &&
            (this.ShopItemScrollView.ClearSelectInfo(),
            this.ShopItemScrollView.SelectGridProxy(0, !0),
            this.Evo()),
          !0
        );
      },
    );
    TaskSystem_1.TaskSystem.AddTask(e), TaskSystem_1.TaskSystem.Run();
  }
  FormatCountdown() {
    const e = Math.trunc(this.$2e - TimeUtil_1.TimeUtil.GetServerTime());
    if (!((this.SecondsToRefresh = e) <= 0))
      return ShopUtils_1.ShopUtils.FormatTime(e);
    ShopController_1.ShopController.SendShopUpdateRequest(this.gvo);
  }
  Ivo() {
    const e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(36);
    e.FunctionMap.set(1, () => {
      ShopController_1.ShopController.SendShopUpdateRequest(this.gvo);
    }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      );
  }
}
exports.ShopView = ShopView;
// # sourceMappingURL=ShopView.js.map

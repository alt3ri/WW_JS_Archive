"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueShopTabView = void 0);
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const TabComponent_1 = require("../../Common/TabComponent/TabComponent");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const PayShopItem_1 = require("./TabItem/PayShopItem");
const PayShopSwitchItem_1 = require("./TabItem/PayShopSwitchItem");
const TIMEGAP = 1e3;
class RogueShopTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.TabGroup = void 0),
      (this.PayShopGoodsList = []),
      (this.CurrentSelectTabId = 0),
      (this.LoopScrollView = void 0),
      (this._Fi = 0),
      (this.TDe = void 0),
      (this.tFi = (e, t, i) => {
        this._Fi === t &&
          this.CurrentSelectTabId === i &&
          this.LoopScrollView.RefreshAllGridProxies();
      }),
      (this.iFi = (e) => {
        this.RefreshLoopScroll(this.CurrentSelectTabId);
      }),
      (this.InitItem = () => {
        return new PayShopItem_1.PayShopItem();
      }),
      (this.fqe = (e, t) => {
        return new PayShopSwitchItem_1.PayShopSwitchItem();
      }),
      (this.pqe = (e) => {
        const t = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabIdList(
          this._Fi,
        );
        (this.CurrentSelectTabId = t[e]),
          this.RefreshLoopScroll(this.CurrentSelectTabId);
      }),
      (this.GetProxyData = (e) => this.PayShopGoodsList[e]);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UILoopScrollViewComponent],
      [3, UE.UIItem],
      [2, UE.UIHorizontalLayout],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIText],
    ];
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GoodsSoldOut,
      this.iFi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshGoods,
        this.tFi,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GoodsSoldOut,
      this.iFi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshGoods,
        this.tFi,
      );
  }
  OnStart() {
    this.TabGroup = new TabComponent_1.TabComponent(
      this.GetHorizontalLayout(2).GetRootComponent(),
      this.fqe,
      this.pqe,
      this.GetItem(3),
    );
    const e = this.GetScrollItem();
    (this.LoopScrollView = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(1),
      e.GetOwner(),
      this.InitItem,
    )),
      this.GetItem(0).SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(9),
        "Rogue_Shop_Sold_out",
      );
  }
  GetScrollItem() {
    return this.GetItem(0);
  }
  RefreshLoopScroll(e) {
    (this.PayShopGoodsList =
      ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(this._Fi, e)),
      this.LoopScrollView.ReloadProxyData(
        this.GetProxyData,
        this.PayShopGoodsList.length,
        !1,
      ),
      this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(
        this.PayShopGoodsList.length > 0,
      ),
      this.GetItem(8).SetUIActive(this.PayShopGoodsList.length <= 0);
  }
  OnAfterShow() {
    this._Fi = this.Params;
    let e = 0;
    if (this.ExtraParams) {
      const i = this.ExtraParams;
      const t = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabIdList(
        this._Fi,
      );
      (e = t.findIndex((e) => e === i)),
        (e = MathUtils_1.MathUtils.Clamp(e, 0, t.length - 1));
    }
    this.GetText(5).SetUIActive(!1),
      this.t7e(e),
      this.Tit(),
      this.OnDiscountShopAfterShow();
  }
  OnDiscountShopAfterShow() {}
  Tit() {
    this.TDe = TimerSystem_1.TimerSystem.Forever(() => {
      this.oFi();
    }, TIMEGAP);
  }
  p7e() {
    void 0 !== this.TDe &&
      (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
  oFi() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.DiscountShopTimerRefresh,
    );
  }
  t7e(i) {
    const s = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabIdList(
      this._Fi,
    );
    const e = s.length;
    this.TabGroup.ResetLastSelectTab();
    this.TabGroup.RefreshTabItemByLength(e, () => {
      let e, t;
      for ([e, t] of this.TabGroup.GetTabItemMap())
        t.UpdateView(this._Fi, s[e]), t.BindRedDot("PayShopTab", s[e]);
      this.TabGroup.SelectToggleByIndex(i, !0);
    });
  }
  RefreshView(e) {
    typeof e !== "number" && this.RefreshLoopScroll(this.CurrentSelectTabId);
  }
  OnBeforeHide() {
    this.p7e();
  }
  OnBeforeDestroy() {
    this.TabGroup.Destroy(), this.LoopScrollView.ClearGridProxies();
  }
}
exports.RogueShopTabView = RogueShopTabView;
// # sourceMappingURL=RogueShopTabView.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CumulativeShopSubView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  PayShopItem_1 = require("../../../PayShop/PayShopTab/TabItem/PayShopItem"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA"),
  TIMEGAP = 1e3,
  REWARD_ITEM_ID = 46;
class CumulativeShopSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.fg1 = void 0),
      (this.LNe = void 0),
      (this.uxl = void 0),
      (this.vVt = void 0),
      (this.PayShopGoodsList = []),
      (this.TDe = void 0),
      (this.Ftl = ""),
      (this.gR1 = ""),
      (this.gg1 = () => {
        UiManager_1.UiManager.OpenView("CumulativeShopTaskView");
      }),
      (this.sGe = () => {
        return new PayShopItem_1.PayShopItem();
      }),
      (this.GetProxyData = (e) => this.PayShopGoodsList[e]),
      (this.t3i = (e, i, t) => {
        215 === i && this.vVt.RefreshAllGridProxies();
      }),
      (this.i3i = (e) => {
        this.RefreshLoopScroll();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UILoopScrollViewComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
    ];
  }
  OnSetData() {
    this.fg1 = this.ActivityBaseData;
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(4),
      e =
        ((this.uxl = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(
          this.fg1,
        )),
        await this.uxl.CreateThenShowByActorAsync(e.GetOwner()),
        this.uxl.FunctionButton.SetFunction(this.gg1),
        this.uxl.FunctionButton.SetLocalTextNew("LeiXiao_GetScore"),
        this.GetItem(0));
    (this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
      await this.LNe.CreateThenShowByActorAsync(e.GetOwner()),
      (this.vVt = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(2),
        this.GetItem(3).GetOwner(),
        this.sGe,
      ));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GoodsSoldOut,
      this.i3i,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshGoods,
        this.t3i,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GoodsSoldOut,
      this.i3i,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshGoods,
        this.t3i,
      );
  }
  OnStart() {
    (this.Ftl =
      ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
        "LeiXiao_GetScore_prompt",
      ) ?? ""),
      (this.gR1 =
        ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
          "ActivityRemainingTime",
        ) ?? ""),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        "keyActivity_105100001_Desc",
      ),
      this.LNe.SetTitleByText(this.fg1.GetTitle()),
      this.LNe.SetTimeTextVisible(!0);
    var e =
      ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(
        this.fg1.EndShowTime,
        this.gR1,
      ) ?? "";
    this.LNe.SetTimeTextByText(e), this.RefreshLoopScroll(), this.Yb1();
  }
  OnRefreshView() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.SetActivityViewCurrency,
      [REWARD_ITEM_ID],
    ),
      this.BNe();
  }
  OnAfterShow() {
    this.kot();
  }
  RefreshLoopScroll() {
    (this.PayShopGoodsList =
      ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(215)),
      this.vVt.ReloadProxyData(
        this.GetProxyData,
        this.PayShopGoodsList.length,
        !1,
      ),
      this.vVt.GetUiAnimController().Play();
  }
  kot() {
    this.TDe = TimerSystem_1.TimerSystem.Forever(() => {
      this.o3i(), this.Yb1();
    }, TIMEGAP);
  }
  xHe() {
    void 0 !== this.TDe &&
      (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
  OnBeforeHide() {
    this.xHe();
  }
  o3i() {
    this.LNe.SetTimeTextVisible(!0);
    var e =
      ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(
        this.fg1.EndShowTime,
        this.gR1,
      ) ?? "";
    this.LNe.SetTimeTextByText(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DiscountShopTimerRefresh,
      );
  }
  Yb1() {
    var e = this.fg1.EndOpenTime;
    e <= TimeUtil_1.TimeUtil.GetServerTime()
      ? (LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(5),
          "CumulativeShopOpenTimeEnd",
        ),
        this.uxl.FunctionButton.SetEnableClick(!1))
      : ((e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(
          e,
          this.Ftl,
        )),
        this.GetText(5).SetText(e));
  }
  BNe() {
    var e = this.fg1.GetAnyTaskRedDot();
    this.uxl.SetFunctionRedDotVisible(e);
  }
}
exports.CumulativeShopSubView = CumulativeShopSubView;
//# sourceMappingURL=CumulativeShopSubView.js.map

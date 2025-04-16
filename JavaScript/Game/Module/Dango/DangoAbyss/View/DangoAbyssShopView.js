"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssShopView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  ActivityShopGridItem_1 = require("../../../Activity/ActivityContent/Common/ActivityShopGridItem"),
  ActivityShopScrollItem_1 = require("../../../Activity/ActivityContent/Common/ActivityShopScrollItem"),
  CommonCurrencyItemListComponent_1 = require("../../../Common/CommonCurrencyItemListComponent"),
  UiCameraAnimationController_1 = require("../../../UiCameraAnimation/UiCameraAnimationController"),
  DangoAbyssDefine_1 = require("../DangoAbyssDefine"),
  DANGOSHOP = "DangoAbyssShop",
  MODELINDEX = 99,
  CHANGECD = 1800;
class DangoAbyssShopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.ucr = void 0),
      (this.kVc = void 0),
      (this.dM1 = 0),
      (this.mM1 = !1),
      (this.fM1 = 0),
      (this.gM1 = void 0),
      (this._5e = () => {
        this.CloseMe();
      }),
      (this.v7t = (e) => {
        "CommonRewardView" === e &&
          (this.CM1(),
          this.pM1(
            ConfigManager_1.ConfigManager.DangoAbyssConfig.GetBadDangoBuyAni(),
            !1,
          ),
          (this.gM1 = TimerSystem_1.TimerSystem.Delay(() => {
            this.pM1(
              ConfigManager_1.ConfigManager.DangoAbyssConfig.GetBadDangoStandAni(),
              !0,
            );
          }, ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoShopBuyTime())));
      }),
      (this.YFi = (e, i, t) => {
        this.dM1 = 0;
      }),
      (this.vM1 = () => {
        var e = new Date().getTime();
        e - this.fM1 < CHANGECD ||
          ((this.fM1 = e),
          this.dM1++,
          3 < this.dM1
            ? this.mM1 ||
              ((this.mM1 = !0),
              this.pM1(
                ConfigManager_1.ConfigManager.DangoAbyssConfig.GetBadDangoBadDangoPinkOverAni(),
                !0,
              ),
              this.CM1())
            : (this.pM1(
                ConfigManager_1.ConfigManager.DangoAbyssConfig.GetBadDangoBadDangoPinkAni(),
                !1,
              ),
              this.CM1(),
              (this.gM1 = TimerSystem_1.TimerSystem.Delay(() => {
                this.pM1(
                  ConfigManager_1.ConfigManager.DangoAbyssConfig.GetBadDangoStandAni(),
                  !0,
                );
              }, ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoShopClickTime()))));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UILoopScrollViewComponent],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this._5e],
        [4, this.vM1],
      ]);
  }
  GetLoopAudioEventSwitch() {
    return !ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance();
  }
  OnHandleLoadScene() {
    ControllerHolder_1.ControllerHolder.DangoAbyssController.InitAbyssDangoObserver(
      MODELINDEX,
    );
  }
  OnHandleReleaseScene() {
    ControllerHolder_1.ControllerHolder.DangoAbyssController.DestroyAbyssDangoObserver(
      MODELINDEX,
    );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshGoods,
      this.YFi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.v7t,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshGoods,
      this.YFi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.v7t,
      );
  }
  pM1(e, i) {
    ControllerHolder_1.ControllerHolder.DangoAbyssController.RefreshAbyssDangoAnimation(
      MODELINDEX,
      e,
      i,
    );
  }
  CM1() {
    TimerSystem_1.TimerSystem.Has(this.gM1) &&
      (TimerSystem_1.TimerSystem.Remove(this.gM1), (this.gM1 = void 0));
  }
  async OnBeforeStartAsync() {
    this.ucr =
      new CommonCurrencyItemListComponent_1.CommonCurrencyItemListComponent(
        this.GetItem(1),
      );
    var e = this.GetLoopScrollViewComponent(2),
      i = this.GetItem(3),
      i =
        ((this.kVc = new ActivityShopScrollItem_1.ActivityShopScrollItem(
          e,
          i,
          this.GetViewId(),
          ActivityShopGridItem_1.ActivityShopGridItem,
        )),
        await this.kVc.CreateThenShowByActorAsync(e.GetOwner()),
        ModelManager_1.ModelManager.DangoAbyssModel.GetOpenShopId());
    0 < i &&
      ((e = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(i)),
      await this.ucr.SetCurrencyItemList(e.Money));
  }
  PushCameraHandle(e, i, t) {
    UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(
      DANGOSHOP,
      this.GetViewId(),
      !0,
    );
  }
  PopCameraHandle(e, i, t, n) {
    UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(
      DANGOSHOP,
      i,
      t,
      n,
    );
  }
  OnBeforeShow() {
    ControllerHolder_1.ControllerHolder.DangoAbyssController.RefreshAbyssDangoModel(
      MODELINDEX,
      DangoAbyssDefine_1.BADDANGOID,
      "MonsterCase2",
      void 0,
    ),
      this.PushCameraHandle(DANGOSHOP, this.GetViewId(), !0);
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetOpenShopId();
    this.kVc.Refresh(e);
  }
}
exports.DangoAbyssShopView = DangoAbyssShopView;
//# sourceMappingURL=DangoAbyssShopView.js.map

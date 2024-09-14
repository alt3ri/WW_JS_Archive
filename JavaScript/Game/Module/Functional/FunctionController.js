"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FunctionController = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  FunctionOpenViewLimitAll_1 = require("../../../Core/Define/ConfigQuery/FunctionOpenViewLimitAll"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  InputDistributeDefine_1 = require("../../Ui/InputDistribute/InputDistributeDefine"),
  UiManager_1 = require("../../Ui/UiManager"),
  UiModel_1 = require("../../Ui/UiModel"),
  TutorialController_1 = require("../Tutorial/TutorialController");
class FunctionController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      this.K9t.set(10001, FunctionController.Q9t),
      this.K9t.set(10002, FunctionController.X9t),
      this.K9t.set(10003, FunctionController.$9t),
      this.K9t.set(10004, FunctionController.Y9t),
      this.K9t.set(10020, FunctionController.J9t),
      this.K9t.set(10018, FunctionController.z9t),
      this.K9t.set(10015, FunctionController.Fut),
      this.K9t.set(10019, FunctionController.Z9t),
      this.K9t.set(10007, FunctionController.e7t),
      this.K9t.set(10011, FunctionController.t7t),
      this.K9t.set(10010, FunctionController.i7t),
      this.K9t.set(10009, FunctionController.o7t),
      this.K9t.set(
        10022,
        TutorialController_1.TutorialController.OpenTutorialView,
      ),
      this.K9t.set(
        10023,
        ControllerHolder_1.ControllerHolder.AdventureGuideController
          .OpenGuideView,
      ),
      this.K9t.set(10026, FunctionController.r7t),
      this.K9t.set(10029, FunctionController.n7t),
      this.K9t.set(10028, FunctionController.s7t),
      this.K9t.set(10034, FunctionController.a7t),
      this.K9t.set(10035, FunctionController.h7t),
      this.K9t.set(10040, FunctionController.l7t),
      this.K9t.set(10041, FunctionController._7t),
      this.K9t.set(10051, FunctionController.u7t),
      this.K9t.set(10049, FunctionController.c7t),
      this.K9t.set(10013, FunctionController.m7t),
      this.K9t.set(10053, FunctionController.d7t),
      this.K9t.set(10028, FunctionController.C7t),
      this.K9t.set(10058, FunctionController.g7t),
      this.K9t.set(10021, FunctionController.f7t),
      !0
    );
  }
  static InitFunctionOpenViewLimit() {
    var o =
        FunctionOpenViewLimitAll_1.configFunctionOpenViewLimitAll.GetConfigList(),
      e = o.length;
    for (let n = 0; n < e; n++) {
      var t = o[n];
      this.p7t.add(t.ViewName);
    }
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.v7t);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CloseView,
      this.v7t,
    );
  }
  static async TryOpenFunctionOpenView() {
    if (!this.M7t()) return !1;
    const o = new CustomPromise_1.CustomPromise();
    return (
      UiManager_1.UiManager.IsViewOpen("FunctionOpenView") ||
        UiManager_1.UiManager.OpenView("FunctionOpenView", void 0, (n) => {
          o.SetResult(n);
        }),
      o.Promise
    );
  }
  static async ManualOpenFunctionOpenView(...n) {
    var o,
      e = [];
    for (const t of n)
      2 !==
      ConfigManager_1.ConfigManager.FunctionConfig.GetFunctionCondition(t)
        .ShowUIType
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Functional",
            11,
            "传入的id表格不支持手动开启,详细查功能开启表",
            ["FunctionId", t],
          )
        : (o =
              ModelManager_1.ModelManager.FunctionModel.GetFunctionInstance(
                t,
              )).GetIsOpen()
          ? o.GetHasManualShowUi()
            ? Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Functional",
                11,
                "传入的id已经手动开启过了,不允许再次开启",
                ["FunctionId", t],
              )
            : e.push(t)
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Functional", 11, "传入的id还未开启", [
              "FunctionId",
              t,
            ]);
    return !(e.length <= 0) && this.E7t(e);
  }
  static async E7t(n) {
    var o = Protocol_1.Aki.Protocol.Krs.create(),
      o = ((o.d6n = n), await Net_1.Net.CallAsync(28051, o));
    return o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
      ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          o.Q4n,
          26906,
        ),
        !1)
      : (ModelManager_1.ModelManager.FunctionModel.RefreshInfoManualState(n),
        this.TryOpenFunctionOpenView());
  }
  static M7t() {
    if (!ModelManager_1.ModelManager.FunctionModel.IsExistNewOpenFunction())
      return !1;
    let n = !1;
    var o = UiModel_1.UiModel.NormalStack.Peek();
    if (!o) return !1;
    if (
      !(n =
        !(n = "BattleView" === o.Info.Name ? !0 : n) && this.S7t(o.Info.Name)
          ? !0
          : n)
    )
      return !1;
    if (!ModelManager_1.ModelManager.InputDistributeModel.IsAllowUiInput())
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Functional",
            38,
            "功能开启界面打开时UI输入存在限制,不打开",
          ),
        ModelManager_1.ModelManager.InputDistributeModel.AddInputDistributeTagChangedListener(
          InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag,
          this.xMe,
        ),
        !1
      );
    let e = !0;
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    for (const r of [1733479717, -1791250236])
      t?.GameplayTagComponent?.HasTag(r) &&
        (t?.GameplayTagComponent?.AddTagAddOrRemoveListener(
          r,
          FunctionController.Uzs,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Functional", 38, "功能开启界面打开时存在Tag限制", [
            "TagId",
            r,
          ]),
        (e = !1));
    return !!e;
  }
  static S7t(n) {
    return (
      this.y7t || (this.InitFunctionOpenViewLimit(), (this.y7t = !0)),
      this.p7t.has(n)
    );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(23819, (n) => {
      ModelManager_1.ModelManager.FunctionModel.SetFunctionOpenInfo(n);
    }),
      Net_1.Net.Register(29421, (n) => {
        ModelManager_1.ModelManager.FunctionModel.UpdateFunctionOpenInfo(n),
          FunctionController.TryOpenFunctionOpenView();
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(23819), Net_1.Net.UnRegister(29421);
  }
  static async VWa() {
    1 ===
    (await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestrictedAsync(
      ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(),
    ))
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("MultiPlayerTeam", 28, "通信受限，拒绝申请"),
        this.bNa())
      : UiManager_1.UiManager.OpenView("FriendView");
  }
  static async bNa() {
    (await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenMessageBox(
      ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyUserId(),
      3,
      6,
    )) &&
      (this.u3a(),
      (this.c3a = TimerSystem_1.TimerSystem.Forever(() => {
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetMessageBoxCurrentState(
          (n) => {
            3 === n &&
              (this.u3a(),
              PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().TerminateMessageBox());
          },
        );
      }, 500)));
  }
  static async HWa() {
    var n, o;
    1 ===
    (await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestrictedAsync(
      ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(),
    ))
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("MultiPlayerTeam", 28, "通信受限，拒绝申请"),
        this.bNa())
      : ((n = ModelManager_1.ModelManager.GameModeModel.IsMulti),
        (o = ModelManager_1.ModelManager.OnlineModel.IsOnlineDisabled()),
        !n && o
          ? ControllerHolder_1.ControllerHolder.OnlineController.ShowTipsWhenOnlineDisabled()
          : UiManager_1.UiManager.OpenView("OnlineWorldHallView"));
  }
  static OpenFunctionRelateView(n) {
    var o;
    ModelManager_1.ModelManager.FunctionModel.IsOpen(n)
      ? (o = FunctionController.K9t.get(n))
        ? o()
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Functional",
            11,
            "原因：查找不到对应按钮打开界面的实现方式 解决：在FunctionController.OpenFunctionViewMap注册打开界面方法",
            ["功能ID", n],
          )
      : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "FunctionDisable",
        );
  }
  static u3a() {
    this.c3a &&
      TimerSystem_1.TimerSystem.Has(this.c3a) &&
      (TimerSystem_1.TimerSystem.Remove(this.c3a), (this.c3a = void 0));
  }
  static OnClear() {
    return this.u3a(), !0;
  }
}
(exports.FunctionController = FunctionController),
  ((_a = FunctionController).y7t = !1),
  (FunctionController.K9t = new Map()),
  (FunctionController.p7t = new Set()),
  (FunctionController.c3a = void 0),
  (FunctionController.xMe = (n, o) => {
    o &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Functional", 38, "功能开启界面打开时InputTag限制解除"),
      ModelManager_1.ModelManager.InputDistributeModel.RemoveInputDistributeTagChangedListener(
        InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag,
        _a.xMe,
      ),
      _a.TryOpenFunctionOpenView());
  }),
  (FunctionController.Uzs = (n, o) => {
    o ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Functional", 38, "功能开启界面打开时Tag限制解除", [
          "TagId",
          n,
        ]),
      ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()?.GameplayTagComponent?.RemoveTagAddOrRemoveListener(
        n,
        FunctionController.Uzs,
      ),
      _a.TryOpenFunctionOpenView());
  }),
  (FunctionController.v7t = (n) => {
    FunctionController.TryOpenFunctionOpenView();
  }),
  (FunctionController.Q9t = () => {
    ControllerHolder_1.ControllerHolder.RoleController.OpenRoleMainView(0);
  }),
  (FunctionController.X9t = () => {
    UiManager_1.UiManager.OpenView("InventoryView");
  }),
  (FunctionController.$9t = () => {
    UiManager_1.UiManager.OpenView("CalabashRootView");
  }),
  (FunctionController.Y9t = () => {
    UiManager_1.UiManager.OpenView("QuestView");
  }),
  (FunctionController.J9t = () => {
    UiManager_1.UiManager.OpenView("MailBoxView");
  }),
  (FunctionController.Z9t = () => {
    UiManager_1.UiManager.OpenView("MenuView");
  }),
  (FunctionController.Fut = () => {
    ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(1, !1);
  }),
  (FunctionController.e7t = () => {
    UiManager_1.UiManager.OpenView("EditFormationView");
  }),
  (FunctionController.z9t = () => {
    UiManager_1.UiManager.OpenView("TimeOfDaySecondView");
  }),
  (FunctionController.t7t = () => {
    _a.VWa();
  }),
  (FunctionController.i7t = () => {
    ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView();
  }),
  (FunctionController.o7t = () => {
    ControllerHolder_1.ControllerHolder.GachaController.OpenGachaMainView(!0);
  }),
  (FunctionController.r7t = () => {
    ControllerHolder_1.ControllerHolder.RouletteController.OpenAssemblyView();
  }),
  (FunctionController.s7t = () => {
    ControllerHolder_1.ControllerHolder.KuroSdkController.OpenFeedback();
  }),
  (FunctionController.n7t = () => {}),
  (FunctionController._7t = () => {
    UiManager_1.UiManager.OpenView("RoleHandBookSelectionView");
  }),
  (FunctionController.u7t = () => {
    UiManager_1.UiManager.OpenView("HandBookEntranceView");
  }),
  (FunctionController.c7t = () => {
    ControllerHolder_1.ControllerHolder.PhotographController.TryOpenPhotograph(
      0,
    );
  }),
  (FunctionController.d7t = () => {
    ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityById(
      0,
      2,
    );
  }),
  (FunctionController.C7t = () => {
    ControllerHolder_1.ControllerHolder.LogController.RequestOutputDebugInfo(),
      ControllerHolder_1.ControllerHolder.KuroSdkController.OpenCustomerService(
        2,
      );
  }),
  (FunctionController.g7t = () => {
    ControllerHolder_1.ControllerHolder.ChannelController.OpenKuroStreet();
  }),
  (FunctionController.f7t = () => {
    _a.HWa();
  }),
  (FunctionController.m7t = () => {
    ControllerHolder_1.ControllerHolder.AchievementController.OpenAchievementMainView();
  }),
  (FunctionController.h7t = () => {
    UiManager_1.UiManager.OpenView("ComposeRootView");
  }),
  (FunctionController.a7t = () => {
    UiManager_1.UiManager.OpenView("ForgingRootView");
  }),
  (FunctionController.l7t = () => {
    ControllerHolder_1.ControllerHolder.BattlePassController.OpenBattlePassView();
  });
//# sourceMappingURL=FunctionController.js.map

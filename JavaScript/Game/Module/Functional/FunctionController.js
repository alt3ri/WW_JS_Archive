"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FunctionController = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  FunctionOpenViewLimitAll_1 = require("../../../Core/Define/ConfigQuery/FunctionOpenViewLimitAll"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
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
  MailBindController_1 = require("../MailBind/MailBindController"),
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
      this.K9t.set(10072, FunctionController.jtl),
      !0
    );
  }
  static InitFunctionOpenViewLimit() {
    var o =
        FunctionOpenViewLimitAll_1.configFunctionOpenViewLimitAll.GetConfigList(),
      e = o.length;
    for (let n = 0; n < e; n++) {
      var r = o[n];
      this.p7t.add(r.ViewName);
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
    for (const r of n)
      2 !==
      ConfigManager_1.ConfigManager.FunctionConfig.GetFunctionCondition(r)
        .ShowUIType
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Functional",
            10,
            "传入的id表格不支持手动开启,详细查功能开启表",
            ["FunctionId", r],
          )
        : (o =
              ModelManager_1.ModelManager.FunctionModel.GetFunctionInstance(
                r,
              )).GetIsOpen()
          ? o.GetHasManualShowUi()
            ? Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Functional",
                10,
                "传入的id已经手动开启过了,不允许再次开启",
                ["FunctionId", r],
              )
            : e.push(r)
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Functional", 10, "传入的id还未开启", [
              "FunctionId",
              r,
            ]);
    return !(e.length <= 0) && this.E7t(e);
  }
  static async E7t(n) {
    var o = Protocol_1.Aki.Protocol.Krs.create(),
      o = ((o.d6n = n), await Net_1.Net.CallAsync(20829, o));
    return o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
      ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          o.Q4n,
          16567,
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
            37,
            "功能开启界面打开时UI输入存在限制,不打开",
          ),
        ModelManager_1.ModelManager.InputDistributeModel.AddInputDistributeTagChangedListener(
          InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag,
          this.xMe,
        ),
        !1
      );
    let e = !0;
    var r = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    for (const t of [1733479717, -1791250236])
      r?.GameplayTagComponent?.HasTag(t) &&
        (r?.GameplayTagComponent?.AddTagAddOrRemoveListener(
          t,
          FunctionController.Uzs,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Functional", 37, "功能开启界面打开时存在Tag限制", [
            "TagId",
            t,
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
    Net_1.Net.Register(15535, (n) => {
      ModelManager_1.ModelManager.FunctionModel.SetFunctionOpenInfo(n);
    }),
      Net_1.Net.Register(22568, (n) => {
        ModelManager_1.ModelManager.FunctionModel.UpdateFunctionOpenInfo(n),
          FunctionController.TryOpenFunctionOpenView();
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15535), Net_1.Net.UnRegister(22568);
  }
  static async mXa() {
    1 ===
    (await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestrictedAsync(
      ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(),
    ))
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("MultiPlayerTeam", 27, "通信受限，拒绝申请"),
        this.O3a())
      : UiManager_1.UiManager.OpenView("FriendView");
  }
  static async O3a() {
    await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenMessageBox(
      ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyUserId(),
      3,
      6,
    );
  }
  static async dXa() {
    var n, o;
    1 ===
    (await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestrictedAsync(
      ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(),
    ))
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("MultiPlayerTeam", 27, "通信受限，拒绝申请"),
        this.O3a())
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
            10,
            "原因：查找不到对应按钮打开界面的实现方式 解决：在FunctionController.OpenFunctionViewMap注册打开界面方法",
            ["功能ID", n],
          )
      : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "FunctionDisable",
        );
  }
  static OnClear() {
    return !0;
  }
}
(exports.FunctionController = FunctionController),
  ((_a = FunctionController).y7t = !1),
  (FunctionController.K9t = new Map()),
  (FunctionController.p7t = new Set()),
  (FunctionController.xMe = (n, o) => {
    o &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Functional", 37, "功能开启界面打开时InputTag限制解除"),
      ModelManager_1.ModelManager.InputDistributeModel.RemoveInputDistributeTagChangedListener(
        InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag,
        _a.xMe,
      ),
      _a.TryOpenFunctionOpenView());
  }),
  (FunctionController.Uzs = (n, o) => {
    o ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Functional", 37, "功能开启界面打开时Tag限制解除", [
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
    _a.mXa();
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
    ModelManager_1.ModelManager.MailBindModel?.GetIsReward()
      ? ControllerHolder_1.ControllerHolder.ChannelController.OpenKuroStreet()
      : UiManager_1.UiManager.OpenView("MailBindView", !1),
      MailBindController_1.MailBindController.RecordMailBindClick();
  }),
  (FunctionController.jtl = () => {
    UiManager_1.UiManager.OpenView("MailBindView", !0),
      MailBindController_1.MailBindController.RecordMailBindClick();
  }),
  (FunctionController.f7t = () => {
    _a.dXa();
  }),
  (FunctionController.m7t = () => {
    ControllerHolder_1.ControllerHolder.AchievementController.OpenAchievementMainView();
  }),
  (FunctionController.h7t = () => {
    UiManager_1.UiManager.OpenView("ComposeCarryOnView");
  }),
  (FunctionController.a7t = () => {
    UiManager_1.UiManager.OpenView("ForgingRootView");
  }),
  (FunctionController.l7t = () => {
    ControllerHolder_1.ControllerHolder.BattlePassController.OpenBattlePassView();
  });
//# sourceMappingURL=FunctionController.js.map

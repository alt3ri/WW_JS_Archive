"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FunctionController = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  FunctionOpenViewLimitAll_1 = require("../../../Core/Define/ConfigQuery/FunctionOpenViewLimitAll"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
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
    var n =
        FunctionOpenViewLimitAll_1.configFunctionOpenViewLimitAll.GetConfigList(),
      e = n.length;
    for (let o = 0; o < e; o++) {
      var t = n[o];
      this.p7t.add(t.ViewName);
    }
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.v7t),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnInputDistributeTagChanged,
        this.xMe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CloseView,
      this.v7t,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnInputDistributeTagChanged,
        this.xMe,
      );
  }
  static async TryOpenFunctionOpenView() {
    if (!this.M7t()) return !1;
    const n = new CustomPromise_1.CustomPromise();
    return (
      UiManager_1.UiManager.IsViewOpen("FunctionOpenView") ||
        UiManager_1.UiManager.OpenView("FunctionOpenView", void 0, (o) => {
          n.SetResult(o);
        }),
      n.Promise
    );
  }
  static async ManualOpenFunctionOpenView(...o) {
    var n,
      e = [];
    for (const t of o)
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
        : (n =
              ModelManager_1.ModelManager.FunctionModel.GetFunctionInstance(
                t,
              )).GetIsOpen()
          ? n.GetHasManualShowUi()
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
  static async E7t(o) {
    var n = Protocol_1.Aki.Protocol.Nrs.create(),
      n = ((n.n6n = o), await Net_1.Net.CallAsync(16789, n));
    return n.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
      ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          n.O4n,
          27903,
        ),
        !1)
      : (ModelManager_1.ModelManager.FunctionModel.RefreshInfoManualState(o),
        this.TryOpenFunctionOpenView());
  }
  static M7t() {
    if (!ModelManager_1.ModelManager.FunctionModel.IsExistNewOpenFunction())
      return !1;
    if (!ModelManager_1.ModelManager.InputDistributeModel.IsAllowUiInput())
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Functional",
            38,
            "功能开启界面打开时UI输入存在限制,不打开",
          ),
        !(this.xYs = !0)
      );
    let o = !0;
    var n,
      e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    for (const t of [1733479717, -1791250236])
      e?.GameplayTagComponent?.HasTag(t) &&
        (e?.GameplayTagComponent?.AddTagAddOrRemoveListener(
          t,
          FunctionController.BYs,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Functional", 38, "功能开启界面打开时存在Tag限制", [
            "TagId",
            t,
          ]),
        (o = !1));
    return (
      !!o &&
      !(
        !(n = UiModel_1.UiModel.NormalStack.Peek()) ||
        (!this.S7t(n.Info.Name) && "BattleView" !== n.Info.Name)
      )
    );
  }
  static S7t(o) {
    return (
      this.y7t || (this.InitFunctionOpenViewLimit(), (this.y7t = !0)),
      this.p7t.has(o)
    );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(9312, (o) => {
      ModelManager_1.ModelManager.FunctionModel.SetFunctionOpenInfo(o);
    }),
      Net_1.Net.Register(12821, (o) => {
        ModelManager_1.ModelManager.FunctionModel.UpdateFunctionOpenInfo(o),
          FunctionController.TryOpenFunctionOpenView();
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(9312), Net_1.Net.UnRegister(12821);
  }
  static OpenFunctionRelateView(o) {
    var n;
    ModelManager_1.ModelManager.FunctionModel.IsOpen(o)
      ? (n = FunctionController.K9t.get(o))
        ? n()
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Functional",
            11,
            "原因：查找不到对应按钮打开界面的实现方式 解决：在FunctionController.OpenFunctionViewMap注册打开界面方法",
            ["功能ID", o],
          )
      : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "FunctionDisable",
        );
  }
}
(exports.FunctionController = FunctionController),
  ((_a = FunctionController).y7t = !1),
  (FunctionController.K9t = new Map()),
  (FunctionController.p7t = new Set()),
  (FunctionController.xYs = !1),
  (FunctionController.xMe = () => {
    _a.xYs && ((_a.xYs = !1), _a.TryOpenFunctionOpenView());
  }),
  (FunctionController.BYs = (o, n) => {
    n ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Functional", 38, "功能开启界面打开时Tag限制解除", [
          "TagId",
          o,
        ]),
      ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()?.GameplayTagComponent?.RemoveTagAddOrRemoveListener(
        o,
        FunctionController.BYs,
      ),
      _a.TryOpenFunctionOpenView());
  }),
  (FunctionController.v7t = (o) => {
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
    UiManager_1.UiManager.OpenView("FriendView");
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
    var o = ModelManager_1.ModelManager.GameModeModel.IsMulti,
      n = ModelManager_1.ModelManager.OnlineModel.IsOnlineDisabled();
    !o && n
      ? ControllerHolder_1.ControllerHolder.OnlineController.ShowTipsWhenOnlineDisabled()
      : UiManager_1.UiManager.OpenView("OnlineWorldHallView");
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

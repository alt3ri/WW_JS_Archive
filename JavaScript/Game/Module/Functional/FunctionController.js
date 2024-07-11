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
  AchievementController_1 = require("../Achievement/AchievementController"),
  ActivityController_1 = require("../Activity/ActivityController"),
  ChannelController_1 = require("../Channel/ChannelController"),
  GachaController_1 = require("../Gacha/GachaController"),
  BattlePassController_1 = require("../PayShop/BattlePass/BattlePassController"),
  PayShopController_1 = require("../PayShop/PayShopController"),
  PhotographController_1 = require("../Photograph/PhotographController"),
  RoleController_1 = require("../RoleUi/RoleController"),
  RouletteController_1 = require("../Roulette/RouletteController"),
  TutorialController_1 = require("../Tutorial/TutorialController"),
  WorldMapController_1 = require("../WorldMap/WorldMapController");
class FunctionController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      this.K8t.set(10001, FunctionController.Q8t),
      this.K8t.set(10002, FunctionController.X8t),
      this.K8t.set(10003, FunctionController.$8t),
      this.K8t.set(10004, FunctionController.Y8t),
      this.K8t.set(10020, FunctionController.J8t),
      this.K8t.set(10018, FunctionController.z8t),
      this.K8t.set(10015, FunctionController.T_t),
      this.K8t.set(10019, FunctionController.Z8t),
      this.K8t.set(10007, FunctionController.e9t),
      this.K8t.set(10011, FunctionController.t9t),
      this.K8t.set(10010, FunctionController.i9t),
      this.K8t.set(10009, FunctionController.o9t),
      this.K8t.set(
        10022,
        TutorialController_1.TutorialController.OpenTutorialView,
      ),
      this.K8t.set(
        10023,
        ControllerHolder_1.ControllerHolder.AdventureGuideController
          .OpenGuideView,
      ),
      this.K8t.set(10026, FunctionController.r9t),
      this.K8t.set(10029, FunctionController.n9t),
      this.K8t.set(10028, FunctionController.s9t),
      this.K8t.set(10034, FunctionController.a9t),
      this.K8t.set(10035, FunctionController.h9t),
      this.K8t.set(10040, FunctionController.l9t),
      this.K8t.set(10041, FunctionController._9t),
      this.K8t.set(10051, FunctionController.u9t),
      this.K8t.set(10049, FunctionController.c9t),
      this.K8t.set(10013, FunctionController.m9t),
      this.K8t.set(10053, FunctionController.d9t),
      this.K8t.set(10028, FunctionController.C9t),
      this.K8t.set(10058, FunctionController.g9t),
      this.K8t.set(10021, FunctionController.f9t),
      !0
    );
  }
  static InitFunctionOpenViewLimit() {
    var n =
        FunctionOpenViewLimitAll_1.configFunctionOpenViewLimitAll.GetConfigList(),
      e = n.length;
    for (let o = 0; o < e; o++) {
      var t = n[o];
      this.p9t.add(t.ViewName);
    }
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.v9t),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnInputDistributeTagChanged,
        this.xMe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CloseView,
      this.v9t,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnInputDistributeTagChanged,
        this.xMe,
      );
  }
  static async TryOpenFunctionOpenView() {
    if (!this.M9t()) return !1;
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
    return !(e.length <= 0) && this.S9t(e);
  }
  static async S9t(o) {
    var n = Protocol_1.Aki.Protocol.WZn.create(),
      n = ((n.RFn = o), await Net_1.Net.CallAsync(3861, n));
    return n.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
      ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          n.lkn,
          23148,
        ),
        !1)
      : (ModelManager_1.ModelManager.FunctionModel.RefreshInfoManualState(o),
        this.TryOpenFunctionOpenView());
  }
  static M9t() {
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
        !(this.j8s = !0)
      );
    let o = !0;
    var n,
      e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    for (const t of [1733479717, -1791250236])
      e?.GameplayTagComponent?.HasTag(t) &&
        (e?.GameplayTagComponent?.AddTagAddOrRemoveListener(
          t,
          FunctionController.W8s,
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
        (!this.E9t(n.Info.Name) && "BattleView" !== n.Info.Name)
      )
    );
  }
  static E9t(o) {
    return (
      this.y9t || (this.InitFunctionOpenViewLimit(), (this.y9t = !0)),
      this.p9t.has(o)
    );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(24818, (o) => {
      ModelManager_1.ModelManager.FunctionModel.SetFunctionOpenInfo(o);
    }),
      Net_1.Net.Register(7220, (o) => {
        ModelManager_1.ModelManager.FunctionModel.UpdateFunctionOpenInfo(o),
          FunctionController.TryOpenFunctionOpenView();
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(24818), Net_1.Net.UnRegister(7220);
  }
  static OpenFunctionRelateView(o) {
    var n;
    ModelManager_1.ModelManager.FunctionModel.IsOpen(o)
      ? (n = FunctionController.K8t.get(o))
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
  ((_a = FunctionController).y9t = !1),
  (FunctionController.K8t = new Map()),
  (FunctionController.p9t = new Set()),
  (FunctionController.j8s = !1),
  (FunctionController.xMe = () => {
    _a.j8s && ((_a.j8s = !1), _a.TryOpenFunctionOpenView());
  }),
  (FunctionController.W8s = (o, n) => {
    n ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Functional", 38, "功能开启界面打开时Tag限制解除", [
          "TagId",
          o,
        ]),
      ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()?.GameplayTagComponent?.RemoveTagAddOrRemoveListener(
        o,
        FunctionController.W8s,
      ),
      _a.TryOpenFunctionOpenView());
  }),
  (FunctionController.v9t = (o) => {
    FunctionController.TryOpenFunctionOpenView();
  }),
  (FunctionController.Q8t = () => {
    RoleController_1.RoleController.OpenRoleMainView(0);
  }),
  (FunctionController.X8t = () => {
    UiManager_1.UiManager.OpenView("InventoryView");
  }),
  (FunctionController.$8t = () => {
    UiManager_1.UiManager.OpenView("CalabashRootView");
  }),
  (FunctionController.Y8t = () => {
    UiManager_1.UiManager.OpenView("QuestView");
  }),
  (FunctionController.J8t = () => {
    UiManager_1.UiManager.OpenView("MailBoxView");
  }),
  (FunctionController.Z8t = () => {
    UiManager_1.UiManager.OpenView("MenuView");
  }),
  (FunctionController.T_t = () => {
    WorldMapController_1.WorldMapController.OpenView(1, !1);
  }),
  (FunctionController.e9t = () => {
    UiManager_1.UiManager.OpenView("EditFormationView");
  }),
  (FunctionController.z8t = () => {
    UiManager_1.UiManager.OpenView("TimeOfDaySecondView");
  }),
  (FunctionController.t9t = () => {
    UiManager_1.UiManager.OpenView("FriendView");
  }),
  (FunctionController.i9t = () => {
    PayShopController_1.PayShopController.OpenPayShopView();
  }),
  (FunctionController.o9t = () => {
    GachaController_1.GachaController.OpenGachaMainView(!0);
  }),
  (FunctionController.r9t = () => {
    RouletteController_1.RouletteController.OpenAssemblyView();
  }),
  (FunctionController.s9t = () => {
    ControllerHolder_1.ControllerHolder.KuroSdkController.OpenFeedback();
  }),
  (FunctionController.n9t = () => {}),
  (FunctionController._9t = () => {
    UiManager_1.UiManager.OpenView("RoleHandBookSelectionView");
  }),
  (FunctionController.u9t = () => {
    UiManager_1.UiManager.OpenView("HandBookEntranceView");
  }),
  (FunctionController.c9t = () => {
    PhotographController_1.PhotographController.TryOpenPhotograph(0);
  }),
  (FunctionController.d9t = () => {
    ActivityController_1.ActivityController.OpenActivityById(0, 2);
  }),
  (FunctionController.C9t = () => {
    ControllerHolder_1.ControllerHolder.KuroSdkController.OpenCustomerService(
      2,
    );
  }),
  (FunctionController.g9t = () => {
    ChannelController_1.ChannelController.OpenKuroStreet();
  }),
  (FunctionController.f9t = () => {
    var o = ModelManager_1.ModelManager.GameModeModel.IsMulti,
      n = ModelManager_1.ModelManager.OnlineModel.IsOnlineDisabled();
    !o && n
      ? ControllerHolder_1.ControllerHolder.OnlineController.ShowTipsWhenOnlineDisabled()
      : UiManager_1.UiManager.OpenView("OnlineWorldHallView");
  }),
  (FunctionController.m9t = () => {
    AchievementController_1.AchievementController.OpenAchievementMainView();
  }),
  (FunctionController.h9t = () => {
    UiManager_1.UiManager.OpenView("ComposeRootView");
  }),
  (FunctionController.a9t = () => {
    UiManager_1.UiManager.OpenView("ForgingRootView");
  }),
  (FunctionController.l9t = () => {
    BattlePassController_1.BattlePassController.OpenBattlePassView();
  });
//# sourceMappingURL=FunctionController.js.map

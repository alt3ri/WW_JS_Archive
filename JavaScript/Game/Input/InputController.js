"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputController = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  Time_1 = require("../../Core/Common/Time"),
  ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
  Platform_1 = require("../../Launcher/Platform/Platform"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  Global_1 = require("../Global"),
  GlobalData_1 = require("../GlobalData"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  AceAntiCheatInputLayer_1 = require("../NewWorld/Character/Common/Component/Input/InputLayer/AceAntiCheatInputLayer"),
  CharacterInputLayer_1 = require("../NewWorld/Character/Common/Component/Input/InputLayer/CharacterInputLayer"),
  FollowShooterInputLayer_1 = require("../NewWorld/Character/Common/Component/Input/InputLayer/FollowShooterInputLayer"),
  ManipulateInputLayer_1 = require("../NewWorld/Character/Common/Component/Input/InputLayer/ManipulateInputLayer"),
  VisionInputLayer_1 = require("../NewWorld/Character/Common/Component/Input/InputLayer/VisionInputLayer"),
  InputManager_1 = require("../Ui/Input/InputManager"),
  InputMappingsDefine_1 = require("../Ui/InputDistribute/InputMappingsDefine"),
  InputEnums_1 = require("./InputEnums"),
  KEY_RELEASED_TIME = -1;
class InputController extends ControllerBase_1.ControllerBase {
  static InitializeEnvironment() {
    Info_1.Info.UseFastInputCallback &&
      cpp_1.FKuroInputInterface.InitializeEnvironment(),
      Info_1.Info.AxisInputOptimize
        ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "Kuro.Input.AxisOptimize 1",
          )
        : UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "Kuro.Input.AxisOptimize 0",
          );
  }
  static get Model() {
    return ModelManager_1.ModelManager.InputModel;
  }
  static OnInit() {
    return this.Ore(), !0;
  }
  static OnClear() {
    return this.kre(), !0;
  }
  static Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnCloseLoadingView,
      this.jJa,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkStart,
        this.AMe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ForceReleaseInput,
        this.PMe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnInputDistributeTagChanged,
        this.xMe,
      ),
      ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxes(
        [
          InputMappingsDefine_1.axisMappings.LookUp,
          InputMappingsDefine_1.axisMappings.Turn,
          InputMappingsDefine_1.axisMappings.Zoom,
        ],
        this.wMe,
      ),
      ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxes(
        [
          InputMappingsDefine_1.axisMappings.MoveForward,
          InputMappingsDefine_1.axisMappings.MoveRight,
        ],
        this.BMe,
      ),
      ControllerHolder_1.ControllerHolder.InputDistributeController.BindActions(
        [
          InputMappingsDefine_1.actionMappings.大招,
          InputMappingsDefine_1.actionMappings.幻象1,
          InputMappingsDefine_1.actionMappings.幻象2,
          InputMappingsDefine_1.actionMappings.技能1,
          InputMappingsDefine_1.actionMappings.攀爬,
          InputMappingsDefine_1.actionMappings.攻击,
          InputMappingsDefine_1.actionMappings.瞄准,
          InputMappingsDefine_1.actionMappings.走跑切换,
          InputMappingsDefine_1.actionMappings.跳跃,
          InputMappingsDefine_1.actionMappings.通用交互,
          InputMappingsDefine_1.actionMappings.锁定目标,
          InputMappingsDefine_1.actionMappings.闪避,
        ],
        this.bMe,
      );
  }
  static kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCloseLoadingView,
      this.jJa,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotNetworkStart,
        this.AMe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnInputDistributeTagChanged,
        this.xMe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ForceReleaseInput,
        this.PMe,
      ),
      ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxes(
        [
          InputMappingsDefine_1.axisMappings.LookUp,
          InputMappingsDefine_1.axisMappings.Turn,
          InputMappingsDefine_1.axisMappings.Zoom,
        ],
        this.wMe,
      ),
      ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxes(
        [
          InputMappingsDefine_1.axisMappings.MoveForward,
          InputMappingsDefine_1.axisMappings.MoveRight,
        ],
        this.BMe,
      ),
      ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindActions(
        [
          InputMappingsDefine_1.actionMappings.大招,
          InputMappingsDefine_1.actionMappings.幻象1,
          InputMappingsDefine_1.actionMappings.幻象2,
          InputMappingsDefine_1.actionMappings.技能1,
          InputMappingsDefine_1.actionMappings.攀爬,
          InputMappingsDefine_1.actionMappings.攻击,
          InputMappingsDefine_1.actionMappings.瞄准,
          InputMappingsDefine_1.actionMappings.走跑切换,
          InputMappingsDefine_1.actionMappings.跳跃,
          InputMappingsDefine_1.actionMappings.通用交互,
          InputMappingsDefine_1.actionMappings.锁定目标,
          InputMappingsDefine_1.actionMappings.闪避,
        ],
        this.bMe,
      );
  }
  static AddInputHandler(e) {
    this.Model.AddInputHandler(e);
  }
  static RemoveInputHandler(e) {
    this.Model.RemoveInputHandler(e);
  }
  static InputAction(e, t) {
    if (
      InputEnums_1.EInputAction.锁定目标 !== e ||
      ModelManager_1.ModelManager.FunctionModel.IsOpen(10031)
    ) {
      var n = this.Model.GetPressTimes();
      switch (t) {
        case 1:
          var r = Time_1.Time.WorldTimeSeconds;
          n.set(e, r);
          for (const u of this.Model.GetHandlers()) {
            var o = u.GetInputFilter();
            if (o.BlockAction(e)) break;
            o.ListenToAction(e) && u.HandlePressEvent(e, r);
          }
          break;
        case 2:
          var i = n.get(e);
          if (i === KEY_RELEASED_TIME) return;
          var a = this.qMe(i, Time_1.Time.WorldTimeSeconds);
          n.set(e, KEY_RELEASED_TIME);
          for (const s of this.Model.GetHandlers()) {
            var p = s.GetInputFilter();
            if (p.BlockAction(e)) break;
            p.ListenToAction(e) && s.HandleReleaseEvent(e, a);
          }
      }
    }
  }
  static SetMoveControlEnabled(e, t, n, r) {
    if (
      ((this.GMe = e),
      (this.NMe = t),
      (this.OMe = n),
      (this.kMe = r),
      Info_1.Info.AxisInputOptimize &&
        (this.Model.NextFrameRefreshAxisValues(), !(e && t && n && r)))
    ) {
      var o = this.Model.GetAxisValues(),
        i = this.Model.GetHandlers();
      if (!e || !t) {
        o.set(InputEnums_1.EInputAxis.MoveForward, 0);
        for (const a of i)
          a.ClearSingleAxisInput(InputEnums_1.EInputAxis.MoveForward, !1);
      }
      if (!r || !n) {
        o.set(InputEnums_1.EInputAxis.MoveRight, 0);
        for (const p of i)
          p.ClearSingleAxisInput(InputEnums_1.EInputAxis.MoveRight, !1);
      }
    }
  }
  static InputAxis(e, t, n = !0) {
    var r = this.Model.GetAxisValues();
    if (Info_1.Info.AxisInputOptimize) {
      if ((n && this.j$a.add(e), r.get(e) === t)) return;
    } else if (0 === t && r.has(e)) return;
    if (
      (ModelManager_1.ModelManager.InputModel.IsOpenInputAxisLog &&
        3 === e &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Input",
          10,
          "[InputLog][InputController]开始接收输入",
          ["axis", e],
          ["value", t],
        ),
      e === InputEnums_1.EInputAxis.MoveForward)
    ) {
      if (!this.GMe && 0 < t) return;
      if (!this.NMe && t < 0) return;
    }
    if (e === InputEnums_1.EInputAxis.MoveRight) {
      if (!this.kMe && 0 < t) return;
      if (!this.OMe && t < 0) return;
    }
    r.set(e, t),
      ModelManager_1.ModelManager.InputModel.IsOpenInputAxisLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Input", 10, "[InputLog][InputController]完成接收输入", [
          "axisSet",
          r,
        ]);
  }
  static PreProcessInput(e, t) {
    if (this.Model)
      for (const n of this.Model.GetHandlers()) n.PreProcessInput(e, t);
  }
  static PostProcessInput(e, t) {
    if (this.Model) {
      var n,
        r,
        o = this.Model.GetHandlers();
      InputController.FMe.Start();
      for ([n, r] of this.Model.GetAxisValues())
        for (const _ of o) {
          var i = _.GetInputFilter();
          if (i.BlockAxis(n)) {
            _.ClearSingleAxisInput(n, !1);
            break;
          }
          i.ListenToAxis(n) &&
            (ModelManager_1.ModelManager.InputModel.IsOpenInputAxisLog &&
              3 === n &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Input",
                10,
                "[InputLog][InputController]开始处理轴输入",
                ["axis", n],
                ["value", r],
              ),
            _.HandleInputAxis(n, r));
        }
      InputController.FMe.Stop();
      var a,
        p,
        u = Time_1.Time.WorldTimeSeconds;
      InputController.VMe.Start();
      for ([a, p] of this.Model.GetPressTimes()) {
        var s = this.qMe(p, u);
        if (s !== KEY_RELEASED_TIME)
          for (const I of o) {
            var l = I.GetInputFilter();
            if (l.BlockAction(a)) break;
            l.ListenToAction(a) && I.HandleHoldEvent(a, s);
          }
      }
      InputController.VMe.Stop(), InputController.HMe.Start();
      try {
        for (const f of o) f.PostProcessInput(e, t);
      } catch (e) {
        e instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack("Json", 10, "PostProcessInput", e, [
              "msg",
              e.message,
            ])
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Json", 10, "PostProcessInput", ["error", e]);
      } finally {
        InputController.HMe.Stop();
      }
      if (Info_1.Info.AxisInputOptimize) {
        for (const E of this.j$a) {
          this.Model.GetAxisValues().has(E) &&
            this.Model.GetAxisValues().delete(E);
          for (const C of o) C.ClearSingleAxisInput(E, !0);
        }
        this.j$a.clear();
      } else this.Model.GetAxisValues().clear();
      ModelManager_1.ModelManager.InputModel.IsOpenInputAxisLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Input",
          10,
          "[InputLog][InputController]开始输入处理完成",
        );
    }
  }
  static QueryCommandPriority(e) {
    return this.Model.QueryCommandPriority(e);
  }
  static IsKeyDown(e) {
    e = this.Model.GetPressTimes().get(e);
    return void 0 !== e && e !== KEY_RELEASED_TIME;
  }
  static GetKeyDownTime(e) {
    e = this.Model.GetPressTimes().get(e);
    return e && e !== KEY_RELEASED_TIME
      ? Math.max(0, Time_1.Time.WorldTimeSeconds - e)
      : 0;
  }
  static qMe(e, t) {
    return void 0 === e || e === KEY_RELEASED_TIME ? KEY_RELEASED_TIME : t - e;
  }
  static SetForceFeedbackConfig(e, t) {
    UE.BasePlayerController.SetKuroForceFeedbackConfig(e, t);
  }
  static AddInputLayer(e, t) {
    (t.UnitId = e), this.Model.AddInputLayer(e, t);
  }
  static RemoveInputLayer(e) {
    this.Model.RemoveInputLayer(e);
  }
  static CreateInputLayer(e) {
    switch (e) {
      case 0:
        return;
      case 1:
        return new CharacterInputLayer_1.CharacterInputLayer();
      case 2:
        return new VisionInputLayer_1.VisionInputLayer();
      case 3:
        return new FollowShooterInputLayer_1.FollowShooterInputLayer();
      case 99:
        return new AceAntiCheatInputLayer_1.AceAntiCheatInputLayer();
      case 4:
        return new ManipulateInputLayer_1.ManipulateInputLayer();
      default:
        return;
    }
  }
  static GetInputLayer(e, t) {
    return this.Model.GetInputLayer(e, t);
  }
  static GetInputLayers(e) {
    return this.Model.GetInputLayers(e);
  }
}
(exports.InputController = InputController),
  ((_a = InputController).HMe = Stats_1.Stat.Create(
    "InputController.PostProcessInput",
  )),
  (InputController.FMe = Stats_1.Stat.Create(
    "InputController.HandleInputAxis",
  )),
  (InputController.VMe = Stats_1.Stat.Create("InputController.HandleHold")),
  (InputController.GMe = !0),
  (InputController.NMe = !0),
  (InputController.OMe = !0),
  (InputController.kMe = !0),
  (InputController.wMe = (e, t, n) => {
    var n = n.GetInputAxis(),
      r =
        (InputController.InputAxis(n, t, !1),
        Global_1.Global.CharacterController);
    r &&
      0 < t &&
      n !== InputEnums_1.EInputAxis.Zoom &&
      Info_1.Info.IsInKeyBoard() &&
      !r.bShowMouseCursor &&
      InputManager_1.InputManager.MoveCursorToCenter();
  }),
  (InputController.BMe = (e, t, n) => {
    n = n.GetInputAxis();
    InputController.InputAxis(n, t, !1);
  }),
  (InputController.bMe = (e, t, n) => {
    (t = 0 === t ? 1 : 2), (n = n.GetInputAction());
    InputController.InputAction(n, t);
  }),
  (InputController.AMe = () => {
    for (var [e] of InputController.Model.GetPressTimes())
      InputController.InputAction(e, 2);
  }),
  (InputController.jJa = () => {
    (1 !== Info_1.Info.PlatformType &&
      "IOS" !== Platform_1.Platform.CloudGamePlatform &&
      "Mac" !== Platform_1.Platform.CloudGamePlatform) ||
      (UE.KuroStaticLibrary.SetInputKeyDeadZone(
        Global_1.Global.CharacterController,
        0,
        new UE.Key(new UE.FName("Gamepad_LeftY")),
        0,
      ),
      UE.KuroStaticLibrary.SetInputKeyDeadZone(
        Global_1.Global.CharacterController,
        0,
        new UE.Key(new UE.FName("Gamepad_RightX")),
        0,
      ),
      UE.KuroStaticLibrary.SetInputKeyDeadZone(
        Global_1.Global.CharacterController,
        0,
        new UE.Key(new UE.FName("Gamepad_RightY")),
        0,
      ),
      UE.KuroStaticLibrary.SetInputKeyDeadZone(
        Global_1.Global.CharacterController,
        0,
        new UE.Key(new UE.FName("Gamepad_LeftX")),
        0,
      ));
  }),
  (InputController.PMe = (e) => {
    e &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Input", 7, "强制释放所有按键", ["Reason", e]);
    for (var [t] of InputController.Model.GetPressTimes())
      InputController.InputAction(t, 2);
  }),
  (InputController.xMe = (e) => {
    var t,
      n = ModelManager_1.ModelManager.InputDistributeModel;
    for ([t] of InputController.Model.GetPressTimes()) {
      var r = n.GetActionInputDistributeTagName(InputEnums_1.EInputAction[t]);
      !r ||
        n.IsTagMatchAnyCurrentInputTag(r) ||
        InputController.InputAction(t, 2);
    }
    _a.Model.NextFrameRefreshAxisValues();
  }),
  (InputController.j$a = new Set());
//# sourceMappingURL=InputController.js.map

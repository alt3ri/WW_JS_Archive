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
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  Global_1 = require("../Global"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager"),
  InputManager_1 = require("../Ui/Input/InputManager"),
  InputDistributeController_1 = require("../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../Ui/InputDistribute/InputMappingsDefine"),
  InputEnums_1 = require("./InputEnums"),
  KEY_RELEASED_TIME = -1;
class InputController extends ControllerBase_1.ControllerBase {
  static InitializeEnvironment() {
    Info_1.Info.UseFastInputCallback &&
      cpp_1.FKuroInputInterface.InitializeEnvironment(),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "Kuro.DataTable.ReadRowPassByPointer 0",
      ),
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
      InputDistributeController_1.InputDistributeController.BindAxes(
        [
          InputMappingsDefine_1.axisMappings.LookUp,
          InputMappingsDefine_1.axisMappings.Turn,
          InputMappingsDefine_1.axisMappings.Zoom,
        ],
        this.wMe,
      ),
      InputDistributeController_1.InputDistributeController.BindAxes(
        [
          InputMappingsDefine_1.axisMappings.MoveForward,
          InputMappingsDefine_1.axisMappings.MoveRight,
        ],
        this.BMe,
      ),
      InputDistributeController_1.InputDistributeController.BindActions(
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
      InputDistributeController_1.InputDistributeController.UnBindAxes(
        [
          InputMappingsDefine_1.axisMappings.LookUp,
          InputMappingsDefine_1.axisMappings.Turn,
          InputMappingsDefine_1.axisMappings.Zoom,
        ],
        this.wMe,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxes(
        [
          InputMappingsDefine_1.axisMappings.MoveForward,
          InputMappingsDefine_1.axisMappings.MoveRight,
        ],
        this.BMe,
      ),
      InputDistributeController_1.InputDistributeController.UnBindActions(
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
  static AddInputHandler(t) {
    this.Model.AddInputHandler(t);
  }
  static RemoveInputHandler(t) {
    this.Model.RemoveInputHandler(t);
  }
  static InputAction(t, n) {
    if (
      InputEnums_1.EInputAction.锁定目标 !== t ||
      ModelManager_1.ModelManager.FunctionModel.IsOpen(10031)
    ) {
      var e = this.Model.GetPressTimes();
      switch (n) {
        case 1:
          var r = Time_1.Time.WorldTimeSeconds;
          e.set(t, r);
          for (const u of this.Model.GetHandlers()) {
            var i = u.GetInputFilter();
            if (i.BlockAction(t)) break;
            i.ListenToAction(t) && u.HandlePressEvent(t, r);
          }
          break;
        case 2:
          var o = e.get(t);
          if (o !== KEY_RELEASED_TIME) {
            var p = this.qMe(o, Time_1.Time.WorldTimeSeconds);
            e.set(t, KEY_RELEASED_TIME);
            for (const a of this.Model.GetHandlers()) {
              var s = a.GetInputFilter();
              if (s.BlockAction(t)) break;
              s.ListenToAction(t) && a.HandleReleaseEvent(t, p);
            }
          }
      }
    }
  }
  static SetMoveControlEnabled(t, n, e, r) {
    if (
      ((this.GMe = t),
      (this.NMe = n),
      (this.OMe = e),
      (this.kMe = r),
      Info_1.Info.AxisInputOptimize &&
        (this.Model.NextFrameRefreshAxisValues(), !(t && n && e && r)))
    ) {
      var i = this.Model.GetAxisValues(),
        o = i.get(InputEnums_1.EInputAxis.MoveForward),
        p = i.get(InputEnums_1.EInputAxis.MoveRight),
        s = this.Model.GetHandlers();
      if (o && ((!t && 0 < o) || (!n && o < 0))) {
        i.set(InputEnums_1.EInputAxis.MoveForward, 0);
        for (const u of s)
          u.ClearSingleAxisInput(InputEnums_1.EInputAxis.MoveForward, !1);
      }
      if (p && ((!r && 0 < p) || (!e && p < 0))) {
        i.set(InputEnums_1.EInputAxis.MoveRight, 0);
        for (const a of s)
          a.ClearSingleAxisInput(InputEnums_1.EInputAxis.MoveRight, !1);
      }
    }
  }
  static InputAxis(t, n, e = !0) {
    var r = this.Model.GetAxisValues();
    if (Info_1.Info.AxisInputOptimize) {
      if ((e && this.qja.add(t), r.get(t) === n)) return;
    } else if (0 === n && r.has(t)) return;
    if (
      (ModelManager_1.ModelManager.InputModel.IsOpenInputAxisLog &&
        3 === t &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Input",
          8,
          "[InputLog][InputController]开始接收输入",
          ["axis", t],
          ["value", n],
        ),
      t === InputEnums_1.EInputAxis.MoveForward)
    ) {
      if (!this.GMe && 0 < n) return;
      if (!this.NMe && n < 0) return;
    }
    if (t === InputEnums_1.EInputAxis.MoveRight) {
      if (!this.kMe && 0 < n) return;
      if (!this.OMe && n < 0) return;
    }
    r.set(t, n),
      ModelManager_1.ModelManager.InputModel.IsOpenInputAxisLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Input", 8, "[InputLog][InputController]完成接收输入", [
          "axisSet",
          r,
        ]);
  }
  static PreProcessInput(t, n) {
    if (this.Model)
      for (const e of this.Model.GetHandlers()) e.PreProcessInput(t, n);
  }
  static PostProcessInput(t, n) {
    if (this.Model) {
      var e,
        r,
        i = this.Model.GetHandlers();
      InputController.FMe.Start();
      for ([e, r] of this.Model.GetAxisValues())
        for (const _ of i) {
          var o = _.GetInputFilter();
          if (o.BlockAxis(e)) {
            _.ClearSingleAxisInput(e, !1);
            break;
          }
          o.ListenToAxis(e) &&
            (ModelManager_1.ModelManager.InputModel.IsOpenInputAxisLog &&
              3 === e &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Input",
                8,
                "[InputLog][InputController]开始处理轴输入",
                ["axis", e],
                ["value", r],
              ),
            _.HandleInputAxis(e, r));
        }
      InputController.FMe.Stop();
      var p,
        s,
        u = Time_1.Time.WorldTimeSeconds;
      InputController.VMe.Start();
      for ([p, s] of this.Model.GetPressTimes()) {
        var a = this.qMe(s, u);
        if (a !== KEY_RELEASED_TIME)
          for (const I of i) {
            var l = I.GetInputFilter();
            if (l.BlockAction(p)) break;
            l.ListenToAction(p) && I.HandleHoldEvent(p, a);
          }
      }
      InputController.VMe.Stop(), InputController.HMe.Start();
      try {
        for (const f of i) f.PostProcessInput(t, n);
      } catch (t) {
        t instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack("Json", 8, "PostProcessInput", t, [
              "msg",
              t.message,
            ])
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Json", 8, "PostProcessInput", ["error", t]);
      } finally {
        InputController.HMe.Stop();
      }
      if (Info_1.Info.AxisInputOptimize) {
        for (const E of this.qja) {
          this.Model.GetAxisValues().has(E) &&
            this.Model.GetAxisValues().delete(E);
          for (const g of i) g.ClearSingleAxisInput(E, !0);
        }
        this.qja.clear();
      } else this.Model.GetAxisValues().clear();
      ModelManager_1.ModelManager.InputModel.IsOpenInputAxisLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Input",
          8,
          "[InputLog][InputController]开始输入处理完成",
        );
    }
  }
  static QueryCommandPriority(t) {
    return this.Model.QueryCommandPriority(t);
  }
  static IsKeyDown(t) {
    t = this.Model.GetPressTimes().get(t);
    return void 0 !== t && t !== KEY_RELEASED_TIME;
  }
  static qMe(t, n) {
    return void 0 === t || t === KEY_RELEASED_TIME ? KEY_RELEASED_TIME : n - t;
  }
  static SetForceFeedbackConfig(t, n) {
    UE.BasePlayerController.SetKuroForceFeedbackConfig(t, n);
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
  (InputController.wMe = (t, n, e) => {
    var e = e.GetInputAxis(),
      r =
        (InputController.InputAxis(e, n, !1),
        Global_1.Global.CharacterController);
    r &&
      0 < n &&
      e !== InputEnums_1.EInputAxis.Zoom &&
      Info_1.Info.IsInKeyBoard() &&
      !r.bShowMouseCursor &&
      InputManager_1.InputManager.MoveCursorToCenter();
  }),
  (InputController.BMe = (t, n, e) => {
    e = e.GetInputAxis();
    InputController.InputAxis(e, n, !1);
  }),
  (InputController.bMe = (t, n, e) => {
    (n = 0 === n ? 1 : 2), (e = e.GetInputAction());
    InputController.InputAction(e, n);
  }),
  (InputController.AMe = () => {
    for (var [t] of InputController.Model.GetPressTimes())
      InputController.InputAction(t, 2);
  }),
  (InputController.PMe = (t) => {
    t &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Input", 7, "强制释放所有按键", ["Reason", t]);
    for (var [n] of InputController.Model.GetPressTimes())
      InputController.InputAction(n, 2);
  }),
  (InputController.xMe = (t) => {
    var n,
      e = ModelManager_1.ModelManager.InputDistributeModel;
    for ([n] of InputController.Model.GetPressTimes()) {
      var r = e.GetActionInputDistributeTagName(InputEnums_1.EInputAction[n]);
      !r ||
        e.IsTagMatchAnyCurrentInputTag(r) ||
        InputController.InputAction(n, 2);
    }
    _a.Model.NextFrameRefreshAxisValues();
  }),
  (InputController.qja = new Set());
//# sourceMappingURL=InputController.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.rouletteInputManager =
    exports.RouletteInputGamepad =
    exports.RouletteInputTouch =
    exports.RouletteInputKeyboard =
    exports.RouletteInputBase =
    exports.AngleCalculator =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  MathCommon_1 = require("../../../Core/Utils/Math/MathCommon"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  Global_1 = require("../../Global"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  KEYBOARD_DEAD_LIMIT = 100;
class AngleCalculator {
  static GetVectorAngle(t, i) {
    var s = Vector_1.Vector.Create(),
      e =
        (Vector_1.Vector.CrossProduct(t, i, s),
        MathUtils_1.MathUtils.DotProduct(t, i)),
      e = UE.KismetMathLibrary.DegAcos(e / (t.Size() * i.Size()));
    return 0 < s.Z ? -1 * e : e;
  }
  static AngleToAreaIndex(i) {
    for (let t = 0; t < this.AngleList.length; t++) {
      var s = t + 1;
      if (this.AngleList[t] <= i && i < this.AngleList[s])
        return this.AngleList.length - s;
    }
    return 1;
  }
  static ConvertLguiPosToScreenPos(t, i) {
    var s = UiLayer_1.UiLayer.UiRootItem,
      t = Vector2D_1.Vector2D.Create(t, i),
      i =
        UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromLGUICanvasToViewport(
          t.ToUeVector2D(),
        );
    return (
      (i.X = MathCommon_1.MathCommon.Clamp(i.X, 0, s.GetWidth())),
      (i.Y = MathCommon_1.MathCommon.Clamp(i.Y, 0, s.GetHeight())),
      new Vector2D_1.Vector2D(i.X, i.Y)
    );
  }
}
(exports.AngleCalculator = AngleCalculator).AngleList = [
  -180, -135, -90, -45, 0, 45, 90, 135, 180,
];
class RouletteInputBase {
  constructor(t, i, s, e) {
    (this.ActivateOn = !1),
      (this.AreaIndex = 0),
      (this.Angle = -1),
      (this.NeedEmptyChoose = !0),
      (this.RouletteViewType = 1),
      (this.BeginPos = void 0),
      (this.ForwardVector = Vector_1.Vector.Create(0, -1, 0)),
      (this.B0o = () => {}),
      (this.BeginPos = t),
      (this.RouletteViewType = i ?? 1);
  }
  ActivateInput(t) {
    this.ActivateOn = t;
  }
  Destroy() {
    this.ActivateInput(!1), this.UnBindEvent(), this.OnDestroy();
  }
  Reset() {
    (this.AreaIndex = 0), (this.Angle = -1);
  }
  EndInput() {
    (this.ActivateOn = !1), this.B0o();
  }
  SetEndInputEvent(t) {
    this.B0o = t;
  }
  SetIsNeedEmpty(t) {
    this.NeedEmptyChoose = t;
  }
  OnInit() {}
  OnDestroy() {}
  BindEvent() {}
  UnBindEvent() {}
  InputTick(t) {}
  Tick(t) {
    var i, s;
    return this.ActivateOn
      ? ((i = this.AreaIndex),
        (s = this.Angle),
        this.InputTick(t),
        [
          i !== this.AreaIndex ? this.AreaIndex : void 0,
          s !== this.Angle ? this.Angle : void 0,
        ])
      : [void 0, void 0];
  }
}
class RouletteInputKeyboard extends (exports.RouletteInputBase =
  RouletteInputBase) {
  constructor(t, i) {
    super(t, i),
      (this.b0o = Vector_1.Vector.Create()),
      (this.q0o = Vector_1.Vector.Create()),
      (this.G0o = Vector_1.Vector.Create()),
      (this.N0o = Vector_1.Vector.Create());
  }
  OnInit() {
    if (!this.BeginPos) {
      var t = Global_1.Global.CharacterController;
      if (!t) return;
      this.BeginPos = t.GetCursorPosition() ?? Vector2D_1.Vector2D.Create();
    }
    this.q0o.Set(this.BeginPos.X, this.BeginPos.Y, 0),
      this.G0o.Set(this.BeginPos.X, this.BeginPos.Y, 0),
      this.b0o.Set(0, 0, 0);
  }
  InputTick(t) {
    var i = Global_1.Global.CharacterController;
    i &&
      (i = i.GetCursorPosition()) &&
      (this.N0o.Set(i.X, i.Y, 0),
      this.N0o.Equals(this.G0o, 1) ||
        (this.N0o.Subtraction(this.q0o, this.b0o),
        this.NeedEmptyChoose && this.b0o.Size() <= KEYBOARD_DEAD_LIMIT
          ? (this.AreaIndex = 0)
          : (this.G0o.Set(this.N0o.X, this.N0o.Y, 0),
            (this.Angle = AngleCalculator.GetVectorAngle(
              this.ForwardVector,
              this.b0o,
            )),
            (this.AreaIndex = AngleCalculator.AngleToAreaIndex(this.Angle)))));
  }
}
exports.RouletteInputKeyboard = RouletteInputKeyboard;
class RouletteInputTouch extends RouletteInputBase {
  constructor(t, i, s) {
    super(t, i, s),
      (this.b0o = Vector_1.Vector.Create()),
      (this.q0o = Vector_1.Vector.Create()),
      (this.G0o = Vector_1.Vector.Create()),
      (this.N0o = Vector_1.Vector.Create()),
      (this.O0o = -1),
      (this.eut = !1),
      (this.O0o = s ?? -1);
  }
  OnInit() {
    if (!this.BeginPos) {
      var t = Global_1.Global.CharacterController;
      if (!t) return;
      if (this.O0o < 0)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Phantom",
            38,
            "当前轮盘输入方式为触屏,未检测到对应触屏Id或初始位置",
          )
        );
      (this.BeginPos =
        t.GetTouchPosition(this.O0o) ?? Vector2D_1.Vector2D.Create()),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Phantom",
            38,
            "[轮盘界面]触屏开启信息",
            ["TouchId", this.O0o],
            ["Pos", this.BeginPos],
          );
    }
    this.q0o.Set(this.BeginPos.X, this.BeginPos.Y, 0),
      this.G0o.Set(this.BeginPos.X, this.BeginPos.Y, 0),
      this.b0o.Set(0, 0, 0);
  }
  OnDestroy() {
    this.eut = !1;
  }
  InputTick(t) {
    var i;
    0 !== this.RouletteViewType &&
      (i = Global_1.Global.CharacterController) &&
      (!(this.O0o < 0) && ((this.eut = i.IsInTouch(this.O0o)), this.eut)
        ? (i = i.GetTouchPosition(this.O0o)) &&
          (this.N0o.Set(i.X, i.Y, 0),
          this.N0o.Equals(this.G0o) ||
            (this.G0o.Set(this.N0o.X, this.N0o.Y, 0),
            this.N0o.Subtraction(this.q0o, this.b0o),
            (this.Angle = AngleCalculator.GetVectorAngle(
              this.ForwardVector,
              this.b0o,
            )),
            (this.AreaIndex = AngleCalculator.AngleToAreaIndex(this.Angle))))
        : this.EndInput());
  }
}
exports.RouletteInputTouch = RouletteInputTouch;
class RouletteInputGamepad extends RouletteInputBase {
  constructor(t, i, s, e) {
    super(t, i),
      (this.k0o = Vector_1.Vector.Create()),
      (this.aIa = 0.4),
      (this.F0o = void 0),
      (this.V0o = (t, i) => {
        switch (t) {
          case InputMappingsDefine_1.axisMappings.UiMoveForward:
            this.k0o.Y = -i;
            break;
          case InputMappingsDefine_1.axisMappings.UiScroll1:
            this.k0o.Y = i;
            break;
          case InputMappingsDefine_1.axisMappings.UiMoveRight:
          case InputMappingsDefine_1.axisMappings.UiScroll2:
            this.k0o.X = i;
        }
      }),
      (this.aIa = e ?? this.aIa);
  }
  OnInit() {
    this.k0o.Set(0, 0, 0);
  }
  BindEvent() {
    0 === this.RouletteViewType
      ? (this.F0o = [
          InputMappingsDefine_1.axisMappings.UiMoveForward,
          InputMappingsDefine_1.axisMappings.UiMoveRight,
        ])
      : (this.F0o = [
          InputMappingsDefine_1.axisMappings.UiScroll1,
          InputMappingsDefine_1.axisMappings.UiScroll2,
        ]),
      InputDistributeController_1.InputDistributeController.BindAxes(
        this.F0o,
        this.V0o,
      );
  }
  UnBindEvent() {
    InputDistributeController_1.InputDistributeController.UnBindAxes(
      this.F0o,
      this.V0o,
    );
  }
  InputTick(t) {
    (!this.NeedEmptyChoose && 0 === this.k0o.X && 0 === this.k0o.Y) ||
      (this.NeedEmptyChoose &&
      Math.abs(this.k0o.X) <= this.aIa &&
      Math.abs(this.k0o.Y) <= this.aIa
        ? (this.AreaIndex = 0)
        : ((this.Angle = AngleCalculator.GetVectorAngle(
            this.ForwardVector,
            this.k0o,
          )),
          (this.AreaIndex = AngleCalculator.AngleToAreaIndex(this.Angle))));
  }
}
(exports.RouletteInputGamepad = RouletteInputGamepad),
  (exports.rouletteInputManager = {
    [0]: RouletteInputKeyboard,
    1: RouletteInputKeyboard,
    2: RouletteInputGamepad,
    3: RouletteInputTouch,
  });
//# sourceMappingURL=RouletteInputManager.js.map

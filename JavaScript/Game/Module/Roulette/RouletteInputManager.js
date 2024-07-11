"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.rouletteInputManager =
    exports.RouletteInputGamepad =
    exports.RouletteInputTouch =
    exports.RouletteInputKeyboard =
    exports.RouletteInputBase =
    exports.AngleCalculator =
      void 0);
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const Global_1 = require("../../Global");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const UiLayer_1 = require("../../Ui/UiLayer");
const KEYBOARD_DEAD_LIMIT = 100;
const GAMEPAD_DEAD_LIMIT = 0.3;
class AngleCalculator {
  static GetVectorAngle(t, i) {
    const s = Vector_1.Vector.Create();
    var e =
      (Vector_1.Vector.CrossProduct(t, i, s),
      MathUtils_1.MathUtils.DotProduct(t, i));
    var e = UE.KismetMathLibrary.DegAcos(e / (t.Size() * i.Size()));
    return s.Z > 0 ? -1 * e : e;
  }
  static AngleToAreaIndex(i) {
    for (let t = 0; t < this.AngleList.length; t++) {
      const s = t + 1;
      if (this.AngleList[t] < i && i <= this.AngleList[s])
        return this.AngleList.length - s;
    }
    return 0;
  }
  static ConvertLguiPosToScreenPos(t, i) {
    const s = UiLayer_1.UiLayer.UiRootItem;
    var t = Vector2D_1.Vector2D.Create(t, i);
    var i =
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
  constructor(t, i, s) {
    (this.ActivateOn = !1),
      (this.AreaIndex = 0),
      (this.Angle = -1),
      (this.NeedEmptyChoose = !0),
      (this.RouletteViewType = 1),
      (this.BeginPos = void 0),
      (this.ForwardVector = Vector_1.Vector.Create(0, -1, 0)),
      (this.Ggo = () => {}),
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
    (this.ActivateOn = !1), this.Ggo();
  }
  SetEndInputEvent(t) {
    this.Ggo = t;
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
    let i, s;
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
      (this.Ngo = Vector_1.Vector.Create()),
      (this.Ogo = Vector_1.Vector.Create()),
      (this.kgo = Vector_1.Vector.Create()),
      (this.Fgo = Vector_1.Vector.Create());
  }
  OnInit() {
    if (!this.BeginPos) {
      const t = Global_1.Global.CharacterController;
      if (!t) return;
      this.BeginPos = t.GetCursorPosition() ?? Vector2D_1.Vector2D.Create();
    }
    this.Ogo.Set(this.BeginPos.X, this.BeginPos.Y, 0),
      this.kgo.Set(this.BeginPos.X, this.BeginPos.Y, 0),
      this.Ngo.Set(0, 0, 0);
  }
  InputTick(t) {
    let i = Global_1.Global.CharacterController;
    i &&
      (i = i.GetCursorPosition()) &&
      (this.Fgo.Set(i.X, i.Y, 0),
      this.Fgo.Equals(this.kgo, 1) ||
        (this.Fgo.Subtraction(this.Ogo, this.Ngo),
        this.NeedEmptyChoose && this.Ngo.Size() <= KEYBOARD_DEAD_LIMIT
          ? (this.AreaIndex = 0)
          : (this.kgo.Set(this.Fgo.X, this.Fgo.Y, 0),
            (this.Angle = AngleCalculator.GetVectorAngle(
              this.ForwardVector,
              this.Ngo,
            )),
            (this.AreaIndex = AngleCalculator.AngleToAreaIndex(this.Angle)))));
  }
}
exports.RouletteInputKeyboard = RouletteInputKeyboard;
class RouletteInputTouch extends RouletteInputBase {
  constructor(t, i, s) {
    super(t, i, s),
      (this.Ngo = Vector_1.Vector.Create()),
      (this.Ogo = Vector_1.Vector.Create()),
      (this.kgo = Vector_1.Vector.Create()),
      (this.Fgo = Vector_1.Vector.Create()),
      (this.Vgo = -1),
      (this.V1t = !1),
      (this.Vgo = s ?? -1);
  }
  OnInit() {
    if (!this.BeginPos) {
      const t = Global_1.Global.CharacterController;
      if (!t) return;
      if (this.Vgo < 0)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Phantom",
            38,
            "当前轮盘输入方式为触屏,未检测到对应触屏Id或初始位置",
          )
        );
      (this.BeginPos =
        t.GetTouchPosition(this.Vgo) ?? Vector2D_1.Vector2D.Create()),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Phantom",
            38,
            "[轮盘界面]触屏开启信息",
            ["TouchId", this.Vgo],
            ["Pos", this.BeginPos],
          );
    }
    this.Ogo.Set(this.BeginPos.X, this.BeginPos.Y, 0),
      this.kgo.Set(this.BeginPos.X, this.BeginPos.Y, 0),
      this.Ngo.Set(0, 0, 0);
  }
  OnDestroy() {
    this.V1t = !1;
  }
  InputTick(t) {
    let i;
    this.RouletteViewType !== 0 &&
      (i = Global_1.Global.CharacterController) &&
      (!(this.Vgo < 0) && ((this.V1t = i.IsInTouch(this.Vgo)), this.V1t)
        ? (i = i.GetTouchPosition(this.Vgo)) &&
          (this.Fgo.Set(i.X, i.Y, 0),
          this.Fgo.Equals(this.kgo) ||
            (this.kgo.Set(this.Fgo.X, this.Fgo.Y, 0),
            this.Fgo.Subtraction(this.Ogo, this.Ngo),
            (this.Angle = AngleCalculator.GetVectorAngle(
              this.ForwardVector,
              this.Ngo,
            )),
            (this.AreaIndex = AngleCalculator.AngleToAreaIndex(this.Angle))))
        : this.EndInput());
  }
}
exports.RouletteInputTouch = RouletteInputTouch;
class RouletteInputGamepad extends RouletteInputBase {
  constructor(t, i) {
    super(t, i),
      (this.Hgo = Vector_1.Vector.Create()),
      (this.jgo = void 0),
      (this.Wgo = (t, i) => {
        switch (t) {
          case InputMappingsDefine_1.axisMappings.UiMoveForward:
            this.Hgo.Y = -i;
            break;
          case InputMappingsDefine_1.axisMappings.UiScroll1:
            this.Hgo.Y = i;
            break;
          case InputMappingsDefine_1.axisMappings.UiMoveRight:
          case InputMappingsDefine_1.axisMappings.UiScroll2:
            this.Hgo.X = i;
        }
      });
  }
  OnInit() {
    this.Hgo.Set(0, 0, 0);
  }
  BindEvent() {
    this.RouletteViewType === 0
      ? (this.jgo = [
          InputMappingsDefine_1.axisMappings.UiMoveForward,
          InputMappingsDefine_1.axisMappings.UiMoveRight,
        ])
      : (this.jgo = [
          InputMappingsDefine_1.axisMappings.UiScroll1,
          InputMappingsDefine_1.axisMappings.UiScroll2,
        ]),
      InputDistributeController_1.InputDistributeController.BindAxes(
        this.jgo,
        this.Wgo,
      );
  }
  UnBindEvent() {
    InputDistributeController_1.InputDistributeController.UnBindAxes(
      this.jgo,
      this.Wgo,
    );
  }
  InputTick(t) {
    (!this.NeedEmptyChoose && this.Hgo.X === 0 && this.Hgo.Y === 0) ||
      (this.NeedEmptyChoose &&
      Math.abs(this.Hgo.X) <= GAMEPAD_DEAD_LIMIT &&
      Math.abs(this.Hgo.Y) <= GAMEPAD_DEAD_LIMIT
        ? (this.AreaIndex = 0)
        : ((this.Angle = AngleCalculator.GetVectorAngle(
            this.ForwardVector,
            this.Hgo,
          )),
          (this.AreaIndex = AngleCalculator.AngleToAreaIndex(this.Angle))));
  }
}
(exports.RouletteInputGamepad = RouletteInputGamepad),
  (exports.rouletteInputManager = {
    0: RouletteInputKeyboard,
    1: RouletteInputGamepad,
    2: RouletteInputTouch,
  });
// # sourceMappingURL=RouletteInputManager.js.map

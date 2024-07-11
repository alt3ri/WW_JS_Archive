"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Joystick = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  Global_1 = require("../../../Global"),
  InputController_1 = require("../../../Input/InputController"),
  InputEnums_1 = require("../../../Input/InputEnums"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  BattleChildView_1 = require("./BattleChildView/BattleChildView"),
  WALK_TO_RUN_RATE = 0.3,
  JOYSTICK_RADIU = 200,
  JOYSTICK_RADIU_SQUARED = 4e4,
  CHECK_IN_TOUCH_INTERVAL = 500,
  MASK_AREA_MAX_X = 400,
  MASK_AREA_MAX_Y = 400;
class Joystick extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.H_t = void 0),
      (this.j_t = void 0),
      (this.W_t = void 0),
      (this.K_t = void 0),
      (this.$Sa = void 0),
      (this.XSa = void 0),
      (this.Q_t = Vector2D_1.Vector2D.Create(0, 0)),
      (this.X_t = 0),
      (this.$_t = Vector_1.Vector.Create()),
      (this.Y_t = Vector_1.Vector.Create()),
      (this.J_t = Vector_1.Vector.Create(0, 0, 0)),
      (this.z_t = Vector_1.Vector.Create(0, 0, 0)),
      (this.Z_t = Rotator_1.Rotator.Create()),
      (this.AXe = !1),
      (this.YSa = 0),
      (this.JoystickTouchId = -1),
      (this.eut = !1),
      (this.R$e = void 0),
      (this.tut = !1),
      (this.iut = 500),
      (this.out = 1e3),
      (this.rut = 0),
      (this.nut = Vector_1.Vector.Create()),
      (this.sut = void 0),
      (this.aut = 0),
      (this.JSa = !1),
      (this.zSa = !1),
      (this.hut = (t) => {
        this.lut(t) &&
          this.AXe &&
          this.tut &&
          InputDistributeController_1.InputDistributeController.IsAllowFightMoveInput() &&
          (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Battle", 8, "动态摇杆开始拖动立即响应输入", [
              "Position",
              this.Y_t,
            ]),
          this._ut(this.Y_t));
      }),
      (this.uut = (t) => {
        this.lut(t);
      }),
      (this.cut = (t) => {
        this.JoystickTouchId = t.pointerID;
        var t = t.GetLocalPointInPlane();
        (this.Y_t.X = t.X),
          (this.Y_t.Y = t.Y),
          (this.tut = !0),
          (ModelManager_1.ModelManager.BattleUiModel.IsPressJoyStick = !0),
          (this.eut = !0),
          this.JSa && (this.ZSa(), this.XSa?.SetUIActive(!0)),
          this.AXe &&
            ((this.J_t.X = this.Y_t.X),
            (this.J_t.Y = this.Y_t.Y),
            this.Q_t.Set(this.J_t.X, this.J_t.Y),
            (t = this.Q_t.ToUeVector2D()),
            this.j_t.SetAnchorOffset(t),
            this.W_t.SetAnchorOffset(t),
            this.K_t.SetAnchorOffset(t)),
          ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Battle",
              8,
              "JoystickPress",
              ["", this.JoystickTouchId],
              ["", this.Y_t],
            ),
          this.Y_t.IsZero() ||
            (this._ut(this.Y_t), this.SaveDodgeStartInfo(this.Y_t));
      }),
      (this.mut = () => {
        this.dut();
      }),
      (this.OnDynamicChanged = (t) => {
        (this.AXe = t),
          this.AXe ||
            (this.J_t.Set(0, 0, 0),
            this.Q_t.Set(this.J_t.X, this.J_t.Y),
            (t = this.Q_t.ToUeVector2D()),
            this.j_t.SetAnchorOffset(t),
            this.W_t.SetAnchorOffset(t),
            this.K_t.SetAnchorOffset(t));
      }),
      (this.eEa = () => {
        this.tEa();
      });
  }
  Initialize(t) {
    super.Initialize(t),
      (this.ParentUiItem = t),
      (this.H_t = this.GetRootActor().GetComponentByClass(
        UE.UIDraggableComponent.StaticClass(),
      )),
      this.Ore(),
      (this.j_t = this.GetSprite(0)),
      (this.W_t = this.GetSprite(1)),
      (this.K_t = this.GetSprite(2)),
      (this.$Sa = this.GetItem(3)),
      (this.XSa = this.GetItem(5)),
      (this.R$e = Global_1.Global.CharacterController),
      (this.iut =
        CommonParamById_1.configCommonParamById.GetIntConfig("DodgeMinLength")),
      (this.out = CommonParamById_1.configCommonParamById.GetIntConfig(
        "DodgeJoystickSlideMinTime",
      )),
      (this.AXe =
        ModelManager_1.ModelManager.BattleUiModel.GetIsDynamicJoystick()),
      (this.YSa = CommonParamById_1.configCommonParamById.GetFloatConfig(
        "MaskAreaEnableRootX",
      ));
  }
  ShowBattleVisibleChildView() {
    var t, i;
    this.SetVisible(0, !0),
      this.SetActive(!0),
      this.RootItem && this.ParentUiItem && 0 < this.YSa
        ? ((t = this.ParentUiItem.GetWidth()),
          (i = this.RootItem.GetAnchorOffsetX()),
          (this.JSa = 0 < t && i / t < this.YSa))
        : (this.JSa = !1),
      this.JSa || this.XSa?.SetUIActive(!1);
  }
  HideBattleVisibleChildView() {
    this.SetVisible(0, !1), this.SetActive(!1);
  }
  Reset() {
    (this.R$e = void 0),
      (this.K_t = void 0),
      (this.tut = !1),
      (ModelManager_1.ModelManager.BattleUiModel.IsPressJoyStick = !1),
      this.sut &&
        TimerSystem_1.TimerSystem.Has(this.sut) &&
        (TimerSystem_1.TimerSystem.Remove(this.sut), (this.sut = void 0)),
      this.kre(),
      super.Reset();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  Ore() {
    var t = this.H_t;
    t.OnPointerDownCallBack.Bind((t) => {
      this.cut(t);
    }),
      t.OnPointerBeginDragCallBack.Bind((t) => {
        this.hut(t);
      }),
      t.OnPointerDragCallBack.Bind((t) => {
        this.uut(t);
      }),
      t.OnPointerEndDragCallBack.Bind((t) => {
        this.mut();
      }),
      t.OnPointerUpCallBack.Bind((t) => {
        this.mut();
      }),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSetJoystickMode,
        this.OnDynamicChanged,
      ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(
        12,
        this.eEa,
      );
  }
  kre() {
    var t = this.H_t;
    t.OnPointerDownCallBack.Unbind(),
      t.OnPointerBeginDragCallBack.Unbind(),
      t.OnPointerDragCallBack.Unbind(),
      t.OnPointerEndDragCallBack.Unbind(),
      t.OnPointerUpCallBack.Unbind(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSetJoystickMode,
        this.OnDynamicChanged,
      ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(
        12,
        this.eEa,
      );
  }
  Tick(t) {
    this.JoystickTouchId < 0 ||
      (this.gut(),
      this.eut
        ? this.tut &&
          (InputDistributeController_1.InputDistributeController.IsAllowFightMoveInput()
            ? (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Battle", 8, "手指滑动摇杆", [
                  "Position",
                  this.Y_t,
                ]),
              this._ut(this.Y_t))
            : (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Battle",
                  8,
                  "手指滑动摇杆时不允许战斗输入,摇杆置回原点",
                ),
              this._ut(this.J_t)))
        : this.dut());
  }
  gut() {
    Time_1.Time.Now < this.aut ||
      ((this.aut = Time_1.Time.Now + CHECK_IN_TOUCH_INTERVAL),
      (this.eut = this.R$e.IsInTouch(this.JoystickTouchId)));
  }
  lut(t) {
    return (
      !!this.eut &&
      (t.pointerID !== this.JoystickTouchId
        ? (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Battle", 8, "JoystickDrag No CurTouchId", [
              "",
              this.JoystickTouchId,
            ]),
          !1)
        : ((t = t.GetLocalPointInPlane()),
          (this.Y_t.X = t.X),
          (this.Y_t.Y = t.Y),
          this.ZSa(),
          ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Battle",
              8,
              "JoystickDrag",
              ["", this.JoystickTouchId],
              ["", this.Y_t],
            ),
          !0))
    );
  }
  _ut(t, i = !0) {
    t.Subtraction(this.J_t, this.z_t),
      this.z_t.IsNearlyZero(0.001) && this.z_t.Reset(),
      this.fut(this.z_t),
      this.vut(this.z_t, i);
  }
  ZSa() {
    var t;
    this.JSa &&
      (this.Q_t.Set(
        Math.min(this.Y_t.X, MASK_AREA_MAX_X),
        Math.min(this.Y_t.Y, MASK_AREA_MAX_Y),
      ),
      (t = this.Q_t.ToUeVector2D()),
      this.XSa.SetAnchorOffset(t));
  }
  SaveDodgeStartInfo(t) {
    (this.rut = TimeUtil_1.TimeUtil.GetServerTimeStamp()), (this.nut = t);
  }
  TryDodge(t) {
    var i = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    i - this.rut > this.out
      ? (this.rut = i)
      : ((this.rut = i),
        this.nut.Subtraction(t, this.z_t),
        (this.nut = t),
        this.z_t.Size() < this.iut ||
          (this.vut(this.z_t, !0),
          InputController_1.InputController.InputAction(
            InputEnums_1.EInputAction.闪避,
            1,
          ),
          InputController_1.InputController.InputAction(
            InputEnums_1.EInputAction.闪避,
            2,
          )));
  }
  dut() {
    this._ut(this.J_t, !1),
      (this.JoystickTouchId = -1),
      (this.eut = !1),
      (this.tut = !1),
      (ModelManager_1.ModelManager.BattleUiModel.IsPressJoyStick = !1),
      this.XSa?.SetUIActive(!1);
  }
  fut(s) {
    var e = s.SizeSquared();
    if (e <= 0)
      ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Battle",
          8,
          "设置摇杆偏移时，方向向量为0，不会设置角色移动",
          ["targetVector", s],
          ["distanceSquared2D", e],
        );
    else {
      this.$_t.DeepCopy(s), this.$_t.Normalize();
      let t = this.$_t.X * JOYSTICK_RADIU,
        i = this.$_t.Y * JOYSTICK_RADIU;
      e < JOYSTICK_RADIU_SQUARED && ((t = s.X), (i = s.Y)),
        (t += this.J_t.X),
        (i += this.J_t.Y),
        this.Q_t.Set(t, i),
        this.AXe && this.K_t.SetAnchorOffset(this.Q_t.ToUeVector2D()),
        0 < this.$_t.Y
          ? (this.Z_t.Yaw =
              Math.atan(-this.$_t.X / this.$_t.Y) *
              MathCommon_1.MathCommon.RadToDeg)
          : this.$_t.Y < 0
            ? (this.Z_t.Yaw =
                Math.atan(-this.$_t.X / this.$_t.Y) *
                  MathCommon_1.MathCommon.RadToDeg +
                180)
            : 0 < this.$_t.X
              ? (this.Z_t.Yaw = -90)
              : (this.Z_t.Yaw = 90);
      e = this.Z_t.ToUeRotator();
      this.j_t.SetUIRelativeRotation(e),
        this.W_t.SetUIRelativeRotation(e),
        ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Battle",
            8,
            "设置摇杆偏移",
            ["targetVector", s],
            ["normalTargetVector", this.$_t],
            ["resultOffsetX", t],
            ["resultOffsetY", i],
          );
    }
  }
  vut(t, i) {
    var s;
    this.zSa && i && !t.Equality(Vector_1.Vector.ZeroVectorProxy)
      ? ((s = MathUtils_1.MathUtils.RangeClamp(
          t.X,
          -JOYSTICK_RADIU,
          JOYSTICK_RADIU,
          -1,
          1,
        )),
        (t = MathUtils_1.MathUtils.RangeClamp(
          t.Y,
          -JOYSTICK_RADIU,
          JOYSTICK_RADIU,
          -1,
          1,
        )),
        Math.max(Math.abs(s), Math.abs(t)) > WALK_TO_RUN_RATE
          ? this.yut()
          : this.Iut(),
        ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Battle",
            8,
            "[CharacterInput]开始进行调用InputController输入逻辑",
            ["resultX", s],
            ["resultY", t],
          ),
        InputController_1.InputController.InputAxis(
          InputEnums_1.EInputAxis.MoveRight,
          s,
        ),
        InputController_1.InputController.InputAxis(
          InputEnums_1.EInputAxis.MoveForward,
          t,
        ))
      : (i ? this.Eut() : this.Sut(),
        ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Battle",
            8,
            "[CharacterInput]摇杆移回原位，开始进行调用InputController输入逻辑",
          ),
        InputController_1.InputController.InputAxis(
          InputEnums_1.EInputAxis.MoveRight,
          0,
        ),
        InputController_1.InputController.InputAxis(
          InputEnums_1.EInputAxis.MoveForward,
          0,
        ));
  }
  Iut() {
    2 !== this.X_t &&
      (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Battle", 8, "控制角色行走"),
      this.j_t.SetUIActive(!0),
      this.W_t.SetUIActive(!1),
      (this.X_t = 2));
  }
  yut() {
    3 !== this.X_t &&
      (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Battle", 8, "控制角色奔跑"),
      this.j_t.SetUIActive(!1),
      this.W_t.SetUIActive(!0),
      (this.X_t = 3));
  }
  Sut() {
    0 !== this.X_t &&
      (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Battle", 8, "松开摇杆时控制角色站立"),
      this.K_t.SetUIActive(!this.AXe),
      1 !== this.X_t && (this.j_t.SetUIActive(!1), this.W_t.SetUIActive(!1)),
      (this.X_t = 0));
  }
  Eut() {
    1 !== this.X_t &&
      (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Battle", 8, "按下摇杆时控制角色站立"),
      this.K_t.SetUIActive(!0),
      0 !== this.X_t && (this.j_t.SetUIActive(!1), this.W_t.SetUIActive(!1)),
      (this.X_t = 1));
  }
  tEa() {
    (this.zSa =
      ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.GetChildVisible(
        12,
      ) ?? !1),
      this.$Sa?.SetUIActive(this.zSa);
  }
  SetVisible(t, i) {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(
      t,
      12,
      i,
    );
  }
  SetForbidMove(t) {}
}
exports.Joystick = Joystick;
//# sourceMappingURL=Joystick.js.map

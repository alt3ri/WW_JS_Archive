"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamepadControlMouse = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  MOVE_SPEED_INTERVAL = 15,
  TWEEN_TIME = 0.3;
class GamepadControlMouse {
  constructor(t, i) {
    (this.JMa = void 0),
      (this.zMa = void 0),
      (this.fLt = void 0),
      (this.ZMa = void 0),
      (this.eSa = 0),
      (this.tSa = 0),
      (this.iSa = 0),
      (this.rSa = 0),
      (this.oSa = !1),
      (this.nSa = void 0),
      (this.$pt = void 0),
      (this.sSa = Vector2D_1.Vector2D.Create()),
      (this.yca = void 0),
      (this.uGo = void 0),
      (this.aSa = Vector2D_1.Vector2D.Create()),
      (this.YFo = (t) => {
        this.aSa.Set(t.X, t.Y);
        t = this.fLt.ConvertPositionFromLGUICanvasToViewport(
          this.aSa.ToUeVector2D(),
        );
        this.Q_t.Set(t.X, t.Y), this.hSa();
      }),
      (this.lqt = () => {
        var t = Info_1.Info.IsInGamepad();
        LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor?.SetIsOverrideMousePosition(
          t,
        ),
          this.ZMa.SetAlpha(t ? 1 : 0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiNavigation",
              11,
              "UiNavigation:GamepadControlMouse 输入类型方式变化",
              ["是否开启", t],
              ["当前操作类型", Info_1.Info.InputControllerType],
            );
      }),
      (this.ZMa = t),
      (this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(t)),
      (this.nSa = i),
      (this.zMa =
        LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0)),
      (this.fLt = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler()),
      (this.eSa = UiLayer_1.UiLayer.UiRootItem.GetWidth() / 2),
      (this.tSa = UiLayer_1.UiLayer.UiRootItem.GetHeight() / 2),
      (this.uGo = (0, puerts_1.toManualReleaseDelegate)(this.YFo));
  }
  get Q_t() {
    var t;
    return (
      this.JMa ||
        ((t = this.zMa.pointerPosition),
        (this.JMa = Vector2D_1.Vector2D.Create(t.X, t.Y))),
      this.JMa
    );
  }
  get lSa() {
    return 0 !== this.iSa || 0 !== this.rSa;
  }
  _Sa() {
    var t;
    return this.fLt
      ? ((t = this.fLt.ConvertPositionFromViewportToLGUICanvas(
          this.Q_t.ToUeVector2D(),
        )),
        Vector2D_1.Vector2D.Create(t.X - this.eSa, t.Y - this.tSa))
      : this.Q_t;
  }
  hSa() {
    var t = this._Sa();
    let i = 0,
      e = 0;
    t.X > this.eSa
      ? ((i = t.X - this.eSa), (t.X = this.eSa), (this.Q_t.X -= this.rSa))
      : t.X < -this.eSa &&
        ((i = t.X + this.eSa), (t.X = -this.eSa), (this.Q_t.X -= this.rSa)),
      t.Y > this.tSa
        ? ((e = t.Y - this.tSa), (t.Y = this.tSa), (this.Q_t.Y += this.iSa))
        : t.Y < -this.tSa &&
          ((e = t.Y + this.tSa), (t.Y = -this.tSa), (this.Q_t.Y += this.iSa)),
      this.ZMa.SetAnchorOffset(t.ToUeVector2D()),
      LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor?.OverrideMousePosition(
        this.Q_t.ToUeVector2D(),
      ),
      (0 === i && 0 === e) ||
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.GamepadMoveOverScreen,
          i,
          e,
        );
  }
  uSa() {
    this.lSa &&
      (this.Rca(),
      (this.oSa = !1),
      this.hSa(),
      LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor?.SwitchToNavigationInputType());
  }
  Rca() {
    this.yca && (this.yca.Kill(), (this.yca = void 0));
  }
  cSa(t, i) {
    var e = i.RootUIComp.GetLGUISpaceAbsolutePositionByPivot(i.AdsorbedPivot);
    return (
      this.sSa.Set(e.X, e.Y),
      !(
        Math.abs(this.sSa.X - t.X) > i.AdsorbedDistance ||
        Math.abs(this.sSa.Y - t.Y) > i.AdsorbedDistance ||
        Vector2D_1.Vector2D.Distance(this.sSa, t) > i.AdsorbedDistance
      )
    );
  }
  mSa(t) {
    var i = Vector2D_1.Vector2D.Create(t);
    for (const e of this.nSa.GetPanelConfigMap().values())
      for (const s of e.GetPanelHandle().GetListenerSet().values())
        if (s.OpenAdsorbed && this.cSa(i, s)) return s;
  }
  dSa() {
    var t;
    this.lSa ||
      this.oSa ||
      ((this.oSa = !0),
      (t = this.fLt.ConvertPositionFromViewportToLGUICanvas(
        this.Q_t.ToUeVector2D(),
      )),
      this.mSa(t) &&
        (this.Rca(),
        (this.yca = UE.LTweenBPLibrary.Vector2To(
          GlobalData_1.GlobalData.World,
          this.uGo,
          t,
          this.sSa.ToUeVector2D(!0),
          TWEEN_TIME,
        ))));
  }
  MoveForwardByGamepad(t) {
    (this.iSa = t * MOVE_SPEED_INTERVAL),
      0 !== t &&
        (((t = this.zMa?.pointerPosition ?? Vector2D_1.Vector2D.Create()).Y -=
          this.iSa),
        (this.Q_t.Y = t.Y));
  }
  MoveRightByGamepad(t) {
    (this.rSa = t * MOVE_SPEED_INTERVAL),
      0 !== t &&
        (((t = this.zMa?.pointerPosition ?? Vector2D_1.Vector2D.Create()).X +=
          this.rSa),
        (this.Q_t.X = t.X));
  }
  TriggerByGamepad(t) {
    t
      ? (this.$pt.StopSequenceByKey("Release"),
        this.$pt.PlaySequencePurely("Press"))
      : (this.$pt.StopSequenceByKey("Press"),
        this.$pt.PlaySequencePurely("Release"));
  }
  CanOverridePosition(t) {
    var i = t && Info_1.Info.IsInGamepad();
    LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor?.SetIsOverrideMousePosition(
      i,
    ),
      this.ZMa.SetAlpha(i ? 1 : 0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiNavigation",
          11,
          "UiNavigation:GamepadControlMouse 手柄控制鼠标功能",
          ["是否开启", i],
          ["当前操作类型", Info_1.Info.InputControllerType],
        ),
      t
        ? EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.InputControllerChange,
            this.lqt,
          )
        : EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.InputControllerChange,
            this.lqt,
          );
  }
  Clear() {
    this.CanOverridePosition(!1),
      this.Rca(),
      this.$pt.Clear(),
      (0, puerts_1.releaseManualReleaseDelegate)(this.YFo);
  }
  Tick() {
    Info_1.Info.IsInGamepad() && (this.uSa(), this.dSa());
  }
}
exports.GamepadControlMouse = GamepadControlMouse;
//# sourceMappingURL=GamepadControlMouse.js.map

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
  UiNavigationGlobalData_1 = require("../New/UiNavigationGlobalData"),
  MOVE_SPEED_INTERVAL = 15,
  TWEEN_TIME = 0.3;
class GamepadControlMouse {
  constructor(t, i) {
    (this.CIa = void 0),
      (this.gIa = void 0),
      (this.fLt = void 0),
      (this.fIa = void 0),
      (this.pIa = 0),
      (this.vIa = 0),
      (this.MIa = 0),
      (this.SIa = 0),
      (this.EIa = !1),
      (this.u3i = !1),
      (this.yIa = void 0),
      (this.$pt = void 0),
      (this.IIa = Vector2D_1.Vector2D.Create()),
      (this.ICa = void 0),
      (this.uGo = void 0),
      (this.TIa = Vector2D_1.Vector2D.Create()),
      (this.YFo = (t) => {
        this.TIa.Set(t.X, t.Y);
        t = this.fLt.ConvertPositionFromLGUICanvasToViewport(
          this.TIa.ToUeVector2D(),
        );
        this.Q_t.Set(t.X, t.Y), this.LIa();
      }),
      (this.lqt = () => {
        var t = Info_1.Info.IsInGamepad();
        LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor?.SetIsOverrideMousePosition(
          t,
        ),
          this.fIa.SetAlpha(t ? 1 : 0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiNavigation",
              11,
              "UiNavigation:GamepadControlMouse 输入类型方式变化",
              ["是否开启", t],
              ["当前操作类型", Info_1.Info.InputControllerType],
            );
      }),
      (this.fIa = t),
      (this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(t)),
      (this.yIa = i),
      (this.gIa =
        LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0)),
      (this.fLt = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler()),
      (this.pIa = UiLayer_1.UiLayer.UiRootItem.GetWidth() / 2),
      (this.vIa = UiLayer_1.UiLayer.UiRootItem.GetHeight() / 2),
      (this.uGo = (0, puerts_1.toManualReleaseDelegate)(this.YFo));
  }
  get Q_t() {
    var t;
    return (
      this.CIa ||
        ((t = this.gIa.pointerPosition),
        (this.CIa = Vector2D_1.Vector2D.Create(t.X, t.Y))),
      this.CIa
    );
  }
  get DIa() {
    return 0 !== this.MIa || 0 !== this.SIa;
  }
  RIa() {
    var t;
    return this.fLt
      ? ((t = this.fLt.ConvertPositionFromViewportToLGUICanvas(
          this.Q_t.ToUeVector2D(),
        )),
        Vector2D_1.Vector2D.Create(t.X - this.pIa, t.Y - this.vIa))
      : this.Q_t;
  }
  LIa() {
    var t = this.RIa();
    let i = 0,
      e = 0;
    t.X > this.pIa
      ? ((i = t.X - this.pIa), (t.X = this.pIa), (this.Q_t.X -= this.SIa))
      : t.X < -this.pIa &&
        ((i = t.X + this.pIa), (t.X = -this.pIa), (this.Q_t.X -= this.SIa)),
      t.Y > this.vIa
        ? ((e = t.Y - this.vIa), (t.Y = this.vIa), (this.Q_t.Y += this.MIa))
        : t.Y < -this.vIa &&
          ((e = t.Y + this.vIa), (t.Y = -this.vIa), (this.Q_t.Y += this.MIa)),
      this.fIa.SetAnchorOffset(t.ToUeVector2D()),
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
  AIa() {
    this.DIa &&
      (this.UCa(),
      (this.EIa = !1),
      this.LIa(),
      LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor?.SwitchToNavigationInputType());
  }
  UCa() {
    this.ICa && (this.ICa.Kill(), (this.ICa = void 0));
  }
  UIa(t, i) {
    var e = i.RootUIComp.GetLGUISpaceAbsolutePositionByPivot(i.AdsorbedPivot);
    return (
      this.IIa.Set(e.X, e.Y),
      !(
        Math.abs(this.IIa.X - t.X) > i.AdsorbedDistance ||
        Math.abs(this.IIa.Y - t.Y) > i.AdsorbedDistance ||
        Vector2D_1.Vector2D.Distance(this.IIa, t) > i.AdsorbedDistance
      )
    );
  }
  xIa(t) {
    var i = Vector2D_1.Vector2D.Create(t);
    for (const e of this.yIa.GetPanelConfigMap().values())
      for (const s of e.GetPanelHandle().GetListenerSet().values())
        if (s.OpenAdsorbed && this.UIa(i, s)) return s;
  }
  PIa() {
    var t;
    this.DIa ||
      this.EIa ||
      ((this.EIa = !0),
      (t = this.fLt.ConvertPositionFromViewportToLGUICanvas(
        this.Q_t.ToUeVector2D(),
      )),
      this.xIa(t) &&
        (this.UCa(),
        (this.ICa = UE.LTweenBPLibrary.Vector2To(
          GlobalData_1.GlobalData.World,
          this.uGo,
          t,
          this.IIa.ToUeVector2D(!0),
          TWEEN_TIME,
        ))));
  }
  MoveForwardByGamepad(t) {
    (this.MIa = t * MOVE_SPEED_INTERVAL),
      0 !== t &&
        (((t = this.gIa?.pointerPosition ?? Vector2D_1.Vector2D.Create()).Y -=
          this.MIa),
        (this.Q_t.Y = t.Y));
  }
  MoveRightByGamepad(t) {
    (this.SIa = t * MOVE_SPEED_INTERVAL),
      0 !== t &&
        (((t = this.gIa?.pointerPosition ?? Vector2D_1.Vector2D.Create()).X +=
          this.SIa),
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
      this.fIa.SetAlpha(i ? 1 : 0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiNavigation",
          11,
          "UiNavigation:GamepadControlMouse 手柄控制鼠标功能",
          ["是否开启", i],
          ["当前操作类型", Info_1.Info.InputControllerType],
        ),
      this.u3i !== t &&
        ((this.u3i = t)
          ? EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.InputControllerChange,
              this.lqt,
            )
          : EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.InputControllerChange,
              this.lqt,
            ));
  }
  UpdateMousePositionByItem(t) {
    (t = t.GetLGUISpaceAbsolutePosition()),
      (t = this.fLt.ConvertPositionFromLGUICanvasToViewport(
        new UE.Vector2D(t.X, t.Y),
      ));
    this.Q_t.Set(t.X, t.Y),
      this.UCa(),
      this.LIa(),
      LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor?.SwitchToNavigationInputType();
  }
  Clear() {
    this.CanOverridePosition(!1),
      this.UCa(),
      this.$pt.Clear(),
      (0, puerts_1.releaseManualReleaseDelegate)(this.YFo);
  }
  Tick() {
    !Info_1.Info.IsInGamepad() ||
      UiNavigationGlobalData_1.UiNavigationGlobalData.IsBlockNavigation ||
      (this.AIa(), this.PIa());
  }
}
exports.GamepadControlMouse = GamepadControlMouse;
//# sourceMappingURL=GamepadControlMouse.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapMoveComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  MarkItem_1 = require("../../Map/Marks/MarkItem/MarkItem"),
  WorldMapComponentBase_1 = require("./WorldMapComponentBase");
class WorldMapMoveComponent extends WorldMapComponentBase_1.WorldMapComponentBase {
  constructor(t, e) {
    super(t),
      (this.BFo = void 0),
      (this.HFo = !1),
      (this.jFo = void 0),
      (this.WFo = void 0),
      (this.KFo = void 0),
      (this.QFo = new Vector2D_1.Vector2D()),
      (this.XFo = new Vector2D_1.Vector2D()),
      (this.$Fo = void 0),
      (this.YFo = (t) => {
        t = Vector2D_1.Vector2D.Create(t);
        this.SetMapPosition(t, !1, 2);
      }),
      (this.JFo = (t) => {
        var e = Vector2D_1.Vector2D.Create(),
          t =
            (t.Multiply(this.BFo.TweenTime, e),
            Vector2D_1.Vector2D.Create(
              this.Map.GetRootItem().GetAnchorOffset(),
            ).AdditionEqual(e));
        this.SetMapPosition(
          t,
          !0,
          1,
          2,
          CommonParamById_1.configCommonParamById.GetFloatConfig(
            "MapDragInertiaTime",
          ),
        );
      }),
      (this.Ngo = () => {
        this.jFo?.Kill(!0);
      }),
      (this.zFo = () => {
        this.jFo?.Kill(!0);
      }),
      (this.vKe = (t) => {
        this.ZFo(t);
      }),
      (this.e3o = !1),
      (this.t3o = !1),
      (this.i3o = (t) => {
        (this.QFo.Y = t), (this.e3o = !0);
      }),
      (this.o3o = (t) => {
        (this.XFo.X = t), (this.t3o = !0);
      }),
      (this.KFo = { MinX: 0, MaxX: 0, MinY: 0, MaxY: 0 }),
      (this.$Fo = { MinX: 0, MaxX: 0, MinY: 0, MaxY: 0 }),
      (this.BFo = e),
      (this.WFo = (0, puerts_1.toManualReleaseDelegate)(this.YFo));
  }
  get SafeAreaSize() {
    var t = this.KFo;
    return (
      (t.MinX =
        -(
          (this.MapSize.X + this.Map.MapOffset.Y) * this.MapScale -
          this.ViewportSize.X
        ) / 2),
      (t.MaxX =
        ((this.MapSize.X - this.Map.MapOffset.X) * this.MapScale -
          this.ViewportSize.X) /
        2),
      (t.MinY =
        -(
          (this.MapSize.Y - this.Map.MapOffset.Z) * this.MapScale -
          this.ViewportSize.Y
        ) / 2),
      (t.MaxY =
        ((this.MapSize.Y - this.Map.MapOffset.W) * this.MapScale -
          this.ViewportSize.Y) /
        2),
      t
    );
  }
  get DangerousAreaSize() {
    var t = this.$Fo;
    return (
      (t.MinX =
        -(
          (this.MapSize.X + this.Map.MapOffset.Y + this.Map.FakeOffset) *
            this.MapScale -
          this.ViewportSize.X
        ) / 2),
      (t.MaxX =
        ((this.MapSize.X - this.Map.MapOffset.X + this.Map.FakeOffset) *
          this.MapScale -
          this.ViewportSize.X) /
        2),
      (t.MinY =
        -(
          (this.MapSize.Y - this.Map.MapOffset.Z + this.Map.FakeOffset) *
            this.MapScale -
          this.ViewportSize.Y
        ) / 2),
      (t.MaxY =
        ((this.MapSize.Y - this.Map.MapOffset.W + this.Map.FakeOffset) *
          this.MapScale -
          this.ViewportSize.Y) /
        2),
      t
    );
  }
  get IsTweeningMove() {
    return this.HFo;
  }
  KillTweening() {
    this.HFo && this.r3o(), (this.HFo = !1);
  }
  get MapScale() {
    return ModelManager_1.ModelManager.WorldMapModel.MapScale;
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldMapDragInertia,
      this.JFo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapPointerDrag,
        this.vKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapPointerDown,
        this.Ngo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapWheelAxisInput,
        this.zFo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapJoystickMoveForward,
        this.i3o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapJoystickMoveRight,
        this.o3o,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldMapDragInertia,
      this.JFo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapPointerDrag,
        this.vKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapPointerDown,
        this.Ngo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapWheelAxisInput,
        this.zFo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapJoystickMoveForward,
        this.i3o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapJoystickMoveRight,
        this.o3o,
      );
  }
  OnDestroy() {
    this.r3o(),
      (0, puerts_1.releaseManualReleaseDelegate)(this.YFo),
      (this.WFo = void 0),
      (this.KFo = void 0),
      (this.$Fo = void 0),
      (this.BFo = void 0);
  }
  PushMap(t, e = !0, i = 2) {
    var s, h, n, o, r;
    this.BFo
      ? ((s = t.UiPosition.X),
        (t = t.UiPosition.Y),
        (h = this.Map.GetRootItem().GetAnchorOffset()),
        (r = s * this.MapScale + h.X),
        (h = t * this.MapScale + h.Y),
        (n = this.BFo.FocusMark_AnchoredPosition.X),
        (o = this.BFo.FocusMark_AnchoredPosition.Y),
        r === n && h === o
          ? EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.WorldMapPositionChanged,
            )
          : ((r = Vector2D_1.Vector2D.Create(
              -s * this.MapScale + n,
              -t * this.MapScale + o,
            )),
            this.SetMapPosition(
              r,
              e,
              i,
              this.BFo.TweenTypeEase,
              this.BFo.TweenTime,
            )))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Map", 19, "请于根节点挂KuroWorldMapUIParams组件");
  }
  SetMapPosition(e, i, s = 0, h, n, o = !0) {
    if (e)
      if (this.BFo) {
        let t = Vector2D_1.Vector2D.Create();
        e instanceof Vector2D_1.Vector2D
          ? t.DeepCopy(e)
          : e instanceof MarkItem_1.MarkItem &&
            ((t.X = e.UiPosition.X),
            (t.Y = e.UiPosition.Y),
            t.MultiplyEqual(this.MapScale).UnaryNegation(t));
        e = Vector2D_1.Vector2D.Create(t.X, t.Y);
        (t = this.n3o(e, s)),
          i
            ? ((this.HFo = !0),
              this.r3o(),
              (this.jFo = UE.LTweenBPLibrary.Vector2To(
                GlobalData_1.GlobalData.World,
                this.WFo,
                this.Map.GetRootItem().GetAnchorOffset(),
                t.ToUeVector2D(!0),
                n,
                0,
                h,
              )),
              this.jFo.OnCompleteCallBack.Bind(() => {
                this.HFo = !1;
              }))
            : (this.Map.GetRootItem().SetAnchorOffset(t.ToUeVector2D(!0)),
              o &&
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.WorldMapPositionChanged,
                ));
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Map", 19, "请于根节点挂KuroWorldMapUIParams组件");
  }
  FocusPlayer(t, e = !1, i = 0) {
    var s = Vector2D_1.Vector2D.Create();
    t.Multiply(this.MapScale, s).UnaryNegation(s),
      this.SetMapPosition(s, e, i, this.BFo.TweenTypeEase, this.BFo.TweenTime);
  }
  n3o(t, e, i = !1) {
    let s = t.X,
      h = t.Y;
    switch (e) {
      case 0:
        break;
      case 1:
        (s = MathCommon_1.MathCommon.Clamp(
          t.X,
          this.SafeAreaSize.MinX,
          this.SafeAreaSize.MaxX,
        )),
          (h = MathCommon_1.MathCommon.Clamp(
            t.Y,
            this.KFo.MinY,
            this.KFo.MaxY,
          ));
        break;
      case 2:
        (s = MathCommon_1.MathCommon.Clamp(
          t.X,
          this.DangerousAreaSize.MinX,
          this.DangerousAreaSize.MaxX,
        )),
          (h = MathCommon_1.MathCommon.Clamp(
            t.Y,
            this.DangerousAreaSize.MinY,
            this.DangerousAreaSize.MaxY,
          ));
    }
    let n = t;
    return (
      i || 0 === e
        ? ((n.X = s), (n.Y = h))
        : (n = Vector2D_1.Vector2D.Create(s, h)),
      n
    );
  }
  r3o() {
    this.jFo && (this.jFo.Kill(), (this.jFo = void 0));
  }
  ZFo(t) {
    var e = Vector2D_1.Vector2D.Create(
      this.Map.GetRootItem().GetAnchorOffset(),
    );
    this.SetMapPosition(e.AdditionEqual(t), !1, 2);
  }
  TickMoveDirty() {
    var t;
    (this.e3o || this.t3o) &&
      ((t = Vector2D_1.Vector2D.Create(
        this.Map.GetRootItem().GetAnchorOffset(),
      )),
      this.e3o && (t.AdditionEqual(this.QFo), (this.e3o = !1)),
      this.t3o && (t.AdditionEqual(this.XFo), (this.t3o = !1)),
      this.SetMapPosition(t, !1, 2));
  }
}
exports.WorldMapMoveComponent = WorldMapMoveComponent;
//# sourceMappingURL=WorldMapMoveComponent.js.map

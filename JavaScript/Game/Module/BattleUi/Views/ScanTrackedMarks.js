"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScanTrackedMarks = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil"),
  MapDefine_1 = require("../../Map/MapDefine"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  PROFILE_KEY = "ScanTrackedMarks_CreateTrackEffect",
  CENTER_Y = 62.5,
  center = new UE.Vector2D(0, CENTER_Y),
  MAX_A = 1176,
  MARGIN_A = 1008,
  MAX_B = 712.5,
  MARGIN_B = 495,
  OFFSET_Z = 1e3,
  MIN_SHOW_DISTANCE = 3,
  MARK_CASE_NAME = new UE.FName("MarkCase"),
  spriteColors = [
    "FF5252FF",
    "FF5A5FCC",
    "FFB137FF",
    "FFC954FF",
    "BC6AFEFF",
    "C67FFFFF",
    "85A3FFFF",
    "8AA7FFFF",
    "90B99AFF",
    "AAD3B3FF",
    "A5A5A5FF",
    "D1D1D1FF",
  ];
class ScanTrackedMarks extends UiPanelBase_1.UiPanelBase {
  constructor(e, t, i, s, r, a, h, _, o, n) {
    super(),
      (this.M$e = void 0),
      (this.E$e = void 0),
      (this.S$e = (0, puerts_1.$ref)(void 0)),
      (this.RYe = (0, puerts_1.$ref)(0)),
      (this.UYe = (0, puerts_1.$ref)(0)),
      (this.PYe = new UE.Vector2D(0, 0)),
      (this.A$e = new UE.Vector2D(1, -1)),
      (this.Smt = 0),
      (this.ymt = 0),
      (this.yB = void 0),
      (this.B8 = 0),
      (this.Imt = !1),
      (this.fi1 = !1),
      (this.Tmt = 0),
      (this.Lmt = 0),
      (this.Dmt = void 0),
      (this.tat = ""),
      (this.Wse = Vector_1.Vector.Create()),
      (this.SPe = void 0),
      (this.y$e = 0),
      (this.I$e = 0),
      (this.Mxe = (e) => {
        "Start" === e
          ? this.SPe.PlaySequencePurely("Loop")
          : "Close" === e && this.Destroy();
      }),
      GlobalData_1.GlobalData.World &&
        (ScanTrackedMarks.uoe || ScanTrackedMarks.Rmt(),
        (this.Dmt = t),
        (this.tat = s),
        (this.yB = h),
        (this.Smt = i),
        (this.B8 = _),
        (this.Imt = o ?? !1),
        (this.fi1 = n ?? !1),
        this.CreateThenShowByResourceIdAsync("UiItem_Scanning_Prefab", e),
        (this.M$e = r || new UE.VectorDouble()),
        (this.E$e = a),
        (t = UiLayer_1.UiLayer.UiRootItem),
        (this.y$e = Math.min(MAX_A, ((t?.GetWidth() ?? 0) - MARGIN_A) / 2)),
        (this.I$e = Math.min(MAX_B, ((t?.GetHeight() ?? 0) - MARGIN_B) / 2)));
  }
  get Umt() {
    if (this.E$e?.IsValid()) {
      var e = Vector_1.Vector.Create(),
        i = Vector_1.Vector.Create();
      if (this.E$e instanceof TsBaseCharacter_1.default) {
        let t = !1;
        var s = this.E$e.Mesh.GetAllSocketNames(),
          r = s.Num();
        for (let e = 0; e < r; e++)
          if (s.Get(e).op_Equality(MARK_CASE_NAME)) {
            t = !0;
            break;
          }
        t
          ? i.FromUeVector(this.E$e.Mesh.D_GetSocketLocation(MARK_CASE_NAME))
          : i.FromUeVector(this.E$e.Mesh.D_K2_GetComponentLocation());
      } else i.FromUeVector(this.E$e.D_K2_GetActorLocation());
      return i.Addition(this.yB, e), e.ToUeVector();
    }
    return this.M$e;
  }
  static Rmt() {
    var e = UE.NewObject(UE.TraceLineElement.StaticClass());
    (e.WorldContextObject = GlobalData_1.GlobalData.World),
      (e.bIsSingle = !0),
      e.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
  }
  Amt(e) {
    var t = this.GetSprite(0),
      i = this.GetSprite(1),
      s = this.GetSprite(2),
      r = this.GetSprite(4);
    t.SetColor(UE.Color.FromHex(spriteColors[2 * this.B8])),
      i.SetColor(UE.Color.FromHex(spriteColors[2 * this.B8 + 1])),
      s.SetSprite(e),
      r.SetUIActive(!1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UIText],
      [4, UE.UISprite],
    ];
  }
  OnStart() {
    this.GetText(3)?.SetUIActive(this.Imt), this.Amt(this.Dmt);
    var e = UiLayer_1.UiLayer.UiRootItem;
    (this.Tmt = e?.GetWidth()),
      (this.Lmt = e?.GetHeight()),
      this.tat && 0 < this.tat.length && (this.ymt = this.Pmt(this.tat)),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.SPe.BindSequenceCloseEvent(this.Mxe),
      this.SPe.PlayLevelSequenceByName("Start"),
      this.RootItem.SetUIActive(!1),
      this.xmt(!0);
  }
  Update() {
    if (GlobalData_1.GlobalData.World && this.RootItem && this.E$e?.IsValid()) {
      var t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation(),
        t =
          UE.KismetMathLibrary.D_Vector_Distance(t.ToUeVector(), this.Umt) *
          MapDefine_1.FLOAT_0_01;
      if (t <= this.Smt) this.RootItem.SetUIActive(!1), this.xmt(!0);
      else {
        var i = Global_1.Global.CharacterController,
          s = UE.GameplayStatics.D_ProjectWorldToScreen(i, this.Umt, this.S$e);
        if (!s) {
          if (!this.fi1)
            return this.RootItem.SetUIActive(!1), void this.xmt(!0);
          var r = ModelManager_1.ModelManager.CameraModel.CameraTransform,
            a = r.InverseTransformPositionNoScale(this.Umt),
            r = ((a.X = -a.X), r.TransformPositionNoScale(a));
          UE.GameplayStatics.D_ProjectWorldToScreen(i, r, this.S$e);
        }
        let e = (0, puerts_1.$unref)(this.S$e);
        i.GetViewportSize(this.RYe, this.UYe);
        var a = (0, puerts_1.$unref)(this.RYe),
          r = UiLayer_1.UiLayer.UiRootItem;
        r &&
          ((this.PYe.X = r.GetWidth()),
          (this.PYe.Y = r.GetHeight()),
          (e = e
            .op_Multiply(r.GetWidth() / a)
            .op_Subtraction(this.PYe.op_Multiply(0.5))
            .op_Multiply(this.A$e)),
          (i = !1),
          ([e, i] = this.H$e(e, s, this.fi1)),
          i || this.fi1
            ? ((r = e.op_Addition(center)),
              this.RootItem.SetAnchorOffset(r),
              this.fi1 &&
                ((a = this.GetSprite(4)),
                i
                  ? a.SetUIActive(!1)
                  : ((s = Rotator_1.Rotator.Create(
                      0,
                      Math.atan2(e.Y, e.X) * (180 / Math.PI),
                      0,
                    )),
                    a.SetUIRelativeRotation(s.ToUeRotator()),
                    a.SetUIActive(!0))),
              this.Imt &&
                ((r = Math.round(t)),
                (i = this.GetText(3)),
                (s =
                  !Number.isNaN(r) &&
                  Number.isFinite(r) &&
                  r >= MIN_SHOW_DISTANCE) &&
                  LguiUtil_1.LguiUtil.SetLocalText(i, "Meter", r),
                i.IsUIActiveSelf() !== s) &&
                i.SetUIActive(s),
              this.RootItem.SetUIActive(!0),
              this.xmt(!1))
            : (this.RootItem.SetUIActive(!1), this.xmt(!0)));
      }
    }
  }
  H$e(e, t, i) {
    var s = e.X,
      r = e.Y,
      a = this.y$e,
      h = this.I$e;
    return i
      ? t && (s * s) / (a * a) + (r * r) / (h * h) <= 1
        ? [e, !0]
        : ((i = (a * h) / Math.sqrt(h * h * s * s + a * a * r * r)),
          [new UE.Vector2D(s * i, r * i), !1])
      : ((t = this.Tmt + 10),
        (h = this.Lmt + 10),
        s < -t || t < s || r < -h || h < r ? [e, !1] : [e, !0]);
  }
  Pmt(e) {
    var t = ScanTrackedMarks.uoe,
      i =
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.M$e),
        t.SetEndLocation(this.M$e.X, this.M$e.Y, this.M$e.Z + OFFSET_Z),
        this.Wse.FromUeVector(this.M$e),
        TraceElementCommon_1.TraceElementCommon.LineTrace(t, PROFILE_KEY)),
      t = t.HitResult,
      i =
        (i && t.bBlockingHit && (this.Wse.Z = t.LocationZ_Array.Get(0)),
        (this.Wse.Z -= 5),
        EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          new UE.TransformDouble(),
          e,
          "[ScanTrackedMarks.CreateTrackEffect]",
        ));
    return (
      EffectSystem_1.EffectSystem.IsValid(i) &&
        (t = EffectSystem_1.EffectSystem.GetEffectActor(i))?.IsValid() &&
        t.D_K2_SetActorLocationAndRotation(
          this.Wse.ToUeVector(),
          Rotator_1.Rotator.ZeroRotator,
          !1,
          void 0,
          !1,
        ),
      i
    );
  }
  xmt(e) {
    EffectSystem_1.EffectSystem.SetEffectHidden(this.ymt, e);
  }
  ToClose() {
    this.RootItem
      ? this.RootItem.bIsUIActive &&
        (this.SPe.StopCurrentSequence(),
        this.SPe.PlayLevelSequenceByName("Close"))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelPlay",
          31,
          "[ScanTrackedMarks.ToClose] RootItem is null",
        );
  }
  OnBeforeDestroy() {
    this.ymt &&
      (EffectSystem_1.EffectSystem.StopEffectById(
        this.ymt,
        "[ScanTrackedMarks.Destroy]",
        !0,
      ),
      (this.ymt = 0)),
      this.SPe?.Clear();
  }
}
exports.ScanTrackedMarks = ScanTrackedMarks;
//# sourceMappingURL=ScanTrackedMarks.js.map

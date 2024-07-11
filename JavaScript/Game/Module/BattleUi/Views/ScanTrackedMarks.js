"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScanTrackedMarks = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil"),
  MapDefine_1 = require("../../Map/MapDefine"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  PROFILE_KEY = "ScanTrackedMarks_CreateTrackEffect",
  CENTER_Y = 62.5,
  center = new UE.Vector2D(0, CENTER_Y),
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
  constructor(e, t, i, s, r, a, h, _, o) {
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
      (this.Tmt = 0),
      (this.Lmt = 0),
      (this.Dmt = void 0),
      (this.tat = ""),
      (this.Wse = Vector_1.Vector.Create()),
      (this.SPe = void 0),
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
        this.CreateThenShowByResourceIdAsync("UiItem_Scanning_Prefab", e),
        (this.M$e = r || new UE.Vector()),
        (this.E$e = a));
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
          if (s.Get(e) === MARK_CASE_NAME) {
            t = !0;
            break;
          }
        t
          ? i.FromUeVector(this.E$e.Mesh.GetSocketLocation(MARK_CASE_NAME))
          : i.FromUeVector(this.E$e.K2_GetActorLocation());
      } else i.FromUeVector(this.E$e.K2_GetActorLocation());
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
      s = this.GetSprite(2);
    t.SetColor(UE.Color.FromHex(spriteColors[2 * this.B8])),
      i.SetColor(UE.Color.FromHex(spriteColors[2 * this.B8 + 1])),
      s.SetSprite(e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UIText],
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
          UE.KismetMathLibrary.Vector_Distance(t.ToUeVector(), this.Umt) *
          MapDefine_1.FLOAT_0_01;
      if (t <= this.Smt) this.RootItem.SetUIActive(!1), this.xmt(!0);
      else {
        var i = Global_1.Global.CharacterController,
          s = UE.GameplayStatics.ProjectWorldToScreen(i, this.Umt, this.S$e);
        if (s) {
          let e = (0, puerts_1.$unref)(this.S$e);
          i.GetViewportSize(this.RYe, this.UYe);
          var i = (0, puerts_1.$unref)(this.RYe),
            r = UiLayer_1.UiLayer.UiRootItem;
          r &&
            ((this.PYe.X = r.GetWidth()),
            (this.PYe.Y = r.GetHeight()),
            (e = e
              .op_Multiply(r.GetWidth() / i)
              .op_Subtraction(this.PYe.op_Multiply(0.5))
              .op_Multiply(this.A$e)),
            (r = !1),
            ([e, r] = this.H$e(e, s)),
            r
              ? ((i = e.op_Addition(center)),
                this.RootItem.SetAnchorOffset(i),
                this.Imt &&
                  ((s = Math.round(t)),
                  (r = this.GetText(3)),
                  (i =
                    !Number.isNaN(s) &&
                    Number.isFinite(s) &&
                    s >= MIN_SHOW_DISTANCE) &&
                    LguiUtil_1.LguiUtil.SetLocalText(r, "Meter", s),
                  r.IsUIActiveSelf() !== i) &&
                  r.SetUIActive(i),
                this.RootItem.SetUIActive(!0),
                this.xmt(!1))
              : (this.RootItem.SetUIActive(!1), this.xmt(!0)));
        } else this.RootItem.SetUIActive(!1), this.xmt(!0);
      }
    }
  }
  H$e(e, t) {
    var i = e.X,
      s = e.Y,
      r = this.Tmt + 10,
      a = this.Lmt + 10;
    return i < -r || r < i || s < -a || a < s ? [e, !1] : [e, !0];
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
          new UE.Transform(),
          e,
          "[ScanTrackedMarks.CreateTrackEffect]",
        ));
    return (
      EffectSystem_1.EffectSystem.IsValid(i) &&
        (t = EffectSystem_1.EffectSystem.GetEffectActor(i))?.IsValid() &&
        t.K2_SetActorLocationAndRotation(
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
    EffectSystem_1.EffectSystem.IsValid(this.ymt) &&
      EffectSystem_1.EffectSystem.GetEffectActor(this.ymt).SetActorHiddenInGame(
        e,
      );
  }
  ToClose() {
    this.RootItem.bIsUIActive &&
      (this.SPe.StopCurrentSequence(),
      this.SPe.PlayLevelSequenceByName("Close"));
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

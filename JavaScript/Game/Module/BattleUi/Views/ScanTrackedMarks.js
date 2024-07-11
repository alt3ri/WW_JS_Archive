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
      (this.hXe = void 0),
      (this.lXe = void 0),
      (this._Xe = (0, puerts_1.$ref)(void 0)),
      (this.g$e = (0, puerts_1.$ref)(0)),
      (this.f$e = (0, puerts_1.$ref)(0)),
      (this.v$e = new UE.Vector2D(0, 0)),
      (this.pXe = new UE.Vector2D(1, -1)),
      (this._ct = 0),
      (this.uct = 0),
      (this.yB = void 0),
      (this.B8 = 0),
      (this.cct = !1),
      (this.mct = 0),
      (this.dct = 0),
      (this.Cct = void 0),
      (this.Hnt = ""),
      (this.Wse = Vector_1.Vector.Create()),
      (this.EPe = void 0),
      (this.Mxe = (e) => {
        "Start" === e
          ? this.EPe.PlaySequencePurely("Loop")
          : "Close" === e && this.Destroy();
      }),
      GlobalData_1.GlobalData.World &&
        (ScanTrackedMarks.uoe || ScanTrackedMarks.gct(),
        (this.Cct = t),
        (this.Hnt = s),
        (this.yB = h),
        (this._ct = i),
        (this.B8 = _),
        (this.cct = o ?? !1),
        this.CreateThenShowByResourceIdAsync("UiItem_Scanning_Prefab", e),
        (this.hXe = r || new UE.Vector()),
        (this.lXe = a));
  }
  get fct() {
    if (this.lXe?.IsValid()) {
      var e = Vector_1.Vector.Create(),
        i = Vector_1.Vector.Create();
      if (this.lXe instanceof TsBaseCharacter_1.default) {
        let t = !1;
        var s = this.lXe.Mesh.GetAllSocketNames(),
          r = s.Num();
        for (let e = 0; e < r; e++)
          if (s.Get(e) === MARK_CASE_NAME) {
            t = !0;
            break;
          }
        t
          ? i.FromUeVector(this.lXe.Mesh.GetSocketLocation(MARK_CASE_NAME))
          : i.FromUeVector(this.lXe.K2_GetActorLocation());
      } else i.FromUeVector(this.lXe.K2_GetActorLocation());
      return i.Addition(this.yB, e), e.ToUeVector();
    }
    return this.hXe;
  }
  static gct() {
    var e = UE.NewObject(UE.TraceLineElement.StaticClass());
    (e.WorldContextObject = GlobalData_1.GlobalData.World),
      (e.bIsSingle = !0),
      e.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
  }
  pct(e) {
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
    this.GetText(3)?.SetUIActive(this.cct), this.pct(this.Cct);
    var e = UiLayer_1.UiLayer.UiRootItem;
    (this.mct = e?.GetWidth()),
      (this.dct = e?.GetHeight()),
      this.Hnt && 0 < this.Hnt.length && (this.uct = this.vct(this.Hnt)),
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.EPe.BindSequenceCloseEvent(this.Mxe),
      this.EPe.PlayLevelSequenceByName("Start"),
      this.RootItem.SetUIActive(!1),
      this.Mct(!0);
  }
  Update() {
    if (GlobalData_1.GlobalData.World && this.RootItem && this.lXe?.IsValid()) {
      var t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation(),
        t =
          UE.KismetMathLibrary.Vector_Distance(t.ToUeVector(), this.fct) *
          MapDefine_1.FLOAT_0_01;
      if (t <= this._ct) this.RootItem.SetUIActive(!1), this.Mct(!0);
      else {
        var i = Global_1.Global.CharacterController,
          s = UE.GameplayStatics.ProjectWorldToScreen(i, this.fct, this._Xe);
        if (s) {
          let e = (0, puerts_1.$unref)(this._Xe);
          i.GetViewportSize(this.g$e, this.f$e);
          var i = (0, puerts_1.$unref)(this.g$e),
            r = UiLayer_1.UiLayer.UiRootItem;
          r &&
            ((this.v$e.X = r.GetWidth()),
            (this.v$e.Y = r.GetHeight()),
            (e = e
              .op_Multiply(r.GetWidth() / i)
              .op_Subtraction(this.v$e.op_Multiply(0.5))
              .op_Multiply(this.pXe)),
            (r = !1),
            ([e, r] = this.PXe(e, s)),
            r
              ? ((i = e.op_Addition(center)),
                this.RootItem.SetAnchorOffset(i),
                this.cct &&
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
                this.Mct(!1))
              : (this.RootItem.SetUIActive(!1), this.Mct(!0)));
        } else this.RootItem.SetUIActive(!1), this.Mct(!0);
      }
    }
  }
  PXe(e, t) {
    var i = e.X,
      s = e.Y,
      r = this.mct + 10,
      a = this.dct + 10;
    return i < -r || r < i || s < -a || a < s ? [e, !1] : [e, !0];
  }
  vct(e) {
    var t = ScanTrackedMarks.uoe,
      i =
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.hXe),
        t.SetEndLocation(this.hXe.X, this.hXe.Y, this.hXe.Z + OFFSET_Z),
        this.Wse.FromUeVector(this.hXe),
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
  Mct(e) {
    EffectSystem_1.EffectSystem.IsValid(this.uct) &&
      EffectSystem_1.EffectSystem.GetEffectActor(this.uct).SetActorHiddenInGame(
        e,
      );
  }
  ToClose() {
    this.RootItem.bIsUIActive &&
      (this.EPe.StopCurrentSequence(),
      this.EPe.PlayLevelSequenceByName("Close"));
  }
  OnBeforeDestroy() {
    this.uct &&
      (EffectSystem_1.EffectSystem.StopEffectById(
        this.uct,
        "[ScanTrackedMarks.Destroy]",
        !0,
      ),
      (this.uct = 0)),
      this.EPe?.Clear();
  }
}
exports.ScanTrackedMarks = ScanTrackedMarks;
//# sourceMappingURL=ScanTrackedMarks.js.map

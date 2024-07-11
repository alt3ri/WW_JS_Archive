"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TrackEffectExpressController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
  EffectSystem_1 = require("../../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  PROFILE_KEY = "TrackedMark_CreateTrackEffect",
  OFFSET_Z = 1e3;
class TrackEffectExpressController {
  constructor(t) {
    (this.OQt = void 0),
      (this.kQt = void 0),
      (this.OnBattleViewActive = () => {
        if (this.kQt) for (var [, t] of this.kQt) t.OnBattleViewActive();
      }),
      (this.OnBattleViewHide = () => {
        if (this.kQt) for (var [, t] of this.kQt) t.OnBattleViewHide();
      }),
      (this.OQt = t),
      (this.kQt = new Map());
  }
  Clear() {
    if (this.kQt) {
      for (var [, t] of this.kQt) t.Destroy();
      this.kQt.clear();
    }
    this.OQt = void 0;
  }
  EnableTrack(t) {
    if (this.kQt) for (var [, e] of this.kQt) t ? e.Start() : e.End();
  }
  NodeTrackEffectStart(t, e, i) {
    t = this.FQt(t, e);
    i && t.Start();
  }
  NodeTrackEffectEnd(t) {
    this.GetNodeTrackMarkCreator(t)?.End(), this.kQt.delete(t);
  }
  FQt(t, e) {
    var i = this.GetNodeTrackMarkCreator(t);
    return (
      i || ((i = new NodeTrackEffect(this.OQt, t, e)), this.kQt.set(t, i), i)
    );
  }
  GetNodeTrackMarkCreator(t) {
    return this.kQt.get(t);
  }
  UpdateTrackEffectExpression(t, e) {
    e === Protocol_1.Aki.Protocol.DNs.Proto_Destroy &&
      (this.GetNodeTrackMarkCreator(t)?.Destroy(), this.kQt.delete(t));
  }
  OnBtApplyExpressionOccupation(t) {
    if (!t) for (var [, e] of this.kQt) e.OnExpressOccupied();
  }
  OnBtReleaseExpressionOccupation(t) {
    if (!t) for (var [, e] of this.kQt) e.OnExpressOccupationRelease();
  }
}
exports.TrackEffectExpressController = TrackEffectExpressController;
class NodeTrackEffect {
  constructor(t, e, i) {
    (this.OQt = void 0),
      (this.Jut = 0),
      (this.VQt = 0),
      (this.HQt = 0),
      (this.jQt = 0),
      (this.WQt = 0),
      (this.Wse = void 0),
      (this.j3 = void 0),
      (this.KQt = 0),
      (this.QQt = !1),
      (this.pCt = !1),
      (this.OnBattleViewActive = () => {
        var t = this.OQt.GetTrackDistance(this.Jut);
        (this.QQt = t < this.jQt),
          this.XQt(this.VQt, !this.QQt),
          this.XQt(this.HQt, this.QQt),
          this.j3 && this.j3.IsPause() && this.j3.Resume();
      }),
      (this.OnBattleViewHide = () => {
        this.xmt(), this.j3 && !this.j3.IsPause() && this.j3.Pause();
      }),
      (this.$Qt = () => {
        var t;
        this.pCt || (t = this.OQt.GetTrackDistance(this.Jut)) <= 0
          ? this.xmt()
          : (!this.QQt &&
              t < this.jQt &&
              ((this.QQt = !0), this.XQt(this.VQt, !1), this.XQt(this.HQt, !0)),
            this.QQt &&
              t >= this.WQt &&
              ((this.QQt = !1),
              this.XQt(this.VQt, !0),
              this.XQt(this.HQt, !1)));
      }),
      NodeTrackEffect.uoe || NodeTrackEffect.Rmt(),
      (this.Jut = e),
      (this.OQt = t),
      (this.jQt = i.EnterRange),
      (this.WQt = i.LeaveRange),
      (this.Wse = Vector_1.Vector.Create());
  }
  Destroy() {
    this.End(), (this.OQt = void 0);
  }
  static Rmt() {
    var t = UE.NewObject(UE.TraceLineElement.StaticClass());
    (t.WorldContextObject = GlobalData_1.GlobalData.World),
      (t.bIsSingle = !0),
      t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water),
      (NodeTrackEffect.uoe = t);
  }
  Start() {
    (this.QQt = void 0), (this.KQt = 0);
    var t,
      e,
      i =
        ConfigManager_1.ConfigManager.QuestNewConfig.GetTrackEffectPath(
          "LongLightBeam",
        );
    StringUtils_1.StringUtils.IsEmpty(i)
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("GeneralLogicTree", 19, "找不到追踪特效配置路径", [
          "trackEffectType",
          "LongLightBeam",
        ])
      : ((t =
          ConfigManager_1.ConfigManager.QuestNewConfig.GetTrackEffectPath(
            "ShortLightBeam",
          )),
        StringUtils_1.StringUtils.IsEmpty(t)
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error("GeneralLogicTree", 19, "找不到追踪特效配置路径", [
              "trackEffectType",
              "ShortLightBeam",
            ])
          : (e = this.OQt.GetNodeTrackPosition(this.Jut))
            ? ((this.VQt = this.Pmt("LongLightBeam", i, e)),
              (this.HQt = this.Pmt("ShortLightBeam", t, e)))
            : Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "GeneralLogicTree",
                19,
                "找不到追踪位置",
                ["trackEffectType", "ShortLightBeam"],
                ["nodeId", this.Jut],
              ));
  }
  End() {
    TimerSystem_1.TimerSystem.Has(this.j3) &&
      TimerSystem_1.TimerSystem.Remove(this.j3),
      (this.j3 = void 0),
      EffectSystem_1.EffectSystem.IsValid(this.VQt) &&
        EffectSystem_1.EffectSystem.StopEffectById(
          this.VQt,
          "[TrackEffectExpress.End]",
          !0,
        ),
      (this.VQt = 0),
      EffectSystem_1.EffectSystem.IsValid(this.HQt) &&
        EffectSystem_1.EffectSystem.StopEffectById(
          this.HQt,
          "[TrackEffectExpress.End]",
          !0,
        ),
      (this.HQt = 0);
  }
  Pmt(i, t, e) {
    var s = NodeTrackEffect.uoe,
      e =
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, e),
        s.SetEndLocation(e.X, e.Y, e.Z + OFFSET_Z),
        this.Wse.FromUeVector(e),
        TraceElementCommon_1.TraceElementCommon.LineTrace(s, PROFILE_KEY)),
      s = s.HitResult,
      e =
        (e && s.bBlockingHit && (this.Wse.Z = s.LocationZ_Array.Get(0)),
        (this.Wse.Z -= 5),
        EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          new UE.Transform(
            Rotator_1.Rotator.ZeroRotator,
            this.Wse.ToUeVector(),
            Vector_1.Vector.OneVector,
          ),
          t,
          "[TrackEffectExpress.CreateTrackEffect]",
          void 0,
          3,
          void 0,
          (t, e) => {
            5 === t && this.YQt(i, e ?? 0);
          },
        ));
    return e;
  }
  YQt(t, e) {
    EffectSystem_1.EffectSystem.RegisterCustomCheckOwnerFunc(
      e,
      () => void 0 !== this.OQt,
    );
    var i = this.OQt.GetTrackDistance(this.Jut),
      i =
        ((this.QQt = i < this.jQt),
        "LongLightBeam" === t ? !this.QQt : this.QQt);
    this.XQt(e, i),
      this.KQt++,
      2 === this.KQt &&
        (this.j3 = TimerSystem_1.TimerSystem.Forever(this.$Qt, 1e3));
  }
  xmt() {
    this.XQt(this.VQt, !1), this.XQt(this.HQt, !1);
  }
  XQt(t, e) {
    EffectSystem_1.EffectSystem.GetEffectActor(t)?.SetActorHiddenInGame(!e);
  }
  OnExpressOccupied() {
    this.pCt = !0;
  }
  OnExpressOccupationRelease() {
    this.pCt = !1;
  }
}
NodeTrackEffect.uoe = void 0;
//# sourceMappingURL=TrackEffectExpressController.js.map

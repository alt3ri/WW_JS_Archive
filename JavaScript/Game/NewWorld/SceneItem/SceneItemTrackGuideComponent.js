"use strict";
var SceneItemTrackGuideComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, s, e) {
      var h,
        n = arguments.length,
        o =
          n < 3
            ? i
            : null === e
              ? (e = Object.getOwnPropertyDescriptor(i, s))
              : e;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, i, s, e);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (h = t[r]) &&
            (o = (n < 3 ? h(o) : 3 < n ? h(i, s, o) : h(i, s)) || o);
      return 3 < n && o && Object.defineProperty(i, s, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemTrackGuideComponent = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LogReportController_1 = require("../../Module/LogReport/LogReportController"),
  LogReportDefine_1 = require("../../Module/LogReport/LogReportDefine"),
  DISTANCE_SPLINE_FOUNDATION_THRESHOLD = 1e4,
  SPLINE_FOUNDATION_SPEED = 150,
  DISTANCE_SQUARE_THRESHOLD = 2500,
  MOVEMENT_SPEED = 600,
  CONFIG_DEFAULT_MOVEMENT_SPEED = 50,
  MAX_MOVEMENT_SPEED = 800,
  NORMAL_RADIUS = 50,
  COMPRESS_RADIUS = 0;
let SceneItemTrackGuideComponent =
  (SceneItemTrackGuideComponent_1 = class SceneItemTrackGuideComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.TSn = void 0),
        (this.r1n = void 0),
        (this.LSn = void 0),
        (this.DSn = void 0),
        (this.RSn = void 0),
        (this.ASn = void 0),
        (this.USn = void 0),
        (this.PSn = void 0),
        (this.xSn = void 0),
        (this.wSn = void 0),
        (this.BSn = 0),
        (this.bSn = 0),
        (this.qSn = 0),
        (this.Ngn = -0),
        (this.GSn = -0),
        (this.NSn = void 0),
        (this.OSn = void 0),
        (this.kSn = !0),
        (this.i_n = !1),
        (this.Rni = 0),
        (this.FSn = !1),
        (this.VSn = void 0),
        (this.U7o = void 0),
        (this.HSn = void 0),
        (this.jSn = 0),
        (this.Izr = void 0),
        (this.WSn = !1),
        (this.KSn = !1),
        (this.zje = !1),
        (this.QSn = -0),
        (this.efn = void 0),
        (this.Rne = void 0),
        (this.ran = !1),
        (this.XSn = !1),
        (this.vcn = 0),
        (this.$Sn = () => {
          this.WSn = !0;
        }),
        (this.fan = () => {
          ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam ||
            (this.i_n = !0);
        }),
        (this.Ozr = () => {
          this.i_n = !1;
        }),
        (this.k$e = () => {
          ModelManager_1.ModelManager.GameModeModel.IsMulti
            ? LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
                this.efn,
                !1,
              )
              ? this.Rne &&
                (this.Enable(
                  this.Rne,
                  "[SceneItemTrackGuideComponent.OnChangeModeFinish] 联机启用交互",
                ),
                (this.Rne = void 0))
              : ((this.Rne = this.Disable(
                  "[SceneItemTrackGuideComponent.OnChangeModeFinish] 联机停止交互",
                )),
                this.av())
            : this.Rne &&
              (this.Enable(
                this.Rne,
                "[SceneItemTrackGuideComponent.OnChangeModeFinish] 单机启用交互",
              ),
              (this.Rne = void 0));
        });
    }
    OnInitData(t) {
      var i = t.GetParam(SceneItemTrackGuideComponent_1)[0];
      switch (
        (i.SplineEntityId && (this.vcn = i.SplineEntityId),
        (this.i_n = !1),
        (this.Rni = 0),
        (this.FSn = !1),
        i.EndType.Type)
      ) {
        case 0:
          (this.DSn = void 0), (this.LSn = 0);
          break;
        case 1:
          (this.DSn = i.EndType.FoundationId),
            (this.LSn = 1),
            i.EndType.FinalOffset
              ? (this.RSn = Vector_1.Vector.Create(
                  i.EndType.FinalOffset.X,
                  i.EndType.FinalOffset.Y,
                  i.EndType.FinalOffset.Z,
                ))
              : (this.RSn = Vector_1.Vector.Create());
      }
      return (
        (this.BSn = 0),
        (this.bSn = 0),
        (this.jSn = 0),
        (this.kSn = !0),
        (this.USn = Vector_1.Vector.Create()),
        (this.xSn = Vector_1.Vector.Create()),
        (this.wSn = Vector_1.Vector.Create()),
        (this.VSn = Vector_1.Vector.Create()),
        (this.U7o = Vector_1.Vector.Create()),
        (this.HSn = Vector_1.Vector.Create()),
        (this.GSn = 0),
        (this.Izr = this.Entity.GetComponent(106)),
        this.Izr.SetLogicRange(i.Range),
        this.Ore(),
        !0
      );
    }
    Ore() {
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnAddCommonEffect,
        this.$Sn,
      ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.EnterLogicRange,
          this.fan,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.LeaveLogicRange,
          this.Ozr,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.ChangeModeFinish,
          this.k$e,
        );
    }
    kre() {
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnAddCommonEffect,
        this.$Sn,
      ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.EnterLogicRange,
          this.fan,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.LeaveLogicRange,
          this.Ozr,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ChangeModeFinish,
          this.k$e,
        );
    }
    OnStart() {
      if (((this.Hte = this.Entity.GetComponent(182)), !this.Hte))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              30,
              "[SceneItemTrackGuideComponent] SceneItemPatrolComponent初始化失败 Actor Component Undefined",
            ),
          !1
        );
      this.U7o.DeepCopy(this.Hte.ActorLocationProxy),
        this.HSn.DeepCopy(this.Hte.ActorLocationProxy);
      var t = this.Hte.CreatureData,
        i = t.GetBaseInfo();
      return i
        ? ((this.efn = i.OnlineInteractType ?? 2),
          1 === this.efn &&
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "SceneGameplay",
                30,
                "[PawnAdsorbComponent.OnStart] 不支持的联机类型配置",
                ["CreatureGenID:", t.GetOwnerId()],
                ["PbDataId:", t.GetPbDataId()],
              ),
            (this.efn = 0)),
          ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          !LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
            this.efn,
            !1,
          )
            ? (this.Rne = this.Disable(
                "[SceneItemTrackGuideComponent.OnStart] 联机停止交互",
              ))
            : ((this.TSn = this.Entity.GetComponent(93)),
              (this.r1n = this.Entity.GetComponent(115)),
              this.HC()),
          !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              30,
              "[PawnAdsorbComponent.OnStart] SceneItemPatrolComponent初始化失败 Config Invalid",
              ["CreatureGenID:", t.GetOwnerId()],
              ["PbDataId:", t.GetPbDataId()],
            ),
          !1);
    }
    HC() {
      var t =
        ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(
          this.vcn,
          this.Hte.CreatureData.GetPbDataId(),
        );
      if (t) {
        this.PSn = t;
        var i =
            ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(
              this.vcn,
            ),
          s =
            (this.xSn.FromUeVector(t.GetWorldLocationAtDistanceAlongSpline(0)),
            (this.qSn = t.GetNumberOfSplinePoints()),
            i.SplineData);
        (this.NSn = new Array(this.qSn)), (this.OSn = new Array(this.qSn));
        for (let t = 0; t < this.qSn; ++t)
          this.NSn[t] = !s.Points[t].IgnorePoint;
        for (let t = 0; t < this.qSn; ++t)
          (this.OSn[t] = MathUtils_1.MathUtils.Clamp(
            s.Points[t].MoveSpeed,
            CONFIG_DEFAULT_MOVEMENT_SPEED,
            MAX_MOVEMENT_SPEED,
          )),
            (this.QSn = this.OSn[t]);
        (this.Ngn = t.GetSplineLength()),
          this.wSn.FromUeVector(
            t.GetWorldLocationAtDistanceAlongSpline(this.qSn - 1),
          ),
          this.USn &&
            (this.wSn.Subtraction(this.USn, this.VSn),
            this.VSn.SizeSquared() < DISTANCE_SPLINE_FOUNDATION_THRESHOLD) &&
            ((this.NSn[this.qSn - 1] = !1),
            (this.OSn[this.qSn - 1] = SPLINE_FOUNDATION_SPEED),
            (this.QSn = SPLINE_FOUNDATION_SPEED)),
          2 <= this.qSn &&
            ((this.GSn =
              this.Ngn - t.GetDistanceAlongSplineAtSplinePoint(this.qSn - 2)),
            this.GSn <= 1 ? (this.GSn = 0) : (this.GSn = 1 / this.GSn));
      }
    }
    OnTick(t) {
      !this.FSn && this.WSn && (1 !== this.Rni ? this.YSn(t) : this.JSn(t));
    }
    JSn(t) {
      if (this.PSn?.IsValid())
        if (this.kSn && this.zSn())
          this.zje &&
            ((this.zje = !1), this.TSn.ApplyNiagaraParameters("IsMoving", 0));
        else {
          this.zje ||
            ((this.zje = !0),
            this.TSn.ApplyNiagaraParameters("IsMoving", 1),
            this.ran) ||
            ((this.ran = !0), this.ZSn()),
            this.Entity.ChangeTickInterval(0);
          var i = this.PSn,
            s = 0 === this.bSn ? 0 : this.bSn - 1,
            s = ((this.BSn += this.OSn[s] * t * 0.001), this.bSn + 1);
          if (
            (this.BSn >= this.jSn &&
              ((this.bSn = s),
              (this.jSn = i.GetDistanceAlongSplineAtSplinePoint(this.bSn)),
              (this.kSn = !0)),
            this.BSn >= this.Ngn)
          ) {
            switch (
              ((this.BSn = this.Ngn),
              (this.bSn = this.qSn - 1),
              (this.jSn = i.GetDistanceAlongSplineAtSplinePoint(this.bSn)),
              this.LSn)
            ) {
              case 0:
                this.Rni = 0;
                break;
              case 1:
                this.Rni = 2;
            }
            this.kSn = !0;
          }
          this.HSn.DeepCopy(this.Hte.ActorLocationProxy),
            this.U7o.FromUeVector(
              i.GetWorldLocationAtDistanceAlongSpline(this.BSn),
            ),
            this.Hte.SetActorLocation(this.U7o.ToUeVector()),
            1 === this.LSn &&
              this.TSn &&
              this.bSn === this.qSn - 1 &&
              ((t = (this.Ngn - this.BSn) * this.GSn),
              (s = MathUtils_1.MathUtils.Lerp(
                COMPRESS_RADIUS,
                NORMAL_RADIUS,
                t,
              )),
              this.TSn.ApplyNiagaraParameters("Radius", s),
              this.TSn.ApplyNiagaraParameters("IsMoving", 1));
        }
    }
    YSn(t) {
      if (this.kSn && this.zSn())
        this.zje &&
          ((this.zje = !1), this.TSn.ApplyNiagaraParameters("IsMoving", 0));
      else
        switch (
          (this.zje ||
            ((this.zje = !0),
            this.TSn.ApplyNiagaraParameters("IsMoving", 1),
            this.ran) ||
            ((this.ran = !0), this.ZSn()),
          this.Entity.ChangeTickInterval(0),
          this.Rni)
        ) {
          case 0:
            this.eEn(t), this.tEn(this.xSn) && this.iEn();
            break;
          case 2:
            this.oEn(t), this.tEn(this.USn) && this.rEn();
        }
    }
    eEn(t) {
      this.PSn?.IsValid() &&
        (this.U7o.DeepCopy(this.Hte.ActorLocationProxy),
        this.HSn.DeepCopy(this.Hte.ActorLocationProxy),
        this.xSn.Subtraction(this.U7o, this.VSn),
        this.VSn.Normalize(),
        this.VSn.MultiplyEqual(MOVEMENT_SPEED * t * 0.001),
        this.U7o.AdditionEqual(this.VSn),
        this.Hte.SetActorLocation(this.U7o.ToUeVector()),
        (this.KSn = !0));
    }
    oEn(t) {
      if (this.DSn) {
        if (!this.ASn) {
          var i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            this.DSn,
          );
          if (!i) return;
          var s = i.Entity.GetComponent(1);
          if (!s || !s.Owner) return;
          (this.ASn = i),
            this.USn.DeepCopy(s.ActorLocationProxy),
            this.USn.AdditionEqual(this.RSn);
        }
        this.U7o.DeepCopy(this.Hte.ActorLocationProxy),
          this.HSn.DeepCopy(this.Hte.ActorLocationProxy),
          this.USn.Subtraction(this.U7o, this.VSn),
          this.VSn.Normalize(),
          this.VSn.MultiplyEqual(this.QSn * t * 0.001),
          this.U7o.AdditionEqual(this.VSn),
          this.Hte.SetActorLocation(this.U7o.ToUeVector());
      }
    }
    rEn() {
      this.TSn.ApplyNiagaraParameters("IsMoving", 0),
        this.TSn.ApplyNiagaraParameters("IsDying", 1),
        this.Hte.SetActorLocation(this.USn.ToUeVector()),
        (this.FSn = !0),
        LevelGamePlayController_1.LevelGamePlayController.EntityFollowTrackRequest(
          this.Hte.CreatureData.GetCreatureDataId(),
          (t) => {},
        );
    }
    iEn() {
      this.Hte.SetActorLocation(this.xSn.ToUeVector()),
        (this.Rni = 1),
        (this.BSn = 0),
        (this.bSn = 0),
        (this.jSn = 0),
        (this.kSn = !0),
        (this.zje = !1),
        (this.KSn = !0),
        this.TSn.ApplyNiagaraParameters("IsMoving", 0);
    }
    zSn() {
      var t;
      return !this.PSn?.IsValid() || this.r1n?.IsLocked
        ? (this.kSn = !0)
        : this.i_n
          ? (this.kSn = !1)
          : this.KSn
            ? ((t = 0 === this.bSn ? 0 : this.bSn - 1),
              (this.kSn = this.NSn[t]),
              this.kSn)
            : (this.kSn = !0);
    }
    tEn(t) {
      var i;
      return (
        !!this.Hte &&
        ((i = this.Hte.ActorLocationProxy),
        Vector_1.Vector.DistSquared(i, t) <= DISTANCE_SQUARE_THRESHOLD)
      );
    }
    av() {
      this.FSn || this.iEn();
    }
    OnEnd() {
      return (
        this.kre(),
        this.PSn &&
          ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(
            this.vcn,
            this.Hte.CreatureData.GetPbDataId(),
          ),
        !0
      );
    }
    ZSn() {
      var t;
      this.XSn ||
        (((t = new ButterflyTriggerData()).event_id = "10"),
        (t.i_config_id = this.Hte.CreatureData.GetPbDataId().toString()),
        (t.f_player_pos_x = this.Hte.ActorLocationProxy.X.toString()),
        (t.f_player_pos_y = this.Hte.ActorLocationProxy.Y.toString()),
        (t.f_player_pos_z = this.Hte.ActorLocationProxy.Z.toString()),
        (t.i_area_id =
          ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId.toString()),
        (t.s_tag =
          this.Hte.CreatureData.GetPlayerId().toString() +
          "|" +
          this.Hte.CreatureData.GetCreatureDataId().toString()),
        LogReportController_1.LogReportController.LogReport(t),
        (this.XSn = !0));
    }
  });
(SceneItemTrackGuideComponent = SceneItemTrackGuideComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(151)],
    SceneItemTrackGuideComponent,
  )),
  (exports.SceneItemTrackGuideComponent = SceneItemTrackGuideComponent);
class ButterflyTriggerData extends LogReportDefine_1.PlayerCommonLogData {
  constructor() {
    super(),
      (this.i_config_id = ""),
      (this.f_player_pos_x = ""),
      (this.f_player_pos_y = ""),
      (this.f_player_pos_z = ""),
      (this.i_area_id = ""),
      (this.s_tag = "");
  }
}
//# sourceMappingURL=SceneItemTrackGuideComponent.js.map

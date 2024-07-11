"use strict";
var SceneItemTrackGuideComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, e, s) {
      var h,
        n = arguments.length,
        o =
          n < 3
            ? i
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(i, e))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, i, e, s);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (h = t[r]) &&
            (o = (n < 3 ? h(o) : 3 < n ? h(i, e, o) : h(i, e)) || o);
      return 3 < n && o && Object.defineProperty(i, e, o), o;
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
        (this.oEn = void 0),
        (this.Oln = void 0),
        (this.rEn = void 0),
        (this.Nln = void 0),
        (this.nEn = void 0),
        (this.sEn = void 0),
        (this.aEn = void 0),
        (this.hEn = void 0),
        (this.lEn = void 0),
        (this._En = void 0),
        (this.uEn = void 0),
        (this.cEn = 0),
        (this.mEn = 0),
        (this.dEn = 0),
        (this.fgn = -0),
        (this.CEn = -0),
        (this.gEn = void 0),
        (this.fEn = void 0),
        (this.pEn = !0),
        (this.b1n = !1),
        (this.Usi = 0),
        (this.vEn = !1),
        (this.MEn = void 0),
        (this.LHo = void 0),
        (this.EEn = void 0),
        (this.SEn = 0),
        (this.rzr = void 0),
        (this.yEn = !1),
        (this.IEn = !1),
        (this._Ke = !1),
        (this.TEn = -0),
        (this.w0n = void 0),
        (this.Rne = void 0),
        (this.Nsn = !1),
        (this.LEn = !1),
        (this.zun = 0),
        (this.DEn = () => {
          this.yEn = !0;
        }),
        (this.Jsn = () => {
          ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam ||
            (this.b1n = !0);
        }),
        (this.vzr = () => {
          this.b1n = !1;
        }),
        (this.zYe = () => {
          ModelManager_1.ModelManager.GameModeModel.IsMulti
            ? LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
                this.w0n,
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
        (i.SplineEntityId && (this.zun = i.SplineEntityId),
        (this.b1n = !1),
        (this.Usi = 0),
        (this.vEn = !1),
        i.EndType.Type)
      ) {
        case 0:
          (this.nEn = void 0), (this.rEn = 0);
          break;
        case 1:
          (this.nEn = i.EndType.FoundationId),
            (this.rEn = 1),
            i.EndType.FinalOffset
              ? (this.sEn = Vector_1.Vector.Create(
                  i.EndType.FinalOffset.X,
                  i.EndType.FinalOffset.Y,
                  i.EndType.FinalOffset.Z,
                ))
              : (this.sEn = Vector_1.Vector.Create());
      }
      return (
        (this.cEn = 0),
        (this.mEn = 0),
        (this.SEn = 0),
        (this.pEn = !0),
        (this.hEn = Vector_1.Vector.Create()),
        (this._En = Vector_1.Vector.Create()),
        (this.uEn = Vector_1.Vector.Create()),
        (this.MEn = Vector_1.Vector.Create()),
        (this.LHo = Vector_1.Vector.Create()),
        (this.EEn = Vector_1.Vector.Create()),
        (this.CEn = 0),
        (this.rzr = this.Entity.GetComponent(108)),
        this.rzr.SetLogicRange(i.Range),
        this.Ore(),
        !0
      );
    }
    Ore() {
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnAddCommonEffect,
        this.DEn,
      ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.EnterLogicRange,
          this.Jsn,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.LeaveLogicRange,
          this.vzr,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.ChangeModeFinish,
          this.zYe,
        );
    }
    kre() {
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnAddCommonEffect,
        this.DEn,
      ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.EnterLogicRange,
          this.Jsn,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.LeaveLogicRange,
          this.vzr,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ChangeModeFinish,
          this.zYe,
        );
    }
    OnStart() {
      if (((this.Hte = this.Entity.GetComponent(185)), !this.Hte))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              30,
              "[SceneItemTrackGuideComponent] SceneItemPatrolComponent初始化失败 Actor Component Undefined",
            ),
          !1
        );
      this.LHo.DeepCopy(this.Hte.ActorLocationProxy),
        this.EEn.DeepCopy(this.Hte.ActorLocationProxy);
      var t = this.Hte.CreatureData,
        i = t.GetBaseInfo();
      return i
        ? ((this.w0n = i.OnlineInteractType ?? 2),
          1 === this.w0n &&
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "SceneGameplay",
                30,
                "[PawnAdsorbComponent.OnStart] 不支持的联机类型配置",
                ["CreatureGenID:", t.GetOwnerId()],
                ["PbDataId:", t.GetPbDataId()],
              ),
            (this.w0n = 0)),
          (this.oEn = this.Entity.GetComponent(95)),
          (this.Oln = this.Entity.GetComponent(117)),
          (this.Nln = this.Entity.GetComponent(144)),
          ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          !LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
            this.w0n,
            !1,
          )
            ? (this.Rne = this.Disable(
                "[SceneItemTrackGuideComponent.OnStart] 联机停止交互",
              ))
            : this.HC(),
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
    OnActivate() {
      return (
        ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          !LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
            this.w0n,
            !1,
          ) &&
          this.Nln?.SetEnableMovementSync(
            !0,
            "SceneItemTrackGuideComponent OnActivate",
          ),
        !0
      );
    }
    HC() {
      var t =
        ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(
          this.zun,
          this.Hte.CreatureData.GetPbDataId(),
        );
      if (t) {
        this.lEn = t;
        var i =
            ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(
              this.zun,
            ),
          e =
            (this._En.FromUeVector(t.GetWorldLocationAtDistanceAlongSpline(0)),
            (this.dEn = t.GetNumberOfSplinePoints()),
            i.SplineData);
        (this.gEn = new Array(this.dEn)), (this.fEn = new Array(this.dEn));
        for (let t = 0; t < this.dEn; ++t)
          this.gEn[t] = !e.Points[t].IgnorePoint;
        for (let t = 0; t < this.dEn; ++t)
          (this.fEn[t] = MathUtils_1.MathUtils.Clamp(
            e.Points[t].MoveSpeed,
            CONFIG_DEFAULT_MOVEMENT_SPEED,
            MAX_MOVEMENT_SPEED,
          )),
            (this.TEn = this.fEn[t]);
        (this.fgn = t.GetSplineLength()),
          this.uEn.FromUeVector(
            t.GetWorldLocationAtDistanceAlongSpline(this.dEn - 1),
          ),
          this.hEn &&
            (this.uEn.Subtraction(this.hEn, this.MEn),
            this.MEn.SizeSquared() < DISTANCE_SPLINE_FOUNDATION_THRESHOLD) &&
            ((this.gEn[this.dEn - 1] = !1),
            (this.fEn[this.dEn - 1] = SPLINE_FOUNDATION_SPEED),
            (this.TEn = SPLINE_FOUNDATION_SPEED)),
          2 <= this.dEn &&
            ((this.CEn =
              this.fgn - t.GetDistanceAlongSplineAtSplinePoint(this.dEn - 2)),
            this.CEn <= 1 ? (this.CEn = 0) : (this.CEn = 1 / this.CEn));
      }
    }
    OnTick(t) {
      !this.vEn && this.yEn && (1 !== this.Usi ? this.REn(t) : this.UEn(t));
    }
    UEn(t) {
      if (this.lEn?.IsValid())
        if (this.pEn && this.AEn())
          this._Ke &&
            ((this._Ke = !1),
            this.Nln?.SetEnableMovementSync(
              !1,
              "SceneItemTrackGuideComponent UpdateSplineMovement MoveStart",
            ),
            this.oEn.ApplyNiagaraParameters("IsMoving", 0));
        else {
          this._Ke ||
            ((this._Ke = !0),
            this.Nln?.SetEnableMovementSync(
              !0,
              "SceneItemTrackGuideComponent UpdateSplineMovement MoveStop",
            ),
            this.oEn.ApplyNiagaraParameters("IsMoving", 1),
            this.Nsn) ||
            ((this.Nsn = !0), this.PEn()),
            this.Entity.ChangeTickInterval(0);
          var i = this.lEn,
            e = 0 === this.mEn ? 0 : this.mEn - 1,
            e = ((this.cEn += this.fEn[e] * t * 0.001), this.mEn + 1);
          if (
            (this.cEn >= this.SEn &&
              ((this.mEn = e),
              (this.SEn = i.GetDistanceAlongSplineAtSplinePoint(this.mEn)),
              (this.pEn = !0)),
            this.cEn >= this.fgn)
          ) {
            switch (
              ((this.cEn = this.fgn),
              (this.mEn = this.dEn - 1),
              (this.SEn = i.GetDistanceAlongSplineAtSplinePoint(this.mEn)),
              this.rEn)
            ) {
              case 0:
                this.Usi = 0;
                break;
              case 1:
                this.Usi = 2;
            }
            this.pEn = !0;
          }
          this.EEn.DeepCopy(this.Hte.ActorLocationProxy),
            this.LHo.FromUeVector(
              i.GetWorldLocationAtDistanceAlongSpline(this.cEn),
            ),
            this.Hte.SetActorLocation(this.LHo.ToUeVector()),
            1 === this.rEn &&
              this.oEn &&
              this.mEn === this.dEn - 1 &&
              ((t = (this.fgn - this.cEn) * this.CEn),
              (e = MathUtils_1.MathUtils.Lerp(
                COMPRESS_RADIUS,
                NORMAL_RADIUS,
                t,
              )),
              this.oEn.ApplyNiagaraParameters("Radius", e),
              this.oEn.ApplyNiagaraParameters("IsMoving", 1));
        }
    }
    REn(t) {
      if (this.pEn && this.AEn())
        this._Ke &&
          ((this._Ke = !1),
          this.Nln?.SetEnableMovementSync(
            !1,
            "SceneItemTrackGuideComponent UpdateNoSplineMovement MoveStop",
          ),
          this.oEn.ApplyNiagaraParameters("IsMoving", 0));
      else
        switch (
          (this._Ke ||
            ((this._Ke = !0),
            this.Nln?.SetEnableMovementSync(
              !0,
              "UpdateNoSplineMovement UpdateNoSplineMovement MoveStart",
            ),
            this.oEn.ApplyNiagaraParameters("IsMoving", 1),
            this.Nsn) ||
            ((this.Nsn = !0), this.PEn()),
          this.Entity.ChangeTickInterval(0),
          this.Usi)
        ) {
          case 0:
            this.xEn(t), this.wEn(this._En) && this.BEn();
            break;
          case 2:
            this.bEn(t), this.wEn(this.hEn) && this.qEn();
        }
    }
    xEn(t) {
      this.lEn?.IsValid() &&
        (this.LHo.DeepCopy(this.Hte.ActorLocationProxy),
        this.EEn.DeepCopy(this.Hte.ActorLocationProxy),
        this._En.Subtraction(this.LHo, this.MEn),
        this.MEn.Normalize(),
        this.MEn.MultiplyEqual(MOVEMENT_SPEED * t * 0.001),
        this.LHo.AdditionEqual(this.MEn),
        this.Hte.SetActorLocation(this.LHo.ToUeVector()),
        (this.IEn = !0));
    }
    bEn(t) {
      if (this.nEn) {
        if (!this.aEn) {
          var i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            this.nEn,
          );
          if (!i) return;
          var e = i.Entity.GetComponent(1);
          if (!e || !e.Owner) return;
          (this.aEn = i),
            this.hEn.DeepCopy(e.ActorLocationProxy),
            this.hEn.AdditionEqual(this.sEn);
        }
        this.LHo.DeepCopy(this.Hte.ActorLocationProxy),
          this.EEn.DeepCopy(this.Hte.ActorLocationProxy),
          this.hEn.Subtraction(this.LHo, this.MEn),
          this.MEn.Normalize(),
          this.MEn.MultiplyEqual(this.TEn * t * 0.001),
          this.LHo.AdditionEqual(this.MEn),
          this.Hte.SetActorLocation(this.LHo.ToUeVector());
      }
    }
    qEn() {
      this.oEn.ApplyNiagaraParameters("IsMoving", 0),
        this.oEn.ApplyNiagaraParameters("IsDying", 1),
        this.Hte.SetActorLocation(this.hEn.ToUeVector()),
        (this.vEn = !0),
        LevelGamePlayController_1.LevelGamePlayController.EntityFollowTrackRequest(
          this.Hte.CreatureData.GetCreatureDataId(),
          (t) => {},
        );
    }
    BEn() {
      this.Hte.SetActorLocation(this._En.ToUeVector()),
        (this.Usi = 1),
        (this.cEn = 0),
        (this.mEn = 0),
        (this.SEn = 0),
        (this.pEn = !0),
        (this._Ke = !1),
        this.Nln?.SetEnableMovementSync(
          !1,
          "UpdateNoSplineMovement OnTrackGuideReset",
        ),
        (this.IEn = !0),
        this.oEn.ApplyNiagaraParameters("IsMoving", 0);
    }
    AEn() {
      var t;
      return !this.lEn?.IsValid() || this.Oln?.IsLocked
        ? (this.pEn = !0)
        : this.b1n
          ? (this.pEn = !1)
          : this.IEn
            ? ((t = 0 === this.mEn ? 0 : this.mEn - 1),
              (this.pEn = this.gEn[t]),
              this.pEn)
            : (this.pEn = !0);
    }
    wEn(t) {
      var i;
      return (
        !!this.Hte &&
        ((i = this.Hte.ActorLocationProxy),
        Vector_1.Vector.DistSquared(i, t) <= DISTANCE_SQUARE_THRESHOLD)
      );
    }
    av() {
      this.vEn || this.BEn();
    }
    OnEnd() {
      return (
        this.kre(),
        this.lEn &&
          ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(
            this.zun,
            this.Hte.CreatureData.GetPbDataId(),
          ),
        !0
      );
    }
    PEn() {
      var t;
      this.LEn ||
        (((t = new ButterflyTriggerData()).event_id = "10"),
        (t.i_inst_id =
          ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
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
        (this.LEn = !0));
    }
  });
(SceneItemTrackGuideComponent = SceneItemTrackGuideComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(153)],
    SceneItemTrackGuideComponent,
  )),
  (exports.SceneItemTrackGuideComponent = SceneItemTrackGuideComponent);
class ButterflyTriggerData extends LogReportDefine_1.PlayerCommonLogData {
  constructor() {
    super(),
      (this.i_inst_id = 0),
      (this.i_config_id = ""),
      (this.f_player_pos_x = ""),
      (this.f_player_pos_y = ""),
      (this.f_player_pos_z = ""),
      (this.i_area_id = ""),
      (this.s_tag = "");
  }
}
//# sourceMappingURL=SceneItemTrackGuideComponent.js.map

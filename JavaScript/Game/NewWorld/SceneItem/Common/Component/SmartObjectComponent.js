"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var n,
      h = arguments.length,
      r =
        h < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, i, s);
    else
      for (var o = t.length - 1; 0 <= o; o--)
        (n = t[o]) && (r = (h < 3 ? n(r) : 3 < h ? n(e, i, r) : n(e, i)) || r);
    return 3 < h && r && Object.defineProperty(e, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SmartObjectComponent = void 0);
const AudioController_1 = require("../../../../../Core/Audio/AudioController"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  Global_1 = require("../../../../Global"),
  SplineMoveTaskUtils_1 = require("../../../../LevelGamePlay/SplineMoveTask/SplineMoveTaskUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  TimeOfDayDefine_1 = require("../../../../Module/TimeOfDay/TimeOfDayDefine"),
  TimeOfDayModel_1 = require("../../../../Module/TimeOfDay/TimeOfDayModel"),
  CharacterUnifiedStateTypes_1 = require("../../../Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
let SmartObjectComponent = class SmartObjectComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.EIe = void 0),
      (this.Hte = void 0),
      (this.vtn = void 0),
      (this.Gce = void 0),
      (this.k_n = void 0),
      (this.F_n = []),
      (this.V_n = !1),
      (this.sEl = !1),
      (this.aEl = void 0),
      (this.lEl = !1),
      (this.hEl = !1),
      (this._El = void 0),
      (this.uEl = void 0),
      (this.cEl = void 0),
      (this.mEl = -1),
      (this.cka = -1),
      (this.dEl = -1),
      (this.H_n = (t, e) => {
        var i,
          e = e.Entity;
        0 <=
          this.k_n.ExcludeEntities?.indexOf(e.GetComponent(0).GetPbDataId()) ||
          (this.j_n(e) &&
            ((i = this.F_n.indexOf(e)),
            t ? i < 0 && this.F_n.push(e) : 0 <= i && this.F_n.splice(i, 1)));
      }),
      (this.W_n = () => {
        var t, e;
        this.V_n &&
          void 0 !== (t = this.k_n.AlertSound) &&
          ((e = Global_1.Global.BaseCharacter),
          AudioController_1.AudioController.PostEvent(t, e));
      }),
      (this.K_n = (t, e) => {
        e === CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop ||
        e === CharacterUnifiedStateTypes_1.ECharMoveState.RunStop ||
        e === CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop
          ? (this.V_n = !1)
          : (e !== CharacterUnifiedStateTypes_1.ECharMoveState.Walk &&
              e !== CharacterUnifiedStateTypes_1.ECharMoveState.Run &&
              e !== CharacterUnifiedStateTypes_1.ECharMoveState.Sprint) ||
            (this.V_n = !0);
      }),
      (this.$Dl = (t) => {
        t
          ? "ByGameTime" === this._El && this.CEl()
          : "ByGameTime" === this._El && this.Gce?.StopMove();
      }),
      (this.Rnn = () => {
        (this.Gce.ForceSyncing = !0),
          this.Hte?.IsMoveAutonomousProxy &&
            this.hEl &&
            "ByGameTime" === this._El &&
            this.CEl();
      }),
      (this.gEl = () => {
        "ByGameTime" === this._El && (this.Gce.StopMove(), this.CEl(!0));
      });
  }
  OnStart() {
    var t;
    return (
      (this.EIe = this.Entity.GetComponent(0)),
      (this.Hte = this.Entity.GetComponent(1)),
      (this.vtn = this.Entity.GetComponent(84)),
      (this.Gce = this.Entity.GetComponent(126)),
      this.Hte &&
        (t = this.Hte.CreatureData?.GetPbEntityInitData()?.ComponentsData) &&
        ((this.k_n = (0, IComponent_1.getComponent)(
          t,
          "AiAlertNotifyComponent",
        )),
        this.k_n && this.Q_n(),
        (this.aEl = (0, IComponent_1.getComponent)(t, "SceneItemAiComponent")),
        this.aEl) &&
        this.pEl(),
      !0
    );
  }
  OnEnd() {
    return (
      this.sEl &&
        (this.vtn.RemoveOnEntityOverlapCallback(this.H_n), this.$_n()),
      this.lEl && this.fEl(),
      !0
    );
  }
  Q_n() {
    for (var [, t] of this.vtn.GetEntitiesInRangeLocal()) {
      if (
        this.k_n.ExcludeEntities?.length &&
        0 < this.k_n.ExcludeEntities?.length
      )
        if (
          0 <=
          this.k_n.ExcludeEntities?.indexOf(
            t.Entity.GetComponent(0).GetPbDataId(),
          )
        )
          continue;
      this.j_n(t.Entity) && this.F_n.push(t.Entity);
    }
    this.vtn.AddOnEntityOverlapCallback(this.H_n), this.X_n(), (this.sEl = !0);
  }
  j_n(t) {
    var t = t.GetComponent(46);
    return !!t && !!(t = t.AiController?.AiAlert) && !!t.AiAlertConfig;
  }
  pEl() {
    this.EIe &&
      this.EIe.Valid &&
      ("SceneItemPatrol" === this.aEl.AiConfig.Type && this.vEl(),
      (this.lEl = !0));
  }
  vEl() {
    (this.hEl = this.EIe.PbSceneAiEnabled),
      (this.mEl = this.EIe.PbPatrolInfoPb?.AI_ ?? -1),
      (this.dEl = ConfigManager_1.ConfigManager.TimeOfDayConfig.GetRate()),
      (this._El = this.aEl.AiConfig.PatrolType.Type);
    var t = this.aEl.AiConfig.PatrolType.Spline;
    (this.cEl =
      ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(
        t,
        this.EIe.GetPbDataId(),
      )),
      (this.uEl =
        ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(
          t,
        )),
      this.MEl();
  }
  OnTick(t) {
    this.Y_n(t);
  }
  Y_n(e) {
    if (void 0 !== this.k_n && !(this.F_n.length <= 0)) {
      let t = 0;
      if (this.V_n) {
        var i = this.k_n.ExtraAiAlert.MoveAlert;
        if (!i) return;
        t = i * e * TimeUtil_1.TimeUtil.Millisecond;
      } else {
        i = this.k_n.ExtraAiAlert.StopAlert;
        if (!i) return;
        t = i * e * TimeUtil_1.TimeUtil.Millisecond;
      }
      for (const s of this.F_n)
        EventSystem_1.EventSystem.EmitWithTarget(
          s,
          EventDefine_1.EEventName.SmartObjectAiAlterNotify,
          t,
        );
    }
  }
  X_n() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnCharFootOnTheGround,
      this.W_n,
    ),
      EventSystem_1.EventSystem.AddWithTarget(
        Global_1.Global.BaseCharacter.CharacterActorComponent.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.K_n,
      );
  }
  $_n() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCharFootOnTheGround,
      this.W_n,
    ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        Global_1.Global.BaseCharacter.CharacterActorComponent.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.K_n,
      );
  }
  MEl() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.Entity,
      EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
      this.Rnn,
    ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneItemSwitchMoveControl,
        this.$Dl,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AdjustTime,
        this.gEl,
      );
  }
  fEl() {
    this.lEl &&
      "SceneItemPatrol" === this.aEl.AiConfig.Type &&
      (EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
        this.Rnn,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneItemSwitchMoveControl,
        this.$Dl,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AdjustTime,
        this.gEl,
      ));
  }
  CEl(e = !1) {
    if (
      !e &&
      (this.mEl < 0 || this.mEl >= this.uEl.SplineData.Points.length - 1)
    )
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Entity", 31, "服务器下发的LastPassIndex不合法", [
          "PbDataId",
          this.EIe?.GetPbDataId(),
        ]);
    else {
      var i = this.uEl.SplineData,
        s = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second;
      if (e)
        for (let t = 0; t < i.Points.length; t++) {
          var n = i.Points[t];
          if (
            s <
            TimeOfDayModel_1.TodDayTime.ConvertFromHourMinute(
              n.Hours,
              n.Minutes,
            )
          )
            break;
          this.mEl = t;
        }
      var e = TimeOfDayModel_1.TodDayTime.ConvertFromHourMinute(
          i.Points[this.mEl].Hours,
          i.Points[this.mEl].Minutes,
        ),
        h = TimeOfDayModel_1.TodDayTime.ConvertFromHourMinute(
          i.Points[this.mEl + 1].Hours,
          i.Points[this.mEl + 1].Minutes,
        ),
        r = (s - e) / (h - e),
        o =
          ((r < 0 || 1 < r) &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              31,
              "服务器下发的LastPassIndex与当前游戏时间不符",
              ["PbDataId", this.EIe?.GetPbDataId()],
            ),
          this.cEl.GetDistanceAlongSplineAtSplineInputKey(this.mEl));
      const m = this.cEl.GetDistanceAlongSplineAtSplineInputKey(this.mEl + 1);
      var a = m - o,
        a = ((this.cka = a * r + o), (m - o) / (h - e)),
        _ = (a * this.dEl) / TimeOfDayDefine_1.TOD_RATE_RATIO,
        r = this.cEl.D_GetLocationAtDistanceAlongSpline(this.cka, 1);
      this.Hte.SetActorLocation(r);
      const v = [],
        l = [];
      let t = 0;
      for (; t++ < i.Points.length; ) v.push(_), l.push(0);
      TimerSystem_1.TimerSystem.Next(() => {
        var t =
          SplineMoveTaskUtils_1.SplineMoveTaskUtils.ParseOldSceneItemPatrolParamToSplineMoveWithConstantTimeParam(
            this.cEl,
            v,
            l,
            !1,
            !1,
            !0,
            l[0] ?? 0,
          );
        (t.StartDis = this.cka),
          (t.EndDis = m),
          this.Gce.StartSplineMoveAtConstantTimeImplement(t, () => {
            this.Gce.StopMove(), this.CEl(!0);
          });
      });
    }
  }
  ModifyAiEnableState(t, e = void 0) {
    (this.hEl = t)
      ? (e && (this.mEl = e.AI_), this.CEl(!0))
      : this.Gce?.IsMoving && this.Gce?.StopMove();
  }
  UpdateLastPassIndex(t) {
    this.mEl = t;
  }
};
(SmartObjectComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(134)],
  SmartObjectComponent,
)),
  (exports.SmartObjectComponent = SmartObjectComponent);
//# sourceMappingURL=SmartObjectComponent.js.map

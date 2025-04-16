"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, r) {
    var s,
      n = arguments.length,
      o =
        n < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      o = Reflect.decorate(e, t, i, r);
    else
      for (var h = e.length - 1; 0 <= h; h--)
        (s = e[h]) && (o = (n < 3 ? s(o) : 3 < n ? s(t, i, o) : s(t, i)) || o);
    return 3 < n && o && Object.defineProperty(t, i, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ClientTriggerComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  IUtil_1 = require("../../../../../UniverseEditor/Interface/IUtil"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LevelGamePlayController_1 = require("../../../../LevelGamePlay/LevelGamePlayController"),
  LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine"),
  LevelGeneralController_1 = require("../../../../LevelGamePlay/LevelGeneralController"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SceneTeamController_1 = require("../../../../Module/SceneTeam/SceneTeamController"),
  UPDATE_INTERVAL = 2e3;
let ClientTriggerComponent = class ClientTriggerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.EIe = void 0),
      (this.vtn = void 0),
      (this.Lo = void 0),
      (this.HYo = 0),
      (this.PAa = !1),
      (this.wAa = !1),
      (this.BAa = 0),
      (this.bAa = 0),
      (this.qAa = void 0),
      (this.GAa = void 0),
      (this.OAa = void 0),
      (this.dwl = !1),
      (this.Cwl = void 0),
      (this.e_1 = 0),
      (this.t_1 = 0),
      (this.i_1 = void 0),
      (this.r_1 = void 0),
      (this.ClientPrePerformancePreMessageId = BigInt(0)),
      (this.wS = void 0),
      (this._un = void 0),
      (this.zcn = (t, i) => {
        if (i?.Valid) {
          let e = !1;
          var r;
          this.PAa &&
            i.Entity.GetComponent(3)?.IsRoleAndCtrlByMe &&
            (e =
              !(this.qAa && 0 < this.qAa?.length) ||
              SceneTeamController_1.SceneTeamController.IsMatchRoleOption(
                this.qAa,
              )),
            (e =
              this.wAa &&
              (r = i.Entity.GetComponent(0)) &&
              (r = r.GetBaseInfo())
                ? this.kAa(r.Category)
                : e) &&
              (t
                ? (this.BAa &&
                    ((this.bAa = e ? this.bAa++ : this.bAa),
                    (e = this.bAa === this.BAa)),
                  e && this.o_1(i))
                : (this.BAa &&
                    ((this.bAa = e ? this.bAa-- : this.bAa),
                    (e = this.bAa === this.BAa - 1)),
                  e && this.n_1(i)));
        }
      }),
      (this.Znn = (e) => {
        let t = !1;
        var i;
        this.qAa &&
          0 < this.qAa?.length &&
          (t = SceneTeamController_1.SceneTeamController.IsMatchRoleOption(
            this.qAa,
          )),
          (t = this.dwl
            ? !this.Cwl?.MatchRoleOption ||
              SceneTeamController_1.SceneTeamController.IsMatchRoleOption(
                this.Cwl.MatchRoleOption,
              )
            : t) &&
            (i =
              ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity) &&
            (e ? this.o_1(i) : this.n_1(i));
      }),
      (this.VAa = () => {
        if (0 === this.wS.size) this.HAa();
        else if (this._un?.IsLocked) this.HAa();
        else for (var [, e] of this.wS) this.NAa(e);
      });
  }
  get Actions() {
    return (this.dwl ? this.Cwl : this.Lo?.OnTriggerEnter)?.Actions;
  }
  get ExitActions() {
    return (this.dwl ? this.Cwl?.ExitConfig : this.Lo?.OnTriggerExit)?.Actions;
  }
  OnInitData(e) {
    this.EIe = this.Entity.GetComponent(0);
    var t,
      i,
      r = this.EIe.GetPbEntityInitData()?.ComponentsData;
    return !(
      !r ||
      ((t = (0, IComponent_1.getComponent)(r, "ClientTriggerComponent")),
      (r = (0, IComponent_1.getComponent)(r, "TriggerComponent")),
      t || r
        ? t && r?.ClientPrePerformance
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                39,
                "[ClientTriggerComponent] 配置出错！客户端触发器配置和触发器预表现配置同时存在",
                ["ConfigId", this.HYo],
              ),
            1)
          : ((i = this.Entity.GetComponent(119)) &&
              !i.LogicRange &&
              i.SetLogicRange(300),
            (this.Lo = t),
            (this.HYo = this.EIe.GetPbDataId()),
            (this.wS = new Map()),
            (this.BAa = this.Lo?.TriggerMatch?.EntityMatchCount || 0),
            (this.i_1 = this.Lo?.OnTriggerEnter.MaxTriggerTimes),
            (this.r_1 = this.Lo?.OnTriggerExit.MaxTriggerTimes),
            r?.ClientPrePerformance &&
              ((this.Cwl = r),
              (this.dwl = !0),
              (this.i_1 = r?.MaxTriggerTimes),
              (i = this.EIe.ComponentDataMap.get("hys"))
                ? (this.ClientPrePerformancePreMessageId =
                    MathUtils_1.MathUtils.LongToBigInt(i.hys._Vn))
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "SceneItem",
                    72,
                    "[ClientTriggerComponent] 触发器客户端预表现的情况下，没有拿到TriggerComponentPb的ContextId",
                  )),
            0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              39,
              "[ClientTriggerComponent] 配置出错！客户端触发器配置和触发器配置都缺失",
              ["ConfigId", this.HYo],
            ),
          1))
    );
  }
  OnStart() {
    if (((this.vtn = this.Entity.GetComponent(84)), !this.vtn)) return !1;
    if (this.dwl)
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
        this.Znn,
      );
    else if (this.Lo) {
      var e = this.Lo.TriggerMatch.EntityMatch;
      switch (((this._un = this.Entity.GetComponent(128)), e.Type)) {
        case "AllCharacter":
          (this.wAa = !0),
            (this.PAa = !0),
            EventSystem_1.EventSystem.AddWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnEntityInOutRangeLocal,
              this.zcn,
            );
          break;
        case "DynamicEntityMatch":
          (this.wAa = !0),
            (this.GAa = e.MatchEntity),
            EventSystem_1.EventSystem.AddWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnEntityInOutRangeLocal,
              this.zcn,
            );
          break;
        case "Player":
          (this.PAa = e.ChangeRoleTrigger || !1),
            (this.qAa = e.MatchRoleOption),
            this.PAa
              ? EventSystem_1.EventSystem.AddWithTarget(
                  this.Entity,
                  EventDefine_1.EEventName.OnEntityInOutRangeLocal,
                  this.zcn,
                )
              : EventSystem_1.EventSystem.AddWithTarget(
                  this.Entity,
                  EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
                  this.Znn,
                );
      }
    }
    return !0;
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.HasWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnEntityInOutRangeLocal,
        this.zcn,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnEntityInOutRangeLocal,
          this.zcn,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
        this.Znn,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
          this.Znn,
        ),
      !(this.Lo = void 0)
    );
  }
  CreateTriggerContext(e, t, i) {
    return LevelGeneralContextDefine_1.TriggerContext.Create(
      this.Entity.Id,
      e,
      void 0,
      t,
      i,
    );
  }
  o_1(e) {
    void 0 === this.i_1
      ? this.NAa(e)
      : this.e_1 >= this.i_1 || (this.e_1++, this.NAa(e));
  }
  n_1(e) {
    void 0 === this.r_1
      ? this.FAa(e)
      : this.t_1 >= this.r_1 || (this.t_1++, this.FAa(e));
  }
  jAa(e) {
    return (
      !!e?.Valid &&
      !this._un?.IsLocked &&
      (!this.Lo?.OnTriggerEnter?.Condition ||
        ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
          this.Lo.OnTriggerEnter.Condition,
          void 0,
          LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id),
        ))
    );
  }
  WAa(e) {
    return (
      !!e?.Valid &&
      !this._un?.IsLocked &&
      (!(e = this.Lo?.OnTriggerExit?.Condition) ||
        ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
          e,
          void 0,
          LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id),
        ))
    );
  }
  NAa(e) {
    e?.Valid &&
      this.Utc(this.Lo?.OnTriggerEnter.OnlineDisableTip ?? !1) &&
      (this.jAa(e)
        ? e.Entity.GetComponent(0)?.GetCreatureDataId()
          ? this.Actions
            ? (LevelGeneralController_1.LevelGeneralController.ExecuteActionsNew(
                this.Actions,
                this.CreateTriggerContext(e.Id, 1, this.dwl),
              ),
              this.wS.delete(e.Id))
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "SceneItem",
                31,
                "[ClientTriggerComponent] 没有配置触发行为",
              )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              31,
              "[ClientTriggerComponent] 找不到target对应的CreatureId",
            )
        : (this.wS.set(e.Id, e), this.QAa()));
  }
  FAa(e) {
    e?.Valid &&
      (this.wS.delete(e.Id),
      this.Utc(this.Lo?.OnTriggerExit.OnlineDisableTip ?? !1)) &&
      this.WAa(e) &&
      (e.Entity.GetComponent(0)?.GetCreatureDataId()
        ? this.ExitActions
          ? LevelGeneralController_1.LevelGeneralController.ExecuteActionsNew(
              this.ExitActions,
              this.CreateTriggerContext(e.Id, 2, this.dwl),
            )
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "SceneItem",
              7,
              "[ClientTriggerComponent] 没有配置触发行为",
            )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            31,
            "[ClientTriggerComponent] 找不到target对应的CreatureId",
          ));
  }
  QAa() {
    this.OAa ||
      (this.OAa = TimerSystem_1.TimerSystem.Forever(this.VAa, UPDATE_INTERVAL));
  }
  HAa() {
    this.OAa && TimerSystem_1.TimerSystem.Remove(this.OAa), (this.OAa = void 0);
  }
  kAa(e) {
    if (!this.GAa || this.GAa?.length <= 0) return !0;
    for (const t of this.GAa) if ((0, IUtil_1.isEntitiyMatch)(t, e)) return !0;
    return !1;
  }
  Utc(e) {
    return LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
      this.EIe.GetEntityOnlineInteractType(),
      e,
    );
  }
};
(ClientTriggerComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(246)],
  ClientTriggerComponent,
)),
  (exports.ClientTriggerComponent = ClientTriggerComponent);
//# sourceMappingURL=ClientTriggerComponent.js.map

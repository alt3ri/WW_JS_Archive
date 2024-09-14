"use strict";
var ClientTriggerComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, i, r) {
      var n,
        s = arguments.length,
        o =
          s < 3
            ? t
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(t, i))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(e, t, i, r);
      else
        for (var h = e.length - 1; 0 <= h; h--)
          (n = e[h]) &&
            (o = (s < 3 ? n(o) : 3 < s ? n(t, i, o) : n(t, i)) || o);
      return 3 < s && o && Object.defineProperty(t, i, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ClientTriggerComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  IUtil_1 = require("../../../../../UniverseEditor/Interface/IUtil"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine"),
  LevelGeneralController_1 = require("../../../../LevelGamePlay/LevelGeneralController"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SceneTeamController_1 = require("../../../../Module/SceneTeam/SceneTeamController"),
  UPDATE_INTERVAL = 2e3;
let ClientTriggerComponent =
  (ClientTriggerComponent_1 = class ClientTriggerComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.EIe = void 0),
        (this.vtn = void 0),
        (this.Lo = void 0),
        (this.HYo = 0),
        (this.VDa = !1),
        (this.HDa = !1),
        (this.jDa = 0),
        (this.WDa = 0),
        (this.QDa = void 0),
        (this.KDa = void 0),
        (this.$Da = void 0),
        (this.wS = void 0),
        (this._un = void 0),
        (this.zcn = (t, i) => {
          if (i?.Valid) {
            let e = !1;
            var r;
            this.VDa &&
              i.Entity.GetComponent(3)?.IsRoleAndCtrlByMe &&
              (e =
                !(this.QDa && 0 < this.QDa?.length) ||
                SceneTeamController_1.SceneTeamController.IsMatchRoleOption(
                  this.QDa,
                )),
              (e =
                this.HDa &&
                (r = i.Entity.GetComponent(0)) &&
                (r = r.GetBaseInfo())
                  ? this.XDa(r.Category)
                  : e) &&
                (t
                  ? (this.jDa &&
                      ((this.WDa = e ? this.WDa++ : this.WDa),
                      (e = this.WDa === this.jDa)),
                    e && this.YDa(i))
                  : (this.jDa &&
                      ((this.WDa = e ? this.WDa-- : this.WDa),
                      (e = this.WDa === this.jDa - 1)),
                    e && this.JDa(i)));
          }
        }),
        (this.Znn = (e) => {
          let t = !1;
          var i;
          (t =
            this.QDa && 0 < this.QDa?.length
              ? SceneTeamController_1.SceneTeamController.IsMatchRoleOption(
                  this.QDa,
                )
              : t) &&
            (i =
              ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity) &&
            (e ? this.YDa(i) : this.JDa(i));
        }),
        (this.zDa = () => {
          if (0 === this.wS.size) this.ZDa();
          else if (this._un?.IsLocked) this.ZDa();
          else for (var [, e] of this.wS) this.YDa(e);
        });
    }
    get Actions() {
      return this.Lo?.OnTriggerEnter?.Actions;
    }
    get ExitActions() {
      return this.Lo?.OnTriggerExit?.Actions;
    }
    OnInitData(e) {
      var e = e.GetParam(ClientTriggerComponent_1)[0],
        e = e || void 0,
        t = this.Entity.GetComponent(109);
      return (
        t && !t.LogicRange && t.SetLogicRange(300),
        (this.Lo = e),
        (this.EIe = this.Entity.GetComponent(0)),
        (this.HYo = this.EIe.GetPbDataId()),
        (this.wS = new Map()),
        (this.jDa = this.Lo?.TriggerMatch?.EntityMatchCount || 0),
        !0
      );
    }
    OnStart() {
      if (((this.vtn = this.Entity.GetComponent(77)), !this.vtn)) return !1;
      var e = this.Lo?.TriggerMatch?.EntityMatch;
      if (e)
        switch (((this._un = this.Entity.GetComponent(118)), e.Type)) {
          case "AllCharacter":
            (this.HDa = !0),
              (this.VDa = !0),
              EventSystem_1.EventSystem.AddWithTarget(
                this.Entity,
                EventDefine_1.EEventName.OnEntityInOutRangeLocal,
                this.zcn,
              );
            break;
          case "DynamicEntityMatch":
            (this.HDa = !0),
              (this.KDa = e.MatchEntity),
              EventSystem_1.EventSystem.AddWithTarget(
                this.Entity,
                EventDefine_1.EEventName.OnEntityInOutRangeLocal,
                this.zcn,
              );
            break;
          case "Player":
            (this.VDa = e.ChangeRoleTrigger || !1),
              (this.QDa = e.MatchRoleOption),
              this.VDa
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
      else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            40,
            "[ClientTriggerComponent] 匹配配置丢失",
            ["ConfigId", this.HYo],
          );
      return !0;
    }
    OnEnd() {
      return !(this.Lo = void 0);
    }
    CreateTriggerContext(e) {
      return LevelGeneralContextDefine_1.TriggerContext.Create(
        this.Entity.Id,
        e,
      );
    }
    eAa(e) {
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
    tAa(e) {
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
    YDa(e) {
      e?.Valid &&
        (this.eAa(e)
          ? e.Entity.GetComponent(0)?.GetCreatureDataId()
            ? this.Actions
              ? (LevelGeneralController_1.LevelGeneralController.ExecuteActionsNew(
                  this.Actions,
                  this.CreateTriggerContext(e.Id),
                ),
                this.wS.delete(e.Id))
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "SceneItem",
                  32,
                  "[ClientTriggerComponent] 没有配置触发行为",
                )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                32,
                "[ClientTriggerComponent] 找不到target对应的CreatureId",
              )
          : (this.wS.set(e.Id, e), this.iAa()));
    }
    JDa(e) {
      e?.Valid &&
        this.tAa(e) &&
        (e.Entity.GetComponent(0)?.GetCreatureDataId()
          ? this.ExitActions
            ? LevelGeneralController_1.LevelGeneralController.ExecuteActionsNew(
                this.ExitActions,
                this.CreateTriggerContext(e.Id),
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
              32,
              "[ClientTriggerComponent] 找不到target对应的CreatureId",
            ));
    }
    iAa() {
      this.$Da ||
        (this.$Da = TimerSystem_1.TimerSystem.Forever(
          this.zDa,
          UPDATE_INTERVAL,
        ));
    }
    ZDa() {
      this.$Da && TimerSystem_1.TimerSystem.Remove(this.$Da),
        (this.$Da = void 0);
    }
    XDa(e) {
      if (!this.KDa || this.KDa?.length <= 0) return !0;
      for (const t of this.KDa)
        if ((0, IUtil_1.isEntitiyMatch)(t, e)) return !0;
      return !1;
    }
  });
(ClientTriggerComponent = ClientTriggerComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(212)],
    ClientTriggerComponent,
  )),
  (exports.ClientTriggerComponent = ClientTriggerComponent);
//# sourceMappingURL=ClientTriggerComponent.js.map

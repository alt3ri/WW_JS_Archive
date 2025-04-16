"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, r) {
    var n,
      a = arguments.length,
      i =
        a < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, o))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      i = Reflect.decorate(e, t, o, r);
    else
      for (var s = e.length - 1; 0 <= s; s--)
        (n = e[s]) && (i = (a < 3 ? n(i) : 3 < a ? n(t, o, i) : n(t, o)) || i);
    return 3 < a && i && Object.defineProperty(t, o, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemMovementSyncComponent = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  Event_1 = require("../../../Core/Event/Event"),
  Net_1 = require("../../../Core/Net/Net"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CombatLog_1 = require("../../Utils/CombatLog"),
  BaseMovementSyncComponent_1 = require("../Character/Common/Component/BaseMovementSyncComponent");
var ESceneItemParamKey = Protocol_1.Aki.Protocol.Ww_;
const INVALID_ID = 0;
let SceneItemMovementSyncComponent = class SceneItemMovementSyncComponent extends BaseMovementSyncComponent_1.BaseMovementSyncComponent {
  constructor() {
    super(...arguments),
      (this.Fpl = 0),
      (this.rLl = new Map()),
      (this.oLl = new Event_1.Event(EventDefine_1.EEventName, 0));
  }
  OnInitData(e) {
    super.OnInitData();
    e = e.ComponentDataMap.get("Yys")?.Yys;
    return e && this.ModifyBlackboardFromRemote(e.CI_), !0;
  }
  OnStart() {
    super.OnStart(),
      this.SetAutonomousId(this.CreatureDataComp?.AutonomousId ?? INVALID_ID);
    var e = this.CreatureDataComp?.ComponentDataMap.get("Yys")?.Yys;
    return e && this.ModifyBlackboardFromRemote(e.CI_), !0;
  }
  SetAutonomousId(e) {
    var e = e ?? INVALID_ID,
      t = this.Fpl,
      o = (this.Fpl = e) !== INVALID_ID,
      r = ModelManager_1.ModelManager.CreatureModel?.GetPlayerId(),
      t = r === t,
      r = o && r === e;
    this.ActorComp?.SetAutonomous(this.ActorComp.IsAutonomousProxy, r),
      this.SetEnableMovementSync(
        o,
        "SceneItemManipulatableComponent.SetAutonomousId",
      ),
      t != r &&
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemSwitchMoveControl,
          r,
        );
  }
  GetAutonomousId() {
    return this.Fpl;
  }
  HasMoveController() {
    return this.Fpl !== INVALID_ID;
  }
  HasMoveAuthority() {
    return this.ActorComp?.IsMoveAutonomousProxy ?? !1;
  }
  nLl(e, t, o, r) {
    this.rLl.set(e, t), this.oLl.Emit(e, t, o, r ?? "");
  }
  ListenBlackboard(e, t) {
    this.oLl.Add(e, t);
  }
  RemoveBlackboardListener(e, t) {
    this.oLl.Remove(e, t);
  }
  ModifyBlackboardFromRemote(e, t = !1) {
    if (t) {
      for (var [o] of this.rLl)
        this.nLl(o, void 0, !0, "ModifyStateFromRemote");
      this.rLl.clear();
    } else
      for (const a of e) {
        var r = a.e5n,
          n = a.Z4n;
        if (void 0 === r)
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              19,
              "ModifyStateFromRemote blackboardType is undefined",
              ["Entity Id", this.Entity.Id],
              ["blackboards", e],
            );
        else {
          let e = void 0;
          switch (r) {
            case "V8n":
            case "vKn":
            case "MKn":
            case "j8n":
              e = a[r];
              break;
            case "CKn":
            case "SKn":
              e = a[r] ? [...a[r].gKn] : void 0;
              break;
            case "fKn":
              e = a[r] ? MathUtils_1.MathUtils.LongToNumber(a[r]) : void 0;
              break;
            case "pKn":
              e = a[r]?.gKn.map((e) => MathUtils_1.MathUtils.LongToNumber(e));
              break;
            case "yKn":
              e = a[r] ? Vector_1.Vector.Create(a[r]) : void 0;
              break;
            case "TKn":
              e = a[r] ? Rotator_1.Rotator.Create(a[r]) : void 0;
          }
          this.nLl(n, e, !0, "ModifyStateFromRemote");
        }
      }
  }
  GetBlackboard(e) {
    return this.rLl.get(e);
  }
  ModifyBlackboard(e, t, o) {
    if (!this.HasMoveAuthority())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            19,
            "[ModifyState] 尝试设置状态但没有移动控制权",
            ["creatureId", this.CreatureDataComp?.GetCreatureDataId()],
            ["entityId", this.Entity.Id],
            ["pbDataId", this.CreatureDataComp?.GetPbDataId()],
            ["stateType", e],
            ["stateId", t],
            ["reason", o],
          ),
        !1
      );
    this.nLl(e, t, !1, o);
    var r = Protocol_1.Aki.Protocol.Cp_.create(),
      n =
        ((r.F4n = this.CreatureDataComp?.GetCreatureDataId() ?? INVALID_ID),
        Protocol_1.Aki.Protocol.Fw_.create());
    return (n.Z4n = e) !==
      ESceneItemParamKey.Proto_SceneItemBBKey_ManipulatableState
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            19,
            "[ModifyState] 未知的黑板值字段",
            ["creatureId", this.CreatureDataComp?.GetCreatureDataId()],
            ["entityId", this.Entity.Id],
            ["pbDataId", this.CreatureDataComp?.GetPbDataId()],
            ["stateType", e],
            ["stateId", t],
            ["reason", o],
          ),
        !1)
      : ((n.V8n = t),
        (n.e5n = "V8n"),
        (r.C6n = [n]),
        Net_1.Net.Call(18286, r, () => {}),
        this.CollectSampleAndSend(!0),
        !0);
  }
};
(SceneItemMovementSyncComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(156)],
  SceneItemMovementSyncComponent,
)),
  (exports.SceneItemMovementSyncComponent = SceneItemMovementSyncComponent);
//# sourceMappingURL=SceneItemMovementSyncComponent.js.map

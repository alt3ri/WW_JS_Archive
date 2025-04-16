"use strict";
var SceneItemGenericOutletComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, i, o) {
      var r,
        n = arguments.length,
        s =
          n < 3
            ? t
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(t, i))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, i, o);
      else
        for (var a = e.length - 1; 0 <= a; a--)
          (r = e[a]) &&
            (s = (n < 3 ? r(s) : 3 < n ? r(t, i, s) : r(t, i)) || s);
      return 3 < n && s && Object.defineProperty(t, i, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemGenericOutletComponent = void 0);
const Log_1 = require("../../Core/Common/Log"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../Core/Net/Net"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  GameplayTagUtils_1 = require("../../Core/Utils/GameplayTagUtils"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../UniverseEditor/Interface/IComponent"),
  IUtil_1 = require("../../UniverseEditor/Interface/IUtil"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager");
let SceneItemGenericOutletComponent =
  (SceneItemGenericOutletComponent_1 = class SceneItemGenericOutletComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.Hte = void 0),
        (this.Oln = void 0),
        (this.Lie = void 0),
        (this.Wal = new Map()),
        (this.EntityInSocket = void 0),
        (this.Qal = void 0),
        (this.GUe = (e, t, i) => {
          t.PbDataId === this.Qal &&
            (this.InitMatch(t.PbDataId),
            EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.AddEntity,
              this.GUe,
            ));
        });
    }
    OnInitData(e) {
      e = e.GetParam(SceneItemGenericOutletComponent_1)[0];
      return (this.Lo = e), this.Wal.clear(), !0;
    }
    OnStart() {
      (this.Hte = this.Entity.GetComponent(200)),
        (this.Oln = this.Entity.GetComponent(128)),
        (this.Lie = this.Entity.GetComponent(194));
      var e = this.Hte?.CreatureData.PbPullingFoundationEntityId;
      return void 0 !== e && 0 !== e && this.InitMatch(e), !0;
    }
    OnClear() {
      return (
        (this.Lo = void 0),
        (this.Hte = void 0),
        this.Wal.clear(),
        (this.EntityInSocket = void 0),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.AddEntity,
          this.GUe,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.AddEntity,
            this.GUe,
          ),
        !0
      );
    }
    InitMatch(e) {
      this.Qal = e;
      var t,
        i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
      void 0 === i || void 0 === i.Entity
        ? EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.AddEntity,
            this.GUe,
          )
        : ((this.EntityInSocket = i.Entity),
          void 0 === (i = this.EntityInSocket.GetComponent(200))
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                31,
                "雕像交互点的雕像没有ActorComponent",
                ["relationId", e],
              )
            : (this.$al(this.EntityInSocket),
              void 0 === (t = this.GetMatchLocation(this.EntityInSocket))
                ? Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "SceneItem",
                    31,
                    "雕像交互点的雕像没有匹配位置",
                    ["relationId", e],
                  )
                : i.SetActorLocation(
                    t.ToUeVector(),
                    "[SceneItemGenericOutletComponent.InitMatch]",
                    !1,
                  )));
    }
    TryMatch(e) {
      return (
        void 0 !== this.Lo &&
        !this.Oln?.IsLocked &&
        !this.Lie?.HasTag(-709838471) &&
        this.Lo.Config.Type ===
          IComponent_1.EPullingFoundation.CategoryMatching &&
        this.$al(e)
      );
    }
    $al(t) {
      var i = t.GetComponent(0)?.GetBaseInfo(),
        o = t.GetComponent(203);
      if (void 0 !== i && void 0 !== o)
        for (let e = 0; e < this.Lo.Config.MatchingConfigs.length; e++) {
          var r = this.Lo.Config.MatchingConfigs[e];
          if (
            void 0 === r.Condition.EntityMatch ||
            (0, IUtil_1.isEntitiyMatch)(r.Condition.EntityMatch, i.Category)
          ) {
            if (void 0 !== r.Condition.SelfState) {
              r = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
                r.Condition.SelfState,
              );
              if (void 0 === r) continue;
              if (!o.HasTag(r)) continue;
            }
            return this.Wal.set(t, e), !0;
          }
        }
      return !1;
    }
    GetMatchLocation(e) {
      var t,
        e = this.Wal.get(e);
      if (void 0 !== e)
        return (
          (e = this.Lo.Config.MatchingConfigs[e]),
          (t = Vector_1.Vector.Create()).FromConfigVector(e.Animation.MatchPos),
          (e = (e = FNameUtil_1.FNameUtil.GetDynamicFName(
            e.Animation.MatchReferenceKey,
          ))
            ? this.Hte.GetSocketTransform(e)
            : this.Hte.ActorTransform),
          t.FromUeVector(e.TransformPosition(t.ToUeVector())),
          t
        );
    }
    GetMatchRotation(e) {
      var t,
        e = this.Wal.get(e);
      if (void 0 !== e)
        return (
          (t = (e = this.Lo.Config.MatchingConfigs[e]).Animation.MatchRot),
          (t = Rotator_1.Rotator.Create(t.Y ?? 0, t.Z ?? 0, t.X ?? 0)),
          (e = (e = FNameUtil_1.FNameUtil.GetDynamicFName(
            e.Animation.MatchReferenceKey,
          ))
            ? this.Hte.GetSocketTransform(e)
            : this.Hte.ActorTransform),
          t.FromUeRotator(
            e.TransformRotation(t.Quaternion().ToUeQuat()).Rotator(),
          ),
          t
        );
    }
    RequestMatchOutlet(e, t, i) {
      var o = this.Hte?.CreatureData.GetCreatureDataId(),
        e = e.GetComponent(0)?.GetCreatureDataId(),
        r =
          ((void 0 !== o && void 0 !== e) ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                31,
                "拉取雕像请求匹配雕像交互点时出错",
                ["outletCreatureId", o],
                ["selfCreatureId", e],
              )),
          Protocol_1.Aki.Protocol.NC_.create()),
        o =
          ((r.F4n = MathUtils_1.MathUtils.NumberToLong(o)),
          (r._Kn = MathUtils_1.MathUtils.NumberToLong(e)),
          Protocol_1.Aki.Protocol.Gks.create()),
        e =
          ((o.X = t.X),
          (o.Y = t.Y),
          (o.Z = t.Z),
          Protocol_1.Aki.Protocol.D2s.create());
      (e.Pitch = i.Pitch),
        (e.Yaw = i.Yaw),
        (e.Roll = i.Roll),
        (r.l8n = o),
        (r._8n = e),
        Net_1.Net.Call(24702, r, (e) => {
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              29160,
            );
        });
    }
  });
(SceneItemGenericOutletComponent = SceneItemGenericOutletComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(261)],
    SceneItemGenericOutletComponent,
  )),
  (exports.SceneItemGenericOutletComponent = SceneItemGenericOutletComponent);
//# sourceMappingURL=SceneItemGenericOutletComponent.js.map

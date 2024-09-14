"use strict";
var SceneItemOutletComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, n) {
      var r,
        o = arguments.length,
        s =
          o < 3
            ? e
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(e, i))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(t, e, i, n);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (r = t[a]) &&
            (s = (o < 3 ? r(s) : 3 < o ? r(e, i, s) : r(e, i)) || s);
      return 3 < o && s && Object.defineProperty(e, i, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemOutletComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  IUtil_1 = require("../../../UniverseEditor/Interface/IUtil"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  SceneItemManipulableCastState_1 = require("./Manipulate/SceneItemManipulableCastState"),
  SceneItemManipulableDropState_1 = require("./Manipulate/SceneItemManipulableDropState"),
  SceneItemManipulableResetState_1 = require("./Manipulate/SceneItemManipulableResetState"),
  SCENE_ITEM_OUTLET_TAG = new UE.FName("SceneItemOutlet");
let SceneItemOutletComponent =
  (SceneItemOutletComponent_1 = class SceneItemOutletComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Config = void 0),
        (this.n$t = void 0),
        (this.Lie = void 0),
        (this.xvn = void 0),
        (this.wvn = -1),
        (this.Bvn = new Map()),
        (this.bvn = void 0),
        (this.qvn = void 0),
        (this.IVs = void 0),
        (this.qVs = void 0),
        (this.GVs = Vector_1.Vector.Create()),
        (this.OVs = Vector_1.Vector.Create()),
        (this.NVs = Rotator_1.Rotator.Create()),
        (this.kVs = Rotator_1.Rotator.Create()),
        (this.q$a = () => {
          this.Lie.RemoveTag(-171146886),
            void 0 !== this.EntityInSocket
              ? this.Lie.AddTag(-1603486396)
              : this.Lie.AddTag(-1381638598);
        }),
        (this.oFe = (t) => {
          -3775711 === t
            ? this.Lie.AddTag(-171146886)
            : this.Lie.RemoveTag(-171146886);
        }),
        (this.H0n = (t, e) => {
          e = e.Entity;
          if (
            e &&
            !this.Lie?.HasTag(-662723379) &&
            !this.Lie?.HasTag(-709838471)
          )
            if (t) {
              if (!this.qVs) {
                t = e.GetComponent(0)?.GetBaseInfo();
                if (t) {
                  var i = this.Config?.Config;
                  if (
                    void 0 === i.Condition.EntityMatch ||
                    (0, IUtil_1.isEntitiyMatch)(
                      i.Condition.EntityMatch,
                      t.Category,
                    )
                  ) {
                    if (void 0 !== i.Condition.SelfState) {
                      var t =
                        GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
                          i.Condition.SelfState,
                        );
                      if (!this.Lie || !this.Lie.HasTag(t)) return;
                    }
                    e.GetComponent(1) &&
                      (t = e.GetComponent(143)) &&
                      (t.CurrentState instanceof
                        SceneItemManipulableCastState_1.SceneItemManipulableCastState ||
                      t.CurrentState instanceof
                        SceneItemManipulableDropState_1.SceneItemManipulableDropState ||
                      t.CurrentState instanceof
                        SceneItemManipulableResetState_1.SceneItemManipulableResetState
                        ? this.Wga(e, i)
                        : EventSystem_1.EventSystem.AddWithTarget(
                            e,
                            EventDefine_1.EEventName
                              .OnManipulatableItemStateModified,
                            this.Qga,
                          ));
                  }
                }
              }
            } else
              EventSystem_1.EventSystem.HasWithTarget(
                e,
                EventDefine_1.EEventName.OnManipulatableItemStateModified,
                this.Qga,
              ) &&
                EventSystem_1.EventSystem.RemoveWithTarget(
                  e,
                  EventDefine_1.EEventName.OnManipulatableItemStateModified,
                  this.Qga,
                );
        }),
        (this.Qga = (t, e, i) => {
          var n = this.Config?.Config;
          "BeDropping" === e &&
            (this.Wga(i, n),
            EventSystem_1.EventSystem.RemoveWithTarget(
              i,
              EventDefine_1.EEventName.OnManipulatableItemStateModified,
              this.Qga,
            ));
        });
    }
    GetSocketLocation(t) {
      var e = Vector_1.Vector.Create(this.GetSocketLocationOffset(t)),
        t = FNameUtil_1.FNameUtil.GetDynamicFName(this.GetSocketName(t)),
        t = t ? this.n$t.GetSocketTransform(t) : this.n$t.ActorTransform;
      return e.FromUeVector(t.TransformPosition(e.ToUeVector())), e;
    }
    GetSocketLocationOffset(t) {
      switch (this.Config.Config.Type) {
        case IComponent_1.EItemFoundation.CategoryMatching:
          var e = this.Gvn(t)?.Animation?.MatchPos;
          return Vector_1.Vector.Create(e?.X ?? 0, e?.Y ?? 0, e?.Z ?? 0);
        case IComponent_1.EItemFoundation.BuildingBlock:
        case IComponent_1.EItemFoundation.PulseDevice:
          var [e, i] = this.bvn.CalcJigsawSocketLocation();
          return (
            this.Config.Config.Type ===
              IComponent_1.EItemFoundation.PulseDevice &&
              e &&
              (e.Z += 20),
            (this.qvn = i),
            e ?? Vector_1.Vector.ZeroVectorProxy
          );
        case IComponent_1.EItemFoundation.RangeAdsorption:
          i = this.Config.Config.CategoryAnimation.MatchPos;
          return Vector_1.Vector.Create(i?.X ?? 0, i?.Y ?? 0, i?.Z ?? 0);
        default:
          return Vector_1.Vector.ZeroVectorProxy;
      }
    }
    GetSocketName(t) {
      return this.Config.Config.Type ===
        IComponent_1.EItemFoundation.CategoryMatching
        ? this.Gvn(t)?.Animation?.MatchReferenceKey
        : this.Config.Config.Type ===
            IComponent_1.EItemFoundation.RangeAdsorption
          ? this.Config.Config.Animation.MatchReferenceKey
          : void 0;
    }
    GetIsNeedAttach() {
      switch (this.Config.Config.Type) {
        case IComponent_1.EItemFoundation.CategoryMatching:
        case IComponent_1.EItemFoundation.RangeAdsorption:
          return !0;
        default:
          return !1;
      }
    }
    GetCurrentLockLocation() {
      switch (this.Config.Config.Type) {
        case IComponent_1.EItemFoundation.CategoryMatching:
          return;
        case IComponent_1.EItemFoundation.BuildingBlock:
        case IComponent_1.EItemFoundation.PulseDevice:
          return Vector_1.Vector.Create(
            this.bvn.GetBlockLocationByIndex(this.qvn),
          );
        default:
          return;
      }
    }
    ShowAimModel(t) {
      switch (this.Config.Config.Type) {
        case IComponent_1.EItemFoundation.CategoryMatching:
          break;
        case IComponent_1.EItemFoundation.BuildingBlock:
        case IComponent_1.EItemFoundation.PulseDevice:
          var e = t.GetComponent(125);
          this.bvn.AimBlockByIndex(this.qvn, e);
      }
    }
    GetIsIllegal(t) {
      switch (this.Config.Config.Type) {
        case IComponent_1.EItemFoundation.CategoryMatching:
          return !1;
        case IComponent_1.EItemFoundation.BuildingBlock:
        case IComponent_1.EItemFoundation.PulseDevice:
          var e = t.GetComponent(125);
          return this.bvn.CheckJigsawBlockIllegal(e, this.qvn);
        default:
          return !1;
      }
    }
    GetIsCorrect(t, e) {
      switch (this.Config.Config.Type) {
        case IComponent_1.EItemFoundation.CategoryMatching:
          return !0;
        case IComponent_1.EItemFoundation.BuildingBlock:
        case IComponent_1.EItemFoundation.PulseDevice:
          var i = t.GetComponent(125);
          return this.bvn.CheckJigsawBlockCorrect(i, e ?? this.qvn);
        default:
          return !0;
      }
    }
    GetMatchSequence(t) {
      t = this.Gvn(t);
      if (t) return t.Animation.MatchSequence;
    }
    GetMismatchSequence(t) {
      t = this.Gvn(t);
      if (t) return t.Callback.DischargeSequence;
    }
    GetMatchSequenceOffset(t) {
      t = this.Gvn(t)?.Animation.MatchSequenceOffset;
      return Vector_1.Vector.Create(t?.X ?? 0, t?.Y ?? 0, t?.Z ?? 0);
    }
    GetSocketRotator(t) {
      var e = this.GetSocketRotatorOffset(t),
        t = FNameUtil_1.FNameUtil.GetDynamicFName(this.GetSocketName(t)),
        t = t ? this.n$t.GetSocketTransform(t) : this.n$t.ActorTransform;
      return Rotator_1.Rotator.Create(
        t.TransformRotation(e.Quaternion().ToUeQuat()).Rotator(),
      );
    }
    GetSocketRotatorOffset(t) {
      switch (this.Config.Config.Type) {
        case IComponent_1.EItemFoundation.CategoryMatching:
          var e = this.Gvn(t).Animation.MatchRot;
          return Rotator_1.Rotator.Create(e.Y ?? 0, e.Z ?? 0, e.X ?? 0);
        case IComponent_1.EItemFoundation.BuildingBlock:
        case IComponent_1.EItemFoundation.PulseDevice:
          e = t.GetComponent(125);
          return Rotator_1.Rotator.Create(0, -e.Rotation, 0);
        default:
          return Rotator_1.Rotator.ZeroRotatorProxy;
      }
    }
    Gvn(e) {
      if (e?.Valid) {
        let t = void 0;
        if ((t = this.Nvn(this.wvn))) return t;
        var i = e.GetComponent(181),
          n = e.GetComponent(0).GetBaseInfo();
        if (n) {
          for (const r of this.Bvn)
            if ((0, IUtil_1.isEntitiyMatch)(r[0], n.Category)) {
              if (!r[0].State?.State) {
                (t = r[1]), (this.wvn = -1);
                break;
              }
              if (i.ContainsTagByName(r[0].State.State)) {
                (t = r[1]), (this.wvn = -1);
                break;
              }
            }
          return t;
        }
      }
    }
    Nvn(e) {
      if (!(void 0 === e || e < 0 || e >= this.Bvn.size)) {
        var i = this.Bvn.values();
        let t = e;
        for (; 0 <= --t; ) i.next();
        return i.next().value;
      }
    }
    get EntityInSocket() {
      return this.xvn;
    }
    set EntityInSocket(t) {
      this.xvn = t;
    }
    set MatchCfgIndex(t) {
      this.wvn = t ?? -1;
    }
    get MatchCfgIndex() {
      return this.wvn;
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemOutletComponent_1)[0];
      if (
        ((this.n$t = this.Entity.GetComponent(187)),
        (this.Lie = this.Entity.GetComponent(190)),
        (this.Config = t),
        this.Config.Config.Type ===
          IComponent_1.EItemFoundation.CategoryMatching)
      )
        for (const i of this.Config.Config.MatchingConfigs) {
          var e = i.Condition.EntityMatch;
          this.Bvn.set(e, i);
        }
      return (
        (this.xvn = void 0),
        (this.wvn = -1),
        this.Entity.GetComponent(109).SetLogicRange(
          ConfigManager_1.ConfigManager.ManipulateConfig.SearchRange,
        ),
        !0
      );
    }
    OnStart() {
      this.n$t.Owner.Tags.Add(SCENE_ITEM_OUTLET_TAG),
        this.Lie?.AddTagAddOrRemoveListener(-662723379, this.q$a),
        this.Lie?.AddTagAddOrRemoveListener(-709838471, this.q$a),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.oFe,
        );
      var t = this.Entity.GetComponent(181);
      return (
        t.HasTag(-662723379) || t.HasTag(-709838471)
          ? t.AddTag(-1381638598)
          : t.HasTag(-3775711) && t.AddTag(-171146886),
        !0
      );
    }
    OnActivate() {
      if (
        this.Config.Config.Type ===
          IComponent_1.EItemFoundation.BuildingBlock ||
        this.Config.Config.Type === IComponent_1.EItemFoundation.PulseDevice
      ) {
        if (((this.bvn = this.Entity.GetComponent(124)), !this.bvn)) return !1;
      } else
        this.Config.Config.Type ===
          IComponent_1.EItemFoundation.RangeAdsorption &&
          (EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnEntityInOutRangeLocal,
            this.H0n,
          ),
          StringUtils_1.StringUtils.IsEmpty(
            this.Config.Config.Animation.MoveCurve,
          ) ||
            ResourceSystem_1.ResourceSystem.LoadAsync(
              this.Config.Config.Animation.MoveCurve,
              UE.CurveFloat,
              (t) => {
                t && (this.IVs = t);
              },
            ));
      return !0;
    }
    OnEnd() {
      return (
        this.Lie?.RemoveTagAddOrRemoveListener(-662723379, this.q$a),
        this.Lie?.RemoveTagAddOrRemoveListener(-709838471, this.q$a),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.oFe,
        ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnEntityInOutRangeLocal,
          this.H0n,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnEntityInOutRangeLocal,
            this.H0n,
          ),
        !0
      );
    }
    CheckMatchManipulatable(t) {
      var e = t?.GetComponent(0)?.GetBaseInfo();
      if (!e) return !1;
      switch (this.Config.Config.Type) {
        case IComponent_1.EItemFoundation.CategoryMatching:
          return this.CheckCategoryMatchingMatchManipulatable(e);
        case IComponent_1.EItemFoundation.RangeAdsorption:
          return this.CheckRangeAdsorptionMatchManipulatable(e);
        case IComponent_1.EItemFoundation.BuildingBlock:
        case IComponent_1.EItemFoundation.PulseDevice:
          return !0;
        default:
          return !1;
      }
    }
    CheckCategoryMatchingMatchManipulatable(t) {
      for (const n of this.Bvn)
        if ((0, IUtil_1.isEntitiyMatch)(n[0], t.Category)) {
          if (!(e = n[1]).Condition.SelfState) return !0;
          var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
              e.Condition.SelfState,
            ),
            i = this.Entity.GetComponent(181);
          if (i && i.HasTag(e)) return !0;
        }
      return !1;
    }
    CheckRangeAdsorptionMatchManipulatable(t) {
      var e = this.Config.Config;
      if (e.Condition.EntityMatch) {
        if (!(0, IUtil_1.isEntitiyMatch)(e.Condition.EntityMatch, t.Category))
          return !1;
        if (e.Condition.SelfState) {
          (t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
            e.Condition.SelfState,
          )),
            (e = this.Entity.GetComponent(181));
          if (!e) return !1;
          if (!e.HasTag(t)) return !1;
        }
      }
      return !0;
    }
    ChangeSilentTag() {
      var t = this.Entity.GetComponent(181);
      t.HasTag(-1381638598) &&
        (t.RemoveTag(-1381638598), t.AddTag(-1603486396)),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("SceneItem", 32, "[底座] ChangeSilentTag", [
            "State",
            t.GetTagNames(),
          ]);
    }
    GetOutletMatchType() {
      return this.Entity.GetComponent(0).GetBaseInfo()?.Category
        ?.ItemFoundation;
    }
    IsLockOrSlient() {
      var t = this.Entity.GetComponent(181);
      return t.HasTag(-662723379) || t.HasTag(-709838471);
    }
    MultiplayerLimitTypeCheck() {
      var t = this.Entity.GetComponent(0).GetEntityOnlineInteractType();
      return LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
        t,
        !1,
      );
    }
    CanSetNewItem() {
      switch (this.Config.Config.Type) {
        case IComponent_1.EItemFoundation.CategoryMatching:
        case IComponent_1.EItemFoundation.RangeAdsorption:
          return void 0 === this.xvn;
        case IComponent_1.EItemFoundation.BuildingBlock:
        case IComponent_1.EItemFoundation.PulseDevice:
          return this.bvn.HasEmptySocket();
        default:
          return !1;
      }
    }
    GetCurrentChooseIndex() {
      return this.qvn;
    }
    Wga(t, e) {
      var i = t.GetComponent(1),
        i =
          (this.GVs.DeepCopy(i.ActorLocationProxy),
          this.NVs.DeepCopy(i.ActorRotationProxy),
          this.n$t.ActorTransform),
        n = Vector_1.Vector.Create(
          e.Animation.MatchPos.X ?? 0,
          e.Animation.MatchPos.Y ?? 0,
          e.Animation.MatchPos.Z ?? 0,
        ),
        n =
          (this.OVs.DeepCopy(i.TransformPosition(n.ToUeVector())),
          Rotator_1.Rotator.Create(
            e.Animation.MatchRot.Y ?? 0,
            e.Animation.MatchRot.Z ?? 0,
            e.Animation.MatchRot.X ?? 0,
          )),
        e =
          (this.kVs.DeepCopy(
            i.TransformRotation(n.Quaternion().ToUeQuat()).Rotator(),
          ),
          t.GetComponent(143));
      e.AdsorbedState?.InitAdsorptionConfig(this.IVs, this.OVs, this.kVs),
        (e.CurrentState = e.AdsorbedState),
        (e.TargetOutletComponent = this);
    }
    RequestMatch(t) {
      switch (this.Config.Config.Type) {
        case IComponent_1.EItemFoundation.CategoryMatching:
        case IComponent_1.EItemFoundation.RangeAdsorption:
          this.Kpn(t);
          break;
        case IComponent_1.EItemFoundation.BuildingBlock:
        case IComponent_1.EItemFoundation.PulseDevice:
          this.jQa(t);
      }
    }
    Kpn(t) {
      var e = this.Entity.GetComponent(0).GetCreatureDataId(),
        i = t.GetComponent(0).GetCreatureDataId(),
        n = t.GetComponent(187);
      const r = t.GetComponent(143);
      (t = Protocol_1.Aki.Protocol.Sds.create()),
        (t.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
        (t._Kn = MathUtils_1.MathUtils.NumberToLong(i)),
        (t.uKn = 1),
        (e = Protocol_1.Aki.Protocol.Gks.create()),
        (i = n.ActorLocationProxy),
        (e.X = i.X),
        (e.Y = i.Y),
        (e.Z = i.Z),
        (i = Protocol_1.Aki.Protocol.D2s.create()),
        (n = n.ActorRotationProxy);
      (i.Pitch = n.Pitch),
        (i.Roll = n.Roll),
        (i.Yaw = n.Yaw),
        (t.l8n = e),
        (t._8n = i),
        Net_1.Net.Call(15277, t, (t) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Character",
              32,
              "[Manipulate] Match outlet net response!",
              ["active", t.uKn],
            ),
            t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
              ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  t.Q4n,
                  22034,
                )
              : r.AfterRequestMatch(1 === t.uKn, this.Entity);
        });
    }
    jQa(t) {
      var e = Protocol_1.Aki.Protocol.ZJn.create(),
        i = Protocol_1.Aki.Protocol.TFs.create(),
        n = Protocol_1.Aki.Protocol.LFs.create(),
        r = Protocol_1.Aki.Protocol.Gks.create(),
        o = Protocol_1.Aki.Protocol.D2s.create(),
        s = t.GetComponent(125),
        a = t.GetComponent(187),
        h = a.ActorLocationProxy,
        a = a.ActorRotationProxy;
      (i.N5n = this.qvn.Row),
        (i.F5n = this.qvn.Col),
        (i.V5n = s.Rotation),
        (r.X = h.X),
        (r.Y = h.Y),
        (r.Z = h.Z),
        (o.Pitch = a.Pitch),
        (o.Roll = a.Roll),
        (o.Yaw = a.Yaw),
        (n.l8n = r),
        (n._8n = o),
        (e.G5n = MathUtils_1.MathUtils.NumberToLong(
          this.Entity.GetComponent(0).GetCreatureDataId(),
        )),
        (e.O5n = MathUtils_1.MathUtils.NumberToLong(
          t.GetComponent(0).GetCreatureDataId(),
        )),
        (e.H5n = 1),
        (e.k5n = i),
        (e.sKn = n),
        Net_1.Net.Call(15682, e, (t) => {
          t.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              t.G9n,
              22034,
            );
        });
    }
    GetType() {
      return this.Config.Config.Type;
    }
  });
(SceneItemOutletComponent = SceneItemOutletComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(148)],
    SceneItemOutletComponent,
  )),
  (exports.SceneItemOutletComponent = SceneItemOutletComponent);
//# sourceMappingURL=SceneItemOutletComponent.js.map

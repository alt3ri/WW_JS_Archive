"use strict";
var SceneItemOutletComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, n, r) {
      var o,
        i = arguments.length,
        s =
          i < 3
            ? e
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, n))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(t, e, n, r);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (o = t[a]) &&
            (s = (i < 3 ? o(s) : 3 < i ? o(e, n, s) : o(e, n)) || s);
      return 3 < i && s && Object.defineProperty(e, n, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemOutletComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  IUtil_1 = require("../../../UniverseEditor/Interface/IUtil"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  SCENE_ITEM_OUTLET_TAG = new UE.FName("SceneItemOutlet");
let SceneItemOutletComponent =
  (SceneItemOutletComponent_1 = class SceneItemOutletComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Config = void 0),
        (this.nXt = void 0),
        (this.eMn = void 0),
        (this.tMn = -1),
        (this.iMn = new Map()),
        (this.oMn = void 0),
        (this.rMn = void 0),
        (this.gIe = (t, e) => {
          const n = this.Entity.GetComponent(177);
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("SceneItem", 32, "[底座] 状态改变", [
              "State",
              n.GetTagNames(),
            ]),
            t.some((t) => -662723379 === t || -709838471 === t) &&
              TimerSystem_1.TimerSystem.Next(() => {
                n.RemoveTag(-171146886),
                  void 0 !== this.EntityInSocket
                    ? n.AddTag(-1603486396)
                    : n.AddTag(-1381638598);
              }),
            t.includes(-3775711) &&
              TimerSystem_1.TimerSystem.Next(() => {
                n.AddTag(-171146886);
              }),
            e.includes(-3775711) &&
              TimerSystem_1.TimerSystem.Next(() => {
                n.RemoveTag(-171146886);
              });
        });
    }
    GetSocketLocation(t) {
      var e = this.GetSocketLocationOffset(t),
        t = FNameUtil_1.FNameUtil.GetDynamicFName(this.GetSocketName(t)),
        t = t ? this.nXt.GetSocketTransform(t) : this.nXt.ActorTransform;
      return e.FromUeVector(t.TransformPosition(e.ToUeVector())), e;
    }
    GetSocketLocationOffset(t) {
      switch (this.Config.Config.Type) {
        case IComponent_1.EItemFoundation.CategoryMatching:
          var e = this.nMn(t)?.Animation?.MatchPos;
          return Vector_1.Vector.Create(e?.X ?? 0, e?.Y ?? 0, e?.Z ?? 0);
        case IComponent_1.EItemFoundation.BuildingBlock:
        case IComponent_1.EItemFoundation.PulseDevice:
          var [e, n] = this.oMn.CalcJigsawSocketLocation();
          return (this.rMn = n), e ?? Vector_1.Vector.ZeroVectorProxy;
        default:
          return Vector_1.Vector.ZeroVectorProxy;
      }
    }
    GetSocketName(t) {
      if (
        this.Config.Config.Type ===
        IComponent_1.EItemFoundation.CategoryMatching
      )
        return this.nMn(t)?.Animation?.MatchReferenceKey;
    }
    GetIsNeedAttach() {
      return (
        this.Config.Config.Type ===
        IComponent_1.EItemFoundation.CategoryMatching
      );
    }
    GetCurrentLockLocation() {
      switch (this.Config.Config.Type) {
        case IComponent_1.EItemFoundation.CategoryMatching:
          return;
        case IComponent_1.EItemFoundation.BuildingBlock:
        case IComponent_1.EItemFoundation.PulseDevice:
          return Vector_1.Vector.Create(
            this.oMn.GetBlockLocationByIndex(this.rMn),
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
          var e = t.GetComponent(122);
          this.oMn.AimBlockByIndex(this.rMn, e);
      }
    }
    GetIsIllegal(t) {
      switch (this.Config.Config.Type) {
        case IComponent_1.EItemFoundation.CategoryMatching:
          return !1;
        case IComponent_1.EItemFoundation.BuildingBlock:
        case IComponent_1.EItemFoundation.PulseDevice:
          var e = t.GetComponent(122);
          return this.oMn.CheckJigsawBlockIllegal(e, this.rMn);
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
          var n = t.GetComponent(122);
          return this.oMn.CheckJigsawBlockCorrect(n, e ?? this.rMn);
        default:
          return !0;
      }
    }
    GetMatchSequence(t) {
      t = this.nMn(t);
      if (t) return t.Animation.MatchSequence;
    }
    GetMismatchSequence(t) {
      t = this.nMn(t);
      if (t) return t.Callback.DischargeSequence;
    }
    GetMatchSequenceOffset(t) {
      t = this.nMn(t)?.Animation.MatchSequenceOffset;
      return Vector_1.Vector.Create(t?.X ?? 0, t?.Y ?? 0, t?.Z ?? 0);
    }
    GetSocketRotator(t) {
      var e = this.GetSocketRotatorOffset(t),
        t = FNameUtil_1.FNameUtil.GetDynamicFName(this.GetSocketName(t)),
        t = t ? this.nXt.GetSocketTransform(t) : this.nXt.ActorTransform;
      return Rotator_1.Rotator.Create(
        t.TransformRotation(e.Quaternion().ToUeQuat()).Rotator(),
      );
    }
    GetSocketRotatorOffset(t) {
      switch (this.Config.Config.Type) {
        case IComponent_1.EItemFoundation.CategoryMatching:
          var e = this.nMn(t).Animation.MatchRot;
          return Rotator_1.Rotator.Create(e.Y ?? 0, e.Z ?? 0, e.X ?? 0);
        case IComponent_1.EItemFoundation.BuildingBlock:
        case IComponent_1.EItemFoundation.PulseDevice:
          e = t.GetComponent(122);
          return Rotator_1.Rotator.Create(0, -e.Rotation, 0);
        default:
          return Rotator_1.Rotator.ZeroRotatorProxy;
      }
    }
    nMn(t) {
      if (t?.Valid) {
        let e = void 0;
        if ((e = this.sMn(this.tMn))) return e;
        var n = t.GetComponent(177),
          r = t.GetComponent(0).GetBaseInfo();
        if (r) {
          let t = 0;
          for (const o of this.iMn) {
            if ((0, IUtil_1.isEntitiyMatch)(o[0], r.Category)) {
              if (!o[0].State?.State) {
                (e = o[1]), (this.tMn = t);
                break;
              }
              if (n.ContainsTagByName(o[0].State.State)) {
                (e = o[1]), (this.tMn = t);
                break;
              }
            }
            ++t;
          }
          return e;
        }
      }
    }
    sMn(e) {
      if (!(void 0 === e || e < 0 || e >= this.iMn.size)) {
        var n = this.iMn.values();
        let t = e;
        for (; 0 < --t; ) n.next();
        return n.next().value;
      }
    }
    get EntityInSocket() {
      return this.eMn;
    }
    set EntityInSocket(t) {
      this.eMn = t;
    }
    set MatchCfgIndex(t) {
      this.tMn = void 0 === t ? -1 : t;
    }
    get MatchCfgIndex() {
      return this.tMn;
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemOutletComponent_1)[0];
      if (
        ((this.nXt = this.Entity.GetComponent(182)),
        (this.Config = t),
        this.Config.Config.Type ===
          IComponent_1.EItemFoundation.CategoryMatching)
      )
        for (const n of this.Config.Config.MatchingConfigs) {
          var e = n.Condition.EntityMatch;
          this.iMn.set(e, n);
        }
      return (
        (this.eMn = void 0),
        (this.tMn = 0),
        this.Entity.GetComponent(106).SetLogicRange(
          ConfigManager_1.ConfigManager.ManipulateConfig.SearchRange,
        ),
        !0
      );
    }
    OnStart() {
      this.nXt.Owner.Tags.Add(SCENE_ITEM_OUTLET_TAG),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.gIe,
        );
      var t = this.Entity.GetComponent(177);
      return (
        t.HasTag(-662723379) || t.HasTag(-709838471)
          ? t.AddTag(-1381638598)
          : t.HasTag(-3775711) && t.AddTag(-171146886),
        !0
      );
    }
    OnActivate() {
      return !!(
        (this.Config.Config.Type !==
          IComponent_1.EItemFoundation.BuildingBlock &&
          this.Config.Config.Type !==
            IComponent_1.EItemFoundation.PulseDevice) ||
        ((this.oMn = this.Entity.GetComponent(121)), this.oMn)
      );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.gIe,
        ),
        !0
      );
    }
    CheckMatchManipulatable(t) {
      if (
        this.Config.Config.Type ===
          IComponent_1.EItemFoundation.BuildingBlock ||
        this.Config.Config.Type === IComponent_1.EItemFoundation.PulseDevice
      )
        return !0;
      var e = t?.GetComponent(0)?.GetBaseInfo();
      if (e)
        for (const o of this.iMn)
          if ((0, IUtil_1.isEntitiyMatch)(o[0], e.Category)) {
            if (!(n = o[1]).Condition.SelfState) return !0;
            var n = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
                n.Condition.SelfState,
              ),
              r = this.Entity.GetComponent(177);
            if (r && r.HasTag(n)) return !0;
          }
      return !1;
    }
    ChangeSilentTag() {
      var t = this.Entity.GetComponent(177);
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
      var t = this.Entity.GetComponent(177);
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
          return void 0 === this.eMn;
        case IComponent_1.EItemFoundation.BuildingBlock:
        case IComponent_1.EItemFoundation.PulseDevice:
          return this.oMn.HasEmptySocket();
        default:
          return !1;
      }
    }
    OnPutDownItem(t) {
      switch (this.Config.Config.Type) {
        case IComponent_1.EItemFoundation.CategoryMatching:
          break;
        case IComponent_1.EItemFoundation.BuildingBlock:
        case IComponent_1.EItemFoundation.PulseDevice:
          var e = t.GetComponent(122);
          this.oMn.OnPutDownItem(e, this.rMn, this.Config.Config.Type);
      }
    }
    OnPickUpItem(t) {
      switch (this.Config.Config.Type) {
        case IComponent_1.EItemFoundation.CategoryMatching:
          break;
        case IComponent_1.EItemFoundation.BuildingBlock:
        case IComponent_1.EItemFoundation.PulseDevice:
          var e = t.GetComponent(122);
          this.oMn.OnPickUpItem(e, this.Config.Config.Type);
      }
    }
    GetCurrentChooseIndex() {
      return this.rMn;
    }
  });
(SceneItemOutletComponent = SceneItemOutletComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(145)],
    SceneItemOutletComponent,
  )),
  (exports.SceneItemOutletComponent = SceneItemOutletComponent);
//# sourceMappingURL=SceneItemOutletComponent.js.map

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
        (this.n$t = void 0),
        (this.xvn = void 0),
        (this.wvn = -1),
        (this.Bvn = new Map()),
        (this.bvn = void 0),
        (this.qvn = void 0),
        (this.gIe = (t, e) => {
          const n = this.Entity.GetComponent(180);
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
          var [e, n] = this.bvn.CalcJigsawSocketLocation();
          return (this.qvn = n), e ?? Vector_1.Vector.ZeroVectorProxy;
        default:
          return Vector_1.Vector.ZeroVectorProxy;
      }
    }
    GetSocketName(t) {
      if (
        this.Config.Config.Type ===
        IComponent_1.EItemFoundation.CategoryMatching
      )
        return this.Gvn(t)?.Animation?.MatchReferenceKey;
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
          var e = t.GetComponent(124);
          this.bvn.AimBlockByIndex(this.qvn, e);
      }
    }
    GetIsIllegal(t) {
      switch (this.Config.Config.Type) {
        case IComponent_1.EItemFoundation.CategoryMatching:
          return !1;
        case IComponent_1.EItemFoundation.BuildingBlock:
        case IComponent_1.EItemFoundation.PulseDevice:
          var e = t.GetComponent(124);
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
          var n = t.GetComponent(124);
          return this.bvn.CheckJigsawBlockCorrect(n, e ?? this.qvn);
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
          e = t.GetComponent(124);
          return Rotator_1.Rotator.Create(0, -e.Rotation, 0);
        default:
          return Rotator_1.Rotator.ZeroRotatorProxy;
      }
    }
    Gvn(e) {
      if (e?.Valid) {
        let t = void 0;
        if ((t = this.Nvn(this.wvn))) return t;
        var n = e.GetComponent(180),
          r = e.GetComponent(0).GetBaseInfo();
        if (r) {
          for (const o of this.Bvn)
            if ((0, IUtil_1.isEntitiyMatch)(o[0], r.Category)) {
              if (!o[0].State?.State) {
                (t = o[1]), (this.wvn = -1);
                break;
              }
              if (n.ContainsTagByName(o[0].State.State)) {
                (t = o[1]), (this.wvn = -1);
                break;
              }
            }
          return t;
        }
      }
    }
    Nvn(e) {
      if (!(void 0 === e || e < 0 || e >= this.Bvn.size)) {
        var n = this.Bvn.values();
        let t = e;
        for (; 0 <= --t; ) n.next();
        return n.next().value;
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
        ((this.n$t = this.Entity.GetComponent(185)),
        (this.Config = t),
        this.Config.Config.Type ===
          IComponent_1.EItemFoundation.CategoryMatching)
      )
        for (const n of this.Config.Config.MatchingConfigs) {
          var e = n.Condition.EntityMatch;
          this.Bvn.set(e, n);
        }
      return (
        (this.xvn = void 0),
        (this.wvn = -1),
        this.Entity.GetComponent(108).SetLogicRange(
          ConfigManager_1.ConfigManager.ManipulateConfig.SearchRange,
        ),
        !0
      );
    }
    OnStart() {
      this.n$t.Owner.Tags.Add(SCENE_ITEM_OUTLET_TAG),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.gIe,
        );
      var t = this.Entity.GetComponent(180);
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
        ((this.bvn = this.Entity.GetComponent(123)), this.bvn)
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
        for (const o of this.Bvn)
          if ((0, IUtil_1.isEntitiyMatch)(o[0], e.Category)) {
            if (!(n = o[1]).Condition.SelfState) return !0;
            var n = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
                n.Condition.SelfState,
              ),
              r = this.Entity.GetComponent(180);
            if (r && r.HasTag(n)) return !0;
          }
      return !1;
    }
    ChangeSilentTag() {
      var t = this.Entity.GetComponent(180);
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
      var t = this.Entity.GetComponent(180);
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
          return void 0 === this.xvn;
        case IComponent_1.EItemFoundation.BuildingBlock:
        case IComponent_1.EItemFoundation.PulseDevice:
          return this.bvn.HasEmptySocket();
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
          var e = t.GetComponent(124);
          this.bvn.OnPutDownItem(e, this.qvn, this.Config.Config.Type);
      }
    }
    OnPickUpItem(t) {
      switch (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            32,
            "[CharacterManipulateComp] OnPickUpItem",
            ["PbDataId", t.GetComponent(0)?.GetPbDataId()],
            ["Type", this.Config.Config.Type],
          ),
        this.Config.Config.Type)
      ) {
        case IComponent_1.EItemFoundation.CategoryMatching:
          break;
        case IComponent_1.EItemFoundation.BuildingBlock:
        case IComponent_1.EItemFoundation.PulseDevice:
          var e = t.GetComponent(124);
          this.bvn.OnPickUpItem(e, this.Config.Config.Type);
      }
    }
    GetCurrentChooseIndex() {
      return this.qvn;
    }
  });
(SceneItemOutletComponent = SceneItemOutletComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(147)],
    SceneItemOutletComponent,
  )),
  (exports.SceneItemOutletComponent = SceneItemOutletComponent);
//# sourceMappingURL=SceneItemOutletComponent.js.map

"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, r) {
    var s,
      o = arguments.length,
      n =
        o < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, i, r);
    else
      for (var a = t.length - 1; 0 <= a; a--)
        (s = t[a]) && (n = (o < 3 ? s(n) : 3 < o ? s(e, i, n) : s(e, i)) || n);
    return 3 < o && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemMultiInteractionActorComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Queue_1 = require("../../../Core/Container/Queue"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  GlobalData_1 = require("../../GlobalData"),
  SceneInteractionLevel_1 = require("../../Render/Scene/Item/SceneInteractionLevel"),
  AttachToActorController_1 = require("../../World/Controller/AttachToActorController"),
  ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController"),
  MultiInteractionActorController_1 = require("../../World/Controller/MultiInteractionActorController"),
  CharacterNameDefines_1 = require("../Character/Common/CharacterNameDefines"),
  SceneItemJigsawBaseComponent_1 = require("./Jigsaw/SceneItemJigsawBaseComponent"),
  defaultTagId = -821437887,
  MAX_GEN_TIME = 3,
  needForwardTagIds = [1408918695, -1278190765];
class InteractionData {
  constructor(t, e) {
    (this.States = void 0),
      (this.Effects = void 0),
      (this.States = t),
      (this.Effects = e);
  }
}
let SceneItemMultiInteractionActorComponent = class SceneItemMultiInteractionActorComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.Lie = void 0),
      (this.nXr = void 0),
      (this.gU = !1),
      (this.hvn = !1),
      (this.Ixe = void 0),
      (this.lvn = void 0),
      (this._vn = new Map()),
      (this.uvn = void 0),
      (this.cvn = new Map()),
      (this.mvn = new Map()),
      (this.dvn = new Map()),
      (this.Cvn = new Map()),
      (this.rnn = new Map()),
      (this.qyn = !1),
      (this.gvn = new Queue_1.Queue()),
      (this.gIe = (t, e) => {
        if (e)
          for (var [i] of this.dvn)
            this.AddTagsByIndex(
              SceneItemJigsawBaseComponent_1.JigsawIndex.GenObjFromKey(i),
              t,
            );
        else
          for (var [r] of this.dvn)
            this.RemoveTagsByIndex(
              SceneItemJigsawBaseComponent_1.JigsawIndex.GenObjFromKey(r),
              t,
            );
      }),
      (this.fvn = () => {
        let t = 0;
        if (this.lvn)
          for (; t < MAX_GEN_TIME; ) {
            if (this.lvn.length <= 0)
              return (
                this.pvn(),
                void ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
                  this,
                )
              );
            var e = this.lvn.shift();
            this.vvn(e, this.Ixe.MainActor), t++;
          }
        else
          ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
            this,
          );
      });
  }
  OnStart() {
    return (
      (this.Hte = this.Entity.GetComponent(187)),
      (this.Lie = this.Entity.GetComponent(190)),
      !0
    );
  }
  pvn() {
    for (this.hvn = !0; !this.gvn.Empty; ) {
      var t = this.gvn.Pop();
      t.Func(t.Index, t.TagIds);
    }
    var e = UE.NewArray(UE.Transform),
      i = this.Ixe?.MainActor;
    if (i?.CollisionActors?.Num()) {
      i = i.CollisionActors?.Get(0);
      if (i)
        if (i.StaticMeshComponent?.StaticMesh) {
          for (var [, r] of this.dvn) {
            var s = this.Hte?.ActorTransform,
              r = r.GetTransform().GetRelativeTransform(s);
            e.Add(r);
          }
          var o = this.Hte?.Owner;
          o &&
            (o = o.GetComponentByClass(UE.StaticMeshComponent.StaticClass())) &&
            (UE.KuroStaticMeshLibrary.MergeSimpleCollisions(
              i.StaticMeshComponent,
              e,
            ),
            o.SetStaticMesh(i.StaticMeshComponent?.StaticMesh));
          for (const n of needForwardTagIds)
            this.Lie.AddTagAddOrRemoveListener(n, this.gIe);
        }
    }
  }
  OnEnd() {
    for (const i of needForwardTagIds)
      this.Lie.RemoveTagAddOrRemoveListener(i, this.gIe);
    for (var [, t] of this.dvn)
      MultiInteractionActorController_1.MultiInteractionActorController.AddWaitDestroyActor(
        t,
      );
    var e;
    return (
      this.dvn.clear(),
      this.Ixe?.MainActor?.IsValid() &&
        ((e = this.Ixe.MainActor),
        MultiInteractionActorController_1.MultiInteractionActorController.AddWaitDestroyActor(
          e,
        )),
      !0
    );
  }
  vvn(i, t) {
    var e = this.uvn(i);
    const r = UE.KuroStaticLibrary.SpawnActorFromAnother(t, this.Hte.Owner);
    if (r?.IsValid()) {
      AttachToActorController_1.AttachToActorController.AttachToActor(
        r,
        this.Hte.Owner,
        2,
        "SceneItemMultiInteractionActorComponent.GenerateActorInternal",
        void 0,
        2,
        2,
        2,
        !1,
        !1,
      );
      t = t.K2_GetActorRotation();
      r.K2_SetActorLocationAndRotation(e.ToUeVector(), t, !1, void 0, !0),
        this.cvn.clear(),
        this.Mvn(r),
        this.Evn(r),
        this.Svn(r, r);
      const s = i.GetKey();
      this.dvn.set(s, r),
        GlobalData_1.GlobalData.IsPlayInEditor && (r.ActorLabel = s),
        TimerSystem_1.TimerSystem.Next(() => {
          if ((this.qnn(i), this._vn.has(s))) {
            const e = this._vn.get(s);
            this._vn.delete(s);
            let t = this.Cvn.get(s);
            (t = (t = t || []).concat(e)), this.Cvn.set(s, t);
          }
          const e = this.Cvn.get(s);
          if (void 0 !== e)
            for (const t of e)
              r.PlayExtraEffectOnTagsChange(
                GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t),
              ),
                this.yvn(i, t, !0);
        });
    }
  }
  Ivn(t) {
    var e = this.nXr.场景交互物状态列表;
    for (const r of t) {
      var i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r),
        i = e.Get(i);
      if (void 0 !== i) return i;
    }
    return 21;
  }
  Mvn(t) {
    var e = (0, puerts_1.$ref)(UE.NewArray(UE.Actor)),
      i = (t.GetAttachedActors(e, !0), (0, puerts_1.$unref)(e));
    for (let t = 0; t < i.Num(); t++) this.Mvn(i.Get(t));
    this.cvn.set(t.GetOwner(), t);
  }
  Evn(e) {
    for (let t = 0; t < e.States.Num(); t++) {
      var i,
        r = e.States.GetKey(t),
        s = e.States.Get(r);
      for (let t = 0; t < s.Effects.Num(); t++) {
        const e = s.Effects.Get(t);
        this.cvn.has(e) && ((i = this.cvn.get(e)), s.Effects.Set(t, i));
      }
      for (let t = 0; t < s.Actors.Num(); t++) {
        const e = s.Actors.Get(t);
        this.cvn.has(e) && s.Actors.Set(t, this.cvn.get(e));
      }
      for (let t = 0; t < s.HideActors.Num(); t++) {
        const e = s.HideActors.Get(t);
        this.cvn.has(e) && s.HideActors.Set(t, this.cvn.get(e));
      }
      for (let t = 0; t < s.MaterialControllers.Num(); t++) {
        var o = s.MaterialControllers.Get(t);
        for (let t = 0; t < o.Actors.Num(); t++) {
          const e = o.Actors.Get(t);
          this.cvn.has(e) && o.Actors.Set(t, this.cvn.get(e));
        }
      }
      for (let t = 0; t < s.StateBasedEffect.Num(); t++) {
        var n,
          a = s.StateBasedEffect.Get(t);
        const e = a.StateBasedEffect;
        this.cvn.has(e) && ((n = this.cvn.get(e)), (a.StateBasedEffect = n));
      }
    }
    for (let t = 0; t < e.Effects.Num(); t++) {
      var h = e.Effects.GetKey(t),
        l = e.Effects.Get(h);
      for (let t = 0; t < l.Material.Actors.Num(); t++) {
        const e = l.Material.Actors.Get(t);
        this.cvn.has(e) && l.Material.Actors.Set(t, this.cvn.get(e));
      }
      this.cvn.has(l.Effect) && ((h = this.cvn.get(l.Effect)), (l.Effect = h));
    }
    for (let t = 0; t < e.TagsAndCorrespondingEffects.Num(); t++) {
      var c = e.TagsAndCorrespondingEffects.GetKey(t),
        f = e.TagsAndCorrespondingEffects.Get(c);
      for (let t = 0; t < f.Actors.Num(); t++) {
        const e = f.Actors.Get(t);
        this.cvn.has(e) && f.Actors.Set(t, this.cvn.get(e));
      }
      for (let t = 0; t < f.Effects.Num(); t++) {
        var _ = f.Effects.Get(t);
        this.cvn.has(_) && ((_ = this.cvn.get(_)), f.Effects.Set(t, _));
      }
      for (let t = 0; t < f.HideActors.Num(); t++) {
        var v = f.HideActors.Get(t);
        this.cvn.has(v) && f.HideActors.Set(t, this.cvn.get(v));
      }
      for (let t = 0; t < f.MaterialControllers.Num(); t++) {
        var p = f.MaterialControllers.Get(t);
        for (let t = 0; t < p.Actors.Num(); t++) {
          var u = p.Actors.Get(t);
          this.cvn.has(u) && p.Actors.Set(t, this.cvn.get(u));
        }
      }
    }
    this.mvn.set(e, new InteractionData(e.States, e.Effects));
  }
  Svn(t, e) {
    var i = (0, puerts_1.$ref)(UE.NewArray(UE.Actor)),
      r = (t.GetAttachedActors(i, !0), (0, puerts_1.$unref)(i));
    for (let t = 0; t < r.Num(); t++) this.Svn(r.Get(t), e);
    t.Owner = e;
  }
  InitGenerateInfo(t, e, i, r) {
    (this.nXr = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(0, t)),
      (this.lvn = e),
      (this.uvn = i),
      void 0 !== r && (this.Cvn = r),
      this.InitLevelDynamic(this.Hte.ActorLocation, this.Hte.ActorRotation),
      (this.gU = !0);
  }
  InitLevelDynamic(t, e) {
    var i = GlobalData_1.GlobalData.World;
    let r = this.nXr.场景交互物.AssetPathName?.toString();
    r.includes(".") && (r = r.split(".")[0]);
    var s = (0, puerts_1.$ref)(!1),
      i = UE.LevelStreamingDynamic.LoadLevelInstance(i, r, t, e, s),
      s = (0, puerts_1.$unref)(s),
      o = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(defaultTagId),
      o = this.nXr.场景交互物状态列表.Get(o);
    s &&
      i &&
      ((this.Ixe = new SceneInteractionLevel_1.SceneInteractionLevel()),
      this.Ixe.Init(
        i,
        r,
        t,
        e,
        -1,
        o,
        () => {
          this.Txe();
        },
        !0,
      ));
  }
  Txe() {
    this.Ixe.AttachToActor(this.Hte.Owner),
      GlobalData_1.GlobalData.IsPlayInEditor &&
        (this.Ixe.MainActor.ActorLabel = "Template:" + this.Ixe.LevelName);
    var i = this.Ixe.GetAllActorsInLevel();
    if (i)
      for (let t = 0, e = i.Num(); t < e; t++) {
        var r = i.Get(t);
        r instanceof UE.StaticMeshActor &&
          (r.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE),
          r.StaticMeshComponent?.SetReceivesDecals(!1),
          r.SetActorHiddenInGame(!0),
          r.SetActorEnableCollision(!1));
      }
    this.Active
      ? this.lvn &&
        ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
          this,
          this.fvn,
        )
      : (this.qyn = !0);
  }
  OnEnable() {
    this.qyn &&
      this.lvn &&
      (ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
        this,
        this.fvn,
      ),
      (this.qyn = !1));
  }
  IsChildrenActor(t) {
    return this.mvn.has(t.Owner);
  }
  GetInteractionActorByIndex(t) {
    return this.dvn.get(t.GetKey());
  }
  AddTagsByIndex(i, r) {
    var s = this.dvn.get(i.GetKey());
    if (s?.IsValid() || !this.hvn) {
      var o = this.hvn ? this.Cvn : this._vn;
      let t = o.get(i.GetKey()),
        e = (t || ((t = []), o.set(i.GetKey(), t)), -1);
      if (Array.isArray(r))
        for (const n of r)
          (e = t.indexOf(n)) < 0 &&
            (t.push(n), this.hvn) &&
            (s.PlayExtraEffectOnTagsChange(
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(n),
            ),
            this.yvn(i, n, !0));
      else
        (e = t.indexOf(r)) < 0 &&
          (t.push(r), this.hvn) &&
          (s.PlayExtraEffectOnTagsChange(
            GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r),
          ),
          this.yvn(i, r, !0));
      this.hvn && this.qnn(i);
    }
  }
  RemoveTagsByIndex(i, r) {
    var s = this.dvn.get(i.GetKey());
    if (s?.IsValid() || !this.hvn) {
      var o = this.hvn ? this.Cvn : this._vn;
      let t = o.get(i.GetKey()),
        e = (t || ((t = []), o.set(i.GetKey(), t)), -1);
      if (Array.isArray(r))
        for (const n of r)
          -1 < (e = t.indexOf(n)) &&
            (t.splice(e, 1), this.hvn) &&
            (s.StopExtraEffectOnTagsChange(
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(n),
            ),
            this.yvn(i, n, !1));
      else
        -1 < (e = t.indexOf(r)) &&
          (t.splice(e, 1), this.hvn) &&
          (s.StopExtraEffectOnTagsChange(
            GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r),
          ),
          this.yvn(i, r, !1));
      this.hvn && this.qnn(i);
    }
  }
  HasTagByIndex(t, e) {
    t = (this.hvn ? this.Cvn : this._vn).get(t.GetKey());
    return !!t && -1 < t.indexOf(e);
  }
  yvn(t, e, i) {
    let r = this.rnn.get(t.GetKey());
    var s = this.dvn.get(t.GetKey());
    i
      ? (void 0 === r && ((r = new Map()), this.rnn.set(t.GetKey(), r)),
        r.has(e) ||
          ((i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e)),
          void 0 !== (t = this.nXr.场景交互物特效列表.Get(i)) &&
            (s.PlayIndependentEffect(t), r.set(e, t))))
      : void 0 !== r &&
        0 !== r.size &&
        r.has(e) &&
        ((i = r.get(e)),
        r.delete(e),
        s.EndIndependentEffect(i),
        s.PlayIndependentEndEffect(i));
  }
  qnn(t) {
    var t = t.GetKey(),
      e = this.dvn.get(t);
    let i = [],
      r = 21;
    this.Cvn.has(t) && (i = this.Cvn.get(t)),
      21 === (r = 0 < i?.length ? this.Ivn(i) : r) &&
        ((t =
          GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(defaultTagId)),
        (r = this.nXr.场景交互物状态列表.Get(t))),
      e.SetState(r, !0, !1);
  }
  DynamicRemoveActorByIndex(t) {
    var e, i;
    this.hvn
      ? ((e = t.GetKey()),
        void 0 !== (i = this.dvn.get(e)) &&
          (this.dvn.delete(e), i.DestroySelf()))
      : this.gvn.Push({
          Func: (t) => {
            this.DynamicRemoveActorByIndex(t);
          },
          Index: t,
          TagIds: [],
        });
  }
  DynamicAddActorByIndex(e, i) {
    if (this.hvn) {
      var r = e.GetKey();
      let t = this.Cvn.get(r);
      (t = (t = t || []).concat(i)),
        this.Cvn.set(r, t),
        this.vvn(e, this.Ixe.MainActor);
    } else
      this.gvn.Push({
        Func: (t, e) => {
          this.DynamicAddActorByIndex(t, e);
        },
        Index: e,
        TagIds: i,
      });
  }
  GetIsInit() {
    return this.gU;
  }
  GetIsFinish() {
    return this.hvn;
  }
  SetIsFinish(t) {
    this.hvn = t;
  }
};
(SceneItemMultiInteractionActorComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(146)],
  SceneItemMultiInteractionActorComponent,
)),
  (exports.SceneItemMultiInteractionActorComponent =
    SceneItemMultiInteractionActorComponent);
//# sourceMappingURL=SceneItemMultiInteractionActorComponent.js.map

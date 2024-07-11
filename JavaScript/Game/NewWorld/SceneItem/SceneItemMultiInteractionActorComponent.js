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
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData"),
  SceneInteractionLevel_1 = require("../../Render/Scene/Item/SceneInteractionLevel"),
  AttachToActorController_1 = require("../../World/Controller/AttachToActorController"),
  ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController"),
  MultiInteractionActorController_1 = require("../../World/Controller/MultiInteractionActorController"),
  CharacterNameDefines_1 = require("../Character/Common/CharacterNameDefines"),
  SceneItemJigsawBaseComponent_1 = require("./Jigsaw/SceneItemJigsawBaseComponent"),
  defaultTagId = -821437887,
  MAX_GEN_TIME = 3;
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
      (this.TXr = void 0),
      (this.gU = !1),
      (this.Uvn = !1),
      (this.Ixe = void 0),
      (this.Pvn = void 0),
      (this.xvn = new Map()),
      (this.wvn = void 0),
      (this.Bvn = new Map()),
      (this.bvn = new Map()),
      (this.qvn = new Map()),
      (this.Gvn = new Map()),
      (this.ynn = new Map()),
      (this.UEn = !1),
      (this.Nvn = new Queue_1.Queue()),
      (this.gIe = (t, e) => {
        for (const s of [1408918695, -1278190765]) {
          if (t.includes(s))
            for (var [i] of this.qvn)
              this.AddTagsByIndex(
                SceneItemJigsawBaseComponent_1.JigsawIndex.GenObjFromKey(i),
                s,
              );
          if (e.includes(s))
            for (var [r] of this.qvn)
              this.RemoveTagsByIndex(
                SceneItemJigsawBaseComponent_1.JigsawIndex.GenObjFromKey(r),
                s,
              );
        }
      }),
      (this.Ovn = () => {
        let t = 0;
        if (this.Pvn)
          for (; t < MAX_GEN_TIME; ) {
            if (this.Pvn.length <= 0)
              return (
                this.kvn(),
                void ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
                  this,
                )
              );
            var e = this.Pvn.shift();
            this.Fvn(e, this.Ixe.MainActor), t++;
          }
        else
          ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
            this,
          );
      });
  }
  OnStart() {
    return (this.Hte = this.Entity.GetComponent(182)), !0;
  }
  kvn() {
    for (this.Uvn = !0; !this.Nvn.Empty; ) {
      var t = this.Nvn.Pop();
      t.Func(t.Index, t.TagIds);
    }
    var e = UE.NewArray(UE.Transform),
      i = this.Ixe?.MainActor;
    if (i?.CollisionActors?.Num()) {
      i = i.CollisionActors?.Get(0);
      if (i)
        if (i.StaticMeshComponent?.StaticMesh) {
          for (var [, r] of this.qvn) {
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
            o.SetStaticMesh(i.StaticMeshComponent?.StaticMesh)),
            EventSystem_1.EventSystem.AddWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnLevelTagChanged,
              this.gIe,
            );
        }
    }
  }
  OnEnd() {
    EventSystem_1.EventSystem.HasWithTarget(
      this.Entity,
      EventDefine_1.EEventName.OnLevelTagChanged,
      this.gIe,
    ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnLevelTagChanged,
        this.gIe,
      );
    for (var [, t] of this.qvn)
      MultiInteractionActorController_1.MultiInteractionActorController.AddWaitDestroyActor(
        t,
      );
    var e;
    return (
      this.qvn.clear(),
      this.Ixe?.MainActor?.IsValid() &&
        ((e = this.Ixe.MainActor),
        MultiInteractionActorController_1.MultiInteractionActorController.AddWaitDestroyActor(
          e,
        )),
      !0
    );
  }
  Fvn(i, t) {
    var e = this.wvn(i);
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
        this.Bvn.clear(),
        this.Vvn(r),
        this.Hvn(r),
        this.jvn(r, r);
      const s = i.GetKey();
      this.qvn.set(s, r),
        GlobalData_1.GlobalData.IsPlayInEditor && (r.ActorLabel = s),
        TimerSystem_1.TimerSystem.Next(() => {
          if ((this.tsn(i), this.xvn.has(s))) {
            const e = this.xvn.get(s);
            this.xvn.delete(s);
            let t = this.Gvn.get(s);
            (t = (t = t || []).concat(e)), this.Gvn.set(s, t);
          }
          const e = this.Gvn.get(s);
          if (void 0 !== e)
            for (const t of e)
              r.PlayExtraEffectOnTagsChange(
                GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t),
              ),
                this.Wvn(i, t, !0);
        });
    }
  }
  Kvn(t) {
    var e = this.TXr.场景交互物状态列表;
    for (const r of t) {
      var i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r),
        i = e.Get(i);
      if (void 0 !== i) return i;
    }
    return 21;
  }
  Vvn(t) {
    var e = (0, puerts_1.$ref)(UE.NewArray(UE.Actor)),
      i = (t.GetAttachedActors(e, !0), (0, puerts_1.$unref)(e));
    for (let t = 0; t < i.Num(); t++) this.Vvn(i.Get(t));
    this.Bvn.set(t.GetOwner(), t);
  }
  Hvn(e) {
    for (let t = 0; t < e.States.Num(); t++) {
      var i,
        r = e.States.GetKey(t),
        s = e.States.Get(r);
      for (let t = 0; t < s.Effects.Num(); t++) {
        const e = s.Effects.Get(t);
        this.Bvn.has(e) && ((i = this.Bvn.get(e)), s.Effects.Set(t, i));
      }
      for (let t = 0; t < s.Actors.Num(); t++) {
        const e = s.Actors.Get(t);
        this.Bvn.has(e) && s.Actors.Set(t, this.Bvn.get(e));
      }
      for (let t = 0; t < s.HideActors.Num(); t++) {
        const e = s.HideActors.Get(t);
        this.Bvn.has(e) && s.HideActors.Set(t, this.Bvn.get(e));
      }
      for (let t = 0; t < s.MaterialControllers.Num(); t++) {
        var o = s.MaterialControllers.Get(t);
        for (let t = 0; t < o.Actors.Num(); t++) {
          const e = o.Actors.Get(t);
          this.Bvn.has(e) && o.Actors.Set(t, this.Bvn.get(e));
        }
      }
      for (let t = 0; t < s.StateBasedEffect.Num(); t++) {
        var n,
          a = s.StateBasedEffect.Get(t);
        const e = a.StateBasedEffect;
        this.Bvn.has(e) && ((n = this.Bvn.get(e)), (a.StateBasedEffect = n));
      }
    }
    for (let t = 0; t < e.Effects.Num(); t++) {
      var h = e.Effects.GetKey(t),
        l = e.Effects.Get(h);
      for (let t = 0; t < l.Material.Actors.Num(); t++) {
        const e = l.Material.Actors.Get(t);
        this.Bvn.has(e) && l.Material.Actors.Set(t, this.Bvn.get(e));
      }
      this.Bvn.has(l.Effect) && ((h = this.Bvn.get(l.Effect)), (l.Effect = h));
    }
    for (let t = 0; t < e.TagsAndCorrespondingEffects.Num(); t++) {
      var c = e.TagsAndCorrespondingEffects.GetKey(t),
        v = e.TagsAndCorrespondingEffects.Get(c);
      for (let t = 0; t < v.Actors.Num(); t++) {
        const e = v.Actors.Get(t);
        this.Bvn.has(e) && v.Actors.Set(t, this.Bvn.get(e));
      }
      for (let t = 0; t < v.Effects.Num(); t++) {
        var _ = v.Effects.Get(t);
        this.Bvn.has(_) && ((_ = this.Bvn.get(_)), v.Effects.Set(t, _));
      }
      for (let t = 0; t < v.HideActors.Num(); t++) {
        var f = v.HideActors.Get(t);
        this.Bvn.has(f) && v.HideActors.Set(t, this.Bvn.get(f));
      }
      for (let t = 0; t < v.MaterialControllers.Num(); t++) {
        var m = v.MaterialControllers.Get(t);
        for (let t = 0; t < m.Actors.Num(); t++) {
          var u = m.Actors.Get(t);
          this.Bvn.has(u) && m.Actors.Set(t, this.Bvn.get(u));
        }
      }
    }
    this.bvn.set(e, new InteractionData(e.States, e.Effects));
  }
  jvn(t, e) {
    var i = (0, puerts_1.$ref)(UE.NewArray(UE.Actor)),
      r = (t.GetAttachedActors(i, !0), (0, puerts_1.$unref)(i));
    for (let t = 0; t < r.Num(); t++) this.jvn(r.Get(t), e);
    t.Owner = e;
  }
  InitGenerateInfo(t, e, i, r) {
    (this.TXr = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(0, t)),
      (this.Pvn = e),
      (this.wvn = i),
      void 0 !== r && (this.Gvn = r),
      this.InitLevelDynamic(this.Hte.ActorLocation, this.Hte.ActorRotation),
      (this.gU = !0);
  }
  InitLevelDynamic(t, e) {
    var i = GlobalData_1.GlobalData.World;
    let r = this.TXr.场景交互物.AssetPathName?.toString();
    r.includes(".") && (r = r.split(".")[0]);
    var s = (0, puerts_1.$ref)(!1),
      i = UE.LevelStreamingDynamic.LoadLevelInstance(i, r, t, e, s),
      s = (0, puerts_1.$unref)(s),
      o = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(defaultTagId),
      o = this.TXr.场景交互物状态列表.Get(o);
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
      ? this.Pvn &&
        ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
          this,
          this.Ovn,
        )
      : (this.UEn = !0);
  }
  OnEnable() {
    this.UEn &&
      this.Pvn &&
      (ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
        this,
        this.Ovn,
      ),
      (this.UEn = !1));
  }
  IsChildrenActor(t) {
    return this.bvn.has(t.Owner);
  }
  GetInteractionActorByIndex(t) {
    return this.qvn.get(t.GetKey());
  }
  AddTagsByIndex(i, r) {
    var s = this.qvn.get(i.GetKey());
    if (s?.IsValid() || !this.Uvn) {
      var o = this.Uvn ? this.Gvn : this.xvn;
      let t = o.get(i.GetKey()),
        e = (t || ((t = []), o.set(i.GetKey(), t)), -1);
      if (Array.isArray(r))
        for (const n of r)
          (e = t.indexOf(n)) < 0 &&
            (t.push(n), this.Uvn) &&
            (s.PlayExtraEffectOnTagsChange(
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(n),
            ),
            this.Wvn(i, n, !0));
      else
        (e = t.indexOf(r)) < 0 &&
          (t.push(r), this.Uvn) &&
          (s.PlayExtraEffectOnTagsChange(
            GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r),
          ),
          this.Wvn(i, r, !0));
      this.Uvn && this.tsn(i);
    }
  }
  RemoveTagsByIndex(i, r) {
    var s = this.qvn.get(i.GetKey());
    if (s?.IsValid() || !this.Uvn) {
      var o = this.Uvn ? this.Gvn : this.xvn;
      let t = o.get(i.GetKey()),
        e = (t || ((t = []), o.set(i.GetKey(), t)), -1);
      if (Array.isArray(r))
        for (const n of r)
          -1 < (e = t.indexOf(n)) &&
            (t.splice(e, 1), this.Uvn) &&
            (s.StopExtraEffectOnTagsChange(
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(n),
            ),
            this.Wvn(i, n, !1));
      else
        -1 < (e = t.indexOf(r)) &&
          (t.splice(e, 1), this.Uvn) &&
          (s.StopExtraEffectOnTagsChange(
            GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r),
          ),
          this.Wvn(i, r, !1));
      this.Uvn && this.tsn(i);
    }
  }
  HasTagByIndex(t, e) {
    t = (this.Uvn ? this.Gvn : this.xvn).get(t.GetKey());
    return !!t && -1 < t.indexOf(e);
  }
  Wvn(t, e, i) {
    let r = this.ynn.get(t.GetKey());
    var s = this.qvn.get(t.GetKey());
    i
      ? (void 0 === r && ((r = new Map()), this.ynn.set(t.GetKey(), r)),
        r.has(e) ||
          ((i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e)),
          void 0 !== (t = this.TXr.场景交互物特效列表.Get(i)) &&
            (s.PlayIndependentEffect(t), r.set(e, t))))
      : void 0 !== r &&
        0 !== r.size &&
        r.has(e) &&
        ((i = r.get(e)),
        r.delete(e),
        s.EndIndependentEffect(i),
        s.PlayIndependentEndEffect(i));
  }
  tsn(t) {
    var t = t.GetKey(),
      e = this.qvn.get(t);
    let i = [],
      r = 21;
    this.Gvn.has(t) && (i = this.Gvn.get(t)),
      21 === (r = 0 < i?.length ? this.Kvn(i) : r) &&
        ((t =
          GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(defaultTagId)),
        (r = this.TXr.场景交互物状态列表.Get(t))),
      e.SetState(r, !0, !1);
  }
  DynamicRemoveActorByIndex(t) {
    var e, i;
    this.Uvn
      ? ((e = t.GetKey()),
        void 0 !== (i = this.qvn.get(e)) &&
          (this.qvn.delete(e), i.DestroySelf()))
      : this.Nvn.Push({
          Func: (t) => {
            this.DynamicRemoveActorByIndex(t);
          },
          Index: t,
          TagIds: [],
        });
  }
  DynamicAddActorByIndex(e, i) {
    if (this.Uvn) {
      var r = e.GetKey();
      let t = this.Gvn.get(r);
      (t = (t = t || []).concat(i)),
        this.Gvn.set(r, t),
        this.Fvn(e, this.Ixe.MainActor);
    } else
      this.Nvn.Push({
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
    return this.Uvn;
  }
  SetIsFinish(t) {
    this.Uvn = t;
  }
};
(SceneItemMultiInteractionActorComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(143)],
  SceneItemMultiInteractionActorComponent,
)),
  (exports.SceneItemMultiInteractionActorComponent =
    SceneItemMultiInteractionActorComponent);
//# sourceMappingURL=SceneItemMultiInteractionActorComponent.js.map

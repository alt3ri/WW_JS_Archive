"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, r) {
    let s;
    const o = arguments.length;
    let n =
      o < 3 ? e : r === null ? (r = Object.getOwnPropertyDescriptor(e, i)) : r;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      n = Reflect.decorate(t, e, i, r);
    else
      for (let a = t.length - 1; a >= 0; a--)
        (s = t[a]) && (n = (o < 3 ? s(n) : o > 3 ? s(e, i, n) : s(e, i)) || n);
    return o > 3 && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemMultiInteractionActorComponent = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Queue_1 = require("../../../Core/Container/Queue");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const SceneInteractionLevel_1 = require("../../Render/Scene/Item/SceneInteractionLevel");
const AttachToActorController_1 = require("../../World/Controller/AttachToActorController");
const ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController");
const MultiInteractionActorController_1 = require("../../World/Controller/MultiInteractionActorController");
const CharacterNameDefines_1 = require("../Character/Common/CharacterNameDefines");
const SceneItemJigsawBaseComponent_1 = require("./Jigsaw/SceneItemJigsawBaseComponent");
const defaultTagId = -821437887;
const MAX_GEN_TIME = 3;
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
            for (const [i] of this.qvn)
              this.AddTagsByIndex(
                SceneItemJigsawBaseComponent_1.JigsawIndex.GenObjFromKey(i),
                s,
              );
          if (e.includes(s))
            for (const [r] of this.qvn)
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
            const e = this.Pvn.shift();
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
      const t = this.Nvn.Pop();
      t.Func(t.Index, t.TagIds);
    }
    const e = UE.NewArray(UE.Transform);
    let i = this.Ixe?.MainActor;
    if (i?.CollisionActors?.Num()) {
      i = i.CollisionActors?.Get(0);
      if (i)
        if (i.StaticMeshComponent?.StaticMesh) {
          for (var [, r] of this.qvn) {
            const s = this.Hte?.ActorTransform;
            var r = r.GetTransform().GetRelativeTransform(s);
            e.Add(r);
          }
          let o = this.Hte?.Owner;
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
    for (const [, t] of this.qvn)
      MultiInteractionActorController_1.MultiInteractionActorController.AddWaitDestroyActor(
        t,
      );
    let e;
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
    const e = this.wvn(i);
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
    const e = this.TXr.场景交互物状态列表;
    for (const r of t) {
      var i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r);
      var i = e.Get(i);
      if (void 0 !== i) return i;
    }
    return 21;
  }
  Vvn(t) {
    const e = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
    const i = (t.GetAttachedActors(e, !0), (0, puerts_1.$unref)(e));
    for (let t = 0; t < i.Num(); t++) this.Vvn(i.Get(t));
    this.Bvn.set(t.GetOwner(), t);
  }
  Hvn(e) {
    for (let t = 0; t < e.States.Num(); t++) {
      var i;
      const r = e.States.GetKey(t);
      const s = e.States.Get(r);
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
        const o = s.MaterialControllers.Get(t);
        for (let t = 0; t < o.Actors.Num(); t++) {
          const e = o.Actors.Get(t);
          this.Bvn.has(e) && o.Actors.Set(t, this.Bvn.get(e));
        }
      }
      for (let t = 0; t < s.StateBasedEffect.Num(); t++) {
        var n;
        const a = s.StateBasedEffect.Get(t);
        const e = a.StateBasedEffect;
        this.Bvn.has(e) && ((n = this.Bvn.get(e)), (a.StateBasedEffect = n));
      }
    }
    for (let t = 0; t < e.Effects.Num(); t++) {
      let h = e.Effects.GetKey(t);
      const l = e.Effects.Get(h);
      for (let t = 0; t < l.Material.Actors.Num(); t++) {
        const e = l.Material.Actors.Get(t);
        this.Bvn.has(e) && l.Material.Actors.Set(t, this.Bvn.get(e));
      }
      this.Bvn.has(l.Effect) && ((h = this.Bvn.get(l.Effect)), (l.Effect = h));
    }
    for (let t = 0; t < e.TagsAndCorrespondingEffects.Num(); t++) {
      const c = e.TagsAndCorrespondingEffects.GetKey(t);
      const v = e.TagsAndCorrespondingEffects.Get(c);
      for (let t = 0; t < v.Actors.Num(); t++) {
        const e = v.Actors.Get(t);
        this.Bvn.has(e) && v.Actors.Set(t, this.Bvn.get(e));
      }
      for (let t = 0; t < v.Effects.Num(); t++) {
        let _ = v.Effects.Get(t);
        this.Bvn.has(_) && ((_ = this.Bvn.get(_)), v.Effects.Set(t, _));
      }
      for (let t = 0; t < v.HideActors.Num(); t++) {
        const f = v.HideActors.Get(t);
        this.Bvn.has(f) && v.HideActors.Set(t, this.Bvn.get(f));
      }
      for (let t = 0; t < v.MaterialControllers.Num(); t++) {
        const m = v.MaterialControllers.Get(t);
        for (let t = 0; t < m.Actors.Num(); t++) {
          const u = m.Actors.Get(t);
          this.Bvn.has(u) && m.Actors.Set(t, this.Bvn.get(u));
        }
      }
    }
    this.bvn.set(e, new InteractionData(e.States, e.Effects));
  }
  jvn(t, e) {
    const i = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
    const r = (t.GetAttachedActors(i, !0), (0, puerts_1.$unref)(i));
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
    var s = (0, puerts_1.$ref)(!1);
    var i = UE.LevelStreamingDynamic.LoadLevelInstance(i, r, t, e, s);
    var s = (0, puerts_1.$unref)(s);
    var o =
      GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(defaultTagId);
    var o = this.TXr.场景交互物状态列表.Get(o);
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
    const i = this.Ixe.GetAllActorsInLevel();
    if (i)
      for (let t = 0, e = i.Num(); t < e; t++) {
        const r = i.Get(t);
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
    const s = this.qvn.get(i.GetKey());
    if (s?.IsValid() || !this.Uvn) {
      const o = this.Uvn ? this.Gvn : this.xvn;
      let t = o.get(i.GetKey());
      let e = (t || ((t = []), o.set(i.GetKey(), t)), -1);
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
    const s = this.qvn.get(i.GetKey());
    if (s?.IsValid() || !this.Uvn) {
      const o = this.Uvn ? this.Gvn : this.xvn;
      let t = o.get(i.GetKey());
      let e = (t || ((t = []), o.set(i.GetKey(), t)), -1);
      if (Array.isArray(r))
        for (const n of r)
          (e = t.indexOf(n)) > -1 &&
            (t.splice(e, 1), this.Uvn) &&
            (s.StopExtraEffectOnTagsChange(
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(n),
            ),
            this.Wvn(i, n, !1));
      else
        (e = t.indexOf(r)) > -1 &&
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
    return !!t && t.indexOf(e) > -1;
  }
  Wvn(t, e, i) {
    let r = this.ynn.get(t.GetKey());
    const s = this.qvn.get(t.GetKey());
    i
      ? (void 0 === r && ((r = new Map()), this.ynn.set(t.GetKey(), r)),
        r.has(e) ||
          ((i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e)),
          void 0 !== (t = this.TXr.场景交互物特效列表.Get(i)) &&
            (s.PlayIndependentEffect(t), r.set(e, t))))
      : void 0 !== r &&
        r.size !== 0 &&
        r.has(e) &&
        ((i = r.get(e)),
        r.delete(e),
        s.EndIndependentEffect(i),
        s.PlayIndependentEndEffect(i));
  }
  tsn(t) {
    var t = t.GetKey();
    const e = this.qvn.get(t);
    let i = [];
    let r = 21;
    this.Gvn.has(t) && (i = this.Gvn.get(t)),
      (r = i?.length > 0 ? this.Kvn(i) : r) === 21 &&
        ((t =
          GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(defaultTagId)),
        (r = this.TXr.场景交互物状态列表.Get(t))),
      e.SetState(r, !0, !1);
  }
  DynamicRemoveActorByIndex(t) {
    let e, i;
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
      const r = e.GetKey();
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
// # sourceMappingURL=SceneItemMultiInteractionActorComponent.js.map

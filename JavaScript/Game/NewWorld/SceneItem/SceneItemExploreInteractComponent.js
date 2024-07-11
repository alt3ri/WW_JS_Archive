"use strict";
let SceneItemExploreInteractComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, n, i) {
    let o;
    const r = arguments.length;
    let s =
      r < 3 ? e : i === null ? (i = Object.getOwnPropertyDescriptor(e, n)) : i;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(t, e, n, i);
    else
      for (let a = t.length - 1; a >= 0; a--)
        (o = t[a]) && (s = (r < 3 ? o(s) : r > 3 ? o(e, n, s) : o(e, n)) || s);
    return r > 3 && s && Object.defineProperty(e, n, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemExploreInteractComponent = void 0);
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const manipulateInteractPointPointStateTagMap = new Map([
  [0, -422517001],
  [1, 1725677503],
  [2, -1335742570],
  [3, 968645625],
]);
let SceneItemExploreInteractComponent =
  (SceneItemExploreInteractComponent_1 = class SceneItemExploreInteractComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.Hte = void 0),
        (this.SIe = void 0),
        (this.r1n = void 0),
        (this.ktn = void 0),
        (this.YO = void 0),
        (this.Lie = void 0),
        (this.ac = 4),
        (this.Qnn = () => {
          this.ChangeManipulateInteractPointState(0);
        }),
        (this.vln = (t) => {
          this.Lo.Option.Type ===
            IComponent_1.EExploreSkillInteractType.PullGiant &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnOverlapSceneItemExploreInteractRange,
              t,
              this,
            );
        });
    }
    get Location() {
      return this.Hte.ActorLocationProxy;
    }
    get CreatureDataId() {
      return this.SIe.GetCreatureDataId();
    }
    get IsLocked() {
      return this.r1n.IsLocked;
    }
    get InteractActions() {
      if (
        this.Lo.Option.Type === IComponent_1.EExploreSkillInteractType.PullGiant
      )
        return this.Lo.Option.Actions;
    }
    OnInitData(t) {
      var t = t.GetParam(SceneItemExploreInteractComponent_1)[0];
      return (
        (this.Lo = t),
        void 0 !== this.Lo.PlayerStateRestritionId &&
          ((t = {
            Type: "CheckPlayerStateRestriction",
            RestrictionId: this.Lo.PlayerStateRestritionId,
          }),
          (this.YO = { Type: 0, Conditions: [t] })),
        !0
      );
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(182)),
        (this.SIe = this.Entity.GetComponent(0)),
        (this.r1n = this.Entity.GetComponent(115)),
        (this.ktn = this.Entity.GetComponent(74)),
        this.ktn.AddOnPlayerOverlapCallback(this.vln),
        (this.Lie = this.Entity.GetComponent(177)),
        EventSystem_1.EventSystem.OnceWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Qnn,
        ),
        !0
      );
    }
    get PullTime() {
      return this.Lo.Option.Type !==
        IComponent_1.EExploreSkillInteractType.PullGiant
        ? -1
        : this.Lo.Option.PullTime;
    }
    OnClear() {
      return this.ktn.RemoveOnPlayerOverlapCallback(this.vln), !0;
    }
    CheckCondition() {
      return (
        void 0 === this.YO ||
        ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
          this.YO,
          this.Hte.Owner,
          LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id),
        )
      );
    }
    ChangeManipulateInteractPointState(t) {
      this.Valid &&
        this.ac !== t &&
        (this.Lie.RemoveTag(
          manipulateInteractPointPointStateTagMap.get(this.ac),
        ),
        (this.ac = t),
        this.Lie.AddTag(manipulateInteractPointPointStateTagMap.get(this.ac)));
    }
  });
(SceneItemExploreInteractComponent = SceneItemExploreInteractComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(134)],
    SceneItemExploreInteractComponent,
  )),
  (exports.SceneItemExploreInteractComponent =
    SceneItemExploreInteractComponent);
// # sourceMappingURL=SceneItemExploreInteractComponent.js.map

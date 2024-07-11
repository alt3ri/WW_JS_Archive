"use strict";
let SceneItemMonsterGachaItemComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (e, t, n, r) {
    let o;
    const a = arguments.length;
    let i =
      a < 3 ? t : r === null ? (r = Object.getOwnPropertyDescriptor(t, n)) : r;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      i = Reflect.decorate(e, t, n, r);
    else
      for (let s = e.length - 1; s >= 0; s--)
        (o = e[s]) && (i = (a < 3 ? o(i) : a > 3 ? o(t, n, i) : o(t, n)) || i);
    return a > 3 && i && Object.defineProperty(t, n, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemMonsterGachaItemComponent = void 0);
const UE = require("ue");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
const ItemMaterialManager_1 = require("../../Render/Scene/Item/MaterialController/ItemMaterialManager");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
let SceneItemMonsterGachaItemComponent =
  (SceneItemMonsterGachaItemComponent_1 = class SceneItemMonsterGachaItemComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.Hte = void 0),
        (this.Qnn = () => {
          ResourceSystem_1.ResourceSystem.LoadAsync(
            this.Lo.MaterialDataPath,
            UE.ItemMaterialControllerActorData_C,
            (t) => {
              if (t) {
                const n =
                  SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
                    this.Hte.GetSceneInteractionLevelHandleId(),
                  );
                for (let e = 0; e < n.Num(); e++) {
                  const r = n.Get(e);
                  ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(
                    r,
                    t,
                  );
                }
              }
            },
          );
        });
    }
    OnInitData(e) {
      e = e.GetParam(SceneItemMonsterGachaItemComponent_1)[0];
      return (this.Lo = e), !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(182)),
        EventSystem_1.EventSystem.OnceWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Qnn,
        ),
        !0
      );
    }
  });
(SceneItemMonsterGachaItemComponent = SceneItemMonsterGachaItemComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(141)],
    SceneItemMonsterGachaItemComponent,
  )),
  (exports.SceneItemMonsterGachaItemComponent =
    SceneItemMonsterGachaItemComponent);
// # sourceMappingURL=SceneItemMonsterGachaItemComponent.js.map

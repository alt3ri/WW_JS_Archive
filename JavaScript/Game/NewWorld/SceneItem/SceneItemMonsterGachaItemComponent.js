"use strict";
var SceneItemMonsterGachaItemComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, n, r) {
      var o,
        a = arguments.length,
        i =
          a < 3
            ? t
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(t, n))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        i = Reflect.decorate(e, t, n, r);
      else
        for (var s = e.length - 1; 0 <= s; s--)
          (o = e[s]) &&
            (i = (a < 3 ? o(i) : 3 < a ? o(t, n, i) : o(t, n)) || i);
      return 3 < a && i && Object.defineProperty(t, n, i), i;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemMonsterGachaItemComponent = void 0);
const UE = require("ue"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager"),
  ItemMaterialManager_1 = require("../../Render/Scene/Item/MaterialController/ItemMaterialManager"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
let SceneItemMonsterGachaItemComponent =
  (SceneItemMonsterGachaItemComponent_1 = class SceneItemMonsterGachaItemComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.Hte = void 0),
        (this.Rnn = () => {
          ResourceSystem_1.ResourceSystem.LoadAsync(
            this.Lo.MaterialDataPath,
            UE.ItemMaterialControllerActorData_C,
            (t) => {
              if (t) {
                var n =
                  SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
                    this.Hte.GetSceneInteractionLevelHandleId(),
                  );
                for (let e = 0; e < n.Num(); e++) {
                  var r = n.Get(e);
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
        (this.Hte = this.Entity.GetComponent(185)),
        EventSystem_1.EventSystem.OnceWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Rnn,
        ),
        !0
      );
    }
  });
(SceneItemMonsterGachaItemComponent = SceneItemMonsterGachaItemComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(143)],
    SceneItemMonsterGachaItemComponent,
  )),
  (exports.SceneItemMonsterGachaItemComponent =
    SceneItemMonsterGachaItemComponent);
//# sourceMappingURL=SceneItemMonsterGachaItemComponent.js.map

"use strict";
let SceneItemTreasureBoxComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (e, t, n, r) {
    let o;
    const i = arguments.length;
    let s =
      i < 3 ? t : r === null ? (r = Object.getOwnPropertyDescriptor(t, n)) : r;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(e, t, n, r);
    else
      for (let a = e.length - 1; a >= 0; a--)
        (o = e[a]) && (s = (i < 3 ? o(s) : i > 3 ? o(t, n, s) : o(t, n)) || s);
    return i > 3 && s && Object.defineProperty(t, n, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemTreasureBoxComponent = void 0);
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
let SceneItemTreasureBoxComponent =
  (SceneItemTreasureBoxComponent_1 = class SceneItemTreasureBoxComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.man = void 0),
        (this.Pcn = void 0),
        (this.xcn = void 0),
        (this.B1n = () => {
          this.wcn(),
            this.Entity.CheckGetComponent(117).IsInState(2) && this.Bcn();
        }),
        (this.bcn = (e) => {
          this.wcn();
        }),
        (this.qcn = (e) => {
          this.wcn();
        });
    }
    OnInitData(e) {
      e = e.GetParam(SceneItemTreasureBoxComponent_1)[0];
      return (this.Pcn = e?.TypeId), !0;
    }
    OnStart() {
      const e = this.Entity.GetComponent(0);
      const t = e?.GetBaseInfo();
      return t
        ? ((this.man = t.OnlineInteractType ?? 2), !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              7,
              "[SceneItemTreasureBoxComponent.OnStart] 宝箱组件初始化失败,没有基础信息配置(baseInfo)",
              ["CreatureGenID:", e.GetOwnerId()],
              ["PbDataId:", e.GetPbDataId()],
            ),
          !1);
    }
    OnActivate() {
      return (
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.B1n,
        ),
        this.Pcn === 2 &&
          (EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemLockPropChange,
            this.qcn,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStatePreChange,
            this.bcn,
          )),
        (this.xcn = void 0),
        this.Entity.CheckGetComponent(117).IsInState(0) || this.B1n(),
        !0
      );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.B1n,
        ),
        this.Pcn === 2 &&
          (EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemLockPropChange,
            this.qcn,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStatePreChange,
            this.bcn,
          )),
        !0
      );
    }
    wcn() {
      const e = this.Entity.CheckGetComponent(117);
      const t = this.Entity.CheckGetComponent(177);
      let n = void 0;
      let r = void 0;
      switch (e.State) {
        case 1:
          n = this.Entity.CheckGetComponent(115).IsLocked
            ? ((r = -1107341031), -1491083225)
            : ((r = -1491083225), -1107341031);
          break;
        case 2:
          (r = -1107341031), (n = -1526657280);
      }
      void 0 !== n &&
        this.xcn !== n &&
        (t.NotifyLock++,
        void 0 !== r && this.xcn === r && t.RemoveTag(r),
        (this.xcn = n),
        t.AddTag(n),
        t.NotifyLock--);
    }
    Bcn() {
      ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
        ModelManager_1.ModelManager.CreatureModel.GetWorldOwner() &&
        LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
          this.man,
        ) &&
        LevelGamePlayController_1.LevelGamePlayController.GetRewardTreasureBoxRequest(
          this.Entity.Id,
        );
    }
    CloseAllCollisions() {
      const e = this.Entity.GetComponent(182);
      const n =
        (SceneItemTreasureBoxComponent_1.Gcn(e.Owner),
        SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
          e.GetSceneInteractionLevelHandleId(),
        ));
      if (n)
        for (let e = 0, t = n.Num(); e < t; e++) {
          const r = n.Get(e);
          SceneItemTreasureBoxComponent_1.Gcn(r);
        }
    }
    static Gcn(e) {
      const n = e.K2_GetComponentsByClass(UE.PrimitiveComponent.StaticClass());
      if (n)
        for (let e = 0, t = n.Num(); e < t; e++) {
          const r = n.Get(e);
          (r.CanCharacterStepUpOn = 0),
            r.SetCollisionResponseToAllChannels(0),
            r.SetCollisionResponseToChannel(
              QueryTypeDefine_1.KuroCollisionChannel.Pawn,
              2,
            ),
            r.SetCollisionResponseToChannel(
              QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
              2,
            ),
            r.SetCollisionResponseToChannel(
              QueryTypeDefine_1.KuroCollisionChannel.PawnMonster,
              2,
            );
        }
    }
  });
(SceneItemTreasureBoxComponent = SceneItemTreasureBoxComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(125)],
    SceneItemTreasureBoxComponent,
  )),
  (exports.SceneItemTreasureBoxComponent = SceneItemTreasureBoxComponent);
// # sourceMappingURL=GamePlayTreasureBoxComponent.js.map

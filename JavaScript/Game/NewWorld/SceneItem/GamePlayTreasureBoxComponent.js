"use strict";
var SceneItemTreasureBoxComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, n, r) {
      var o,
        i = arguments.length,
        s =
          i < 3
            ? t
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(t, n))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, n, r);
      else
        for (var a = e.length - 1; 0 <= a; a--)
          (o = e[a]) &&
            (s = (i < 3 ? o(s) : 3 < i ? o(t, n, s) : o(t, n)) || s);
      return 3 < i && s && Object.defineProperty(t, n, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemTreasureBoxComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
let SceneItemTreasureBoxComponent =
  (SceneItemTreasureBoxComponent_1 = class SceneItemTreasureBoxComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Qsn = void 0),
        (this._cn = void 0),
        (this.ucn = void 0),
        (this.m1n = () => {
          this.ccn(),
            this.Entity.CheckGetComponent(119).IsInState(2) && this.mcn();
        }),
        (this.dcn = (e) => {
          this.ccn();
        }),
        (this.Ccn = (e) => {
          this.ccn();
        });
    }
    OnInitData(e) {
      e = e.GetParam(SceneItemTreasureBoxComponent_1)[0];
      return (this._cn = e?.TypeId), !0;
    }
    OnStart() {
      var e = this.Entity.GetComponent(0),
        t = e?.GetBaseInfo();
      return t
        ? ((this.Qsn = t.OnlineInteractType ?? 2), !0)
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
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.m1n,
        )
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Temp",
              32,
              "SceneItemTreasureBoxComponent.OnActivate: 重复添加事件",
              ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()],
            )
          : EventSystem_1.EventSystem.AddWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSceneItemStateChange,
              this.m1n,
            ),
        2 === this._cn &&
          (EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemLockPropChange,
            this.Ccn,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStatePreChange,
            this.dcn,
          )),
        (this.ucn = void 0),
        this.Entity.CheckGetComponent(119).IsInState(0) || this.m1n(),
        !0
      );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.m1n,
        ),
        2 === this._cn &&
          (EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemLockPropChange,
            this.Ccn,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStatePreChange,
            this.dcn,
          )),
        !0
      );
    }
    ccn() {
      var e = this.Entity.CheckGetComponent(119),
        t = this.Entity.CheckGetComponent(180);
      let n = void 0,
        r = void 0;
      switch (e.State) {
        case 1:
          n = this.Entity.CheckGetComponent(117).IsLocked
            ? ((r = -1107341031), -1491083225)
            : ((r = -1491083225), -1107341031);
          break;
        case 2:
          (r = -1107341031), (n = -1526657280);
      }
      void 0 !== n &&
        this.ucn !== n &&
        (t.NotifyLock++,
        void 0 !== r && this.ucn === r && t.RemoveTag(r),
        (this.ucn = n),
        t.AddTag(n),
        t.NotifyLock--);
    }
    mcn() {
      ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
        ModelManager_1.ModelManager.CreatureModel.GetWorldOwner() &&
        LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
          this.Qsn,
        ) &&
        LevelGamePlayController_1.LevelGamePlayController.GetRewardTreasureBoxRequest(
          this.Entity.Id,
        );
    }
    CloseAllCollisions() {
      var e = this.Entity.GetComponent(185),
        n =
          (SceneItemTreasureBoxComponent_1.gcn(e.Owner),
          SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
            e.GetSceneInteractionLevelHandleId(),
          ));
      if (n)
        for (let e = 0, t = n.Num(); e < t; e++) {
          var r = n.Get(e);
          SceneItemTreasureBoxComponent_1.gcn(r);
        }
    }
    static gcn(e) {
      var n = e.K2_GetComponentsByClass(UE.PrimitiveComponent.StaticClass());
      if (n)
        for (let e = 0, t = n.Num(); e < t; e++) {
          var r = n.Get(e);
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
    [(0, RegisterComponent_1.RegisterComponent)(127)],
    SceneItemTreasureBoxComponent,
  )),
  (exports.SceneItemTreasureBoxComponent = SceneItemTreasureBoxComponent);
//# sourceMappingURL=GamePlayTreasureBoxComponent.js.map

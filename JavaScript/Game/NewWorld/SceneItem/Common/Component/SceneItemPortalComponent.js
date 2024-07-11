"use strict";
var SceneItemPortalComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, n, r) {
      var i,
        o = arguments.length,
        s =
          o < 3
            ? t
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(t, n))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, n, r);
      else
        for (var h = e.length - 1; 0 <= h; h--)
          (i = e[h]) &&
            (s = (o < 3 ? i(s) : 3 < o ? i(t, n, s) : i(t, n)) || s);
      return 3 < o && s && Object.defineProperty(t, n, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemPortalComponent = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PortalController_1 = require("../../Controller/PortalController"),
  INVALID_ENTITY = 0;
let SceneItemPortalComponent =
  (SceneItemPortalComponent_1 = class SceneItemPortalComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.D1n = "A"),
        (this.R1n = INVALID_ENTITY),
        (this.Hte = void 0),
        (this.PortalCapture = void 0),
        (this.wDe = 0),
        (this.A1n = (e, t, n) => {
          var r;
          t?.Valid &&
            (r = t.Entity.GetComponent(0)?.GetPbDataId()) &&
            this.R1n === r &&
            this.PortalCapture?.IsValid() &&
            ((r = t.Entity.GetComponent(193)) &&
              r.PortalCapture &&
              (this.PortalCapture.SetPair(r.PortalCapture), "A" === this.D1n) &&
              PortalController_1.PortalController.RegisterPair(
                this.wDe,
                this.PortalCapture.Plane.K2_GetComponentToWorld(),
                r.PortalCapture.Plane.K2_GetComponentToWorld(),
                this.Hte.Owner,
                r.Hte.Owner,
              ),
            EventSystem_1.EventSystem.Has(
              EventDefine_1.EEventName.RemoveEntity,
              this.U1n,
            ) ||
              EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.RemoveEntity,
                this.U1n,
              ));
        }),
        (this.U1n = (e, t) => {
          t?.Valid &&
            (t = t.Entity.GetComponent(0)?.GetPbDataId()) &&
            this.R1n === t &&
            (EventSystem_1.EventSystem.Has(
              EventDefine_1.EEventName.AddEntity,
              this.A1n,
            ) ||
              EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.AddEntity,
                this.A1n,
              ),
            this.PortalCapture?.IsValid()) &&
            (this.PortalCapture.SetPair(void 0), "A" === this.D1n) &&
            PortalController_1.PortalController.UnRegisterPair(this.wDe);
        }),
        (this.P1n = (e) => {
          var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
          if (t?.Valid) {
            var n = t.Entity.GetComponent(3);
            CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
              n.Actor.K2_GetActorRotation(),
            ),
              CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(),
              CameraController_1.CameraController.FightCamera.LogicComponent.ResetInitialCameraRotation(),
              t.Entity.GetComponent(185).HasTag(-1371021686) &&
                t.Entity.GetComponent(33).StopGroup1Skill("Portal Stop skill");
            const r = t.Entity.GetComponent(161);
            e &&
              r &&
              TimerSystem_1.TimerSystem.Delay(() => {
                r && r.CharacterMovement && (r.CharacterMovement.Velocity = e);
              }, 100);
          } else
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Teleport", 7, "传送门:失败,找不到当前玩家角色");
        });
    }
    OnInitData(e) {
      var t = e.GetParam(SceneItemPortalComponent_1)[0];
      switch (t.Config.Type) {
        case "Dynamic":
          break;
        case "Static":
          this.R1n = t.Config.LinkPortalEntityId;
      }
      return (
        (this.D1n = t.Config.PortalModel),
        e.EntityData && (this.wDe = e.EntityData?.R5n),
        !0
      );
    }
    OnStart() {
      return (this.Hte = this.Entity.GetComponent(182)), !0;
    }
    OnActivate() {
      var e;
      return (
        this.Hte?.Valid &&
          ((this.PortalCapture = ActorSystem_1.ActorSystem.Spawn(
            UE.BP_KuroPortalCapture_C.StaticClass(),
            this.Hte.ActorTransform,
            this.Hte.Owner,
          )),
          this.PortalCapture?.IsValid()) &&
          (this.PortalCapture.SetPbDataId(this.wDe),
          this.PortalCapture.K2_AttachToActor(
            this.Hte.Owner,
            void 0,
            1,
            1,
            1,
            !1,
          ),
          this.PortalCapture.RoleTeleport.Add(this.P1n),
          (e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
            this.R1n,
          ))?.IsInit
            ? ((e = e.Entity.GetComponent(193)) &&
                e.PortalCapture &&
                (this.PortalCapture.SetPair(e.PortalCapture),
                "A" === this.D1n) &&
                PortalController_1.PortalController.RegisterPair(
                  this.wDe,
                  this.PortalCapture.Plane.K2_GetComponentToWorld(),
                  e.PortalCapture.Plane.K2_GetComponentToWorld(),
                  this.Hte.Owner,
                  e.Hte.Owner,
                ),
              EventSystem_1.EventSystem.Has(
                EventDefine_1.EEventName.RemoveEntity,
                this.U1n,
              ) ||
                EventSystem_1.EventSystem.Add(
                  EventDefine_1.EEventName.RemoveEntity,
                  this.U1n,
                ))
            : EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.AddEntity,
                this.A1n,
              )),
        !0
      );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.RemoveEntity,
          this.U1n,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.RemoveEntity,
            this.U1n,
          ),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.AddEntity,
          this.A1n,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.AddEntity,
            this.A1n,
          ),
        this.PortalCapture?.IsValid() &&
          ("A" === this.D1n &&
            PortalController_1.PortalController.UnRegisterPair(this.wDe),
          this.PortalCapture.SetPair(void 0),
          this.PortalCapture.K2_DetachFromActor(),
          this.PortalCapture.RoleTeleport.Clear(),
          ActorSystem_1.ActorSystem.Put(this.PortalCapture)),
        !0
      );
    }
  });
(SceneItemPortalComponent = SceneItemPortalComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(193)],
    SceneItemPortalComponent,
  )),
  (exports.SceneItemPortalComponent = SceneItemPortalComponent);
//# sourceMappingURL=SceneItemPortalComponent.js.map

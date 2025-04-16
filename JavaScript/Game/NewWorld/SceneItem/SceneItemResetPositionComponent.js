"use strict";
var SceneItemResetPositionComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var o,
        n = arguments.length,
        r =
          n < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, e, i, s);
      else
        for (var h = t.length - 1; 0 <= h; h--)
          (o = t[h]) &&
            (r = (n < 3 ? o(r) : 3 < n ? o(e, i, r) : o(e, i)) || r);
      return 3 < n && r && Object.defineProperty(e, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemResetPositionComponent = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData"),
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ActorUtils_1 = require("../../Utils/ActorUtils"),
  TRIGGER_COMPONENT_TAG = new UE.FName("TriggerComponent");
let SceneItemResetPositionComponent =
  (SceneItemResetPositionComponent_1 = class SceneItemResetPositionComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.fMn = void 0),
        (this.Jll = !1),
        (this.Sen = void 0),
        (this.wS = void 0),
        (this.pMn = void 0),
        (this.Lo = void 0),
        (this.vMn = void 0),
        (this.EIe = void 0),
        (this.MMn = !1),
        (this.Een = void 0),
        (this.OnRemoveEntity = (t, e) => {
          var i = e.Entity.GetComponent(0)?.GetPbDataId() ?? 0;
          this.EIe.GetPbDataId() === i
            ? (this.MMn = !0)
            : this.wS.includes(i) &&
              (this.vMn.push(i),
              EventSystem_1.EventSystem.RemoveWithTargetUseKey(
                this,
                e,
                EventDefine_1.EEventName.RemoveEntity,
                this.OnRemoveEntity,
              ));
        }),
        (this.GUe = (t, e, i) => {
          var s = e.Entity.GetComponent(0)?.GetPbDataId() ?? 0;
          this.wS?.includes(s) &&
            (EventSystem_1.EventSystem.HasWithTarget(
              e,
              EventDefine_1.EEventName.RemoveEntity,
              this.OnRemoveEntity,
            ) ||
              EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
                this,
                e,
                EventDefine_1.EEventName.RemoveEntity,
                this.OnRemoveEntity,
              ),
            this.vMn.includes(s)) &&
            ((e = this.vMn.indexOf(s)), this.vMn.splice(e, 1));
        }),
        (this.rtn = (t, e) => {
          var i;
          this.MMn ||
            ((e = this.ftn(e))?.Valid &&
              (!(i = e.Entity.GetComponent(200)) ||
                (i.IsReadyForOverlap && i.Active)) &&
              this.wS &&
              ((i = e.Entity.GetComponent(0)?.GetPbDataId() ?? 0),
              this.wS.includes(i)) &&
              !this.vMn.includes(i) &&
              LevelGamePlayController_1.LevelGamePlayController.OnManipulatableItemExitAreaInternal(
                e,
                void 0,
                this.Entity.GetComponent(0).GetCreatureDataId(),
              ));
        }),
        (this.itn = (t, e, i, s) => {
          var o;
          this.MMn ||
            ((e = this.ftn(e))?.Valid &&
              (!(o = e.Entity.GetComponent(200)) ||
                (o.IsReadyForOverlap && o.Active)) &&
              this.wS &&
              ((o = e.Entity.GetComponent(0)?.GetPbDataId() ?? 0),
              this.wS.includes(o)) &&
              !this.vMn.includes(o) &&
              LevelGamePlayController_1.LevelGamePlayController.OnManipulatableItemExitAreaInternal(
                e,
                void 0,
                this.Entity.GetComponent(0).GetCreatureDataId(),
              ));
        });
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemResetPositionComponent_1)[0];
      return (this.wS = t.EntityIds), (this.Lo = t), (this.vMn = []), !0;
    }
    OnStart() {
      (this.EIe = this.Entity.GetComponent(0)),
        (this.pMn = this.EIe.D_GetTransform());
      var t = this.Entity.GetComponent(1);
      return (
        t &&
          ((this.Jll = !0),
          (this.fMn = ActorSystem_1.ActorSystem.Get(
            UE.Actor.StaticClass(),
            this.pMn,
          )),
          this.fMn?.K2_AttachToActor(t.Owner, void 0, 1, 1, 1, !1)),
        this.Koh()
      );
    }
    Koh() {
      const e = this.Lo.Range;
      if (
        ("Box" === e.Type
          ? this._tn(e)
          : "Sphere" === e.Type
            ? this.utn(e)
            : "Volume" === e.Type && this.mtn(e),
        this.fMn)
      ) {
        if ("Volume" === e.Type) this.fMn.OnActorEndOverlap.Add(this.rtn);
        else {
          if (!this.Sen)
            return (
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "SceneGameplay",
                  29,
                  "[SceneItemResetPositionComponent] TriggerComponent创建失败",
                  ["CreatureDataId", this.EIe.GetCreatureDataId()],
                  ["ConfigId", this.EIe.GetPbDataId()],
                ),
              !1
            );
          this.Sen.OnComponentEndOverlap.Add(this.itn);
        }
        this.mSe();
      } else {
        if ("Volume" !== e.Type)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneGameplay",
                29,
                "[SceneItemResetPositionComponent] TriggerItem创建失败",
                ["CreatureDataId", this.EIe.GetCreatureDataId()],
                ["ConfigId", this.EIe.GetPbDataId()],
              ),
            !1
          );
        {
          const i = (t) => {
            t?.toString() === e.VolumeKey &&
              ((t = this.Een.GetKuroTriggerVolume(
                FNameUtil_1.FNameUtil.GetDynamicFName(e.VolumeKey),
              )),
              (this.Jll = !1),
              (this.fMn = t),
              this.fMn.OnActorEndOverlap.Add(this.rtn),
              this.mSe(),
              this.Een.OnTriggerVolumeAddToSubsystem.Remove(i));
          };
          this.Een.OnTriggerVolumeAddToSubsystem.Add(i);
        }
      }
      return !0;
    }
    OnClear() {
      return (
        this.dSe(),
        this.Jll &&
          this.fMn?.IsValid() &&
          (this.fMn.K2_DetachFromActor(),
          ActorSystem_1.ActorSystem.Put(
            "SceneItemResetPositionComponent.OnClear",
            this.fMn,
          )),
        (this.Jll = !1),
        !(this.fMn = void 0)
      );
    }
    mSe() {
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AddEntity,
        this.GUe,
      );
      for (const i of this.wS) {
        var t =
          ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i);
        t &&
          EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
            this,
            t,
            EventDefine_1.EEventName.RemoveEntity,
            this.OnRemoveEntity,
          );
      }
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        this.EIe.GetPbDataId(),
      );
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
        this,
        e,
        EventDefine_1.EEventName.RemoveEntity,
        this.OnRemoveEntity,
      );
    }
    dSe() {
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AddEntity,
        this.GUe,
      ),
        EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    }
    _tn(t) {
      var e, i;
      this.fMn ||
        ((this.Jll = !0),
        (this.fMn = ActorSystem_1.ActorSystem.Get(
          UE.Actor.StaticClass(),
          this.pMn,
        ))),
        (this.Sen = this.fMn?.D_AddComponentByClass(
          UE.BoxComponent.StaticClass(),
          !1,
          this.pMn,
          !1,
        )),
        this.Sen &&
          (this.Sen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1),
          this.Sen?.D_SetBoxExtent(
            new UE.VectorDouble(t.Size.X, t.Size.Y, t.Size.Z),
            !0,
          ),
          (i = Vector_1.Vector.Create(this.pMn.GetLocation())),
          (e = Vector_1.Vector.Create(t.Center.X, t.Center.Y, t.Center.Z)),
          i.AdditionEqual(e),
          this.Sen.D_K2_SetWorldLocation(i.ToUeVector(), !1, void 0, !1),
          t.Rotator) &&
          ((e = Rotator_1.Rotator.Create(this.pMn.GetRotation().Rotator())),
          (i = Rotator_1.Rotator.Create(t.Rotator.Y, t.Rotator.Z, t.Rotator.X)),
          e.AdditionEqual(i),
          this.Sen.K2_SetRelativeRotation(e.ToUeRotator(), !1, void 0, !1));
    }
    utn(t) {
      var e;
      this.fMn ||
        ((this.Jll = !0),
        (this.fMn = ActorSystem_1.ActorSystem.Get(
          UE.Actor.StaticClass(),
          this.pMn,
        ))),
        (this.Sen = this.fMn?.D_AddComponentByClass(
          UE.SphereComponent.StaticClass(),
          !1,
          this.pMn,
          !1,
        )),
        this.Sen &&
          (this.Sen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1),
          this.Sen?.SetSphereRadius(t.Radius, !0),
          (e = Vector_1.Vector.Create(this.pMn.GetLocation())),
          (t = Vector_1.Vector.Create(t.Center.X, t.Center.Y, t.Center.Z)),
          e.AdditionEqual(t),
          this.Sen.D_K2_SetWorldLocation(e.ToUeVector(), !1, void 0, !1));
    }
    mtn(t) {
      this.Een = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
        GlobalData_1.GlobalData.World,
        UE.KuroTriggerVolumeManager.StaticClass(),
      );
      t = this.Een.GetKuroTriggerVolume(
        FNameUtil_1.FNameUtil.GetDynamicFName(t.VolumeKey),
      );
      t && ((this.Jll = !1), (this.fMn = t));
    }
    ftn(t) {
      if (
        UE.KuroStaticLibrary.IsImplementInterface(
          t.GetClass(),
          UE.BPI_CreatureInterface_C.StaticClass(),
        )
      )
        return ActorUtils_1.ActorUtils.GetEntityByActor(t);
    }
  });
(SceneItemResetPositionComponent = SceneItemResetPositionComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(163)],
    SceneItemResetPositionComponent,
  )),
  (exports.SceneItemResetPositionComponent = SceneItemResetPositionComponent);
//# sourceMappingURL=SceneItemResetPositionComponent.js.map

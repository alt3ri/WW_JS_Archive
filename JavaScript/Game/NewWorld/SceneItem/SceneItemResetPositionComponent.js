"use strict";
var SceneItemResetPositionComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, o) {
      var s,
        n = arguments.length,
        r =
          n < 3
            ? e
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(e, i))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, e, i, o);
      else
        for (var h = t.length - 1; 0 <= h; h--)
          (s = t[h]) &&
            (r = (n < 3 ? s(r) : 3 < n ? s(e, i, r) : s(e, i)) || r);
      return 3 < n && r && Object.defineProperty(e, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemResetPositionComponent = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData"),
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  ActorUtils_1 = require("../../Utils/ActorUtils"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  TRIGGER_COMPONENT_TAG = new UE.FName("TriggerComponent");
let SceneItemResetPositionComponent =
  (SceneItemResetPositionComponent_1 = class SceneItemResetPositionComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.fMn = void 0),
        (this.Sen = void 0),
        (this.wS = void 0),
        (this.pMn = void 0),
        (this.Lo = void 0),
        (this.vMn = void 0),
        (this.EIe = void 0),
        (this.MMn = !1),
        (this.OnRemoveEntity = (t, e) => {
          e = e.Entity.GetComponent(0)?.GetPbDataId() ?? 0;
          this.EIe.GetPbDataId() === e
            ? (this.MMn = !0)
            : this.wS.includes(e) && this.vMn.push(e);
        }),
        (this.GUe = (t, e, i) => {
          var e = e.Entity.GetComponent(0)?.GetPbDataId() ?? 0;
          this.vMn.includes(e) &&
            ((e = this.vMn.indexOf(e)), this.vMn.splice(e, 1));
        }),
        (this.rtn = (t, e) => {
          var i;
          this.MMn ||
            ((e = this.ftn(e))?.Valid &&
              this.wS &&
              ((i = e.Entity.GetComponent(0)?.GetPbDataId() ?? 0),
              this.wS.includes(i)) &&
              !this.vMn.includes(i) &&
              LevelGamePlayController_1.LevelGamePlayController.OnManipulatableItemExitAreaInternal(
                e,
                void 0,
                this.Entity.GetComponent(0).GetCreatureDataId(),
                !0,
              ));
        }),
        (this.itn = (t, e, i, o) => {
          var s;
          this.MMn ||
            ((e = this.ftn(e))?.Valid &&
              this.wS &&
              ((s = e.Entity.GetComponent(0)?.GetPbDataId() ?? 0),
              this.wS.includes(s)) &&
              !this.vMn.includes(s) &&
              LevelGamePlayController_1.LevelGamePlayController.OnManipulatableItemExitAreaInternal(
                e,
                void 0,
                this.Entity.GetComponent(0).GetCreatureDataId(),
                !0,
              ));
        });
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemResetPositionComponent_1)[0];
      return (this.wS = t.EntityIds), (this.Lo = t), (this.vMn = []), !0;
    }
    OnStart() {
      var t = this.Entity.GetComponent(1),
        t =
          (t && (this.fMn = t.Owner),
          (this.EIe = this.Entity.GetComponent(0)),
          (this.pMn = this.EIe.GetTransform()),
          this.Lo),
        t = t.Range;
      if (
        ("Box" === t.Type
          ? this._tn(t)
          : "Sphere" === t.Type
            ? this.utn(t)
            : "Volume" === t.Type && this.mtn(t),
        !this.fMn)
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              30,
              "[SceneItemResetPositionComponent] TriggerItem创建失败",
              ["CreatureDataId", this.EIe.GetCreatureDataId()],
              ["ConfigId", this.EIe.GetPbDataId()],
            ),
          !1
        );
      if ("Volume" === t.Type) this.fMn.OnActorEndOverlap.Add(this.rtn);
      else {
        if (!this.Sen)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneGameplay",
                30,
                "[SceneItemResetPositionComponent] TriggerComponent创建失败",
                ["CreatureDataId", this.EIe.GetCreatureDataId()],
                ["ConfigId", this.EIe.GetPbDataId()],
              ),
            !1
          );
        this.Sen.OnComponentEndOverlap.Add(this.itn);
      }
      return this.mSe(), !0;
    }
    OnClear() {
      return this.dSe(), !0;
    }
    mSe() {
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AddEntity,
        this.GUe,
      ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.RemoveEntity,
          this.OnRemoveEntity,
        );
    }
    dSe() {
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AddEntity,
        this.GUe,
      ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.RemoveEntity,
          this.OnRemoveEntity,
        );
    }
    _tn(t) {
      var e, i;
      this.fMn ||
        (this.fMn = ActorSystem_1.ActorSystem.Get(
          UE.Actor.StaticClass(),
          this.pMn,
        )),
        (this.Sen = this.fMn?.AddComponentByClass(
          UE.BoxComponent.StaticClass(),
          !1,
          this.pMn,
          !1,
        )),
        this.Sen &&
          (this.Sen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1),
          this.Sen?.SetBoxExtent(
            new UE.Vector(t.Size.X, t.Size.Y, t.Size.Z),
            !0,
          ),
          (i = Vector_1.Vector.Create(this.pMn.GetLocation())),
          (e = Vector_1.Vector.Create(t.Center.X, t.Center.Y, t.Center.Z)),
          i.AdditionEqual(e),
          this.Sen.K2_SetWorldLocation(i.ToUeVector(), !1, void 0, !1),
          t.Rotator) &&
          ((e = Rotator_1.Rotator.Create(this.pMn.GetRotation().Rotator())),
          (i = Rotator_1.Rotator.Create(t.Rotator.Y, t.Rotator.Z, t.Rotator.X)),
          e.AdditionEqual(i),
          this.Sen.K2_SetRelativeRotation(e.ToUeRotator(), !1, void 0, !1));
    }
    utn(t) {
      var e;
      this.fMn ||
        (this.fMn = ActorSystem_1.ActorSystem.Get(
          UE.Actor.StaticClass(),
          this.pMn,
        )),
        (this.Sen = this.fMn?.AddComponentByClass(
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
          this.Sen.K2_SetWorldLocation(e.ToUeVector(), !1, void 0, !1));
    }
    mtn(t) {
      t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
        GlobalData_1.GlobalData.World,
        UE.KuroTriggerVolumeManager.StaticClass(),
      ).GetKuroTriggerVolume(
        FNameUtil_1.FNameUtil.GetDynamicFName(t.VolumeKey),
      );
      t && (this.fMn = t);
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
    [(0, RegisterComponent_1.RegisterComponent)(150)],
    SceneItemResetPositionComponent,
  )),
  (exports.SceneItemResetPositionComponent = SceneItemResetPositionComponent);
//# sourceMappingURL=SceneItemResetPositionComponent.js.map

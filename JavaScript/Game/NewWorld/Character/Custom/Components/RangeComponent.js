"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    let o;
    const h = arguments.length;
    let r =
      h < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(t, e, i, s);
    else
      for (let n = t.length - 1; n >= 0; n--)
        (o = t[n]) && (r = (h < 3 ? o(r) : h > 3 ? o(e, i, r) : o(e, i)) || r);
    return h > 3 && r && Object.defineProperty(e, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RangeComponent = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RoleTriggerController_1 = require("../../Role/RoleTriggerController");
const TRIGGER_COMPONENT_TAG = new UE.FName("TriggerComponent");
let RangeComponent = class RangeComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.SIe = void 0),
      (this.Hen = void 0),
      (this.NHo = void 0),
      (this.jen = void 0),
      (this.Wen = void 0),
      (this.Ken = void 0),
      (this.Qen = void 0),
      (this.Xen = !1),
      (this.$en = !1),
      (this.Yen = 0),
      (this.Jen = void 0),
      (this.zen = void 0),
      (this.Zen = !1),
      (this.etn = !1),
      (this.X5s = !1),
      (this.ttn = void 0),
      (this.itn = void 0),
      (this.otn = void 0),
      (this.rtn = void 0),
      (this.ntn = void 0),
      (this.stn = void 0),
      (this.atn = !1),
      (this.htn = !1),
      (this.ltn = void 0),
      (this._tn = void 0),
      (this.utn = void 0),
      (this.Y5s = !0),
      (this.J5s = !0),
      (this.ctn = (t) => {
        t && (this.Qen?.IsValid() || this.$en)
          ? (this.mtn(),
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.OnChangeRole,
              this.dtn,
            ),
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.RemoveEntity,
              this.zpe,
            ),
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.AddEntity,
              this.GUe,
            ),
            (this.etn = !0),
            this.z5s())
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              30,
              "[RangeComponent] RangeActor初始化失败",
              ["CreatureDataId", this.SIe.GetCreatureDataId()],
              ["ConfigId", this.SIe.GetPbDataId()],
              ["PlayerId", this.SIe.GetPlayerId()],
            );
      }),
      (this.z5s = () => {
        this.GetIsLocalSetupComplete() &&
          (this.gtn(), this.ptn(!1), this.GetIsNotServerRange() || this.Z5s());
      }),
      (this.vtn = void 0),
      (this.ytn = (t, e) => {
        this.Stn(e, !0);
      }),
      (this.Itn = (t, e) => {
        this.Stn(e, !1);
      }),
      (this.dtn = (t, e) => {
        t?.Valid &&
          this.atn !== this.htn &&
          this.Ttn(
            RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger(),
            t,
            this.atn,
          );
      }),
      (this.GUe = (t, e, i) => {
        let s;
        e?.Valid &&
          (e = e.Entity?.GetComponent(0)?.GetCreatureDataId()) &&
          this.utn?.has(e) &&
          ((s = !!this.utn.get(e)),
          this.ServerUpdateEntitiesInRangeOnline(s, e));
      }),
      (this.zpe = (t, e) => {
        e?.Valid &&
          (e.Id === this.Entity.Id
            ? (this.Ltn(!1), this.Dtn())
            : this.ntn?.has(e.Id) && this.Rtn(e, !1, !1));
      }),
      (this.Atn = (t) => {
        this.Stn(
          RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger(),
          t,
        );
      });
  }
  GetRangeActor() {
    return this.Qen?.IsValid() ? this.Qen : void 0;
  }
  GetShapeComp() {
    return this.Wen?.IsValid() ? this.Wen : void 0;
  }
  GetMeshComp() {
    return this.Ken?.IsValid() ? this.Ken : void 0;
  }
  GetRangeType() {
    return this.NHo?.Type;
  }
  GetShapeCompTransform() {
    return this.Wen?.IsValid() ? this.Wen.GetRelativeTransform() : void 0;
  }
  GetEntitiesInRangeLocal() {
    return this.ntn;
  }
  GetActorsInRangeLocal() {
    return this.stn;
  }
  GetEntitiesInRangeOnline() {
    return this.ltn;
  }
  GetPlayerInRangeOnline() {
    return this._tn;
  }
  GetIsLocalSetupComplete() {
    return this.Zen && this.etn;
  }
  GetIsSetupComplete() {
    return this.GetIsNotServerRange()
      ? this.Zen && this.etn
      : this.Zen && this.etn && this.X5s;
  }
  GetIsNotServerRange() {
    return !this.Y5s && !this.J5s;
  }
  GetShapeConfig() {
    return this.NHo;
  }
  OnInitData() {
    (this.SIe = this.Entity.GetComponent(0)),
      (this.Hen = this.Entity.GetComponent(147));
    const t = this.SIe?.GetPbEntityInitData();
    return (
      !!t &&
      (this.e6s(t)
        ? (this.t6s(t),
          (this.ntn = new Map()),
          (this.atn = !1),
          (this.stn = new Set()),
          (this.ltn = new Map()),
          (this._tn = new Set()),
          (this.itn = []),
          (this.otn = []),
          (this.rtn = []),
          (this.etn = !1),
          (this.Zen = !1),
          (this.utn = new Map()),
          this.SIe.PbInRangeEntityCreatureDataIds &&
            this.ServerUpdateEntitiesInRangeOnline(
              !0,
              this.SIe.PbInRangeEntityCreatureDataIds,
            ),
          this.SIe.PbInRangePlayerIds &&
            this.ServerUpdatePlayerInRangeOnline(
              !0,
              this.SIe.PbInRangePlayerIds,
            ),
          !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              30,
              "[RangeComponent] 范围数据出错",
              ["CreatureDataId", this.SIe.GetCreatureDataId()],
              ["ConfigId", this.SIe.GetPbDataId()],
              ["PlayerId", this.SIe.GetPlayerId()],
            ),
          !1))
    );
  }
  e6s(t) {
    let e = (0, IComponent_1.getComponent)(t.ComponentsData, "RangeComponent");
    let i = (0, IComponent_1.getComponent)(
      t.ComponentsData,
      "BeamCastComponent",
    );
    const s = (0, IComponent_1.getComponent)(t.ComponentsData, "FanComponent");
    return (
      e
        ? (this.NHo = e.Shape)
        : i
          ? ((e = { Type: "Cylinder", ...i.Range }), (this.NHo = e))
          : s &&
            ((i = {
              Type: "Box",
              Center: Vector_1.Vector.ZeroVectorProxy,
              Size: Vector_1.Vector.OneVectorProxy,
            }),
            (this.NHo = i)),
      !!this.NHo &&
        (!(e = (0, IComponent_1.getComponent)(
          t.ComponentsData,
          "TriggerComponent",
        )) ||
          (this.NHo.Type !== "Box" &&
            this.NHo.Type !== "Cylinder" &&
            this.NHo.Type !== "Sphere") ||
          (this.Yen = e.ExitConfig?.ExtraRange ?? 0),
        !0)
    );
  }
  t6s(t) {
    const i = (0, IComponent_1.getComponent)(
      t.ComponentsData,
      "TriggerComponent",
    );
    const s = (0, IComponent_1.getComponent)(
      t.ComponentsData,
      "TrampleComponent",
    );
    const e = (0, IComponent_1.getComponent)(
      t.ComponentsData,
      "RangeComponent",
    );
    var t = (0, IComponent_1.getComponent)(
      t.ComponentsData,
      "EffectAreaComponent",
    );
    if (e) {
      if (i ?? s ?? t) {
        let t = !1;
        let e = !1;
        i &&
          (!i.Match.OnlyPlayer ||
          i.ChangeRoleTrigger ||
          i.Match.AllCharacter ||
          i.Match.Categories?.length
            ? ((e = !0), (t = !0))
            : (e = !0)),
          s && ((e = !0), (t = !0)),
          (this.Y5s = t),
          (this.J5s = e);
      }
    } else (this.Y5s = !1), (this.J5s = !1);
  }
  OnStart() {
    return (
      this.InitRangeActorAsync().then((t) => {
        this.ctn(t);
      }),
      !0
    );
  }
  OnActivate() {
    (this.Zen = !0), this.z5s();
  }
  OnEnd() {
    return (
      void 0 !== this.ttn &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.ttn),
        (this.ttn = void 0)),
      this.jen?.IsValid() &&
        this.vtn &&
        (this.jen.OnTriggerVolumeAddToSubsystem.Remove(this.vtn),
        (this.jen = void 0),
        (this.vtn = void 0)),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnChangeRole,
        this.dtn,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChangeRole,
          this.dtn,
        ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe,
        ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.AddEntity,
        this.GUe,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.AddEntity,
          this.GUe,
        ),
      this.Dtn(),
      (this.Wen = void 0),
      (this.Ken = void 0),
      this.Xen &&
        this.Qen?.IsValid() &&
        ActorSystem_1.ActorSystem.Put(this.Qen),
      (this.Qen = void 0),
      (this.Xen = !1),
      this.utn?.clear(),
      !0
    );
  }
  async InitRangeActorAsync() {
    return new Promise((e, t) => {
      this.$en = !1;
      const i = this.NHo;
      switch (i.Type) {
        case "Box":
          e(this.Utn(i));
          break;
        case "Sphere":
          e(this.Ptn(i));
          break;
        case "Cylinder": {
          const o =
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "BaseCylinderStaticMeshForRange",
            ) ?? "None";
          this.ttn && ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.ttn),
            (this.ttn = ResourceSystem_1.ResourceSystem.LoadAsync(
              o,
              UE.Object,
              (t) => {
                (this.ttn = void 0),
                  t instanceof UE.StaticMesh
                    ? e(this.xtn(i, t))
                    : (Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "Entity",
                          40,
                          "[RangeComponent] 基础静态网格体配置错误",
                          ["MeshPath", o],
                        ),
                      e(!1));
              },
            ));
          break;
        }
        case "Volume":
          (this.jen = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
            GlobalData_1.GlobalData.World,
            UE.KuroTriggerVolumeManager.StaticClass(),
          )),
            this.vtn &&
              (this.jen.OnTriggerVolumeAddToSubsystem.Remove(this.vtn),
              (this.vtn = void 0));
          var s = this.jen?.GetKuroTriggerVolume(new UE.FName(i.VolumeKey));
          s
            ? e(this.wtn(i, s))
            : (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Entity",
                  40,
                  "[RangeComponent] KuroTriggerVolume未找到，等待加载",
                  ["VolumeKey", i?.VolumeKey],
                  ["CreatureDataId", this.SIe.GetCreatureDataId()],
                  ["ConfigId", this.SIe.GetPbDataId()],
                  ["PlayerId", this.SIe.GetPlayerId()],
                ),
              (this.vtn = (t) => {
                t?.toString() === i.VolumeKey &&
                  (Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Entity",
                      40,
                      "[RangeComponent] KuroTriggerVolume已加载",
                      ["VolumeKey", i?.VolumeKey],
                      ["CreatureDataId", this.SIe.GetCreatureDataId()],
                      ["ConfigId", this.SIe.GetPbDataId()],
                      ["PlayerId", this.SIe.GetPlayerId()],
                    ),
                  (t = this.jen?.GetKuroTriggerVolume(t)),
                  e(!!t && this.wtn(i, t)),
                  this.vtn) &&
                  (this.jen?.OnTriggerVolumeAddToSubsystem.Remove(this.vtn),
                  (this.vtn = void 0));
              }),
              this.jen.OnTriggerVolumeAddToSubsystem.Add(this.vtn));
          break;
        case "ActorRefVolume":
          (this.$en = !0), e(!0);
      }
    });
  }
  Utn(t) {
    if (
      ((this.Qen = ActorSystem_1.ActorSystem.Get(
        UE.Actor.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
      )),
      (this.Xen = !0),
      (this.Wen = this.Qen?.AddComponentByClass(
        UE.BoxComponent.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
      )),
      !this.Wen?.IsValid())
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneGameplay",
            40,
            "[RangeComponent] BoxShape创建失败",
            ["CreatureDataId", this.SIe.GetCreatureDataId()],
            ["ConfigId", this.SIe.GetPbDataId()],
            ["PlayerId", this.SIe.GetPlayerId()],
          ),
        !1
      );
    if (
      (this.Wen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1), this.Yen)
    ) {
      if (
        ((this.Jen = this.Qen?.AddComponentByClass(
          UE.BoxComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
        )),
        !this.Jen?.IsValid())
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              40,
              "[RangeComponent] BoxShape(ExpandedExit)创建失败",
              ["CreatureDataId", this.SIe.GetCreatureDataId()],
              ["ConfigId", this.SIe.GetPbDataId()],
              ["PlayerId", this.SIe.GetPlayerId()],
            ),
          !1
        );
      this.Jen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1);
    }
    return !0;
  }
  Ptn(t) {
    if (
      ((this.Qen = ActorSystem_1.ActorSystem.Get(
        UE.Actor.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
      )),
      (this.Xen = !0),
      (this.Wen = this.Qen?.AddComponentByClass(
        UE.SphereComponent.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
      )),
      !this.Wen?.IsValid())
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneGameplay",
            40,
            "[RangeComponent] SphereShape创建失败",
            ["CreatureDataId", this.SIe.GetCreatureDataId()],
            ["ConfigId", this.SIe.GetPbDataId()],
            ["PlayerId", this.SIe.GetPlayerId()],
          ),
        !1
      );
    if (
      (this.Wen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1), this.Yen)
    ) {
      if (
        ((this.Jen = this.Qen?.AddComponentByClass(
          UE.SphereComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
        )),
        !this.Jen?.IsValid())
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              40,
              "[RangeComponent] SphereShape(ExpandedExit)创建失败",
              ["CreatureDataId", this.SIe.GetCreatureDataId()],
              ["ConfigId", this.SIe.GetPbDataId()],
              ["PlayerId", this.SIe.GetPlayerId()],
            ),
          !1
        );
      this.Jen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1);
    }
    return !0;
  }
  xtn(t, e) {
    if (
      ((this.Qen = ActorSystem_1.ActorSystem.Get(
        UE.Actor.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
      )),
      (this.Xen = !0),
      (this.Ken = this.Qen?.AddComponentByClass(
        UE.StaticMeshComponent.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
        new UE.FName("MeshComp"),
      )),
      !this.Ken?.IsValid())
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneGameplay",
            40,
            "[RangeComponent] CylinderMesh创建失败",
            ["CreatureDataId", this.SIe.GetCreatureDataId()],
            ["ConfigId", this.SIe.GetPbDataId()],
            ["PlayerId", this.SIe.GetPlayerId()],
          ),
        !1
      );
    if (
      (this.Ken.SetStaticMesh(e),
      this.Ken.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1),
      this.Ken.SetHiddenInGame(!0),
      this.Ken.SetVisibility(!1),
      this.Yen)
    ) {
      if (
        ((this.zen = this.Qen?.AddComponentByClass(
          UE.StaticMeshComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
          new UE.FName("ExpandedExitMeshComp"),
        )),
        !this.zen?.IsValid())
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              40,
              "[RangeComponent] CylinderMesh创建失败",
              ["CreatureDataId", this.SIe.GetCreatureDataId()],
              ["ConfigId", this.SIe.GetPbDataId()],
              ["PlayerId", this.SIe.GetPlayerId()],
            ),
          !1
        );
      this.zen.SetStaticMesh(e),
        this.zen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1),
        this.zen.SetHiddenInGame(!0),
        this.zen.SetVisibility(!1);
    }
    return !0;
  }
  wtn(t, e) {
    let i, s;
    return (
      (this.Qen = e),
      (this.Xen = !1),
      e?.IsValid()
        ? (GlobalData_1.GlobalData.IsPlayInEditor &&
            ((i = (0, puerts_1.$ref)(void 0)),
            (s = (0, puerts_1.$ref)(void 0)),
            e.GetActorBounds(!1, i, s),
            (e = (0, puerts_1.$unref)(s)).X * e.Y * e.Z > 27e9) &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "SceneItem",
              30,
              "[RangeComponent] TriggerVolume配置过大，请联系相关人员",
              ["ConfigId", this.SIe.GetPbDataId()],
            ),
          !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              30,
              "[RangeComponent] KuroTriggerVolume非Valid",
              ["VolumeKey", t?.VolumeKey],
              ["CreatureDataId", this.SIe.GetCreatureDataId()],
              ["ConfigId", this.SIe.GetPbDataId()],
              ["PlayerId", this.SIe.GetPlayerId()],
            ),
          !1)
    );
  }
  mtn() {
    this.$en || (this.Xen ? this.btn() : this.qtn(), this.Gtn());
  }
  btn() {
    let t, e;
    this.Qen &&
      this.Xen &&
      !this.$en &&
      (t = this.NHo).Type !== "Volume" &&
      t.Type !== "ActorRefVolume" &&
      ((e = this.SIe.GetTransform()),
      this.Qen.K2_SetActorTransform(e, !1, void 0, !0),
      (e = this.Entity.GetComponent(1)?.Owner)?.IsValid() &&
        this.Qen.K2_AttachToActor(e, void 0, 2, 2, 1, !1),
      (e = new UE.Vector(t.Center.X ?? 0, t.Center.Y ?? 0, t.Center.Z ?? 0)),
      this.Qen.K2_AddActorLocalOffset(e, !1, void 0, !1),
      t.Type === "Box") &&
      t.Rotator &&
      ((e = new UE.Rotator(
        t.Rotator.Y ?? 0,
        t.Rotator.Z ?? 0,
        t.Rotator.X ?? 0,
      )),
      this.Qen.K2_AddActorLocalRotation(e, !1, void 0, !1));
  }
  qtn() {
    let t, e, i, s;
    !this.Qen ||
      this.Xen ||
      this.$en ||
      ((t = this.NHo).Type !== "Volume" &&
        t.Type !== "ActorRefVolume" &&
        ((e = new UE.Vector(t.Center.X ?? 0, t.Center.Y ?? 0, t.Center.Z ?? 0)),
        (i = new UE.Rotator()),
        t.Type === "Box" &&
          t.Rotator &&
          i.Add(t.Rotator.Y ?? 0, t.Rotator.Z ?? 0, t.Rotator.X ?? 0),
        (s =
          t.Type === "Cylinder" ? this.Ken : this.Wen).K2_SetRelativeLocation(
          e,
          !1,
          void 0,
          !1,
        ),
        s.K2_SetRelativeRotation(i, !1, void 0, !1),
        this.Yen) &&
        ((s =
          t.Type === "Cylinder" ? this.zen : this.Jen).K2_SetRelativeLocation(
          e,
          !1,
          void 0,
          !1,
        ),
        s.K2_SetRelativeRotation(i, !1, void 0, !1)));
  }
  Gtn() {
    let t, e, i;
    this.Qen &&
      ((i = this.NHo).Type === "Box"
        ? ((e = new UE.Vector(i.Size.X ?? 0, i.Size.Y ?? 0, i.Size.Z ?? 0)),
          this.Wen?.SetBoxExtent(e, !0),
          GlobalData_1.GlobalData.IsPlayInEditor &&
            e.X * e.Y * e.Z > 216e9 &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "SceneItem",
              30,
              "[RangeComponent] Trigger Box配置过大，请联系相关人员",
              ["ConfigId", this.SIe.GetPbDataId()],
            ),
          this.Yen && this.Jen?.SetBoxExtent(e.op_Addition(this.Yen), !0))
        : i.Type === "Sphere"
          ? (this.Wen?.SetSphereRadius(i.Radius, !0),
            GlobalData_1.GlobalData.IsPlayInEditor &&
              i.Radius * i.Radius * i.Radius > 54e9 &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "SceneItem",
                30,
                "[RangeComponent] Trigger Sphere配置过大，请联系相关人员",
                ["ConfigId", this.SIe.GetPbDataId()],
              ),
            this.Yen && this.Jen?.SetSphereRadius(i.Radius + this.Yen, !0))
          : i.Type === "Cylinder" &&
            this.Ken?.StaticMesh &&
            ((e = this.Ken.StaticMesh.GetBounds().BoxExtent),
            (t = i.Radius / e.X),
            (e = i.Height / (2 * e.Z)),
            this.Ken.SetWorldScale3D(
              Vector_1.Vector.Create(t, t, e).ToUeVector(),
            ),
            GlobalData_1.GlobalData.IsPlayInEditor &&
              i.Radius * i.Radius * i.Radius > 54e9 &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "SceneItem",
                40,
                "[RangeComponent] Trigger Cylinder配置过大，请联系相关人员",
                ["ConfigId", this.SIe.GetPbDataId()],
              ),
            this.Yen) &&
            this.zen?.StaticMesh &&
            ((t = this.zen.StaticMesh.GetBounds().BoxExtent),
            (e = (i.Radius + this.Yen) / t.X),
            (i = (i.Height + this.Yen) / (2 * t.Z)),
            this.zen?.SetWorldScale3D(
              Vector_1.Vector.Create(e, e, i).ToUeVector(),
            )));
  }
  gtn() {
    switch (this.NHo.Type) {
      case "Volume":
      case "Box":
      case "Sphere":
      case "Cylinder":
        this.Qen?.IsValid()
          ? (this.Qen.OnActorBeginOverlap.Add(this.ytn),
            this.Qen.OnActorEndOverlap.Add(this.Itn))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              40,
              "[RangeComponent] RangeActor Not Valid",
              ["CreatureDataId", this.SIe.GetCreatureDataId()],
              ["ConfigId", this.SIe.GetPbDataId()],
              ["PlayerId", this.SIe.GetPlayerId()],
            );
        break;
      case "ActorRefVolume":
        this.Hen
          ? this.Hen.AddOnPlayerOverlapCallback(this.Atn)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              40,
              "[RangeComponent] RefComponent Not Valid",
              ["CreatureDataId", this.SIe.GetCreatureDataId()],
              ["ConfigId", this.SIe.GetPbDataId()],
              ["PlayerId", this.SIe.GetPlayerId()],
            );
        break;
      default:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneGameplay",
            40,
            "[RangeComponent] 不支持的配置类型",
            ["CreatureDataId", this.SIe.GetCreatureDataId()],
            ["ConfigId", this.SIe.GetPbDataId()],
            ["PlayerId", this.SIe.GetPlayerId()],
          );
    }
  }
  Dtn() {
    const t = this.NHo;
    this.Qen?.IsValid() &&
      (this.Qen.OnActorBeginOverlap.Remove(this.ytn),
      this.Qen.OnActorEndOverlap.Remove(this.Itn)),
      t.Type === "ActorRefVolume" &&
        this.Hen &&
        this.Hen.RemoveOnPlayerOverlapCallback(this.Atn);
  }
  Stn(t, e, i = !0) {
    if (t?.IsValid()) {
      const s = this.Ntn(t);
      if (s?.Valid) {
        if (s.Id === this.Entity.Id) return;
        const o = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
        const h = s.Entity.GetComponent(0);
        if (
          (h?.IsRole() && h.GetPlayerId() !== o) ??
          (h?.IsVision() && h.GetSummonerPlayerId() !== o)
        )
          return;
      }
      t === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger() &&
        (this.atn = e),
        this.Otn(t, e),
        s?.Valid && (this.Rtn(s, e, i), this.Ttn(t, s, e, i));
    }
  }
  ptn(e) {
    if (!this.$en)
      if (this.Qen?.IsValid()) {
        const t = (0, puerts_1.$ref)(void 0);
        const i = (this.Qen.GetOverlappingActors(t), (0, puerts_1.$unref)(t));
        const s = i?.Num() ?? 0;
        if (s > 0)
          for (let t = 0; t < s; t++) {
            const o = i.Get(t);
            this.Stn(o, !0, e);
          }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneGameplay",
            40,
            "[RangeComponent] ForceCheckOverlapAndCallbackEnter失败 Actor not valid",
            ["CreatureDataId", this.SIe.GetCreatureDataId()],
            ["ConfigId", this.SIe.GetPbDataId()],
            ["PlayerId", this.SIe.GetPlayerId()],
          );
  }
  Ltn(t) {
    let e;
    this.htn &&
      (e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
        Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint() ?? 0,
      )) &&
      this.Ttn(
        RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger(),
        e,
        !1,
        t,
      );
    const i = [];
    const s =
      (this.ntn?.forEach((t) => {
        i.push(t);
      }),
      this.Rtn(i, !1, t),
      []);
    this.stn?.forEach((t) => {
      s.push(t);
    }),
      s.forEach((t) => {
        this.Otn(t, !1);
      }),
      (this.htn = !1),
      this.ntn.clear(),
      this.stn.clear();
  }
  Z5s() {
    const t = [];
    const e = this.htn;
    if (this.Y5s)
      for (let [, i] of this.ntn) {
        i = i.Entity?.GetComponent(0)?.GetCreatureDataId();
        if (!i) break;
        t.push(i);
      }
    this.ReqInitRange(t, e, (t) => {
      t && t.lkn === Protocol_1.Aki.Protocol.lkn.Sys
        ? (this.X5s = !0)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            40,
            "[RangeComponent] ReqInitRange出错",
            ["CreatureDataId", this.SIe.GetCreatureDataId()],
            ["PbDataId", this.SIe.GetPbDataId()],
            ["PlayerId", this.SIe.GetPlayerId()],
          );
    });
  }
  Ntn(t) {
    if (t?.IsValid())
      return t ===
        RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger()
        ? Global_1.Global.BaseCharacter?.IsValid()
          ? ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
              Global_1.Global.BaseCharacter.EntityId,
            )
          : void 0
        : ModelManager_1.ModelManager.CreatureModel?.GetEntityByChildActor(t);
  }
  Rtn(e, i, s = !0) {
    if (e) {
      let t = e;
      if (Array.isArray(t)) {
        if (!t.length) return;
      } else t = [t];
      const o = [];
      for (const a of t) {
        let t = !1;
        if (
          (i
            ? this.ntn.has(a.Id) || (this.ntn.set(a.Id, a), (t = !0))
            : this.ntn.has(a.Id) && (this.ntn.delete(a.Id), (t = !0)),
          t)
        ) {
          for (let t = this.otn.length - 1; t >= 0; t--) {
            const h = this.otn[t];
            try {
              h?.(i, a);
            } catch (t) {
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "SceneItem",
                  40,
                  "[RangeComp] 范围组件回调异常，请检查之前的报错",
                  ["PbDataId", this.SIe?.GetPbDataId()],
                  ["IsEnter", i],
                );
            }
          }
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnEntityInOutRangeLocal,
            i,
            a,
          );
        }
        if (!t || !s) break;
        const r = a.Entity?.GetComponent(0);
        const n = r?.GetCreatureDataId();
        if (!n) break;
        o.push(n),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "SceneItem",
              40,
              "[RangeComp] 实体进出:(加入ReqEntityAccessRange队列)",
              ["PbDataId", this.SIe?.GetPbDataId()],
              ["IsEnter", i],
              ["OtherCreatureId", n],
              ["OtherPbDataId", r?.GetPbDataId()],
              ["OtherPos", a.Entity?.GetComponent(1)?.ActorLocationProxy],
            );
      }
      s && this.ReqEntityAccessRange(i, o);
    }
  }
  Ttn(e, i, s, o = !0) {
    if (
      e === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger() &&
      i.Id === Global_1.Global.BaseCharacter?.EntityId
    ) {
      let t = !1;
      if (
        (s
          ? this.htn || ((this.htn = !0), (t = !0))
          : this.htn && ((this.htn = !1), (t = !0)),
        t)
      ) {
        for (let t = this.itn.length - 1; t >= 0; t--) {
          const h = this.itn[t];
          try {
            h?.(s);
          } catch (t) {
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                40,
                "[RangeComp] 范围组件回调异常，请检查之前的报错",
              );
          }
        }
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
          s,
        );
      }
      t &&
        o &&
        (o = (e = i.Entity?.GetComponent(0))?.GetCreatureDataId()) &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SceneItem",
            40,
            "[RangeComp] 实体进出:(加入ReqMyPlayerAccessRange队列)",
            ["PbDataId", this.SIe?.GetPbDataId()],
            ["IsEnter", s],
            ["OtherPbDataId", e?.GetPbDataId()],
            ["OtherCreatureId", o],
            ["OtherLocation", i.Entity?.GetComponent(1)?.ActorLocationProxy],
          ),
        this.ReqMyPlayerAccessRange(s, o));
    }
  }
  Otn(e, i) {
    if (i) {
      if (this.stn.has(e)) return;
      this.stn.add(e);
    } else {
      if (!this.stn.has(e)) return;
      this.stn.delete(e);
    }
    for (let t = this.rtn.length - 1; t >= 0; t--) {
      const s = this.rtn[t];
      try {
        s?.(i, e);
      } catch (t) {
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            40,
            "[RangeComp] 范围组件回调异常，请检查之前的报错",
          );
      }
    }
    EventSystem_1.EventSystem.EmitWithTarget(
      this.Entity,
      EventDefine_1.EEventName.OnActorInOutRangeLocal,
      i,
      e,
    );
  }
  AddOnPlayerOverlapCallback(t) {
    this.itn?.push(t);
  }
  RemoveOnPlayerOverlapCallback(t) {
    void 0 === this.itn ||
      (t = this.itn.indexOf(t)) < 0 ||
      this.itn.splice(t, 1);
  }
  AddOnEntityOverlapCallback(t) {
    this.otn?.push(t);
  }
  RemoveOnEntityOverlapCallback(t) {
    void 0 === this.otn ||
      (t = this.otn.indexOf(t)) < 0 ||
      this.otn.splice(t, 1);
  }
  AddOnActorOverlapCallback(t) {
    this.rtn?.push(t);
  }
  RemoveOnActorOverlapCallback(t) {
    void 0 === this.rtn ||
      (t = this.rtn.indexOf(t)) < 0 ||
      this.rtn.splice(t, 1);
  }
  ServerUpdateEntitiesInRangeOnline(i, t) {
    let e = void 0;
    if (Array.isArray(t)) {
      if (!t.length) return;
      e = t;
    } else e = [t];
    e.forEach((t) => {
      this.utn?.has(t) && this.utn.delete(t);
      const e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t);
      e
        ? (i ? this.ltn?.set(e.Id, e) : this.ltn?.delete(e.Id),
          this.GetIsLocalSetupComplete() &&
            EventSystem_1.EventSystem.EmitWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnEntityInOutRangeOnline,
              i,
              e,
            ))
        : this.utn.set(t, i);
    });
  }
  ServerUpdatePlayerInRangeOnline(e, t) {
    let i = void 0;
    if (Array.isArray(t)) {
      if (!t.length) return;
      i = t;
    } else i = [t];
    i.forEach((t) => {
      e ? this._tn?.add(t) : this._tn?.delete(t),
        this.GetIsLocalSetupComplete() &&
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnPlayerInOutRangeOnline,
            e,
            t,
          );
    });
  }
  ReqMyPlayerAccessRange(t, e) {
    let i;
    this.J5s &&
      (((i = Protocol_1.Aki.Protocol.Pds.create()).c7n =
        this.SIe.GetCreatureDataId()),
      (i.pFn = t
        ? Protocol_1.Aki.Protocol.pFn.Proto_RangeEnter
        : Protocol_1.Aki.Protocol.pFn.Proto_RangeLeave),
      Net_1.Net.Call(14101, i, () => {}));
  }
  ReqEntityAccessRange(t, e) {
    let i;
    this.Y5s &&
      e?.length &&
      (((i = Protocol_1.Aki.Protocol.Dds.create()).c7n =
        this.SIe.GetCreatureDataId()),
      (i.W5s = e),
      (i.pFn = t
        ? Protocol_1.Aki.Protocol.pFn.Proto_RangeEnter
        : Protocol_1.Aki.Protocol.pFn.Proto_RangeLeave),
      Net_1.Net.Call(5086, i, () => {}));
  }
  ReqInitRange(t, e, i = () => {}) {
    const s = Protocol_1.Aki.Protocol.$5s.create();
    (s.c7n = this.SIe.GetCreatureDataId()),
      (s.Q5s = t),
      (s.K5s = e),
      Net_1.Net.Call(12354, s, i);
  }
  IsOverlappingPlayer() {
    const t = this.NHo;
    const e = RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger();
    return t?.Type !== "ActorRefVolume"
      ? !!this.Qen?.IsValid() && this.Qen.IsOverlappingActor(e)
      : this.atn;
  }
  UpdateBoxRange(t, e) {
    this.Qen &&
      this.Wen &&
      this.NHo.Type === "Box" &&
      (this.Qen.K2_SetActorRelativeLocation(t, !1, void 0, !0),
      this.Wen?.SetBoxExtent(e, !0),
      GlobalData_1.GlobalData.IsPlayInEditor &&
        e.X * e.Y * e.Z > 216e9 &&
        Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "SceneItem",
          30,
          "[RangeComponent] Trigger Box配置过大，请联系相关人员",
          ["ConfigId", this.SIe.GetPbDataId()],
        ),
      this.Yen) &&
      this.Jen &&
      this.Jen?.SetBoxExtent(e.op_Addition(this.Yen), !0);
  }
  SetRangeActorParent(t) {
    this.Qen?.IsValid() &&
      (this.Qen.K2_DetachFromActor(1, 1, 1),
      this.Qen.K2_AttachToActor(t, void 0, 1, 1, 1, !1),
      this.Qen.K2_SetActorTransform(t.GetTransform(), !1, void 0, !0));
  }
};
(RangeComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(74)],
  RangeComponent,
)),
  (exports.RangeComponent = RangeComponent);
// # sourceMappingURL=RangeComponent.js.map

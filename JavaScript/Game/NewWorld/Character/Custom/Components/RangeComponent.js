"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var o,
      h = arguments.length,
      r =
        h < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, i, s);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (o = t[n]) && (r = (h < 3 ? o(r) : 3 < h ? o(e, i, r) : o(e, i)) || r);
    return 3 < h && r && Object.defineProperty(e, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RangeComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global"),
  GlobalData_1 = require("../../../../GlobalData"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RoleTriggerController_1 = require("../../Role/RoleTriggerController"),
  TRIGGER_COMPONENT_TAG = new UE.FName("TriggerComponent"),
  DEBUG_DETAIL_KEY = "RangeComponent";
let RangeComponent = class RangeComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.EIe = void 0),
      (this.Men = void 0),
      (this.bjo = void 0),
      (this.Een = void 0),
      (this.Sen = void 0),
      (this.yen = void 0),
      (this.Ien = void 0),
      (this.Den = !1),
      (this.Ren = !1),
      (this.Uen = 0),
      (this.Aen = void 0),
      (this.Pen = void 0),
      (this.Kca = void 0),
      (this.xen = !1),
      (this.wen = !1),
      (this.g$s = !1),
      (this.Ben = void 0),
      (this.ben = void 0),
      (this.qen = void 0),
      (this.Nen = void 0),
      (this.Oen = void 0),
      (this.ken = void 0),
      (this.Fen = !1),
      (this.Ven = !1),
      (this.Hen = void 0),
      (this.jen = void 0),
      (this.Wen = void 0),
      (this.f$s = !0),
      (this.v$s = !0),
      (this.Ken = (t) => {
        t && (this.Ien?.IsValid() || this.Ren)
          ? (this.Qen(),
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.OnChangeRole,
              this.Xen,
            ),
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.RemoveEntity,
              this.zpe,
            ),
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.AddEntity,
              this.GUe,
            ),
            (this.wen = !0),
            this.p$s())
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              30,
              "[RangeComponent] RangeActor初始化失败",
              ["CreatureDataId", this.EIe.GetCreatureDataId()],
              ["ConfigId", this.EIe.GetPbDataId()],
              ["PlayerId", this.EIe.GetPlayerId()],
            );
      }),
      (this.p$s = () => {
        this.GetIsLocalSetupComplete() &&
          (ModelManager_1.ModelManager.SundryModel?.IsEnableDebugDetail(
            DEBUG_DETAIL_KEY,
          ) &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SceneItem",
              40,
              "[RangeComponent] 完成初始化(开始)",
              ["CreatureDataId", this.EIe.GetCreatureDataId()],
              ["ConfigId", this.EIe.GetPbDataId()],
            ),
          this.Yen(),
          this.zen(!1),
          this.GetIsNotServerRange() || this.M$s(),
          ModelManager_1.ModelManager.SundryModel?.IsEnableDebugDetail(
            DEBUG_DETAIL_KEY,
          )) &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneItem",
            40,
            "[RangeComponent] 完成初始化(结束)",
            ["CreatureDataId", this.EIe.GetCreatureDataId()],
            ["ConfigId", this.EIe.GetPbDataId()],
          );
      }),
      (this.Zen = void 0),
      (this.otn = (t, e) => {
        this.ttn(e, !0);
      }),
      (this.rtn = (t, e) => {
        this.ttn(e, !1);
      }),
      (this.Xen = (t, e) => {
        t?.Valid &&
          this.Fen !== this.Ven &&
          this.ntn(
            RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger(),
            t,
            this.Fen,
          );
      }),
      (this.GUe = (t, e, i) => {
        var s;
        e?.Valid &&
          (e = e.Entity?.GetComponent(0)?.GetCreatureDataId()) &&
          this.Wen?.has(e) &&
          ((s = !!this.Wen.get(e)),
          this.ServerUpdateEntitiesInRangeOnline(s, e));
      }),
      (this.zpe = (t, e) => {
        e?.Valid &&
          (e.Id === this.Entity.Id
            ? (this.stn(!1), this.atn())
            : this.Oen?.has(e.Id) && this.htn(e, !1, !1));
      }),
      (this.ltn = (t) => {
        this.ttn(
          RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger(),
          t,
        );
      });
  }
  GetRangeActor() {
    return this.Ien?.IsValid() ? this.Ien : void 0;
  }
  GetShapeComp() {
    return this.Sen?.IsValid() ? this.Sen : void 0;
  }
  GetMeshComp() {
    return this.yen?.IsValid() ? this.yen : void 0;
  }
  GetRangeType() {
    return this.bjo?.Type;
  }
  GetShapeCompTransform() {
    return this.Sen?.IsValid() ? this.Sen.GetRelativeTransform() : void 0;
  }
  GetEntitiesInRangeLocal() {
    return this.Oen;
  }
  GetActorsInRangeLocal() {
    return this.ken;
  }
  GetEntitiesInRangeOnline() {
    return this.Hen;
  }
  GetPlayerInRangeOnline() {
    return this.jen;
  }
  GetIsLocalSetupComplete() {
    return this.xen && this.wen;
  }
  GetIsSetupComplete() {
    return this.GetIsNotServerRange()
      ? this.xen && this.wen
      : this.xen && this.wen && this.g$s;
  }
  GetIsNotServerRange() {
    return !this.f$s && !this.v$s;
  }
  GetShapeConfig() {
    return this.bjo;
  }
  OnInitData() {
    (this.EIe = this.Entity.GetComponent(0)),
      (this.Men = this.Entity.GetComponent(149));
    var t = this.EIe?.GetPbEntityInitData();
    return (
      !!t &&
      (this.S$s(t)
        ? (this.E$s(t),
          ModelManager_1.ModelManager.SundryModel?.IsEnableDebugDetail(
            DEBUG_DETAIL_KEY,
          ) &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SceneItem",
              40,
              "[RangeComponent] 初始化网络节省配置完成",
              ["CreatureDataId", this.EIe.GetCreatureDataId()],
              ["ConfigId", this.EIe.GetPbDataId()],
              ["ReqEntityAccessRange", this.f$s],
              ["ReqPlayerAccessRange", this.v$s],
            ),
          (this.Oen = new Map()),
          (this.Fen = !1),
          (this.ken = new Set()),
          (this.Hen = new Map()),
          (this.jen = new Set()),
          (this.ben = []),
          (this.qen = []),
          (this.Nen = []),
          (this.wen = !1),
          (this.xen = !1),
          (this.Wen = new Map()),
          this.EIe.PbInRangeEntityCreatureDataIds &&
            this.ServerUpdateEntitiesInRangeOnline(
              !0,
              this.EIe.PbInRangeEntityCreatureDataIds,
            ),
          this.EIe.PbInRangePlayerIds &&
            this.ServerUpdatePlayerInRangeOnline(
              !0,
              this.EIe.PbInRangePlayerIds,
            ),
          !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              30,
              "[RangeComponent] 范围数据出错",
              ["CreatureDataId", this.EIe.GetCreatureDataId()],
              ["ConfigId", this.EIe.GetPbDataId()],
              ["PlayerId", this.EIe.GetPlayerId()],
            ),
          !1))
    );
  }
  S$s(t) {
    var e = (0, IComponent_1.getComponent)(t.ComponentsData, "RangeComponent"),
      i = (0, IComponent_1.getComponent)(t.ComponentsData, "BeamCastComponent"),
      s = (0, IComponent_1.getComponent)(t.ComponentsData, "FanComponent");
    return (
      e
        ? (this.bjo = e.Shape)
        : i
          ? ((e = { Type: "Cylinder", ...i.Range }), (this.bjo = e))
          : s &&
            ((i = {
              Type: "Box",
              Center: Vector_1.Vector.ZeroVectorProxy,
              Size: Vector_1.Vector.OneVectorProxy,
            }),
            (this.bjo = i)),
      !!this.bjo &&
        (!(e = (0, IComponent_1.getComponent)(
          t.ComponentsData,
          "TriggerComponent",
        )) ||
          ("Box" !== this.bjo.Type &&
            "Cylinder" !== this.bjo.Type &&
            "Sphere" !== this.bjo.Type) ||
          (this.Uen = e.ExitConfig?.ExtraRange ?? 0),
        !0)
    );
  }
  E$s(t) {
    var i = (0, IComponent_1.getComponent)(
        t.ComponentsData,
        "TriggerComponent",
      ),
      s = (0, IComponent_1.getComponent)(t.ComponentsData, "TrampleComponent"),
      e = (0, IComponent_1.getComponent)(t.ComponentsData, "RangeComponent"),
      o = (0, IComponent_1.getComponent)(
        t.ComponentsData,
        "EffectAreaComponent",
      ),
      t = (0, IComponent_1.getComponent)(
        t.ComponentsData,
        "ClientTriggerComponent",
      );
    if (e) {
      if (i ?? s ?? o ?? t) {
        let t = !1,
          e = !1;
        i &&
          (!i.Match.OnlyPlayer ||
          i.ChangeRoleTrigger ||
          i.Match.AllCharacter ||
          i.Match.Categories?.length
            ? ((e = !0), (t = !0))
            : (e = !0)),
          s && ((e = !0), (t = !0)),
          (this.f$s = t),
          (this.v$s = e);
      }
    } else (this.f$s = !1), (this.v$s = !1);
  }
  OnStart() {
    return (
      this.InitRangeActorAsync().then((t) => {
        this.Ken(t);
      }),
      !0
    );
  }
  OnActivate() {
    (this.xen = !0), this.p$s();
  }
  OnEnd() {
    return (
      void 0 !== this.Ben &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Ben),
        (this.Ben = void 0)),
      this.Een?.IsValid() &&
        this.Zen &&
        (this.Een.OnTriggerVolumeAddToSubsystem.Remove(this.Zen),
        (this.Een = void 0),
        (this.Zen = void 0)),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnChangeRole,
        this.Xen,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChangeRole,
          this.Xen,
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
      this.atn(),
      (this.Sen = void 0),
      (this.yen = void 0),
      this.Den &&
        (this.Ien?.IsValid() && ActorSystem_1.ActorSystem.Put(this.Ien),
        this.Kca?.IsValid()) &&
        ActorSystem_1.ActorSystem.Put(this.Kca),
      (this.Ien = void 0),
      (this.Kca = void 0),
      (this.Den = !1),
      this.Wen?.clear(),
      !0
    );
  }
  async InitRangeActorAsync() {
    return new Promise((e, t) => {
      this.Ren = !1;
      const i = this.bjo;
      switch (i.Type) {
        case "Box":
          e(this._tn(i));
          break;
        case "Sphere":
          e(this.utn(i));
          break;
        case "Cylinder": {
          const o =
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "BaseCylinderStaticMeshForRange",
            ) ?? "None";
          this.Ben && ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Ben),
            (this.Ben = ResourceSystem_1.ResourceSystem.LoadAsync(
              o,
              UE.Object,
              (t) => {
                (this.Ben = void 0),
                  t instanceof UE.StaticMesh
                    ? e(this.ctn(i, t))
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
          (this.Een = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
            GlobalData_1.GlobalData.World,
            UE.KuroTriggerVolumeManager.StaticClass(),
          )),
            this.Zen &&
              (this.Een.OnTriggerVolumeAddToSubsystem.Remove(this.Zen),
              (this.Zen = void 0));
          var s = this.Een?.GetKuroTriggerVolume(new UE.FName(i.VolumeKey));
          s
            ? e(this.mtn(i, s))
            : (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Entity",
                  40,
                  "[RangeComponent] KuroTriggerVolume未找到，等待加载",
                  ["VolumeKey", i?.VolumeKey],
                  ["CreatureDataId", this.EIe.GetCreatureDataId()],
                  ["ConfigId", this.EIe.GetPbDataId()],
                  ["PlayerId", this.EIe.GetPlayerId()],
                ),
              (this.Zen = (t) => {
                t?.toString() === i.VolumeKey &&
                  (Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Entity",
                      40,
                      "[RangeComponent] KuroTriggerVolume已加载",
                      ["VolumeKey", i?.VolumeKey],
                      ["CreatureDataId", this.EIe.GetCreatureDataId()],
                      ["ConfigId", this.EIe.GetPbDataId()],
                      ["PlayerId", this.EIe.GetPlayerId()],
                    ),
                  (t = this.Een?.GetKuroTriggerVolume(t)),
                  e(!!t && this.mtn(i, t)),
                  this.Zen) &&
                  (this.Een?.OnTriggerVolumeAddToSubsystem.Remove(this.Zen),
                  (this.Zen = void 0));
              }),
              this.Een.OnTriggerVolumeAddToSubsystem.Add(this.Zen));
          break;
        case "ActorRefVolume":
          (this.Ren = !0), e(!0);
      }
    });
  }
  _tn(t) {
    if (
      ((this.Ien = ActorSystem_1.ActorSystem.Get(
        UE.Actor.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
      )),
      (this.Den = !0),
      (this.Sen = this.Ien?.AddComponentByClass(
        UE.BoxComponent.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
      )),
      !this.Sen?.IsValid())
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneGameplay",
            40,
            "[RangeComponent] BoxShape创建失败",
            ["CreatureDataId", this.EIe.GetCreatureDataId()],
            ["ConfigId", this.EIe.GetPbDataId()],
            ["PlayerId", this.EIe.GetPlayerId()],
          ),
        !1
      );
    if (
      (this.Sen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1), this.Uen)
    ) {
      if (
        ((this.Kca = ActorSystem_1.ActorSystem.Get(
          UE.Actor.StaticClass(),
          MathUtils_1.MathUtils.DefaultTransform,
        )),
        (this.Aen = this.Kca?.AddComponentByClass(
          UE.BoxComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
        )),
        !this.Aen?.IsValid())
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              40,
              "[RangeComponent] BoxShape(ExpandedExit)创建失败",
              ["CreatureDataId", this.EIe.GetCreatureDataId()],
              ["ConfigId", this.EIe.GetPbDataId()],
              ["PlayerId", this.EIe.GetPlayerId()],
            ),
          !1
        );
      this.Aen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1);
    }
    return !0;
  }
  utn(t) {
    if (
      ((this.Ien = ActorSystem_1.ActorSystem.Get(
        UE.Actor.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
      )),
      (this.Den = !0),
      (this.Sen = this.Ien?.AddComponentByClass(
        UE.SphereComponent.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
      )),
      !this.Sen?.IsValid())
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneGameplay",
            40,
            "[RangeComponent] SphereShape创建失败",
            ["CreatureDataId", this.EIe.GetCreatureDataId()],
            ["ConfigId", this.EIe.GetPbDataId()],
            ["PlayerId", this.EIe.GetPlayerId()],
          ),
        !1
      );
    if (
      (this.Sen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1), this.Uen)
    ) {
      if (
        ((this.Kca = ActorSystem_1.ActorSystem.Get(
          UE.Actor.StaticClass(),
          MathUtils_1.MathUtils.DefaultTransform,
        )),
        (this.Aen = this.Kca?.AddComponentByClass(
          UE.SphereComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
        )),
        !this.Aen?.IsValid())
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              40,
              "[RangeComponent] SphereShape(ExpandedExit)创建失败",
              ["CreatureDataId", this.EIe.GetCreatureDataId()],
              ["ConfigId", this.EIe.GetPbDataId()],
              ["PlayerId", this.EIe.GetPlayerId()],
            ),
          !1
        );
      this.Aen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1);
    }
    return !0;
  }
  ctn(t, e) {
    if (
      ((this.Ien = ActorSystem_1.ActorSystem.Get(
        UE.Actor.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
      )),
      (this.Den = !0),
      (this.yen = this.Ien?.AddComponentByClass(
        UE.StaticMeshComponent.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
        new UE.FName("MeshComp"),
      )),
      !this.yen?.IsValid())
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneGameplay",
            40,
            "[RangeComponent] CylinderMesh创建失败",
            ["CreatureDataId", this.EIe.GetCreatureDataId()],
            ["ConfigId", this.EIe.GetPbDataId()],
            ["PlayerId", this.EIe.GetPlayerId()],
          ),
        !1
      );
    if (
      (this.yen.SetStaticMesh(e),
      this.yen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1),
      this.yen.SetHiddenInGame(!0),
      this.yen.SetVisibility(!1),
      this.Uen)
    ) {
      if (
        ((this.Kca = ActorSystem_1.ActorSystem.Get(
          UE.Actor.StaticClass(),
          MathUtils_1.MathUtils.DefaultTransform,
        )),
        (this.Pen = this.Kca?.AddComponentByClass(
          UE.StaticMeshComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
          new UE.FName("ExpandedExitMeshComp"),
        )),
        !this.Pen?.IsValid())
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              40,
              "[RangeComponent] CylinderMesh创建失败",
              ["CreatureDataId", this.EIe.GetCreatureDataId()],
              ["ConfigId", this.EIe.GetPbDataId()],
              ["PlayerId", this.EIe.GetPlayerId()],
            ),
          !1
        );
      this.Pen.SetStaticMesh(e),
        this.Pen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1),
        this.Pen.SetHiddenInGame(!0),
        this.Pen.SetVisibility(!1);
    }
    return !0;
  }
  mtn(t, e) {
    var i, s;
    return (
      (this.Ien = e),
      (this.Den = !1),
      e?.IsValid()
        ? (GlobalData_1.GlobalData.IsPlayInEditor &&
            ((i = (0, puerts_1.$ref)(void 0)),
            (s = (0, puerts_1.$ref)(void 0)),
            e.GetActorBounds(!1, i, s),
            27e9 < (e = (0, puerts_1.$unref)(s)).X * e.Y * e.Z) &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "SceneItem",
              30,
              "[RangeComponent] TriggerVolume配置过大，请联系相关人员",
              ["ConfigId", this.EIe.GetPbDataId()],
            ),
          !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              30,
              "[RangeComponent] KuroTriggerVolume非Valid",
              ["VolumeKey", t?.VolumeKey],
              ["CreatureDataId", this.EIe.GetCreatureDataId()],
              ["ConfigId", this.EIe.GetPbDataId()],
              ["PlayerId", this.EIe.GetPlayerId()],
            ),
          !1)
    );
  }
  Qen() {
    this.Ren || (this.Den ? this.dtn() : this.Ctn(), this.gtn());
  }
  dtn() {
    if (this.Ien && this.Den && !this.Ren) {
      var e = this.bjo;
      if ("Volume" !== e.Type && "ActorRefVolume" !== e.Type) {
        var i = this.EIe.GetTransform(),
          s = this.Entity.GetComponent(1)?.Owner,
          o = new UE.Vector(e.Center.X ?? 0, e.Center.Y ?? 0, e.Center.Z ?? 0);
        let t = void 0;
        "Box" === e.Type &&
          e.Rotator &&
          (t = new UE.Rotator(
            e.Rotator.Y ?? 0,
            e.Rotator.Z ?? 0,
            e.Rotator.X ?? 0,
          )),
          this.Ien.K2_SetActorTransform(i, !1, void 0, !0),
          s?.IsValid() && this.Ien.K2_AttachToActor(s, void 0, 2, 2, 1, !1),
          this.Ien.K2_AddActorLocalOffset(o, !1, void 0, !1),
          t && this.Ien.K2_AddActorLocalRotation(t, !1, void 0, !1),
          this.Uen &&
            this.Kca &&
            (this.Kca?.K2_SetActorTransform(i, !1, void 0, !0),
            s?.IsValid() && this.Kca?.K2_AttachToActor(s, void 0, 2, 2, 1, !1),
            this.Kca?.K2_AddActorLocalOffset(o, !1, void 0, !1),
            t) &&
            this.Kca?.K2_AddActorLocalRotation(t, !1, void 0, !1);
      }
    }
  }
  Ctn() {
    var t, e, i, s;
    !this.Ien ||
      this.Den ||
      this.Ren ||
      ("Volume" !== (t = this.bjo).Type &&
        "ActorRefVolume" !== t.Type &&
        ((e = new UE.Vector(t.Center.X ?? 0, t.Center.Y ?? 0, t.Center.Z ?? 0)),
        (i = new UE.Rotator()),
        "Box" === t.Type &&
          t.Rotator &&
          i.Add(t.Rotator.Y ?? 0, t.Rotator.Z ?? 0, t.Rotator.X ?? 0),
        (s =
          "Cylinder" === t.Type ? this.yen : this.Sen).K2_SetRelativeLocation(
          e,
          !1,
          void 0,
          !1,
        ),
        s.K2_SetRelativeRotation(i, !1, void 0, !1),
        this.Uen) &&
        ((s =
          "Cylinder" === t.Type ? this.Pen : this.Aen).K2_SetRelativeLocation(
          e,
          !1,
          void 0,
          !1,
        ),
        s.K2_SetRelativeRotation(i, !1, void 0, !1)));
  }
  gtn() {
    var t, e, i;
    this.Ien &&
      ("Box" === (i = this.bjo).Type
        ? ((e = new UE.Vector(i.Size.X ?? 0, i.Size.Y ?? 0, i.Size.Z ?? 0)),
          this.Sen?.SetBoxExtent(e, !0),
          GlobalData_1.GlobalData.IsPlayInEditor &&
            216e9 < e.X * e.Y * e.Z &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "SceneItem",
              30,
              "[RangeComponent] Trigger Box配置过大，请联系相关人员",
              ["ConfigId", this.EIe.GetPbDataId()],
            ),
          this.Uen && this.Aen?.SetBoxExtent(e.op_Addition(this.Uen), !0))
        : "Sphere" === i.Type
          ? (this.Sen?.SetSphereRadius(i.Radius, !0),
            GlobalData_1.GlobalData.IsPlayInEditor &&
              54e9 < i.Radius * i.Radius * i.Radius &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "SceneItem",
                30,
                "[RangeComponent] Trigger Sphere配置过大，请联系相关人员",
                ["ConfigId", this.EIe.GetPbDataId()],
              ),
            this.Uen && this.Aen?.SetSphereRadius(i.Radius + this.Uen, !0))
          : "Cylinder" === i.Type &&
            this.yen?.StaticMesh &&
            ((e = this.yen.StaticMesh.GetBounds().BoxExtent),
            (t = i.Radius / e.X),
            (e = i.Height / (2 * e.Z)),
            this.yen.SetWorldScale3D(
              Vector_1.Vector.Create(t, t, e).ToUeVector(),
            ),
            GlobalData_1.GlobalData.IsPlayInEditor &&
              54e9 < i.Radius * i.Radius * i.Radius &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "SceneItem",
                40,
                "[RangeComponent] Trigger Cylinder配置过大，请联系相关人员",
                ["ConfigId", this.EIe.GetPbDataId()],
              ),
            this.Uen) &&
            this.Pen?.StaticMesh &&
            ((t = this.Pen.StaticMesh.GetBounds().BoxExtent),
            (e = (i.Radius + this.Uen) / t.X),
            (i = (i.Height + this.Uen) / (2 * t.Z)),
            this.Pen?.SetWorldScale3D(
              Vector_1.Vector.Create(e, e, i).ToUeVector(),
            )));
  }
  Yen() {
    switch (this.bjo.Type) {
      case "Volume":
      case "Box":
      case "Sphere":
      case "Cylinder":
        this.Ien?.IsValid()
          ? this.Uen
            ? this.Kca?.IsValid()
              ? (this.Ien.OnActorBeginOverlap.Add(this.otn),
                this.Kca.OnActorEndOverlap.Add(this.rtn))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "SceneGameplay",
                  40,
                  "[RangeComponent] ExpandedExitRangeActor Not Valid",
                  ["CreatureDataId", this.EIe.GetCreatureDataId()],
                  ["ConfigId", this.EIe.GetPbDataId()],
                  ["PlayerId", this.EIe.GetPlayerId()],
                )
            : (this.Ien.OnActorBeginOverlap.Add(this.otn),
              this.Ien.OnActorEndOverlap.Add(this.rtn))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              40,
              "[RangeComponent] RangeActor Not Valid",
              ["CreatureDataId", this.EIe.GetCreatureDataId()],
              ["ConfigId", this.EIe.GetPbDataId()],
              ["PlayerId", this.EIe.GetPlayerId()],
            );
        break;
      case "ActorRefVolume":
        this.Men
          ? this.Men.AddOnPlayerOverlapCallback(this.ltn)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              40,
              "[RangeComponent] RefComponent Not Valid",
              ["CreatureDataId", this.EIe.GetCreatureDataId()],
              ["ConfigId", this.EIe.GetPbDataId()],
              ["PlayerId", this.EIe.GetPlayerId()],
            );
        break;
      default:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneGameplay",
            40,
            "[RangeComponent] 不支持的配置类型",
            ["CreatureDataId", this.EIe.GetCreatureDataId()],
            ["ConfigId", this.EIe.GetPbDataId()],
            ["PlayerId", this.EIe.GetPlayerId()],
          );
    }
  }
  atn() {
    var t = this.bjo;
    this.Ien?.IsValid() &&
      (this.Ien.OnActorBeginOverlap.Remove(this.otn),
      this.Ien.OnActorEndOverlap.Remove(this.rtn)),
      this.Kca?.IsValid() && this.Kca.OnActorEndOverlap.Remove(this.rtn),
      "ActorRefVolume" === t.Type &&
        this.Men &&
        this.Men.RemoveOnPlayerOverlapCallback(this.ltn);
  }
  ttn(t, e, i = !0) {
    if (t?.IsValid()) {
      var s = this.ftn(t);
      if (s?.Valid) {
        if (s.Id === this.Entity.Id) return;
        var o = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
          h = s.Entity.GetComponent(0);
        if (
          (h?.IsRole() && h.GetPlayerId() !== o) ??
          (h?.IsVision() && h.GetSummonerPlayerId() !== o)
        )
          return;
      }
      t === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger() &&
        (this.Fen = e),
        this.ptn(t, e),
        s?.Valid && (this.htn(s, e, i), this.ntn(t, s, e, i));
    }
  }
  zen(e) {
    if (!this.Ren)
      if (this.Ien?.IsValid()) {
        var t = (0, puerts_1.$ref)(void 0),
          i = (this.Ien.GetOverlappingActors(t), (0, puerts_1.$unref)(t)),
          s = i?.Num() ?? 0;
        if (0 < s)
          for (let t = 0; t < s; t++) {
            var o = i.Get(t);
            this.ttn(o, !0, e);
          }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneGameplay",
            40,
            "[RangeComponent] ForceCheckOverlapAndCallbackEnter失败 Actor not valid",
            ["CreatureDataId", this.EIe.GetCreatureDataId()],
            ["ConfigId", this.EIe.GetPbDataId()],
            ["PlayerId", this.EIe.GetPlayerId()],
          );
  }
  stn(t) {
    var e;
    this.Ven &&
      (e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
        Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint() ?? 0,
      )) &&
      this.ntn(
        RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger(),
        e,
        !1,
        t,
      );
    const i = [],
      s =
        (this.Oen?.forEach((t) => {
          i.push(t);
        }),
        this.htn(i, !1, t),
        []);
    this.ken?.forEach((t) => {
      s.push(t);
    }),
      s.forEach((t) => {
        this.ptn(t, !1);
      }),
      (this.Ven = !1),
      this.Oen.clear(),
      this.ken.clear();
  }
  M$s() {
    var t = [],
      e = this.Ven;
    if (this.f$s)
      for (var [, i] of this.Oen) {
        i = i.Entity?.GetComponent(0)?.GetCreatureDataId();
        if (!i) break;
        t.push(i);
      }
    this.ReqInitRange(t, e, (t) => {
      t && t.O4n === Protocol_1.Aki.Protocol.O4n.NRs
        ? (this.g$s = !0)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            40,
            "[RangeComponent] ReqInitRange出错",
            ["CreatureDataId", this.EIe.GetCreatureDataId()],
            ["PbDataId", this.EIe.GetPbDataId()],
            ["PlayerId", this.EIe.GetPlayerId()],
          );
    });
  }
  ftn(t) {
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
  htn(e, i, s = !0) {
    if (e) {
      let t = e;
      if (Array.isArray(t)) {
        if (!t.length) return;
      } else t = [t];
      var o = [];
      for (const r of t) {
        let t = !1;
        if (
          (i
            ? this.Oen.has(r.Id) || (this.Oen.set(r.Id, r), (t = !0))
            : this.Oen.has(r.Id) && (this.Oen.delete(r.Id), (t = !0)),
          t)
        ) {
          for (let t = this.qen.length - 1; 0 <= t; t--) {
            var h = this.qen[t];
            try {
              h?.(i, r);
            } catch (t) {
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "SceneItem",
                  40,
                  "[RangeComp] 范围组件回调异常，请检查之前的报错",
                  ["PbDataId", this.EIe?.GetPbDataId()],
                  ["IsEnter", i],
                );
            }
          }
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnEntityInOutRangeLocal,
            i,
            r,
          );
        }
        t && s && o.push(r);
      }
      s && this.ReqEntityAccessRange(i, o);
    }
  }
  ntn(t, e, i, s = !0) {
    if (
      t === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger() &&
      e.Id === Global_1.Global.BaseCharacter?.EntityId
    ) {
      let t = !1;
      if (
        (i
          ? this.Ven || ((this.Ven = !0), (t = !0))
          : this.Ven && ((this.Ven = !1), (t = !0)),
        t)
      ) {
        for (let t = this.ben.length - 1; 0 <= t; t--) {
          var o = this.ben[t];
          try {
            o?.(i);
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
          i,
        );
      }
      t && s && this.ReqMyPlayerAccessRange(i, e);
    }
  }
  ptn(e, i) {
    if (i) {
      if (this.ken.has(e)) return;
      this.ken.add(e);
    } else {
      if (!this.ken.has(e)) return;
      this.ken.delete(e);
    }
    for (let t = this.Nen.length - 1; 0 <= t; t--) {
      var s = this.Nen[t];
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
    this.ben?.push(t);
  }
  RemoveOnPlayerOverlapCallback(t) {
    void 0 === this.ben ||
      (t = this.ben.indexOf(t)) < 0 ||
      this.ben.splice(t, 1);
  }
  AddOnEntityOverlapCallback(t) {
    this.qen?.push(t);
  }
  RemoveOnEntityOverlapCallback(t) {
    void 0 === this.qen ||
      (t = this.qen.indexOf(t)) < 0 ||
      this.qen.splice(t, 1);
  }
  AddOnActorOverlapCallback(t) {
    this.Nen?.push(t);
  }
  RemoveOnActorOverlapCallback(t) {
    void 0 === this.Nen ||
      (t = this.Nen.indexOf(t)) < 0 ||
      this.Nen.splice(t, 1);
  }
  ServerUpdateEntitiesInRangeOnline(i, t) {
    let e = void 0;
    if (Array.isArray(t)) {
      if (!t.length) return;
      e = t;
    } else e = [t];
    e.forEach((t) => {
      this.Wen?.has(t) && this.Wen.delete(t);
      var e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t);
      e
        ? (i ? this.Hen?.set(e.Id, e) : this.Hen?.delete(e.Id),
          this.GetIsLocalSetupComplete() &&
            EventSystem_1.EventSystem.EmitWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnEntityInOutRangeOnline,
              i,
              e,
            ))
        : this.Wen.set(t, i);
    });
  }
  ServerUpdatePlayerInRangeOnline(e, t) {
    let i = void 0;
    if (Array.isArray(t)) {
      if (!t.length) return;
      i = t;
    } else i = [t];
    i.forEach((t) => {
      e ? this.jen?.add(t) : this.jen?.delete(t),
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
    var i, s, o;
    this.v$s &&
      (i = (o = e.Entity?.GetComponent(0))?.GetCreatureDataId()) &&
      (ModelManager_1.ModelManager.SundryModel?.IsEnableDebugDetail(
        DEBUG_DETAIL_KEY,
      ) &&
        ((s = e.Entity?.GetComponent(1)), Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info(
          "SceneItem",
          40,
          "[RangeComp] 本机玩家进出:(发起PlayerAccessRange)",
          ["PbDataId", this.EIe?.GetPbDataId()],
          ["CreatureDataId", this.EIe?.GetCreatureDataId()],
          ["IsEnter", t],
          ["OtherPbDataId", o?.GetPbDataId()],
          ["OtherCreatureId", i],
          ["OtherLocation", s?.ActorLocationProxy],
        ),
      e.Entity?.GetComponent(59)?.CollectSampleAndSend(!0),
      ((o = Protocol_1.Aki.Protocol.Igs.create()).HWn =
        this.EIe.GetCreatureDataId()),
      (o.Q5n = t
        ? Protocol_1.Aki.Protocol.Q5n.Proto_RangeEnter
        : Protocol_1.Aki.Protocol.Q5n.Proto_RangeLeave),
      Net_1.Net.Call(28572, o, () => {}));
  }
  ReqEntityAccessRange(t, e) {
    if (this.f$s && e?.length) {
      var i = [];
      for (const r of e) {
        var s,
          o = r.Entity?.GetComponent(0),
          h = o?.GetCreatureDataId();
        h &&
          (i.push(h),
          ModelManager_1.ModelManager.SundryModel?.IsEnableDebugDetail(
            DEBUG_DETAIL_KEY,
          ) &&
            ((s = r.Entity?.GetComponent(1)), Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info(
              "SceneItem",
              40,
              "[RangeComp] 实体进出:(加入EntityAccessRange队列)",
              ["PbDataId", this.EIe?.GetPbDataId()],
              ["CreatureDataId", this.EIe?.GetCreatureDataId()],
              ["IsEnter", t],
              ["OtherPbDataId", o?.GetPbDataId()],
              ["OtherCreatureId", h],
              ["OtherPos", s?.ActorLocationProxy],
            ),
          r.Entity?.GetComponent(59)?.CollectSampleAndSend(!0));
      }
      e = Protocol_1.Aki.Protocol.Egs.create();
      (e.HWn = this.EIe.GetCreatureDataId()),
        (e._$s = i),
        (e.Q5n = t
          ? Protocol_1.Aki.Protocol.Q5n.Proto_RangeEnter
          : Protocol_1.Aki.Protocol.Q5n.Proto_RangeLeave),
        Net_1.Net.Call(9318, e, () => {});
    }
  }
  ReqInitRange(t, e, i = () => {}) {
    var s = Protocol_1.Aki.Protocol.o$s.create();
    (s.HWn = this.EIe.GetCreatureDataId()),
      (s.u$s = t),
      (s.c$s = e),
      Net_1.Net.Call(10029, s, i);
  }
  IsOverlappingPlayer() {
    var t = this.bjo,
      e = RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger();
    return "ActorRefVolume" !== t?.Type
      ? !!this.Ien?.IsValid() && this.Ien.IsOverlappingActor(e)
      : this.Fen;
  }
  UpdateBoxRange(t, e) {
    this.Ien &&
      this.Sen &&
      "Box" === this.bjo.Type &&
      (this.Ien.K2_SetActorRelativeLocation(t, !1, void 0, !0),
      this.Sen?.SetBoxExtent(e, !0),
      GlobalData_1.GlobalData.IsPlayInEditor &&
        216e9 < e.X * e.Y * e.Z &&
        Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "SceneItem",
          30,
          "[RangeComponent] Trigger Box配置过大，请联系相关人员",
          ["ConfigId", this.EIe.GetPbDataId()],
        ),
      this.Uen) &&
      (this.Kca?.K2_SetActorRelativeLocation(t, !1, void 0, !0),
      this.Aen?.SetBoxExtent(e.op_Addition(this.Uen), !0));
  }
  SetRangeActorParent(t) {
    this.Ien?.IsValid() &&
      (this.Ien.K2_DetachFromActor(1, 1, 1),
      this.Ien.K2_AttachToActor(t, void 0, 1, 1, 1, !1),
      this.Ien.K2_SetActorTransform(t.GetTransform(), !1, void 0, !0),
      this.Kca?.IsValid()) &&
      (this.Kca.K2_DetachFromActor(1, 1, 1),
      this.Kca.K2_AttachToActor(t, void 0, 1, 1, 1, !1),
      this.Kca.K2_SetActorTransform(t.GetTransform(), !1, void 0, !0));
  }
};
(RangeComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(76)],
  RangeComponent,
)),
  (exports.RangeComponent = RangeComponent);
//# sourceMappingURL=RangeComponent.js.map

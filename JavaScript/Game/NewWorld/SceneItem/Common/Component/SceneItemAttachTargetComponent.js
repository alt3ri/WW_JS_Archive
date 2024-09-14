"use strict";
var SceneItemAttachTargetComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var h,
        n = arguments.length,
        o =
          n < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, e, i, s);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (h = t[a]) &&
            (o = (n < 3 ? h(o) : 3 < n ? h(e, i, o) : h(e, i)) || o);
      return 3 < n && o && Object.defineProperty(e, i, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemAttachTargetComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  StaticSceneUtils_1 = require("../../../../LevelGamePlay/StaticScene/StaticSceneUtils"),
  ModelManager_1 = require("../../../../Manager/ModelManager");
let SceneItemAttachTargetComponent =
  (SceneItemAttachTargetComponent_1 = class SceneItemAttachTargetComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.EIe = void 0),
        (this.tln = "Relatively"),
        (this.iln = "Relatively"),
        (this.oln = void 0),
        (this.rln = void 0),
        (this.nln = void 0),
        (this.sln = void 0),
        (this.Hte = void 0),
        (this.aln = void 0),
        (this.hln = (t, e, i) => {
          e?.Valid &&
            (e = e.Entity.GetComponent(0)?.GetPbDataId()) &&
            this.oln === e &&
            this.lln();
        }),
        (this._ln = (t, e) => {
          e?.Valid &&
            (e = e.Entity.GetComponent(0)?.GetPbDataId()) &&
            this.oln === e &&
            (this.uln(),
            EventSystem_1.EventSystem.Has(
              EventDefine_1.EEventName.AddEntity,
              this.hln,
            ) ||
              EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.AddEntity,
                this.hln,
              ));
        }),
        (this.cln = () => {
          var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            this.oln,
          );
          t &&
            t.Entity &&
            (EventSystem_1.EventSystem.HasWithTarget(
              t.Entity,
              EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
              this.cln,
            ) &&
              EventSystem_1.EventSystem.RemoveWithTarget(
                t.Entity,
                EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
                this.cln,
              ),
            this.lln());
        }),
        (this.mln = (t) => {
          t.op_Equality(this.sln) &&
            ((t = this.aln.GetActor(this.sln)), this.dln(t));
        }),
        (this.Cln = (t) => {
          this.gln(t);
        });
    }
    static get Dependencies() {
      return [187, 0];
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemAttachTargetComponent_1)[0];
      if (
        ((this.Lo = t),
        (this.EIe = this.Entity.GetComponent(0)),
        this.Lo?.AttachTarget)
      )
        switch (
          ((this.tln = this.Lo.PosRule ?? "Relatively"),
          (this.iln = this.Lo.RotRule ?? "Relatively"),
          this.Lo.AttachTarget?.Type)
        ) {
          case "Entity":
            (this.oln = this.Lo.AttachTarget.EntityId),
              (this.rln = this.Lo.AttachTarget.AttachPoint);
            break;
          case "Actor":
            this.nln = this.Lo.AttachTarget.ActorRef?.PathName ?? "";
        }
      else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            7,
            "[SceneItemAttachTargetComponent]附加目标配置无效，请联系对应策划检查配置",
            ["PbDataId:", this.EIe?.GetPbDataId()],
          );
      return !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(187)),
        !!this.Hte ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              7,
              "[SceneItemAttachTargetComponent]Invalid ActorComp",
              ["PbDataId:", this.EIe?.GetPbDataId()],
            ),
          !1)
      );
    }
    OnActivate() {
      this.fln();
    }
    OnEnd() {
      return (
        this.pln(),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.AddEntity,
          this.hln,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.AddEntity,
            this.hln,
          ),
        EventSystem_1.EventSystem.RemoveAllTargetUseKey(this),
        !0
      );
    }
    fln() {
      switch (this.Lo.AttachTarget?.Type) {
        case "Entity":
          this.lln();
          break;
        case "Actor":
          this.vln();
      }
    }
    pln() {
      switch (this.Lo.AttachTarget?.Type) {
        case "Entity":
          this.uln();
          break;
        case "Actor":
          this.Mln();
      }
    }
    lln() {
      if (this.oln) {
        var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          this.oln,
        );
        if (e?.IsInit) {
          var i = e.Entity?.GetComponent(187);
          if (i)
            if (this.rln && !i?.GetIsSceneInteractionLoadCompleted())
              EventSystem_1.EventSystem.HasWithTarget(
                e.Entity,
                EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
                this.cln,
              ) ||
                EventSystem_1.EventSystem.AddWithTarget(
                  e.Entity,
                  EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
                  this.cln,
                );
            else {
              let t = void 0;
              (t = this.rln ? i.GetActorInSceneInteraction(this.rln) : i.Owner),
                this.dln(t),
                EventSystem_1.EventSystem.HasWithTarget(
                  e,
                  EventDefine_1.EEventName.RemoveEntity,
                  this._ln,
                ) ||
                  EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
                    this,
                    e,
                    EventDefine_1.EEventName.RemoveEntity,
                    this._ln,
                  );
            }
        } else
          EventSystem_1.EventSystem.Has(
            EventDefine_1.EEventName.AddEntity,
            this.hln,
          ) ||
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.AddEntity,
              this.hln,
            );
      }
    }
    uln() {
      if (this.oln) {
        var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            this.oln,
          ),
          e =
            (e?.Entity &&
              EventSystem_1.EventSystem.HasWithTarget(
                e.Entity,
                EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
                this.cln,
              ) &&
              EventSystem_1.EventSystem.RemoveWithTarget(
                e.Entity,
                EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
                this.cln,
              ),
            EventSystem_1.EventSystem.HasWithTarget(
              e,
              EventDefine_1.EEventName.RemoveEntity,
              this._ln,
            ) ||
              EventSystem_1.EventSystem.RemoveWithTargetUseKey(
                this,
                e,
                EventDefine_1.EEventName.RemoveEntity,
                this._ln,
              ),
            e?.Entity?.GetComponent(187));
        let t = void 0;
        (t = this.rln
          ? e?.GetIsSceneInteractionLoadCompleted()
            ? e?.GetActorInSceneInteraction(this.rln)
            : void 0
          : e?.Owner),
          this.gln(t);
      }
    }
    vln() {
      if (this.nln) {
        var t = this.Hte.CreatureData.GetPbDataId(),
          t = StaticSceneUtils_1.StaticSceneUtils.GetActorRefByPbDataId(t);
        if (t) {
          for (const e of t)
            this.nln = e.PathName.split(".")[1] + "." + e.ActorName;
          (this.aln?.IsValid() ||
            ((this.aln = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
              GlobalData_1.GlobalData.World,
              UE.KuroActorSubsystem.StaticClass(),
            )),
            this.aln?.IsValid())) &&
            (this.sln || (this.sln = new UE.FName(this.nln)),
            this.aln.OnAddToSubsystem.Add(this.mln),
            (t = this.aln.GetActor(this.sln))?.IsValid()) &&
            this.dln(t);
        }
      }
    }
    Mln() {
      var t;
      this.sln &&
        (this.aln?.IsValid() && this.aln.OnAddToSubsystem.Remove(this.mln),
        (t = this.aln?.GetActor(this.sln)),
        this.gln(t));
    }
    dln(i) {
      if (this.Hte?.Owner?.IsValid() && i?.IsValid()) {
        if (
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "SceneItem",
              40,
              "[SceneItemAttachTargetComponent] AttachToTargetActor: 开始",
              ["PbDataId", this.EIe?.GetPbDataId()],
              [
                "自身坐标",
                Vector_1.Vector.Create(this.Hte.Owner.K2_GetActorLocation()),
              ],
              [
                "自身旋转",
                Rotator_1.Rotator.Create(this.Hte.Owner.K2_GetActorRotation()),
              ],
              ["目标坐标", Vector_1.Vector.Create(i.K2_GetActorLocation())],
              ["目标旋转", Rotator_1.Rotator.Create(i.K2_GetActorRotation())],
              ["目标PathName", UE.KismetSystemLibrary.GetPathName(i)],
              ["PosAttachRule", this.tln],
              ["RotAttachRule", this.iln],
            ),
          this.Hte.Owner.RootComponent?.SetAbsolute(
            "Absolute" === this.tln,
            "Absolute" === this.iln,
            !0,
          ),
          this.Hte.Owner.K2_AttachToActor(
            i,
            void 0,
            "AlignTarget" === this.tln ? 2 : 1,
            "AlignTarget" === this.iln ? 2 : 1,
            1,
            !0,
          ),
          i.OnDestroyed.Add(this.Cln),
          "Relatively" === this.tln || "Relatively" === this.iln)
        ) {
          let e = void 0;
          if (this.nln?.length) {
            var s = (0, puerts_1.$ref)(void 0);
            this.aln.GetActorOriginalTransform(this.sln, s),
              (e = (0, puerts_1.$unref)(s));
          } else {
            var s =
                ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                  this.oln,
                ).Entity,
              h = s.GetComponent(187),
              s = s.GetComponent(0),
              n = s.GetPbEntityInitData()?.Transform,
              n = n ? this.Eln(n) : s.GetTransform();
            let t = void 0;
            (t =
              (t = this.rln?.length
                ? h.GetActorInSceneInteractionOriginalRelTransform(i)
                : t) ||
              i.GetTransform().GetRelativeTransform(h.Owner.GetTransform())),
              (e = t.op_Multiply(n));
          }
          e ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                40,
                "[SceneItemAttachTargetComponent] 目标初始坐标获取失败",
                ["PbDataId:", this.EIe?.GetPbDataId()],
              ));
          (s = this.EIe.GetPbEntityInitData()?.Transform),
            (h = s ? this.Eln(s) : this.EIe.GetTransform()),
            (n = h.GetRelativeTransform(e));
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "SceneItem",
              40,
              "[SceneItemAttachTargetComponent] AttachToTargetActor: 计算相对信息",
              ["PbDataId", this.EIe?.GetPbDataId()],
              ["自身初始坐标", Vector_1.Vector.Create(h.GetLocation())],
              ["自身初始旋转", Rotator_1.Rotator.Create(h.Rotator())],
              ["目标初始坐标", Vector_1.Vector.Create(e.GetLocation())],
              ["目标初始旋转", Rotator_1.Rotator.Create(e.Rotator())],
              ["彼此相对坐标", Vector_1.Vector.Create(n.GetLocation())],
              ["彼此相对旋转", Rotator_1.Rotator.Create(n.Rotator())],
            ),
            "Relatively" === this.tln &&
              this.Hte.Owner.K2_SetActorRelativeLocation(
                n.GetLocation(),
                !1,
                void 0,
                !1,
              ),
            "Relatively" === this.iln &&
              this.Hte.Owner.K2_SetActorRelativeRotation(
                n.Rotator(),
                !1,
                void 0,
                !1,
              );
        }
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SceneItem",
            40,
            "[SceneItemAttachTargetComponent] AttachToTargetActor: 完成",
            ["PbDataId", this.EIe?.GetPbDataId()],
            [
              "自身坐标",
              Vector_1.Vector.Create(this.Hte.Owner.K2_GetActorLocation()),
            ],
            [
              "自身旋转",
              Rotator_1.Rotator.Create(this.Hte.Owner.K2_GetActorRotation()),
            ],
            ["目标坐标", Vector_1.Vector.Create(i.K2_GetActorLocation())],
            ["目标旋转", Rotator_1.Rotator.Create(i.K2_GetActorRotation())],
            [
              "自身相对坐标",
              Vector_1.Vector.Create(
                this.Hte.Owner.RootComponent?.RelativeLocation,
              ),
            ],
            [
              "自身相对旋转",
              Rotator_1.Rotator.Create(
                this.Hte.Owner.RootComponent?.RelativeRotation,
              ),
            ],
          );
      }
    }
    gln(t) {
      this.Hte?.Owner?.IsValid() &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SceneItem",
            40,
            "[SceneItemAttachTargetComponent] DetachFromTargetActor: 开始",
            ["PbDataId", this.EIe?.GetPbDataId()],
            [
              "自身坐标",
              Vector_1.Vector.Create(this.Hte.Owner.K2_GetActorLocation()),
            ],
            [
              "自身旋转",
              Rotator_1.Rotator.Create(this.Hte.Owner.K2_GetActorRotation()),
            ],
          ),
        this.Hte.Owner.K2_DetachFromActor(1, 1, 1),
        t?.OnDestroyed.Remove(this.Cln));
    }
    Eln(t) {
      var e = new UE.Transform();
      return (
        e.SetLocation(new UE.Vector(t.Pos.X ?? 0, t.Pos.Y ?? 0, t.Pos.Z ?? 0)),
        e.SetRotation(
          UE.Rotator.MakeFromEuler(
            new UE.Vector(t.Rot?.X ?? 0, t.Rot?.Y ?? 0, t.Rot?.Z ?? 0),
          ).Quaternion(),
        ),
        e.SetScale3D(
          new UE.Vector(t.Scale?.X ?? 1, t.Scale?.Y ?? 1, t.Scale?.Z ?? 1),
        ),
        e
      );
    }
  });
(SceneItemAttachTargetComponent = SceneItemAttachTargetComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(112)],
    SceneItemAttachTargetComponent,
  )),
  (exports.SceneItemAttachTargetComponent = SceneItemAttachTargetComponent);
//# sourceMappingURL=SceneItemAttachTargetComponent.js.map

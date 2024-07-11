"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    let h;
    const r = arguments.length;
    let a =
      r < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      a = Reflect.decorate(t, e, i, s);
    else
      for (let o = t.length - 1; o >= 0; o--)
        (h = t[o]) && (a = (r < 3 ? h(a) : r > 3 ? h(e, i, a) : h(e, i)) || a);
    return r > 3 && a && Object.defineProperty(e, i, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemDynamicAttachTargetComponent = exports.AttachParam =
    void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SceneItemActorComponent_1 = require("../../SceneItemActorComponent");
class AttachParam {
  constructor() {
    (this.PosAttachType = 0),
      (this.PosAttachOffset = void 0),
      (this.PosAbsolute = !1),
      (this.RotAttachType = 0),
      (this.RotAttachOffset = void 0),
      (this.RotAbsolute = !1),
      (this.AttachSocketName = void 0);
  }
  From(t) {
    (this.PosAttachType = t.PosAttachType),
      (this.PosAbsolute = t.PosAbsolute),
      this.PosAttachOffset
        ? ((this.PosAttachOffset.X = t.PosAttachOffset?.X ?? 0),
          (this.PosAttachOffset.Y = t.PosAttachOffset?.Y ?? 0),
          (this.PosAttachOffset.Z = t.PosAttachOffset?.Z ?? 0))
        : (this.PosAttachOffset = Vector_1.Vector.Create(t.PosAttachOffset)),
      (this.RotAttachType = t.RotAttachType),
      (this.RotAbsolute = t.RotAbsolute),
      this.RotAttachOffset
        ? ((this.RotAttachOffset.Roll = t.RotAttachOffset?.Roll ?? 0),
          (this.RotAttachOffset.Pitch = t.RotAttachOffset?.Pitch ?? 0),
          (this.RotAttachOffset.Yaw = t.RotAttachOffset?.Yaw ?? 0))
        : (this.RotAttachOffset = Rotator_1.Rotator.Create(t.RotAttachOffset)),
      t && (this.AttachSocketName = t.AttachSocketName);
  }
  Reset() {
    (this.PosAttachType = 0),
      (this.PosAbsolute = !1),
      this.PosAttachOffset &&
        ((this.PosAttachOffset.X = 0),
        (this.PosAttachOffset.Y = 0),
        (this.PosAttachOffset.Z = 0)),
      (this.RotAttachType = 0),
      (this.RotAbsolute = !1),
      this.RotAttachOffset &&
        ((this.RotAttachOffset.Roll = 0),
        (this.RotAttachOffset.Pitch = 0),
        (this.RotAttachOffset.Yaw = 0));
  }
}
exports.AttachParam = AttachParam;
let SceneItemDynamicAttachTargetComponent = class SceneItemDynamicAttachTargetComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.SIe = void 0),
      (this.Hte = void 0),
      (this.Fln = !1),
      (this.Vln = 0),
      (this.Hln = void 0),
      (this.Eln = void 0),
      (this.jln = void 0),
      (this.yln = void 0),
      (this.Iln = void 0),
      (this.Lln = void 0),
      (this.Dln = (t, e, i) => {
        if (e?.Valid) {
          e = e.Entity.GetComponent(0);
          if (this.Eln) {
            if (this.Eln !== e?.GetPbDataId()) return;
          } else if (this.jln && this.jln !== e?.GetCreatureDataId()) return;
          this.Rln();
        }
      }),
      (this.Aln = (t, e) => {
        if (e?.Valid) {
          e = e.Entity.GetComponent(0);
          if (this.Eln) {
            if (this.Eln !== e?.GetPbDataId()) return;
          } else if (this.jln && this.jln !== e?.GetCreatureDataId()) return;
          this.Uln(),
            EventSystem_1.EventSystem.Has(
              EventDefine_1.EEventName.AddEntity,
              this.Dln,
            ) ||
              EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.AddEntity,
                this.Dln,
              );
        }
      }),
      (this.Pln = () => {
        let t = void 0;
        if (this.Eln)
          t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            this.Eln,
          );
        else {
          if (!this.jln) return;
          t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.jln);
        }
        t &&
          t.Entity &&
          (EventSystem_1.EventSystem.HasWithTarget(
            t.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.Pln,
          ) &&
            EventSystem_1.EventSystem.RemoveWithTarget(
              t.Entity,
              EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
              this.Pln,
            ),
          this.Rln());
      }),
      (this.xln = (t) => {
        const e = FNameUtil_1.FNameUtil.GetDynamicFName(this.Iln);
        t && e && t.op_Equality(e) && ((t = this.Lln.GetActor(e)), this.wln(t));
      }),
      (this.Bln = (t) => {
        this.bln(t);
      });
  }
  static get Dependencies() {
    return [182, 0];
  }
  OnInitData(t) {
    return (
      (this.SIe = this.Entity.GetComponent(0)),
      (this.Hte = this.Entity.GetComponent(182)),
      !!this.Hte ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            40,
            "[DynamicAttachComp] Invalid ActorComp",
            ["PbDataId:", this.SIe?.GetPbDataId()],
          ),
        !1)
    );
  }
  OnActivate() {
    (this.Fln = !0), this.Vln !== 0 && this.qln();
  }
  OnEnd() {
    return (
      this.Vln !== 0 && this.Gln(),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.AddEntity,
        this.Dln,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.AddEntity,
          this.Dln,
        ),
      !(this.Fln = !1)
    );
  }
  qln() {
    switch (this.Vln) {
      case 1:
        this.Rln();
        break;
      case 2:
        this.Nln();
    }
  }
  Gln() {
    switch (this.Vln) {
      case 1:
        this.Uln();
        break;
      case 2:
        this.Oln();
    }
  }
  Rln() {
    let t = void 0;
    if (this.Eln)
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        this.Eln,
      );
    else {
      if (!this.jln) return;
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.jln);
    }
    if (t?.IsInit)
      switch (t.Entity?.GetComponent(0)?.GetEntityType()) {
        case Protocol_1.Aki.Protocol.HBs.Proto_SceneItem:
          this.Wln(t);
          break;
        case Protocol_1.Aki.Protocol.HBs.Proto_Monster:
        case Protocol_1.Aki.Protocol.HBs.Proto_Player:
        case Protocol_1.Aki.Protocol.HBs.Proto_Vision:
          this.Kln(t);
      }
    else
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.AddEntity,
        this.Dln,
      ) ||
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.AddEntity,
          this.Dln,
        );
  }
  Wln(t) {
    const e = t.Entity?.GetComponent(182);
    if (e)
      if (this.yln && !e?.GetIsSceneInteractionLoadCompleted())
        EventSystem_1.EventSystem.HasWithTarget(
          t.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Pln,
        ) ||
          EventSystem_1.EventSystem.AddWithTarget(
            t.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.Pln,
          );
      else {
        let t = void 0;
        (t = this.yln
          ? e.GetActorInSceneInteraction(this.yln) ?? e.Owner
          : e.Owner),
          this.wln(t),
          EventSystem_1.EventSystem.Has(
            EventDefine_1.EEventName.RemoveEntity,
            this.Aln,
          ) ||
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.RemoveEntity,
              this.Aln,
            );
      }
  }
  Kln(t) {
    t = t.Entity?.GetComponent(3)?.Owner;
    this.wln(t),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.RemoveEntity,
        this.Aln,
      ) ||
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.RemoveEntity,
          this.Aln,
        );
  }
  Uln() {
    let t = void 0;
    if (this.Eln)
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        this.Eln,
      );
    else {
      if (!this.jln) return;
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.jln);
    }
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.RemoveEntity,
      this.Aln,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        this.Aln,
      ),
      t?.Entity &&
        EventSystem_1.EventSystem.HasWithTarget(
          t.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Pln,
        ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          t.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Pln,
        );
    const e = t?.Entity?.GetComponent(182);
    let i = void 0;
    (i =
      this.yln && e?.GetIsSceneInteractionLoadCompleted()
        ? e?.GetActorInSceneInteraction(this.yln)
        : e?.Owner),
      this.bln(i);
  }
  Nln() {
    let t;
    this.Iln &&
      (this.Lln?.IsValid() ||
        ((this.Lln = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
          GlobalData_1.GlobalData.World,
          UE.KuroActorSubsystem.StaticClass(),
        )),
        this.Lln?.IsValid())) &&
      (this.Lln.OnAddToSubsystem.Add(this.xln),
      (t = this.Lln.GetActor(
        FNameUtil_1.FNameUtil.GetDynamicFName(this.Iln),
      ))?.IsValid()) &&
      this.wln(t);
  }
  Oln() {
    let t;
    this.Iln &&
      (this.Lln?.IsValid() && this.Lln.OnAddToSubsystem.Remove(this.xln),
      (t = this.Lln?.GetActor(FNameUtil_1.FNameUtil.GetDynamicFName(this.Iln))),
      this.bln(t));
  }
  wln(s) {
    if (
      this.Hte?.Owner?.RootComponent?.IsValid() &&
      s?.RootComponent?.IsValid()
    ) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SceneItem",
          40,
          "[DynamicAttachComp] AttachToTargetActor: 开始",
          ["PbDataId", this.SIe?.GetPbDataId()],
          [
            "自身坐标",
            Vector_1.Vector.Create(this.Hte.Owner.K2_GetActorLocation()),
          ],
          [
            "自身旋转",
            Rotator_1.Rotator.Create(this.Hte.Owner.K2_GetActorRotation()),
          ],
          ["目标坐标", Vector_1.Vector.Create(s.K2_GetActorLocation())],
          ["目标旋转", Rotator_1.Rotator.Create(s.K2_GetActorRotation())],
          ["目标PathName", UE.KismetSystemLibrary.GetPathName(s)],
          ["AttachParam", this.Hln],
        );
      const e = Vector_1.Vector.Create(Vector_1.Vector.ZeroVectorProxy);
      const h = Rotator_1.Rotator.Create(Rotator_1.Rotator.ZeroRotatorProxy);
      if (
        (this.Hln.PosAttachType === 0 &&
          e.FromUeVector(this.Hte.Owner.RootComponent.RelativeLocation),
        this.Hln.RotAttachType === 0 &&
          h.FromUeRotator(this.Hte.Owner.RootComponent.RelativeRotation),
        (this.Hln.PosAttachType !== 1 && this.Hln.RotAttachType !== 1) ||
          ((r = this.Hte.Owner.GetTransform().GetRelativeTransform(
            s.GetTransform(),
          )),
          this.Hln.PosAttachType === 1 && e.FromUeVector(r.GetLocation()),
          this.Hln.RotAttachType === 1 && h.FromUeRotator(r.Rotator())),
        this.Hln.PosAttachType === 3 || this.Hln.RotAttachType === 3)
      ) {
        var r = this.SIe.GetPbEntityInitData()?.Transform;
        var r = r ? this.kln(r) : this.SIe.GetTransform();
        let i = void 0;
        if (this.Vln === 2) {
          var a = (0, puerts_1.$ref)(void 0);
          this.Lln.GetActorOriginalTransform(
            FNameUtil_1.FNameUtil.GetDynamicFName(this.Iln),
            a,
          ),
            (i = (0, puerts_1.$unref)(a));
        } else if (this.Vln === 1) {
          let t = void 0;
          this.Eln
            ? (t =
                ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                  this.Eln,
                ))
            : this.jln &&
              (t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
                this.jln,
              ));
          var a = t.Entity;
          var o = a?.GetComponent(1);
          var a = a?.GetComponent(0);
          var n = a?.GetPbEntityInitData()?.Transform;
          var n = n ? this.kln(n) : a.GetTransform();
          let e =
            this.yln?.length &&
            o instanceof SceneItemActorComponent_1.SceneItemActorComponent
              ? o?.GetActorInSceneInteractionOriginalRelTransform(s)
              : void 0;
          (e =
            e || s.GetTransform().GetRelativeTransform(o.Owner.GetTransform())),
            (i = e.op_Multiply(n));
        }
        i ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              40,
              "[SceneItemAttachTargetComponent] 目标初始坐标获取失败，使用自身初始坐标代替",
              ["PbDataId:", this.SIe?.GetPbDataId()],
            ),
          (i = r));
        a = r.GetRelativeTransform(i);
        this.Hln.PosAttachType === 3 && e.FromUeVector(a.GetLocation()),
          this.Hln.RotAttachType === 3 && h.FromUeRotator(a.Rotator());
      }
      MathUtils_1.MathUtils.CommonTempVector.FromConfigVector(
        this.Hln.PosAttachOffset,
      ),
        e.AdditionEqual(MathUtils_1.MathUtils.CommonTempVector),
        h.AdditionEqual(this.Hln.RotAttachOffset),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SceneItem",
            40,
            "[DynamicAttachComp] AttachToTargetActor: 计算相对关系",
            ["PbDataId", this.SIe?.GetPbDataId()],
            ["相对坐标", e],
            ["相对旋转", h],
          ),
        this.Hte.Owner.RootComponent.SetAbsolute(
          this.Hln.PosAbsolute,
          this.Hln.RotAbsolute,
          !0,
        );
      let t = this.Hln.AttachSocketName;
      t &&
        !FNameUtil_1.FNameUtil.IsEmpty(t) &&
        s.RootComponent.DoesSocketExist(t) &&
        (t = void 0);
      o = s.GetComponentByClass(UE.MeshComponent.StaticClass());
      t && o
        ? this.Hte.Owner.K2_AttachRootComponentTo(o, t, 1, !0)
        : (this.Hte.Owner.K2_AttachToActor(s, t, 1, 1, 1, !0),
          this.Hte.Owner.K2_SetActorRelativeTransform(
            new UE.Transform(
              h.ToUeRotator(),
              e.ToUeVector(),
              Vector_1.Vector.OneVector,
            ),
            !1,
            void 0,
            !1,
          )),
        s.OnDestroyed.Add(this.Bln),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SceneItem",
            40,
            "[DynamicAttachComp] AttachToTargetActor: 完成",
            ["PbDataId", this.SIe?.GetPbDataId()],
            [
              "自身坐标",
              Vector_1.Vector.Create(this.Hte.Owner.K2_GetActorLocation()),
            ],
            [
              "自身旋转",
              Rotator_1.Rotator.Create(this.Hte.Owner.K2_GetActorRotation()),
            ],
            ["目标坐标", Vector_1.Vector.Create(s.K2_GetActorLocation())],
            ["目标旋转", Rotator_1.Rotator.Create(s.K2_GetActorRotation())],
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
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SceneItem",
          40,
          "[DynamicAttachComp] AttachToTargetActor Failed",
          ["PbDataId", this.SIe?.GetPbDataId()],
          ["SelfActorValid", !!this.Hte?.Owner?.RootComponent?.IsValid()],
          ["TargetActorValid", s?.RootComponent?.IsValid()],
        );
  }
  bln(t) {
    this.Hte?.Owner?.IsValid() &&
      (this.Hte.Owner.K2_DetachFromActor(1, 1, 1),
      t?.OnDestroyed.Remove(this.Bln));
  }
  kln(t) {
    const e = new UE.Transform();
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
  IsRegTarget() {
    return this.Vln !== 0;
  }
  RegEntityTarget(t, e, i, s) {
    return this.Vln !== 0 || this.Entity.IsEnd || !t
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "SceneItem",
            40,
            "[RegEntityTarget] 注册Attach失败",
            ["PbDataId", this.SIe?.GetPbDataId()],
            ["CurrentRegTargetType", this.Vln],
            ["CurrentEntityIsEnd", this.Entity.IsEnd],
            ["TargetPbDataId", t],
            ["Reason", s],
          ),
        !1)
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneItem",
            40,
            "[RegEntityTarget] 注册Attach成功",
            ["PbDataId", this.SIe?.GetPbDataId()],
            ["CurrentRegTargetType", this.Vln],
            ["CurrentEntityIsEnd", this.Entity.IsEnd],
            ["TargetPbDataId", t],
            ["Reason", s],
          ),
        (this.Vln = 1),
        (this.Eln = t),
        (this.jln = void 0),
        (this.yln = e),
        this.Hln || (this.Hln = new AttachParam()),
        this.Hln.From(i),
        this.Fln && this.qln(),
        !0);
  }
  RegEntityTargetByCreatureDataId(t, e, i, s) {
    return this.Vln !== 0 || this.Entity.IsEnd || !t
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "SceneItem",
            40,
            "[RegEntityTarget] 注册Attach失败",
            ["PbDataId", this.SIe?.GetPbDataId()],
            ["CurrentRegTargetType", this.Vln],
            ["CurrentEntityIsEnd", this.Entity.IsEnd],
            ["TargetCreatureDataId", t],
            ["Reason", s],
          ),
        !1)
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneItem",
            40,
            "[RegEntityTarget] 注册Attach成功",
            ["PbDataId", this.SIe?.GetPbDataId()],
            ["CurrentRegTargetType", this.Vln],
            ["CurrentEntityIsEnd", this.Entity.IsEnd],
            ["TargetCreatureDataId", t],
            ["Reason", s],
          ),
        (this.Vln = 1),
        (this.jln = t),
        (this.Eln = void 0),
        (this.yln = e),
        this.Hln || (this.Hln = new AttachParam()),
        this.Hln.From(i),
        this.Fln && this.qln(),
        !0);
  }
  RegRefActorTarget(t, e, i) {
    return this.Vln === 0 && !this.Entity.IsEnd && t && t.length
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneItem",
            40,
            "[RegEntityTarget] 注册Attach成功",
            ["PbDataId", this.SIe?.GetPbDataId()],
            ["CurrentRegTargetType", this.Vln],
            ["CurrentEntityIsEnd", this.Entity.IsEnd],
            ["TargetActorRef", t],
            ["Reason", i],
          ),
        (this.Vln = 2),
        (this.Iln = t),
        this.Hln || (this.Hln = new AttachParam()),
        this.Hln.From(e),
        this.Fln && this.qln(),
        !0)
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "SceneItem",
            40,
            "[RegEntityTarget] 注册Attach失败",
            ["PbDataId", this.SIe?.GetPbDataId()],
            ["CurrentRegTargetType", this.Vln],
            ["CurrentEntityIsEnd", this.Entity.IsEnd],
            ["TargetActorRef", t],
            ["Reason", i],
          ),
        !1);
  }
  UnRegTarget(t) {
    return this.Vln === 0 || this.Entity.IsEnd
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "SceneItem",
            40,
            "[RegEntityTarget] 反注册Attach失败",
            ["PbDataId", this.SIe?.GetPbDataId()],
            ["CurrentRegTargetType", this.Vln],
            ["CurrentEntityIsEnd", this.Entity.IsEnd],
            ["Reason", t],
          ),
        !1)
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneItem",
            40,
            "[RegEntityTarget] 反注册Attach成功",
            ["PbDataId", this.SIe?.GetPbDataId()],
            ["CurrentRegTargetType", this.Vln],
            ["CurrentEntityIsEnd", this.Entity.IsEnd],
            ["Reason", t],
          ),
        this.Gln(),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.AddEntity,
          this.Dln,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.AddEntity,
            this.Dln,
          ),
        (this.Vln = 0),
        this.Hln && this.Hln.Reset(),
        (this.Eln = void 0),
        (this.jln = void 0),
        (this.yln = void 0),
        !(this.Iln = void 0));
  }
  RequestAttachRefActor(t, e, i) {
    let s;
    this.Hte?.Owner?.IsValid() &&
      (((s = Protocol_1.Aki.Protocol.Cds.create()).rkn =
        this.Hte.CreatureData.GetCreatureDataId()),
      (s.EFn = Protocol_1.Aki.Protocol._Gs.Proto_AttachTargetActorPath),
      (s.s3n = "LFn"),
      (s.LFn = t),
      (s.MFn = Protocol_1.Aki.Protocol.VBs.create()),
      (s.MFn.X = e.X),
      (s.MFn.Y = e.Y),
      (s.MFn.Z = e.Z),
      (s.SFn = Protocol_1.Aki.Protocol.iws.create()),
      (s.SFn.Pitch = i.Pitch),
      (s.SFn.Yaw = i.Yaw),
      (s.SFn.Roll = i.Roll),
      Net_1.Net.Call(5903, s, () => {}));
  }
  RequestAttachEntity(t, e, i, s) {
    let h;
    this.Hte?.Owner?.IsValid() &&
      (((h = Protocol_1.Aki.Protocol.Cds.create()).rkn =
        this.Hte.CreatureData.GetCreatureDataId()),
      (h.EFn = Protocol_1.Aki.Protocol._Gs.Proto_AttachTargetEntity),
      (h.s3n = "IFn"),
      (h.IFn = Protocol_1.Aki.Protocol.uGs.create()),
      (h.IFn.yFn = t),
      (h.IFn.TFn = e ?? ""),
      (h.MFn = Protocol_1.Aki.Protocol.VBs.create()),
      (h.MFn.X = i.X),
      (h.MFn.Y = i.Y),
      (h.MFn.Z = i.Z),
      (h.SFn = Protocol_1.Aki.Protocol.iws.create()),
      (h.SFn.Pitch = s.Pitch),
      (h.SFn.Yaw = s.Yaw),
      (h.SFn.Roll = s.Roll),
      Net_1.Net.Call(5903, h, () => {}));
  }
  RequestDetach() {
    const t = Protocol_1.Aki.Protocol.Cds.create();
    (t.rkn = this.Hte.CreatureData.GetCreatureDataId()),
      (t.EFn = Protocol_1.Aki.Protocol._Gs.Proto_AttachTargetNone),
      Net_1.Net.Call(5903, t, () => {});
  }
};
(SceneItemDynamicAttachTargetComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(110)],
  SceneItemDynamicAttachTargetComponent,
)),
  (exports.SceneItemDynamicAttachTargetComponent =
    SceneItemDynamicAttachTargetComponent);
// # sourceMappingURL=SceneItemDynamicAttachTargetComponent.js.map

"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var h,
      r = arguments.length,
      a =
        r < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, s);
    else
      for (var o = t.length - 1; 0 <= o; o--)
        (h = t[o]) && (a = (r < 3 ? h(a) : 3 < r ? h(e, i, a) : h(e, i)) || a);
    return 3 < r && a && Object.defineProperty(e, i, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemDynamicAttachTargetComponent = exports.AttachParam =
    void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SceneItemActorComponent_1 = require("../../SceneItemActorComponent");
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
      (this.EIe = void 0),
      (this.Hte = void 0),
      (this.Sln = !1),
      (this.yln = 0),
      (this.Iln = void 0),
      (this.oln = void 0),
      (this.Tln = void 0),
      (this.rln = void 0),
      (this.nln = void 0),
      (this.aln = void 0),
      (this.hln = (t, e, i) => {
        if (e?.Valid) {
          e = e.Entity.GetComponent(0);
          if (this.oln) {
            if (this.oln !== e?.GetPbDataId()) return;
          } else if (this.Tln && this.Tln !== e?.GetCreatureDataId()) return;
          this.lln();
        }
      }),
      (this._ln = (t, e) => {
        if (e?.Valid) {
          e = e.Entity.GetComponent(0);
          if (this.oln) {
            if (this.oln !== e?.GetPbDataId()) return;
          } else if (this.Tln && this.Tln !== e?.GetCreatureDataId()) return;
          this.uln(),
            EventSystem_1.EventSystem.Has(
              EventDefine_1.EEventName.AddEntity,
              this.hln,
            ) ||
              EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.AddEntity,
                this.hln,
              );
        }
      }),
      (this.cln = () => {
        let t = void 0;
        if (this.oln)
          t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            this.oln,
          );
        else {
          if (!this.Tln) return;
          t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.Tln);
        }
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
        var e = FNameUtil_1.FNameUtil.GetDynamicFName(this.nln);
        t && e && t.op_Equality(e) && ((t = this.aln.GetActor(e)), this.dln(t));
      }),
      (this.Cln = (t) => {
        this.gln(t);
      });
  }
  static get Dependencies() {
    return [187, 0];
  }
  OnInitData(t) {
    return (
      (this.EIe = this.Entity.GetComponent(0)),
      (this.Hte = this.Entity.GetComponent(187)),
      !!this.Hte ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            40,
            "[DynamicAttachComp] Invalid ActorComp",
            ["PbDataId:", this.EIe?.GetPbDataId()],
          ),
        !1)
    );
  }
  OnActivate() {
    (this.Sln = !0), 0 !== this.yln && this.fln();
  }
  OnEnd() {
    return (
      0 !== this.yln && this.pln(),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.AddEntity,
        this.hln,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.AddEntity,
          this.hln,
        ),
      EventSystem_1.EventSystem.RemoveAllTargetUseKey(this),
      !(this.Sln = !1)
    );
  }
  fln() {
    switch (this.yln) {
      case 1:
        this.lln();
        break;
      case 2:
        this.vln();
    }
  }
  pln() {
    switch (this.yln) {
      case 1:
        this.uln();
        break;
      case 2:
        this.Mln();
    }
  }
  lln() {
    let t = void 0;
    if (this.oln)
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        this.oln,
      );
    else {
      if (!this.Tln) return;
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.Tln);
    }
    if (t?.IsInit)
      switch (t.Entity?.GetComponent(0)?.GetEntityType()) {
        case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
          this.Lln(t);
          break;
        case Protocol_1.Aki.Protocol.kks.Proto_Monster:
        case Protocol_1.Aki.Protocol.kks.Proto_Player:
        case Protocol_1.Aki.Protocol.kks.Proto_Vision:
          this.Dln(t);
      }
    else
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.AddEntity,
        this.hln,
      ) ||
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.AddEntity,
          this.hln,
        );
  }
  Lln(e) {
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
        (t = this.rln
          ? (i.GetActorInSceneInteraction(this.rln) ?? i.Owner)
          : i.Owner),
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
  }
  Dln(t) {
    var e = t.Entity?.GetComponent(3)?.Owner;
    this.dln(e),
      EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.RemoveEntity,
        this._ln,
      ) ||
        EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
          this,
          t,
          EventDefine_1.EEventName.RemoveEntity,
          this._ln,
        );
  }
  uln() {
    let t = void 0;
    if (this.oln)
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        this.oln,
      );
    else {
      if (!this.Tln) return;
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.Tln);
    }
    EventSystem_1.EventSystem.HasWithTarget(
      t,
      EventDefine_1.EEventName.RemoveEntity,
      this._ln,
    ) ||
      EventSystem_1.EventSystem.RemoveWithTargetUseKey(
        this,
        t,
        EventDefine_1.EEventName.RemoveEntity,
        this._ln,
      ),
      t?.Entity &&
        EventSystem_1.EventSystem.HasWithTarget(
          t.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.cln,
        ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          t.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.cln,
        );
    var e = t?.Entity?.GetComponent(187);
    let i = void 0;
    (i =
      this.rln && e?.GetIsSceneInteractionLoadCompleted()
        ? e?.GetActorInSceneInteraction(this.rln)
        : e?.Owner),
      this.gln(i);
  }
  vln() {
    var t;
    this.nln &&
      (this.aln?.IsValid() ||
        ((this.aln = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
          GlobalData_1.GlobalData.World,
          UE.KuroActorSubsystem.StaticClass(),
        )),
        this.aln?.IsValid())) &&
      (this.aln.OnAddToSubsystem.Add(this.mln),
      (t = this.aln.GetActor(
        FNameUtil_1.FNameUtil.GetDynamicFName(this.nln),
      ))?.IsValid()) &&
      this.dln(t);
  }
  Mln() {
    var t;
    this.nln &&
      (this.aln?.IsValid() && this.aln.OnAddToSubsystem.Remove(this.mln),
      (t = this.aln?.GetActor(FNameUtil_1.FNameUtil.GetDynamicFName(this.nln))),
      this.gln(t));
  }
  dln(s) {
    if (
      this.Hte?.Owner?.RootComponent?.IsValid() &&
      s?.RootComponent?.IsValid()
    ) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SceneItem",
          40,
          "[DynamicAttachComp] AttachToTargetActor: 开始",
          ["PbDataId", this.EIe?.GetPbDataId()],
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
          ["AttachParam", this.Iln],
        );
      var e = Vector_1.Vector.Create(Vector_1.Vector.ZeroVectorProxy),
        h = Rotator_1.Rotator.Create(Rotator_1.Rotator.ZeroRotatorProxy);
      if (
        (0 === this.Iln.PosAttachType &&
          e.FromUeVector(this.Hte.Owner.RootComponent.RelativeLocation),
        0 === this.Iln.RotAttachType &&
          h.FromUeRotator(this.Hte.Owner.RootComponent.RelativeRotation),
        (1 !== this.Iln.PosAttachType && 1 !== this.Iln.RotAttachType) ||
          ((r = this.Hte.Owner.GetTransform().GetRelativeTransform(
            s.GetTransform(),
          )),
          1 === this.Iln.PosAttachType && e.FromUeVector(r.GetLocation()),
          1 === this.Iln.RotAttachType && h.FromUeRotator(r.Rotator())),
        3 === this.Iln.PosAttachType || 3 === this.Iln.RotAttachType)
      ) {
        var r = this.EIe.GetPbEntityInitData()?.Transform,
          r = r ? this.Eln(r) : this.EIe.GetTransform();
        let i = void 0;
        if (2 === this.yln) {
          var a = (0, puerts_1.$ref)(void 0);
          this.aln.GetActorOriginalTransform(
            FNameUtil_1.FNameUtil.GetDynamicFName(this.nln),
            a,
          ),
            (i = (0, puerts_1.$unref)(a));
        } else if (1 === this.yln) {
          let t = void 0;
          this.oln
            ? (t =
                ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                  this.oln,
                ))
            : this.Tln &&
              (t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
                this.Tln,
              ));
          var a = t.Entity,
            o = a?.GetComponent(1),
            a = a?.GetComponent(0),
            n = a?.GetPbEntityInitData()?.Transform,
            n = n ? this.Eln(n) : a.GetTransform();
          let e =
            this.rln?.length &&
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
              ["PbDataId:", this.EIe?.GetPbDataId()],
            ),
          (i = r));
        a = r.GetRelativeTransform(i);
        3 === this.Iln.PosAttachType && e.FromUeVector(a.GetLocation()),
          3 === this.Iln.RotAttachType && h.FromUeRotator(a.Rotator());
      }
      MathUtils_1.MathUtils.CommonTempVector.FromConfigVector(
        this.Iln.PosAttachOffset,
      ),
        e.AdditionEqual(MathUtils_1.MathUtils.CommonTempVector),
        h.AdditionEqual(this.Iln.RotAttachOffset),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SceneItem",
            40,
            "[DynamicAttachComp] AttachToTargetActor: 计算相对关系",
            ["PbDataId", this.EIe?.GetPbDataId()],
            ["相对坐标", e],
            ["相对旋转", h],
          ),
        this.Hte.Owner.RootComponent.SetAbsolute(
          this.Iln.PosAbsolute,
          this.Iln.RotAbsolute,
          !0,
        );
      let t = this.Iln.AttachSocketName;
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
        s.OnDestroyed.Add(this.Cln),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SceneItem",
            40,
            "[DynamicAttachComp] AttachToTargetActor: 完成",
            ["PbDataId", this.EIe?.GetPbDataId()],
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
          ["PbDataId", this.EIe?.GetPbDataId()],
          ["SelfActorValid", !!this.Hte?.Owner?.RootComponent?.IsValid()],
          ["TargetActorValid", s?.RootComponent?.IsValid()],
        );
  }
  gln(t) {
    this.Hte?.Owner?.IsValid() &&
      (this.Hte.Owner.K2_DetachFromActor(1, 1, 1),
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
  IsRegTarget() {
    return 0 !== this.yln;
  }
  RegEntityTarget(t, e, i, s) {
    return 0 !== this.yln || this.Entity.IsEnd || !t
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "SceneItem",
            40,
            "[RegEntityTarget] 注册Attach失败",
            ["PbDataId", this.EIe?.GetPbDataId()],
            ["CurrentRegTargetType", this.yln],
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
            ["PbDataId", this.EIe?.GetPbDataId()],
            ["CurrentRegTargetType", this.yln],
            ["CurrentEntityIsEnd", this.Entity.IsEnd],
            ["TargetPbDataId", t],
            ["Reason", s],
          ),
        (this.yln = 1),
        (this.oln = t),
        (this.Tln = void 0),
        (this.rln = e),
        this.Iln || (this.Iln = new AttachParam()),
        this.Iln.From(i),
        this.Sln && this.fln(),
        !0);
  }
  RegEntityTargetByCreatureDataId(t, e, i, s) {
    return 0 !== this.yln || this.Entity.IsEnd || !t
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "SceneItem",
            40,
            "[RegEntityTarget] 注册Attach失败",
            ["PbDataId", this.EIe?.GetPbDataId()],
            ["CurrentRegTargetType", this.yln],
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
            ["PbDataId", this.EIe?.GetPbDataId()],
            ["CurrentRegTargetType", this.yln],
            ["CurrentEntityIsEnd", this.Entity.IsEnd],
            ["TargetCreatureDataId", t],
            ["Reason", s],
          ),
        (this.yln = 1),
        (this.Tln = t),
        (this.oln = void 0),
        (this.rln = e),
        this.Iln || (this.Iln = new AttachParam()),
        this.Iln.From(i),
        this.Sln && this.fln(),
        !0);
  }
  RegRefActorTarget(t, e, i) {
    return 0 === this.yln && !this.Entity.IsEnd && t && t.length
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneItem",
            40,
            "[RegEntityTarget] 注册Attach成功",
            ["PbDataId", this.EIe?.GetPbDataId()],
            ["CurrentRegTargetType", this.yln],
            ["CurrentEntityIsEnd", this.Entity.IsEnd],
            ["TargetActorRef", t],
            ["Reason", i],
          ),
        (this.yln = 2),
        (this.nln = t),
        this.Iln || (this.Iln = new AttachParam()),
        this.Iln.From(e),
        this.Sln && this.fln(),
        !0)
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "SceneItem",
            40,
            "[RegEntityTarget] 注册Attach失败",
            ["PbDataId", this.EIe?.GetPbDataId()],
            ["CurrentRegTargetType", this.yln],
            ["CurrentEntityIsEnd", this.Entity.IsEnd],
            ["TargetActorRef", t],
            ["Reason", i],
          ),
        !1);
  }
  UnRegTarget(t) {
    return 0 === this.yln || this.Entity.IsEnd
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "SceneItem",
            40,
            "[RegEntityTarget] 反注册Attach失败",
            ["PbDataId", this.EIe?.GetPbDataId()],
            ["CurrentRegTargetType", this.yln],
            ["CurrentEntityIsEnd", this.Entity.IsEnd],
            ["Reason", t],
          ),
        !1)
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneItem",
            40,
            "[RegEntityTarget] 反注册Attach成功",
            ["PbDataId", this.EIe?.GetPbDataId()],
            ["CurrentRegTargetType", this.yln],
            ["CurrentEntityIsEnd", this.Entity.IsEnd],
            ["Reason", t],
          ),
        this.pln(),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.AddEntity,
          this.hln,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.AddEntity,
            this.hln,
          ),
        (this.yln = 0),
        this.Iln && this.Iln.Reset(),
        (this.oln = void 0),
        (this.Tln = void 0),
        (this.rln = void 0),
        !(this.nln = void 0));
  }
  RequestAttachRefActor(t, e, i) {
    var s;
    this.Hte?.Owner?.IsValid() &&
      (((s = Protocol_1.Aki.Protocol.fgs.create()).F4n =
        this.Hte.CreatureData.GetCreatureDataId()),
      (s.s6n = Protocol_1.Aki.Protocol.nFs.Proto_AttachTargetActorPath),
      (s.j6n = "_6n"),
      (s._6n = t),
      (s.o6n = Protocol_1.Aki.Protocol.Gks.create()),
      (s.o6n.X = e.X),
      (s.o6n.Y = e.Y),
      (s.o6n.Z = e.Z),
      (s.n6n = Protocol_1.Aki.Protocol.D2s.create()),
      (s.n6n.Pitch = i.Pitch),
      (s.n6n.Yaw = i.Yaw),
      (s.n6n.Roll = i.Roll),
      Net_1.Net.Call(20384, s, () => {}));
  }
  RequestAttachEntity(t, e, i, s) {
    var h;
    this.Hte?.Owner?.IsValid() &&
      (((h = Protocol_1.Aki.Protocol.fgs.create()).F4n =
        this.Hte.CreatureData.GetCreatureDataId()),
      (h.s6n = Protocol_1.Aki.Protocol.nFs.Proto_AttachTargetEntity),
      (h.j6n = "h6n"),
      (h.h6n = Protocol_1.Aki.Protocol.sFs.create()),
      (h.h6n.a6n = t),
      (h.h6n.l6n = e ?? ""),
      (h.o6n = Protocol_1.Aki.Protocol.Gks.create()),
      (h.o6n.X = i.X),
      (h.o6n.Y = i.Y),
      (h.o6n.Z = i.Z),
      (h.n6n = Protocol_1.Aki.Protocol.D2s.create()),
      (h.n6n.Pitch = s.Pitch),
      (h.n6n.Yaw = s.Yaw),
      (h.n6n.Roll = s.Roll),
      Net_1.Net.Call(20384, h, () => {}));
  }
  RequestDetach() {
    var t = Protocol_1.Aki.Protocol.fgs.create();
    (t.F4n = this.Hte.CreatureData.GetCreatureDataId()),
      (t.s6n = Protocol_1.Aki.Protocol.nFs.Proto_AttachTargetNone),
      Net_1.Net.Call(20384, t, () => {});
  }
};
(SceneItemDynamicAttachTargetComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(113)],
  SceneItemDynamicAttachTargetComponent,
)),
  (exports.SceneItemDynamicAttachTargetComponent =
    SceneItemDynamicAttachTargetComponent);
//# sourceMappingURL=SceneItemDynamicAttachTargetComponent.js.map

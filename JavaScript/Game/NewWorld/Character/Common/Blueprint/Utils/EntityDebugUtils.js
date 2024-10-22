"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityDebugUtils = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  Global_1 = require("../../../../../Global"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  AnimalStateMachineComponent_1 = require("../../../Animal/Component/AnimalStateMachineComponent"),
  CharacterController_1 = require("../../../CharacterController");
class EntityDebugUtils {
  static GetDebugEntityNameList() {
    return (
      this.$Ko ||
        ((this.$Ko = UE.NewArray(UE.BuiltinString)),
        (this.YKo = new Map()),
        (this.JKo = new Map())),
      this.zKo(),
      this.$Ko
    );
  }
  static zKo() {
    this.$Ko.Empty(), this.YKo.clear(), this.JKo.clear();
    var t = [],
      e = Global_1.Global.BaseCharacter.CharacterActorComponent;
    if (ModelManager_1.ModelManager?.GameModeModel?.WorldDone) {
      for (const a of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
        if (a && a.Entity.Active && a.Entity !== e.Entity) {
          var n = a.Entity.GetComponent(0),
            i = n?.GetEntityType();
          if (i)
            switch (i) {
              case Protocol_1.Aki.Protocol.wks.Proto_Npc:
              case Protocol_1.Aki.Protocol.wks.Proto_Monster:
              case Protocol_1.Aki.Protocol.wks.Proto_SceneItem:
              case Protocol_1.Aki.Protocol.wks.Proto_Custom:
              case Protocol_1.Aki.Protocol.wks.Proto_Animal:
                var r = Vector_1.Vector.Create(),
                  r =
                    ((
                      CharacterController_1.CharacterController.GetActorComponent(
                        a,
                      )?.ActorLocationProxy ??
                      Vector_1.Vector.Create(n.GetLocation())
                    ).Subtraction(e.ActorLocationProxy, r),
                    r.SizeSquared());
                t.push({ Entity: a.Entity, Distance: r });
            }
        }
      t.sort((t, e) => t.Distance - e.Distance),
        t.forEach((t) => {
          this.ZKo(t.Entity);
        });
    }
  }
  static ZKo(t) {
    var e = t.GetComponent(1),
      n = t.GetComponent(0),
      e = `[${n?.GetPbDataId() ?? "?"}] ` + (e?.Owner?.GetName() ?? "?");
    (e += ` (${t.GetComponent(104)?.PawnName ?? n?.GetBaseInfo()?.TidName ?? "无名字"})`),
      this.$Ko.Add(e),
      this.YKo.set(e, t.Id),
      this.JKo.set(t.Id, e);
  }
  static GetSelectedEntityId(t) {
    return (t && this.YKo && this.YKo.get(t)) || 0;
  }
  static GetDebugBaseInfo(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    if (!e) return "无";
    var n = e.GetComponent(0);
    if (!n) return "无";
    if (!e?.IsInit) return "实体尚未完成Init";
    var i = e.GetComponent(1),
      r = e.GetComponent(104),
      a = e.GameBudgetManagedToken
        ? cpp_1.FKuroGameBudgetAllocatorInterface.GetGameBudgetDebugString(
            e.GameBudgetManagedToken,
          )
        : "Null";
    let o = "Name: " + (r?.PawnName ?? "无名字");
    o =
      (o =
        (o =
          (o =
            (o =
              (o =
                (o =
                  (o += "\t\t") +
                  "TidName: " +
                  (n.GetBaseInfo()?.TidName ?? "无名字") +
                  "\t\t") +
                "EntityId: " +
                t +
                "\t\t") +
              "PbDataId: " +
              n.GetPbDataId() +
              "\t\t") +
            "ModelId: " +
            n.GetModelId() +
            "\n\n") +
          `GameBudgetToken: ${e.GameBudgetManagedToken}
` +
          `GameBudgetInfo:
${a} `) + "\n\nEntityTag: \n") +
      this.GetEntityCommonTagDebugString(t) +
      "\n\n";
    e.GetComponent(76) &&
      (o =
        (o =
          (o =
            (o =
              (o =
                (o += `范围组件内实体(客户端)列表: 
`) + this.GetInRangeLocalEntityListDebugString(t)) +
              "\n\n" +
              `范围组件内Actor(客户端)列表: 
`) + this.GetInRangeActorListDebugString(t)) +
          "\n\n" +
          `范围组件内实体(服务端)列表: 
`) +
        this.GetInRangeOnlineEntityListDebugString(t) +
        "\n\n");
    var r = e.GetComponent(108),
      a =
        (r &&
          (o =
            (o =
              (o = o + ("进入逻辑范围: " + r.IsInLogicRange) + "\t\t") +
              "LogicRange: " +
              r.LogicRange +
              "\t\t") +
            "PlayerDistance: " +
            r.PlayerDist +
            "\n\n"),
        e.GetComponent(117)),
      t =
        (a &&
          (o =
            (o =
              (o += "SceneItem属性:\t\t") +
              "IsLocked: " +
              a.IsLocked +
              "\t\t") +
            "IsMoving: " +
            a.IsMoving +
            "\n\n"),
        e.GetComponent(142)),
      r =
        (t &&
          (o =
            (o += "SceneItemManipulable属性:\t\t") +
            "State: " +
            t.State +
            "\n\n"),
        e.GetComponent(181)),
      a =
        (r &&
          (o =
            (o = o + ("启用交互: " + r.DebugInteractOpened) + "\t\t") +
            "定时器开启: " +
            r.DebugTimerRunning +
            "\n\n"),
        e.GetComponent(92)),
      t =
        (a &&
          (o =
            (o = o + ("启用销毁: " + !!a.DeadActions) + "\t\t") +
            "耐久: " +
            n.GetDurabilityValue() +
            "\n\n"),
        e.GetComponent(14)),
      e =
        (t &&
          ((r = t.CurrentState()),
          (a =
            AnimalStateMachineComponent_1.AnimalStateMachineComponent.GetTsState(
              r,
            )),
          (o =
            o +
            (`动物状态: ${r}-` +
              AnimalStateMachineComponent_1.AnimalStateMachineComponent.GetStateName(
                a,
              )) +
            "\n\n")),
        n.GetInitLocation()),
      t =
        (e && (o = o + `初始位置: [${e.X}, ${e.Y}, ${e.Z}]` + "\n\n"),
        i?.ActorLocationProxy),
      r =
        (t && (o = o + `当前位置: [${t.X}, ${t.Y}, ${t.Z}]` + "\n\n"),
        i?.Owner);
    return (
      r &&
        ((a = r?.GetVelocity()),
        (o =
          (o += `Self Velocity: [${a.X}, ${a.Y}, ${a.Z}]`) +
          this.eQo(r) +
          "\n\n")),
      o
    );
  }
  static eQo(t, n = 1) {
    let i = "";
    var e = (0, puerts_1.$ref)(UE.NewArray(UE.Actor)),
      r = (t.GetAttachedActors(e, !0), (0, puerts_1.$unref)(e));
    for (let e = 0; e < r.Num(); e++) {
      var a = r.Get(e),
        o = a.GetVelocity();
      i += "\n";
      let t = n;
      for (; 0 < t--; ) i += "\t\t";
      i =
        (i =
          (i += `[${UE.KismetSystemLibrary.GetDisplayName(a)}] Velocity: `) +
          `[${o.X}, ${o.Y}, ${o.Z}]`) + this.eQo(a, n + 1);
    }
    return i;
  }
  static GetInteractionDebugInfos(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (!t) return "无";
    let e = "";
    var n = t.GetComponent(108),
      n = (n && (e += n.GetDebugString()), t.GetComponent(106)),
      n = (n && (e += n.GetDebugString()), (e += "\n"), t.GetComponent(181));
    return n && (t = n.GetInteractController())
      ? e + t.GetInteractionDebugInfos()
      : e;
  }
  static GetEntityCommonTagDebugString(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (!t) return "无";
    let e = t.GetComponent(188)?.GetTagDebugStrings()?.trim();
    return (e = e && 0 !== e.length ? e : "无");
  }
  static GetInRangeLocalEntityListDebugString(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    if (!e) return "无";
    t = e.GetComponent(76)?.GetEntitiesInRangeLocal();
    let n = "";
    if (t?.size) {
      for (var [, i] of t) {
        var r = i.Entity?.GetComponent(1),
          i = i.Entity?.GetComponent(0),
          r = `[${i?.GetPbDataId() ?? "?"}] ` + (r?.Owner?.GetName() ?? "?");
        (r += ` (${e.GetComponent(104)?.PawnName ?? i?.GetBaseInfo()?.TidName ?? "无名字"})`),
          (n +=
            r +
            `
`);
      }
      n = n.trimEnd();
    }
    return (n = n && 0 !== n.length ? n : "无");
  }
  static GetInRangeOnlineEntityListDebugString(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    if (!e) return "无";
    t = e.GetComponent(76)?.GetEntitiesInRangeOnline();
    let n = "";
    if (t?.size) {
      for (var [, i] of t) {
        var r = i.Entity?.GetComponent(1),
          i = i.Entity?.GetComponent(0),
          r = `[${i?.GetPbDataId() ?? "?"}] ` + (r?.Owner?.GetName() ?? "?");
        (r += ` (${e.GetComponent(104)?.PawnName ?? i?.GetBaseInfo()?.TidName ?? "无名字"})`),
          (n +=
            r +
            `
`);
      }
      n = n.trimEnd();
    }
    return (n = n && 0 !== n.length ? n : "无");
  }
  static GetInRangeActorListDebugString(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (!t) return "无";
    t = t.GetComponent(76)?.GetActorsInRangeLocal();
    let e = "";
    if (t?.size) {
      for (const n of t)
        n?.IsValid() &&
          (e +=
            UE.KismetSystemLibrary.GetDisplayName(n) +
            `
`);
      e = e.trimEnd();
    }
    return (e = e && 0 !== e.length ? e : "无");
  }
  static GetDebugEntityActor(t) {
    if (
      (this.JKo || EntityDebugUtils.GetDebugEntityNameList(), this.JKo.has(t))
    ) {
      t = EntitySystem_1.EntitySystem.Get(t);
      if (t) {
        t = t.GetComponent(1);
        if (t) return t.Owner;
      }
    }
  }
  static GetDebugEntityName(t) {
    return (
      this.JKo || EntityDebugUtils.GetDebugEntityNameList(), this.JKo.get(t)
    );
  }
  static GetEntityPbDataId(t) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    return (t = t && t.GetComponent(0)) ? t.GetPbDataId() : 0;
  }
}
exports.EntityDebugUtils = EntityDebugUtils;
//# sourceMappingURL=EntityDebugUtils.js.map

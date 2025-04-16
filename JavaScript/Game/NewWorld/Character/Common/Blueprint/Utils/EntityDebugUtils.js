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
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  SceneItemActorComponent_1 = require("../../../../SceneItem/SceneItemActorComponent"),
  AnimalStateMachineComponent_1 = require("../../../Animal/Component/AnimalStateMachineComponent");
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
            r = n?.GetEntityType();
          if (r)
            switch (r) {
              case Protocol_1.Aki.Protocol.kks.Proto_Npc:
              case Protocol_1.Aki.Protocol.kks.Proto_Monster:
              case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
              case Protocol_1.Aki.Protocol.kks.HI_:
              case Protocol_1.Aki.Protocol.kks.Proto_Custom:
              case Protocol_1.Aki.Protocol.kks.Proto_Animal:
                var i = Vector_1.Vector.Create(),
                  i =
                    ((
                      ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(
                        a,
                      )?.ActorLocationProxy ??
                      Vector_1.Vector.Create(n.GetLocation())
                    ).Subtraction(e.ActorLocationProxy, i),
                    i.SizeSquared());
                t.push({ Entity: a.Entity, Distance: i });
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
    (e += ` (${t.GetComponent(115)?.PawnName ?? n?.GetBaseInfo()?.TidName ?? "无名字"})`),
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
    var r = e.GetComponent(1),
      i = e.GetComponent(115),
      a = e.GameBudgetManagedToken
        ? cpp_1.FKuroGameBudgetAllocatorInterface.GetGameBudgetDebugString(
            e.GameBudgetManagedToken,
          )
        : "Null";
    let o = "Name: " + (i?.PawnName ?? "无名字");
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
        "CreatureDataId: " +
        n.GetCreatureDataId() +
        "\t\t") +
      "ModelId: " +
      n.GetModelId() +
      "\t\t"),
      r instanceof SceneItemActorComponent_1.SceneItemActorComponent &&
        (o +=
          "SceneInteractActorState: " +
          r.GetInteractionMainActor()?.GetCurrentState()),
      (o =
        (o =
          (o += "\n\n") +
          `GameBudgetToken: ${e.GameBudgetManagedToken}
`) +
        `GameBudgetInfo:
${a} ` +
        "\n\n");
    var i = e.GetComponent(128),
      a =
        (i &&
          (o =
            o +
            (`SceneItemAttributeId:
` +
              i.AttributeIdSet) +
            "\n\n"),
        (o =
          (o += "EntityTag: \n") +
          this.GetEntityCommonTagDebugString(t) +
          "\n\n"),
        e.GetComponent(84)),
      i =
        (a &&
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
            "\n\n"),
        e.GetComponent(119)),
      a =
        (i &&
          (o =
            (o =
              (o = o + ("进入逻辑范围: " + i.IsInLogicRange) + "\t\t") +
              "LogicRange: " +
              i.LogicRange +
              "\t\t") +
            "PlayerDistance: " +
            i.PlayerDist +
            "\n\n"),
        e.GetComponent(128)),
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
        e.GetComponent(154)),
      i =
        (t &&
          (o =
            (o += "SceneItemManipulable属性:\t\t") +
            "State: " +
            t.GetState() +
            "\n\n"),
        e.GetComponent(195)),
      a =
        (i &&
          (o =
            (o = o + ("启用交互: " + i.DebugInteractOpened) + "\t\t") +
            "定时器开启: " +
            i.DebugTimerRunning +
            "\n\n"),
        e.GetComponent(100)),
      t =
        (a &&
          (o =
            (o = o + ("启用销毁: " + !!a.DeadActions) + "\t\t") +
            "耐久: " +
            n.GetDurabilityValue() +
            "\n\n"),
        e.GetComponent(14)),
      t =
        (t &&
          ((i = t.CurrentState()),
          (a =
            AnimalStateMachineComponent_1.AnimalStateMachineComponent.GetTsState(
              i,
            )),
          (o =
            o +
            (`动物状态: ${i}-` +
              AnimalStateMachineComponent_1.AnimalStateMachineComponent.GetStateName(
                a,
              )) +
            "\n\n")),
        n.GetInitLocation()),
      i =
        (t &&
          (o =
            o +
            `初始位置: [${t.X.toFixed(2)}, ${t.Y.toFixed(2)}, ${t.Z.toFixed(2)}]` +
            "\n\n"),
        r?.ActorLocationProxy),
      a =
        (i &&
          (o =
            o +
            `当前位置: [${i.X.toFixed(2)}, ${i.Y.toFixed(2)}, ${i.Z.toFixed(2)}]` +
            "\n\n"),
        r?.Owner),
      t =
        (a &&
          ((n = a?.D_GetVelocity()),
          (o =
            (o += `Self Velocity: [${n.X.toFixed(2)}, ${n.Y.toFixed(2)}, ${n.Z.toFixed(2)}]`) +
            this.eQo(a) +
            "\n\n")),
        e.GetComponent(126)),
      i =
        (t &&
          (o =
            (o += `SceneItemMove信息:
`) +
            t.GetDebugString() +
            "\n\n"),
        e.GetComponent(277));
    return (o = i
      ? (o += `Ai追逐信息:
`) +
        i.GetDebugString() +
        "\n\n"
      : o);
  }
  static eQo(t, n = 1) {
    let r = "";
    var e = (0, puerts_1.$ref)(UE.NewArray(UE.Actor)),
      i = (t.GetAttachedActors(e, !0), (0, puerts_1.$unref)(e));
    for (let e = 0; e < i.Num(); e++) {
      var a = i.Get(e),
        o = a.D_GetVelocity();
      r += "\n";
      let t = n;
      for (; 0 < t--; ) r += "\t\t";
      r =
        (r =
          (r += `[${UE.KismetSystemLibrary.GetDisplayName(a)}] Velocity: `) +
          `[${o.X}, ${o.Y}, ${o.Z}]`) + this.eQo(a, n + 1);
    }
    return r;
  }
  static GetInteractionDebugInfos(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (!t) return "无";
    let e = "";
    var n = t.GetComponent(119),
      n = (n && (e += n.GetDebugString()), t.GetComponent(117)),
      n = (n && (e += n.GetDebugString()), (e += "\n"), t.GetComponent(195));
    return n && (t = n.GetInteractController())
      ? e + t.GetInteractionDebugInfos()
      : e;
  }
  static GetEntityCommonTagDebugString(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (!t) return "无";
    let e = t.GetComponent(203)?.GetTagDebugStrings()?.trim();
    return (e = e && 0 !== e.length ? e : "无");
  }
  static GetInRangeLocalEntityListDebugString(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    if (!e) return "无";
    t = e.GetComponent(84)?.GetEntitiesInRangeLocal();
    let n = "";
    if (t?.size) {
      for (var [, r] of t) {
        var i = r.Entity?.GetComponent(1),
          r = r.Entity?.GetComponent(0),
          i = `[${r?.GetPbDataId() ?? "?"}] ` + (i?.Owner?.GetName() ?? "?");
        (i += ` (${e.GetComponent(115)?.PawnName ?? r?.GetBaseInfo()?.TidName ?? "无名字"})`),
          (n +=
            i +
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
    t = e.GetComponent(84)?.GetEntitiesInRangeOnline();
    let n = "";
    if (t?.size) {
      for (var [, r] of t) {
        var i = r.Entity?.GetComponent(1),
          r = r.Entity?.GetComponent(0),
          i = `[${r?.GetPbDataId() ?? "?"}] ` + (i?.Owner?.GetName() ?? "?");
        (i += ` (${e.GetComponent(115)?.PawnName ?? r?.GetBaseInfo()?.TidName ?? "无名字"})`),
          (n +=
            i +
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
    t = t.GetComponent(84)?.GetActorsInRangeLocal();
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
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t) {
      t = t.GetComponent(1);
      if (t) return t.Owner;
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

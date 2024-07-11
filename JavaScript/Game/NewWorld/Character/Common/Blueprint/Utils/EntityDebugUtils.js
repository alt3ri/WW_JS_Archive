"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityDebugUtils = void 0);
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const Global_1 = require("../../../../../Global");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const AnimalStateMachineComponent_1 = require("../../../Animal/Component/AnimalStateMachineComponent");
const CharacterController_1 = require("../../../CharacterController");
class EntityDebugUtils {
  static GetDebugEntityNameList() {
    return (
      this.zWo ||
        ((this.zWo = UE.NewArray(UE.BuiltinString)),
        (this.ZWo = new Map()),
        (this.eKo = new Map())),
      this.tKo(),
      this.zWo
    );
  }
  static tKo() {
    this.zWo.Empty(), this.ZWo.clear(), this.eKo.clear();
    const t = [];
    const e = Global_1.Global.BaseCharacter.CharacterActorComponent;
    if (ModelManager_1.ModelManager?.GameModeModel?.WorldDone) {
      for (const a of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
        if (a && a.Entity.Active && a.Entity !== e.Entity) {
          const n = a.Entity.GetComponent(0);
          const i = n?.GetEntityType();
          if (i)
            switch (i) {
              case Protocol_1.Aki.Protocol.HBs.Proto_Npc:
              case Protocol_1.Aki.Protocol.HBs.Proto_Monster:
              case Protocol_1.Aki.Protocol.HBs.Proto_SceneItem:
              case Protocol_1.Aki.Protocol.HBs.Proto_Custom:
              case Protocol_1.Aki.Protocol.HBs.Proto_Animal:
                var r = Vector_1.Vector.Create();
                var r =
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
          this.iKo(t.Entity);
        });
    }
  }
  static iKo(t) {
    var e = t.GetComponent(1);
    const n = t.GetComponent(0);
    var e = `[${n?.GetPbDataId() ?? "?"}] ` + (e?.Owner?.GetName() ?? "?");
    (e += ` (${t.GetComponent(102)?.PawnName ?? n?.GetBaseInfo()?.TidName ?? "无名字"})`),
      this.zWo.Add(e),
      this.ZWo.set(e, t.Id),
      this.eKo.set(t.Id, e);
  }
  static GetSelectedEntityId(t) {
    return (t && this.ZWo && this.ZWo.get(t)) || 0;
  }
  static GetDebugBaseInfo(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    if (!e) return "无";
    const n = e.GetComponent(0);
    if (!n) return "无";
    if (!e?.IsInit) return "实体尚未完成Init";
    const i = e.GetComponent(1);
    var r = e.GetComponent(102);
    var a = e.GameBudgetManagedToken
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
    e.GetComponent(74) &&
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
    var r = e.GetComponent(106);
    var a =
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
      e.GetComponent(115));
    var t =
      (a &&
        (o =
          (o =
            (o += "SceneItem属性:\t\t") + "IsLocked: " + a.IsLocked + "\t\t") +
          "IsMoving: " +
          a.IsMoving +
          "\n\n"),
      e.GetComponent(140));
    var r =
      (t &&
        (o =
          (o += "SceneItemManipulable属性:\t\t") +
          "State: " +
          t.State +
          "\n\n"),
      e.GetComponent(178));
    var a =
      (r &&
        (o =
          (o = o + ("启用交互: " + r.DebugInteractOpened) + "\t\t") +
          "定时器开启: " +
          r.DebugTimerRunning +
          "\n\n"),
      e.GetComponent(90));
    var t =
      (a &&
        (o =
          (o = o + ("启用销毁: " + !!a.DeadActions) + "\t\t") +
          "耐久: " +
          n.GetDurabilityValue() +
          "\n\n"),
      e.GetComponent(14));
    var e =
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
      n.GetInitLocation());
    var t =
      (e && (o = o + `初始位置: [${e.X}, ${e.Y}, ${e.Z}]` + "\n\n"),
      i?.ActorLocationProxy);
    var r =
      (t && (o = o + `当前位置: [${t.X}, ${t.Y}, ${t.Z}]` + "\n\n"), i?.Owner);
    return (
      r &&
        ((a = r?.GetVelocity()),
        (o =
          (o += `Self Velocity: [${a.X}, ${a.Y}, ${a.Z}]`) +
          this.oKo(r) +
          "\n\n")),
      o
    );
  }

  static oKo(t, n = 1) {
    let i = "";
    const e = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
    const r = (t.GetAttachedActors(e, !0), (0, puerts_1.$unref)(e));
    for (let e = 0; e < r.Num(); e++) {
      const a = r.Get(e);
      const o = a.GetVelocity();
      i += "\n";
      let t = n;
      for (; t-- > 0; ) i += "\t\t";
      i =
        (i =
          (i += `[${UE.KismetSystemLibrary.GetDisplayName(a)}] Velocity: `) +
          `[${o.X}, ${o.Y}, ${o.Z}]`) + this.oKo(a, n + 1);
    }
    return i;
  }
  static GetInteractionDebugInfos(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (!t) return "无";
    let e = "";
    var n = t.GetComponent(106);
    var n = (n && (e += n.GetDebugString()), t.GetComponent(104));
    var n = (n && (e += n.GetDebugString()), (e += "\n"), t.GetComponent(178));
    return n && (t = n.GetInteractController())
      ? e + t.GetInteractionDebugInfos()
      : e;
  }
  static GetEntityCommonTagDebugString(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (!t) return "无";
    let e = t.GetComponent(185)?.GetTagDebugStrings()?.trim();
    return (e = e && e.length !== 0 ? e : "无");
  }
  static GetInRangeLocalEntityListDebugString(t) {
    const e = EntitySystem_1.EntitySystem.Get(t);
    if (!e) return "无";
    t = e.GetComponent(74)?.GetEntitiesInRangeLocal();
    let n = "";
    if (t?.size) {
      for (var [, i] of t) {
        var r = i.Entity?.GetComponent(1);
        var i = i.Entity?.GetComponent(0);
        var r = `[${i?.GetPbDataId() ?? "?"}] ` + (r?.Owner?.GetName() ?? "?");
        (r += ` (${e.GetComponent(102)?.PawnName ?? i?.GetBaseInfo()?.TidName ?? "无名字"})`),
          (n +=
            r +
            `
`);
      }
      n = n.trimEnd();
    }
    return (n = n && n.length !== 0 ? n : "无");
  }

  static GetInRangeOnlineEntityListDebugString(t) {
    const e = EntitySystem_1.EntitySystem.Get(t);
    if (!e) return "无";
    t = e.GetComponent(74)?.GetEntitiesInRangeOnline();
    let n = "";
    if (t?.size) {
      for (var [, i] of t) {
        var r = i.Entity?.GetComponent(1);
        var i = i.Entity?.GetComponent(0);
        var r = `[${i?.GetPbDataId() ?? "?"}] ` + (r?.Owner?.GetName() ?? "?");
        (r += ` (${e.GetComponent(102)?.PawnName ?? i?.GetBaseInfo()?.TidName ?? "无名字"})`),
          (n +=
            r +
            `
`);
      }
      n = n.trimEnd();
    }
    return (n = n && n.length !== 0 ? n : "无");
  }

  static GetInRangeActorListDebugString(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (!t) return "无";
    t = t.GetComponent(74)?.GetActorsInRangeLocal();
    let e = "";
    if (t?.size) {
      for (const n of t) {
        n?.IsValid() &&
          (e +=
            UE.KismetSystemLibrary.GetDisplayName(n) +
            `
`);
      }
      e = e.trimEnd();
    }
    return (e = e && e.length !== 0 ? e : "无");
  }

  static GetDebugEntityActor(t) {
    if (
      (this.eKo || EntityDebugUtils.GetDebugEntityNameList(), this.eKo.has(t))
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
      this.eKo || EntityDebugUtils.GetDebugEntityNameList(), this.eKo.get(t)
    );
  }
  static GetEntityPbDataId(t) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    return (t = t && t.GetComponent(0)) ? t.GetPbDataId() : 0;
  }
}
exports.EntityDebugUtils = EntityDebugUtils;
// # sourceMappingURL=EntityDebugUtils.js.map

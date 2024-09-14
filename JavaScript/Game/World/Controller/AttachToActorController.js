"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AttachToActorController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ATTACH_REASON_LENGTH_LIMIT = 4;
class AttachToActorController extends ControllerBase_1.ControllerBase {
  static AttachToActor(t, o, r, e, a, n, c, A, _, i = !0) {
    var s;
    return e
      ? e.length < ATTACH_REASON_LENGTH_LIMIT
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "AttachToActor的Reason字符串长度必须大于等于限制字符数量",
              ["Reason", e],
              ["限制的字符数量", ATTACH_REASON_LENGTH_LIMIT],
            ),
          !1)
        : t?.IsValid()
          ? o?.IsValid()
            ? UE.KuroStaticLibrary.IsImplementInterface(
                o.GetClass(),
                UE.BPI_CreatureInterface_C.StaticClass(),
              )
              ? (s = o.GetEntityId())
                ? ModelManager_1.ModelManager.AttachToActorModel.AddEntityActor(
                    s,
                    t,
                    o,
                    e,
                    r,
                  )
                  ? (i && t.K2_AttachToActor(o, a, n, c, A, _),
                    t.OnEndPlay.Add(AttachToActorController.hbn),
                    !0)
                  : (Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "Entity",
                        3,
                        "actor添加失败",
                        ["ActorName", o.GetName()],
                        ["Reason", e],
                      ),
                    !1)
                : (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "entityId无效",
                      ["ActorName", o.GetName()],
                      ["Reason", e],
                    ),
                  !1)
              : (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Entity",
                    3,
                    "parentActor未实现接口CreatureInterface",
                    ["ActorName", o.GetName()],
                    ["Reason", e],
                  ),
                !1)
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Entity", 3, "parentActor无效", ["Reason", e]),
              !1)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Entity", 3, "actor无效", ["Reason", e]),
            !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "AttachToActor的Reason不能使用undefined",
            ["Entity", this.constructor.name],
          ),
        !1);
  }
  static AttachToComponent(t, o, r, e, a, n, c, A, _, i = !0) {
    var s, L;
    return e
      ? e.length < ATTACH_REASON_LENGTH_LIMIT
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "AttachToComponent的Reason字符串长度必须大于等于限制字符数量",
              ["Reason", e],
              ["限制的字符数量", ATTACH_REASON_LENGTH_LIMIT],
            ),
          !1)
        : t?.IsValid()
          ? o?.IsValid()
            ? (s = o.GetOwner())?.IsValid()
              ? UE.KuroStaticLibrary.IsImplementInterface(
                  s.GetClass(),
                  UE.BPI_CreatureInterface_C.StaticClass(),
                )
                ? (L = s.GetEntityId())
                  ? ModelManager_1.ModelManager.AttachToActorModel.AddEntityActor(
                      L,
                      t,
                      s,
                      e,
                      r,
                    )
                    ? (i && t.K2_AttachToComponent(o, a, n, c, A, _),
                      t.OnEndPlay.Add(AttachToActorController.hbn),
                      !0)
                    : (Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "Entity",
                          3,
                          "actor添加失败",
                          ["ActorName", s.GetName()],
                          ["Reason", e],
                        ),
                      !1)
                  : (Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "Entity",
                        3,
                        "entityId无效",
                        ["ActorName", s.GetName()],
                        ["Reason", e],
                      ),
                    !1)
                : (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "ParentActor未实现接口CreatureInterface",
                      ["ActorName", s.GetName()],
                      ["Reason", e],
                    ),
                  !1)
              : (Log_1.Log.CheckError() &&
                  Log_1.Log.Error("Entity", 3, "parentActor无效", [
                    "Reason",
                    e,
                  ]),
                !1)
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Entity", 3, "parentComponent无效", [
                  "Reason",
                  e,
                ]),
              !1)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Entity", 3, "actor无效", ["Reason", e]),
            !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "AttachToComponent的Reason不能使用undefined",
            ["Entity", this.constructor.name],
          ),
        !1);
  }
  static DetachActor(t, o, r, e, a, n) {
    if (!r)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "AttachActor: RemoveActor的Reason不能使用undefined",
            ["Entity", this.constructor.name],
          ),
        !1
      );
    if (r.length < ATTACH_REASON_LENGTH_LIMIT)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "AttachActor: RemoveActor的Reason字符串长度必须大于等于限制字符数量",
            ["Reason", r],
            ["限制的字符数量", ATTACH_REASON_LENGTH_LIMIT],
          ),
        !1
      );
    if (!t?.IsValid())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Entity", 3, "srcActor无效", ["Reason", r]),
        !1
      );
    var c = t.GetAttachParentActor();
    if (!c?.IsValid()) {
      const A =
        ModelManager_1.ModelManager.AttachToActorModel.GetEntityIdByActor(t);
      return A
        ? this.DetachActorByEntity(t, r, A, o, e, a, n)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "AttachActor: entityActor无效",
              ["Name", t.GetName()],
              ["Reason", r],
            ),
          !1);
    }
    if (
      !UE.KuroStaticLibrary.IsImplementInterface(
        c.GetClass(),
        UE.BPI_CreatureInterface_C.StaticClass(),
      )
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "AttachActor: Actor未实现接口CreatureInterface",
            ["ActorName", c.GetName()],
            ["Reason", r],
          ),
        !1
      );
    const A = c.GetEntityId();
    return A
      ? this.DetachActorByEntity(t, r, A, o, e, a, n)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "AttachActor: entityId无效",
            ["ActorName", c.GetName()],
            ["Reason", r],
          ),
        !1);
  }
  static DetachActorByEntity(t, o, r, e, a, n, c) {
    var A;
    return o
      ? o.length < ATTACH_REASON_LENGTH_LIMIT
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "AttachActor: RemoveActor的Reason字符串长度必须大于等于限制字符数量",
              ["Reason", o],
              ["限制的字符数量", ATTACH_REASON_LENGTH_LIMIT],
            ),
          !1)
        : t?.IsValid()
          ? r
            ? (A =
                ModelManager_1.ModelManager
                  .AttachToActorModel).GetAttachActorItem(r, t)
              ? (t.OnEndPlay.Remove(AttachToActorController.hbn),
                A.RemoveEntityActor(r, t, o)
                  ? (e ? t.K2_DestroyActor() : t.K2_DetachFromActor(a, n, c),
                    !0)
                  : (Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "Entity",
                        3,
                        "AttachActor: Detach Actor 失败",
                        ["EntityId", r],
                        ["ActorName", t.GetName()],
                        ["Reason", o],
                      ),
                    !1))
              : (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Entity",
                    3,
                    "AttachActor: attachActorItem无效",
                    ["EntityId", r],
                    ["ActorName", t.GetName()],
                    ["Reason", o],
                  ),
                !1)
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "AttachActor: entityId无效",
                  ["EntityId", r],
                  ["ActorName", t.GetName()],
                  ["Reason", o],
                ),
              !1)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Entity", 3, "srcActor无效", ["Reason", o]),
            !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "AttachActor: RemoveActor的Reason不能使用undefined",
            ["Entity", this.constructor.name],
          ),
        !1);
  }
  static DetachActorsBeforeDestroyEntity(o) {
    if (!o?.Valid) return !0;
    var t = ModelManager_1.ModelManager.AttachToActorModel.GetAttachActorEntry(
      o.Id,
    );
    if (!t) return !0;
    var r = t.GetAttachActorItems();
    if (!r?.length) return !0;
    let e = !0;
    for (let t = r.length - 1; 0 <= t; --t) {
      var a = r[t];
      1 === a.DetachType &&
        a.Actor?.IsValid() &&
        !this.DetachActorByEntity(
          a.Actor,
          "AttachToActorController.DetachActorsBeforeDestroyEntity",
          o.Id,
          !0,
          1,
          1,
          1,
        ) &&
        (e = !1);
    }
    return e;
  }
  static DetachActorsAfterDestroyEntity(o) {
    var t =
      ModelManager_1.ModelManager.AttachToActorModel.GetAttachActorEntry(o);
    if (!t) return !0;
    var r = t.GetAttachActorItems();
    if (!r?.length) return !0;
    let e = !0;
    for (let t = r.length - 1; 0 <= t; --t) {
      var a = r[t];
      0 === a.DetachType &&
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "AttachActor: 存在未类型为ManualDestroy未Detach的Actor",
            ["EntityId", o],
            ["ActorName", a.Name],
            ["ParentActorName", a.ParentActorName],
            ["Reason", a.Reason],
          ),
        a.Actor?.IsValid()) &&
        !this.DetachActorByEntity(
          a.Actor,
          "AttachToActorController.DetachActorsAfterDestroyEntity",
          o,
          !0,
          1,
          1,
          1,
        ) &&
        (e = !1);
    }
    return e;
  }
  static CheckAttachError(o) {
    var t = ModelManager_1.ModelManager.AttachToActorModel,
      r = t.GetAttachActorEntry(o);
    if (!r) return !0;
    var e = r.GetAttachActorItems();
    if (!e?.length) return !0;
    let a = !0;
    for (let t = e.length - 1; 0 <= t; --t) {
      var n = e[t];
      (a = !1),
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "AttachActor: Attach的Actor没有删除",
            ["EntityId", o],
            ["ActorName", n.Name],
            ["ParentActorName", n.ParentActorName],
            ["Reason", n.Reason],
          ),
        n.Actor?.IsValid() &&
          this.DetachActorByEntity(
            n.Actor,
            "AttachToActorController.CheckAttachError",
            n.EntityId,
            !0,
            1,
            1,
            1,
          );
    }
    return t.ClearActorsByEntity(o), a;
  }
}
(exports.AttachToActorController = AttachToActorController),
  ((_a = AttachToActorController).hbn = (t, o) => {
    if (t) {
      switch (o) {
        case 2:
        case 4:
          return;
      }
      o = ModelManager_1.ModelManager.AttachToActorModel;
      if (o) {
        var r = o.GetEntityIdByActor(t),
          e = o.GetAttachActorItem(r, t);
        if (e)
          switch (e.DetachType) {
            case 2:
              _a.DetachActorByEntity(
                t,
                "AttachToActorController.OnEndPlay DestroyExternal",
                r,
                !1,
                1,
                1,
                1,
              );
              break;
            case 0:
            case 1:
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "非法删除Attach的Actor",
                  ["EntityId", r],
                  ["ActorName", e.Name],
                  ["ParentActorName", e.ParentActorName],
                  ["DetachType", e.DetachType],
                ),
                _a.DetachActorByEntity(
                  t,
                  "AttachToActorController.OnEndPlay ManualDestroy",
                  r,
                  !1,
                  1,
                  1,
                  1,
                );
          }
      }
    }
  });
//# sourceMappingURL=AttachToActorController.js.map

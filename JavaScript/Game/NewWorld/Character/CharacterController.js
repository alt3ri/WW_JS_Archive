"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterController = void 0);
const cpp_1 = require("cpp"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Time_1 = require("../../../Core/Common/Time"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  ObjectSystem_1 = require("../../../Core/Object/ObjectSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  WorldEntity_1 = require("./WorldEntity");
class CharacterController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (this.Uqn = new Date()), !0;
  }
  static OnTick(t) {
    CharacterController.dKo() || CharacterController.CKo(),
      Net_1.Net.IsFinishLogin() && this.Rqn();
  }
  static async Rqn() {
    var t,
      e = new Date();
    3 <= (e.getTime() - this.Uqn.getTime()) / 1e3 / 60 &&
      ((this.Uqn = e),
      0 < (e = cpp_1.FuncOpenLibrary.GetEBuffer()).byteLength) &&
      ((t = new Uint8Array(e)),
      (t = new Uint8Array(t)),
      cpp_1.FuncOpenLibrary.FreeArrayBuffer(e),
      ((e = new Protocol_1.Aki.Protocol.CombatMessage.Hfs()).Ujn = t),
      (t = await Net_1.Net.CallAsync(22535, e)),
      cpp_1.FuncOpenLibrary.SetIsCheckEncrypt(t?.JLs ?? ""));
  }
  static InitData(t, e, r) {
    return (
      !!EntitySystem_1.EntitySystem.InitData(e, r) ||
      (ModelManager_1.ModelManager.CharacterModel.ClearHandle(t), !1)
    );
  }
  static Respawn(t, e, r = 0, a) {
    return (
      !!EntitySystem_1.EntitySystem.Respawn(e, !0, r, a) ||
      (ModelManager_1.ModelManager.CharacterModel.ClearHandle(t), !1)
    );
  }
  static AddEntityToAwakeQueue(t, e) {
    ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Entity",
        3,
        "[实体生命周期:创建实体] 进入唤醒队列",
        ["EntityId", t.Id],
        ["CreatureDataId", t.CreatureDataId],
        ["PbDataId", t.PbDataId],
        ["Priority", t.Priority],
      );
    let r = !1;
    ModelManager_1.ModelManager.CharacterModel.PushAwakeHandler(
      t,
      () => (this.InitEntity(t) ? (r = !0) : (e(!1), !1)),
      () => !!r && (this.StartEntity(t) ? (e(!0), !0) : (e(!1), !1)),
    );
  }
  static InitEntity(t) {
    var e, r;
    return !(
      !t.Valid ||
      (r = (e = t.Entity).GetComponent(0)).GetRemoveState() ||
      (EntitySystem_1.EntitySystem.Init(e)
        ? (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Entity",
              3,
              "[实体生命周期:创建实体] 实体执行Init成功",
              ["CreatureDataId", t.CreatureDataId],
              ["EntityId", t.Id],
              ["PbDataId", r.GetPbDataId()],
            ),
          0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "[实体生命周期:创建实体] 实体执行Init失败，创建实体失败。",
              ["CreatureDataId", t.CreatureDataId],
              ["EntityId", t.Id],
              ["PbDataId", r.GetPbDataId()],
            ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.CreateEntityFail,
            t.CreatureDataId,
          ),
          1))
    );
  }
  static StartEntity(t) {
    var e, r;
    return !(
      !t.Valid ||
      (e = t.Entity.GetComponent(0)).GetRemoveState() ||
      ((r = t.Entity),
      EntitySystem_1.EntitySystem.Start(r)
        ? (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Entity",
              3,
              "[实体生命周期:创建实体] 实体执行Start成功",
              ["CreatureDataId", t.CreatureDataId],
              ["EntityId", t.Id],
              ["PbDataId", e.GetPbDataId()],
            ),
          0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "[实体生命周期:创建实体] 实体执行Start失败，创建实体失败。",
              ["CreatureDataId", t.CreatureDataId],
              ["EntityId", t.Id],
              ["PbDataId", e.GetPbDataId()],
            ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.CreateEntityFail,
            t.CreatureDataId,
          ),
          1))
    );
  }
  static ActivateEntity(t) {
    t.Valid &&
      ((t = t.Entity),
      EntitySystem_1.EntitySystem.Activate(t),
      t.SetTimeDilation(Time_1.Time.TimeDilation));
  }
  static Destroy(t) {
    if (!t?.Valid)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            1,
            "Destroy的entity无效，可能的原因有:1、创建失败 2、实体重复销毁",
            ["Id", t?.Id],
          ),
        !1
      );
    ModelManager_1.ModelManager.CharacterModel.ClearHandle(t);
    var e = t.Entity;
    return (
      (t.Entity = void 0),
      ModelManager_1.ModelManager.CharacterModel.EntityPool.RemoveExternal(e),
      EntitySystem_1.EntitySystem.Destroy(e)
    );
  }
  static DestroyToLru(t) {
    if (!t?.Valid)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            3,
            "Destroy的entity无效，可能的原因有:1、创建失败 2、实体重复销毁",
            ["Id", t?.Id],
          ),
        !1
      );
    var e = t.Entity;
    if (!t.IsInit) return this.Destroy(t);
    ModelManager_1.ModelManager.CharacterModel.ClearHandle(t);
    const r = t.Entity;
    return (
      (t.Entity = void 0),
      EntitySystem_1.EntitySystem.DeSpawn(e)
        ? (TimerSystem_1.TimerSystem.Next(() => {
            TimerSystem_1.TimerSystem.Next(() => {
              ModelManager_1.ModelManager.CharacterModel.EntityPool.Put(r);
            });
          }),
          !0)
        : (ModelManager_1.ModelManager.CharacterModel.EntityPool.RemoveExternal(
            r,
          ),
          !1)
    );
  }
  static CreateEntity(t, e) {
    t = ModelManager_1.ModelManager.CharacterModel.EntityPool.Create(t);
    if (
      EntitySystem_1.EntitySystem.CreateExternal(
        WorldEntity_1.WorldEntity,
        t,
        e.Priority,
        e,
      )
    )
      return ModelManager_1.ModelManager.CharacterModel.CreateHandle(t);
  }
  static SpawnEntity(t) {
    t = ModelManager_1.ModelManager.CharacterModel.EntityPool.Get(t);
    if (t && ObjectSystem_1.ObjectSystem.CreateExternal(t))
      return ModelManager_1.ModelManager.CharacterModel.CreateHandle(t);
  }
  static GetCharacterActorComponent(t) {
    if (t?.Valid) {
      t = t.GetComponent(3);
      if (t.Valid && t.Actor) return t;
    }
  }
  static GetCharacterActorComponentById(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t?.Valid) {
      t = t.GetComponent(3);
      if (t?.Valid) return t;
    }
  }
  static GetCharacter(t) {
    return t?.Valid && (t = t.GetComponent(3))?.Valid && t.Actor
      ? t.Actor
      : void 0;
  }
  static GetActor(t) {
    return t?.Valid && (t = this.GetActorComponent(t)) ? t.Owner : void 0;
  }
  static GetActorByEntity(t) {
    return t?.Valid && (t = t.GetComponent(1)) ? t.Owner : void 0;
  }
  static GetActorComponent(t) {
    let e = t.Entity.GetComponent(200);
    return (e =
      (e = e || t.Entity.GetComponent(2)) || t.Entity.GetComponent(231));
  }
  static GetTsBaseCharacterByEntity(t) {
    return t.Entity.GetComponent(3)?.Actor;
  }
  static GetUeTsBaseCharacterByEntity(t) {
    t = t.GetComponent(3);
    if (t) return t.Actor;
  }
  static GetEntityByUeTsBaseCharacter(t) {
    return t.CharacterActorComponent.Entity;
  }
  static SetTimeDilation(t) {
    var e = ModelManager_1.ModelManager.CreatureModel;
    for (const r of e.GetAllEntities()) r.IsInit && r.Entity.SetTimeDilation(t);
    for (const a of e.DelayRemoveContainer.GetAllEntities())
      a.IsInit && a.Entity.SetTimeDilation(t);
  }
  static CN() {
    return (
      !this.gKo &&
      0 === ModelManager_1.ModelManager.CharacterModel.AwakeQueue.Size
    );
  }
  static AwakeEntity() {
    var t = ModelManager_1.ModelManager.CharacterModel;
    if (this.gKo) {
      var e = this.gKo[2];
      if (((this.gKo = void 0), e())) return;
    }
    if (t.AwakeQueue.Size)
      for (var r; (r = t.PopAwakeHandler()); )
        if ((0, r[1])()) return void (this.gKo = r);
  }
  static SortItem(t) {
    !t?.Valid ||
      2 & t.Entity.Flag ||
      t.Entity.GetComponent(0).GetRemoveState() ||
      ModelManager_1.ModelManager.CharacterModel.SortItem(t);
  }
  static OnChangeMode() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti)
      for (const t of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
        t.Entity.GetComponent(46)?.SwitchControl(!0);
    return !0;
  }
}
((exports.CharacterController = CharacterController).IsTickEvenPausedInternal =
  !0),
  (CharacterController.gKo = void 0),
  (CharacterController.Uqn = void 0),
  (CharacterController.dKo = () => CharacterController.CN()),
  (CharacterController.CKo = () => {
    CharacterController.AwakeEntity();
  });
//# sourceMappingURL=CharacterController.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Lru_1 = require("../../../Core/Container/Lru"),
  PriorityQueue_1 = require("../../../Core/Container/PriorityQueue"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ObjectSystem_1 = require("../../../Core/Object/ObjectSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  EntityHandle_1 = require("./EntityHandle"),
  WorldEntity_1 = require("./WorldEntity"),
  ENTITY_LRU_CAPACITY = 300,
  aEntityLocation = Vector_1.Vector.Create(),
  bEntityLocation = Vector_1.Vector.Create();
class CharacterModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.nK = new Array()),
      (this.AwakeQueue = new PriorityQueue_1.PriorityQueue((t, e) => {
        var r = e[0].Priority,
          i = t[0].Priority;
        return r !== i
          ? r - i
          : ((r = t[0].Valid ? t[0].Entity.GetComponent(0) : void 0),
            (i = e[0].Valid ? e[0].Entity.GetComponent(0) : void 0),
            r && i
              ? ((t = r.GetLocation()),
                (aEntityLocation.X = t.X),
                (aEntityLocation.Y = t.Y),
                (aEntityLocation.Z = t.Z),
                (e = i.GetLocation()),
                (bEntityLocation.X = e.X),
                (bEntityLocation.Y = e.Y),
                (bEntityLocation.Z = e.Z),
                (r = ModelManager_1.ModelManager.GameModeModel.RoleLocation),
                Vector_1.Vector.DistSquared(r, aEntityLocation) -
                  Vector_1.Vector.DistSquared(r, bEntityLocation))
              : 0);
      })),
      (this.fKo = new Map()),
      (this.TestSoarOn = !1),
      (this.EntityPool = new Lru_1.Lru(
        ENTITY_LRU_CAPACITY,
        (t) => new WorldEntity_1.WorldEntity(0, 0),
        void 0,
      ));
  }
  OnInit() {
    return !(this.nK.length = 0);
  }
  OnClear() {
    return this.ClearData(), !0;
  }
  OnLeaveLevel() {
    return this.ClearData(), !0;
  }
  CreateEntity(t, e) {
    t = this.EntityPool.Create(t);
    if (
      EntitySystem_1.EntitySystem.CreateExternal(
        WorldEntity_1.WorldEntity,
        t,
        e.Priority,
        e,
      )
    )
      return this.pKo(t);
  }
  SpawnEntity(t) {
    t = this.EntityPool.Get(t);
    if (t && ObjectSystem_1.ObjectSystem.CreateExternal(t)) return this.pKo(t);
  }
  pKo(t) {
    for (var e = t.Index; this.nK.length <= e; ) this.nK.push(void 0);
    t = new EntityHandle_1.EntityHandle(t);
    return (this.nK[e] = t);
  }
  Respawn(t, e, r = 0, i) {
    return (
      !!EntitySystem_1.EntitySystem.Respawn(e, !0, r, i) ||
      ((this.nK[t.Index] = void 0), !1)
    );
  }
  InitData(t, e, r) {
    return (
      !!EntitySystem_1.EntitySystem.InitData(e, r) ||
      ((this.nK[t.Index] = void 0), !1)
    );
  }
  AddEntityToAwakeQueue(t, e) {
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
    var i = [
      t,
      () => (this.InitEntity(t) ? (r = !0) : (e(!1), !1)),
      () => !!r && (this.StartEntity(t) ? (e(!0), !0) : (e(!1), !1)),
    ];
    this.AwakeQueue.Push(i), this.fKo.set(t, i);
  }
  InitEntity(t) {
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
  StartEntity(t) {
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
  ActivateEntity(t) {
    t.Valid &&
      ((t = t.Entity),
      EntitySystem_1.EntitySystem.Activate(t),
      t.SetTimeDilation(Time_1.Time.TimeDilation));
  }
  PopAwakeHandler() {
    var t;
    if (!this.AwakeQueue.Empty)
      return (t = this.AwakeQueue.Pop()), this.fKo.delete(t[0]), t;
  }
  Destroy(t) {
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
    this.nK[t.Index] = void 0;
    var e = t.Entity;
    return (
      (t.Entity = void 0),
      this.EntityPool.RemoveExternal(e),
      EntitySystem_1.EntitySystem.Destroy(e)
    );
  }
  DestroyToLru(t) {
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
    this.nK[t.Index] = void 0;
    const r = t.Entity;
    return (
      (t.Entity = void 0),
      EntitySystem_1.EntitySystem.DeSpawn(e)
        ? (TimerSystem_1.TimerSystem.Next(() => {
            TimerSystem_1.TimerSystem.Next(() => {
              this.EntityPool.Put(r);
            });
          }),
          !0)
        : (this.EntityPool.RemoveExternal(r), !1)
    );
  }
  ClearData() {
    this.AwakeQueue.Clear(), this.fKo.clear();
  }
  GetHandle(t) {
    var e;
    if (t)
      return (
        (e = t >>> ObjectSystem_1.ObjectSystem.VersionDigit),
        (e = this.nK[e])?.Id === t ? e : void 0
      );
  }
  GetHandleByEntity(t) {
    var e;
    return t && (e = this.nK[t.Index])?.Id === t.Id ? e : void 0;
  }
  IsValid(t) {
    var e = t >>> ObjectSystem_1.ObjectSystem.VersionDigit;
    return this.nK[e]?.Id === t;
  }
  SortItem(t) {
    t = this.fKo.get(t);
    t && this.AwakeQueue.Update(t);
  }
}
exports.CharacterModel = CharacterModel;
//# sourceMappingURL=CharacterModel.js.map

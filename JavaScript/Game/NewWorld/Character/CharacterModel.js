"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterModel = void 0);
const Lru_1 = require("../../../Core/Container/Lru"),
  PriorityQueue_1 = require("../../../Core/Container/PriorityQueue"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ObjectSystem_1 = require("../../../Core/Object/ObjectSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
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
  CreateHandle(t) {
    for (var e = t.Index; this.nK.length <= e; ) this.nK.push(void 0);
    t = new EntityHandle_1.EntityHandle(t);
    return (this.nK[e] = t);
  }
  ClearHandle(t) {
    this.nK[t.Index] = void 0;
  }
  PushAwakeHandler(t, e, r) {
    e = [t, e, r];
    this.AwakeQueue.Push(e), this.fKo.set(t, e);
  }
  PopAwakeHandler() {
    var t;
    if (!this.AwakeQueue.Empty)
      return (t = this.AwakeQueue.Pop()), this.fKo.delete(t[0]), t;
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

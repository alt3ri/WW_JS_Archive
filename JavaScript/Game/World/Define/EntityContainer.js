"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityContainer = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  CustomMap_1 = require("./CustomMap");
class EntityContainer {
  constructor() {
    (this.EntityMap = new CustomMap_1.CustomMap()),
      (this.EntityIdMap = new Map()),
      (this.PbDataIdMap = new Map());
  }
  AddEntity(t, i) {
    return (
      !this.EntityMap.Contains(t) &&
      (this.EntityMap.Set(t, i), this.EntityIdMap.set(i.Id, t), !0)
    );
  }
  RemoveEntity(t) {
    var i = this.EntityMap.Get(t);
    return (
      !!i &&
      (this.EntityMap.Remove(t),
      this.EntityIdMap.delete(i.Id),
      i.ConfigType === Protocol_1.Aki.Protocol.USs.r3n &&
        this.PbDataIdMap.delete(i.PbDataId),
      !0)
    );
  }
  GetEntity(t) {
    return this.EntityMap.Get(t);
  }
  ExistEntity(t) {
    return this.EntityMap.Contains(t);
  }
  GetEntityById(t) {
    t = this.EntityIdMap.get(t);
    return this.EntityMap.Get(t ?? 0);
  }
  GetEntityByPbDataId(t) {
    t = this.PbDataIdMap.get(t);
    return this.EntityMap.Get(t);
  }
  CheckSetPrefabEntity(t) {
    t = t.Entity.GetComponent(0);
    t.GetEntityConfigType() === Protocol_1.Aki.Protocol.USs.r3n &&
      this.PbDataIdMap.set(t.GetPbDataId(), t.GetCreatureDataId());
  }
  GetCreatureDataIdByPbDataId(t) {
    return this.PbDataIdMap.get(t);
  }
  PopEntity() {
    var t = this.EntityMap.GetByIndex(0);
    if (t) return this.RemoveEntity(t.CreatureDataId), t;
  }
  GetAllEntities() {
    return this.EntityMap.GetItems();
  }
  Size() {
    return this.EntityMap.Size();
  }
  Clear() {
    this.EntityMap.Clear(), this.EntityIdMap.clear(), this.PbDataIdMap.clear();
  }
}
exports.EntityContainer = EntityContainer;
//# sourceMappingURL=EntityContainer.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkItemEntity = void 0);
const MapEntity_1 = require("../Base/MapEntity");
class MarkItemEntity extends MapEntity_1.MapEntity {
  constructor() {
    super(...arguments), (this.IsTempMapMark = !1);
  }
  get GamePlay() {
    return this.GetOrAddComponent(10);
  }
  get Resource() {
    return this.GetOrAddComponent(11);
  }
  get ViewLifeCircle() {
    return this.GetOrAddComponent(12);
  }
  get MultiFloor() {
    return this.GetOrAddComponent(17);
  }
  OnInit() {
    this.EnsureComponent(10),
      this.EnsureComponent(11),
      this.EnsureComponent(12),
      this.EnsureComponent(17);
  }
}
exports.MarkItemEntity = MarkItemEntity;
//# sourceMappingURL=MarkItemEntity.js.map

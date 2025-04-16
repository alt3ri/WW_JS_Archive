"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPasserbyNpcSpawnComponent = void 0);
const UnionPasserbyNpcMoveHelper_1 = require("./UnionPasserbyNpcMoveHelper"),
  UnionPasserbyNpcSourceHelper_1 = require("./UnionPasserbyNpcSourceHelper"),
  UnionPasserbyNpcSpawnHelper_1 = require("./UnionPasserbyNpcSpawnHelper");
class FbPasserbyNpcSpawnComponent {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.OEh = !1),
      (this.FEh = void 0),
      (this.bQh = !1),
      (this.LQh = void 0),
      (this.AQh = !1),
      (this.xQh = void 0);
  }
  static Create(e) {
    if (e) return new FbPasserbyNpcSpawnComponent(e);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get MoveConfig() {
    var e, s;
    return (
      !this.OEh &&
        ((this.OEh = !0),
        (e = this.FbDataInternal.moveConfigType()),
        (s =
          UnionPasserbyNpcMoveHelper_1.UnionPasserbyNpcMoveHelper.GetUnionPasserbyNpcMoveObject(
            e,
          ))) &&
        (this.FEh =
          UnionPasserbyNpcMoveHelper_1.UnionPasserbyNpcMoveHelper.ReadUnionPasserbyNpcMove(
            e,
            this.FbDataInternal.moveConfig(s),
          )),
      this.FEh
    );
  }
  get SpawnConfig() {
    var e, s;
    return (
      !this.bQh &&
        ((this.bQh = !0),
        (e = this.FbDataInternal.spawnConfigType()),
        (s =
          UnionPasserbyNpcSpawnHelper_1.UnionPasserbyNpcSpawnHelper.GetUnionPasserbyNpcSpawnObject(
            e,
          ))) &&
        (this.LQh =
          UnionPasserbyNpcSpawnHelper_1.UnionPasserbyNpcSpawnHelper.ReadUnionPasserbyNpcSpawn(
            e,
            this.FbDataInternal.spawnConfig(s),
          )),
      this.LQh
    );
  }
  get SourceConfig() {
    var e, s;
    return (
      !this.AQh &&
        ((this.AQh = !0),
        (e = this.FbDataInternal.sourceConfigType()),
        (s =
          UnionPasserbyNpcSourceHelper_1.UnionPasserbyNpcSourceHelper.GetUnionPasserbyNpcSourceObject(
            e,
          ))) &&
        (this.xQh =
          UnionPasserbyNpcSourceHelper_1.UnionPasserbyNpcSourceHelper.ReadUnionPasserbyNpcSource(
            e,
            this.FbDataInternal.sourceConfig(s),
          )),
      this.xQh
    );
  }
}
exports.FbPasserbyNpcSpawnComponent = FbPasserbyNpcSpawnComponent;
//# sourceMappingURL=FbPasserbyNpcSpawnComponent.js.map

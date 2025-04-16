"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNpcModel = void 0);
const UnionNpcModelTypeHelper_1 = require("./UnionNpcModelTypeHelper");
class FbNpcModel {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.$Qh = !1),
      (this.XQh = void 0),
      (this.hKh = !1),
      (this.lKh = void 0),
      (this._Kh = !1),
      (this.cKh = void 0),
      (this.uKh = !1),
      (this.dKh = void 0),
      (this.mKh = !1),
      (this.CKh = void 0),
      (this.gKh = !1),
      (this.fKh = 0),
      (this.pKh = !1),
      (this.vKh = void 0),
      (this.yKh = !1),
      (this.SKh = 0);
  }
  static Create(t) {
    if (t) return new FbNpcModel(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get BlueprintPath() {
    return (
      this.$Qh ||
        ((this.$Qh = !0), (this.XQh = this.FbDataInternal.blueprintPath())),
      this.XQh
    );
  }
  get NpcModel() {
    var t, i;
    return (
      !this.hKh &&
        ((this.hKh = !0),
        (t = this.FbDataInternal.npcModelType()),
        (i =
          UnionNpcModelTypeHelper_1.UnionNpcModelTypeHelper.GetUnionNpcModelTypeObject(
            t,
          ))) &&
        (this.lKh =
          UnionNpcModelTypeHelper_1.UnionNpcModelTypeHelper.ReadUnionNpcModelType(
            t,
            this.FbDataInternal.npcModel(i),
          )),
      this.lKh
    );
  }
  get Abp() {
    return (
      this._Kh || ((this._Kh = !0), (this.cKh = this.FbDataInternal.abp())),
      this.cKh
    );
  }
  get BattleSockets() {
    if (!this.uKh) {
      (this.uKh = !0), (this.dKh = new Array());
      var i = this.FbDataInternal.battleSocketsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.dKh.push(this.FbDataInternal.battleSockets(t));
    }
    return this.dKh;
  }
  get NormalSockets() {
    if (!this.mKh) {
      (this.mKh = !0), (this.CKh = new Array());
      var i = this.FbDataInternal.normalSocketsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.CKh.push(this.FbDataInternal.normalSockets(t));
    }
    return this.CKh;
  }
  get LookingUpAngle() {
    return (
      this.gKh ||
        ((this.gKh = !0), (this.fKh = this.FbDataInternal.lookingUpAngle())),
      this.fKh
    );
  }
  get BodyType() {
    return (
      this.pKh ||
        ((this.pKh = !0), (this.vKh = this.FbDataInternal.bodyType())),
      this.vKh
    );
  }
  get NameZaxisOffset() {
    return (
      this.yKh ||
        ((this.yKh = !0), (this.SKh = this.FbDataInternal.nameZaxisOffset())),
      this.SKh
    );
  }
}
exports.FbNpcModel = FbNpcModel;
//# sourceMappingURL=FbNpcModel.js.map

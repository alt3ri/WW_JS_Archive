"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTemplateMatrix = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbActionInfo_1 = require("../Action/FbActionInfo"),
  FbGroupDestroyListenConfig_1 = require("./FbGroupDestroyListenConfig"),
  FbTemplateMatrixRow_1 = require("./FbTemplateMatrixRow"),
  FbVector2_1 = require("../Var/FbVector2"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbTemplateMatrix {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.rPc = !1),
      (this.oPc = void 0),
      (this.nPc = !1),
      (this.sPc = void 0),
      (this.aPc = !1),
      (this.hPc = void 0),
      (this.lPc = !1),
      (this._Pc = void 0),
      (this.cPc = !1),
      (this.uPc = void 0);
  }
  static Create(t) {
    if (t) return new FbTemplateMatrix(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get MatrixSize() {
    return (
      this.rPc ||
        ((this.rPc = !0),
        (this.oPc = FbVector2_1.FbVector2.Create(
          this.FbDataInternal.matrixSize(),
        ))),
      this.oPc
    );
  }
  get TemplateMatrix() {
    if (!this.nPc) {
      (this.nPc = !0), (this.sPc = new Array());
      var i = this.FbDataInternal.templateMatrixLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.templateMatrix(
            t,
            new fb_component_1.TemplateMatrixRow(),
          );
          this.sPc.push(FbTemplateMatrixRow_1.FbTemplateMatrixRow.Create(e));
        }
    }
    return this.sPc;
  }
  get EntityInterval() {
    return (
      this.aPc ||
        ((this.aPc = !0),
        (this.hPc = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.entityInterval(),
        ))),
      this.hPc
    );
  }
  get GroupDestroyListenConfigs() {
    if (!this.lPc) {
      (this.lPc = !0), (this._Pc = new Array());
      var i = this.FbDataInternal.groupDestroyListenConfigsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.groupDestroyListenConfigs(
            t,
            new fb_component_1.GroupDestroyListenConfig(),
          );
          this._Pc.push(
            FbGroupDestroyListenConfig_1.FbGroupDestroyListenConfig.Create(e),
          );
        }
    }
    return this._Pc;
  }
  get OnNonGroupEntityDestroy() {
    if (!this.cPc) {
      (this.cPc = !0), (this.uPc = new Array());
      var i = this.FbDataInternal.onNonGroupEntityDestroyLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.onNonGroupEntityDestroy(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.uPc.push(FbActionInfo_1.FbActionInfo.Create(e));
        }
    }
    return this.uPc;
  }
}
exports.FbTemplateMatrix = FbTemplateMatrix;
//# sourceMappingURL=FbTemplateMatrix.js.map

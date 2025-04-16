"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFlowInfo = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbStateInfo_1 = require("./FbStateInfo"),
  UnionVarContextHelper_1 = require("./UnionVarContextHelper");
class FbFlowInfo {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Ixh = !1),
      (this.Txh = void 0),
      (this.bxh = !1),
      (this.Lxh = void 0),
      (this.Axh = !1),
      (this.xxh = void 0),
      (this.Rxh = !1),
      (this.wxh = void 0),
      (this.tgh = !1),
      (this.FFe = 0),
      (this.x_h = !1),
      (this.FGi = void 0),
      (this.MMh = !1),
      (this.EMh = 0),
      (this.ogh = !1),
      (this.ngh = !1),
      (this.Pxh = !1),
      (this.Uxh = void 0),
      (this.Dxh = !1),
      (this.Bxh = void 0);
  }
  static Create(t) {
    if (t) return new FbFlowInfo(t);
  }
  get ObjType() {
    return (
      this.Ixh || ((this.Ixh = !0), (this.Txh = this.FbDataInternal.objType())),
      this.Txh
    );
  }
  get Children() {
    if (!this.bxh) {
      (this.bxh = !0), (this.Lxh = new Array());
      var i = this.FbDataInternal.childrenLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.Lxh.push(this.FbDataInternal.children(t));
    }
    return this.Lxh;
  }
  get Reference() {
    if (!this.Axh) {
      (this.Axh = !0), (this.xxh = new Array());
      var i = this.FbDataInternal.referenceLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.xxh.push(this.FbDataInternal.reference(t));
    }
    return this.xxh;
  }
  get WeakReference() {
    if (!this.Rxh) {
      (this.Rxh = !0), (this.wxh = new Array());
      var i = this.FbDataInternal.weakReferenceLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.wxh.push(this.FbDataInternal.weakReference(t));
    }
    return this.wxh;
  }
  get Id() {
    return (
      this.tgh || ((this.tgh = !0), (this.FFe = this.FbDataInternal.id())),
      this.FFe
    );
  }
  get Name() {
    return (
      this.x_h || ((this.x_h = !0), (this.FGi = this.FbDataInternal.name())),
      this.FGi
    );
  }
  get DungeonId() {
    return (
      this.MMh ||
        ((this.MMh = !0), (this.EMh = this.FbDataInternal.dungeonId())),
      this.EMh
    );
  }
  get _folded() {
    return (
      this.ogh || ((this.ogh = !0), (this.ngh = this.FbDataInternal.folded())),
      this.ngh
    );
  }
  get VarContext() {
    var t, i;
    return (
      !this.Pxh &&
        ((this.Pxh = !0),
        (t = this.FbDataInternal.varContextType()),
        (i =
          UnionVarContextHelper_1.UnionVarContextHelper.GetUnionVarContextObject(
            t,
          ))) &&
        (this.Uxh =
          UnionVarContextHelper_1.UnionVarContextHelper.ReadUnionVarContext(
            t,
            this.FbDataInternal.varContext(i),
          )),
      this.Uxh
    );
  }
  get States() {
    if (!this.Dxh) {
      (this.Dxh = !0), (this.Bxh = new Array());
      var i = this.FbDataInternal.statesLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.states(t, new fb_action_1.StateInfo());
          this.Bxh.push(FbStateInfo_1.FbStateInfo.Create(s));
        }
    }
    return this.Bxh;
  }
}
exports.FbFlowInfo = FbFlowInfo;
//# sourceMappingURL=FbFlowInfo.js.map

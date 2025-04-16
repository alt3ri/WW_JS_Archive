"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbOpenSystemBoard = void 0);
const FbPhotographConfig_1 = require("./FbPhotographConfig"),
  UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbOpenSystemBoard {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.udh = !1),
      (this.ddh = void 0),
      (this.mdh = !1),
      (this.Cdh = 0),
      (this.gdh = !1),
      (this.fdh = void 0),
      (this.pdh = !1),
      (this.vdh = void 0),
      (this.ydh = !1),
      (this.Sdh = void 0),
      (this.Mdh = !1),
      (this.Edh = 0),
      (this.Q6l = !1),
      (this.K6l = !1),
      (this.kKl = !1),
      (this.OKl = void 0);
  }
  static Create(t) {
    if (t) return new FbOpenSystemBoard(t);
  }
  get SystemType() {
    return (
      this.udh ||
        ((this.udh = !0), (this.ddh = this.FbDataInternal.systemType())),
      this.ddh
    );
  }
  get BoardId() {
    return (
      this.mdh || ((this.mdh = !0), (this.Cdh = this.FbDataInternal.boardId())),
      this.Cdh
    );
  }
  get ActionMontage() {
    return (
      this.gdh ||
        ((this.gdh = !0), (this.fdh = this.FbDataInternal.actionMontage())),
      this.fdh
    );
  }
  get InputVars() {
    if (!this.pdh) {
      (this.pdh = !0), (this.vdh = new Array());
      var i = this.FbDataInternal.inputVarsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.inputVarsType(t),
            h = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(s);
          h &&
            void 0 !==
              (s = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
                s,
                this.FbDataInternal.inputVars(t, h),
              )) &&
            this.vdh.push(s);
        }
    }
    return this.vdh;
  }
  get PhotographConfig() {
    return (
      this.ydh ||
        ((this.ydh = !0),
        (this.Sdh = FbPhotographConfig_1.FbPhotographConfig.Create(
          this.FbDataInternal.photographConfig(),
        ))),
      this.Sdh
    );
  }
  get GramophoneId() {
    return (
      this.Mdh ||
        ((this.Mdh = !0), (this.Edh = this.FbDataInternal.gramophoneId())),
      this.Edh
    );
  }
  get FadeInScreenWhenClose() {
    return (
      this.Q6l ||
        ((this.Q6l = !0),
        (this.K6l = this.FbDataInternal.fadeInScreenWhenClose())),
      this.K6l
    );
  }
  get SyncOpenSystemBoardFinishTiming() {
    return (
      this.kKl ||
        ((this.kKl = !0),
        (this.OKl = this.FbDataInternal.syncOpenSystemBoardFinishTiming())),
      this.OKl
    );
  }
}
exports.FbOpenSystemBoard = FbOpenSystemBoard;
//# sourceMappingURL=FbOpenSystemBoard.js.map

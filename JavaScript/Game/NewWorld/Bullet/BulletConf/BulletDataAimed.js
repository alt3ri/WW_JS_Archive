"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletDataAimed = void 0);
class BulletDataAimed {
  constructor(t) {
    (this.KVo = void 0),
      (this.QVo = void 0),
      (this.XVo = void 0),
      (this.Pe = t);
  }
  get AimedCtrlDir() {
    return void 0 === this.KVo && (this.KVo = this.Pe.瞄准发射), this.KVo;
  }
  get AngleOffset() {
    return (
      void 0 === this.QVo && (this.QVo = this.Pe.瞄准子弹最大偏转角度), this.QVo
    );
  }
  get DistLimit() {
    return (
      void 0 === this.XVo && (this.XVo = this.Pe.瞄准子弹最大射程), this.XVo
    );
  }
}
exports.BulletDataAimed = BulletDataAimed;
//# sourceMappingURL=BulletDataAimed.js.map

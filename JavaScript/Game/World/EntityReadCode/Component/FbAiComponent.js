"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAiComponent = void 0);
const FbPatrol_1 = require("./FbPatrol"),
  UnionInitStateHelper_1 = require("./UnionInitStateHelper"),
  UnionBlackBoardHelper_1 = require("../Var/UnionBlackBoardHelper");
class FbAiComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.DRh = !1),
      (this.BRh = 0),
      (this.qRh = !1),
      (this.kRh = void 0),
      (this.wAh = !1),
      (this.PAh = void 0),
      (this.GRh = !1),
      (this.ORh = 0),
      (this.FRh = !1),
      (this.NRh = void 0),
      (this.VRh = !1),
      (this.jRh = void 0),
      (this.HRh = !1),
      (this.WRh = 0);
  }
  static Create(t) {
    if (t) return new FbAiComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get AiId() {
    return (
      this.DRh || ((this.DRh = !0), (this.BRh = this.FbDataInternal.aiId())),
      this.BRh
    );
  }
  get Patrol() {
    return (
      this.qRh ||
        ((this.qRh = !0),
        (this.kRh = FbPatrol_1.FbPatrol.Create(this.FbDataInternal.patrol()))),
      this.kRh
    );
  }
  get InitState() {
    var t, i;
    return (
      !this.wAh &&
        ((this.wAh = !0),
        (t = this.FbDataInternal.initStateType()),
        (i =
          UnionInitStateHelper_1.UnionInitStateHelper.GetUnionInitStateObject(
            t,
          ))) &&
        (this.PAh =
          UnionInitStateHelper_1.UnionInitStateHelper.ReadUnionInitState(
            t,
            this.FbDataInternal.initState(i),
          )),
      this.PAh
    );
  }
  get CenterPoint() {
    return (
      this.GRh ||
        ((this.GRh = !0), (this.ORh = this.FbDataInternal.centerPoint())),
      this.ORh
    );
  }
  get InitBlackBoard() {
    if (!this.FRh) {
      (this.FRh = !0), (this.NRh = new Array());
      var i = this.FbDataInternal.initBlackBoardLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.initBlackBoardType(t),
            e =
              UnionBlackBoardHelper_1.UnionBlackBoardHelper.GetUnionBlackBoardObject(
                s,
              );
          e &&
            void 0 !==
              (s =
                UnionBlackBoardHelper_1.UnionBlackBoardHelper.ReadUnionBlackBoard(
                  s,
                  this.FbDataInternal.initBlackBoard(t, e),
                )) &&
            this.NRh.push(s);
        }
    }
    return this.NRh;
  }
  get WeaponId() {
    return (
      this.VRh ||
        ((this.VRh = !0), (this.jRh = this.FbDataInternal.weaponId())),
      this.jRh
    );
  }
  get AiTeamLevelId() {
    return (
      this.HRh ||
        ((this.HRh = !0), (this.WRh = this.FbDataInternal.aiTeamLevelId())),
      this.WRh
    );
  }
}
exports.FbAiComponent = FbAiComponent;
//# sourceMappingURL=FbAiComponent.js.map

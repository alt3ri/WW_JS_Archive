"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTargetGearGroupConfig = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbCheckGearHit_1 = require("./FbCheckGearHit"),
  UnionGroupFinishConfigHelper_1 = require("./UnionGroupFinishConfigHelper"),
  UnionTargetGearGroupFailureConditionHelper_1 = require("./UnionTargetGearGroupFailureConditionHelper"),
  UnionTargetGearGroupSuccessConditionHelper_1 = require("./UnionTargetGearGroupSuccessConditionHelper");
class FbTargetGearGroupConfig {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.ROh = !1),
      (this.wOh = void 0),
      (this.POh = !1),
      (this.UOh = void 0),
      (this.DOh = !1),
      (this.BOh = void 0),
      (this.qOh = !1),
      (this.kOh = void 0),
      (this.GOh = !1),
      (this.OOh = void 0);
  }
  static Create(i) {
    if (i) return new FbTargetGearGroupConfig(i);
  }
  get Entitys() {
    if (!this.ROh) {
      (this.ROh = !0), (this.wOh = new Array());
      var e = this.FbDataInternal.entitysLength();
      if (e)
        for (let i = 0; i < e; ++i)
          this.wOh.push(this.FbDataInternal.entitys(i));
    }
    return this.wOh;
  }
  get SuccessCondition() {
    var i, e;
    return (
      !this.POh &&
        ((this.POh = !0),
        (i = this.FbDataInternal.successConditionType()),
        (e =
          UnionTargetGearGroupSuccessConditionHelper_1.UnionTargetGearGroupSuccessConditionHelper.GetUnionTargetGearGroupSuccessConditionObject(
            i,
          ))) &&
        (this.UOh =
          UnionTargetGearGroupSuccessConditionHelper_1.UnionTargetGearGroupSuccessConditionHelper.ReadUnionTargetGearGroupSuccessCondition(
            i,
            this.FbDataInternal.successCondition(e),
          )),
      this.UOh
    );
  }
  get FailureConditions() {
    if (!this.DOh) {
      (this.DOh = !0), (this.BOh = new Array());
      var e = this.FbDataInternal.failureConditionsLength();
      if (e)
        for (let i = 0; i < e; ++i) {
          var r = this.FbDataInternal.failureConditionsType(i),
            t =
              UnionTargetGearGroupFailureConditionHelper_1.UnionTargetGearGroupFailureConditionHelper.GetUnionTargetGearGroupFailureConditionObject(
                r,
              );
          t &&
            void 0 !==
              (r =
                UnionTargetGearGroupFailureConditionHelper_1.UnionTargetGearGroupFailureConditionHelper.ReadUnionTargetGearGroupFailureCondition(
                  r,
                  this.FbDataInternal.failureConditions(i, t),
                )) &&
            this.BOh.push(r);
        }
    }
    return this.BOh;
  }
  get CheckGears() {
    if (!this.qOh) {
      (this.qOh = !0), (this.kOh = new Array());
      var e = this.FbDataInternal.checkGearsLength();
      if (e)
        for (let i = 0; i < e; ++i) {
          var r = this.FbDataInternal.checkGears(
            i,
            new fb_component_1.CheckGearHit(),
          );
          this.kOh.push(FbCheckGearHit_1.FbCheckGearHit.Create(r));
        }
    }
    return this.kOh;
  }
  get FinishConfig() {
    var i, e;
    return (
      !this.GOh &&
        ((this.GOh = !0),
        (i = this.FbDataInternal.finishConfigType()),
        (e =
          UnionGroupFinishConfigHelper_1.UnionGroupFinishConfigHelper.GetUnionGroupFinishConfigObject(
            i,
          ))) &&
        (this.OOh =
          UnionGroupFinishConfigHelper_1.UnionGroupFinishConfigHelper.ReadUnionGroupFinishConfig(
            i,
            this.FbDataInternal.finishConfig(e),
          )),
      this.OOh
    );
  }
}
exports.FbTargetGearGroupConfig = FbTargetGearGroupConfig;
//# sourceMappingURL=FbTargetGearGroupConfig.js.map

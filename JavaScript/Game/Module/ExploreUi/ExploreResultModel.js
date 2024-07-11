"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreResultModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class ExploreResultModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.f6t = 0),
      (this.p6t = ""),
      (this.v6t = ""),
      (this.M6t = ""),
      (this.E6t = ""),
      (this.S6t = ""),
      (this.y6t = void 0),
      (this.I6t = void 0),
      (this.T6t = void 0),
      (this.L6t = void 0);
  }
  ResetFailData() {
    (this.f6t = 0),
      (this.p6t = ""),
      (this.y6t = void 0),
      (this.I6t = void 0),
      (this.T6t = void 0),
      (this.v6t = ""),
      (this.E6t = ""),
      (this.S6t = ""),
      (this.M6t = ""),
      (this.L6t = void 0);
  }
  SetLeftBtnData(t, i) {
    (this.y6t = t), (this.v6t = i);
  }
  SetRightBtnData(t, i) {
    (this.T6t = t), (this.M6t = i);
  }
  SetMiddleBtnData(t, i, e) {
    (this.I6t = t), (this.E6t = i), (this.S6t = e);
  }
  SetScore(t) {
    this.f6t = t;
  }
  SetMiddleDesc(t) {
    this.p6t = t;
  }
  SetShowRewards(t) {
    this.L6t = t;
  }
  SetData(t, i, e, s, h, r, o, d) {
    this.ResetFailData(),
      (this.y6t = t),
      (this.I6t = i),
      (this.f6t = e),
      (this.p6t = s),
      (this.v6t = h),
      (this.E6t = r),
      (this.S6t = o),
      (this.L6t = d);
  }
  GetFailScore() {
    return this.f6t;
  }
  GetMiddleDesc() {
    return this.p6t;
  }
  GetLeftBtnClickFunction() {
    return this.y6t;
  }
  GetRightBtnClickFunction() {
    return this.T6t;
  }
  GetMiddleBtnClickFunction() {
    return this.I6t;
  }
  GetLeftText() {
    return this.v6t;
  }
  GetRightText() {
    return this.M6t;
  }
  GetMiddleText() {
    return this.E6t;
  }
  GetMiddleDownText() {
    return this.S6t;
  }
  GetShowItems() {
    return this.L6t;
  }
}
exports.ExploreResultModel = ExploreResultModel;
//# sourceMappingURL=ExploreResultModel.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RegressGradeButtonItem = void 0);
const RegressGradeUiItem_1 = require("./RegressGradeUiItem");
class RegressGradeButtonItem extends RegressGradeUiItem_1.RegressGradeUiItem {
  constructor(t, s) {
    super(),
      (this.NormalButtonItem = t),
      (this.HyperButtonItem = s),
      (this.rMt = void 0),
      (this.Zh1 = () => {
        this.rMt?.(1);
      }),
      (this.el1 = () => {
        this.rMt?.(2);
      }),
      this.NormalButtonItem.SetFunction(this.Zh1),
      this.HyperButtonItem.SetFunction(this.el1);
  }
  Bind(t) {
    this.rMt = t;
  }
  BindRedDot(t) {
    this.NormalButtonItem.BindRedDot(t), this.HyperButtonItem.BindRedDot(t);
  }
  UnBind() {
    this.rMt = void 0;
  }
  Clear() {
    this.NormalButtonItem.UnBindRedDot(),
      this.HyperButtonItem.UnBindRedDot(),
      this.UnBind();
  }
  OnSetToNormal() {
    this.tl1();
  }
  OnSetToHyper() {
    this.tl1();
  }
  tl1() {
    this.NormalButtonItem.SetActive(1 === this.Grade),
      this.HyperButtonItem.SetActive(2 === this.Grade);
  }
}
exports.RegressGradeButtonItem = RegressGradeButtonItem;
//# sourceMappingURL=RegressGradeButtonItem.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RegressGradeUiItem = void 0);
class RegressGradeUiItem {
  constructor() {
    this.sl1 = 1;
  }
  get Grade() {
    return this.sl1;
  }
  set Grade(e) {
    (this.sl1 = e), this.Cl();
  }
  Cl() {
    switch (this.Grade) {
      case 1:
        this.OnSetToNormal();
        break;
      case 2:
        this.OnSetToHyper();
    }
  }
  OnSetToNormal() {}
  OnSetToHyper() {}
  BindRedDot(e) {}
}
exports.RegressGradeUiItem = RegressGradeUiItem;
//# sourceMappingURL=RegressGradeUiItem.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RankTimeItemModelBase = void 0);
class RankTimeItemModelBase {
  constructor() {
    (this.InstanceId = 0),
      (this.ButtonClick = () => {
        this.OnButtonClick();
      });
  }
  RefreshInstance(e) {
    this.InstanceId = e;
  }
  GetContent() {
    return this.OnGetContent();
  }
}
exports.RankTimeItemModelBase = RankTimeItemModelBase;
//# sourceMappingURL=RankTimeItemModel.js.map

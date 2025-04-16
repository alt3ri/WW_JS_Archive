"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GridPopupViewModelBase = void 0);
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
class GridPopupViewModelBase {
  constructor(e, i) {
    (this.GridData = e),
      (this.GameInfo = i),
      (this.View = void 0),
      (this.IsEnd = !1),
      (this.MoveButtonFunction = () => {
        if (!this.IsEnd) {
          const i = () => {
            (this.IsEnd = !0),
              this.GameInfo.RequestMove(),
              this.View?.CloseMeAsync();
          };
          var e;
          this.GameInfo.TeamLv >= this.GridData.Lv
            ? i()
            : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                309,
              )).FunctionMap.set(2, () => {
                i();
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                e,
              ));
        }
      });
  }
  BindView(e) {
    this.View = e;
  }
  EventAvailable() {
    var e = 0 === this.GameInfo.MoveState,
      i = this.GridData.IsUnlock();
    return e && i;
  }
  async Init() {}
  GetSubTxtInfo() {}
  GetBtnDetailFunc() {}
  OnClickedClose() {
    this.IsEnd ||
      ((this.IsEnd = !0),
      (this.GameInfo.GameStage = 1),
      this.View?.CloseMeAsync());
  }
  RefreshTop() {}
  RefreshBottom() {}
  RefreshFunctional() {}
  GetGuideUiItemAndUiItemForShowEx(e) {}
}
exports.GridPopupViewModelBase = GridPopupViewModelBase;
//# sourceMappingURL=GridPopupViewModelBase.js.map

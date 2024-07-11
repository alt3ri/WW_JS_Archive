"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestLockPreview = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LockReasonItem_1 = require("./LockReasonItem");
class QuestLockPreview extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), (this.Rno = void 0), (this.Uno = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  OnBeforeCreate() {
    this.Rno = this.OpenParam;
  }
  OnStart() {
    super.OnStart(), this.Ano();
  }
  Ano() {
    if (this.Rno && 0 !== this.Rno.length) {
      this.Uno = [];
      var e = this.GetItem(2),
        i = this.GetItem(1);
      for (const o of this.Rno) {
        var t = LguiUtil_1.LguiUtil.CopyItem(e, i),
          s = new LockReasonItem_1.LockReasonItem(o);
        s.CreateThenShowByActorAsync(t.GetOwner()), this.Uno.push(s);
      }
      e.SetUIActive(!1);
    }
  }
}
exports.QuestLockPreview = QuestLockPreview;
//# sourceMappingURL=QuestLockPreview.js.map

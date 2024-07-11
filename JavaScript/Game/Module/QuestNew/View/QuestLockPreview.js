"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestLockPreview = void 0);
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LockReasonItem_1 = require("./LockReasonItem");
class QuestLockPreview extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), (this.xro = void 0), (this.wro = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  OnBeforeCreate() {
    this.xro = this.OpenParam;
  }
  OnStart() {
    super.OnStart(), this.Bro();
  }
  Bro() {
    if (this.xro && this.xro.length !== 0) {
      this.wro = [];
      const e = this.GetItem(2);
      const i = this.GetItem(1);
      for (const o of this.xro) {
        const t = LguiUtil_1.LguiUtil.CopyItem(e, i);
        const s = new LockReasonItem_1.LockReasonItem(o);
        s.CreateThenShowByActorAsync(t.GetOwner()), this.wro.push(s);
      }
      e.SetUIActive(!1);
    }
  }
}
exports.QuestLockPreview = QuestLockPreview;
// # sourceMappingURL=QuestLockPreview.js.map

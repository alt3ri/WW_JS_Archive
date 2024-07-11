"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SimpleGenericLayout = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  LguiUtil_1 = require("../LguiUtil");
class SimpleGenericLayout {
  constructor(t) {
    (this.Layout = void 0),
      (this.BGo = void 0),
      (this.x5e = []),
      (this.bGo = 0);
    t = (this.Layout = t).RootUIComp.GetAttachUIChild(0);
    t && t.IsValid()
      ? ((this.BGo = t), this.x5e.push(this.BGo))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("UiCommon", 44, "Layout下不存在有效的子节点");
  }
  RebuildLayout(t) {
    (this.BGo && this.BGo.IsValid()) ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("UiCommon", 44, "Layout下不存在有效的子节点")),
      (this.bGo = t);
    var i = this.Layout.RootUIComp;
    for (let t = this.x5e.length; t < this.bGo; t++) {
      var s = LguiUtil_1.LguiUtil.CopyItem(this.BGo, i);
      this.x5e.push(s);
    }
    for (let t = 0; t < this.bGo; t++) this.x5e[t].SetUIActive(!0);
    for (let t = this.bGo; t < this.x5e.length; t++)
      this.x5e[t].SetUIActive(!1);
  }
  GetDisplayCount() {
    return this.bGo;
  }
  GetItemList() {
    return this.x5e;
  }
}
exports.SimpleGenericLayout = SimpleGenericLayout;
//# sourceMappingURL=SimpleGenericLayout.js.map

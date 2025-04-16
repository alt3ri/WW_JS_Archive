"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillPanelHandle = void 0);
const SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase"),
  ModelManager_1 = require("../../../../Manager/ModelManager");
class RoleSkillPanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments), (this.GroupName = ""), (this.IsInPreview = !1);
  }
  SetToggleSelectByGroupName(e) {
    var a = this.GetNavigationGroup(e);
    if (a) {
      this.GroupName = e;
      for (let e = 0, l = a.ListenerList.length; e < l; ++e)
        a.ListenerList[e].GetBehaviorComponent().bToggleOnSelect = !0;
    }
  }
  ResetToggleSelect() {
    var a = this.GetNavigationGroup(this.GroupName);
    if (a) {
      this.GroupName = "";
      for (let e = 0, l = a.ListenerList.length; e < l; ++e)
        a.ListenerList[e].GetBehaviorComponent().bToggleOnSelect = !1;
    }
  }
  SetSkillTreeToggleCursorActive(a) {
    var t = this.GetNavigationGroup(this.GroupName);
    if (t) {
      for (let e = 0, l = t.ListenerList.length; e < l; ++e)
        t.ListenerList[e].Cursor.Switch = a;
      ModelManager_1.ModelManager.UiNavigationModel.RefreshCursorActive();
    }
  }
}
exports.RoleSkillPanelHandle = RoleSkillPanelHandle;
//# sourceMappingURL=RoleSkillPanelHandle.js.map

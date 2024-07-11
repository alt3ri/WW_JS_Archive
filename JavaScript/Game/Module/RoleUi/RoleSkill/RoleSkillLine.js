"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillLine = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleSkillLine extends UiPanelBase_1.UiPanelBase {
  constructor(s, i, t, e) {
    super(),
      this.CreateThenShowByActor(e.GetOwner()),
      (this.xco = e.GetAttachUIChild(0)),
      (this.wco = e.GetAttachUIChild(1)),
      (this.Bco = e.GetAttachUIChild(2)),
      (this.StartPosId = s),
      (this.EndPosId = i),
      this.SetColor(t);
  }
  SetColor(s) {
    this.Bco && this.Bco.SetColor(UE.Color.FromHex(s)),
      this.wco && this.wco.SetColor(UE.Color.FromHex(s));
  }
  SetLineActive(s) {
    switch (s) {
      case 1:
        this.RootItem.SetUIActive(!1), this.Bco.SetUIActive(!1);
        break;
      case 2:
        this.RootItem.SetUIActive(!0),
          this.xco.SetUIActive(!0),
          this.wco.SetUIActive(!1),
          this.Bco.SetUIActive(!1);
        break;
      case 3:
        this.RootItem.SetUIActive(!0),
          this.xco.SetUIActive(!1),
          this.wco.SetUIActive(!0),
          this.Bco.SetUIActive(!0);
    }
  }
  OnBeforeDestroy() {
    (this.StartPosId = void 0),
      (this.EndPosId = void 0),
      (this.xco = void 0),
      (this.wco = void 0),
      (this.Bco = void 0);
  }
}
exports.RoleSkillLine = RoleSkillLine;
//# sourceMappingURL=RoleSkillLine.js.map

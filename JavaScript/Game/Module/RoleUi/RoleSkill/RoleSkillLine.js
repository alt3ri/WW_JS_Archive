"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillLine = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleSkillLine extends UiPanelBase_1.UiPanelBase {
  constructor(s, i, t, e) {
    super(),
      this.CreateThenShowByActor(e.GetOwner()),
      (this.Rmo = e.GetAttachUIChild(0)),
      (this.Umo = e.GetAttachUIChild(1)),
      (this.Amo = e.GetAttachUIChild(2)),
      (this.StartPosId = s),
      (this.EndPosId = i),
      this.SetColor(t);
  }
  SetColor(s) {
    this.Amo && this.Amo.SetColor(UE.Color.FromHex(s)),
      this.Umo && this.Umo.SetColor(UE.Color.FromHex(s));
  }
  SetLineActive(s) {
    switch (s) {
      case 1:
        this.RootItem.SetUIActive(!1), this.Amo.SetUIActive(!1);
        break;
      case 2:
        this.RootItem.SetUIActive(!0),
          this.Rmo.SetUIActive(!0),
          this.Umo.SetUIActive(!1),
          this.Amo.SetUIActive(!1);
        break;
      case 3:
        this.RootItem.SetUIActive(!0),
          this.Rmo.SetUIActive(!1),
          this.Umo.SetUIActive(!0),
          this.Amo.SetUIActive(!0);
    }
  }
  OnBeforeDestroy() {
    (this.StartPosId = void 0),
      (this.EndPosId = void 0),
      (this.Rmo = void 0),
      (this.Umo = void 0),
      (this.Amo = void 0);
  }
}
exports.RoleSkillLine = RoleSkillLine;
//# sourceMappingURL=RoleSkillLine.js.map

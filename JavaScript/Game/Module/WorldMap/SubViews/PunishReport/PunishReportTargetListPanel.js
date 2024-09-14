"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PunishReportTargetListPanel = void 0);
const GenericLayoutAdd_1 = require("../../../Util/GenericLayoutAdd"),
  PunishReportTargetListItemPanel_1 = require("./PunishReportTargetListItemPanel");
class PunishReportTargetListPanel {
  constructor() {
    (this.cVa = void 0),
      (this.OnLayoutRefresh = (e, t, i, r) => {
        var s =
          new PunishReportTargetListItemPanel_1.PunishReportTargetListItemPanel();
        return s.CreateThenShowByActorAsync(t.GetOwner()), { Key: e, Value: s };
      });
  }
  Initialize(e) {
    this.cVa = new GenericLayoutAdd_1.GenericLayoutAdd(e, this.OnLayoutRefresh);
  }
  AddItemByKey(e) {
    var t = this.cVa.GetLayoutItemByKey(e);
    return (
      t ||
        (this.cVa.AddItemToLayout([e]),
        (t = this.cVa.GetLayoutItemByKey(e)).SetDescTxt(""),
        t.SetNumTxt(""),
        t.SetLockActive(!0),
        t.SetToggleEmptyActive(!1),
        t.SetToggleSelectedActive(!1)),
      t
    );
  }
  Clear() {
    this.cVa.ClearChildren();
  }
}
exports.PunishReportTargetListPanel = PunishReportTargetListPanel;
//# sourceMappingURL=PunishReportTargetListPanel.js.map

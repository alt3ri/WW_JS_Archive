"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PunishReportTargetListPanel = void 0);
const GenericLayoutAdd_1 = require("../../../Util/GenericLayoutAdd"),
  PunishReportTargetListItemPanel_1 = require("./PunishReportTargetListItemPanel");
class PunishReportTargetListPanel {
  constructor() {
    (this.J7a = void 0),
      (this.OnLayoutRefresh = (e, t, i, r) => {
        var s =
          new PunishReportTargetListItemPanel_1.PunishReportTargetListItemPanel();
        return s.CreateThenShowByActorAsync(t.GetOwner()), { Key: e, Value: s };
      });
  }
  Initialize(e) {
    this.J7a = new GenericLayoutAdd_1.GenericLayoutAdd(e, this.OnLayoutRefresh);
  }
  AddItemByKey(e) {
    var t = this.J7a.GetLayoutItemByKey(e);
    return (
      t ||
        (this.J7a.AddItemToLayout([e]),
        (t = this.J7a.GetLayoutItemByKey(e)).SetDescTxt(""),
        t.SetNumTxt(""),
        t.SetState(0)),
      t
    );
  }
  Clear() {
    this.J7a.ClearChildren();
  }
}
exports.PunishReportTargetListPanel = PunishReportTargetListPanel;
//# sourceMappingURL=PunishReportTargetListPanel.js.map

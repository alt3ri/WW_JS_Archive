"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFavorLockItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleFavorLockItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, s) {
    super(), (this.c_o = s), e && this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIText],
    ];
  }
  OnStart() {
    var e, s;
    this.c_o &&
      ((e = this.c_o.Desc),
      (s = this.c_o.IsLock),
      this.GetText(3).SetText(e),
      this.GetText(2).SetText(e),
      this.GetItem(1).SetUIActive(s),
      this.GetItem(0).SetUIActive(!s));
  }
  OnBeforeDestroy() {
    this.c_o = void 0;
  }
}
exports.RoleFavorLockItem = RoleFavorLockItem;
//# sourceMappingURL=RoleFavorLockItem.js.map

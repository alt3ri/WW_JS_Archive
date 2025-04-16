"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkinObtainItem = void 0);
const UE = require("ue"),
  SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class RoleSkinObtainItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.eTt = () => {
        2 === this.Pe.Type &&
          SkipTaskManager_1.SkipTaskManager.RunByConfigId(
            this.Pe.Id,
            this.Pe.Id,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.eTt]]);
  }
  Refresh(i, t, s) {
    this.Pe = i;
    i = 2 === this.Pe.Type;
    this.GetItem(1)?.SetUIActive(i),
      this.GetItem(2)?.SetUIActive(!i),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.Pe.Text),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), this.Pe.Text);
  }
}
exports.RoleSkinObtainItem = RoleSkinObtainItem;
//# sourceMappingURL=RoleSkinObtainItem.js.map

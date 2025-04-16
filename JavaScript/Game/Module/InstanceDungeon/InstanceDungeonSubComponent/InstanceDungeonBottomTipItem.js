"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonBottomTipItem = void 0);
const ue_1 = require("ue"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class InstanceDungeonBottomTipItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIText]];
  }
  Refresh(t, e, i) {
    var r = t.TextId,
      t = t.TextArgs;
    t
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), r, ...t)
      : LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), r);
  }
}
exports.InstanceDungeonBottomTipItem = InstanceDungeonBottomTipItem;
//# sourceMappingURL=InstanceDungeonBottomTipItem.js.map

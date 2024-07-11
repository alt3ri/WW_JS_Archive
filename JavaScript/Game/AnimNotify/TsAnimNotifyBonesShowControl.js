"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
class TsAnimNotifyBonesShowControl extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.BoneName = void 0), (this.Show = !1);
  }
  K2_Notify(t, s) {
    return (
      t.IsBoneHiddenByName(this.BoneName) === this.Show &&
        (this.Show
          ? t.UnHideBoneByName(this.BoneName)
          : t.HideBoneByName(this.BoneName, 0)),
      !0
    );
  }
  GetNotifyName() {
    return "控制骨骼显隐";
  }
}
exports.default = TsAnimNotifyBonesShowControl;
//# sourceMappingURL=TsAnimNotifyBonesShowControl.js.map

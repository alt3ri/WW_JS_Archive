"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HelpView = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../Util/LguiUtil");
const Paragraph_1 = require("./Paragraph");
class HelpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), (this.cei = new Array());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    this.GetItem(2).SetUIActive(!1), this.AU();
  }
  AU() {
    const e = this.OpenParam;
    const t =
      ConfigManager_1.ConfigManager.HelpConfig.GetHelpContentInfoByGroupId(e);
    if (t.length > 0) {
      this.GetText(0).ShowTextNew(t[0].Title);
      let s;
      const a = t.length;
      const n =
        (this.cei.forEach((e) => {
          e.SetActive(!1);
        }),
        this.GetItem(2));
      const h = this.GetItem(1);
      let r = 0;
      for (let i = 0; i < a; i++) {
        let e = void 0;
        r > this.cei.length - 1
          ? ((s = LguiUtil_1.LguiUtil.CopyItem(n, h)),
            (e = new Paragraph_1.Paragraph(s.GetOwner())),
            this.cei.push(e))
          : (e = this.cei[r]),
          e.Refresh(t[i]),
          e.SetActive(!0),
          r++;
      }
    }
  }
}
exports.HelpView = HelpView;
// # sourceMappingURL=HelpView.js.map

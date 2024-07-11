"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SilentAreaInfoItem = void 0);
const UE = require("ue");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SilentAreaInfoSubItem_1 = require("./SilentAreaInfoSubItem");
class SilentAreaInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.Rct = []);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  Initialize(e, t) {
    this.CreateByActorAsync(e).finally(() => {
      this.UpdateItem(t);
    });
  }
  async OnBeforeStartAsync() {
    const e = this.GetItem(1);
    const t = new SilentAreaInfoSubItem_1.SilentAreaInfoSubItem();
    await t.CreateByActorAsync(e.GetOwner()), this.Rct.push(t);
  }
  UpdateItem(e) {
    this.Uct(e.TidMainTitle), this.Act(e.SubTitles);
  }
  Uct(e) {
    const t = this.GetText(0);
    var e = PublicUtil_1.PublicUtil.GetConfigTextByKey(e);
    t?.SetText(e);
  }
  Act(i) {
    for (let t = 0; t < i.length; t++) {
      var s;
      const r = i[t];
      let e = void 0;
      t < this.Rct.length
        ? (e = this.Rct[t]).UpdateItem(r)
        : ((s = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(1), this.GetItem(2))),
          (e = new SilentAreaInfoSubItem_1.SilentAreaInfoSubItem()).Initialize(
            s.GetOwner(),
            r,
          ),
          this.Rct.push(e));
    }
    this.Rct.forEach((e, t) => {
      e.SetActive(t < i.length);
    });
  }
}
exports.SilentAreaInfoItem = SilentAreaInfoItem;
// # sourceMappingURL=SilentAreaInfoItem.js.map

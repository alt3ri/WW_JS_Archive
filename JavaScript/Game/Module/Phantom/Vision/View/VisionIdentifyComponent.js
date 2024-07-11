"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelUpIdentifyComponent = void 0);
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const PhantomDataBase_1 = require("../../PhantomBattle/Data/PhantomDataBase");
const VisionIdentifyItem_1 = require("./VisionIdentifyItem");
class LevelUpIdentifyComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.Layout = void 0),
      (this.T7i = void 0),
      (this.L7i = void 0),
      (this.D7i = void 0),
      (this.sGe = () => new VisionIdentifyItem_1.VisionIdentifyItem()),
      (this.T7i = e);
  }
  async Init(e) {
    (this.L7i = e), await this.CreateByActorAsync(this.T7i.GetOwner(), void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    (this.Layout = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(0),
      this.sGe,
    )),
      this.GetItem(1).SetUIActive(!1);
  }
  async PlayUpdateAnimation(e) {
    await this.D7i?.Promise;
    let t = 0;
    const i = [];
    const s =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionIdentifyAnimationTime();
    e.forEach((e) => {
      e = this.Layout.GetLayoutItemByKey(e).PlaySequenceAndUpdate(t, s);
      i.push(e), (t += s);
    }),
      await Promise.all(i);
  }
  Update(e, i) {
    if (((this.D7i = new CustomPromise_1.CustomPromise()), e.length > 0)) {
      const s = new Array();
      e.forEach((e) => {
        const t = new PhantomDataBase_1.VisionSubPropViewData();
        (t.Data = e), (t.SourceView = this.L7i), (t.IfPreCache = i), s.push(t);
      }),
        this.Layout.RefreshByData(s, () => {
          this.D7i?.IsFulfilled() || this.D7i.SetResult(!0);
        });
    }
  }
}
exports.LevelUpIdentifyComponent = LevelUpIdentifyComponent;
// # sourceMappingURL=VisionIdentifyComponent.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelUpIdentifyComponent = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  PhantomDataBase_1 = require("../../PhantomBattle/Data/PhantomDataBase"),
  VisionIdentifyItem_1 = require("./VisionIdentifyItem");
class LevelUpIdentifyComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.Layout = void 0),
      (this.IHi = void 0),
      (this.THi = void 0),
      (this.LHi = void 0),
      (this.sGe = () => new VisionIdentifyItem_1.VisionIdentifyItem()),
      (this.IHi = e);
  }
  async Init(e) {
    (this.THi = e), await this.CreateByActorAsync(this.IHi.GetOwner(), void 0);
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
    await this.LHi?.Promise;
    let t = 0;
    const i = [],
      s =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionIdentifyAnimationTime();
    e.forEach((e) => {
      e = this.Layout.GetLayoutItemByKey(e).PlaySequenceAndUpdate(t, s);
      i.push(e), (t += s);
    }),
      await Promise.all(i);
  }
  Update(e, i) {
    if (((this.LHi = new CustomPromise_1.CustomPromise()), 0 < e.length)) {
      const s = new Array();
      e.forEach((e) => {
        var t = new PhantomDataBase_1.VisionSubPropViewData();
        (t.Data = e), (t.SourceView = this.THi), (t.IfPreCache = i), s.push(t);
      }),
        this.Layout.RefreshByData(s, () => {
          this.LHi?.IsFulfilled() || this.LHi.SetResult(!0);
        });
    }
  }
}
exports.LevelUpIdentifyComponent = LevelUpIdentifyComponent;
//# sourceMappingURL=VisionIdentifyComponent.js.map

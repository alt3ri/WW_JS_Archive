"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardExploreBarList = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  TrainingItem_1 = require("../../TrainingDegree/TrainingItem"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreBarList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this._fi = void 0),
      (this.ufi = void 0),
      (this.Y0i = []);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ]),
      (this.BtnBindInfo = []);
  }
  OnStart() {
    (this.ufi = this.GetItem(0)),
      (this._fi = this.GetItem(1)),
      this._fi.SetUIActive(!1);
  }
  OnBeforeDestroy() {
    (this.ufi = void 0), (this._fi = void 0), this.cfi();
  }
  Refresh(i, e) {
    var t = !StringUtils_1.StringUtils.IsEmpty(i);
    t && this.Ubt(i), this.mfi(t), this.dfi(e);
  }
  dfi(i) {
    this.cfi();
    var e = this.GetItem(0);
    if (i && 0 !== i.length) {
      for (const t of i) this.Cfi(t);
      e.SetUIActive(!0);
    } else e.SetUIActive(!1);
  }
  Ubt(i) {}
  mfi(i) {}
  Cfi(i) {
    var e = LguiUtil_1.LguiUtil.CopyItem(this._fi, this.ufi),
      e = new TrainingItem_1.TrainingItem(e);
    e.SetData(i.TrainingData), e.SetActive(!0), this.Y0i.push(e);
  }
  cfi() {
    for (const i of this.Y0i) i.Destroy();
    this.Y0i.length = 0;
  }
}
exports.RewardExploreBarList = RewardExploreBarList;
//# sourceMappingURL=RewardExploreBarList.js.map

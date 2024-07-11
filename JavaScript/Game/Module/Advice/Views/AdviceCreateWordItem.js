"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceCreateWordItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  AdviceCreateWordBtnItem_1 = require("./AdviceCreateWordBtnItem");
class AdviceCreateWordItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Xy = 0),
      (this.J7e = new Array()),
      (this.z7e = void 0),
      (this.Z7e = void 0),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    this.eHe(),
      this.tHe(),
      this.iHe(),
      this.GetItem(1).SetUIActive(!1),
      this.GetText(0).SetUIActive(!1);
  }
  eHe() {
    for (let t = 0; t < 2; t++) {
      var e = LguiUtil_1.LguiUtil.CopyItem(this.GetText(0), this.RootItem);
      this.J7e.push(e);
    }
  }
  tHe() {
    var t = this.GetItem(1),
      t = LguiUtil_1.LguiUtil.CopyItem(t, this.RootItem),
      t = new AdviceCreateWordBtnItem_1.AdviceCreateWordBtnItem(t);
    (this.z7e = t), this.z7e.SetType(1);
  }
  iHe() {
    var t = this.GetItem(1),
      t = LguiUtil_1.LguiUtil.CopyItem(t, this.RootItem),
      t = new AdviceCreateWordBtnItem_1.AdviceCreateWordBtnItem(t);
    (this.Z7e = t), this.Z7e.SetType(0);
  }
  SetIndex(t) {
    (this.Xy = t), this.z7e.SetIndex(t), this.Z7e.SetIndex(t);
  }
  RefreshView() {
    this.Z9e(), this.Y7e();
  }
  Z9e() {
    const e = this.GetItem(2);
    this.J7e.forEach((t) => {
      t.SetUIActive(!1), t.SetUIParent(e);
    }),
      this.z7e.GetRootItem().SetUIParent(e),
      this.Z7e.GetRootItem().SetUIParent(e),
      this.z7e.GetRootItem().SetUIActive(!1),
      this.Z7e.GetRootItem().SetUIActive(!1);
  }
  Y7e() {
    var t = ModelManager_1.ModelManager.AdviceModel.CurrentSentenceWordMap.get(
      this.Xy,
    );
    if (!(t <= 0)) {
      0 < this.Xy &&
        (this.z7e.GetRootItem().SetUIParent(this.RootItem),
        this.z7e.GetRootItem().SetUIActive(!0),
        this.z7e.RefreshView());
      var e =
        ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceText(
          t,
        ).split("{}");
      for (let t = 0; t < e.length; t++)
        this.J7e[t].SetText(e[t]),
          this.J7e[t].SetUIParent(this.RootItem),
          t + 1 < e.length &&
            (this.Z7e.GetRootItem().SetUIParent(this.RootItem),
            this.Z7e.GetRootItem().SetUIActive(!0),
            this.Z7e.RefreshView()),
          this.J7e[t].SetUIActive(!0);
    }
  }
}
exports.AdviceCreateWordItem = AdviceCreateWordItem;
//# sourceMappingURL=AdviceCreateWordItem.js.map

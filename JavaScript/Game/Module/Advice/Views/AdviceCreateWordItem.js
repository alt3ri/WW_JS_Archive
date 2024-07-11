"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceCreateWordItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const AdviceCreateWordBtnItem_1 = require("./AdviceCreateWordBtnItem");
class AdviceCreateWordItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Xy = 0),
      (this.G9e = new Array()),
      (this.N9e = void 0),
      (this.O9e = void 0),
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
    this.k9e(),
      this.F9e(),
      this.V9e(),
      this.GetItem(1).SetUIActive(!1),
      this.GetText(0).SetUIActive(!1);
  }
  k9e() {
    for (let t = 0; t < 2; t++) {
      const e = LguiUtil_1.LguiUtil.CopyItem(this.GetText(0), this.RootItem);
      this.G9e.push(e);
    }
  }
  F9e() {
    var t = this.GetItem(1);
    var t = LguiUtil_1.LguiUtil.CopyItem(t, this.RootItem);
    var t = new AdviceCreateWordBtnItem_1.AdviceCreateWordBtnItem(t);
    (this.N9e = t), this.N9e.SetType(1);
  }
  V9e() {
    var t = this.GetItem(1);
    var t = LguiUtil_1.LguiUtil.CopyItem(t, this.RootItem);
    var t = new AdviceCreateWordBtnItem_1.AdviceCreateWordBtnItem(t);
    (this.O9e = t), this.O9e.SetType(0);
  }
  SetIndex(t) {
    (this.Xy = t), this.N9e.SetIndex(t), this.O9e.SetIndex(t);
  }
  RefreshView() {
    this.O8e(), this.q9e();
  }
  O8e() {
    const e = this.GetItem(2);
    this.G9e.forEach((t) => {
      t.SetUIActive(!1), t.SetUIParent(e);
    }),
      this.N9e.GetRootItem().SetUIParent(e),
      this.O9e.GetRootItem().SetUIParent(e),
      this.N9e.GetRootItem().SetUIActive(!1),
      this.O9e.GetRootItem().SetUIActive(!1);
  }
  q9e() {
    const t =
      ModelManager_1.ModelManager.AdviceModel.CurrentSentenceWordMap.get(
        this.Xy,
      );
    if (!(t <= 0)) {
      this.Xy > 0 &&
        (this.N9e.GetRootItem().SetUIParent(this.RootItem),
        this.N9e.GetRootItem().SetUIActive(!0),
        this.N9e.RefreshView());
      const e =
        ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceText(
          t,
        ).split("{}");
      for (let t = 0; t < e.length; t++)
        this.G9e[t].SetText(e[t]),
          this.G9e[t].SetUIParent(this.RootItem),
          t + 1 < e.length &&
            (this.O9e.GetRootItem().SetUIParent(this.RootItem),
            this.O9e.GetRootItem().SetUIActive(!0),
            this.O9e.RefreshView()),
          this.G9e[t].SetUIActive(!0);
    }
  }
}
exports.AdviceCreateWordItem = AdviceCreateWordItem;
// # sourceMappingURL=AdviceCreateWordItem.js.map

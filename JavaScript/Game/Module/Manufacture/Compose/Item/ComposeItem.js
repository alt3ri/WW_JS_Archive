"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposeItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const ComposeController_1 = require("../ComposeController");
class ComposeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.dqt = void 0),
      (this.Wgt = void 0),
      (this.UIt = (s) => {
        this.Wgt && (this.Wgt(this.dqt), this.xqt());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [6, UE.UIExtendToggle],
      [10, UE.UISprite],
      [11, UE.UITexture],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [12, UE.UIText],
    ]),
      (this.BtnBindInfo = [[6, this.UIt]]);
  }
  Refresh(s, i, t) {
    (this.dqt = s),
      this.C4e(),
      this.Pqt(),
      this.Kbe(),
      this.IPt(),
      this.wqt(),
      this.xqt(),
      this.IVe(i, !1);
  }
  C4e() {
    var s = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
      this.dqt.ItemId,
    );
    var s = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(s.Name);
    this.GetText(12).SetText(s);
  }
  Pqt() {
    switch (this.dqt.MainType) {
      case 1:
        if (this.dqt.SubType === 35)
          return void this.SetItemQualityIcon(
            this.GetSprite(10),
            this.dqt.ItemId,
          );
        break;
      case 2:
        if (this.dqt.SubType === 37)
          return void this.SetItemQualityIcon(
            this.GetSprite(10),
            this.dqt.ItemId,
          );
    }
    const s =
      ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
        this.dqt.ItemId,
      );
    this.SetItemQualityIcon(this.GetSprite(10), s.ItemId);
  }
  Kbe() {
    switch (this.dqt.MainType) {
      case 1:
        if (this.dqt.SubType === 0)
          return (
            (s =
              ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
                this.dqt.ItemId,
              )),
            void this.SetItemIcon(this.GetTexture(11), s.ItemId)
          );
        this.SetItemIcon(this.GetTexture(11), this.dqt.ItemId);
        break;
      case 2:
        if (this.dqt.SubType === 0)
          return (
            (s =
              ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
                this.dqt.ItemId,
              )),
            void this.SetItemIcon(this.GetTexture(11), s.ItemId)
          );
        this.SetItemIcon(this.GetTexture(11), this.dqt.ItemId);
        break;
      case 3:
        var s =
          ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
            this.dqt.ItemId,
          );
        this.SetItemIcon(this.GetTexture(11), s.ItemId);
    }
  }
  IPt() {
    switch (this.dqt.MainType) {
      case 1:
      case 2:
        this.GetItem(7).SetUIActive(!1);
        break;
      case 3:
        var s = this.dqt;
        this.GetItem(7).SetUIActive(!s.IsUnlock);
    }
  }
  wqt() {
    switch (this.dqt.MainType) {
      case 1:
        var s = this.dqt;
        s.SubType === 35
          ? this.GetItem(8).SetUIActive(!1)
          : ((s =
              ComposeController_1.ComposeController.CheckCanReagentProduction(
                s.ItemId,
              )),
            this.GetItem(8).SetUIActive(!s));
        break;
      case 2:
        var s = this.dqt;
        s.SubType === 37
          ? this.GetItem(8).SetUIActive(!1)
          : ((s = ComposeController_1.ComposeController.CheckCanStructure(
              s.ItemId,
            )),
            this.GetItem(8).SetUIActive(!s));
        break;
      case 3:
        s = this.dqt;
        ModelManager_1.ModelManager.ComposeModel.GetPurificationDataById(
          s.ItemId,
        ).IsUnlock !== 0
          ? ((s = ComposeController_1.ComposeController.CheckCanPurification(
              s.ItemId,
            )),
            this.GetItem(8).SetUIActive(!s))
          : this.GetItem(8).SetUIActive(!0);
    }
  }
  xqt() {
    this.GetItem(9).SetUIActive(this.dqt.IsNew);
  }
  BindOnClickedCallback(s) {
    this.Wgt = s;
  }
  OnSelected(s) {
    this.IVe(!0);
  }
  OnDeselected(s) {
    this.IVe(!1);
  }
  IVe(s, i = !0) {
    const t = this.GetExtendToggle(6);
    s ? t.SetToggleState(1, i) : t.SetToggleState(0, !1);
  }
}
exports.ComposeItem = ComposeItem;
// # sourceMappingURL=ComposeItem.js.map

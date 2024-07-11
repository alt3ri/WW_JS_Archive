"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposeItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  ComposeController_1 = require("../ComposeController");
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
      ),
      s = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(s.Name);
    this.GetText(12).SetText(s);
  }
  Pqt() {
    switch (this.dqt.MainType) {
      case 1:
        if (35 === this.dqt.SubType)
          return void this.SetItemQualityIcon(
            this.GetSprite(10),
            this.dqt.ItemId,
          );
        break;
      case 2:
        if (37 === this.dqt.SubType)
          return void this.SetItemQualityIcon(
            this.GetSprite(10),
            this.dqt.ItemId,
          );
    }
    var s = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
      this.dqt.ItemId,
    );
    this.SetItemQualityIcon(this.GetSprite(10), s.ItemId);
  }
  Kbe() {
    switch (this.dqt.MainType) {
      case 1:
        if (0 === this.dqt.SubType)
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
        if (0 === this.dqt.SubType)
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
        35 === s.SubType
          ? this.GetItem(8).SetUIActive(!1)
          : ((s =
              ComposeController_1.ComposeController.CheckCanReagentProduction(
                s.ItemId,
              )),
            this.GetItem(8).SetUIActive(!s));
        break;
      case 2:
        var s = this.dqt;
        37 === s.SubType
          ? this.GetItem(8).SetUIActive(!1)
          : ((s = ComposeController_1.ComposeController.CheckCanStructure(
              s.ItemId,
            )),
            this.GetItem(8).SetUIActive(!s));
        break;
      case 3:
        s = this.dqt;
        0 !==
        ModelManager_1.ModelManager.ComposeModel.GetPurificationDataById(
          s.ItemId,
        ).IsUnlock
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
    var t = this.GetExtendToggle(6);
    s ? t.SetToggleState(1, i) : t.SetToggleState(0, !1);
  }
}
exports.ComposeItem = ComposeItem;
//# sourceMappingURL=ComposeItem.js.map

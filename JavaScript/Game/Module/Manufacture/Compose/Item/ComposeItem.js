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
      (this.fGt = void 0),
      (this.oft = void 0),
      (this.BTt = (s) => {
        this.oft && (this.oft(this.fGt), this.bGt());
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
      (this.BtnBindInfo = [[6, this.BTt]]);
  }
  Refresh(s, i, t) {
    (this.fGt = s),
      this.P5e(),
      this.BGt(),
      this.Kbe(),
      this.Rxt(),
      this.qGt(),
      this.bGt(),
      this.N6e(i, !1);
  }
  P5e() {
    var s = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
        this.fGt.ItemId,
      ),
      s = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(s.Name);
    this.GetText(12).SetText(s);
  }
  BGt() {
    switch (this.fGt.MainType) {
      case 1:
        if (35 === this.fGt.SubType)
          return void this.SetItemQualityIcon(
            this.GetSprite(10),
            this.fGt.ItemId,
          );
        break;
      case 2:
        if (37 === this.fGt.SubType)
          return void this.SetItemQualityIcon(
            this.GetSprite(10),
            this.fGt.ItemId,
          );
    }
    var s = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
      this.fGt.ItemId,
    );
    this.SetItemQualityIcon(this.GetSprite(10), s.ItemId);
  }
  Kbe() {
    switch (this.fGt.MainType) {
      case 1:
        if (0 === this.fGt.SubType)
          return (
            (s =
              ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
                this.fGt.ItemId,
              )),
            void this.SetItemIcon(this.GetTexture(11), s.ItemId)
          );
        this.SetItemIcon(this.GetTexture(11), this.fGt.ItemId);
        break;
      case 2:
        if (0 === this.fGt.SubType)
          return (
            (s =
              ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
                this.fGt.ItemId,
              )),
            void this.SetItemIcon(this.GetTexture(11), s.ItemId)
          );
        this.SetItemIcon(this.GetTexture(11), this.fGt.ItemId);
        break;
      case 3:
        var s =
          ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
            this.fGt.ItemId,
          );
        this.SetItemIcon(this.GetTexture(11), s.ItemId);
    }
  }
  Rxt() {
    switch (this.fGt.MainType) {
      case 1:
      case 2:
        this.GetItem(7).SetUIActive(!1);
        break;
      case 3:
        var s = this.fGt;
        this.GetItem(7).SetUIActive(!s.IsUnlock);
    }
  }
  qGt() {
    switch (this.fGt.MainType) {
      case 1:
        var s = this.fGt;
        35 === s.SubType
          ? this.GetItem(8).SetUIActive(!1)
          : ((s =
              ComposeController_1.ComposeController.CheckCanReagentProduction(
                s.ItemId,
              )),
            this.GetItem(8).SetUIActive(!s));
        break;
      case 2:
        var s = this.fGt;
        37 === s.SubType
          ? this.GetItem(8).SetUIActive(!1)
          : ((s = ComposeController_1.ComposeController.CheckCanStructure(
              s.ItemId,
            )),
            this.GetItem(8).SetUIActive(!s));
        break;
      case 3:
        s = this.fGt;
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
  bGt() {
    this.GetItem(9).SetUIActive(this.fGt.IsNew);
  }
  BindOnClickedCallback(s) {
    this.oft = s;
  }
  OnSelected(s) {
    this.N6e(!0);
  }
  OnDeselected(s) {
    this.N6e(!1);
  }
  N6e(s, i = !0) {
    var t = this.GetExtendToggle(6);
    s ? t.SetToggleState(1, i) : t.SetToggleState(0, !1);
  }
}
exports.ComposeItem = ComposeItem;
//# sourceMappingURL=ComposeItem.js.map

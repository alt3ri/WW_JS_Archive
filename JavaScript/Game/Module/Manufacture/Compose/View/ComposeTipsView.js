"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConfirmButtonCompose = exports.ComposeTipsView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CommonItemView_1 = require("../../Common/CommonItemView"),
  ComposeController_1 = require("../ComposeController");
class ComposeTipsView extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.fGt = void 0),
      (this.iOt = void 0),
      (this.oOt = void 0),
      (this.XTi = void 0),
      (this.nOt = (e, i, t) => {
        i = new CommonItemView_1.MaterialItem(i);
        return (
          i.Update(e), i.BindOnClickedCallback(this.jYe), { Key: t, Value: i }
        );
      }),
      (this.jYe = (e) => {
        e.K6n &&
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
            e.L8n,
          );
      }),
      (this.sOt = () => {
        switch (
          ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType
        ) {
          case 1:
            var e = this.fGt;
            35 === e.SubType
              ? ((i =
                  ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByFormulaItemId(
                    e.ItemId,
                  )),
                ComposeController_1.ComposeController.SendSynthesisFormulaUnlockRequest(
                  i.Id,
                ))
              : EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OpenCompose,
                  e.ItemId,
                );
            break;
          case 2:
            var i = this.fGt;
            37 === i.SubType
              ? ((e =
                  ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByFormulaItemId(
                    i.ItemId,
                  )),
                ComposeController_1.ComposeController.SendSynthesisFormulaUnlockRequest(
                  e.Id,
                ))
              : EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OpenCompose,
                  i.ItemId,
                );
            break;
          case 3:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OpenCompose,
              this.fGt.ItemId,
            );
        }
      }),
      (this.iNt = () => {
        this.XTi && this.XTi();
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [6, UE.UIItem],
      [8, UE.UIItem],
      [12, UE.UIText],
      [14, UE.UIText],
      [15, UE.UIText],
      [16, UE.UIText],
      [17, UE.UIItem],
      [18, UE.UIHorizontalLayout],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIVerticalLayout],
      [22, UE.UIText],
      [23, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[23, this.iNt]]);
  }
  OnStart() {
    (this.iOt = new ConfirmButtonCompose(this.GetItem(8))),
      this.iOt.BindClickFunction(this.sOt),
      (this.oOt = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetHorizontalLayout(18),
        this.nOt,
      ));
  }
  OnBeforeDestroy() {
    this.oOt && (this.oOt.ClearChildren(), (this.oOt = void 0)),
      (this.XTi = void 0);
  }
  RefreshTips(e) {
    switch ((this.fGt = e).MainType) {
      case 1:
        this.$Ti();
        break;
      case 2:
        this.RefreshStructureData();
        break;
      case 3:
        this.RefreshPurificationData();
    }
  }
  $Ti() {
    var e = this.fGt;
    switch (e.SubType) {
      case 35:
        this.YTi(), this.JTi(e);
        break;
      case 0:
        this.zTi(), this.LTi(e);
    }
  }
  JTi(e) {
    var i =
        ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByFormulaItemId(
          e.ItemId,
        ),
      t =
        (this.dOt(1),
        ConfigManager_1.ConfigManager.TextConfig.GetTextById("Formula")),
      t =
        (this.COt(t),
        ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(i.Name)),
      t =
        (this.gOt(t),
        ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.ItemId)),
      e =
        (this.fOt(t.Icon),
        ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
          i.ComposeContent,
        )),
      t =
        (this.pOt(e),
        ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
          i.ComposeBackground,
        )),
      e =
        (this.vOt(t),
        this.MOt(!0),
        ConfigManager_1.ConfigManager.TextConfig.GetTextById("Study"));
    this.M3e(e, !0);
  }
  LTi(e) {
    var i = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
        e.ItemId,
      ),
      t = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
        i.ItemId,
      ),
      t =
        (this.dOt(t),
        ConfigManager_1.ConfigManager.TextConfig.GetTextById("Medicament")),
      t =
        (this.COt(t),
        ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(i.Name)),
      t =
        (this.gOt(t),
        ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.ItemId)),
      s =
        (this.fOt(t.Icon),
        ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
          t.AttributesDescription,
        )),
      s =
        (this.pOt(s),
        ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
          t.BgDescription,
        )),
      t = (this.vOt(s), i.Proficiency),
      s = i.MaxProficiencyCount,
      i =
        (this.EOt(e.ComposeCount, t, s),
        ConfigManager_1.ConfigManager.TextConfig.GetTextById("Making")),
      t = ComposeController_1.ComposeController.CheckCanReagentProduction(
        e.ItemId,
      );
    this.M3e(i, t), this.MOt(t), this.SOt(e.ItemId);
  }
  YTi() {
    this.GetText(3).SetUIActive(!0),
      this.GetText(12).SetUIActive(!0),
      this.GetItem(17).SetUIActive(!1),
      this.GetItem(19).SetUIActive(!0),
      this.GetItem(20).SetUIActive(!1),
      this.GetText(2).SetUIActive(!1),
      this.GetText(16).SetUIActive(!1);
  }
  zTi() {
    this.GetText(3).SetUIActive(!0),
      this.GetText(12).SetUIActive(!0),
      this.GetItem(17).SetUIActive(!0),
      this.GetItem(19).SetUIActive(!0),
      this.GetItem(20).SetUIActive(!1),
      this.GetText(2).SetUIActive(!0),
      this.GetText(16).SetUIActive(!0);
  }
  RefreshStructureData() {
    var e = this.fGt;
    switch (e.SubType) {
      case 37:
        this.ZTi(), this.RefreshStructureMenu(e);
        break;
      case 0:
        this.eLi(), this.RefreshStructure(e);
    }
  }
  RefreshStructure(e) {
    var i = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
        e.ItemId,
      ),
      t = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
        i.ItemId,
      ),
      t =
        (this.dOt(t),
        ConfigManager_1.ConfigManager.TextConfig.GetTextById("Prop")),
      t =
        (this.COt(t),
        ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(i.Name)),
      t =
        (this.gOt(t),
        ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.ItemId)),
      i =
        (this.fOt(t.Icon),
        ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
          t.AttributesDescription,
        )),
      i =
        (this.pOt(i),
        ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
          t.BgDescription,
        )),
      t =
        (this.vOt(i),
        ConfigManager_1.ConfigManager.TextConfig.GetTextById("Making")),
      i = ComposeController_1.ComposeController.CheckCanStructure(e.ItemId);
    this.M3e(t, i), this.MOt(i), this.SOt(e.ItemId);
  }
  RefreshStructureMenu(e) {
    var i =
        ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByFormulaItemId(
          e.ItemId,
        ),
      t =
        (this.dOt(1),
        ConfigManager_1.ConfigManager.TextConfig.GetTextById("Formula")),
      t =
        (this.COt(t),
        ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(i.Name)),
      t =
        (this.gOt(t),
        ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.ItemId)),
      e =
        (this.fOt(t.Icon),
        ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
          i.ComposeContent,
        )),
      t =
        (this.pOt(e),
        ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
          i.ComposeBackground,
        )),
      e =
        (this.vOt(t),
        this.MOt(!0),
        ConfigManager_1.ConfigManager.TextConfig.GetTextById("Study"));
    this.M3e(e, !0);
  }
  eLi() {
    this.GetText(3).SetUIActive(!0),
      this.GetText(12).SetUIActive(!0),
      this.GetItem(17).SetUIActive(!0),
      this.GetItem(19).SetUIActive(!0),
      this.GetItem(20).SetUIActive(!1),
      this.GetText(2).SetUIActive(!1),
      this.GetText(16).SetUIActive(!1);
  }
  ZTi() {
    this.GetText(3).SetUIActive(!0),
      this.GetText(12).SetUIActive(!0),
      this.GetItem(17).SetUIActive(!1),
      this.GetItem(19).SetUIActive(!0),
      this.GetItem(20).SetUIActive(!1),
      this.GetText(2).SetUIActive(!1),
      this.GetText(16).SetUIActive(!1);
  }
  RefreshPurificationData() {
    var e = this.fGt;
    this.SetPurificationHide(), this.RefreshPurification(e);
  }
  RefreshPurification(e) {
    var i = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
        e.ItemId,
      ),
      t = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
        i.ItemId,
      ),
      t =
        (this.dOt(t),
        ConfigManager_1.ConfigManager.TextConfig.GetTextById("Material")),
      t =
        (this.COt(t),
        ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(i.Name)),
      t =
        (this.gOt(t),
        ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.ItemId)),
      s =
        (this.fOt(t.Icon),
        ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
          t.AttributesDescription,
        )),
      s =
        (this.pOt(s),
        ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
          t.BgDescription,
        ));
    this.vOt(s);
    let r = "",
      a = !1;
    1 === e.IsUnlock
      ? ((r = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Making")),
        (a = ComposeController_1.ComposeController.CheckCanPurification(
          e.ItemId,
        )),
        this.MOt(a))
      : ((t = ConfigManager_1.ConfigManager.ComposeConfig.GetConditionInfo(
          i.UnlockCondition,
        )),
        (r = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
          t.HintText,
        )),
        (a = !1),
        this.MOt(!0)),
      this.M3e(r, a),
      this.SOt(e.ItemId);
  }
  SetPurificationHide() {
    this.GetText(3).SetUIActive(!0),
      this.GetText(12).SetUIActive(!0),
      this.GetItem(17).SetUIActive(!0),
      this.GetItem(19).SetUIActive(!0),
      this.GetItem(20).SetUIActive(!1),
      this.GetText(2).SetUIActive(!1),
      this.GetText(16).SetUIActive(!1);
  }
  gOt(e) {
    this.GetText(0).SetText(e);
  }
  fOt(e) {
    this.SetTextureByPath(e, this.GetTexture(1));
  }
  pOt(e) {
    this.GetText(3).SetText(e);
  }
  vOt(e) {
    this.GetText(12).SetText(e);
  }
  COt(e) {
    this.GetText(15).SetText(e);
  }
  dOt(e) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(14), "Have", e);
  }
  EOt(e, i, t) {
    (t *= i), (e *= i);
    e != t
      ? LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(2),
          "AddProficiency",
          "+" + i,
        )
      : LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "Proficiency"),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(16),
        "CumulativeProficiency",
        e,
        t,
      );
  }
  M3e(e, i) {
    this.iOt.UpdateText(e), this.iOt.RefreshButton(i);
  }
  MOt(e) {
    this.GetButton(23).GetOwner().GetUIItem().SetUIActive(!e);
  }
  SOt(e) {
    this.oOt.RebuildLayoutByDataNew(
      ModelManager_1.ModelManager.ComposeModel.GetComposeMaterialList(e),
    );
  }
  BindOnDisable(e) {
    this.XTi = e;
  }
}
exports.ComposeTipsView = ComposeTipsView;
class ConfirmButtonCompose extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.GGt = void 0),
      (this.eTt = () => {
        this.GGt();
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.eTt]]);
  }
  UpdateText(e) {
    this.GetText(1).SetText(e);
  }
  RefreshButton(e) {
    this.GetButton(0)
      .GetOwner()
      .GetComponentByClass(UE.UIInteractionGroup.StaticClass())
      .SetInteractable(e);
  }
  BindClickFunction(e) {
    this.GGt = e;
  }
}
exports.ConfirmButtonCompose = ConfirmButtonCompose;
//# sourceMappingURL=ComposeTipsView.js.map

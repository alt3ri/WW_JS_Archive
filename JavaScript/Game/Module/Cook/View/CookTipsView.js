"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookTipsView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  CookController_1 = require("../CookController"),
  CookItemView_1 = require("./CookItemView");
class CookTipsView extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.fGt = void 0),
      (this.iOt = void 0),
      (this.oOt = void 0),
      (this.rOt = void 0),
      (this.nOt = (e, i, t) => {
        i = new CookItemView_1.MaterialItem(i);
        return (
          i.Update(e, t),
          i.BindOnClickedCallback(this.jYe),
          { Key: t, Value: i }
        );
      }),
      (this.jYe = (e) => {
        e.G6n &&
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
            e.f8n,
          );
      }),
      (this.pGt = (e, i, t) => {
        i = new CookItemView_1.MachiningClueItem(i);
        return i.Update(e.IsUnlock, e.ContentText), { Key: t, Value: i };
      }),
      (this.sOt = () => {
        if (0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType) {
          var e = this.fGt;
          switch (e.SubType) {
            case 6e4:
              var i =
                ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaByFormulaItemId(
                  e.ItemId,
                );
              CookController_1.CookController.SendCookFormulaRequest(i.Id);
              break;
            case 0:
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OpenCook,
                e.ItemId,
              );
          }
        } else {
          var t = this.fGt;
          t.IsUnLock
            ? EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OpenCook,
                t.ItemId,
              )
            : EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OpenProcessedStudy,
                t.ItemId,
              );
        }
      }),
      (this.aOt = () => {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "MaterialShort",
        );
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
      (this.BtnBindInfo = [[23, this.aOt]]);
  }
  OnBeforeDestroy() {
    this.oOt.ClearChildren(),
      (this.oOt = void 0),
      this.rOt.ClearChildren(),
      (this.rOt = void 0);
  }
  OnStart() {
    (this.iOt = new CookItemView_1.ConfirmButtonCompose(this.GetItem(8))),
      this.iOt.BindClickFunction(this.sOt),
      (this.oOt = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetHorizontalLayout(18),
        this.nOt,
      )),
      (this.rOt = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetVerticalLayout(21),
        this.pGt,
      ));
  }
  RefreshTips(e) {
    switch ((this.fGt = e).MainType) {
      case 0:
        this.hOt();
        break;
      case 1:
        this.lOt();
    }
  }
  hOt() {
    var e = this.fGt;
    switch (e.SubType) {
      case 6e4:
        this._Ot(), this.uOt(e);
        break;
      case 0:
        this.cOt(), this.mOt(e);
    }
  }
  uOt(e) {
    var i =
        ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaByFormulaItemId(
          e.ItemId,
        ),
      t =
        (this.dOt(1),
        ConfigManager_1.ConfigManager.TextConfig.GetTextById("Recipe")),
      t =
        (this.COt(t),
        ConfigManager_1.ConfigManager.CookConfig.GetLocalText(i.Name)),
      t =
        (this.gOt(t),
        ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.ItemId)),
      e =
        (this.fOt(t.Icon),
        ConfigManager_1.ConfigManager.CookConfig.GetLocalText(i.FoodContent)),
      t =
        (this.pOt(e),
        ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
          i.FoodBackground,
        )),
      e =
        (this.vOt(t),
        this.MOt(!0),
        ConfigManager_1.ConfigManager.TextConfig.GetTextById("Study"));
    this.M3e(e, !0);
  }
  mOt(e) {
    var i = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
        e.ItemId,
      ),
      t = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
        i.FoodItemId,
      ),
      t =
        (this.dOt(t),
        ConfigManager_1.ConfigManager.TextConfig.GetTextById("Dishes")),
      t =
        (this.COt(t),
        ConfigManager_1.ConfigManager.CookConfig.GetLocalText(i.Name)),
      t =
        (this.gOt(t),
        ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.FoodItemId)),
      s =
        (this.fOt(t.Icon),
        ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
          t.AttributesDescription,
        )),
      s =
        (this.pOt(s),
        ConfigManager_1.ConfigManager.CookConfig.GetLocalText(t.BgDescription)),
      t = (this.vOt(s), i.Proficiency),
      s = i.MaxProficiencyCount,
      i =
        (this.EOt(e.CookCount, t, s),
        ConfigManager_1.ConfigManager.TextConfig.GetTextById("Cooking")),
      t = CookController_1.CookController.CheckCanCook(e.ItemId);
    this.M3e(i, t), this.MOt(t), this.SOt(e.ItemId, 0);
  }
  _Ot() {
    this.GetText(3).SetUIActive(!0),
      this.GetText(12).SetUIActive(!0),
      this.GetItem(17).SetUIActive(!1),
      this.GetItem(19).SetUIActive(!0),
      this.GetItem(20).SetUIActive(!1),
      this.GetText(2).SetUIActive(!1),
      this.GetText(16).SetUIActive(!1);
  }
  cOt() {
    this.GetText(3).SetUIActive(!0),
      this.GetText(12).SetUIActive(!0),
      this.GetItem(17).SetUIActive(!0),
      this.GetItem(19).SetUIActive(!0),
      this.GetItem(20).SetUIActive(!1),
      this.GetText(2).SetUIActive(!0),
      this.GetText(16).SetUIActive(!0);
  }
  lOt() {
    this.yOt();
    var e = this.fGt,
      i = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
        e.ItemId,
      ),
      t = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
        i.FinalItemId,
      ),
      t =
        (this.dOt(t),
        ConfigManager_1.ConfigManager.TextConfig.GetTextById("Accessory")),
      t =
        (this.COt(t),
        ConfigManager_1.ConfigManager.CookConfig.GetLocalText(i.Name)),
      t =
        (this.gOt(t),
        ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.FinalItemId)),
      i =
        (this.fOt(t.Icon),
        this.IOt(),
        ConfigManager_1.ConfigManager.CookConfig.GetLocalText(t.BgDescription));
    this.TOt(i);
    let s = void 0,
      r = !0;
    e.IsUnLock
      ? ((s = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Cooking")),
        (r = CookController_1.CookController.CheckCanProcessed(e.ItemId)))
      : (s = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Research")),
      this.M3e(s, r),
      this.MOt(r),
      this.SOt(e.ItemId, 1);
  }
  yOt() {
    this.GetText(3).SetUIActive(!1),
      this.GetText(12).SetUIActive(!1),
      this.GetItem(19).SetUIActive(!1),
      this.GetItem(20).SetUIActive(!0),
      this.GetItem(17).SetUIActive(!0),
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
  TOt(e) {
    this.GetText(22).SetText(e);
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
  SOt(e, i) {
    e = ModelManager_1.ModelManager.CookModel.GetCookMaterialList(e, i);
    this.oOt.RebuildLayoutByDataNew(e);
  }
  IOt() {
    var e = this.fGt,
      i = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
        e.ItemId,
      ),
      t = new Array();
    for (const n of i.InterationId) {
      var s,
        r = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessMsgById(n);
      e.InteractiveList.includes(n)
        ? ((s = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
            r.Introduce,
          )),
          t.push({ IsUnlock: !0, ContentText: s }))
        : ((s = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
            r.Description,
          )),
          t.push({ IsUnlock: !1, ContentText: s }));
    }
    this.rOt.RebuildLayoutByDataNew(t);
  }
}
exports.CookTipsView = CookTipsView;
//# sourceMappingURL=CookTipsView.js.map

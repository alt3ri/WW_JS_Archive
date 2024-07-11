"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookTipsView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Util/LguiUtil");
const CookController_1 = require("../CookController");
const CookItemView_1 = require("./CookItemView");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class CookTipsView extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.dqt = void 0),
      (this.tNt = void 0),
      (this.iNt = void 0),
      (this.oNt = void 0),
      (this.rNt = (e, i, t) => {
        i = new CookItemView_1.MaterialItem(i);
        return (
          i.Update(e, t),
          i.BindOnClickedCallback(this.x$e),
          { Key: t, Value: i }
        );
      }),
      (this.x$e = (e) => {
        e.m3n &&
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
            e.G3n,
          );
      }),
      (this.Cqt = (e, i, t) => {
        i = new CookItemView_1.MachiningClueItem(i);
        return i.Update(e.IsUnlock, e.ContentText), { Key: t, Value: i };
      }),
      (this.nNt = () => {
        if (ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0) {
          const e = this.dqt;
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
          const t = this.dqt;
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
      (this.sNt = () => {
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
      (this.BtnBindInfo = [[23, this.sNt]]);
  }
  OnBeforeDestroy() {
    this.iNt.ClearChildren(),
      (this.iNt = void 0),
      this.oNt.ClearChildren(),
      (this.oNt = void 0);
  }
  OnStart() {
    (this.tNt = new CookItemView_1.ConfirmButtonCompose(this.GetItem(8))),
      this.tNt.BindClickFunction(this.nNt),
      (this.iNt = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetHorizontalLayout(18),
        this.rNt,
      )),
      (this.oNt = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetVerticalLayout(21),
        this.Cqt,
      ));
  }
  RefreshTips(e) {
    switch ((this.dqt = e).MainType) {
      case 0:
        this.aNt();
        break;
      case 1:
        this.hNt();
    }
  }
  aNt() {
    const e = this.dqt;
    switch (e.SubType) {
      case 6e4:
        this.lNt(), this._Nt(e);
        break;
      case 0:
        this.uNt(), this.cNt(e);
    }
  }
  _Nt(e) {
    const i =
      ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaByFormulaItemId(
        e.ItemId,
      );
    var t =
      (this.mNt(1),
      ConfigManager_1.ConfigManager.TextConfig.GetTextById("Recipe"));
    var t =
      (this.dNt(t),
      ConfigManager_1.ConfigManager.CookConfig.GetLocalText(i.Name));
    var t =
      (this.CNt(t),
      ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.ItemId));
    var e =
      (this.gNt(t.Icon),
      ConfigManager_1.ConfigManager.CookConfig.GetLocalText(i.FoodContent));
    var t =
      (this.fNt(e),
      ConfigManager_1.ConfigManager.CookConfig.GetLocalText(i.FoodBackground));
    var e =
      (this.pNt(t),
      this.vNt(!0),
      ConfigManager_1.ConfigManager.TextConfig.GetTextById("Study"));
    this.rFe(e, !0);
  }
  cNt(e) {
    var i = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
      e.ItemId,
    );
    var t = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
      i.FoodItemId,
    );
    var t =
      (this.mNt(t),
      ConfigManager_1.ConfigManager.TextConfig.GetTextById("Dishes"));
    var t =
      (this.dNt(t),
      ConfigManager_1.ConfigManager.CookConfig.GetLocalText(i.Name));
    var t =
      (this.CNt(t),
      ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.FoodItemId));
    var s =
      (this.gNt(t.Icon),
      ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
        t.AttributesDescription,
      ));
    var s =
      (this.fNt(s),
      ConfigManager_1.ConfigManager.CookConfig.GetLocalText(t.BgDescription));
    var t = (this.pNt(s), i.Proficiency);
    var s = i.MaxProficiencyCount;
    var i =
      (this.MNt(e.CookCount, t, s),
      ConfigManager_1.ConfigManager.TextConfig.GetTextById("Cooking"));
    var t = CookController_1.CookController.CheckCanCook(e.ItemId);
    this.rFe(i, t), this.vNt(t), this.SNt(e.ItemId, 0);
  }
  lNt() {
    this.GetText(3).SetUIActive(!0),
      this.GetText(12).SetUIActive(!0),
      this.GetItem(17).SetUIActive(!1),
      this.GetItem(19).SetUIActive(!0),
      this.GetItem(20).SetUIActive(!1),
      this.GetText(2).SetUIActive(!1),
      this.GetText(16).SetUIActive(!1);
  }
  uNt() {
    this.GetText(3).SetUIActive(!0),
      this.GetText(12).SetUIActive(!0),
      this.GetItem(17).SetUIActive(!0),
      this.GetItem(19).SetUIActive(!0),
      this.GetItem(20).SetUIActive(!1),
      this.GetText(2).SetUIActive(!0),
      this.GetText(16).SetUIActive(!0);
  }
  hNt() {
    this.ENt();
    const e = this.dqt;
    var i = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
      e.ItemId,
    );
    var t = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
      i.FinalItemId,
    );
    var t =
      (this.mNt(t),
      ConfigManager_1.ConfigManager.TextConfig.GetTextById("Accessory"));
    var t =
      (this.dNt(t),
      ConfigManager_1.ConfigManager.CookConfig.GetLocalText(i.Name));
    var t =
      (this.CNt(t),
      ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.FinalItemId));
    var i =
      (this.gNt(t.Icon),
      this.yNt(),
      ConfigManager_1.ConfigManager.CookConfig.GetLocalText(t.BgDescription));
    this.INt(i);
    let s = void 0;
    let r = !0;
    e.IsUnLock
      ? ((s = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Cooking")),
        (r = CookController_1.CookController.CheckCanProcessed(e.ItemId)))
      : (s = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Research")),
      this.rFe(s, r),
      this.vNt(r),
      this.SNt(e.ItemId, 1);
  }
  ENt() {
    this.GetText(3).SetUIActive(!1),
      this.GetText(12).SetUIActive(!1),
      this.GetItem(19).SetUIActive(!1),
      this.GetItem(20).SetUIActive(!0),
      this.GetItem(17).SetUIActive(!0),
      this.GetText(2).SetUIActive(!1),
      this.GetText(16).SetUIActive(!1);
  }
  CNt(e) {
    this.GetText(0).SetText(e);
  }
  gNt(e) {
    this.SetTextureByPath(e, this.GetTexture(1));
  }
  fNt(e) {
    this.GetText(3).SetText(e);
  }
  pNt(e) {
    this.GetText(12).SetText(e);
  }
  INt(e) {
    this.GetText(22).SetText(e);
  }
  dNt(e) {
    this.GetText(15).SetText(e);
  }
  mNt(e) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(14), "Have", e);
  }
  MNt(e, i, t) {
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
  rFe(e, i) {
    this.tNt.UpdateText(e), this.tNt.RefreshButton(i);
  }
  vNt(e) {
    this.GetButton(23).GetOwner().GetUIItem().SetUIActive(!e);
  }
  SNt(e, i) {
    e = ModelManager_1.ModelManager.CookModel.GetCookMaterialList(e, i);
    this.iNt.RebuildLayoutByDataNew(e);
  }
  yNt() {
    const e = this.dqt;
    const i = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
      e.ItemId,
    );
    const t = new Array();
    for (const n of i.InterationId) {
      var s;
      const r =
        ConfigManager_1.ConfigManager.CookConfig.GetCookProcessMsgById(n);
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
    this.oNt.RebuildLayoutByDataNew(t);
  }
}
exports.CookTipsView = CookTipsView;
// # sourceMappingURL=CookTipsView.js.map

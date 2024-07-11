"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookingIngredientsView = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const CookController_1 = require("../CookController");
const CookingIngredientsVerticalView_1 = require("../CookingIngredientsVerticalView");
class CookingIngredientsView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.dqt = void 0),
      (this.JNt = void 0),
      (this.nNt = () => {
        this.GetButton(3).IsSelfInteractive
          ? ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0
            ? (ModelManager_1.ModelManager.CookModel.CleanAddExp(),
              CookController_1.CookController.SendCookFoodRequest(
                this.dqt.ItemId,
                ModelManager_1.ModelManager.CookModel.CurrentCookRoleId,
                this.JNt.CurrentSetCount,
              ))
            : CookController_1.CookController.SendFoodProcessRequest(
                this.dqt.ItemId,
                ModelManager_1.ModelManager.CookModel.GetTmpMachiningItemList(),
                this.JNt.CurrentSetCount,
              )
          : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "MaterialShort",
            );
      }),
      (this.zNt = () => {
        this.ZNt();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIText],
    ]),
      (this.BtnBindInfo = [[3, this.nNt]]);
  }
  async OnBeforeStartAsync() {
    (this.JNt =
      new CookingIngredientsVerticalView_1.CookingIngredientsVerticalView()),
      await this.JNt.CreateByActorAsync(this.GetItem(4).GetOwner()),
      this.JNt.SetActive(!0);
  }
  OnStart() {
    (this.JNt.OnChangeMaterialSelectionDelegate = this.zNt),
      this.GetButton(3).SetCanClickWhenDisable(!0);
  }
  RefreshTips(e) {
    if (((this.dqt = e), this.dqt))
      switch ((this.eOt(), e.MainType)) {
        case 0:
          this.aNt();
          break;
        case 1:
          this.hNt();
      }
  }
  OnSecondTimerRefresh() {
    this.dqt && this.JNt?.OnSecondTimerRefresh();
  }
  RefreshTipsWithSavedData() {
    this.RefreshTips(this.dqt);
  }
  eOt() {
    this.C4e();
  }
  C4e() {
    let e;
    this.dqt.MainType === 0
      ? ((e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
          this.dqt.ItemId,
        )),
        (e =
          ConfigManager_1.ConfigManager.ItemConfig.GetItemName(e.FoodItemId) ??
          ""),
        this.GetText(0).SetText(e))
      : ((e = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
          this.dqt.ItemId,
        )),
        (e =
          ConfigManager_1.ConfigManager.ItemConfig.GetItemName(e.FinalItemId) ??
          ""),
        this.GetText(0).SetText(e));
  }
  hNt() {
    var e = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
      this.dqt.ItemId,
    );
    var e = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
      e.FinalItemId,
    );
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "Have", e),
      this.JNt.RefreshMachining(this.dqt),
      this.ZNt(),
      this.dqt.IsUnLock
        ? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "CookButtonText")
        : LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "Research");
  }
  aNt() {
    var e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
      this.dqt.ItemId,
    );
    var e = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
      e.FoodItemId,
    );
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "Have", e),
      this.JNt.RefreshCooking(this.dqt),
      this.ZNt(),
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "CookButtonText");
  }
  ZNt() {
    const e = this.dqt.IsUnLock;
    let i = !1;
    let t = !0;
    let r = !0;
    if (ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0) {
      const a = ModelManager_1.ModelManager.CookModel;
      (i = a.CheckMaterialEnough(this.dqt.ItemId)),
        (t = a.CheckCoinEnough(this.dqt.ItemId)),
        (r = a.CheckLimitCount(this.dqt.ItemId));
    } else {
      let e = !0;
      for (const s of ModelManager_1.ModelManager.CookModel.GetTmpMachiningItemList())
        s.m3n || (e = !1);
      i =
        ModelManager_1.ModelManager.CookModel.CheckCanProcessedNew(
          this.dqt.ItemId,
        ) && e;
    }
    this.GetText(7).SetText(this.tOt(e, i, t, r)),
      this.GetItem(6).SetUIActive(!(i && r && e)),
      this.GetButton(3).RootUIComp.SetUIActive(i && r && e);
  }
  tOt(e, i, t, r) {
    return e
      ? i
        ? r
          ? ""
          : void 0 ===
              (e = ModelManager_1.ModelManager.CookModel.GetRefreshLimitTime())
            ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                "LackMakeCountWithoutTime",
              )
            : StringUtils_1.StringUtils.Format(
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  "LackMakeCount",
                ),
                e,
              )
        : ((i =
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "LackMakeMaterial",
            )),
          t
            ? StringUtils_1.StringUtils.Format(
                i,
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  "Material_Text",
                ),
              )
            : StringUtils_1.StringUtils.Format(
                i,
                ConfigManager_1.ConfigManager.ItemConfig.GetItemName(
                  CookController_1.CookController.CookCoinId,
                ),
              ))
      : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "GenericPrompt_Unlocked_TipsText",
        );
  }
}
exports.CookingIngredientsView = CookingIngredientsView;
// # sourceMappingURL=CookingIngredientsView.js.map

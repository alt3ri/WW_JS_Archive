"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposeIngredientsView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CommonManager_1 = require("../../Common/CommonManager"),
  ComposeController_1 = require("../ComposeController"),
  ComposeIngerdientsVerticalView_1 = require("./ComposeIngerdientsVerticalView");
class ComposeIngredientsView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.yTi = void 0),
      (this.zOt = void 0),
      (this.sOt = () => {
        this.GetButton(3).IsSelfInteractive
          ? CommonManager_1.CommonManager.SendManufacture(
              this.yTi.ItemId,
              this.zOt.GetManufactureCount(),
            )
          : ComposeController_1.ComposeController.PlayCompositeFailDisplay(
              () => {
                ComposeController_1.ComposeController.PlayCompositeLoopDisplay();
              },
            );
      }),
      (this.I7e = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OpenHelpRole,
          this.yTi.ItemId,
        );
      }),
      (this.ITi = () => {
        1 === this.yTi.MainType
          ? this.zOt.RefreshProficiencyAndHelpRole(this.yTi)
          : this.zOt.RefreshHelpRole();
      }),
      (this.TTi = () => {
        this.RefreshTips(this.yTi);
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
      (this.BtnBindInfo = [[3, this.sOt]]);
  }
  async OnBeforeStartAsync() {
    (this.zOt =
      new ComposeIngerdientsVerticalView_1.ComposeIngredientsVerticalView()),
      await this.zOt.CreateByActorAsync(this.GetItem(4).GetOwner()),
      this.zOt.SetActive(!0);
  }
  OnStart() {
    this.zOt.BindChangeClickCall(this.I7e),
      this.dde(),
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "ComposeButtonText"),
      this.GetButton(3).SetCanClickWhenDisable(!0);
  }
  OnBeforeDestroy() {
    this.Cde();
  }
  dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.CloseHelpRole,
      this.ITi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UpgradeComposeLevel,
        this.ITi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ComposeSuccess,
        this.TTi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ComposeFail,
        this.TTi,
      );
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CloseHelpRole,
      this.ITi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpgradeComposeLevel,
        this.ITi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ComposeSuccess,
        this.TTi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ComposeFail,
        this.TTi,
      );
  }
  OnSecondTimerRefresh() {
    this.yTi && this.zOt?.OnSecondTimerRefresh();
  }
  RefreshTips(e) {
    this.yTi = e;
    var e = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
        e.ItemId,
      ),
      t = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(e.ItemId),
      t =
        (this.GetText(0).SetText(t),
        ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
          e.ItemId,
        ));
    switch (
      (LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "Have", t),
      this.ekt(),
      this.yTi.MainType)
    ) {
      case 1:
        this.LTi();
        break;
      case 2:
        this.DTi();
        break;
      case 3:
        this.RTi();
    }
  }
  ekt() {
    var e = ModelManager_1.ModelManager.ComposeModel,
      t = e.CheckComposeMaterialEnough(this.yTi.ItemId),
      i = e.CheckUnlock(this.yTi),
      s = e.CheckCoinEnough(this.yTi.ItemId),
      e = e.CheckLimitCount(this.yTi);
    this.GetText(7).SetText(this.ikt(i, t, s, e)),
      this.GetItem(6).SetUIActive(!(i && t && e)),
      this.GetButton(3).RootUIComp.SetUIActive(i && t && e);
  }
  ikt(e, t, i, s) {
    return e
      ? t
        ? s
          ? ""
          : void 0 ===
              (e =
                ModelManager_1.ModelManager.ComposeModel.GetRefreshLimitTime())
            ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                "LackMakeCountWithoutTime",
              )
            : StringUtils_1.StringUtils.Format(
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  "LackMakeCount",
                ),
                e,
              )
        : ((t =
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "LackMakeMaterial",
            )),
          i
            ? StringUtils_1.StringUtils.Format(
                t,
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  "Material_Text",
                ),
              )
            : StringUtils_1.StringUtils.Format(
                t,
                ConfigManager_1.ConfigManager.ItemConfig.GetItemName(
                  ComposeController_1.ComposeController.ComposeCoinId,
                ),
              ))
      : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "GenericPrompt_Unlocked_TipsText",
        );
  }
  LTi() {
    this.zOt.RefreshReagentProduction(this.yTi);
  }
  DTi() {
    this.zOt.RefreshStructure(this.yTi);
  }
  RTi() {
    this.zOt.RefreshPurification(this.yTi);
  }
}
exports.ComposeIngredientsView = ComposeIngredientsView;
//# sourceMappingURL=ComposeIngredientsView.js.map

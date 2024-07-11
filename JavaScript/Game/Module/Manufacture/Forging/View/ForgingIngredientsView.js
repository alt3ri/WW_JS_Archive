"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ForgingIngredientsView = void 0);
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
  ForgingController_1 = require("../ForgingController"),
  ForgingIngredientsVerticalView_1 = require("./ForgingIngredientsVerticalView");
class ForgingIngredientsView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ELi = void 0),
      (this.zOt = void 0),
      (this.TTi = () => {
        this.RefreshTips(this.ELi);
      }),
      (this.SLi = () => {
        this.zOt.RefreshHelpRole();
      }),
      (this.sOt = () => {
        this.GetButton(3).IsSelfInteractive
          ? this.ELi.IsUnlock
            ? CommonManager_1.CommonManager.SendManufacture(
                this.ELi.ItemId,
                this.zOt.GetManufactureCount(),
              )
            : ForgingController_1.ForgingController.SendForgeFormulaUnlockRequest(
                this.ELi.ItemId,
              )
          : ForgingController_1.ForgingController.PlayForgingFailDisplay(() => {
              ForgingController_1.ForgingController.PlayForgingLoopDisplay();
            });
      }),
      (this.I7e = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OpenHelpRole,
          this.ELi.ItemId,
        );
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
  dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.CloseHelpRole,
      this.SLi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ForgingSuccess,
        this.TTi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ForgingFail,
        this.TTi,
      );
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CloseHelpRole,
      this.SLi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ForgingSuccess,
        this.TTi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ForgingFail,
        this.TTi,
      );
  }
  async OnBeforeStartAsync() {
    (this.zOt =
      new ForgingIngredientsVerticalView_1.ForgingIngredientsVerticalView()),
      await this.zOt.CreateByActorAsync(this.GetItem(4).GetOwner()),
      this.zOt.SetActive(!0);
  }
  OnStart() {
    this.dde(),
      this.zOt.BindChangeClickCall(this.I7e),
      this.GetButton(3).SetCanClickWhenDisable(!0);
  }
  OnBeforeDestroy() {
    this.Cde(), this.zOt.Destroy();
  }
  OnSecondTimerRefresh() {
    this.ELi && this.zOt?.OnSecondTimerRefresh();
  }
  RefreshTips(e) {
    this.ELi = e;
    var e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
        e.ItemId,
      ),
      t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
        e.ItemId,
      ),
      t =
        (this.GetText(0).ShowTextNew(t?.WeaponName ?? ""),
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          e.ItemId,
        ));
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "Have", t),
      this.zOt.RefreshForging(this.ELi),
      this.ekt();
  }
  ekt() {
    let e = !0;
    var t = ModelManager_1.ModelManager.ForgingModel,
      i = t.CheckUnlock(this.ELi),
      n = t.CheckCoinEnough(this.ELi.ItemId),
      r = t.CheckLimitCount(this.ELi);
    let s = "";
    i
      ? ((s =
          ConfigManager_1.ConfigManager.TextConfig.GetTextById("WeaponMaking")),
        (e = t.CheckMaterialEnough(this.ELi.ItemId)),
        this.GetItem(2).SetUIActive(!0))
      : ((s =
          ConfigManager_1.ConfigManager.TextConfig.GetTextById("UnlockWeapon")),
        this.GetItem(2).SetUIActive(!1)),
      this.GetText(5).SetText(s),
      this.GetText(7).SetText(this.ikt(i, e, n, r)),
      this.GetItem(6).SetUIActive(!(i && e && r)),
      this.GetButton(3).RootUIComp.SetUIActive(i && e && r);
  }
  ikt(e, t, i, n) {
    return e
      ? t
        ? n
          ? ""
          : void 0 ===
              (e =
                ModelManager_1.ModelManager.ForgingModel.GetRefreshLimitTime())
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
                  ForgingController_1.ForgingController.ForgingCostId,
                ),
              ))
      : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "GenericPrompt_Unlocked_TipsText",
        );
  }
}
exports.ForgingIngredientsView = ForgingIngredientsView;
//# sourceMappingURL=ForgingIngredientsView.js.map

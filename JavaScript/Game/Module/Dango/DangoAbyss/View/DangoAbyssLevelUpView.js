"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssLevelUpView = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  DangoAbyssActivityController_1 = require("../../../Activity/ActivityContent/DangoAbyss/DangoAbyssActivityController"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  CommonCurrencyItemListComponent_1 = require("../../../Common/CommonCurrencyItemListComponent"),
  CommonLevelUpAttributeItem_1 = require("../../../Common/CommonLevelUpAttributeItem"),
  CostItem_1 = require("../../../Common/CostItem"),
  RoleLevelUpSuccessController_1 = require("../../../RoleUi/RoleLevel/RoleLevelUpSuccessController"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  DangoAbyssDefine_1 = require("../DangoAbyssDefine");
class DangoAbyssLevelUpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.gfc = 0),
      (this.YVc = void 0),
      (this.U1a = void 0),
      (this.$a_ = void 0),
      (this.eGe = void 0),
      (this.mgc = () => {
        this.Og();
      }),
      (this.fgc = (e, t) => {
        this.gfc === e &&
          (((e = this.dgc().GetLevelUpViewData(t)).ClickFunction = this.rC1),
          RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(
            e,
          ));
      }),
      (this.sGe = () =>
        new CommonLevelUpAttributeItem_1.CommonLevelUpAttributeItem()),
      (this.tWt = () => {
        var e = this.dgc();
        e.GetIfCanLevelUp() &&
          (e.GetIfLevelUpEnough()
            ? DangoAbyssActivityController_1.DangoAbyssActivityController.RequestAbyssDangoLevelUp(
                e.GetId(),
                e.GetLevel() + 1,
              )
            : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "GenericPrompt_LevelUpMaterialShort_TipsText",
              ));
      }),
      (this.I5t = () => {
        this.CloseMe();
      }),
      (this.rC1 = () => {
        this.dgc().GetIfMaxLevel() && this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIVerticalLayout],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.I5t]]);
  }
  GetLoopAudioEventSwitch() {
    return !ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance();
  }
  async OnBeforeStartAsync() {
    var e = [];
    (this.U1a = new CostItem_1.CostItem()),
      e.push(this.U1a.CreateThenShowByActorAsync(this.GetItem(9).GetOwner())),
      (this.$a_ = new ButtonItem_1.ButtonItem()),
      e.push(this.$a_.CreateThenShowByActorAsync(this.GetItem(11).GetOwner())),
      this.$a_.SetFunction(this.tWt),
      this.GetItem(2).SetUIActive(!1),
      (this.YVc =
        new CommonCurrencyItemListComponent_1.CommonCurrencyItemListComponent(
          this.GetItem(1),
        )),
      e.push(
        this.YVc.SetCurrencyItemList([
          DangoAbyssDefine_1.CURRENCY_ITEM_EXP_ID,
          DangoAbyssDefine_1.CURRENCY_ITEM_TOKEN_ID,
          DangoAbyssDefine_1.CURRENCY_ITEM_KEY_ID,
        ]),
      ),
      await Promise.all(e),
      (this.eGe = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(7),
        this.sGe,
      ));
  }
  OnStart() {
    this.gfc = this.OpenParam;
  }
  dgc() {
    return ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(
      this.gfc,
    );
  }
  OnBeforeShow() {
    this.Og();
  }
  Og() {
    var e = this.dgc();
    this.sqi(e),
      this.kS1(e),
      this.pgc(e),
      this.Wbe(e),
      this.vgc(e),
      this.fvt(e);
  }
  sqi(e) {
    var t;
    e &&
      ((t = e.GetIfCanLevelUp()), this.U1a.SetActive(t), t) &&
      this.U1a.RefreshCost(e.GetCurrentLevelUpConsume());
  }
  kS1(e) {
    var t;
    e
      ? ((t = e.GetIfLock()),
        (e = e.GetIfMaxLevel()),
        this.GetItem(10).SetActive(!t && e))
      : this.GetItem(10).SetActive(!1);
  }
  vgc(e) {
    var t;
    e
      ? ((t = e.GetIfCanLevelUp()),
        this.$a_?.SetActive(t),
        (t =
          ModelManager_1.ModelManager.DangoAbyssModel.GetDangoLevelUpRedDotById(
            e.GetId(),
            !1,
          )),
        this.$a_?.SetRedDotVisible(t))
      : this.$a_?.SetActive(!1);
  }
  pgc(e) {
    this.GetText(4).SetText(
      StringUtils_1.StringUtils.Format("Lv.{0}", e.GetLevel().toString()),
    ),
      e.GetIfMaxLevel()
        ? (this.GetItem(5).SetUIActive(!1),
          this.GetText(6).SetText(StringUtils_1.EMPTY_STRING))
        : (this.GetItem(5).SetUIActive(!0),
          this.GetText(6).SetText(
            StringUtils_1.StringUtils.Format(
              "Lv.{0}",
              (e.GetLevel() + 1).toString(),
            ),
          ));
  }
  fvt(e) {
    let t = e.GetLevel() + 1;
    e.GetIfMaxLevel() && (t = e.GetLevel());
    e = e.GetLevelUpViewAttributeInfo(t, e.GetIfMaxLevel());
    this.eGe.RefreshByData(e);
  }
  Wbe(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.GetName());
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnAbyssRoleInfoUpdate,
      this.mgc,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAbyssDangoLevelUp,
        this.fgc,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnAbyssRoleInfoUpdate,
      this.mgc,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAbyssDangoLevelUp,
        this.fgc,
      );
  }
}
exports.DangoAbyssLevelUpView = DangoAbyssLevelUpView;
//# sourceMappingURL=DangoAbyssLevelUpView.js.map

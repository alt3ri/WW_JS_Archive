"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CommonCountPanel_1 = require("../../Common/CommonCountPanel"),
  UiNavigationView_1 = require("../../UiNavigation/UiNavigationView"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  CookController_1 = require("../CookController"),
  CookModel_1 = require("../CookModel"),
  CookItemView_1 = require("./CookItemView");
class CookView extends UiNavigationView_1.UiNavigationView {
  constructor() {
    super(...arguments),
      (this.oOt = void 0),
      (this.LOt = void 0),
      (this.DOt = void 0),
      (this.ROt = void 0),
      (this.UOt = !0),
      (this.ETt = 0),
      (this.dFe = 0),
      (this.t6 = 1),
      (this.AOt = void 0),
      (this.POt = void 0),
      (this.nOt = (t, e, i) => {
        e = new CookItemView_1.MaterialItem(e);
        return (
          e.Update(t, i),
          e.BindOnClickedCallback(this.xOt),
          { Key: i, Value: e }
        );
      }),
      (this.wOt = () =>
        CookController_1.CookController.GetMaxCreateCount(
          this.ETt,
          ModelManager_1.ModelManager.CookModel.CurrentCookListType,
        )),
      (this.LGt = (t) => {
        (this.t6 = t), this.DGt();
      }),
      (this.bl = () => {
        this.GetActive() &&
          (0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType
            ? ((this.dFe = ModelManager_1.ModelManager.CookModel.GetCookRoleId(
                this.ETt,
              )),
              (ModelManager_1.ModelManager.CookModel.CurrentCookRoleId =
                this.dFe),
              (this.AOt =
                ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
                  this.ETt,
                )))
            : (this.POt =
                ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
                  this.ETt,
                )),
          (this.t6 = 1),
          this.T2e(),
          this.BOt(),
          this.bOt(),
          this.qOt(),
          this.M3e(),
          this.GOt());
      }),
      (this.NOt = () => {
        (this.dFe = ModelManager_1.ModelManager.CookModel.CurrentCookRoleId),
          this.bOt();
      }),
      (this.OOt = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OpenCookRole,
          this.ETt,
        );
      }),
      (this.Mke = () => {
        0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType
          ? (ModelManager_1.ModelManager.CookModel.CleanAddExp(),
            CookController_1.CookController.SendCookFoodRequest(
              this.ETt,
              this.dFe,
              this.t6,
            ))
          : CookController_1.CookController.SendFoodProcessRequest(
              this.ETt,
              ModelManager_1.ModelManager.CookModel.GetTmpMachiningItemList(),
              this.t6,
            );
      }),
      (this.aOt = () => {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "MaterialShort",
        );
      }),
      (this.xOt = (t) => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          t.f8n,
        );
      }),
      (this.kOt = () => {
        this.bl();
      }),
      (this.FOt = () => {
        var t;
        this.GetActive() &&
          (((t = new CookModel_1.CookRewardPopData()).CookRewardPopType = 2),
          UiManager_1.UiManager.OpenView("CookSuccessView", t));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [3, this.Mke],
        [6, this.aOt],
      ]);
  }
  OnStart() {
    (this.LOt = new OpenCookRoleButton(this.GetItem(4))),
      this.LOt.BindOnCallback(this.OOt),
      (this.oOt = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetHorizontalLayout(2),
        this.nOt,
      )),
      (this.ROt = new AmountItem(this.GetItem(5))),
      this.ROt.BindGetMaxCallback(this.wOt),
      this.ROt.BindSetSumCallback(this.LGt),
      (this.DOt = new CookItemView_1.IconItem(this.GetItem(1)));
  }
  OnBeforeDestroy() {
    this.Cde(),
      this.oOt.ClearChildren(),
      (this.oOt = void 0),
      (this.ROt = void 0);
  }
  dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.CookSuccess,
      this.kOt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MachiningSuccess,
        this.FOt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MachiningSuccess,
        this.bl,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseCookRole,
        this.NOt,
      );
  }
  Cde() {
    this.UOt ||
      (EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CookSuccess,
        this.kOt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MachiningSuccess,
        this.FOt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MachiningSuccess,
        this.bl,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseCookRole,
        this.NOt,
      ));
  }
  HideView(t) {
    this.SetActive(!t),
      t || (ModelManager_1.ModelManager.CookModel.CurrentCookViewType = 3);
  }
  ShowView(t) {
    (ModelManager_1.ModelManager.CookModel.CurrentCookViewType = 3),
      this.SetActive(!0),
      this.UOt && (this.dde(), (this.UOt = !1)),
      (this.ETt = t),
      this.bl();
  }
  T2e() {
    let t = void 0;
    (t = (
      0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType
        ? this.AOt
        : this.POt
    ).Name),
      this.GetText(0).ShowTextNew(t);
  }
  BOt() {
    let t = void 0;
    (t =
      0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType
        ? this.AOt.FoodItemId
        : this.POt.FinalItemId),
      this.DOt.SetIcon(t),
      this.DOt.SetQuality(t);
  }
  bOt() {
    0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType
      ? (this.LOt.SetActive(!0),
        this.LOt.RefreshIcon(this.dFe),
        this.LOt.RefreshRedDot(this.dFe, this.ETt))
      : this.LOt.SetActive(!1);
  }
  qOt() {
    var t = ModelManager_1.ModelManager.CookModel.GetCookMaterialList(
      this.ETt,
      ModelManager_1.ModelManager.CookModel.CurrentCookListType,
    );
    this.oOt.RebuildLayoutByDataNew(t);
  }
  DGt() {
    for (const t of this.oOt.GetLayoutItemMap().values())
      t.RefreshNeed(this.t6);
  }
  M3e() {
    var t,
      e = this.GetButton(3)
        .GetOwner()
        .GetComponentByClass(UE.UIInteractionGroup.StaticClass()),
      i = this.GetButton(6).GetOwner();
    0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType
      ? ((t = CookController_1.CookController.CheckCanCook(this.ETt)),
        e.SetInteractable(t),
        i.GetUIItem().SetUIActive(!t))
      : ((t = CookController_1.CookController.CheckCanProcessed(this.ETt)),
        e.SetInteractable(t),
        i.GetUIItem().SetUIActive(!t));
  }
  GOt() {
    this.ROt.ResetSum(), this.ROt.RefreshAddAndDelButton();
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    t = this.GetGuideUiItem(t[1]);
    if (t) return [t, t];
  }
}
exports.CookView = CookView;
class OpenCookRoleButton extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.G6e = void 0),
      (this.VOt = () => {
        this.G6e && this.G6e();
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.VOt]]);
  }
  RefreshIcon(t) {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
    this.SetRoleIcon(e.GetRoleConfig().RoleHeadIcon, this.GetTexture(1), t);
  }
  RefreshRedDot(t, e) {
    this.GetItem(2).SetUIActive(
      CookController_1.CookController.CheckIsBuffEx(t, e),
    );
  }
  BindOnCallback(t) {
    this.G6e = t;
  }
}
class AmountItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.HOt = 1),
      (this.jOt = void 0),
      (this.WOt = void 0),
      (this.KOt = void 0),
      (this.QOt = (t) => {
        var e = this.XOt();
        (this.HOt = e < t ? e : t),
          this.HOt < 1 && (this.HOt = 1),
          this.WOt && this.WOt(this.HOt),
          this.GetText(3).SetText(this.HOt.toString()),
          this.RefreshAddAndDelButton();
      }),
      (this._o = () => {
        (this.HOt += 1),
          this.WOt && this.WOt(this.HOt),
          this.RefreshAddAndDelButton(),
          this.GetText(3).SetText(this.HOt.toString());
      }),
      (this.MTt = () => {
        --this.HOt,
          this.WOt && this.WOt(this.HOt),
          this.RefreshAddAndDelButton(),
          this.GetText(3).SetText(this.HOt.toString());
      }),
      (this.$Ot = () => {
        this.YOt();
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [0, this._o],
        [1, this.MTt],
        [2, this.$Ot],
      ]);
  }
  OnStart() {
    this.GetText(3).SetText(this.HOt.toString());
  }
  async JOt() {
    (this.KOt = new CommonCountPanel_1.CommonItemCountPanel()),
      await this.KOt.CreateThenShowByResourceIdAsync(
        "UiItem_ShopCountPanel_Prefab",
        UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Normal),
      ),
      this.KOt.SetConfirmFunction(this.QOt);
  }
  ResetSum() {
    (this.HOt = 1), this.GetText(3).SetText(this.HOt.toString());
  }
  RefreshAddAndDelButton() {
    this.GetButton(1)
      .GetOwner()
      .GetComponentByClass(UE.UIInteractionGroup.StaticClass())
      .SetInteractable(1 !== this.HOt),
      this.GetButton(0)
        .GetOwner()
        .GetComponentByClass(UE.UIInteractionGroup.StaticClass())
        .SetInteractable(this.HOt < this.XOt());
  }
  BindGetMaxCallback(t) {
    this.jOt = t;
  }
  BindSetSumCallback(t) {
    this.WOt = t;
  }
  XOt() {
    if (this.jOt) {
      var t = this.jOt();
      if (0 !== t) return t;
    }
    return 1;
  }
  async YOt() {
    this.KOt || (await this.JOt()), this.KOt.PlayStartSequence(this.HOt);
    var t =
      ConfigManager_1.ConfigManager.TextConfig.GetTextById("CookInputCount");
    this.KOt.SetTitleText(t);
  }
}
//# sourceMappingURL=CookView.js.map

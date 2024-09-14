"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ManufactureView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  CommonCountPanel_1 = require("../../Common/CommonCountPanel"),
  UiNavigationView_1 = require("../../UiNavigation/UiNavigationView"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  CommonItemView_1 = require("./CommonItemView"),
  CommonManager_1 = require("./CommonManager");
class ManufactureView extends UiNavigationView_1.UiNavigationView {
  constructor() {
    super(...arguments),
      (this.oOt = void 0),
      (this.NIi = void 0),
      (this.ROt = void 0),
      (this.DOt = void 0),
      (this.UOt = !0),
      (this.ETt = 0),
      (this.t6 = 1),
      (this.nOt = (t, e, i) => {
        e = new CommonItemView_1.MaterialItem(e);
        return (
          e.Update(t), e.BindOnClickedCallback(this.xOt), { Key: i, Value: e }
        );
      }),
      (this.wOt = () =>
        CommonManager_1.CommonManager.GetMaxCreateCount(this.ETt)),
      (this.LGt = (t) => {
        (this.t6 = t), this.DGt();
      }),
      (this.bl = () => {
        this.GetActive() &&
          (CommonManager_1.CommonManager.SetCurrentRoleId(
            CommonManager_1.CommonManager.GetManufactureRoleId(this.ETt),
          ),
          (this.t6 = 1),
          this.T2e(),
          this.BOt(),
          this.OIi(),
          this.qOt(),
          this.M3e(),
          this.GOt());
      }),
      (this.kIi = () => {
        this.OIi();
      }),
      (this.FIi = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OpenHelpRole,
          this.ETt,
        );
      }),
      (this.Mke = () => {
        CommonManager_1.CommonManager.SendManufacture(this.ETt, this.t6);
      }),
      (this.iNt = () => {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "MaterialShort",
        );
      }),
      (this.xOt = (t) => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          t.L8n,
        );
      }),
      (this.VIi = () => {}),
      (this.HIi = () => {});
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
        [6, this.iNt],
      ]);
  }
  OnStart() {
    (this.NIi = new OpenHelpRoleButton(this.GetItem(4))),
      this.NIi.BindOnCallback(this.FIi),
      (this.oOt = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetHorizontalLayout(2),
        this.nOt,
      )),
      CommonManager_1.CommonManager.CheckShowAmountItem()
        ? (this.GetItem(5).SetUIActive(!0),
          (this.ROt = new AmountItem(this.GetItem(5))),
          this.ROt.BindGetMaxCallback(this.wOt),
          this.ROt.BindSetSumCallback(this.LGt))
        : this.GetItem(5).SetUIActive(!1),
      (this.DOt = new IconItem(this.GetItem(1)));
  }
  OnBeforeDestroy() {
    this.Cde(),
      this.oOt.ClearChildren(),
      (this.oOt = void 0),
      (this.ROt = void 0);
  }
  dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ComposeSuccess,
      this.HIi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ComposeSuccess,
        this.bl,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ForgingSuccess,
        this.VIi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ForgingSuccess,
        this.bl,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseHelpRole,
        this.kIi,
      );
  }
  Cde() {
    this.UOt ||
      (EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ComposeSuccess,
        this.HIi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ComposeSuccess,
        this.bl,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ForgingSuccess,
        this.VIi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ForgingSuccess,
        this.bl,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseHelpRole,
        this.kIi,
      ));
  }
  HideView(t) {
    this.SetActive(!t),
      t ||
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.SwitchViewType,
          2,
        );
  }
  ShowView(t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SwitchViewType, 2),
      this.SetActive(!0),
      this.UOt && (this.dde(), (this.UOt = !1)),
      (this.ETt = t),
      this.bl();
  }
  T2e() {
    var t = CommonManager_1.CommonManager.GetCommonManufactureText(this.ETt);
    this.GetText(0).SetText(t);
  }
  BOt() {
    var t = CommonManager_1.CommonManager.GetCommonManufactureId(this.ETt);
    this.DOt.SetIcon(t), this.DOt.SetQuality(t);
  }
  OIi() {
    CommonManager_1.CommonManager.CheckShowRoleView()
      ? (this.NIi.SetActive(!0),
        this.NIi.RefreshIcon(),
        this.NIi.RefreshRedDot(this.ETt))
      : this.NIi.SetActive(!1);
  }
  qOt() {
    this.oOt.RebuildLayoutByDataNew(
      CommonManager_1.CommonManager.GetManufactureMaterialList(this.ETt),
    );
  }
  DGt() {
    for (const t of this.oOt.GetLayoutItemMap().values())
      t.RefreshNeed(this.t6);
  }
  M3e() {
    var t = this.GetButton(3)
        .GetOwner()
        .GetComponentByClass(UE.UIInteractionGroup.StaticClass()),
      e = this.GetButton(6).GetOwner(),
      i = CommonManager_1.CommonManager.CheckCanManufacture(this.ETt);
    t.SetInteractable(i), e.GetUIItem().SetUIActive(!i);
  }
  GOt() {
    this.ROt && (this.ROt.ResetSum(), this.ROt.RefreshAddAndDelButton());
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    t = this.GetGuideUiItem(t[1]);
    if (t) return [t, t];
  }
}
exports.ManufactureView = ManufactureView;
class OpenHelpRoleButton extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.G6e = void 0),
      (this.jIi = () => {
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
      (this.BtnBindInfo = [[0, this.jIi]]);
  }
  RefreshIcon() {
    var t = CommonManager_1.CommonManager.GetCurrentRoleId(),
      e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
    this.SetRoleIcon(e.GetRoleConfig().RoleHeadIcon, this.GetTexture(1), t);
  }
  RefreshRedDot(t) {
    var e = CommonManager_1.CommonManager.GetCurrentRoleId();
    this.GetItem(2).SetUIActive(
      CommonManager_1.CommonManager.CheckIsBuffEx(e, t),
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
      (this.WIi = () => {
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
        [2, this.WIi],
      ]);
  }
  async JOt() {
    (this.KOt = new CommonCountPanel_1.CommonItemCountPanel()),
      await this.KOt.CreateThenShowByResourceIdAsync(
        "UiItem_ShopCountPanel_Prefab",
        UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Normal),
      ),
      this.KOt.SetConfirmFunction(this.QOt);
  }
  OnStart() {
    this.GetText(3).SetText(this.HOt.toString());
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
class IconItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(), this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [3, UE.UITexture],
      [4, UE.UISprite],
    ];
  }
  SetIcon(t) {
    this.SetItemIcon(this.GetTexture(3), t);
  }
  SetQuality(t) {
    this.SetItemQualityIcon(this.GetSprite(4), t);
  }
}
//# sourceMappingURL=ManufactureView.js.map

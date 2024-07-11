"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleAttributeItem = exports.RoleLevelUpSuccessAttributeView =
    void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  StrengthUpgradeBarItem_1 = require("./StrengthUpgradeBarItem");
class RoleLevelUpSuccessAttributeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.H_o = void 0),
      (this.$7i = void 0),
      (this.j_o = void 0),
      (this.nqe = () => {
        var t = this.Pe.ClickFunction;
        t && t(), this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UILoopScrollViewComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [2, this.nqe],
        [7, this.nqe],
      ]);
  }
  OnBeforeCreate() {
    void 0 === this.OpenParam
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Role",
          38,
          "RoleLevelUpSuccessAttributeView 打开失败,未传入界面数据",
        )
      : ((this.Pe = this.OpenParam), this.IBt());
  }
  async OnBeforeStartAsync() {
    (this.$7i = new StrengthUpgradeBarItem_1.StrengthUpgradeBarItem()),
      await this.$7i.CreateByActorAsync(this.GetItem(10).GetOwner());
  }
  OnStart() {
    var t = this.GetItem(5),
      t =
        ((this.H_o = new LevelShowItem()),
        this.H_o.CreateThenShowByActor(t.GetOwner()),
        this.Pe.WiderScrollView ?? !1),
      t =
        (this.GetItem(9).SetUIActive(t),
        this.GetItem(3).SetUIActive(!t),
        t ? this.GetItem(9) : this.GetItem(3)),
      e = this.GetLoopScrollViewComponent(6);
    e.RootUIComp.SetWidth(t.GetWidth()),
      this.GetItem(8).SetWidth(t.GetWidth()),
      (this.j_o = new LoopScrollView_1.LoopScrollView(e, t.GetOwner(), () => {
        return new AttributeSlotItem();
      }));
  }
  OnBeforeShow() {
    this.Refresh();
  }
  OnBeforeDestroy() {
    this.H_o.Destroy(),
      (this.H_o = void 0),
      this.j_o.ClearGridProxies(),
      (this.j_o = void 0);
  }
  IBt() {
    var t = this.Pe.AudioId;
    t &&
      ((t = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(t).Path),
      this.SetAudioEvent(t));
  }
  Refresh() {
    this.ILt(), this.C_o(), this.W_o(), this.K_o(), this.Q_o(), this.X_o();
  }
  C_o() {
    var t = this.Pe.ClickText ?? "Text_BackToView_Text";
    this.GetText(1).ShowTextNew(t);
  }
  ILt() {
    var t = this.Pe.Title ?? "Text_LevelUpSuccessful_Text";
    this.GetText(0).ShowTextNew(t);
  }
  W_o() {
    var t = this.Pe.LevelInfo;
    void 0 !== t &&
      this.H_o.Refresh(
        t.PreUpgradeLv,
        t.UpgradeLv,
        t?.FormatStringId,
        t?.IsMaxLevel,
      ),
      this.GetItem(5).SetUIActive(void 0 !== t);
  }
  K_o() {
    var t = this.Pe.StrengthUpgradeData;
    void 0 !== t && this.$7i.Update(t),
      this.GetItem(10).SetUIActive(void 0 !== t);
  }
  Q_o() {
    void 0 === this.Pe.AttributeInfo || 0 === this.Pe.AttributeInfo.length
      ? this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(!1)
      : this.j_o.ReloadData(this.Pe.AttributeInfo);
  }
  X_o() {
    this.GetItem(4).SetUIActive(this.Pe.IsShowArrow ?? !1);
  }
}
exports.RoleLevelUpSuccessAttributeView = RoleLevelUpSuccessAttributeView;
class LevelShowItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
    ];
  }
  Refresh(t, e, i, s) {
    i = i ?? "Text_AddExp_Text";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i, t.toString()),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i, e.toString()),
      this.GetItem(2).SetUIActive(s ?? !1);
  }
}
class AttributeSlotItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.$_o = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    (this.$_o = new RoleAttributeItem()),
      this.$_o.CreateThenShowByActor(this.GetItem(0).GetOwner());
  }
  OnBeforeDestroy() {}
  Refresh(t, e, i) {
    this.$_o.Refresh(t), this.WNe(t.IsNormalBg);
  }
  WNe(t) {
    t = t ?? !0;
    this.GetItem(1).SetUIActive(!t), this.GetItem(2).SetUIActive(t);
  }
}
class RoleAttributeItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UITexture],
      [5, UE.UIItem],
    ];
  }
  Refresh(t) {
    this.C4e(t.Name),
      this.Kbe(t.IconPath),
      this.GetItem(2).SetUIActive(t.ShowArrow ?? !0);
    var e = [this.GetText(3), this.GetText(1)];
    const i = [t.PreText, t.CurText];
    e.forEach((t, e) => {
      this.Y_o(t, i[e]);
    }),
      void 0 !== t.InnerShowBg && this.J_o(t.InnerShowBg);
  }
  Kbe(t) {
    void 0 !== t && this.SetTextureByPath(t, this.GetTexture(4)),
      this.GetTexture(4).SetUIActive(void 0 !== t);
  }
  C4e(t) {
    void 0 !== t && this.GetText(0).ShowTextNew(t),
      this.GetText(0).SetUIActive(void 0 !== t);
  }
  Y_o(t, e) {
    void 0 !== e && t.SetText(e), t.SetUIActive(void 0 !== e);
  }
  J_o(t) {
    var e = this.GetItem(5);
    e && e.SetUIActive(t);
  }
}
exports.RoleAttributeItem = RoleAttributeItem;
//# sourceMappingURL=RoleLevelUpSuccessAttributeView.js.map

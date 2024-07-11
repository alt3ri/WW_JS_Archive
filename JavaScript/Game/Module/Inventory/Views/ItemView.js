"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class ItemView extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(),
      (this.rdi = void 0),
      (this.SPe = void 0),
      (this.ndi = void 0),
      (this.sui = (e) => {
        this.ndi && this.ndi(this.rdi);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [2, UE.UISprite],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIExtendToggle],
      [6, UE.UISprite],
      [7, UE.UISprite],
      [8, UE.UISprite],
      [9, UE.UISprite],
      [10, UE.UISprite],
      [11, UE.UISprite],
      [12, UE.UISprite],
      [13, UE.UISprite],
      [14, UE.UIItem],
      [15, UE.UITexture],
      [16, UE.UIItem],
      [17, UE.UISprite],
      [18, UE.UIText],
    ]),
      (this.BtnBindInfo = [[5, this.sui]]);
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    (this.ndi = void 0), this.SPe.Clear(), (this.SPe = void 0);
  }
  BindOnItemButtonClickedCallback(e) {
    this.ndi = e;
  }
  Refresh(e, t, i) {
    this.RefreshItemViewByItemData(e), this.SetSelected(t);
  }
  OnSelected(e) {
    this.SetSelected(!0);
  }
  OnDeselected(e) {
    this.SetSelected(!1);
  }
  RefreshItemViewByItemData(e) {
    var e = (this.rdi = e).GetItemViewInfo(),
      t = e.QualityId,
      i = e.IsLock,
      s = e.IsNewItem,
      e = e.ItemDataType;
    switch (
      (this.OCi(),
      this.kCi(t),
      this.FCi(i),
      this.SetIsNewItem(s),
      this.RefreshCdTimeDisplay(),
      e)
    ) {
      case 0:
        var r = this.rdi.GetCount();
        this.VCi(r);
        break;
      case 2:
        (r = this.rdi.GetItemDataBase().GetUniqueId()),
          (r =
            ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
              r,
            ).GetLevel());
        this.HCi(r);
        break;
      case 3:
        (r = this.rdi.GetItemDataBase().GetUniqueId()),
          (r =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              r,
            ).GetPhantomLevel());
        this.HCi(r);
        break;
      default:
        r = this.rdi.GetCount();
        this.VCi(r);
    }
  }
  OCi() {
    var e = this.GetTexture(0);
    this.SetItemIcon(e, this.rdi.GetConfigId());
  }
  kCi(e) {
    var t = this.GetSprite(2);
    t && this.SetItemQualityIcon(t, this.rdi.GetConfigId());
  }
  SetSelected(e) {
    var t = this.GetExtendToggle(5);
    e ? t.SetToggleState(1, !1) : t.SetToggleState(0, !1);
  }
  FCi(e) {
    var t = this.GetSprite(6);
    t && t.SetUIActive(e);
  }
  SetIsNewItem(e) {
    this.GetSprite(7).SetUIActive(e);
  }
  VCi(e) {
    var t = this.GetText(4);
    t &&
      (t.SetText(e.toString()), t.SetUIActive(!0), (e = this.GetText(3))) &&
      e.SetUIActive(!1);
  }
  HCi(e) {
    var t = this.GetText(3);
    t &&
      (LguiUtil_1.LguiUtil.SetLocalText(t, "LevelShow", e),
      t.SetUIActive(!0),
      (e = this.GetText(4))) &&
      e.SetUIActive(!1);
  }
  SetRoleHeadVisible(e) {
    this.GetItem(14).SetUIActive(e);
  }
  jCi(e) {
    var t = this.GetItem(16);
    t.bIsUIActive !== e &&
      (t.SetUIActive(e), e) &&
      this.SPe.PlayLevelSequenceByName("EnterCd");
  }
  RefreshCdTimeDisplay() {
    var e = this.rdi.GetConfigId(),
      t = ModelManager_1.ModelManager.BuffItemModel,
      i = t.GetBuffItemRemainCdTime(e);
    i <= 0
      ? this.jCi(!1)
      : ((t = t.GetBuffItemTotalCdTime(e)), this.WCi(i, t), this.jCi(!0));
  }
  WCi(e, t) {
    var e = Math.ceil(e),
      i = this.GetSprite(17),
      s = this.GetText(18);
    i.SetFillAmount(e / t), s.SetText(e.toString());
  }
}
exports.ItemView = ItemView;
//# sourceMappingURL=ItemView.js.map

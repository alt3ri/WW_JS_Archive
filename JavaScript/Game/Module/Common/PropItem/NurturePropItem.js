"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NurturePropItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  CommonComponentDefine_1 = require("../CommonComponentDefine");
class NurturePropItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t = void 0, i = void 0, s = void 0) {
    super(),
      (this.zwt = void 0),
      (this.j5e = void 0),
      (this.Zwt = void 0),
      (this.eBt = void 0),
      (this.tBt = 1),
      (this.iBt = () => {
        var t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
            this.zwt.Id,
          ),
          i =
            ((this.zwt.RoleId = t.GetRoleId()),
            ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              "WeaponLevel",
            ));
        (this.zwt.BottomText = StringUtils_1.StringUtils.Format(
          i,
          t.GetLevel().toString(),
        )),
          (this.zwt.TopText = t.GetResonanceLevel().toString());
      }),
      (this.oBt = () => {
        var t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextById("RoleCount");
        this.zwt.BottomText = StringUtils_1.StringUtils.Format(
          t,
          this.zwt.Count.toString(),
        );
      }),
      (this.NurturePropDataFunction = { [2]: this.iBt, 4: this.oBt }),
      (this.Bke = (t) => {
        var i;
        this.j5e && ((i = this.zwt ? this.zwt.Id : void 0), this.j5e(t, i));
      }),
      (this.rBt = () => {
        this.Zwt && this.Zwt(this.zwt.Id);
      }),
      (this.nBt = () => {
        this.eBt && this.eBt(this.zwt.Id);
      }),
      t && this.CreateThenShowByActor(t.GetOwner()),
      (this.sBt = i),
      (this.aBt = s);
  }
  SetControlFunction(t) {
    this.sBt = t;
  }
  SetBottomTextFunction(t) {
    this.aBt = t;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UITexture],
      [5, UE.UISprite],
      [6, UE.UIItem],
      [7, UE.UITexture],
      [8, UE.UIItem],
      [9, UE.UIText],
      [10, UE.UIItem],
      [11, UE.UIText],
      [12, UE.UIItem],
      [13, UE.UIText],
      [14, UE.UISprite],
      [15, UE.UIButtonComponent],
      [16, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this.Bke],
        [15, this.rBt],
        [16, this.nBt],
      ]);
  }
  OnStart() {
    this.GetItem(12).SetUIActive(!1);
  }
  hBt(t) {
    t === CommonComponentDefine_1.WEAPON_ITEMTYPE
      ? ((this.zwt.ItemType = 2), (this.zwt.IsSingle = !0))
      : t === CommonComponentDefine_1.WEAPONMATERIAL_ITEMTYPE &&
        ((this.zwt.ItemType = 4), (this.zwt.IsSingle = !1));
  }
  lBt() {
    var t;
    0 < this.zwt.RoleId
      ? (this.GetItem(8).SetUIActive(!0),
        (t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
          this.zwt.RoleId,
        )),
        this.SetRoleIcon(t.RoleHeadIcon, this.GetTexture(7), this.zwt.RoleId))
      : this.GetItem(8).SetUIActive(!1);
  }
  _Bt() {
    this.zwt.TopText
      ? (this.GetItem(10).SetUIActive(!0),
        this.GetText(9).SetText(this.zwt.TopText))
      : this.GetItem(10).SetUIActive(!1);
  }
  InitPropItem(t) {
    this.GetItem(1).SetUIActive(void 0 !== t),
      this.GetItem(3).SetUIActive(void 0 === t),
      t &&
        ((this.zwt = new CommonComponentDefine_1.NurturePropItemData()),
        (this.zwt.Id = t),
        1 === this.tBt
          ? this.UpdatePropItem()
          : 0 === this.tBt && this.UpdatePropItemByItemId());
  }
  SetUseType(t) {
    this.tBt = t;
  }
  UpdatePropItem() {
    var t = ModelManager_1.ModelManager.InventoryModel.GetWeaponItemData(
      this.zwt.Id,
    );
    t ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("UiCommon", 9, "没有磁带数据", ["Id", this.zwt.Id])),
      (this.zwt.Count = t.GetCount()),
      this.hBt(t.GetType()),
      this.NurturePropDataFunction[this.zwt.ItemType](),
      this.SetItemIcon(this.GetTexture(4), t.GetConfigId()),
      this.SetItemQualityIcon(this.GetSprite(5), t.GetConfigId()),
      this.aBt
        ? this.aBt(this.zwt.Id)
        : this.SetBottomText(this.zwt.BottomText),
      this.sBt && this.sBt(this.zwt.Id),
      this.UpdateLockState(t.GetIsLock()),
      this.lBt(),
      this._Bt();
  }
  UpdatePropItemByItemId() {
    this.SetItemIcon(this.GetTexture(4), this.zwt.Id),
      this.SetItemQualityIcon(this.GetSprite(5), this.zwt.Id),
      this.UpdateLockState(!1),
      this._Bt(),
      this.lBt();
  }
  SetToggleFunction(t) {
    this.j5e = t;
  }
  SetAddFunction(t) {
    this.Zwt = t;
  }
  SetReduceFunction(t) {
    this.eBt = t;
  }
  UpdateLockState(t) {
    this.GetItem(6).SetUIActive(t);
  }
  GetIncId() {
    return this.zwt.Id;
  }
  SetControlActive(t) {
    t
      ? (this.GetItem(12).SetUIActive(t),
        this.GetSprite(14).SetUIActive(this.zwt.IsSingle),
        this.GetText(13).SetUIActive(!this.zwt.IsSingle))
      : this.GetItem(12).SetUIActive(t);
  }
  SetControlNumber(t) {
    this.GetText(13).SetText(t);
  }
  SetToggleState(t, i = !0) {
    this.GetExtendToggle(0).SetToggleState(t, i);
  }
  SetToggleGroup(t) {
    this.GetExtendToggle(0).SetToggleGroup(t);
  }
  SetBottomText(t = void 0) {
    t = t || this.zwt.BottomText;
    this.GetText(11).SetText(t);
  }
  SetBottomRichText() {
    this.GetText(11).SetRichText(!0);
  }
  SetAddPointDown(t) {
    this.GetButton(15).OnPointDownCallBack.Bind(() => {
      t(this.zwt.Id);
    });
  }
  SetAddPointUp(t) {
    this.GetButton(15).OnPointUpCallBack.Bind(() => {
      t(this.zwt.Id);
    });
  }
  SetReducePointDown(t) {
    this.GetButton(16).OnPointDownCallBack.Bind(() => {
      t(this.zwt.Id);
    });
  }
  SetReducePointUp(t) {
    this.GetButton(16).OnPointUpCallBack.Bind(() => {
      t(this.zwt.Id);
    });
  }
  OnBeforeDestroy() {
    this.GetButton(15).OnPointDownCallBack.Unbind(),
      this.GetButton(15).OnPointUpCallBack.Unbind(),
      this.GetButton(16).OnPointDownCallBack.Unbind(),
      this.GetButton(16).OnPointUpCallBack.Unbind();
  }
  Refresh(t, i, s) {
    this.InitPropItem(t),
      i ? this.SetToggleState(1, !1) : this.SetToggleState(0, !1);
  }
  OnSelected(t) {
    this.SetToggleState(1, t);
  }
  OnDeselected(t) {
    this.SetToggleState(0, t);
  }
}
exports.NurturePropItem = NurturePropItem;
//# sourceMappingURL=NurturePropItem.js.map

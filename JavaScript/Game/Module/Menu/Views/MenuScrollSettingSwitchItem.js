"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuScrollSettingSwitchItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  MenuController_1 = require("../MenuController"),
  MenuDefine_1 = require("../MenuDefine"),
  MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingSwitchItem extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
  constructor() {
    super(...arguments),
      (this.pbi = () => {
        this.GetItemClickLimit(this.GetButton(2)) || this.vbi(-1);
      }),
      (this.Mbi = () => {
        this.GetItemClickLimit(this.GetButton(3)) || this.vbi(1);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UISprite],
      [7, UE.UISprite],
    ];
  }
  OnStart() {
    this.GetButton(3).SetCanClickWhenDisable(!0),
      this.GetButton(2).SetCanClickWhenDisable(!0),
      this.ybi();
  }
  OnClear() {
    this.Data && (this.Data = void 0),
      this.GetButton(2).OnClickCallBack.Unbind(),
      this.GetButton(3).OnClickCallBack.Unbind();
  }
  Update(t) {
    (this.Data = t), this.mGe(), this.Ibi(), this.sxi(), this.cHa();
  }
  mGe() {
    this.GetText(0).ShowTextNew(this.Data.FunctionName ?? "");
  }
  Ibi() {
    this.GetRootItem().SetUIActive(!0);
    var t = this.vah();
    this.Sbi(t), this.RefreshInteractionGroup(t);
  }
  ybi() {
    this.GetButton(2).OnClickCallBack.Bind(this.pbi),
      this.GetButton(3).OnClickCallBack.Bind(this.Mbi);
  }
  SetInteractionActive(t) {
    var e = this.vah();
    this.RefreshInteractionGroup(e, t);
  }
  Sbi(t) {
    let e = this.Data.OptionsNameList[t];
    this.I0c() && (e = MenuDefine_1.CUSTOM_TEXT_ID),
      this.GetText(1).ShowTextNew(e),
      this.GetSprite(7).SetUIActive(this.Data.IsRecommendIndex(t));
  }
  RefreshInteractionGroup(t, e = !0) {
    e
      ? (this.GetButton(3).SetSelfInteractive(
          this.I0c() || t !== this.Data.OptionsNameList.length - 1,
        ),
        this.GetButton(2).SetSelfInteractive(this.I0c() || 0 !== t))
      : (this.GetButton(3).SetSelfInteractive(!1),
        this.GetButton(2).SetSelfInteractive(!1));
  }
  vbi(t) {
    var e = this.vah();
    let i = Math.floor(e + t);
    this.I0c() && (i = 0 < t ? 0 : this.Data.OptionsNameList.length - 1),
      this.FireSaveMenuChange(this.Data.OptionsValueList[i]);
  }
  I0c() {
    return (
      this.Data.FunctionId === GameSettingsDefine_1.EFunction.IMAGEQUALITY &&
      ModelManager_1.ModelManager.MenuModel.IsImageQualityCustom
    );
  }
  vah() {
    var t = MenuController_1.MenuController.GetTargetConfig(
        this.Data.FunctionId,
      ),
      e = this.Data.OptionsValueList;
    let i = e.indexOf(t);
    return (
      i < 0 &&
        ((t = this.Data.OptionsDefault),
        (e = e.indexOf(t)) < 0 &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Menu",
            64,
            "默认值不存在于可选值列表中，请策划策划策划检查配置",
            ["functionId", this.Data.FunctionId],
            ["Default Value", t],
          ),
        (i = e)),
      i
    );
  }
  OnSetDetailVisible(t) {
    this.GetItem(4)?.SetUIActive(t);
  }
  sxi() {
    var t, e;
    this.Data &&
      this.Data.HasDetailText() &&
      ((t = this.GetText(5)),
      (e = this.Data.GetDetailTextId()),
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, e));
  }
  cHa() {
    this.Data && this.GetSprite(6)?.SetUIActive(this.Data.HasDetailText());
  }
}
exports.MenuScrollSettingSwitchItem = MenuScrollSettingSwitchItem;
//# sourceMappingURL=MenuScrollSettingSwitchItem.js.map

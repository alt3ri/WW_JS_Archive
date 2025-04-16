"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingBuffNewBuffTipsView = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class MowingBuffNewBuffTipsView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.rcr = void 0),
      (this._9a = void 0),
      (this.lRe = void 0);
  }
  RefreshMainTypeIconTexture() {
    this.GetTexture(0)?.SetUIActive(!1);
  }
  RefreshItemNameText() {
    this.GetText(1)?.SetColor(this.lRe),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this._9a.NameTextId);
  }
  RefreshItemIconTexture() {
    this.SetTextureByPath(this._9a.IconPath, this.GetTexture(2));
  }
  RefreshItemDescribeText() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(3),
      this._9a.DescriptionTextId,
      ...this._9a.DescriptionArgs,
    );
  }
  RefreshQualityTexture() {
    this.SetTextureByPath(this._9a.QualityTexPath, this.GetTexture(4));
  }
  RefreshQualityNiagara() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      this._9a.IsGolden ? "NS_Fx_LGUI_Item_Golden" : "NS_Fx_LGUI_Item_Other",
    );
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.NiagaraSystem, (e) => {
      var i;
      e &&
        UiManager_1.UiManager.IsViewOpen("NewItemTipsView") &&
        this.RootItem &&
        ((i = this.GetUiNiagara(5)).SetNiagaraSystem(e), !this._9a.IsGolden) &&
        this.lRe &&
        (i.ColorParameter.Get("Color").Constant = UE.LinearColor.FromSRGBColor(
          this.lRe,
        ));
    });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UITexture],
      [5, UE.UINiagara],
    ];
  }
  OnStart() {
    void 0 === this.OpenParam
      ? this.CloseMe()
      : ((this._9a = this.OpenParam),
        (this.lRe = UE.Color.FromHex(this._9a.NameHexColor)),
        this.RefreshMainTypeIconTexture(),
        this.RefreshItemNameText(),
        this.RefreshItemIconTexture(),
        this.RefreshItemDescribeText(),
        this.RefreshQualityTexture(),
        this.RefreshQualityNiagara());
  }
  async OnBeforeStartAsync() {
    return (
      (this.rcr = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem)),
      Promise.resolve()
    );
  }
  OnAfterShow() {
    this.n$a();
  }
  OnAfterDestroy() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.MowingRiskOnBuffTipsAfterDestroy,
    );
  }
  async n$a() {
    await this.rcr.LitePlayAsync(this._9a.IsGolden ? "Golden" : "Start01"),
      this.CloseMe();
  }
}
exports.MowingBuffNewBuffTipsView = MowingBuffNewBuffTipsView;
//# sourceMappingURL=MowingBuffNewBuffTipsView.js.map

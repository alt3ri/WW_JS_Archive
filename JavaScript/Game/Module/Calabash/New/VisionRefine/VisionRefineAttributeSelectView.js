"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRefineAttributeSelectView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  AttributeSelectPanel_1 = require("./AttributeSelectPanel");
class VisionRefineAttributeSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this._Xe = -1),
      (this._a1 = void 0),
      (this.rmc = []),
      (this.nvt = void 0),
      (this.omc = void 0),
      (this.p5t = () => {
        this.omc && this.omc(this._a1), this.CloseMe();
      }),
      (this.Ol1 = (e) => {
        (this._a1 = e), this.Tke();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
    ]),
      (this.BtnBindInfo = [[1, this.p5t]]);
  }
  async OnBeforeStartAsync() {
    this.GetItem(3).SetUIActive(!1),
      this.GetButton(0).RootUIComp.SetUIActive(!1),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(4),
        "VisionRefineAttributeSelectTitle",
      ),
      (this.nvt = new AttributeSelectPanel_1.AttributeSelectPanel()),
      (this.nvt.CallBackClick = this.Ol1),
      await this.nvt.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
  }
  OnStart() {
    var e = this.OpenParam,
      e =
        ((this._Xe = e.IncId),
        (this.omc = e.Callback),
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(
          this._Xe,
        )),
      i = e.GetMainPropShowAttributeList(1)[0],
      t =
        ModelManager_1.ModelManager.CalabashModel.GetVisionRefineRecommendAttributes(
          e.GetCost(),
          e.GetFetterGroupId(),
        ),
      e =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomMainPropItemRefineAvailableIdList(
          e.GetConfigId(),
        ),
      s = new Array();
    for (const a of e) {
      var r =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(
            a,
          ),
        r = {
          PropItemId: a,
          PropIndexId: r.PropId,
          IsRecommend: t.includes(r.PropId),
          IsDisable: i.Id === r.PropId,
        };
      s.push(r);
    }
    (this.rmc = s), this.nvt.RefreshByData(this.rmc);
  }
  OnBeforeShow() {
    this.Tke();
  }
  Tke() {
    this._a1
      ? this.GetButton(1).SetSelfInteractive(!0)
      : this.GetButton(1).SetSelfInteractive(!1);
  }
}
exports.VisionRefineAttributeSelectView = VisionRefineAttributeSelectView;
//# sourceMappingURL=VisionRefineAttributeSelectView.js.map

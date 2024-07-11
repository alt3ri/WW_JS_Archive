"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfluenceAreaSelectView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Util/LguiUtil");
const InfluenceReputationDefine_1 = require("../InfluenceReputationDefine");
class InfluenceAreaSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Yri = void 0),
      (this.Jri = void 0),
      (this.zri = 0),
      (this.gpt = () => {
        this.CloseMe();
      }),
      (this.xUt = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RefreshInfluencePanel,
          this.zri,
        ),
          this.CloseMe();
      }),
      (this.sGe = (e, t) => {
        t = new AreaButtonItem(t);
        return (
          t.UpdateItem(e.Id),
          t.SetToggleFunction(this.U4e),
          t.SetCanExecuteChange(this.T7e),
          { Key: e.Id, Value: t }
        );
      }),
      (this.U4e = (e) => {
        this.zri && this.Zri(this.zri).SetToggleState(0, !1), (this.zri = e);
        const t = this.GetText(3);
        const i = this.GetText(4);
        let s =
          ModelManager_1.ModelManager.InfluenceReputationModel.IsCountryUnLock(
            e,
          );
        const n = this.GetInteractionGroup(6);
        s
          ? ((s =
              ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(
                e,
              )),
            LguiUtil_1.LguiUtil.SetLocalTextNew(t, s.Title),
            LguiUtil_1.LguiUtil.SetLocalTextNew(i, s.Desc),
            n.SetInteractable(!0))
          : (LguiUtil_1.LguiUtil.SetLocalText(t, "AreaLockTitle"),
            LguiUtil_1.LguiUtil.SetLocalText(i, "AreaLockContent"),
            n.SetInteractable(!1));
      }),
      (this.T7e = (e) => this.zri !== e);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIGridLayout],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
      [6, UE.UIInteractionGroup],
    ]),
      (this.BtnBindInfo = [
        [0, this.gpt],
        [5, this.xUt],
      ]);
  }
  OnStart() {
    this.Yri = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetGridLayout(1),
      this.sGe,
    );
    const e = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryList();
    this.Yri.RebuildLayoutByDataNew(e),
      (this.Jri = new AreaButtonItem(this.GetItem(2))),
      this.Jri.UpdateItem(InfluenceReputationDefine_1.NO_COUNTRY_ID),
      this.Jri.SetToggleFunction(this.U4e),
      this.Jri.SetCanExecuteChange(this.T7e);
  }
  Zri(e) {
    e = this.Yri.GetLayoutItemByKey(e);
    return e || this.Jri;
  }
  OnAfterShow() {
    const e = this.OpenParam;
    this.Zri(e).SetToggleState(1, !0);
  }
  OnBeforeDestroy() {
    this.Yri.ClearChildren(),
      (this.Yri = void 0),
      this.Jri.Destroy(),
      (this.Jri = void 0);
  }
}
exports.InfluenceAreaSelectView = InfluenceAreaSelectView;
class AreaButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.U4e = void 0),
      (this.OBt = void 0),
      (this.z4t = 0),
      (this.x4e = (e) => {
        e === 1 && this.U4e(this.z4t);
      }),
      (this.T7e = () => !this.OBt || this.OBt(this.z4t)),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIExtendToggle],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.x4e]]);
  }
  OnStart() {
    this.GetExtendToggle(1).CanExecuteChange.Bind(this.T7e);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(1).CanExecuteChange.Unbind();
  }
  eni(e) {
    const t =
      ModelManager_1.ModelManager.InfluenceReputationModel.HasRedDotInCurrentCountry(
        this.z4t,
      );
    this.GetItem(3).SetUIActive(t && e);
  }
  UpdateItem(e) {
    this.z4t = e;
    const t = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(e);
    var e =
      ModelManager_1.ModelManager.InfluenceReputationModel.IsCountryUnLock(e);
    const i = this.GetTexture(0);
    const s = this.GetItem(2);
    i.SetUIActive(e),
      s.SetUIActive(!e),
      e && this.SetTextureByPath(t.Logo, i),
      this.eni(e);
  }
  SetToggleFunction(e) {
    this.U4e = e;
  }
  SetCanExecuteChange(e) {
    this.OBt = e;
  }
  SetToggleState(e, t) {
    this.GetExtendToggle(1).SetToggleStateForce(e, t);
  }
}
// # sourceMappingURL=InfluenceAreaSelectView.js.map

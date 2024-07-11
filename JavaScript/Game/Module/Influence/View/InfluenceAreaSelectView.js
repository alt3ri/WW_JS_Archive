"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfluenceAreaSelectView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  InfluenceReputationDefine_1 = require("../InfluenceReputationDefine");
class InfluenceAreaSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Yni = void 0),
      (this.Jni = void 0),
      (this.zni = 0),
      (this.Rvt = () => {
        this.CloseMe();
      }),
      (this.qAt = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RefreshInfluencePanel,
          this.zni,
        ),
          this.CloseMe();
      }),
      (this.sGe = (e, t) => {
        t = new AreaButtonItem(t);
        return (
          t.UpdateItem(e.Id),
          t.SetToggleFunction(this.j5e),
          t.SetCanExecuteChange(this.Lke),
          { Key: e.Id, Value: t }
        );
      }),
      (this.j5e = (e) => {
        this.zni && this.Zni(this.zni).SetToggleState(0, !1), (this.zni = e);
        var t = this.GetText(3),
          i = this.GetText(4),
          s =
            ModelManager_1.ModelManager.InfluenceReputationModel.IsCountryUnLock(
              e,
            ),
          n = this.GetInteractionGroup(6);
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
      (this.Lke = (e) => this.zni !== e);
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
        [0, this.Rvt],
        [5, this.qAt],
      ]);
  }
  OnStart() {
    this.Yni = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetGridLayout(1),
      this.sGe,
    );
    var e = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryList();
    this.Yni.RebuildLayoutByDataNew(e),
      (this.Jni = new AreaButtonItem(this.GetItem(2))),
      this.Jni.UpdateItem(InfluenceReputationDefine_1.NO_COUNTRY_ID),
      this.Jni.SetToggleFunction(this.j5e),
      this.Jni.SetCanExecuteChange(this.Lke);
  }
  Zni(e) {
    e = this.Yni.GetLayoutItemByKey(e);
    return e || this.Jni;
  }
  OnAfterShow() {
    var e = this.OpenParam;
    this.Zni(e).SetToggleState(1, !0);
  }
  OnBeforeDestroy() {
    this.Yni.ClearChildren(),
      (this.Yni = void 0),
      this.Jni.Destroy(),
      (this.Jni = void 0);
  }
}
exports.InfluenceAreaSelectView = InfluenceAreaSelectView;
class AreaButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.j5e = void 0),
      (this.Vbt = void 0),
      (this.z5t = 0),
      (this.Bke = (e) => {
        1 === e && this.j5e(this.z5t);
      }),
      (this.Lke = () => !this.Vbt || this.Vbt(this.z5t)),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIExtendToggle],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.Bke]]);
  }
  OnStart() {
    this.GetExtendToggle(1).CanExecuteChange.Bind(this.Lke);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(1).CanExecuteChange.Unbind();
  }
  esi(e) {
    var t =
      ModelManager_1.ModelManager.InfluenceReputationModel.HasRedDotInCurrentCountry(
        this.z5t,
      );
    this.GetItem(3).SetUIActive(t && e);
  }
  UpdateItem(e) {
    this.z5t = e;
    var t = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(e),
      e =
        ModelManager_1.ModelManager.InfluenceReputationModel.IsCountryUnLock(e),
      i = this.GetTexture(0),
      s = this.GetItem(2);
    i.SetUIActive(e),
      s.SetUIActive(!e),
      e && this.SetTextureByPath(t.Logo, i),
      this.esi(e);
  }
  SetToggleFunction(e) {
    this.j5e = e;
  }
  SetCanExecuteChange(e) {
    this.Vbt = e;
  }
  SetToggleState(e, t) {
    this.GetExtendToggle(1).SetToggleStateForce(e, t);
  }
}
//# sourceMappingURL=InfluenceAreaSelectView.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotographOptionSetup = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  PhotographController_1 = require("../PhotographController");
class PhotographOptionSetup extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.RKi = 0),
      (this.UKi = void 0),
      (this.AKi = 0),
      (this.PKi = !1),
      (this.xKi = void 0),
      (this.SPe = void 0),
      (this.UFe = () => {
        this.EUt(!this.PKi),
          this.wKi(this.PKi),
          this.BKi(),
          this.xKi && this.xKi(this.AKi);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[1, this.UFe]]);
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.GetButton(1).RootUIComp,
    );
  }
  OnBeforeDestroy() {
    this.SPe.Clear(), (this.SPe = void 0);
  }
  Initialize(t) {
    (this.RKi = t), this.Refresh(), this.SetEnable(!0);
  }
  Mqt(t) {
    (this.AKi = t), this.bKi(this.AKi), this.BKi();
  }
  Refresh() {
    var t, e;
    (this.UKi =
      ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoSetupConfig(
        this.RKi,
      )),
      0 === this.UKi.Type &&
        ((t = ModelManager_1.ModelManager.PhotographModel.GetPhotographOption(
          this.RKi,
        )),
        this.Mqt(t),
        (t = this.UKi.Name),
        (e = this.GetText(0)),
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, t));
  }
  SetEnable(t) {
    this.RootItem.SetAlpha(t ? 1 : 0.5), this.GetButton(1).SetEnable(t);
  }
  BindOnIndexChanged(t) {
    this.xKi = t;
  }
  GetSetupId() {
    return this.RKi;
  }
  GetSetupConfig() {
    return this.UKi;
  }
  bKi(t) {
    var e = this.UKi.Options.length - 1;
    this.EUt(t === e, !1);
  }
  wKi(t) {
    var e = this.UKi.Options.length - 1;
    this.AKi = t ? e : 0;
  }
  EUt(t, e = !0) {
    t = (this.PKi = t) ? "ClickL" : "ClickR";
    this.SPe?.PlayLevelSequenceByName(t),
      e || this.SPe?.StopSequenceByKey(t, !1, !0);
  }
  BKi() {
    PhotographController_1.PhotographController.SetPhotographOption(
      this.UKi.ValueType,
      this.AKi,
    );
  }
}
exports.PhotographOptionSetup = PhotographOptionSetup;
//# sourceMappingURL=PhotographOptionSetup.js.map

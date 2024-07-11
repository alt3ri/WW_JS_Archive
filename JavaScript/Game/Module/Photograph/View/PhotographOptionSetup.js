"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotographOptionSetup = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PhotographController_1 = require("../PhotographController");
class PhotographOptionSetup extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.AWi = 0),
      (this.PWi = void 0),
      (this.xWi = 0),
      (this.wWi = !1),
      (this.BWi = void 0),
      (this.EPe = void 0),
      (this.m2e = () => {
        this.fRt(!this.wWi),
          this.bWi(this.wWi),
          this.qWi(),
          this.BWi && this.BWi(this.xWi);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[1, this.m2e]]);
  }
  OnStart() {
    this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.GetButton(1).RootUIComp,
    );
  }
  OnBeforeDestroy() {
    this.EPe.Clear(), (this.EPe = void 0);
  }
  Initialize(t) {
    (this.AWi = t), this.Refresh(), this.SetEnable(!0);
  }
  fbt(t) {
    (this.xWi = t), this.GWi(this.xWi), this.qWi();
  }
  Refresh() {
    let t, e;
    (this.PWi =
      ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoSetupConfig(
        this.AWi,
      )),
      this.PWi.Type === 0 &&
        ((t = ModelManager_1.ModelManager.PhotographModel.GetPhotographOption(
          this.AWi,
        )),
        this.fbt(t),
        (t = this.PWi.Name),
        (e = this.GetText(0)),
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, t));
  }
  SetEnable(t) {
    this.RootItem.SetAlpha(t ? 1 : 0.5), this.GetButton(1).SetEnable(t);
  }
  BindOnIndexChanged(t) {
    this.BWi = t;
  }
  GetSetupId() {
    return this.AWi;
  }
  GetSetupConfig() {
    return this.PWi;
  }
  GWi(t) {
    const e = this.PWi.Options.length - 1;
    this.fRt(t === e, !1);
  }
  bWi(t) {
    const e = this.PWi.Options.length - 1;
    this.xWi = t ? e : 0;
  }
  fRt(t, e = !0) {
    t = (this.wWi = t) ? "ClickL" : "ClickR";
    this.EPe?.PlayLevelSequenceByName(t),
      e || this.EPe?.StopSequenceByKey(t, !1, !0);
  }
  qWi() {
    PhotographController_1.PhotographController.SetPhotographOption(
      this.PWi.ValueType,
      this.xWi,
    );
  }
}
exports.PhotographOptionSetup = PhotographOptionSetup;
// # sourceMappingURL=PhotographOptionSetup.js.map

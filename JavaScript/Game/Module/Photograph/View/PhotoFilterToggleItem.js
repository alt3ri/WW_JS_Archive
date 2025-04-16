"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotoFilterToggleItem = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class PhotoFilterToggleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.PKi = !0),
      (this.y1_ = void 0),
      (this.S1_ = void 0),
      (this.SPe = void 0),
      (this.UFe = () => {
        (this.PKi = !this.PKi),
          ModelManager_1.ModelManager.PhotographModel.SetFilterToggleState(
            this.PKi,
          ),
          this.BKi();
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
  OnBeforeShow() {
    (this.PKi =
      ModelManager_1.ModelManager.PhotographModel.GetFilterToggleState()),
      this.BKi(!1);
  }
  OnBeforeDestroy() {
    this.SPe.Clear(), (this.SPe = void 0);
  }
  Initialize() {
    var e = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, "CameraFlitercontroller");
  }
  BindSetSubOptionVisible(e) {
    this.y1_ = e;
  }
  BindDeselectOnFilterItem(e) {
    this.S1_ = e;
  }
  EUt(e, i = !0) {
    e = e ? "ClickL" : "ClickR";
    this.SPe?.PlayLevelSequenceByName(e),
      i || this.SPe?.StopSequenceByKey(e, !1, !0);
  }
  BKi(e = !0) {
    this.EUt(this.PKi, !1),
      this.y1_ && this.y1_(this.PKi, e),
      this.PKi || (this.S1_ && this.S1_());
  }
}
exports.PhotoFilterToggleItem = PhotoFilterToggleItem;
//# sourceMappingURL=PhotoFilterToggleItem.js.map

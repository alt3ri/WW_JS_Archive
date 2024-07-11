"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfoDisplayTypeTwoView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  CircleAttachView_1 = require("../../AutoAttach/CircleAttachView"),
  NoCircleAttachView_1 = require("../../AutoAttach/NoCircleAttachView"),
  InfoDisplayController_1 = require("../InfoDisplayController"),
  InfoDisplayCircleAttachItem_1 = require("./InfoDisplayCircleAttachItem"),
  InfoDisplayNoCircleAttachItem_1 = require("./InfoDisplayNoCircleAttachItem"),
  PICTURE_DISTANCE = -850;
class InfoDisplayTypeTwoView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.dsi = 0),
      (this.Iye = void 0),
      (this.Wft = void 0),
      (this.jbe = (t) => {
        this.Csi(t);
      }),
      (this.gsi = 3),
      (this.Uye = (t, e, i) => {
        return new InfoDisplayCircleAttachItem_1.InfoDisplayCircleAttachItem(t);
      }),
      (this.fsi = (t, e, i) => {
        return new InfoDisplayNoCircleAttachItem_1.InfoDisplayNoCircleAttachItem(
          t,
        );
      }),
      (this.Opt = () => {
        this.CloseMe();
      }),
      (this.Pwe = () => {
        this.psi(1);
      }),
      (this.wwe = () => {
        this.psi(-1);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIButtonComponent],
      [8, UE.UIItem],
      [9, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [7, this.Opt],
        [3, this.Pwe],
        [4, this.wwe],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ClickDisplayItem,
      this.jbe,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ClickDisplayItem,
      this.jbe,
    );
  }
  OnStart() {
    var t = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    this.h7e(t), this.vsi(t), this.OPt(t);
  }
  h7e(t) {
    this.Iye?.Clear(),
      this.Wft?.Clear(),
      (this.Iye = void 0),
      (this.Wft = void 0);
    var t =
        ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
          t,
        ),
      e = this.GetItem(1);
    (t.length < this.gsi
      ? ((this.Wft = new NoCircleAttachView_1.NoCircleAttachView(e.GetOwner())),
        this.Wft.CreateItems(
          this.GetItem(0).GetOwner(),
          PICTURE_DISTANCE,
          this.fsi,
        ),
        this.Wft.DisableDragEvent(),
        this.Wft)
      : ((this.Iye = new CircleAttachView_1.CircleAttachView(e.GetOwner())),
        this.Iye.CreateItems(
          this.GetItem(0).GetOwner(),
          PICTURE_DISTANCE,
          this.Uye,
        ),
        this.Iye.DisableDragEvent(),
        this.Iye)
    ).ReloadView(t.length, t),
      (this.dsi = t.length),
      this.GetItem(0).SetUIActive(!1),
      this.Msi();
  }
  vsi(t) {
    t =
      1 <
      ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
        t,
      ).length;
    this.GetItem(8).SetUIActive(t), this.GetItem(9).SetUIActive(t);
  }
  OPt(t) {
    this.$8e(t), this.Msi();
  }
  $8e(t) {
    var e =
        ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(
          t,
        ),
      e =
        (this.GetText(6).SetText(e),
        ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(
          t,
        ));
    this.GetText(5).SetText(e);
  }
  psi(t) {
    void 0 !== this.Wft
      ? this.Wft.AttachToNextItem(t)
      : void 0 !== this.Iye && this.Iye.AttachToNextItem(t);
  }
  Csi(t) {
    void 0 !== this.Wft
      ? this.Wft?.ScrollToItem(t)
      : void 0 !== this.Iye && this.Iye?.ScrollToItem(t),
      this.Msi();
  }
  Msi() {
    let t = 0;
    void 0 !== this.Wft
      ? (t = this.Wft.GetCurrentSelectIndex())
      : void 0 !== this.Iye && (t = this.Iye.GetCurrentSelectIndex());
    var e = t + 1 + "/" + this.dsi;
    this.GetText(2).SetText(e);
  }
  OnBeforeDestroy() {
    var t = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    InfoDisplayController_1.InfoDisplayController.RequestReadDisplayInfo(t),
      this.Iye?.Clear(),
      this.Wft?.Clear();
  }
}
exports.InfoDisplayTypeTwoView = InfoDisplayTypeTwoView;
//# sourceMappingURL=InfoDisplayTypeTwoView.js.map

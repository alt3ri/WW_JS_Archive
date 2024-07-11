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
      (this.dai = 0),
      (this.Iye = void 0),
      (this.ovt = void 0),
      (this.jbe = (t) => {
        this.Cai(t);
      }),
      (this.gai = 3),
      (this.Uye = (t, e, i) => {
        return new InfoDisplayCircleAttachItem_1.InfoDisplayCircleAttachItem(t);
      }),
      (this.fai = (t, e, i) => {
        return new InfoDisplayNoCircleAttachItem_1.InfoDisplayNoCircleAttachItem(
          t,
        );
      }),
      (this.Jvt = () => {
        this.CloseMe();
      }),
      (this.Pwe = () => {
        this.pai(1);
      }),
      (this.wwe = () => {
        this.pai(-1);
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
        [7, this.Jvt],
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
    this.SHe(t), this.vai(t), this.Hxt(t);
  }
  SHe(t) {
    this.Iye?.Clear(),
      this.ovt?.Clear(),
      (this.Iye = void 0),
      (this.ovt = void 0);
    var t =
        ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
          t,
        ),
      e = this.GetItem(1);
    (t.length < this.gai
      ? ((this.ovt = new NoCircleAttachView_1.NoCircleAttachView(e.GetOwner())),
        this.ovt.CreateItems(
          this.GetItem(0).GetOwner(),
          PICTURE_DISTANCE,
          this.fai,
        ),
        this.ovt.DisableDragEvent(),
        this.ovt)
      : ((this.Iye = new CircleAttachView_1.CircleAttachView(e.GetOwner())),
        this.Iye.CreateItems(
          this.GetItem(0).GetOwner(),
          PICTURE_DISTANCE,
          this.Uye,
        ),
        this.Iye.DisableDragEvent(),
        this.Iye)
    ).ReloadView(t.length, t),
      (this.dai = t.length),
      this.GetItem(0).SetUIActive(!1),
      this.Mai();
  }
  vai(t) {
    t =
      1 <
      ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
        t,
      ).length;
    this.GetItem(8).SetUIActive(t), this.GetItem(9).SetUIActive(t);
  }
  Hxt(t) {
    this.l7e(t), this.Mai();
  }
  l7e(t) {
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
  pai(t) {
    void 0 !== this.ovt
      ? this.ovt.AttachToNextItem(t)
      : void 0 !== this.Iye && this.Iye.AttachToNextItem(t);
  }
  Cai(t) {
    void 0 !== this.ovt
      ? this.ovt?.ScrollToItem(t)
      : void 0 !== this.Iye && this.Iye?.ScrollToItem(t),
      this.Mai();
  }
  Mai() {
    let t = 0;
    void 0 !== this.ovt
      ? (t = this.ovt.GetCurrentSelectIndex())
      : void 0 !== this.Iye && (t = this.Iye.GetCurrentSelectIndex());
    var e = t + 1 + "/" + this.dai;
    this.GetText(2).SetText(e);
  }
  OnBeforeDestroy() {
    var t = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    InfoDisplayController_1.InfoDisplayController.RequestReadDisplayInfo(t),
      this.Iye?.Clear(),
      this.ovt?.Clear();
  }
}
exports.InfoDisplayTypeTwoView = InfoDisplayTypeTwoView;
//# sourceMappingURL=InfoDisplayTypeTwoView.js.map

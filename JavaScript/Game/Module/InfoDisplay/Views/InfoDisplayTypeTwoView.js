"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfoDisplayTypeTwoView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
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
      (this.jbe = (e) => {
        this.Cai(e);
      }),
      (this.gai = 3),
      (this.Uye = (e, t, i) => {
        return new InfoDisplayCircleAttachItem_1.InfoDisplayCircleAttachItem(e);
      }),
      (this.fai = (e, t, i) => {
        return new InfoDisplayNoCircleAttachItem_1.InfoDisplayNoCircleAttachItem(
          e,
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
    var e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    this.SHe(e), this.vai(e), this.Hxt(e);
  }
  SHe(e) {
    this.Iye?.Clear(),
      this.ovt?.Clear(),
      (this.Iye = void 0),
      (this.ovt = void 0);
    var e =
        ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
          e,
        ),
      t = this.GetItem(1);
    (e.length < this.gai
      ? ((this.ovt = new NoCircleAttachView_1.NoCircleAttachView(t.GetOwner())),
        this.ovt.CreateItems(
          this.GetItem(0).GetOwner(),
          PICTURE_DISTANCE,
          this.fai,
        ),
        this.ovt.DisableDragEvent(),
        this.ovt)
      : ((this.Iye = new CircleAttachView_1.CircleAttachView(t.GetOwner())),
        this.Iye.CreateItems(
          this.GetItem(0).GetOwner(),
          PICTURE_DISTANCE,
          this.Uye,
        ),
        this.Iye.DisableDragEvent(),
        this.Iye)
    ).ReloadView(e.length, e),
      (this.dai = e.length),
      this.GetItem(0).SetUIActive(!1),
      this.Mai();
  }
  vai(e) {
    e =
      1 <
      ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
        e,
      ).length;
    this.GetItem(8).SetUIActive(e), this.GetItem(9).SetUIActive(e);
  }
  Hxt(e) {
    this.l7e(e), this.Mai();
  }
  l7e(e) {
    var t =
        ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(
          e,
        ),
      t =
        (this.GetText(6).SetText(t),
        ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(
          e,
        ));
    this.GetText(5).SetText(t);
  }
  pai(e) {
    void 0 !== this.ovt
      ? this.ovt.AttachToNextItem(e)
      : void 0 !== this.Iye && this.Iye.AttachToNextItem(e);
  }
  Cai(e) {
    void 0 !== this.ovt
      ? this.ovt?.ScrollToItem(e)
      : void 0 !== this.Iye && this.Iye?.ScrollToItem(e),
      this.Mai();
  }
  Mai() {
    let e = 0;
    void 0 !== this.ovt
      ? (e = this.ovt.GetCurrentSelectIndex())
      : void 0 !== this.Iye && (e = this.Iye.GetCurrentSelectIndex());
    var t = e + 1 + "/" + this.dai;
    this.GetText(2).SetText(t);
  }
  OnBeforeDestroy() {
    var e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    InfoDisplayController_1.InfoDisplayController.RequestReadDisplayInfo(e),
      this.Iye?.Clear(),
      this.ovt?.Clear();
  }
  async OnBeforeHideAsync() {
    this.OpenParam?.FadeBeforeHide &&
      (await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(
        0,
        3,
      ));
  }
}
exports.InfoDisplayTypeTwoView = InfoDisplayTypeTwoView;
//# sourceMappingURL=InfoDisplayTypeTwoView.js.map

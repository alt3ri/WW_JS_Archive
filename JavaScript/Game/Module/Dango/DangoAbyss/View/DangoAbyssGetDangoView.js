"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssGetDangoView = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  UiCameraAnimationController_1 = require("../../../UiCameraAnimation/UiCameraAnimationController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  DangoAbyssActorManager_1 = require("../DangoAbyssActorManager"),
  HANDLEINDEX = 99,
  DANGOGET = "DangoGet";
class DangoAbyssGetDangoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.OpenParam = void 0),
      (this.un1 = void 0),
      (this.dn1 = void 0),
      (this.mn1 = 0),
      (this.OnClickBtnConfirm = () => {
        this.mn1++;
        var e = this.OpenParam.DataList.length;
        this.mn1 >= e ? this.CloseMe() : this.fn1();
      }),
      (this.b4c = () => {
        this.un1?.SetActive(!1), this.dn1?.SetActive(!0);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  OnHandleLoadScene() {
    DangoAbyssActorManager_1.DangoAbyssActorManager.InitIndexDangoSkeletalObserverHandle(
      HANDLEINDEX,
    );
  }
  OnHandleReleaseScene() {
    DangoAbyssActorManager_1.DangoAbyssActorManager.DestroyDangoSkeletalObserverHandle(
      HANDLEINDEX,
    );
  }
  async OnBeforeStartAsync() {
    var e = [];
    (this.un1 = new DangoGetTitlePanel()),
      e.push(this.un1.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())),
      (this.dn1 = new DangoGetDetailPanel()),
      e.push(this.dn1.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())),
      (this.dn1.OnClickCallback = this.OnClickBtnConfirm),
      await Promise.all(e);
  }
  PushCameraHandle(e, i, t) {
    UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(
      DANGOGET,
      this.GetViewId(),
      !0,
    );
  }
  PopCameraHandle(e, i, t, s) {
    UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(
      DANGOGET,
      i,
      t,
      s,
    );
  }
  OnBeforeShow() {
    this.PushCameraHandle(DANGOGET, this.GetViewId(), !0), this.fn1();
  }
  fn1() {
    this.PlaySequence("Start01", () => {
      this.b4c();
    });
    var e = this.OpenParam.DataList.length;
    this.mn1 >= e ||
      ((e = this.OpenParam.DataList[this.mn1]),
      this.un1.RefreshView(e),
      this.un1.SetActive(!0),
      this.dn1.RefreshView(e),
      this.dn1.SetActive(!1),
      ControllerHolder_1.ControllerHolder.DangoAbyssController.RefreshAbyssDangoModel(
        HANDLEINDEX,
        e.DangoId,
        "MonsterCase",
        void 0,
      ));
  }
}
exports.DangoAbyssGetDangoView = DangoAbyssGetDangoView;
class DangoGetTitlePanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UISprite],
    ];
  }
  RefreshView(e) {
    this.GetText(0).SetText(e.UnlockTitle),
      this.GetText(1).SetText(e.UnlockSubTitle),
      this.SetSpriteByPath(
        e.UnlockWutheringWaveTitleSpritePath,
        this.GetSprite(2),
        !0,
      );
  }
}
class DangoGetDetailPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.OnClickCallback = void 0),
      (this.OnClickBtnConfirm = () => {
        this.OnClickCallback?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.OnClickBtnConfirm]]);
  }
  RefreshView(e) {
    this.GetText(1).SetText(e.DetailName);
    var i = "" !== e.DetailDialog;
    this.GetText(3).SetUIActive(i),
      i && this.GetText(3).SetText(e.DetailDialog),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(6),
        "AbyssDangoLV",
        e.DangoLevel,
      );
  }
}
//# sourceMappingURL=DangoAbyssGetDangoView.js.map

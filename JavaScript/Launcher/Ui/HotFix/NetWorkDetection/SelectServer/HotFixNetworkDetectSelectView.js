"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixNetworkDetectSelectView = void 0);
const HotPatchInputDefine_1 = require("../../../../PlayerInput/HotPatchInputDefine"),
  HotPatchInputManager_1 = require("../../../../PlayerInput/HotPatchInputManager"),
  LaunchComponentsAction_1 = require("../../../LaunchComponentsAction"),
  HotFixButtonItem_1 = require("../../HotFixButtonItem"),
  HotFixLayout_1 = require("../../HotFixLayout"),
  HotFixManager_1 = require("../../HotFixManager"),
  HotFixNetworkDetectionModel_1 = require("../HotFixNetworkDetectionModel"),
  HotFixNetworkDetectSelectItem_1 = require("./HotFixNetworkDetectSelectItem");
class HotFixNetworkDetectSelectView extends LaunchComponentsAction_1.LaunchComponentsAction {
  constructor() {
    super(...arguments),
      (this.prc = void 0),
      (this.OnSelectServerCallBack = void 0),
      (this.b9i = -1),
      (this.cVc = !1),
      (this.kwc = () => {
        for (const t of this.prc.GetLayoutItemList()) t.RefreshToggleState();
      }),
      (this.OnBackBtnClick = () => {
        this.urc();
      }),
      (this.OnLeftBtnClick = () => {
        this.urc();
      }),
      (this.OnRightBtnClick = () => {
        var t =
          HotFixNetworkDetectionModel_1.HotFixNetworkDetectionModel
            .CurrentUiSelectSeverData;
        (HotFixNetworkDetectionModel_1.HotFixNetworkDetectionModel.CurrentSelectServerData =
          t),
          this.OnSelectServerCallBack?.(),
          this.urc();
      }),
      (this.$ct = (t, e) => {
        0 !== t &&
          (HotPatchInputDefine_1.axisMappings.手柄右摇杆垂直方向 === e &&
            this.GetUiScrollViewWithScrollBar(3).SetVelocity(
              t * HotPatchInputDefine_1.SCROLLBAR_INTERVAL,
            ),
          HotPatchInputDefine_1.axisMappings.手柄左摇杆垂直方向 === e) &&
          (t < 0 && this.uVc(), 0 < t) &&
          this.dVc();
      }),
      (this.Srt = (t, e) => {
        t &&
          (("手柄左边上键" !== e && "手柄左摇杆上" !== e) || this.dVc(),
          ("手柄左边下键" !== e && "手柄左摇杆下" !== e) || this.uVc());
      });
  }
  OnStart() {
    this.GetButton(1).OnClickCallBack.Bind(this.OnBackBtnClick),
      HotFixManager_1.HotFixManager.SetLocalText(
        this.GetText(2),
        "NetworkDetection_Select",
      );
    this.AttachElement(
      6,
      HotFixButtonItem_1.HotFixButtonItem,
    ).BindClickCallback(this.OnRightBtnClick);
    var t = this.AttachElement(5, HotFixButtonItem_1.HotFixButtonItem),
      t =
        (t.BindClickCallback(this.OnLeftBtnClick),
        t.SetLocalText("NetworkDetection_Cancel"),
        this.GetLayout(7)),
      e = this.GetItem(4).GetOwner();
    (this.prc = new HotFixLayout_1.HotFixLayout(
      t,
      () => {
        return new HotFixNetworkDetectSelectItem_1.HotFixNetworkDetectSelectItem();
      },
      e,
    )),
      HotPatchInputManager_1.HotPatchInputManager.RegisterInputAxis(
        HotPatchInputDefine_1.axisMappings.手柄右摇杆垂直方向,
        this.$ct,
      ),
      HotPatchInputManager_1.HotPatchInputManager.RegisterInputAction(
        "手柄左摇杆上",
        this.Srt,
      ),
      HotPatchInputManager_1.HotPatchInputManager.RegisterInputAction(
        "手柄左摇杆下",
        this.Srt,
      ),
      HotPatchInputManager_1.HotPatchInputManager.RegisterInputAction(
        "手柄左边上键",
        this.Srt,
      ),
      HotPatchInputManager_1.HotPatchInputManager.RegisterInputAction(
        "手柄左边下键",
        this.Srt,
      ),
      (this.cVc = !0);
  }
  OnShow() {
    var t =
        HotFixNetworkDetectionModel_1.HotFixNetworkDetectionModel.GetLoginServersLayoutItemData(),
      e =
        ((HotFixNetworkDetectionModel_1.HotFixNetworkDetectionModel.CurrentUiSelectSeverData =
          HotFixNetworkDetectionModel_1.HotFixNetworkDetectionModel.CurrentSelectServerData),
        this.ASi(t));
    (this.b9i =
      void 0 !==
      HotFixNetworkDetectionModel_1.HotFixNetworkDetectionModel
        .CurrentUiSelectSeverData
        ? e
        : -1),
      this.prc.RefreshByData(t),
      this.Owc(),
      this.USi(t);
  }
  Owc() {
    for (const t of this.prc.GetLayoutItemList())
      t.OnToggleStateChange = this.kwc;
  }
  OnBeforeDestroy() {
    this.prc.ClearChildren(),
      this.cVc &&
        (HotPatchInputManager_1.HotPatchInputManager.UnRegisterInputAxis(
          HotPatchInputDefine_1.axisMappings.手柄右摇杆垂直方向,
          this.$ct,
        ),
        HotPatchInputManager_1.HotPatchInputManager.UnRegisterInputAction(
          "手柄左摇杆上",
          this.Srt,
        ),
        HotPatchInputManager_1.HotPatchInputManager.UnRegisterInputAction(
          "手柄左摇杆下",
          this.Srt,
        ),
        HotPatchInputManager_1.HotPatchInputManager.UnRegisterInputAction(
          "手柄左边上键",
          this.Srt,
        ),
        HotPatchInputManager_1.HotPatchInputManager.UnRegisterInputAction(
          "手柄左边下键",
          this.Srt,
        ),
        (this.cVc = !1));
  }
  urc() {
    this.SetActive(!1);
  }
  USi(t) {
    (t = this.ASi(t)), (t = this.prc.GetGridItemByIndex(t));
    this.GetUiScrollViewWithScrollBar(3).ScrollTo(t);
  }
  ASi(e) {
    let i = 0;
    var o = e.length;
    for (let t = 0; t < o; t++)
      if (
        HotFixNetworkDetectionModel_1.HotFixNetworkDetectionModel
          .CurrentUiSelectSeverData === e[t].LoginServersData
      ) {
        i = t;
        break;
      }
    return i;
  }
  dVc() {
    (this.b9i = Math.max(0, --this.b9i)), this.mVc();
  }
  uVc() {
    (this.b9i = Math.min(this.prc.GetDataList().length - 1, ++this.b9i)),
      this.mVc();
  }
  mVc() {
    var t = this.prc.GetLayoutItemByIndex(this.b9i);
    void 0 !== t &&
      ((HotFixNetworkDetectionModel_1.HotFixNetworkDetectionModel.CurrentUiSelectSeverData =
        t.Data?.LoginServersData),
      this.GetUiScrollViewWithScrollBar(3).ScrollToSelectableComponent(
        t.GetToggle(),
      ),
      this.kwc());
  }
}
exports.HotFixNetworkDetectSelectView = HotFixNetworkDetectSelectView;
//# sourceMappingURL=HotFixNetworkDetectSelectView.js.map

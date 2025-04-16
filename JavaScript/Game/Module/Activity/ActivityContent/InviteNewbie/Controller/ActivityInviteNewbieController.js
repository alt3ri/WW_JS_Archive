"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityInviteNewbieController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Net_1 = require("../../../../../../Core/Net/Net"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine"),
  PublicUtil_1 = require("../../../../../Common/PublicUtil"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  ActivityControllerBase_1 = require("../../../ActivityControllerBase"),
  InviteNewbieDefine_1 = require("../InviteNewbieDefine"),
  InviteNewbieSubView_1 = require("../View/InviteNewbieSubView");
class ActivityInviteNewbieController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.vVc = (e) => {
        ModelManager_1.ModelManager.InviteNewbieModel.SyncActivityNotify(e);
      }),
      (this.HandleOnRewardClick = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("InviteNewbie", 64, "打开奖励页面（H5）"),
          this.mIi();
      }),
      (this.HandleOnEnterClick = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("InviteNewbie", 64, "打开活动页面（H5）"),
          this.mIi();
      }),
      (this.HandleOnCopyInviteCodeClick = () => {
        var e = ModelManager_1.ModelManager.InviteNewbieModel.InviteCode;
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("InviteNewbie", 64, "复制邀请码", ["inviteCode", e]),
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
            InviteNewbieDefine_1.COPY_INVITE_CODE,
          ),
          UE.LGUIBPLibrary.ClipBoardCopy(e);
      });
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ReferralCampaignMain";
  }
  OnCreateSubPageComponent(e) {
    return new InviteNewbieSubView_1.InviteNewbieSubView();
  }
  OnCreateActivityData(e) {
    return ModelManager_1.ModelManager.InviteNewbieModel.ActivityData;
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(21629, this.vVc);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(21629);
  }
  mIi() {
    var t = ModelManager_1.ModelManager.InviteNewbieModel.RootUrl;
    if (StringUtils_1.StringUtils.IsEmpty(t))
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("InviteNewbie", 64, "无法获取根链接");
    else {
      let e = PublicUtil_1.PublicUtil.GetExternalUrl(t, 1);
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("InviteNewbie", 64, "打开外部链接", ["url", e]),
        void 0 !== e &&
          (LocalStorage_1.LocalStorage.SetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey.InviteNewbieEntered,
            !0,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.InviteNewbieEntered,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            ModelManager_1.ModelManager.InviteNewbieModel.CurrentActivityId,
          ),
          ModelManager_1.ModelManager.InviteNewbieModel.IsInternalBrowser
            ? ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
              ? ((e = PublicUtil_1.PublicUtil.GetExtendExternalUrl(e, !0)),
                ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(
                  "",
                  e,
                ),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "InviteNewbie",
                    64,
                    "打开外部链接【带sdk，内部】",
                    ["url", e],
                  ))
              : ((e = PublicUtil_1.PublicUtil.GetExtendExternalUrl(e, !1)),
                ControllerHolder_1.ControllerHolder.KuroSdkController.OpenExternalUrl(
                  e,
                ),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "InviteNewbie",
                    64,
                    "打开外部链接【不带sdk，外部】",
                    ["url", e],
                  ))
            : ((e = PublicUtil_1.PublicUtil.GetExtendExternalUrl(e, !1)),
              ControllerHolder_1.ControllerHolder.KuroSdkController.OpenExternalUrl(
                e,
              ),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "InviteNewbie",
                  64,
                  "打开外部链接【走配置，外部】",
                  ["url", e],
                )));
    }
  }
}
exports.ActivityInviteNewbieController = ActivityInviteNewbieController;
//# sourceMappingURL=ActivityInviteNewbieController.js.map

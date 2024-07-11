"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChipHandBookView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioController_1 = require("../../../Core/Audio/AudioController"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../Ui/UiManager"),
  GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  ChipHandBookItem_1 = require("./ChipHandBookItem"),
  HandBookController_1 = require("./HandBookController"),
  HandBookDefine_1 = require("./HandBookDefine"),
  ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class ChipHandBookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Vzt = void 0),
      (this.HandBookCommonItemDataList = []),
      (this.Qzt = void 0),
      (this.Xzt = new AudioController_1.PlayResult()),
      (this.$zt = 8),
      (this.Yzt = void 0),
      (this.Jzt = 1e3),
      (this.IRe = void 0),
      (this.zzt = -0),
      (this.oUe = -0),
      (this.Zzt = 1e3),
      (this.eZt = void 0),
      (this.tZt = []),
      (this.lqe = void 0),
      (this.iZt = 60),
      (this.oZt = 10),
      (this.Refresh = () => {
        this.InitScrollView(), this.RefreshCollectText();
      }),
      (this.OnHandBookRead = (i, t) => {
        if (6 === i) {
          var e = this.tZt.length;
          for (let i = 0; i < e; i++) {
            var s = this.tZt[i],
              h = (s.RefreshNewState(), s.GetChildItemList()),
              o = h.length;
            for (let i = 0; i < o; i++) {
              var r = h[i];
              if (r.GetData().Id === t) {
                r.SetNewState(!1);
                break;
              }
            }
          }
        }
      }),
      (this.rZt = (i, t, e) => {
        var s = new ChipHandBookItem_1.ChipHandBookItem();
        return (
          s.Initialize(t),
          s.Refresh(i, !1, 0),
          s.BindToggleCallback(this.nZt),
          s.BindChildToggleCallback(this.sZt),
          this.tZt.push(s),
          { Key: e, Value: s }
        );
      }),
      (this.nZt = (i) => {
        this.ResetChipItemToggleState(), i.SelectFirstChildItem();
      }),
      (this.sZt = (i) => {
        this.Qzt = i;
        var t =
            ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(
              this.Qzt.Id,
            ),
          t =
            (this.GetText(4).SetText(t),
            ConfigManager_1.ConfigManager.HandBookConfig.GetChipTypeConfig(
              i.Type,
            )),
          t =
            (this.GetText(5).ShowTextNew(t.TypeDescription),
            ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
              this.Qzt.Id,
            )),
          e = 0 < t.length,
          s = this.GetItem(17),
          s =
            (e
              ? (s.SetUIActive(!0),
                this.SetTextureByPath(t[0], this.GetTexture(7)))
              : s.SetUIActive(!1),
            t.length),
          t =
            (LguiUtil_1.LguiUtil.SetLocalText(this.GetText(8), "RoleExp", 1, s),
            ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(
              this.Qzt.Id,
            )),
          s = 0 < t.length,
          t =
            (this.GetItem(16).SetUIActive(s),
            this.GetText(11).ShowTextNew(i.VoiceDescrtption),
            this.GetButton(12).RootUIComp.SetUIActive(!1),
            this.GetButton(13).RootUIComp.SetUIActive(!0),
            ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(
              this.Qzt.Id,
            )),
          i = 0 < t?.length,
          e = !e && !s,
          s =
            (this.GetItem(20).SetUIActive(e && i),
            this.GetText(21).SetText(t),
            this.GetItem(18).SetUIActive(!e && i),
            this.GetText(9).SetText(t),
            ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
              6,
              this.Qzt.Id,
            )),
          e =
            (void 0 !== s &&
              !s.IsRead &&
              HandBookController_1.HandBookController.SendIllustratedReadRequest(
                6,
                this.Qzt.Id,
              ),
            void 0 === s);
        this.RefreshLockState(e),
          LguiUtil_1.LguiUtil.SetLocalText(
            this.GetText(6),
            "DateOfAcquisition",
            e ? "" : s.CreateTime,
          );
      }),
      (this.aZt = (i, t) => i.Id - t.Id),
      (this.JSt = () => {
        UiManager_1.UiManager.CloseView("ChipHandBookView");
      }),
      (this.hZt = () => {
        this.GetButton(12).RootUIComp.SetUIActive(!0),
          this.GetButton(13).RootUIComp.SetUIActive(!1),
          this.Yzt ||
            (this.Yzt = (0, puerts_1.toManualReleaseDelegate)(this.lZt));
        var i =
          ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(
            this.Qzt.Id,
          );
        AudioController_1.AudioController.PostEventByUi(
          i,
          this.Xzt,
          this.$zt,
          this.Yzt,
        );
      }),
      (this._Zt = () => {
        this.GetButton(12).RootUIComp.SetUIActive(!1),
          this.GetButton(13).RootUIComp.SetUIActive(!0),
          this.Qzt &&
            (this.uZt(),
            (this.zzt = 0),
            AudioController_1.AudioController.StopEvent(this.Xzt),
            this.eZt.SetText(""));
      }),
      (this.cZt = () => {
        var i =
            ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
              this.Qzt.Id,
            ),
          t = this.Qzt.Type,
          t = ConfigManager_1.ConfigManager.HandBookConfig.GetChipTypeConfig(t),
          e = new HandBookDefine_1.HandBookPhotoData(),
          s =
            ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(
              this.Qzt.Id,
            ),
          h = [],
          s = (h.push(s), []),
          t =
            (s.push(
              MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                t.TypeDescription,
              ),
            ),
            []),
          o =
            ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(
              this.Qzt.Id,
            );
        t.push(o),
          (e.DescrtptionText = h),
          (e.TypeText = s),
          (e.NameText = t),
          (e.HandBookType = 6),
          (e.Index = 0),
          (e.TextureList = i),
          UiManager_1.UiManager.OpenView("HandBookPhotoView", e);
      }),
      (this.lZt = (i, t) => {
        3 === i &&
          ((this.oUe = Math.ceil(t.Duration / this.Jzt)),
          (this.IRe = TimerSystem_1.TimerSystem.Loop(
            () => {
              var i, t, e, s;
              (this.zzt = this.zzt + 1),
                this.zzt > this.oUe
                  ? this._Zt()
                  : ((i = this.zzt % this.iZt),
                    (t = Math.floor(this.zzt / this.iZt)),
                    (e = this.oUe % this.iZt),
                    (s = Math.floor(this.oUe / this.iZt)),
                    this.SetVoiceProgress(i, t, e, s));
            },
            this.Zzt,
            this.oUe + 1,
          )));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIVerticalLayout],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UITexture],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UIText],
      [11, UE.UIText],
      [12, UE.UIButtonComponent],
      [13, UE.UIButtonComponent],
      [14, UE.UIButtonComponent],
      [15, UE.UIText],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIText],
      [22, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [12, this._Zt],
        [13, this.hZt],
        [14, this.cZt],
      ]);
  }
  OnStart() {
    this.InitCommonTabTitle(),
      this.Refresh(),
      this.RefreshLockText(),
      (this.eZt = this.GetText(10));
  }
  RefreshLockState(i) {
    this.GetText(4).SetUIActive(!i),
      this.GetText(5).SetUIActive(!i),
      this.GetText(6).SetUIActive(!i),
      this.GetTexture(7).SetUIActive(!i),
      this.GetText(8).SetUIActive(!i),
      this.GetText(9).SetUIActive(!i),
      this.GetText(10).SetUIActive(!i),
      this.GetText(11).SetUIActive(!i),
      this.GetButton(12).RootUIComp.SetUIActive(!1),
      this.GetButton(13).RootUIComp.SetUIActive(!i),
      this.GetButton(14).RootUIComp.SetUIActive(!i),
      this.GetText(15).SetUIActive(i),
      this.GetItem(22).SetUIActive(i),
      this.GetItem(19).SetUIActive(!i),
      this.GetItem(20).SetUIActive(!i);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnHandBookDataInit,
      this.Refresh,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnHandBookDataUpdate,
        this.Refresh,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnHandBookRead,
        this.OnHandBookRead,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnHandBookDataInit,
      this.Refresh,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnHandBookDataUpdate,
        this.Refresh,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnHandBookRead,
        this.OnHandBookRead,
      );
  }
  OnAfterShow() {
    var i = 0 < this.tZt.length ? this.tZt[0] : void 0;
    i &&
      (i = 0 < (i = i.GetChildItemList()).length ? i[0] : void 0) &&
      i.GetTog().SetToggleState(1);
  }
  InitScrollView() {
    var t = ConfigCommon_1.ConfigCommon.ToList(
        ConfigManager_1.ConfigManager.HandBookConfig.GetChipTypeConfigList(),
      ),
      e = (t.sort(this.aZt), t.length);
    this.HandBookCommonItemDataList = [];
    for (let i = 0; i < e; i++) {
      var s = t[i],
        h = new HandBookDefine_1.HandBookCommonItemData(),
        o = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(6, s.Id),
        r = void 0 === o,
        o = void 0 !== o && !o.IsRead;
      (h.Icon = s.Icon),
        (h.Title = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          s.TypeDescription,
        )),
        (h.Config = s),
        (h.IsLock = r),
        (h.IsNew = o),
        this.HandBookCommonItemDataList.push(h);
    }
    this.Vzt ||
      (this.Vzt = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetVerticalLayout(2),
        this.rZt,
      )),
      this.Vzt.ClearChildren(),
      this.Vzt.RebuildLayoutByDataNew(this.HandBookCommonItemDataList),
      this.ResetChipItemToggleState();
    var n = this.tZt.length;
    let a = !1;
    for (let i = 0; i < n; i++) {
      var _ = this.tZt[i];
      if (_.CheckIsCanShowChildList()) {
        _.SelectFirstChildItem(), (a = !0);
        break;
      }
    }
    a || this.RefreshLockState(!0);
  }
  ResetChipItemToggleState() {
    var t = this.tZt.length;
    for (let i = 0; i < t; i++) this.tZt[i].SetToggleStateForce(0);
  }
  RefreshLockText() {
    var i =
      ConfigManager_1.ConfigManager.TextConfig.GetTextById("ChipHandBookLock");
    this.GetText(15).SetText(i);
  }
  InitCommonTabTitle() {
    var i =
      ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(6);
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.JSt),
      this.lqe.SetTitleLocalText(i.Name),
      this.lqe.SetTitleIcon(i.TitleIcon);
  }
  uZt() {
    TimerSystem_1.TimerSystem.Has(this.IRe) &&
      TimerSystem_1.TimerSystem.Remove(this.IRe),
      (this.IRe = void 0);
  }
  SetVoiceProgress(i, t, e, s) {
    LguiUtil_1.LguiUtil.SetLocalText(
      this.eZt,
      "VoiceProgress",
      this.TimeFormat(t),
      this.TimeFormat(i),
      this.TimeFormat(s),
      this.TimeFormat(e),
    );
  }
  TimeFormat(i) {
    return i < this.oZt ? "0" + String(i) : String(i);
  }
  RefreshCollectText() {
    var i = HandBookController_1.HandBookController.GetCollectProgress(6);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "RoleExp", i[0], i[1]),
      this.GetText(1)?.SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.Vzt && (this.Vzt.ClearChildren(), (this.Vzt = void 0)),
      this.Yzt &&
        ((0, puerts_1.releaseManualReleaseDelegate)(this.lZt),
        (this.Yzt = void 0)),
      AudioController_1.AudioController.StopEvent(this.Xzt),
      (this.zzt = 0),
      (this.oUe = 0),
      (this.eZt = void 0),
      (this.tZt = []),
      (this.HandBookCommonItemDataList = []),
      (this.Qzt = void 0);
  }
}
exports.ChipHandBookView = ChipHandBookView;
//# sourceMappingURL=ChipHandBookView.js.map

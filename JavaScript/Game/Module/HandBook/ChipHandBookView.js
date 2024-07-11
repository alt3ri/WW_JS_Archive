"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChipHandBookView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioController_1 = require("../../../Core/Audio/AudioController"),
  ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../Ui/UiManager"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  DynScrollView_1 = require("../Util/ScrollView/DynScrollView"),
  ChipHandBookItem_1 = require("./ChipHandBookItem"),
  HandBookController_1 = require("./HandBookController"),
  HandBookDefine_1 = require("./HandBookDefine"),
  HandBootChipDynamicItem_1 = require("./HandBootChipDynamicItem");
class ChipHandBookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.VZt = void 0),
      (this.ZQn = void 0),
      (this.eXn = -1),
      (this.tXn = -1),
      (this.HandBookCommonItemDataList = []),
      (this.QZt = void 0),
      (this.XZt = new AudioController_1.PlayResult()),
      (this.$Zt = 8),
      (this.YZt = void 0),
      (this.JZt = 1e3),
      (this.IRe = void 0),
      (this.zZt = -0),
      (this.oUe = -0),
      (this.ZZt = 1e3),
      (this.eei = void 0),
      (this.tei = []),
      (this.lqe = void 0),
      (this.iei = 60),
      (this.oei = 10),
      (this.zji = void 0),
      (this.Refresh = () => {
        this.InitScrollView(), this.RefreshCollectText();
      }),
      (this.OnHandBookRead = (i, t) => {
        if (6 === i) {
          var e = this.tei.length;
          for (let i = 0; i < e; i++) this.tei[i].RefreshNewState();
        }
      }),
      (this.rei = (i, t, e) => {
        var s = new ChipHandBookItem_1.ChipHandBookItem();
        return (
          s.BindToggleCallback(this.nei),
          s.BindChildToggleCallback(this.sei),
          this.tei.push(s),
          s
        );
      }),
      (this.nei = (i) => {
        this.eXn = i;
        i = this.iXn();
        this.VZt?.RefreshByData(i, !0),
          this.VZt?.BindLateUpdate(() => {
            this.VZt?.ScrollToItemIndex(this.tXn), this.VZt?.UnBindLateUpdate();
          });
      }),
      (this.sei = (i, t) => {
        (this.QZt = i), this.zji?.SetToggleStateForce(0, !1), (this.zji = t);
        var t = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
            6,
            this.QZt.Id,
          ),
          e = void 0 === t,
          s =
            (e && this.RefreshLockState(e),
            ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(
              this.QZt.Id,
            )),
          s =
            (this.GetText(4).SetText(s),
            ConfigManager_1.ConfigManager.HandBookConfig.GetChipTypeConfig(
              i.Type,
            )),
          s =
            (this.GetText(5).ShowTextNew(s.TypeDescription),
            ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
              this.QZt.Id,
            )),
          h = 0 < s.length,
          o = this.GetItem(17),
          h =
            (h
              ? (o.SetUIActive(!0),
                this.SetTextureByPath(s[0], this.GetTexture(7)))
              : o.SetUIActive(!1),
            s.length),
          o =
            (LguiUtil_1.LguiUtil.SetLocalText(this.GetText(8), "RoleExp", 1, h),
            ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(
              this.QZt.Id,
            )),
          s = 0 < o.length,
          h =
            (this.GetItem(16).SetUIActive(s),
            this.GetText(11).ShowTextNew(i.VoiceDescrtption),
            this.GetButton(12).RootUIComp.SetUIActive(!1),
            this.GetButton(13).RootUIComp.SetUIActive(!0),
            ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(
              this.QZt.Id,
            )),
          o = 0 < h?.length,
          s =
            (this.GetItem(20).SetUIActive(o),
            this.GetText(21).SetText(h),
            this.GetItem(18).SetUIActive(!1),
            void 0 !== t && !t.IsRead);
        s &&
          HandBookController_1.HandBookController.SendIllustratedReadRequest(
            6,
            this.QZt.Id,
          ),
          LguiUtil_1.LguiUtil.SetLocalText(
            this.GetText(6),
            "DateOfAcquisition",
            e ? "" : t.CreateTime,
          );
      }),
      (this.aei = (i, t) => i.Id - t.Id),
      (this.lyt = () => {
        UiManager_1.UiManager.CloseView("ChipHandBookView");
      }),
      (this.hei = () => {
        this.GetButton(12).RootUIComp.SetUIActive(!0),
          this.GetButton(13).RootUIComp.SetUIActive(!1),
          this.YZt ||
            (this.YZt = (0, puerts_1.toManualReleaseDelegate)(this.lei));
        var i =
          ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(
            this.QZt.Id,
          );
        AudioController_1.AudioController.PostEventByUi(
          i,
          this.XZt,
          this.$Zt,
          this.YZt,
        );
      }),
      (this._ei = () => {
        this.GetButton(12).RootUIComp.SetUIActive(!1),
          this.GetButton(13).RootUIComp.SetUIActive(!0),
          this.QZt &&
            (this.uei(),
            (this.zZt = 0),
            AudioController_1.AudioController.StopEvent(this.XZt),
            this.eei.SetText(""));
      }),
      (this.cei = () => {
        var i =
            ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
              this.QZt.Id,
            ),
          t = this.QZt.Type,
          t = ConfigManager_1.ConfigManager.HandBookConfig.GetChipTypeConfig(t),
          e = new HandBookDefine_1.HandBookPhotoData(),
          s =
            ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(
              this.QZt.Id,
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
              this.QZt.Id,
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
      (this.lei = (i, t) => {
        3 === i &&
          ((this.oUe = Math.ceil(t.Duration / this.JZt)),
          (this.IRe = TimerSystem_1.TimerSystem.Loop(
            () => {
              var i, t, e, s;
              (this.zZt = this.zZt + 1),
                this.zZt > this.oUe
                  ? this._ei()
                  : ((i = this.zZt % this.iei),
                    (t = Math.floor(this.zZt / this.iei)),
                    (e = this.oUe % this.iei),
                    (s = Math.floor(this.oUe / this.iei)),
                    this.SetVoiceProgress(i, t, e, s));
            },
            this.ZZt,
            this.oUe + 1,
          )));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIDynScrollViewComponent],
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
        [12, this._ei],
        [13, this.hei],
        [14, this.cei],
      ]);
  }
  OnStart() {
    this.InitCommonTabTitle(),
      this.Refresh(),
      this.RefreshLockText(),
      (this.eei = this.GetText(10));
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
  async OnBeforeStartAsync() {
    (this.ZQn = new HandBootChipDynamicItem_1.HandBootChipDynamicItem()),
      (this.VZt = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(2),
        this.GetItem(3),
        this.ZQn,
        this.rei,
      )),
      await this.VZt.Init();
  }
  InitScrollView() {
    var t = ConfigCommon_1.ConfigCommon.ToList(
        ConfigManager_1.ConfigManager.HandBookConfig.GetChipTypeConfigList(),
      ),
      e = (t.sort(this.aei), t.length);
    this.HandBookCommonItemDataList = [];
    for (let i = 0; i < e; i++) {
      var s = t[i],
        h = new HandBookDefine_1.HandBookCommonItemData(),
        o = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(6, s.Id),
        n = void 0 === o,
        o = void 0 !== o && !o.IsRead;
      (h.Icon = s.Icon),
        (h.Title = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          s.TypeDescription,
        )),
        (h.Config = s),
        (h.IsLock = n),
        (h.IsNew = o),
        this.HandBookCommonItemDataList.push(h);
    }
    var i = this.iXn();
    this.VZt?.RefreshByData(i);
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
      this.lqe.SetCloseCallBack(this.lyt),
      this.lqe.SetTitleLocalText(i.Name),
      this.lqe.SetTitleIcon(i.TitleIcon);
  }
  uei() {
    TimerSystem_1.TimerSystem.Has(this.IRe) &&
      TimerSystem_1.TimerSystem.Remove(this.IRe),
      (this.IRe = void 0);
  }
  SetVoiceProgress(i, t, e, s) {
    LguiUtil_1.LguiUtil.SetLocalText(
      this.eei,
      "VoiceProgress",
      this.TimeFormat(t),
      this.TimeFormat(i),
      this.TimeFormat(s),
      this.TimeFormat(e),
    );
  }
  TimeFormat(i) {
    return i < this.oei ? "0" + String(i) : String(i);
  }
  RefreshCollectText() {
    var i = HandBookController_1.HandBookController.GetCollectProgress(6);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "RoleExp", i[0], i[1]),
      this.GetText(1)?.SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.VZt && (this.VZt.ClearChildren(), (this.VZt = void 0)),
      this.YZt &&
        ((0, puerts_1.releaseManualReleaseDelegate)(this.lei),
        (this.YZt = void 0)),
      AudioController_1.AudioController.StopEvent(this.XZt),
      (this.zZt = 0),
      (this.oUe = 0),
      (this.eei = void 0),
      (this.tei = []),
      (this.HandBookCommonItemDataList = []),
      (this.QZt = void 0);
  }
  iXn() {
    -1 === this.eXn &&
      (this.eXn = this.HandBookCommonItemDataList[0].Config.Id);
    var t = [];
    for (const h of this.HandBookCommonItemDataList) {
      var i = this.eXn === h.Config.Id,
        e = new HandBookDefine_1.HandBookChipDynamicData();
      if (
        ((e.HandBookCommonItemData = h), (e.IsShowContent = i), t.push(e), i)
      ) {
        this.tXn = this.HandBookCommonItemDataList.indexOf(h);
        let i = !0;
        for (const o of ConfigManager_1.ConfigManager.HandBookConfig.GetChipHandBookConfigList(
          h.Config.Id,
        )) {
          var s = new HandBookDefine_1.HandBookChipDynamicData();
          (s.HandBookChipConfigId = o.Id),
            (s.IsShowContent = i),
            t.push(s),
            (i = !1);
        }
      }
    }
    return t;
  }
}
exports.ChipHandBookView = ChipHandBookView;
//# sourceMappingURL=ChipHandBookView.js.map

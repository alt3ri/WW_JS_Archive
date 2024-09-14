"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NounHandBookView = void 0);
const UE = require("ue"),
  ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../Ui/UiManager"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  DynScrollView_1 = require("../Util/ScrollView/DynScrollView"),
  HandBookController_1 = require("./HandBookController"),
  HandBookDefine_1 = require("./HandBookDefine"),
  HandBootNounDynamicItem_1 = require("./HandBootNounDynamicItem"),
  NounHandBookItem_1 = require("./NounHandBookItem");
class NounHandBookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.VZt = void 0),
      (this.W4a = void 0),
      (this.K4a = -1),
      (this._Xn = -1),
      (this.HandBookCommonItemDataList = []),
      (this.QZt = void 0),
      (this.Q4a = []),
      (this.lqe = void 0),
      (this.zji = void 0),
      (this.Refresh = () => {
        this.InitScrollView(), this.RefreshCollectText();
      }),
      (this.OnHandBookRead = (i, t) => {
        if (11 === i) {
          var e = this.Q4a.length;
          for (let i = 0; i < e; i++) this.Q4a[i].RefreshNewState();
        }
      }),
      (this.$4a = (i, t, e) => {
        var n = new NounHandBookItem_1.NounHandBookItem();
        return (
          n.BindToggleCallback(this.X4a),
          n.BindChildToggleCallback(this.Y4a),
          this.Q4a.push(n),
          n
        );
      }),
      (this.X4a = (i) => {
        this.K4a = i;
        i = this.uXn();
        this.VZt?.RefreshByData(i, !0),
          this.VZt?.BindLateUpdate(() => {
            this.VZt?.ScrollToItemIndex(this._Xn), this.VZt?.UnBindLateUpdate();
          });
      }),
      (this.Y4a = (i, t) => {
        (this.QZt = i), this.zji?.SetToggleStateForce(0, !1), (this.zji = t);
        var e,
          n,
          t = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
            11,
            this.QZt.Id,
          ),
          s = void 0 === t;
        this.RefreshLockState(s),
          s ||
            ((n =
              ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(
                this.QZt.Id,
              )),
            this.GetText(4).SetText(n),
            (n = ConfigManager_1.ConfigManager.HandBookConfig.GetNounTypeConfig(
              i.Type,
            )),
            this.GetText(5).ShowTextNew(n.TypeDescription),
            (n =
              0 <
              (i =
                ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
                  this.QZt.Id,
                )).length),
            (e = this.GetItem(17)),
            n
              ? (e.SetUIActive(!0),
                this.SetTextureByPath(i[0], this.GetTexture(7)))
              : e.SetUIActive(!1),
            (n = i.length),
            LguiUtil_1.LguiUtil.SetLocalText(this.GetText(8), "RoleExp", 1, n),
            (e =
              0 <
              ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(
                this.QZt.Id,
              ).length),
            this.GetItem(16).SetUIActive(e),
            (n =
              0 <
              (i =
                ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(
                  this.QZt.Id,
                ))?.length),
            this.GetItem(20).SetUIActive(n),
            this.GetText(21).SetText(i),
            this.GetItem(18).SetUIActive(!1),
            void 0 === t ||
              t.IsRead ||
              HandBookController_1.HandBookController.SendIllustratedReadRequest(
                11,
                this.QZt.Id,
              ),
            LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(6),
              "DateOfAcquisition",
              s ? "" : t.CreateTime,
            ));
      }),
      (this.aei = (i, t) => i.Id - t.Id),
      (this.lyt = () => {
        UiManager_1.UiManager.CloseView("NounHandBookView");
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
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
    ];
  }
  OnStart() {
    this.GetText(11).SetUIActive(!1),
      this.GetText(10).SetUIActive(!1),
      this.GetButton(13).RootUIComp.SetUIActive(!1),
      this.GetButton(14).RootUIComp.SetUIActive(!1),
      this.GetButton(12).RootUIComp.SetUIActive(!1),
      this.InitCommonTabTitle(),
      this.Refresh(),
      this.RefreshLockText();
  }
  RefreshLockState(i) {
    this.GetText(4).SetUIActive(!i),
      this.GetText(5).SetUIActive(!i),
      this.GetText(6).SetUIActive(!i),
      this.GetTexture(7).SetUIActive(!i),
      this.GetText(8).SetUIActive(!i),
      this.GetText(9).SetUIActive(!i),
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
    (this.W4a = new HandBootNounDynamicItem_1.HandBootNounDynamicItem()),
      (this.VZt = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(2),
        this.GetItem(3),
        this.W4a,
        this.$4a,
      )),
      await this.VZt.Init();
  }
  InitScrollView() {
    var t = ConfigCommon_1.ConfigCommon.ToList(
        ConfigManager_1.ConfigManager.HandBookConfig.GetNounTypeConfigList(),
      ),
      e = (t.sort(this.aei), t.length);
    this.HandBookCommonItemDataList = [];
    for (let i = 0; i < e; i++) {
      var n = t[i],
        s = new HandBookDefine_1.HandBookCommonItemData(),
        o = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(11, n.Id),
        h = void 0 === o,
        o = void 0 !== o && !o.IsRead;
      (s.Icon = n.Icon),
        (s.Title = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          n.TypeDescription,
        )),
        (s.Config = n),
        (s.IsLock = h),
        (s.IsNew = o),
        this.HandBookCommonItemDataList.push(s);
    }
    var i = this.uXn();
    this.VZt?.RefreshByData(i);
  }
  RefreshLockText() {
    var i =
      ConfigManager_1.ConfigManager.TextConfig.GetTextById("ChipHandBookLock");
    this.GetText(15).SetText(i);
  }
  InitCommonTabTitle() {
    var i =
      ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(
        11,
      );
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.lyt),
      this.lqe.SetTitleLocalText(i.Name),
      this.lqe.SetTitleIcon(i.TitleIcon);
  }
  RefreshCollectText() {
    var i = HandBookController_1.HandBookController.GetCollectProgress(11);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "RoleExp", i[0], i[1]),
      this.GetText(1)?.SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.VZt && (this.VZt.ClearChildren(), (this.VZt = void 0)),
      (this.Q4a = []),
      (this.HandBookCommonItemDataList = []),
      (this.QZt = void 0);
  }
  uXn() {
    -1 === this.K4a &&
      (this.K4a = this.HandBookCommonItemDataList[0].Config.Id);
    var t = [];
    for (const s of this.HandBookCommonItemDataList) {
      var i = this.K4a === s.Config.Id,
        e = new HandBookDefine_1.HandBookNounDynamicData();
      if (
        ((e.HandBookCommonItemData = s), (e.IsShowContent = i), t.push(e), i)
      ) {
        this._Xn = this.HandBookCommonItemDataList.indexOf(s);
        let i = !0;
        for (const o of ConfigManager_1.ConfigManager.HandBookConfig.GetNounHandBookConfigList(
          s.Config.Id,
        )) {
          var n = new HandBookDefine_1.HandBookNounDynamicData();
          (n.HandBookNounConfigId = o.Id),
            (n.IsShowContent = i),
            t.push(n),
            (i = !1);
        }
      }
    }
    return t;
  }
}
exports.NounHandBookView = NounHandBookView;
//# sourceMappingURL=NounHandBookView.js.map

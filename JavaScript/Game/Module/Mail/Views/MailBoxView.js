"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MailBoxView = exports.MailLinkButton = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ButtonAndTextItem_1 = require("../../Common/Button/ButtonAndTextItem"),
  CommonDropDown_1 = require("../../Common/DropDown/CommonDropDown"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  FunctionController_1 = require("../../Functional/FunctionController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  DynScrollView_1 = require("../../Util/ScrollView/DynScrollView"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  MailController_1 = require("../MailController"),
  MailDropDownTitle_1 = require("./MailDropDown/MailDropDownTitle"),
  MailImportantDropDownItem_1 = require("./MailDropDown/MailImportantDropDownItem"),
  MailTotalDropDownItem_1 = require("./MailDropDown/MailTotalDropDownItem"),
  MailUnReadDropDownItem_1 = require("./MailDropDown/MailUnReadDropDownItem"),
  MailDynamicScrollItemNew_1 = require("./MailLeftSideScroll/MailDynamicScrollItemNew"),
  MailScrollItemNew_1 = require("./MailLeftSideScroll/MailScrollItemNew");
class MailLinkButton extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super(),
      (this.ClickDelegate = void 0),
      (this.e0t = void 0),
      (this.eTt = () => {
        this?.ClickDelegate();
      }),
      this.CreateThenShowByActor(i.GetOwner());
  }
  SetTitle(i) {
    this.GetText(0).SetText(i);
  }
  SetColor(i) {
    this.GetText(0).SetColor(UE.Color.FromHex(i));
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite],
    ]),
      (this.BtnBindInfo = []);
  }
  OnStart() {
    (this.e0t = this.RootActor.GetComponentByClass(
      UE.UIButtonComponent.StaticClass(),
    )),
      this.e0t.OnClickCallBack.Bind(this.eTt);
  }
  OnBeforeDestroy() {
    this.ClickDelegate = void 0;
  }
}
exports.MailLinkButton = MailLinkButton;
const DEFAULT_MAIL_INDEX = 0;
class RewardItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments), (this.Onwner = void 0), (this.Mne = 0);
  }
  OnRefresh(i, t, e) {
    this.Refresh(i);
  }
  OnExtendToggleClicked() {
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
      this.Mne,
    );
  }
  OnExtendToggleStateChanged(i) {
    this.SetSelected(!1, !1);
  }
  Refresh(i) {
    var t = i[0],
      e = i[1],
      t =
        ((this.Mne = t.ItemId),
        1 === this?.Onwner?.SelectedMailData?.GetAttachmentStatus()),
      s =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
          this.Mne,
        );
    if (1 === s) {
      var o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.Mne);
      const l = {
        Data: i,
        ElementId: o.ElementId,
        Type: 2,
        IsReceivedVisible: t,
        ItemConfigId: this.Mne,
        BottomText: 0 < e ? "" + e : "",
        QualityId: o.QualityId,
      };
      void this.Apply(l);
    } else if (3 === s) {
      const l = {
        Data: i,
        Type: 3,
        IsReceivedVisible: t,
        ItemConfigId: this.Mne,
        BottomText: 0 < e ? "" + e : "",
      };
      void this.Apply(l);
    } else {
      const l = {
        Data: i,
        Type: 4,
        IsReceivedVisible: t,
        ItemConfigId: this.Mne,
        BottomText: 0 < e ? "" + e : "",
      };
      this.Apply(l);
    }
  }
}
class MailBoxView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.SelectedMailData = void 0),
      (this.Kyi = 0),
      (this.Qyi = void 0),
      (this.BSi = void 0),
      (this.Xyi = void 0),
      (this.$yi = void 0),
      (this.Yyi = void 0),
      (this.Jyi = void 0),
      (this.zyi = 1),
      (this.Zyi = void 0),
      (this.eIi = void 0),
      (this.tIi = void 0),
      (this.iIi = void 0),
      (this.qSi = (i, t) => {
        let e = void 0;
        switch (t) {
          case 1:
            e = new MailTotalDropDownItem_1.MailTotalDropDownItem(i);
            break;
          case 2:
            e = new MailImportantDropDownItem_1.MailImportantDropDownItem(i);
            break;
          case 3:
            e = new MailUnReadDropDownItem_1.MailUnReadDropDownItem(i);
            break;
          default:
            e = new MailTotalDropDownItem_1.MailTotalDropDownItem(i);
        }
        return e;
      }),
      (this.DeleteAllExhaustedMail = () => {
        var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(49);
        i.FunctionMap.set(2, () => {
          var i = this.Jyi,
            t = [];
          if (2 === this.zyi)
            for (const e of i)
              e.GetWasScanned() &&
                2 !== e.GetAttachmentStatus() &&
                t.push(e.Id);
          else
            for (const s of i)
              s.GetWasScanned() &&
                2 !== s.GetMailLevel() &&
                2 !== s.GetAttachmentStatus() &&
                t.push(s.Id);
          0 < t.length && MailController_1.MailController.RequestDeleteMail(t);
        }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            i,
          );
      }),
      (this.PickAllAccessibleAttachment = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Mail", 28, "邮件界面：一键领取");
        var i = ModelManager_1.ModelManager.MailModel.GetMailList(),
          t = [],
          e = 2 === this.zyi ? 2 : 1;
        for (const s of i)
          2 === s.GetAttachmentStatus() && s.Level >= e && t.push(s.Id);
        if (0 < t.length)
          MailController_1.MailController.RequestPickAttachment(t, 1);
        else {
          switch (this.zyi) {
            case 1:
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "MailClearAllAttachment",
              );
              break;
            case 2:
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "MailClearImportantAttachment",
              );
          }
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Mail", 28, "邮件界面：没有可领取的附件");
        }
      }),
      (this.GSi = (i) => new MailDropDownTitle_1.MailDropDownTitle(i)),
      (this.oIi = (i) =>
        ModelManager_1.ModelManager.MailModel.GetMailFilterConfigData(i)),
      (this.rIi = (t, i) => {
        var e = this.Jyi.findIndex((i) => i.Id === t);
        this.Xyi.GetScrollItemFromIndex(e).Update(this.Jyi[e], e),
          ModelManager_1.ModelManager.MailModel.SetCurrentSelectMailId(t),
          this.SelectedMailData && this.LIi(this.SelectedMailData),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Mail", 28, "邮件界面：选择邮件", ["mailId", t]);
      }),
      (this.nIi = (i) => {
        var t;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Mail", 28, "邮件界面：CallBackPickMailView领取附件"),
          this.SelectedMailData &&
            (t = this.BSi.GetDropDownItemObject(this.BSi.GetSelectedIndex())) &&
            (this.sIi(t),
            this.aIi(this.Jyi, this.Kyi),
            this.hIi(this.Kyi, this.SelectedMailData),
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info(
              "Mail",
              28,
              "邮件界面：CallBackPickMailView领取附件Finish",
            );
      }),
      (this.lIi = (i) => {
        var t;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Mail",
            28,
            "邮件界面：CallBackDeleteMailView删除邮件",
          ),
          this.SelectedMailData
            ? (this.BSi.RefreshAllDropDownItem(),
              (t = this.BSi.GetDropDownItemObject(
                this.BSi.GetSelectedIndex(),
              )) &&
                ((i = 1 < i.length ? 0 : this.Kyi),
                this.sIi(t, i),
                this.aIi(this.Jyi, this.Kyi),
                (this.SelectedMailData = this.Jyi[this.Kyi]),
                this.hIi(this.Kyi, this.SelectedMailData),
                Log_1.Log.CheckInfo()) &&
                Log_1.Log.Info(
                  "Mail",
                  28,
                  "邮件界面：CallBackDeleteMailView删除邮件结束",
                ))
            : Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Mail",
                28,
                "邮件界面：CallBackDeleteMailView没有选择邮件,没有选择邮件的时候但是却删除了邮件",
              );
      }),
      (this._Ii = () => {
        var i;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Mail",
            28,
            "邮件界面：CallBackPassivelyDeleteMailView被动删除邮件",
          ),
          this.SelectedMailData
            ? (this.BSi.RefreshAllDropDownItem(),
              (i = this.BSi.GetDropDownItemObject(
                this.BSi.GetSelectedIndex(),
              )) &&
                (this.sIi(i),
                this.aIi(this.Jyi, this.Kyi),
                (this.SelectedMailData = this.Jyi[this.Kyi]),
                this.hIi(this.Kyi, this.SelectedMailData),
                Log_1.Log.CheckInfo()) &&
                Log_1.Log.Info(
                  "Mail",
                  28,
                  "邮件界面：CallBackPassivelyDeleteMailView被动删除邮件结束",
                ))
            : Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Mail",
                28,
                "邮件界面：CallBackPassivelyDeleteMailView没有选择邮件",
              );
      }),
      (this.uIi = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Mail",
            28,
            "邮件界面：CallBackAddMailView,添加新邮件",
          );
        var i = this.BSi.GetDropDownItemObject(this.BSi.GetSelectedIndex());
        i &&
          (this.BSi.RefreshAllDropDownItem(),
          this.sIi(i),
          this.aIi(this.Jyi, this.Kyi),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "Mail",
            28,
            "邮件界面：CallBackAddMailView,添加新邮件结束",
            ["CurrentMailDataList", this.Jyi],
          );
      }),
      (this.cIi = () => {
        var i,
          t = this.SelectedMailData.GetSubContentJumpId(),
          t =
            (0 < t &&
              (this.CloseMe(),
              FunctionController_1.FunctionController.OpenFunctionRelateView(
                t,
              )),
            void 0 === this.SelectedMailData.GetSubTitle()
              ? ""
              : this.SelectedMailData.GetSubTitle());
        this.SelectedMailData.IsQuestionMail()
          ? this.mIi(
              this.SelectedMailData.GetQuestionUrl(),
              t,
              this.SelectedMailData.GetUseDefaultBrowser(),
              this.SelectedMailData.GetIfLandscape(),
            )
          : ((i = this.SelectedMailData.GetSubUrl()),
            StringUtils_1.StringUtils.IsEmpty(i) ||
              this.mIi(
                i,
                t,
                this.SelectedMailData.GetUseDefaultBrowser(),
                this.SelectedMailData.GetIfLandscape(),
              ));
      }),
      (this.I5t = () => {
        UiManager_1.UiManager.CloseView("MailBoxView");
      }),
      (this.dIi = (i, t) => {
        (this.zyi = t),
          (this.Jyi = this.BSi.GetDropDownItemObject(i).GetFilteredMailList()),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Mail",
              28,
              "邮件界面：选择下拉item OnSelectDropItem",
              ["index", i],
              ["this.CurrentMailDataList.length", this.Jyi?.length],
            ),
          (this.Kyi = 0),
          this.aIi(this.Jyi, DEFAULT_MAIL_INDEX);
      }),
      (this.CIi = () => this.Kyi ?? 0),
      (this.hIi = (i, t) => {
        i < 0 ||
          i >= this.Jyi.length ||
          !t ||
          (this.Xyi.GetScrollItemFromIndex(this.Kyi)?.OnDeselected(!0),
          (this.SelectedMailData = t),
          (this.Kyi = i),
          this.gIi(t),
          MailController_1.MailController.SelectedMail(t),
          t.SetWasScanned(1));
      }),
      (this.fIi = () => {
        var i;
        this.SelectedMailData &&
          (2 === this.SelectedMailData.GetAttachmentStatus()
            ? MailController_1.MailController.RequestPickAttachment(
                [this.SelectedMailData.Id],
                0,
              )
            : ((i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                48,
              )).FunctionMap.set(2, () => {
                ModelManager_1.ModelManager.MailModel.GetMailInstanceById(
                  ModelManager_1.ModelManager.MailModel.GetCurrentSelectMailId(),
                ) &&
                  MailController_1.MailController.RequestDeleteMail([
                    this.SelectedMailData.Id,
                  ]);
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                i,
              )));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIDynScrollViewComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIText],
      [11, UE.UIText],
      [12, UE.UIItem],
      [13, UE.UIText],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UILoopScrollViewComponent],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIItem],
    ]),
      (this.BtnBindInfo = []);
  }
  async OnBeforeStartAsync() {
    (this.BSi = new CommonDropDown_1.CommonDropDown(
      this.GetItem(1),
      this.qSi,
      this.GSi,
    )),
      await this.BSi.Init(),
      await this.pIi();
  }
  OnStart() {
    this.vIi(),
      this.MIi(),
      this.EIi(),
      this.SIi(),
      this.yIi(),
      (this.eIi = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(5))),
      this.eIi.BindCallback(this.DeleteAllExhaustedMail),
      this.eIi.RefreshText("DeleteReadedMail"),
      (this.tIi = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(4))),
      this.tIi.BindCallback(this.PickAllAccessibleAttachment),
      this.tIi.RefreshText("GetAllItem"),
      (this.iIi = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
    var i = ConfigManager_1.ConfigManager.MailConfig.GetFilterTypeList();
    this.BSi.InitScroll(i, this.oIi),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Mail", 28, "邮件界面：OnStartFinish");
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.SelectedMail,
      this.rIi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PickingAttachment,
        this.nIi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DeletingMail,
        this.lIi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DeletingMailPassively,
        this._Ii,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AddingNewMail,
        this.uIi,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.SelectedMail,
      this.rIi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PickingAttachment,
        this.nIi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DeletingMail,
        this.lIi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DeletingMailPassively,
        this._Ii,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AddingNewMail,
        this.uIi,
      );
  }
  OnBeforeDestroy() {
    this?.Qyi.Destroy(),
      this?.BSi.Destroy(),
      this?.$yi.Destroy(),
      this.Xyi.ClearChildren(),
      this.iIi.Clear();
  }
  vIi() {
    (this.Qyi = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.Qyi.SetHelpBtnActive(!1),
      this.Qyi.SetCloseBtnActive(!0),
      this.Qyi.SetCloseCallBack(this.I5t),
      this.Qyi.SetTitle(
        ConfigManager_1.ConfigManager.TextConfig.GetTextById("Mail"),
      );
  }
  SIi() {
    this.BSi.SetOnSelectCall(this.dIi);
  }
  async pIi() {
    (this.Xyi = new DynScrollView_1.DynamicScrollView(
      this.GetUIDynScrollViewComponent(2),
      this.GetItem(3),
      new MailDynamicScrollItemNew_1.MailDynamicScrollItemNew(),
      (i, t, e) => {
        var s = new MailScrollItemNew_1.MailScrollItemNew();
        return (
          s.BindSelectCall(this.hIi),
          s.BindGetSelectedIndexFunction(this.CIi),
          s
        );
      },
    )),
      await this.Xyi.Init();
  }
  MIi() {
    (this.$yi = new MailLinkButton(this.GetItem(14))),
      (this.$yi.ClickDelegate = this.cIi);
  }
  yIi() {
    (this.Zyi = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(18))),
      this.Zyi.BindCallback(this.fIi);
  }
  EIi() {
    this.Yyi = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(16),
      this.GetItem(17).GetOwner(),
      () => {
        var i = new RewardItem();
        return (i.Onwner = this), i;
      },
    );
  }
  IIi() {
    this.Xyi.GetScrollItemFromIndex(this.Kyi)?.OnDeselected(!0),
      (this.Kyi = -1);
  }
  aIi(i, t = 0) {
    this.IIi(),
      (this.Kyi = t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Mail",
          28,
          "邮件界面：刷新列表 RefreshMailScrollList",
          ["selectedIndex", t],
          ["mailList长度", i?.length],
        ),
      this.Xyi.RefreshByData(i),
      0 < i.length
        ? (this.GetItem(20).SetUIActive(!0),
          this.GetItem(21).SetUIActive(!1),
          this.tIi.SetActive(!0),
          this.eIi.SetActive(1 === this.zyi),
          this.TIi(i[t], t))
        : (this.GetItem(20).SetUIActive(!1),
          this.GetItem(21).SetUIActive(!0),
          this.tIi.SetActive(!1),
          this.eIi.SetActive(!1),
          (this.Kyi = 0));
  }
  async TIi(i, t) {
    await this.Xyi.ScrollToItemIndex(t);
    var e = this.Xyi.GetScrollItemFromIndex(t);
    e && !e.IsInit
      ? (e.SelectTrigger = !0)
      : (e?.OnSelected(!0), this.hIi(t, i));
  }
  LIi(i) {
    var t, e;
    2 === i.GetMailLevel()
      ? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(11), "ForeverValid")
      : ((e = i.GetOriginalDeadlineTimeStamp()),
        (i = i.GetFinishedDeadlineTimeStamp()),
        (e =
          TimeUtil_1.TimeUtil.CalculateMinuteGapBetweenNow(e, !0) <
          TimeUtil_1.TimeUtil.CalculateMinuteGapBetweenNow(i, !0)
            ? e
            : i),
        (i = TimeUtil_1.TimeUtil.CalculateHourGapBetweenNow(e, !0)),
        (t = TimeUtil_1.TimeUtil.CalculateMinuteGapBetweenNow(e, !0)),
        i >= CommonDefine_1.HOUR_PER_DAY
          ? ((e = TimeUtil_1.TimeUtil.CalculateDayGapBetweenNow(e, !0)),
            LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(11),
              "AfterDayAutoDelete",
              e.toFixed(0),
            ))
          : 1 < i
            ? LguiUtil_1.LguiUtil.SetLocalText(
                this.GetText(11),
                "AfterTimeAutoDelete",
                i.toFixed(0),
              )
            : (LguiUtil_1.LguiUtil.SetLocalText(
                this.GetText(11),
                "AfterMinAutoDelete",
                t.toFixed(0),
              ),
              t < 1 &&
                LguiUtil_1.LguiUtil.SetLocalText(
                  this.GetText(11),
                  "AutoDeleteInOneMinute",
                )));
  }
  DIi(i) {
    const t = [];
    i.GetAttachmentInfo().forEach((i) => {
      t.push([{ IncId: 0, ItemId: i.J4n }, i.o9n]);
    }),
      this.Yyi.ReloadData(t),
      this.GetItem(15).SetUIActive(0 < t.length);
  }
  RIi(i) {
    2 === i.GetAttachmentStatus()
      ? this.Zyi.RefreshText("GetText")
      : this.Zyi.RefreshText("DeleteText");
  }
  gIi(i) {
    var t;
    this.GetText(7).SetText(i.Title),
      this.GetText(13).SetText(i.GetText()),
      (this.GetText(13).bBestFit = !1),
      this.GetText(8).SetText(i.Sender),
      this.GetText(9).SetText(TimeUtil_1.TimeUtil.DateFormatString(i.Time)),
      StringUtils_1.StringUtils.IsBlank(i.GetSubUrl()) ||
      StringUtils_1.StringUtils.IsEmpty(i.GetSubUrl())
        ? this.$yi.GetRootItem().SetUIActive(!1)
        : (this.$yi.GetRootItem().SetUIActive(!0),
          this.$yi.SetTitle(i.GetSubText()),
          (t = i.GetSubTextColor()),
          this.$yi.SetColor(t)),
      this.LIi(i),
      this.DIi(i),
      this.RIi(i),
      this.GetItem(6).SetUIActive(2 === i.GetMailLevel()),
      this.iIi.StopSequenceByKey("Switch", !1, !0),
      this.iIi.PlayLevelSequenceByName("Switch");
  }
  sIi(i, t = 0) {
    (this.Jyi = i.GetFilteredMailList()),
      (this.Kyi = this.Jyi.findIndex((i) => i.Id === this.SelectedMailData.Id)),
      (this.Kyi = -1 === this.Kyi ? t : this.Kyi),
      (this.Kyi = MathUtils_1.MathUtils.Clamp(
        this.Kyi,
        0,
        Math.max(0, this.Jyi.length - 1),
      ));
  }
  mIi(i, t = "", e = !1, s = !0) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Mail",
        28,
        "邮件界面：OpenUrl",
        ["link", i],
        ["title", t],
        ["forceUseDefaultBrowser", e],
        ["ifLandscape", s],
      ),
      !e && ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
        ? ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(
            t,
            i,
            s,
            !1,
          )
        : ModelManager_1.ModelManager.MailModel.OpenWebBrowser(i);
  }
}
exports.MailBoxView = MailBoxView;
//# sourceMappingURL=MailBoxView.js.map

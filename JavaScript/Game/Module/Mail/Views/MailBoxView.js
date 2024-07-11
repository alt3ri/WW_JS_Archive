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
      (this.VCt = void 0),
      (this.Kyt = () => {
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
    (this.VCt = this.RootActor.GetComponentByClass(
      UE.UIButtonComponent.StaticClass(),
    )),
      this.VCt.OnClickCallBack.Bind(this.Kyt);
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
      (this.KEi = 0),
      (this.QEi = void 0),
      (this.BSi = void 0),
      (this.XEi = void 0),
      (this.$Ei = void 0),
      (this.YEi = void 0),
      (this.JEi = void 0),
      (this.zEi = 1),
      (this.ZEi = void 0),
      (this.eyi = void 0),
      (this.tyi = void 0),
      (this.iyi = void 0),
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
          var i = this.JEi,
            t = [];
          if (2 === this.zEi)
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
          e = 2 === this.zEi ? 2 : 1;
        for (const s of i)
          2 === s.GetAttachmentStatus() && s.Level >= e && t.push(s.Id);
        if (0 < t.length)
          MailController_1.MailController.RequestPickAttachment(t, 1);
        else {
          switch (this.zEi) {
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
      (this.oyi = (i) =>
        ModelManager_1.ModelManager.MailModel.GetMailFilterConfigData(i)),
      (this.ryi = (t, i) => {
        var e = this.JEi.findIndex((i) => i.Id === t);
        this.XEi.GetScrollItemFromIndex(e).Update(this.JEi[e], e),
          ModelManager_1.ModelManager.MailModel.SetCurrentSelectMailId(t),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Mail", 28, "邮件界面：选择邮件", ["mailId", t]);
      }),
      (this.nyi = (i) => {
        var t;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Mail", 28, "邮件界面：CallBackPickMailView领取附件"),
          this.SelectedMailData &&
            (t = this.BSi.GetDropDownItemObject(this.BSi.GetSelectedIndex())) &&
            (this.syi(t),
            this.ayi(this.JEi, this.KEi),
            this.hyi(this.KEi, this.SelectedMailData),
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info(
              "Mail",
              28,
              "邮件界面：CallBackPickMailView领取附件Finish",
            );
      }),
      (this.lyi = (i) => {
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
                ((i = 1 < i.length ? 0 : this.KEi),
                this.syi(t, i),
                this.ayi(this.JEi, this.KEi),
                (this.SelectedMailData = this.JEi[this.KEi]),
                this.hyi(this.KEi, this.SelectedMailData),
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
      (this._yi = () => {
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
                (this.syi(i),
                this.ayi(this.JEi, this.KEi),
                (this.SelectedMailData = this.JEi[this.KEi]),
                this.hyi(this.KEi, this.SelectedMailData),
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
      (this.uyi = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Mail",
            28,
            "邮件界面：CallBackAddMailView,添加新邮件",
          );
        var i = this.BSi.GetDropDownItemObject(this.BSi.GetSelectedIndex());
        i &&
          (this.BSi.RefreshAllDropDownItem(),
          this.syi(i),
          this.ayi(this.JEi, this.KEi),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "Mail",
            28,
            "邮件界面：CallBackAddMailView,添加新邮件结束",
            ["CurrentMailDataList", this.JEi],
          );
      }),
      (this.cyi = () => {
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
          ? this.myi(
              this.SelectedMailData.GetQuestionUrl(),
              t,
              this.SelectedMailData.GetUseDefaultBrowser(),
            )
          : ((i = this.SelectedMailData.GetSubUrl()),
            StringUtils_1.StringUtils.IsEmpty(i) ||
              this.myi(i, t, this.SelectedMailData.GetUseDefaultBrowser()));
      }),
      (this.I4t = () => {
        UiManager_1.UiManager.CloseView("MailBoxView");
      }),
      (this.dyi = (i, t) => {
        (this.zEi = t),
          (this.JEi = this.BSi.GetDropDownItemObject(i).GetFilteredMailList()),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Mail",
              28,
              "邮件界面：选择下拉item OnSelectDropItem",
              ["index", i],
              ["this.CurrentMailDataList.length", this.JEi?.length],
            ),
          (this.KEi = 0),
          this.ayi(this.JEi, DEFAULT_MAIL_INDEX);
      }),
      (this.Cyi = () => this.KEi ?? 0),
      (this.hyi = (i, t) => {
        i < 0 ||
          i >= this.JEi.length ||
          !t ||
          (this.XEi.GetScrollItemFromIndex(this.KEi)?.OnDeselected(!0),
          (this.SelectedMailData = t),
          (this.KEi = i),
          this.gyi(t),
          MailController_1.MailController.SelectedMail(t),
          t.SetWasScanned(1));
      }),
      (this.fyi = () => {
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
      await this.pyi();
  }
  OnStart() {
    this.vyi(),
      this.Myi(),
      this.Syi(),
      this.Eyi(),
      this.yyi(),
      (this.eyi = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(5))),
      this.eyi.BindCallback(this.DeleteAllExhaustedMail),
      this.eyi.RefreshText("DeleteReadedMail"),
      (this.tyi = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(4))),
      this.tyi.BindCallback(this.PickAllAccessibleAttachment),
      this.tyi.RefreshText("GetAllItem"),
      (this.iyi = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
    var i = ConfigManager_1.ConfigManager.MailConfig.GetFilterTypeList();
    this.BSi.InitScroll(i, this.oyi),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Mail", 28, "邮件界面：OnStartFinish");
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.SelectedMail,
      this.ryi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PickingAttachment,
        this.nyi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DeletingMail,
        this.lyi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DeletingMailPassively,
        this._yi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AddingNewMail,
        this.uyi,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.SelectedMail,
      this.ryi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PickingAttachment,
        this.nyi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DeletingMail,
        this.lyi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DeletingMailPassively,
        this._yi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AddingNewMail,
        this.uyi,
      );
  }
  OnBeforeDestroy() {
    this?.QEi.Destroy(),
      this?.BSi.Destroy(),
      this?.$Ei.Destroy(),
      this.XEi.ClearChildren(),
      this.iyi.Clear();
  }
  vyi() {
    (this.QEi = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.QEi.SetHelpBtnActive(!1),
      this.QEi.SetCloseBtnActive(!0),
      this.QEi.SetCloseCallBack(this.I4t),
      this.QEi.SetTitle(
        ConfigManager_1.ConfigManager.TextConfig.GetTextById("Mail"),
      );
  }
  Eyi() {
    this.BSi.SetOnSelectCall(this.dyi);
  }
  async pyi() {
    (this.XEi = new DynScrollView_1.DynamicScrollView(
      this.GetUIDynScrollViewComponent(2),
      this.GetItem(3),
      new MailDynamicScrollItemNew_1.MailDynamicScrollItemNew(),
      (i, t, e) => {
        var s = new MailScrollItemNew_1.MailScrollItemNew();
        return (
          s.BindSelectCall(this.hyi),
          s.BindGetSelectedIndexFunction(this.Cyi),
          s
        );
      },
    )),
      await this.XEi.Init();
  }
  Myi() {
    (this.$Ei = new MailLinkButton(this.GetItem(14))),
      (this.$Ei.ClickDelegate = this.cyi);
  }
  yyi() {
    (this.ZEi = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(18))),
      this.ZEi.BindCallback(this.fyi);
  }
  Syi() {
    this.YEi = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(16),
      this.GetItem(17).GetOwner(),
      () => {
        var i = new RewardItem();
        return (i.Onwner = this), i;
      },
    );
  }
  Iyi() {
    this.XEi.GetScrollItemFromIndex(this.KEi)?.OnDeselected(!0),
      (this.KEi = -1);
  }
  ayi(i, t = 0) {
    this.Iyi(),
      (this.KEi = t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Mail",
          28,
          "邮件界面：刷新列表 RefreshMailScrollList",
          ["selectedIndex", t],
          ["mailList长度", i?.length],
        ),
      this.XEi.RefreshByData(i),
      0 < i.length
        ? (this.GetItem(20).SetUIActive(!0),
          this.GetItem(21).SetUIActive(!1),
          this.tyi.SetActive(!0),
          this.eyi.SetActive(1 === this.zEi),
          this.Tyi(i[t], t))
        : (this.GetItem(20).SetUIActive(!1),
          this.GetItem(21).SetUIActive(!0),
          this.tyi.SetActive(!1),
          this.eyi.SetActive(!1),
          (this.KEi = 0));
  }
  async Tyi(i, t) {
    await this.XEi.ScrollToItemIndex(t);
    var e = this.XEi.GetScrollItemFromIndex(t);
    e && !e.IsInit
      ? (e.SelectTrigger = !0)
      : (e?.OnSelected(!0), this.hyi(t, i));
  }
  Lyi(i) {
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
  Dyi(i) {
    const t = [];
    i.GetAttachmentInfo().forEach((i) => {
      t.push([{ IncId: 0, ItemId: i.Ekn }, i.I5n]);
    }),
      this.YEi.ReloadData(t),
      this.GetItem(15).SetUIActive(0 < t.length);
  }
  Ryi(i) {
    2 === i.GetAttachmentStatus()
      ? this.ZEi.RefreshText("GetText")
      : this.ZEi.RefreshText("DeleteText");
  }
  gyi(i) {
    var t;
    this.GetText(7).SetText(i.Title),
      this.GetText(13).SetText(i.GetText()),
      (this.GetText(13).bBestFit = !1),
      this.GetText(8).SetText(i.Sender),
      this.GetText(9).SetText(TimeUtil_1.TimeUtil.DateFormatString(i.Time)),
      StringUtils_1.StringUtils.IsBlank(i.GetSubUrl()) ||
      StringUtils_1.StringUtils.IsEmpty(i.GetSubUrl())
        ? this.$Ei.GetRootItem().SetUIActive(!1)
        : (this.$Ei.GetRootItem().SetUIActive(!0),
          this.$Ei.SetTitle(i.GetSubText()),
          (t = i.GetSubTextColor()),
          this.$Ei.SetColor(t)),
      this.Lyi(i),
      this.Dyi(i),
      this.Ryi(i),
      this.GetItem(6).SetUIActive(2 === i.GetMailLevel()),
      this.iyi.StopSequenceByKey("Switch", !1, !0),
      this.iyi.PlayLevelSequenceByName("Switch");
  }
  syi(i, t = 0) {
    (this.JEi = i.GetFilteredMailList()),
      (this.KEi = this.JEi.findIndex((i) => i.Id === this.SelectedMailData.Id)),
      (this.KEi = -1 === this.KEi ? t : this.KEi),
      (this.KEi = MathUtils_1.MathUtils.Clamp(
        this.KEi,
        0,
        Math.max(0, this.JEi.length - 1),
      ));
  }
  myi(i, t = "", e = !1) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Mail",
        28,
        "邮件界面：OpenUrl",
        ["link", i],
        ["title", t],
      ),
      !e && ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
        ? ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(
            t,
            i,
            !0,
            !1,
          )
        : ModelManager_1.ModelManager.MailModel.OpenWebBrowser(i);
  }
}
exports.MailBoxView = MailBoxView;
//# sourceMappingURL=MailBoxView.js.map

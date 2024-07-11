"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteAssemblyView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  SortEntrance_1 = require("../../Common/FilterSort/Sort/View/SortEntrance"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  RouletteDefine_1 = require("../Data/RouletteDefine"),
  RouletteComponentAssembly_1 = require("../RouletteComponent/RouletteComponentAssembly"),
  RouletteController_1 = require("../RouletteController"),
  RouletteInputManager_1 = require("../RouletteInputManager"),
  RouletteAssemblyGridItem_1 = require("./RouletteAssemblyGridItem"),
  RouletteAssemblyTips_1 = require("./RouletteAssemblyTips");
class RouletteAssemblyView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.gfo = 0),
      (this.ffo = 0),
      (this.pfo = void 0),
      (this.vfo = void 0),
      (this.Mfo = void 0),
      (this.Efo = 1),
      (this.ToggleLeft = void 0),
      (this.ToggleRight = void 0),
      (this.Sfo = void 0),
      (this.yfo = void 0),
      (this.Ifo = void 0),
      (this.Tfo = void 0),
      (this.Lfo = 0),
      (this.Dfo = void 0),
      (this.lqe = void 0),
      (this.Rfo = void 0),
      (this.Mpt = void 0),
      (this.UOt = !0),
      (this.Ufo = () => {
        var t = 0 === this.Afo ? 1 : 0;
        this.Afo = t;
      }),
      (this.Ffa = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Phantom", 38, "检测到输入设备变化,切换装配界面表现", [
            "新输入类型",
            Info_1.Info.InputControllerType,
          ]),
          this.xfo();
      }),
      (this.wfo = (t) => {
        var e = this.Sfo?.GridIndex;
        (this.Sfo = t),
          void 0 !== e &&
            e !== this.Sfo.GridIndex &&
            this.pfo.GetGridByIndex(e)?.SetGridToggleState(!1),
          this.pfo.SetCurrentGridByData(t),
          (this.Afo = 1);
      }),
      (this.Bfo = (t, e) => {
        if (this.Sfo && 1 === e)
          return (
            (e = this.Sfo.GridIndex === t.GridIndex),
            Info_1.Info.IsInGamepad() && e && this.Ufo(),
            !e
          );
        return !0;
      }),
      (this.TempKeepSelect = !1),
      (this.cHe = () => {
        var t = new RouletteAssemblyGridItem_1.RouletteAssemblyGridItem();
        return (
          t.BindOnExtendToggleStateChanged(this.bfo),
          t.BindOnCanExecuteChange(this.Vbt),
          t
        );
      }),
      (this.bfo = (t) => {
        var e = t.State,
          i = t.Data,
          t = t.MediumItemGrid;
        (this.yfo = i),
          1 === e &&
            (this.Mfo.DeselectCurrentGridProxy(),
            this.Mfo.SelectGridProxy(i.Index),
            this.qfo(),
            this.RefreshTips(),
            ModelManager_1.ModelManager.RouletteModel.TryRemoveRedDotItem(
              this.yfo.Id,
            )) &&
            t.RefreshRedDot();
      }),
      (this.Vbt = (t, e, i) => {
        return !this.yfo || 1 !== i || this.yfo.Id !== t.Id;
      }),
      (this.Xpt = () => {
        var t = this.yfo,
          e = ModelManager_1.ModelManager.RouletteModel.CopyRouletteData(
            this.Sfo,
          ),
          i = 2 === t.State;
        switch (t.State) {
          case 2:
            (e.Id = 0),
              (e.Name = void 0),
              (e.State = 2),
              0 === t.GridType
                ? ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(
                    t.Id,
                    0,
                  )
                : 2 === t.GridType &&
                  ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(
                    3001,
                    0,
                    t.Id,
                  );
            break;
          case 0:
            (e.Id = t.Id),
              (e.State = 1),
              0 === t.GridType
                ? (0 !== (s = this.Sfo.Id) &&
                    ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(
                      s,
                      0,
                    ),
                  ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(
                    t.Id,
                    1,
                  ))
                : 2 === t.GridType &&
                  (0 !== (s = this.Sfo.Id) &&
                    ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(
                      3001,
                      0,
                      s,
                    ),
                  ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(
                    3001,
                    1,
                    t.Id,
                  ));
            break;
          case 1: {
            (e.Id = t.Id), (e.State = 1);
            var s = this.pfo.GetGridByValidId(t.Id),
              h = s.Data;
            (h.Id = this.Sfo.Id),
              0 === this.Sfo.Id
                ? ((h.State = 2), (h.Name = void 0))
                : (h.State = 1),
              s.RefreshGrid(h);
            const o = h.DataIndex;
            this.Gfo(o, h);
            break;
          }
        }
        this.pfo.RefreshCurrentGridData(e);
        const o = this.Sfo.DataIndex;
        this.Gfo(o, e), (this.Sfo = e), this.Esi(i), this.qfo(), this.Nfo();
      }),
      (this.Ofo = (t, e) => {
        var i = t;
        let s = 0;
        if (this.TempKeepSelect)
          (s = this.Mfo.GetSelectedGridIndex()), (this.TempKeepSelect = !1);
        else for (let t = 0; t < i.length; t++) 2 === i[t].State && (s = t);
        this.kfo(s, i);
      }),
      (this.Ffo = (t) => {
        this.OZt(1, t);
      }),
      (this.Vfo = (t) => {
        this.OZt(13, t);
      }),
      (this.Hfo = () => {
        this.jfo();
      }),
      (this.Wfo = () => {
        this.Kfo() ? this.Qfo() : this.CloseMe();
      }),
      (this.Nfo = () => {
        var t, e, i;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Phantom", 38, "保存当前轮盘数据"),
          this.Kfo() &&
            ((t = this.Tfo.get(0)),
            (e = this.Tfo.get(1)),
            (i = this.Tfo.get(2)),
            RouletteController_1.RouletteController.SaveRouletteDataRequest(
              t,
              e,
              i[0],
              !1,
            ));
      }),
      (this.OnDefaultButtonClick = () => {
        this.Afo = 0;
        var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(55);
        t.FunctionMap.set(1, () => {
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
            this.vfo.ActivateInput(!0);
        }),
          t.FunctionMap.set(2, () => {
            this.Xfo(),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
              this.vfo.ActivateInput(!0);
          }),
          t.SetCloseFunction(() => {
            this.vfo.ActivateInput(!0);
          }),
          this.vfo.ActivateInput(!1),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            t,
          );
      }),
      (this.QMa = (t) => {
        t = 1 === t ? 1 : 0;
        ModelManager_1.ModelManager.RouletteModel.SaveRouletteSelectConfig(t);
      });
  }
  OnRegisterComponent() {
    (this.gfo = Info_1.Info.OperationType),
      (this.ComponentRegisterInfos = [
        [0, UE.UIItem],
        [1, UE.UIItem],
        [2, UE.UIItem],
        [3, UE.UIExtendToggle],
        [4, UE.UIExtendToggle],
        [5, UE.UILoopScrollViewComponent],
        [6, UE.UIItem],
        [7, UE.UIItem],
        [8, UE.UIItem],
        [9, UE.UIItem],
        [10, UE.UIItem],
        [11, UE.UIExtendToggle],
        [12, UE.UIItem],
        [13, UE.UIText],
      ]),
      (this.BtnBindInfo = [
        [3, this.Ffo],
        [4, this.Vfo],
        [11, this.QMa],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.InputControllerMainTypeChange,
      this.Ffa,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRouletteItemSelect,
        this.wfo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRouletteSaveDataChange,
        this.Hfo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRouletteItemUnlock,
        this.Ufo,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.InputControllerMainTypeChange,
      this.Ffa,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRouletteItemSelect,
        this.wfo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRouletteSaveDataChange,
        this.Hfo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRouletteItemUnlock,
        this.Ufo,
      );
  }
  async OnBeforeStartAsync() {
    (this.Rfo = new RouletteAssemblyTips_1.RouletteAssemblyTips()),
      await this.Rfo.CreateByActorAsync(this.GetItem(8).GetOwner()),
      this.Rfo.SetActive(!1);
  }
  OnStart() {
    var t = this.OpenParam,
      t =
        ((this.ffo = t.RouletteType ?? 0),
        (this.Dfo = new ButtonItem_1.ButtonItem(this.GetItem(7))),
        this.Dfo.SetFunction(this.Xpt),
        this.Dfo.SetActive(!1),
        (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
        0 === this.ffo
          ? "Text_ExploreToolsTitle_Text"
          : "Text_FuncToolsTitle_Text"),
      t =
        (this.lqe.SetTitleLocalText(t),
        this.lqe.SetCloseCallBack(this.Wfo),
        (this.ToggleLeft = this.GetExtendToggle(3)),
        this.ToggleLeft.CanExecuteChange.Bind(() =>
          this.$fo(this.ToggleLeft.ToggleState, 1),
        ),
        (this.ToggleRight = this.GetExtendToggle(4)),
        this.ToggleRight.CanExecuteChange.Bind(() =>
          this.$fo(this.ToggleRight.ToggleState, 13),
        ),
        this.GetItem(9).SetUIActive(!1),
        (this.Mpt = new SortEntrance_1.SortEntrance(
          this.GetItem(10),
          this.Ofo,
        )),
        this.Mpt.SetActive(!1),
        this.Yfo(),
        this.Jfo(),
        this.GetItem(1));
    0 === this.ffo
      ? (this.pfo =
          new RouletteComponentAssembly_1.RouletteComponentAssemblyExplore())
      : (this.pfo =
          new RouletteComponentAssembly_1.RouletteComponentAssemblyFunction()),
      this.pfo.SetRootActor(t.GetOwner(), !0),
      this.zfo(),
      this.Zfo(),
      this.epo(),
      this.pfo.SetAllGridToggleSelfInteractive(!0),
      this.pfo.AddAllGridToggleCanExecuteChangeEvent(this.Bfo),
      this.tpo(),
      (this.Afo = 0),
      this.jfo();
  }
  OnBeforeHide() {
    this.ipo();
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.RouletteModel.SaveRedDotItemList(),
      this.pfo && (this.pfo.Destroy(), (this.pfo = void 0)),
      this.vfo && (this.vfo.Destroy(), (this.vfo = void 0)),
      this.Mfo && (this.Mfo.ClearGridProxies(), (this.Mfo = void 0)),
      (this.Sfo = void 0),
      this.Ifo && this.Ifo.clear(),
      this.Tfo && this.Tfo.clear(),
      this.Rfo.Destroy(),
      this.Dfo.Destroy(),
      this.lqe.Destroy(),
      this.Mpt.Destroy(),
      this.Mpt.ClearComponentsData(),
      (this.ToggleLeft = void 0),
      (this.ToggleRight = void 0);
  }
  OnBeforeShow() {
    this.UOt && (this.opo(), (this.UOt = !1));
  }
  OnTick(t) {
    var [t, e] = this.vfo.Tick(t);
    this.pfo.Refresh(t, e);
  }
  get Afo() {
    return this.Lfo;
  }
  set Afo(t) {
    switch ((this.Lfo = t)) {
      case 0:
        this.pfo.SetTipsActive(!0),
          Info_1.Info.IsInTouch()
            ? (this.pfo.RefreshTipsByText("Text_ExploreToolsChooseMobile_Text"),
              this.pfo.SetNameVisible(!1),
              this.pfo.SetRingVisible(!1))
            : Info_1.Info.IsInGamepad()
              ? (this.pfo.RefreshTipsByText("Text_ExploreToolsChoosePC_Text"),
                this.pfo.SetRingVisible(!0))
              : Info_1.Info.IsInKeyBoard() &&
                (this.pfo.RefreshTipsByText("Text_ExploreToolsChoosePC_Text"),
                this.pfo.SetRingVisible(!1)),
          this.vfo.ActivateInput(!0);
        break;
      case 1:
        this.pfo.SetTipsActive(!1),
          this.pfo.SetRingVisible(!1),
          Info_1.Info.IsInTouch() && this.pfo.SetNameVisible(!0),
          this.vfo.ActivateInput(!1),
          this.rpo(),
          this.Esi(),
          this.qfo();
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var e;
    if (1 === t.length || isNaN(Number(t[0])))
      return (
        (e = Number(t[0])),
        (e = this.Mfo?.GetGridAndScrollToByJudge(e, (t, e) => t === e.Id))
          ? [e, e]
          : void 0
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
        "configParams",
        t,
      ]);
  }
  epo() {
    this.pfo.RefreshRouletteType();
  }
  Zfo() {
    this.pfo.RefreshRoulettePlatformType(this.gfo);
  }
  zfo() {
    this.pfo.RefreshRouletteInputType();
    var t = Info_1.Info.IsInGamepad();
    this.GetItem(12).SetUIActive(t),
      t &&
        ((t =
          1 ===
          ModelManager_1.ModelManager.RouletteModel.GetRouletteSelectConfig()
            ? 1
            : 0),
        this.GetExtendToggle(11).SetToggleState(t, !1),
        (t = this.GetText(13)),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          t,
          "Text_ExploreToolsClose_Text",
          ModelManager_1.ModelManager.RouletteModel.GetRouletteKeyRichText(),
        ));
  }
  xfo() {
    this.zfo(), this.tpo(), (this.Afo = 0), this.opo();
  }
  tpo() {
    this.vfo?.Destroy(), (this.vfo = void 0);
    var t = this.GetItem(1).GetLGUISpaceAbsolutePosition(),
      t = RouletteInputManager_1.AngleCalculator.ConvertLguiPosToScreenPos(
        t.X,
        t.Y,
      ),
      e = CommonParamById_1.configCommonParamById.GetFloatConfig(
        "Roulette_Assembly_Gamepad_DeadLimit",
      );
    (this.vfo = new RouletteInputManager_1.rouletteInputManager[
      Info_1.Info.InputControllerMainType
    ](t, 0, void 0, e)),
      this.vfo.BindEvent(),
      this.vfo.OnInit(),
      this.vfo.SetIsNeedEmpty(!0);
  }
  opo() {
    this.pfo.Reset();
    var t = this.OpenParam.SelectGridIndex ?? 0;
    this.pfo.GetGridByIndex(t).SetGridToggleState(!0),
      Info_1.Info.IsInGamepad() ? (this.Afo = 0) : (this.Afo = 1);
  }
  Kfo() {
    return this.npo() || this.spo() || this.apo();
  }
  CheckIsRouletteDataDefault() {
    return 0 === this.ffo
      ? this.Tfo.get(0).toString() ===
          ModelManager_1.ModelManager.RouletteModel.GetDefaultExploreSkillIdList().toString()
      : this.Tfo.get(1).toString() ===
          ModelManager_1.ModelManager.RouletteModel.GetDefaultFunctionIdList().toString();
  }
  npo() {
    return (
      this.Tfo.get(0).toString() !==
      ModelManager_1.ModelManager.RouletteModel.ExploreSkillIdList.toString()
    );
  }
  spo() {
    return (
      this.Tfo.get(1).toString() !==
      ModelManager_1.ModelManager.RouletteModel.CurrentFunctionIdList.toString()
    );
  }
  apo() {
    return (
      this.Tfo.get(2).toString() !==
      [ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId].toString()
    );
  }
  Yfo() {
    (this.Ifo =
      ModelManager_1.ModelManager.RouletteModel.CreateAssemblyGridData()),
      (this.Tfo =
        ModelManager_1.ModelManager.RouletteModel.CreateTempAssemblyData());
  }
  hpo() {
    this.Ifo && this.Ifo.clear(),
      (this.Ifo =
        ModelManager_1.ModelManager.RouletteModel.CreateAssemblyGridData());
    var t = this.Tfo.get(2);
    this.Tfo && this.Tfo.clear(),
      (this.Tfo =
        ModelManager_1.ModelManager.RouletteModel.CreateDefaultAssemblyData(t));
  }
  Jfo() {
    this.Mfo = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(5),
      this.GetItem(6).GetOwner(),
      this.cHe,
    );
  }
  lpo(t) {
    t = this.pfo.GetGridByValidId(t.Id);
    return t ? t.Data.GridIndex + 1 : 0;
  }
  Esi(t = !1) {
    if (this.Sfo) {
      var e = this.Sfo.GridType,
        i = this.Ifo.get(e),
        s = [];
      for (let t = 0; t < i.length; t++) {
        var h = i[t];
        if (2 === e) if (i[t].ItemType !== this.Efo) continue;
        (h.State = this._po(i[t], this.Sfo)),
          (h.RelativeIndex = this.lpo(i[t])),
          s.push(h);
      }
      (this.TempKeepSelect = t), this.RefreshItemFilterSort(30, s);
    } else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Phantom", 38, "未收到选中轮盘格子数据,无法刷新");
  }
  kfo(t, e) {
    (this.yfo = void 0),
      this.Mfo.DeselectCurrentGridProxy(),
      this.GetLoopScrollViewComponent(5).RootUIComp.SetUIActive(0 < e.length),
      this.GetItem(9).SetUIActive(e.length <= 0),
      0 < e.length
        ? (this.Mfo.ReloadData(e),
          this.Mfo.IsGridDisplaying(t) || this.Mfo.ScrollToGridIndex(t),
          this.Mfo.SelectGridProxy(t, !0))
        : (Info_1.Info.IsInGamepad() && (this.Afo = 0),
          this.Rfo.SetActive(!1),
          this.qfo());
  }
  _po(t, e) {
    let i = 0;
    return (
      this.Tfo.get(e.GridType).includes(t.Id) && (i = 1),
      (i = t.Id === e.Id ? 2 : i)
    );
  }
  qfo() {
    if (this.yfo) {
      let t = void 0;
      switch (this.yfo.State) {
        case 2:
          t = "Text_PhantomTakeOff_Text";
          break;
        case 1:
          t = "Text_PhantomReplace_Text";
          break;
        case 0:
          t = "Text_PhantomPutOn_Text";
      }
      this.Dfo.SetShowText(t), this.Dfo.SetActive(!0);
    } else this.Dfo.SetActive(!1);
  }
  Gfo(t, e) {
    var i = this.Tfo.get(e.GridType);
    0 <= t && t < i.length && (this.Tfo.get(e.GridType)[t] = e.Id);
  }
  RefreshItemFilterSort(t, e) {
    this.Mpt.UpdateData(t, e), this.Mpt.SetActive(!1);
  }
  RefreshTips() {
    let t = void 0;
    switch (this.yfo.GridType) {
      case 1:
        return void this.Rfo.SetActive(!1);
      case 0:
        this.Rfo.SetActive(!0), (t = this.upo(this.yfo));
        break;
      case 2:
        this.Rfo.SetActive(!0), (t = this.cpo(this.yfo));
    }
    this.Rfo.Refresh(t);
  }
  upo(t) {
    var e = new RouletteDefine_1.AssemblyTipsData(),
      i = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(
        t.Id,
      );
    (e.GridType = 0),
      (e.GridId = t.Id),
      (e.TextMain = i.CurrentSkillInfo),
      (e.IsIconTexture = !1),
      (e.IconPath = i.BackGround),
      (e.HelpId = i?.HelpId ?? 0),
      (e.Title = t.Name),
      (e.CanSetItemNum =
        ModelManager_1.ModelManager.RouletteModel.GetExploreSkillShowSetNumById(
          t.Id,
        )),
      (e.NeedItemMap = i.Cost);
    const s = [];
    return (
      i.Authorization.forEach((t, e) => {
        s.push(t);
      }),
      (e.Authorization = s),
      e
    );
  }
  cpo(t) {
    var e = new RouletteDefine_1.AssemblyTipsData(),
      i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t.Id);
    if (
      ((e.GridType = 2),
      (e.GridId = t.Id),
      (e.BgQuality = i.QualityId),
      (e.Title = t.Name),
      (e.TextMain = i.AttributesDescription),
      (e.TextSub = i.BgDescription),
      i.ItemAccess && 0 < i.ItemAccess?.length)
    )
      for (const h of i.ItemAccess) {
        var s = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(h);
        s &&
          ((s = {
            Id: h,
            Type: s?.Type,
            Text: s?.Description,
            SortIndex: s?.SortIndex,
            Function: () => {
              SkipTaskManager_1.SkipTaskManager.RunByConfigId(h);
            },
          }),
          e.GetWayData.push(s));
      }
    return e;
  }
  rpo() {
    if (this.Sfo) {
      var e = 2 === this.Sfo.GridType;
      if ((this.GetItem(2).SetUIActive(e), e)) {
        let t = this.Efo;
        e = this.Sfo.Id;
        0 !== e &&
          ((t =
            ControllerHolder_1.ControllerHolder.SpecialItemController.IsSpecialItem(
              e,
            )
              ? 13
              : 1),
          (this.Efo = t)),
          (1 === t ? this.ToggleLeft : this.ToggleRight).SetToggleState(1);
      }
    } else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Phantom", 38, "未收到选中轮盘格子数据,无法刷新");
  }
  $fo(t, e) {
    return !t || this.Efo !== e;
  }
  OZt(t, e) {
    1 === e &&
      this.Efo !== t &&
      ((this.Efo = t),
      (1 === this.Efo ? this.ToggleRight : this.ToggleLeft).SetToggleState(0),
      this.Esi());
  }
  jfo() {
    this.qfo();
  }
  ipo() {
    var t = 0 !== ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId,
      e = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId,
      i = this.OpenParam;
    3002 === e && t
      ? RouletteController_1.RouletteController.ExploreSkillSetRequest(3001)
      : void 0 === (e = i.EndSwitchSkillId) ||
        (3001 === e && !t) ||
        RouletteController_1.RouletteController.ExploreSkillSetRequest(e);
  }
  Qfo() {
    this.Afo = 0;
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(58);
    (t.IsEscViewTriggerCallBack = !1),
      t.FunctionMap.set(1, () => {
        this.CloseMe();
      }),
      t.FunctionMap.set(2, () => {
        this.Nfo(), this.CloseMe();
      }),
      t.SetCloseFunction(() => {
        this.vfo.ActivateInput(!0);
      }),
      this.vfo.ActivateInput(!1),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        t,
      );
  }
  Xfo() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Phantom", 38, "恢复轮盘为默认状态"),
      this.pfo.ResetAllGridDefault(),
      this.hpo(),
      this.Esi(),
      this.jfo(),
      (this.Afo = 0);
  }
}
exports.RouletteAssemblyView = RouletteAssemblyView;
//# sourceMappingURL=RouletteAssemblyView.js.map

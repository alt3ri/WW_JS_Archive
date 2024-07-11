"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteAssemblyView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const SortEntrance_1 = require("../../Common/FilterSort/Sort/View/SortEntrance");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const RouletteDefine_1 = require("../Data/RouletteDefine");
const RouletteComponentAssembly_1 = require("../RouletteComponent/RouletteComponentAssembly");
const RouletteController_1 = require("../RouletteController");
const RouletteInputManager_1 = require("../RouletteInputManager");
const RouletteAssemblyGridItem_1 = require("./RouletteAssemblyGridItem");
const RouletteAssemblyTips_1 = require("./RouletteAssemblyTips");
class RouletteAssemblyView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.v0o = 0),
      (this.oPi = 0),
      (this.M0o = 0),
      (this.S0o = void 0),
      (this.E0o = void 0),
      (this.y0o = void 0),
      (this.I0o = 1),
      (this.ToggleLeft = void 0),
      (this.ToggleRight = void 0),
      (this.T0o = void 0),
      (this.L0o = void 0),
      (this.D0o = void 0),
      (this.R0o = void 0),
      (this.U0o = 0),
      (this.A0o = void 0),
      (this.lqe = void 0),
      (this.P0o = void 0),
      (this.hft = void 0),
      (this.RNt = !0),
      (this.x0o = () => {
        const t = this.w0o === 0 ? 1 : 0;
        this.w0o = t;
      }),
      (this.dKe = (t, e, i) => {
        const s = this.B0o();
        this.oPi !== s &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Phantom",
              38,
              "检测到输入设备变化,切换装配界面表现",
              ["新输入类型", s],
            ),
          this.b0o(s));
      }),
      (this.q0o = (t) => {
        const e = this.T0o?.GridIndex;
        (this.T0o = t),
          void 0 !== e &&
            e !== this.T0o.GridIndex &&
            this.S0o.GetGridByIndex(e)?.SetGridToggleState(!1),
          this.S0o.SetCurrentGridByData(t),
          (this.w0o = 1);
      }),
      (this.G0o = (t, e) => {
        if (this.T0o && e === 1)
          return (
            (e = this.T0o.GridIndex === t.GridIndex),
            this.oPi === 1 && e && this.x0o(),
            !e
          );
        return !0;
      }),
      (this.TempKeepSelect = !1),
      (this.z9e = () => {
        const t = new RouletteAssemblyGridItem_1.RouletteAssemblyGridItem();
        return (
          t.BindOnExtendToggleStateChanged(this.N0o),
          t.BindOnCanExecuteChange(this.OBt),
          t
        );
      }),
      (this.N0o = (t) => {
        const e = t.State;
        var t = t.Data;
        (this.L0o = t),
          e === 1 &&
            (this.y0o.DeselectCurrentGridProxy(),
            this.y0o.SelectGridProxy(t.Index),
            this.O0o(),
            this.RefreshTips());
      }),
      (this.OBt = (t, e, i) => {
        return !this.L0o || i !== 1 || this.L0o.Id !== t.Id;
      }),
      (this.qft = () => {
        const t = this.L0o;
        const e = ModelManager_1.ModelManager.RouletteModel.CopyRouletteData(
          this.T0o,
        );
        const i = t.State === 2;
        switch (((e.ShowIndex = !0), t.State)) {
          case 2:
            (e.Id = 0),
              (e.Name = void 0),
              (e.State = 2),
              t.GridType === 0
                ? ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(
                    t.Id,
                    0,
                  )
                : t.GridType === 2 &&
                  ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(
                    3001,
                    0,
                    t.Id,
                  );
            break;
          case 0:
            (e.Id = t.Id),
              (e.State = 1),
              t.GridType === 0
                ? ((s = this.T0o.Id) !== 0 &&
                    ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(
                      s,
                      0,
                    ),
                  ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(
                    t.Id,
                    1,
                  ))
                : t.GridType === 2 &&
                  ((s = this.T0o.Id) !== 0 &&
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
            var s = this.S0o.GetGridByValidId(t.Id);
            const h = s.Data;
            (h.Id = this.T0o.Id),
              this.T0o.Id === 0 && (h.State = 2),
              s.RefreshGrid(h);
            const r = h.DataIndex;
            this.k0o(r, h);
            break;
          }
        }
        this.S0o.RefreshCurrentGridData(e);
        const r = this.T0o.DataIndex;
        this.k0o(r, e), (this.T0o = e), this.Mni(i), this.O0o(), this.F0o();
      }),
      (this.V0o = (t, e) => {
        const i = t;
        let s = 0;
        if (this.TempKeepSelect)
          (s = this.y0o.GetSelectedGridIndex()), (this.TempKeepSelect = !1);
        else for (let t = 0; t < i.length; t++) i[t].State === 2 && (s = t);
        this.H0o(s, i);
      }),
      (this.j0o = (t) => {
        this.Ozt(1, t);
      }),
      (this.W0o = (t) => {
        this.Ozt(13, t);
      }),
      (this.K0o = () => {
        this.Q0o();
      }),
      (this.X0o = () => {
        this.$0o() ? this.Y0o() : this.CloseMe();
      }),
      (this.F0o = () => {
        let t, e, i;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Phantom", 38, "保存当前轮盘数据"),
          this.$0o() &&
            ((t = this.R0o.get(0)),
            (e = this.R0o.get(1)),
            (i = this.R0o.get(2)),
            RouletteController_1.RouletteController.SaveRouletteDataRequest(
              t,
              e,
              i[0],
              !1,
            ));
      }),
      (this.OnDefaultButtonClick = () => {
        this.w0o = 0;
        const t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(55);
        t.FunctionMap.set(1, () => {
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
            this.E0o.ActivateInput(!0);
        }),
          t.FunctionMap.set(2, () => {
            this.J0o(),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
              this.E0o.ActivateInput(!0);
          }),
          t.SetCloseFunction(() => {
            this.E0o.ActivateInput(!0);
          }),
          this.E0o.ActivateInput(!1),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            t,
          );
      });
  }
  OnRegisterComponent() {
    (this.v0o = ModelManager_1.ModelManager.PlatformModel.OperationType),
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
      ]),
      (this.BtnBindInfo = [
        [3, this.j0o],
        [4, this.W0o],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnPlatformChanged,
      this.dKe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRouletteItemSelect,
        this.q0o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRouletteSaveDataChange,
        this.K0o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRouletteItemUnlock,
        this.x0o,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPlatformChanged,
      this.dKe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRouletteItemSelect,
        this.q0o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRouletteSaveDataChange,
        this.K0o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRouletteItemUnlock,
        this.x0o,
      );
  }
  async OnBeforeStartAsync() {
    (this.P0o = new RouletteAssemblyTips_1.RouletteAssemblyTips()),
      await this.P0o.CreateByActorAsync(this.GetItem(8).GetOwner()),
      this.P0o.SetActive(!1);
  }
  OnStart() {
    var t = this.OpenParam;
    var t =
      ((this.M0o = t.RouletteType ?? 0),
      (this.oPi = this.B0o()),
      (this.A0o = new ButtonItem_1.ButtonItem(this.GetItem(7))),
      this.A0o.SetFunction(this.qft),
      this.A0o.SetActive(!1),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.M0o === 0
        ? "Text_ExploreToolsTitle_Text"
        : "Text_FuncToolsTitle_Text");
    var t =
      (this.lqe.SetTitleLocalText(t),
      this.lqe.SetCloseCallBack(this.X0o),
      (this.ToggleLeft = this.GetExtendToggle(3)),
      this.ToggleLeft.CanExecuteChange.Bind(() =>
        this.z0o(this.ToggleLeft.ToggleState, 1),
      ),
      (this.ToggleRight = this.GetExtendToggle(4)),
      this.ToggleRight.CanExecuteChange.Bind(() =>
        this.z0o(this.ToggleRight.ToggleState, 13),
      ),
      this.GetItem(9).SetUIActive(!1),
      (this.hft = new SortEntrance_1.SortEntrance(this.GetItem(10), this.V0o)),
      this.hft.SetActive(!1),
      this.Z0o(),
      this.efo(),
      this.GetItem(1));
    this.M0o === 0
      ? (this.S0o =
          new RouletteComponentAssembly_1.RouletteComponentAssemblyExplore())
      : (this.S0o =
          new RouletteComponentAssembly_1.RouletteComponentAssemblyFunction()),
      this.S0o.SetRootActor(t.GetOwner(), !0),
      this.tfo(),
      this.ifo(),
      this.ofo(),
      this.S0o.SetAllGridToggleSelfInteractive(!0),
      this.S0o.AddAllGridToggleCanExecuteChangeEvent(this.G0o),
      this.rfo(),
      (this.w0o = 0),
      this.Q0o();
  }
  OnBeforeHide() {
    this.nfo();
  }
  OnBeforeDestroy() {
    this.S0o && (this.S0o.Destroy(), (this.S0o = void 0)),
      this.E0o && (this.E0o.Destroy(), (this.E0o = void 0)),
      this.y0o && (this.y0o.ClearGridProxies(), (this.y0o = void 0)),
      (this.T0o = void 0),
      this.D0o && this.D0o.clear(),
      this.R0o && this.R0o.clear(),
      this.P0o.Destroy(),
      this.A0o.Destroy(),
      this.lqe.Destroy(),
      this.hft.Destroy(),
      this.hft.ClearComponentsData(),
      (this.ToggleLeft = void 0),
      (this.ToggleRight = void 0);
  }
  OnBeforeShow() {
    this.RNt && (this.sfo(), (this.RNt = !1));
  }
  OnTick(t) {
    var [t, e] = this.E0o.Tick(t);
    this.S0o.Refresh(t, e);
  }
  get w0o() {
    return this.U0o;
  }
  set w0o(t) {
    switch ((this.U0o = t)) {
      case 0:
        switch ((this.S0o.SetTipsActive(!0), this.oPi)) {
          case 2:
            this.S0o.RefreshTipsByText("Text_ExploreToolsChooseMobile_Text"),
              this.S0o.SetNameVisible(!1),
              this.S0o.SetRingVisible(!1);
            break;
          case 1:
            this.S0o.RefreshTipsByText("Text_ExploreToolsChoosePC_Text"),
              this.S0o.SetRingVisible(!0);
            break;
          case 0:
            this.S0o.RefreshTipsByText("Text_ExploreToolsChoosePC_Text"),
              this.S0o.SetRingVisible(!1);
        }
        this.E0o.ActivateInput(!0);
        break;
      case 1:
        this.S0o.SetTipsActive(!1),
          this.S0o.SetRingVisible(!1),
          this.oPi === 2 && this.S0o.SetNameVisible(!0),
          this.E0o.ActivateInput(!1),
          this.afo(),
          this.Mni(),
          this.O0o();
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    let e;
    if (t.length === 1 || isNaN(Number(t[0])))
      return (
        (e = Number(t[0])),
        (e = this.y0o?.GetGridAndScrollToByJudge(e, (t, e) => t === e.Id))
          ? [e, e]
          : void 0
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
        "configParams",
        t,
      ]);
  }
  ofo() {
    this.S0o.RefreshRouletteType();
  }
  ifo() {
    this.S0o.RefreshRoulettePlatformType(this.v0o);
  }
  tfo() {
    this.S0o.RefreshRouletteInputType(this.oPi);
  }
  b0o(t) {
    (this.oPi = t), this.tfo(), this.rfo(), (this.w0o = 0), this.sfo();
  }
  B0o() {
    let t = void 0;
    return (
      ModelManager_1.ModelManager.PlatformModel.IsGamepad()
        ? (t = 1)
        : ModelManager_1.ModelManager.PlatformModel.IsPc()
          ? (t = 0)
          : ModelManager_1.ModelManager.PlatformModel.IsMobile() && (t = 2),
      t
    );
  }
  rfo() {
    this.E0o?.Destroy(), (this.E0o = void 0);
    var t = this.GetItem(1).GetLGUISpaceAbsolutePosition();
    var t = RouletteInputManager_1.AngleCalculator.ConvertLguiPosToScreenPos(
      t.X,
      t.Y,
    );
    (this.E0o = new RouletteInputManager_1.rouletteInputManager[this.oPi](
      t,
      0,
    )),
      this.E0o.BindEvent(),
      this.E0o.OnInit(),
      this.E0o.SetIsNeedEmpty(!1);
  }
  sfo() {
    this.S0o.Reset();
    const t = this.OpenParam.SelectGridIndex ?? 0;
    this.S0o.GetGridByIndex(t).SetGridToggleState(!0),
      this.oPi === 1 ? (this.w0o = 0) : (this.w0o = 1);
  }
  $0o() {
    return this.hfo() || this.lfo() || this._fo();
  }
  CheckIsRouletteDataDefault() {
    return this.M0o === 0
      ? this.R0o.get(0).toString() ===
          ModelManager_1.ModelManager.RouletteModel.GetDefaultExploreSkillIdList().toString()
      : this.R0o.get(1).toString() ===
          ModelManager_1.ModelManager.RouletteModel.GetDefaultFunctionIdList().toString();
  }
  hfo() {
    return (
      this.R0o.get(0).toString() !==
      ModelManager_1.ModelManager.RouletteModel.ExploreSkillIdList.toString()
    );
  }
  lfo() {
    return (
      this.R0o.get(1).toString() !==
      ModelManager_1.ModelManager.RouletteModel.CurrentFunctionIdList.toString()
    );
  }
  _fo() {
    return (
      this.R0o.get(2).toString() !==
      [ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId].toString()
    );
  }
  Z0o() {
    (this.D0o =
      ModelManager_1.ModelManager.RouletteModel.CreateAssemblyGridData()),
      (this.R0o =
        ModelManager_1.ModelManager.RouletteModel.CreateTempAssemblyData());
  }
  ufo() {
    this.D0o && this.D0o.clear(),
      (this.D0o =
        ModelManager_1.ModelManager.RouletteModel.CreateAssemblyGridData());
    const t = this.R0o.get(2);
    this.R0o && this.R0o.clear(),
      (this.R0o =
        ModelManager_1.ModelManager.RouletteModel.CreateDefaultAssemblyData(t));
  }
  efo() {
    this.y0o = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(5),
      this.GetItem(6).GetOwner(),
      this.z9e,
    );
  }
  cfo(t) {
    t = this.S0o.GetGridByValidId(t.Id);
    return t ? t.Data.GridIndex + 1 : 0;
  }
  Mni(t = !1) {
    if (this.T0o) {
      const e = this.T0o.GridType;
      const i = this.D0o.get(e);
      const s = [];
      for (let t = 0; t < i.length; t++) {
        const h = i[t];
        if (e === 2) if (i[t].ItemType !== this.I0o) continue;
        (h.State = this.mfo(i[t], this.T0o)),
          (h.RelativeIndex = this.cfo(i[t])),
          s.push(h);
      }
      (this.TempKeepSelect = t), this.RefreshItemFilterSort(30, s);
    } else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Phantom", 38, "未收到选中轮盘格子数据,无法刷新");
  }
  H0o(t, e) {
    (this.L0o = void 0),
      this.y0o.DeselectCurrentGridProxy(),
      this.GetLoopScrollViewComponent(5).RootUIComp.SetUIActive(e.length > 0),
      this.GetItem(9).SetUIActive(e.length <= 0),
      e.length > 0
        ? (this.y0o.ReloadData(e),
          this.y0o.IsGridDisplaying(t) || this.y0o.ScrollToGridIndex(t),
          this.y0o.SelectGridProxy(t, !0))
        : (this.oPi === 1 && (this.w0o = 0),
          this.P0o.SetActive(!1),
          this.O0o());
  }
  mfo(t, e) {
    let i = 0;
    return (
      this.R0o.get(e.GridType).includes(t.Id) && (i = 1),
      (i = t.Id === e.Id ? 2 : i)
    );
  }
  O0o() {
    if (this.L0o) {
      let t = void 0;
      switch (this.L0o.State) {
        case 2:
          t = "Text_PhantomTakeOff_Text";
          break;
        case 1:
          t = "Text_PhantomReplace_Text";
          break;
        case 0:
          t = "Text_PhantomPutOn_Text";
      }
      this.A0o.SetShowText(t), this.A0o.SetActive(!0);
    } else this.A0o.SetActive(!1);
  }
  k0o(t, e) {
    const i = this.R0o.get(e.GridType);
    t >= 0 && t < i.length && (this.R0o.get(e.GridType)[t] = e.Id);
  }
  RefreshItemFilterSort(t, e) {
    this.hft.UpdateData(t, e), this.hft.SetActive(!1);
  }
  RefreshTips() {
    let t = void 0;
    switch (this.L0o.GridType) {
      case 1:
        return void this.P0o.SetActive(!1);
      case 0:
        this.P0o.SetActive(!0), (t = this.dfo(this.L0o));
        break;
      case 2:
        this.P0o.SetActive(!0), (t = this.Cfo(this.L0o));
    }
    this.P0o.Refresh(t);
  }
  dfo(t) {
    const e = new RouletteDefine_1.AssemblyTipsData();
    const i = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(
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
  Cfo(t) {
    const e = new RouletteDefine_1.AssemblyTipsData();
    const i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t.Id);
    if (
      ((e.GridType = 2),
      (e.GridId = t.Id),
      (e.BgQuality = i.QualityId),
      (e.Title = t.Name),
      (e.TextMain = i.AttributesDescription),
      (e.TextSub = i.BgDescription),
      i.ItemAccess && i.ItemAccess?.length > 0)
    )
      for (const h of i.ItemAccess) {
        let s = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(h);
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
  afo() {
    if (this.T0o) {
      let e = this.T0o.GridType === 2;
      if ((this.GetItem(2).SetUIActive(e), e)) {
        let t = this.I0o;
        e = this.T0o.Id;
        e !== 0 &&
          ((t =
            ControllerHolder_1.ControllerHolder.SpecialItemController.IsSpecialItem(
              e,
            )
              ? 13
              : 1),
          (this.I0o = t)),
          (t === 1 ? this.ToggleLeft : this.ToggleRight).SetToggleState(1);
      }
    } else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Phantom", 38, "未收到选中轮盘格子数据,无法刷新");
  }
  z0o(t, e) {
    return !t || this.I0o !== e;
  }
  Ozt(t, e) {
    e === 1 &&
      this.I0o !== t &&
      ((this.I0o = t),
      (this.I0o === 1 ? this.ToggleRight : this.ToggleLeft).SetToggleState(0),
      this.Mni());
  }
  Q0o() {
    this.O0o();
  }
  nfo() {
    const t =
      ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId !== 0;
    let e = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
    const i = this.OpenParam;
    e === 3002 && t
      ? RouletteController_1.RouletteController.ExploreSkillSetRequest(3001)
      : void 0 === (e = i.EndSwitchSkillId) ||
        (e === 3001 && !t) ||
        RouletteController_1.RouletteController.ExploreSkillSetRequest(e);
  }
  Y0o() {
    this.w0o = 0;
    const t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(58);
    (t.IsEscViewTriggerCallBack = !1),
      t.FunctionMap.set(1, () => {
        this.CloseMe();
      }),
      t.FunctionMap.set(2, () => {
        this.F0o(), this.CloseMe();
      }),
      t.SetCloseFunction(() => {
        this.E0o.ActivateInput(!0);
      }),
      this.E0o.ActivateInput(!1),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        t,
      );
  }
  J0o() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Phantom", 38, "恢复轮盘为默认状态"),
      this.S0o.ResetAllGridDefault(),
      this.ufo(),
      this.Mni(),
      this.Q0o(),
      (this.w0o = 0);
  }
}
exports.RouletteAssemblyView = RouletteAssemblyView;
// # sourceMappingURL=RouletteAssemblyView.js.map

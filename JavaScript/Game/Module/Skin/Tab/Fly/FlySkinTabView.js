"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlySkinTabView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  EffectUtil_1 = require("../../../../Utils/EffectUtil"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager"),
  UiSceneManager_1 = require("../../../UiComponent/UiSceneManager"),
  UiModelUtil_1 = require("../../../UiModel/UiModelUtil"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  FlySkinChildTabItem_1 = require("./FlySkinChildTabItem"),
  FlySkinDefine_1 = require("./FlySkinDefine"),
  FlySkinGridItem_1 = require("./FlySkinGridItem"),
  FlySkinObtainItem_1 = require("./FlySkinObtainItem");
class FlySkinTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.yil = void 0),
      (this.WBc = void 0),
      (this.GridLayout = void 0),
      (this.ObtainLayout = void 0),
      (this.Qgc = void 0),
      (this.mNc = void 0),
      (this.fNc = void 0),
      (this.gNc = void 0),
      (this.E_1 = 0),
      (this.I_1 = !1),
      (this.CNc = !1),
      (this.Lm1 = void 0),
      (this.wm1 = !1),
      (this.Am1 = () => {
        this.st1();
      }),
      (this.CanTabToggleChange = () => {
        var i;
        return (
          !!Info_1.Info.IsInGamepad() ||
          ((i = CommonParamById_1.configCommonParamById.GetIntConfig(
            "panel_interval_time",
          )),
          0 === this.E_1) ||
          Time_1.Time.Now - this.E_1 >= i
        );
      }),
      (this.XBc = (i) => {
        1 === i && (this.ChangeSelectedTab(0), (this.E_1 = Time_1.Time.Now));
      }),
      (this.YBc = (i) => {
        1 === i && (this.ChangeSelectedTab(1), (this.E_1 = Time_1.Time.Now));
      }),
      (this.zBc = (i) => {
        this.UpdateUiShowState(1 === i, !0);
      }),
      (this.JBc = (i) => {
        this.UpdateIsApplyToAll(1 === i), this.RefreshConfirmBtnState();
      }),
      (this.W2e = () => {
        var i = new FlySkinGridItem_1.FlySkinGridItem();
        return (
          i.BindOnExtendToggleStateChanged(this.SGc),
          i.BindOnCanExecuteChange(this.MGc),
          i
        );
      }),
      (this.SGc = (i) => {
        (i = i.Data.SkinId), (i = this.WBc.GetGridIndexBySkinId(i));
        void 0 !== i && this.SelectGridByIndex(i);
      }),
      (this.MGc = (i) => {
        i = i.SkinId;
        return this.WBc.SelectedFlySkinId !== i;
      }),
      (this.qil = () => new FlySkinObtainItem_1.FlySkinObtainItem()),
      (this.EGc = () => {
        var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(294);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          i,
        );
      }),
      (this.tWt = () => {
        var i = this.WBc;
        const t = i.SelectedFlySkinId,
          e = i.SelectedFlySkinType;
        var s = i.RoleDataId;
        i.IsApplyToAll
          ? ((i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              293,
            )).FunctionMap.set(2, () => {
              0 === t
                ? ControllerHolder_1.ControllerHolder.FlySkinController.FlySkinAllUnLoadRequest(
                    e,
                  )
                : ControllerHolder_1.ControllerHolder.FlySkinController.FlySkinWearAllRoleRequest(
                    t,
                  ),
                this.UpdateIsApplyToAll(!1),
                this.RefreshConfirmBtnState();
            }),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              i,
            ))
          : 0 === t
            ? ((i =
                ModelManager_1.ModelManager.FlySkinModel.GetRoleEquipFlySkinId(
                  s,
                  e,
                )),
              ControllerHolder_1.ControllerHolder.FlySkinController.FlySkinUnLoadRequest(
                s,
                i,
              ))
            : ControllerHolder_1.ControllerHolder.FlySkinController.FlySkinWearRequest(
                s,
                t,
              );
      }),
      (this.tkc = (i, t, e, s) => {
        var n = this.WBc;
        t === n.SelectedFlySkinType &&
          i === n.RoleDataId &&
          (void 0 !== (t = n.GetGridIndexBySkinId(e)) &&
            this.GridLayout.GetLayoutItemByIndex(t)?.RefreshEquipState(),
          void 0 !== (i = n.GetGridIndexBySkinId(s))) &&
          this.GridLayout.GetLayoutItemByIndex(i)?.RefreshEquipState();
      }),
      (this.IGc = (i, t) => {
        this.xm1();
      }),
      (this.TGc = (i, t) => {
        this.xm1();
      }),
      (this.bGc = (i) => {
        this.xm1();
      }),
      (this.pNc = (i) => {
        this.xm1();
      }),
      (this.mmo = (i) => {
        i.HandleName === this.Lm1 &&
          ((this.Lm1 = void 0),
          this.wm1 || ((this.wm1 = !0), this.TryLoadModel()));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UILayoutBase],
      [2, UE.UIItem],
      [3, UE.UIExtendToggle],
      [4, UE.UIItem],
      [5, UE.UILayoutBase],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UIExtendToggle],
      [11, UE.UIButtonComponent],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[11, this.EGc]]);
  }
  async OnBeforeStartAsync() {
    (this.Qgc = new ButtonItem_1.ButtonItem()),
      (this.mNc = new FlySkinChildTabItem_1.FlySkinChildTabItem()),
      (this.fNc = new FlySkinChildTabItem_1.FlySkinChildTabItem()),
      await Promise.all([
        this.Qgc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()),
        this.mNc.CreateThenShowByActorAsync(this.GetItem(12).GetOwner()),
        this.fNc.CreateThenShowByActorAsync(this.GetItem(13).GetOwner()),
      ]),
      this.Qgc.SetFunction(this.tWt),
      this.mNc.Update(1),
      this.fNc.Update(0);
  }
  OnStart() {
    (this.yil = this.ExtraParams),
      (this.WBc = this.yil.FlySkinTabViewModel),
      this.mNc.SetItemToggleState(0, !1),
      this.fNc.SetItemToggleState(0, !1),
      (this.gNc = void 0),
      this.WBc.ResetSelectedTab(),
      this.mNc.AddItemToggleStateChange(this.XBc),
      this.fNc.AddItemToggleStateChange(this.YBc),
      this.mNc.SetCanItemToggleStateChange(this.CanTabToggleChange),
      this.fNc.SetCanItemToggleStateChange(this.CanTabToggleChange),
      this.GetExtendToggle(3).OnStateChange.Add(this.zBc),
      this.GetExtendToggle(10).OnStateChange.Add(this.JBc),
      (this.GridLayout = new GenericLayout_1.GenericLayout(
        this.GetLayoutBase(1),
        this.W2e,
        this.GetItem(2).GetOwner(),
      )),
      (this.ObtainLayout = new GenericLayout_1.GenericLayout(
        this.GetLayoutBase(5),
        this.qil,
        this.GetItem(6).GetOwner(),
      )),
      this.ZBc();
  }
  OnBeforeDestroy() {
    this.ekc();
  }
  OnBeforeShow() {
    (this.E_1 = 0), (this.wm1 = !1), this.yil.ChangeModelState(2);
    var i =
      ModelManager_1.ModelManager.FlySkinModel.GetRoleEquipParaglidingSkinId(
        this.WBc.RoleDataId,
      );
    this.UpdateView({
      Tab: 0,
      SelectedSkinId: i ?? 0,
      UiShowState: !0,
      IsApplyToAll: !1,
    });
  }
  OnAfterShow() {
    (this.I_1 = !0), this.T_1(), this.b_1();
  }
  Pm1() {
    var i,
      t = this.yil.GliderObserver?.Model;
    t &&
      (UiModelUtil_1.UiModelUtil.SetVisible(t, !1),
      2 === t?.CheckGetComponent(0)?.GetModelLoadState()) &&
      ((i = this.WBc.SelectedFlySkinType),
      (i = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinSpawnEffectId(i)),
      UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(t, i));
  }
  OnBeforeHide() {
    this.st1();
  }
  st1() {
    (this.Lm1 = void 0),
      (this.wm1 = !1),
      (this.I_1 = !1),
      this.Pm1(),
      this.R_1();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRoleFlySkinChange,
      this.tkc,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFlySkinEquipResponse,
        this.IGc,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFlySkinUnLoadResponse,
        this.TGc,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFlySkinEquipToAllRoleResponse,
        this.bGc,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFlySkinAllUnLoadResponse,
        this.pNc,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
        this.mmo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkinRootViewDestroy,
        this.Am1,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRoleFlySkinChange,
      this.tkc,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFlySkinEquipResponse,
        this.IGc,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFlySkinUnLoadResponse,
        this.TGc,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFlySkinEquipToAllRoleResponse,
        this.bGc,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFlySkinAllUnLoadResponse,
        this.pNc,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
        this.mmo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkinRootViewDestroy,
        this.Am1,
      );
  }
  ZBc() {
    UiSceneManager_1.UiSceneManager.InitGliderSkeletalHandle();
    var i = UiSceneManager_1.UiSceneManager.GetGliderSkeletalHandle();
    i.Model.CheckGetComponent(1).SetTransformByTag(
      FlySkinDefine_1.DEFAULT_FLY_SKIN_CASE,
    ),
      (this.yil.GliderObserver = i);
  }
  ekc() {
    UiSceneManager_1.UiSceneManager.DestroyGliderSkeletalHandle(),
      (this.yil.GliderObserver = void 0);
  }
  UpdateView(i) {
    this.UpdateIsApplyToAll(i.IsApplyToAll),
      this.UpdateUiShowState(i.UiShowState, !1),
      this.SelectTab(i.Tab, i.SelectedSkinId);
  }
  SelectTab(i, t) {
    var e = this.WBc;
    e.SelectTab(i);
    const s = this.WBc.GetGridIndexBySkinId(t);
    e.SelectGridByIndex(s);
    i = this.GetTabItem(e.SelectedTab);
    this.gNc?.SetItemToggleState(0, !1),
      (this.gNc = i).SetItemToggleState(1, !1),
      this.T_1(),
      this.GridLayout.RefreshByData(e.GridDataList, () => {
        this.GridLayout.SelectGridProxy(s, !1);
      }),
      this.OnGridSelected();
  }
  SelectGridByIndex(i) {
    this.WBc.SelectGridByIndex(i),
      this.GridLayout.SelectGridProxy(i),
      this.OnGridSelected();
  }
  OnGridSelected() {
    var i = this.WBc,
      t = i.SelectedGridData,
      e = t?.GetIsLock() ?? !0;
    this.ObtainLayout.SetActive(e),
      e && this.ObtainLayout.RefreshByData(i.GetWayDataList),
      this.RefreshConfirmBtnState(),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), t.GetName()),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(8),
        t.GetTypeDescription(),
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.GetDescription()),
      this.TryLoadModel();
  }
  TryLoadModel() {
    var i = this.WBc,
      t = this.yil.GliderObserver?.Model;
    if (t)
      if (this.wm1) {
        var e = ConfigManager_1.ConfigManager.SkinConfig,
          s = i.SelectedFlySkinType,
          n = i.SelectedGridData;
        const r = n.GetStandAnimPath();
        var h = e.GetFlySkinSpawnEffectId(s),
          e = e.GetFlySkinSpawnMaterialController(s),
          s = EffectUtil_1.EffectUtil.GetEffectPath(h);
        const o = EffectUtil_1.EffectUtil.GetEffectPath(e);
        h = [r, s, o];
        const a = t.CheckGetComponent(2),
          _ = t.CheckGetComponent(1);
        _.SetTransformByTag(i.ModelCase);
        a.LoadModelByModelId(
          n.GetModelId(),
          !0,
          () => {
            var i,
              t,
              e = this.yil.GliderObserver?.Model;
            e &&
              (UiModelUtil_1.UiModelUtil.SetVisible(e, !0),
              (i = a?.GetLoadedResource(r)) ||
                (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "UiCommon",
                    43,
                    "[FlySkin] 飞行皮肤待机动画预加载失败",
                  )),
              e.CheckGetComponent(10).PlayAnimation(i, !0),
              (i = e.CheckGetComponent(5)),
              (t = a.GetLoadedResource(o)) && i?.AddRenderingMaterialByData(t),
              UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(e, "GliderEffect"));
          },
          h,
        );
      } else {
        UiModelUtil_1.UiModelUtil.SetVisible(t, !1);
        const _ = t.CheckGetComponent(1);
        void _.SetTransformByTag(i.ModelCase);
      }
  }
  UpdateUiShowState(i, t) {
    this.WBc.SetUiShowState(i);
    var e = i ? 1 : 0;
    this.GetExtendToggle(3).SetToggleState(e, !1),
      this.GetItem(0)?.SetUIActive(i),
      this.yil.SetCaptionItemActive(i),
      (this.yil.CameraInputComponent.CanCameraInput = !i),
      i && t && this.T_1();
  }
  UpdateIsApplyToAll(i) {
    this.WBc.SetIsApplyToAll(i);
    i = i ? 1 : 0;
    this.GetExtendToggle(10)?.SetToggleState(i, !1);
  }
  RefreshConfirmBtnState() {
    var i,
      t,
      e = this.WBc,
      s = e.SelectedGridData?.GetIsLock() ?? !0;
    this.GetItem(14)?.SetUIActive(!s),
      s ||
        ((s = e.SelectedFlySkinId),
        (i = e.SelectedFlySkinType),
        (t = e.RoleDataId),
        (e =
          !!e.IsApplyToAll ||
          !ModelManager_1.ModelManager.FlySkinModel.CheckRoleEquipFlySkin(
            t,
            s,
            i,
          )),
        this.Qgc.SetEnableClick(e),
        (t = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinEquipBtnTextId(
          i,
          e,
        )),
        this.Qgc.SetLocalTextNew(t));
  }
  T_1() {
    var i;
    this.I_1 &&
      ((i = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinModelCameraId(
        this.WBc.SelectedFlySkinType,
      )),
      (this.Lm1 = i),
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
        i,
        !0,
        !0,
        "10010",
      ));
  }
  b_1() {
    this.CNc ||
      (this.yil.InitFlySkinTabCameraInputData(),
      this.yil.CameraInputComponent.Start(),
      this.yil.CameraInputComponent.TryActivate(),
      (this.CNc = !0));
  }
  R_1() {
    this.CNc && (this.yil.CameraInputComponent.End(), (this.CNc = !1));
  }
  ChangeSelectedTab(i) {
    var t = ModelManager_1.ModelManager.FlySkinModel.GetRoleEquipFlySkinId(
      this.WBc.RoleDataId,
      FlySkinDefine_1.flySkinTabToType[i],
    );
    this.SelectTab(i, t ?? 0);
  }
  GetTabItem(i) {
    switch (i) {
      case 0:
        return this.mNc;
      case 1:
        return this.fNc;
    }
  }
  xm1() {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
      "FlySkinReplaceTip",
    ),
      this.UpdateIsApplyToAll(!1),
      this.RefreshConfirmBtnState();
  }
}
exports.FlySkinTabView = FlySkinTabView;
//# sourceMappingURL=FlySkinTabView.js.map

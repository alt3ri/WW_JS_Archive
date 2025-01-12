"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponReplaceView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  SortEntrance_1 = require("../../Common/FilterSort/Sort/View/SortEntrance"),
  SelectablePropDataUtil_1 = require("../../Common/PropItem/SelectablePropItem/SelectablePropDataUtil"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  WeaponController_1 = require("../WeaponController"),
  WeaponDefine_1 = require("../WeaponDefine"),
  WeaponDetailTipsComponent_1 = require("../WeaponDetailTipsComponent"),
  WeaponReplaceMediumItemGrid_1 = require("./WeaponReplaceMediumItemGrid");
class WeaponReplaceView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.SelectedIncId = 0),
      (this.RoleDataId = 0),
      (this.nko = void 0),
      (this.sko = void 0),
      (this.ako = !1),
      (this.SortComponent = void 0),
      (this.LoopScrollView = void 0),
      (this.ItemDataList = void 0),
      (this.dmo = void 0),
      (this.W7t = () => {
        var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
            this.RoleDataId,
          ).GetRoleId(),
          e =
            ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(
              e,
            );
        this.dmo.Model?.CheckGetComponent(14)?.SetWeaponByWeaponData(e),
          this.CloseMe();
      }),
      (this.hko = () => {
        this.SetContrast();
      }),
      (this.lko = (e) => {
        e = this.ItemDataList[e];
        return SelectablePropDataUtil_1.SelectablePropDataUtil.GetSelectablePropData(
          e,
        );
      }),
      (this._ko = () => {
        var e = new WeaponReplaceMediumItemGrid_1.WeaponReplaceMediumItemGrid();
        return (
          e.BindOnExtendToggleStateChanged(this.j5e),
          e.BindOnCanExecuteChange(this.Lke),
          e
        );
      }),
      (this.j5e = (e) => {
        e = e.Data.IncId;
        this.SelectedWeaponHandle(e);
      }),
      (this.Lke = (e, t) => {
        return this.SelectedIncId !== e.IncId;
      }),
      (this.UpdateList = (e) => {
        this.LoopScrollView.DeselectCurrentGridProxy(!0),
          this.LoopScrollView.ReloadProxyData(this.lko, e.length, !1),
          e.length <= 0 ||
            (this.LoopScrollView.ScrollToGridIndex(0),
            this.LoopScrollView.SelectGridProxy(0, !0),
            (e = e[0]),
            this.SelectedWeaponHandle(e.GetUniqueId()));
      }),
      (this.uko = (e) => {
        e = { WeaponIncId: e, IsFromRoleRootView: !0 };
        UiManager_1.UiManager.OpenView("WeaponRootView", e),
          WeaponController_1.WeaponController.RoleFadeIn(
            UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor(),
          );
      }),
      (this.cko = (e) => {
        var t,
          i = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(
            this.RoleDataId,
          ),
          r = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
        const o = i.GetRoleId();
        r.HasRole()
          ? ((i = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponName(
              r.GetWeaponConfig().WeaponName,
            )),
            (r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
              r.GetRoleId(),
            ).GetName()),
            (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(22)).SetTextArgs(
              i,
              r,
            ),
            t.FunctionMap.set(2, () => {
              WeaponController_1.WeaponController.SendPbEquipTakeOnRequest(
                o,
                WeaponDefine_1.WEAPON_EQUIPTYPE,
                e,
              );
            }),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              t,
            ))
          : WeaponController_1.WeaponController.SendPbEquipTakeOnRequest(
              o,
              WeaponDefine_1.WEAPON_EQUIPTYPE,
              e,
            );
      }),
      (this.mko = () => {
        this.UpdateCurrentTips(),
          this.UpdateSelectedTips(this.SelectedIncId),
          this.RefreshPropItem();
      }),
      (this.dko = (e, t) => {
        this.sko.GetWeaponIncId() === e && this.sko.UpdateWeaponLock(t),
          this.nko.GetWeaponIncId() === e && this.nko.UpdateWeaponLock(t),
          this.RefreshPropItem();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.W7t],
        [4, this.hko],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.nko = new WeaponDetailTipsComponent_1.WeaponDetailTipsComponent()),
      await this.nko.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()),
      (this.sko = new WeaponDetailTipsComponent_1.WeaponDetailTipsComponent()),
      await this.sko.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
  }
  OnStart() {
    var e = this.OpenParam;
    void 0 === e
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Character", 59, "WeaponReplaceView界面输入为空")
      : ((this.SelectedIncId = e.WeaponIncId),
        (this.RoleDataId = e.RoleId),
        (this.dmo = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()),
        (e = this.GetItem(6).GetOwner()),
        (this.LoopScrollView = new LoopScrollView_1.LoopScrollView(
          this.GetLoopScrollViewComponent(0),
          e,
          this._ko,
        )),
        this.nko.SetReplaceFunction(this.cko),
        this.nko.SetCultureFunction(this.uko),
        this.nko.SetCanShowEquip(!0),
        this.sko.SetCanShowEquip(!0),
        this.sko.SetCanShowLock(!1),
        (this.SortComponent = new SortEntrance_1.SortEntrance(
          this.GetItem(5),
          this.UpdateList,
        )));
  }
  SetContrast() {
    var e;
    (this.ako = !this.ako),
      this.sko &&
        ((e = this.ako), this.SetWeaponTipsRootItemState(e), e) &&
        this.UpdateCurrentTips();
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(4);
    var e,
      t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
        this.SelectedIncId,
      );
    void 0 !== t &&
      ((e = t.GetWeaponConfig()),
      (this.ItemDataList =
        ModelManager_1.ModelManager.WeaponModel.GetWeaponListFromReplace(
          e.WeaponType,
        )),
      this.SortComponent.UpdateData(3, this.ItemDataList),
      (this.SelectedIncId = 0),
      this.SelectedWeaponHandle(t.GetIncId(), !0));
  }
  OnAfterHide() {
    this.ako && this.SetContrast();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.EquipWeapon,
      this.mko,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnItemLock,
        this.dko,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.EquipWeapon,
      this.mko,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnItemLock,
        this.dko,
      );
  }
  OnBeforeDestroy() {
    this.nko.Destroy(), this.sko.Destroy(), this.SortComponent.Destroy();
  }
  RefreshPropItem() {
    this.LoopScrollView.RefreshAllGridProxies();
  }
  SetWeaponTipsRootItemState(e) {
    this.UiViewSequence.StopSequenceByKey("TipStart"),
      this.UiViewSequence.StopSequenceByKey("TipClose"),
      this.UiViewSequence.PlaySequence(e ? "TipStart" : "TipClose");
  }
  SelectedWeaponHandle(e, t = !1) {
    var i;
    this.SelectedIncId === e ||
      (this.UpdateSelectedTips(e), (i = this.GetWeaponItemIndex(e)) < 0) ||
      (this.LoopScrollView.SelectGridProxy(i, t),
      (this.SelectedIncId = e),
      (i = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e)),
      this.dmo.Model?.CheckGetComponent(14)?.SetWeaponByWeaponData(i));
  }
  UpdateSelectedTips(e) {
    (e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e)),
      this.nko.UpdateComponent(e),
      (e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
        this.RoleDataId,
      ));
    this.nko.UpdateEquip(e.GetRoleId());
  }
  UpdateCurrentTips() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(
        this.RoleDataId,
      ),
      e =
        (this.sko.UpdateComponent(e),
        ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.RoleDataId));
    this.sko.UpdateEquip(e.GetRoleId());
  }
  GetWeaponItemIndex(t) {
    for (let e = 0; e < this.ItemDataList.length; e++)
      if (this.ItemDataList[e].GetUniqueId() === t) return e;
    return -1;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (1 !== e.length || isNaN(Number(e[0])))
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Guide",
          17,
          "武器替换界面聚焦引导ExtraParam参数配置错误",
          ["configParams", e],
        );
    else {
      var i = Number(e[0]);
      let t = void 0;
      for (let e = 0; e < this.ItemDataList.length; e++) {
        var r =
          SelectablePropDataUtil_1.SelectablePropDataUtil.GetSelectablePropData(
            this.ItemDataList[e],
          );
        if (r.ItemId === i && ((t = e), r.RoleId !== this.RoleDataId)) break;
      }
      -1 !== this.LoopScrollView.Iei &&
        this.LoopScrollView.ScrollToGridIndex(t);
      e = this.LoopScrollView.GetGrid(t);
      if (e && void 0 !== t) return [e, e];
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Guide",
          17,
          "武器替换界面聚焦引导ExtraParam参数配置错误, 找不到道具",
          ["itemId", i],
        );
    }
  }
}
exports.WeaponReplaceView = WeaponReplaceView;
//# sourceMappingURL=WeaponReplaceView.js.map

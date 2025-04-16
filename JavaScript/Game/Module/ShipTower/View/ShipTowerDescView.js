"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerDescView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  ShipTowerDefine_1 = require("../ShipTowerDefine"),
  ShipTowerDescLeftPanel_1 = require("./ShipTowerDescLeftPanel"),
  ShipTowerDescTeamItem_1 = require("./ShipTowerDescTeamItem"),
  ShipTowerTeamPanel_1 = require("./ShipTowerTeamPanel");
class ShipTowerDescView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.OpenParam = void 0),
      (this.Ns_ = void 0),
      (this.Vs_ = void 0),
      (this.zJa = void 0),
      (this.js_ = void 0),
      (this.Hs_ = void 0),
      (this.Ws_ = void 0),
      (this.Qs_ = void 0),
      (this.$s_ = void 0),
      (this.SelectedLeftRoleData = void 0),
      (this.Ys_ = 0),
      (this.oyc = void 0),
      (this.zs_ = () => {
        this.Js_();
      }),
      (this.Zs_ = () => {
        ModelManager_1.ModelManager.ShipTowerModel.OpenViewReset({
          StageData: this.Ns_,
        });
      }),
      (this.ea_ = () => {
        this.Ns_.StartChallenge();
      }),
      (this.ta_ = () => {
        this.Vs_?.UpdateRoleListFilter();
        var t = this.Vs_?.GetRoleIdList();
        t?.length &&
          ((this.oyc = t.find((t) =>
            ModelManager_1.ModelManager.RoleModel?.IsMainRole(t),
          )),
          ControllerHolder_1.ControllerHolder.RoleController.OpenRoleMainViewByParam(
            { AgentType: 0, RoleIdList: t, TeamPositionType: 1 },
          ));
      }),
      (this.ra_ = () => {
        this.Ns_.StartChallenge();
      }),
      (this.oa_ = () => {
        this.Ns_.OpenViewTeamRecommend();
      }),
      (this.na_ = () => {
        var t = new ShipTowerDescTeamItem_1.ShipTowerDescTeamItem();
        return (
          (t.RoleClickCallBack = this.OnRoleClick),
          (t.BuffClickCallBack = this.aa_),
          (t.MechanismClickCallBack = this.vD_),
          t
        );
      }),
      (this.OnRoleClick = (t) => {
        this.$s_?.Index !== t.Index && ((this.$s_ = t), this.nyc()), this.ha_();
      }),
      (this.aa_ = (t) => {
        ModelManager_1.ModelManager.ShipTowerModel.OpenViewBuff({
          BuffId: t.BuffDataEdit?.Id,
          StageId: this.Ns_.Id,
          OperationType: 1,
          TeamData: t,
          OnUseBuff: this.la_,
        });
      }),
      (this.vD_ = (t) => {
        this.Ns_.OpenViewMonsterDesc(t.InstId);
      }),
      (this.la_ = (t, e) => {
        e?.UseBuff(t);
        t = e?.Index ?? -1;
        this.js_?.GetScrollItemByIndex(t)?.UpdateBuff(),
          UiManager_1.UiManager.CloseView("ShipTowerBuffView");
      }),
      (this._a_ = (t) => {
        var e, i;
        (this.SelectedLeftRoleData = t),
          this.$s_ &&
            ((e = this.$s_.Index),
            (t = t.GetDataId()),
            (i =
              ModelManager_1.ModelManager.ShipTowerModel.IsOtherTeamRoleData(
                t,
              )),
            this.$s_.UpdateRoleListByModel(),
            i && this.Ns_.UpdateOtherTeamRoleRepeat(e, t),
            this.Ns_.UpdateAllTeamRoleToModel(),
            this.js_?.RefreshByData(this.Ns_.TeamDataList));
      }),
      (this.ca_ = (t) => {
        var e;
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("ShipTower", 69, "OnRoleTeamSelect", [
            "formationData",
            t,
          ]),
          this.$s_ &&
            ((e = this.$s_.Index),
            this.Ns_.TeamDataList[e].UpdateRoleListByFormationData(t),
            this.Ns_.UpdateOtherTeamRoleRepeat(e),
            this.Ns_.UpdateAllTeamRoleToModel(),
            this.Vs_?.OnlyUpdateTeamList(),
            this.js_?.RefreshByData(this.Ns_.TeamDataList));
      }),
      (this.kW_ = () => {
        this.z8_ && this.qW_();
      }),
      (this.FG_ = (t) => {
        this.Ns_.Id === t && this.Slo();
      }),
      (this.J8_ = (t) => {
        this.Ns_.Id === t &&
          (this.z8_ &&
            this.$s_ &&
            (this.$s_.UpdateRoleListToRoleSelectModel(),
            this.Ns_.UpdateOtherTeamRoleToModel(this.$s_.Index),
            this.Ns_.UpdateAllTeamRoleToModel()),
          this.Slo());
      });
  }
  get z8_() {
    return ModelManager_1.ModelManager.ShipTowerModel.IsShowLeftTeamPanel;
  }
  set z8_(t) {
    ModelManager_1.ModelManager.ShipTowerModel.IsShowLeftTeamPanel = t;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIScrollViewWithScrollbarComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIButtonComponent],
      [11, UE.UIItem],
      [12, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [3, this.zs_],
        [10, this.zs_],
        [6, this.oa_],
      ]);
  }
  Es_() {
    (this.Ns_ = ModelManager_1.ModelManager.ShipTowerModel.GetStageDataById(
      this.OpenParam.StageId,
    )),
      this.OpenParam?.ApplyTeamEditStageId
        ? this.Ns_.CopyTeamRoleToEdit(this.OpenParam.ApplyTeamEditStageId)
        : this.OpenParam?.IsOpenCover || this.Ns_.UpdateToEdit(),
      (this.z8_ = !1),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("ShipTower", 69, "ShipTowerDescView", [
          "DataParam",
          this.OpenParam,
        ]);
  }
  async OnBeforeStartAsync() {
    this.Es_(),
      (this.zJa = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.zJa.SetCloseCallBack(this.CloseMe.bind(this)),
      this.zJa.SetHelpBtnActive(!1),
      (this.Vs_ = new ShipTowerTeamPanel_1.ShipTowerTeamPanel()),
      await this.Vs_.Init(this.GetItem(7), this.Ns_),
      (this.Vs_.RoleSelectCallBack = this._a_),
      (this.Vs_.TeamSelectCallBack = this.ca_),
      (this.Vs_.RoleListUpdateCallback = this.kW_),
      (this.Vs_.EmptyStateItem = this.tH_()),
      (this.js_ = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(2),
        this.na_,
        this.GetItem(11).GetOwner(),
      )),
      (this.Hs_ = new ShipTowerDescLeftPanel_1.ShipTowerDescLeftPanel()),
      await this.Hs_.Init(this.GetItem(1), this.Ns_),
      (this.Ws_ = new ButtonItem_1.ButtonItem(this.GetButton(4)?.RootUIComp)),
      (this.Qs_ = new ButtonItem_1.ButtonItem(this.GetButton(5)?.RootUIComp)),
      this.ua_();
  }
  OnStart() {
    this.bA_();
  }
  bA_() {
    this.OpenParam?.IsOpenCover &&
      ModelManager_1.ModelManager.ShipTowerModel.OpenViewCover({
        StageData: this.Ns_,
      });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ShipTowerStageUpdate,
      this.FG_,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ShipTowerSureResetStage,
        this.FG_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ShipTowerSureCoverChallenge,
        this.FG_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ShipTowerTeamRecommendApplyFinish,
        this.J8_,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ShipTowerStageUpdate,
      this.FG_,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ShipTowerSureResetStage,
        this.FG_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ShipTowerSureCoverChallenge,
        this.FG_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ShipTowerTeamRecommendApplyFinish,
        this.J8_,
      );
  }
  OnBeforeShow() {
    this.oyc &&
      ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId() !==
        this.oyc &&
      ((this.oyc = void 0),
      this.Ns_.UpdateMainRoleToEdit(),
      this.nyc(),
      this.Vs_?.UpdateRoleListByMainRoleChange()),
      this.Slo();
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.ShipTowerModel.ChallengeStageData !==
      this.Ns_ && this.Ns_?.UpdateToEdit();
  }
  Slo() {
    this.ua_(),
      this.js_?.RefreshByData(this.Ns_.TeamDataList, void 0, !0),
      this.z8_ ? this.ha_() : this.Js_();
  }
  ua_() {
    var t = this.Ns_.CanReset();
    this.Ys_ = t ? 1 : 0;
  }
  ha_() {
    this.z8_ || this.PlaySequence("Team"),
      (this.z8_ = !0),
      this.Hs_?.SetActive(!1),
      this.Vs_?.UpdateViewAndShow(this.$s_),
      this.qW_(),
      this.ma_(this.Qs_, this.Ys_, this.Ns_.IsUnLocked()),
      this.da_(!0);
  }
  qW_() {
    this.ma_(this.Ws_, 3, !!this.Vs_?.GetRoleIdList().length);
  }
  Js_() {
    (this.z8_ = !1),
      this.Vs_?.SetActive(!1),
      this.Hs_?.UpdateViewAndShow(this.Ns_),
      this.ma_(this.Ws_, 2, this.Ns_.CanReset()),
      this.ma_(this.Qs_, this.Ys_, this.Ns_.IsUnLocked()),
      this.da_(!1),
      this.tH_()?.SetUIActive(!1);
  }
  da_(t) {
    this.GetItem(8)?.SetUIActive(t),
      this.GetItem(9)?.SetUIActive(t),
      this.$s_ && (t ? this.cq_() : this.wA_()?.SetTeamToggleIsSelect(!1));
  }
  tH_() {
    return this.GetItem(12);
  }
  cq_() {
    this.Ns_.TeamDataList.forEach((t, e) => {
      e !== this.$s_?.Index &&
        this.js_?.GetScrollItemByIndex(e)?.SetTeamToggleIsSelect(!1);
    });
  }
  wA_() {
    var t;
    if (this.$s_)
      return (t = this.$s_.Index), this.js_?.GetScrollItemByIndex(t);
  }
  nyc() {
    this.$s_ &&
      (this.$s_.UpdateRoleListToRoleSelectModel(),
      this.Ns_.UpdateOtherTeamRoleToModel(this.$s_.Index),
      this.Ns_.UpdateAllTeamRoleToModel());
  }
  ma_(t, e, i = !0) {
    if ((t.SetActive(i), i))
      switch (e) {
        case 3:
          this.uq_(t, ShipTowerDefine_1.shipTowerTextKey.RoleDetail),
            t.SetFunction(this.ta_);
          break;
        case 0:
          this.uq_(t, ShipTowerDefine_1.shipTowerTextKey.StartChallenge),
            t.SetFunction(this.ea_);
          break;
        case 2:
          this.uq_(t, ShipTowerDefine_1.shipTowerTextKey.Reset),
            t.SetFunction(this.Zs_);
          break;
        case 1:
          this.uq_(t, ShipTowerDefine_1.shipTowerTextKey.AgainChallenge),
            t.SetFunction(this.ra_);
      }
  }
  uq_(t, e) {
    e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e);
    t.SetText(e);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    switch (t[0]) {
      case "TabCompRight":
        return this.Vs_?.GetGuideUiItemAndUiItemForShowEx(t);
      case "Desc":
      case "Item":
      case "TeamAndItem":
      case "TeamAndItemOuter":
        return 2 !== t.length || isNaN(Number(t[1]))
          ? void 0
          : this.js_
              ?.GetScrollItemByIndex(Number(t[1]))
              ?.GetGuideUiItemAndUiItemForShowEx(t);
    }
  }
}
exports.ShipTowerDescView = ShipTowerDescView;
//# sourceMappingURL=ShipTowerDescView.js.map

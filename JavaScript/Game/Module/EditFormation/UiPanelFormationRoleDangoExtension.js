"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiPanelFormationRoleDangoExtension = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  RedDotController_1 = require("../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  UiModel_1 = require("../../Ui/UiModel"),
  AbyssDangoCircleQulityItem_1 = require("../Dango/DangoAbyss/View/AbyssDangoCircleQulityItem"),
  DangoAbyssSelectDangoView_1 = require("../Dango/DangoAbyss/View/DangoAbyssSelectDangoView"),
  LguiUtil_1 = require("../Util/LguiUtil");
class UiPanelFormationRoleDangoExtension extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.yLc = void 0),
      (this.fgc = (e, t) => {
        this.yLc?.OnLevelUp(e, t);
      }),
      (this.mgc = () => {
        this.yLc?.OnDangoInfoUpdate();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[26, UE.UIItem]];
  }
  LZs() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnAbyssDangoLevelUp,
      this.fgc,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAbyssRoleInfoUpdate,
        this.mgc,
      );
  }
  DZs() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnAbyssDangoLevelUp,
      this.fgc,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAbyssRoleInfoUpdate,
        this.mgc,
      );
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(26);
    (this.yLc = new DangoItem()),
      await this.yLc.CreateByResourceIdAsync("UiItem_TuanziRoleItem", e),
      this.yLc.SetActive(!0);
  }
  OnStart() {
    this.LZs();
  }
  OnBeforeDestroy() {
    this.DZs();
  }
  SetRelativeUiActive(e) {
    this.GetItem(26).SetUIActive(e);
  }
  Refresh(e, t, i) {
    var s;
    void 0 === i
      ? ModelManager_1.ModelManager.DangoAbyssModel.RefreshOwnDataAfterChange(
          ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
        )
      : (ModelManager_1.ModelManager.DangoAbyssModel.RefreshOwnDataAfterChange(
          i,
        ),
        ((s = new DangoItemData()).Index = e),
        (s.IfSelf = i === ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
        (e = ModelManager_1.ModelManager.DangoAbyssModel.GetRoleOwnerData(
          i,
          t,
        )),
        (s.DangoId = e?.DangoId ?? 0),
        (s.RoleConfigId = t),
        (s.Level = e?.DangoLevel ?? 0),
        (s.DangoEquipIds = e?.DangoEquipIds ?? []),
        this.yLc.Refresh(s));
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return 0 !== e.length && (e = this.yLc?.GetRootItem()) ? [e, e] : void 0;
  }
}
exports.UiPanelFormationRoleDangoExtension = UiPanelFormationRoleDangoExtension;
class DangoItemData {
  constructor() {
    (this.RoleConfigId = 0),
      (this.DangoId = 0),
      (this.Level = 0),
      (this.IfSelf = !0),
      (this.Index = 0),
      (this.DangoEquipIds = []);
  }
}
class DangoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.$8i = void 0),
      (this.dDc = void 0),
      (this.wCo = !1),
      (this.SLc = () => {
        if (this.$8i && this.$8i.IfSelf) {
          var s = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
            e = new DangoAbyssSelectDangoView_1.DangoSelectViewData(),
            n =
              ((e.Index = this.$8i.Index),
              (e.RoleConfigId = this.$8i.RoleConfigId),
              (e.GroupIndex =
                ModelManager_1.ModelManager.EditFormationModel
                  .GetCurrentFormationId ?? 0),
              ModelManager_1.ModelManager.DangoAbyssModel.GetAllDangoList());
          if (
            ((e.CurrentSelectDangoId = n[0].GetId()), 0 !== this.$8i?.DangoId)
          )
            e.CurrentSelectDangoId = this.$8i.DangoId;
          else {
            var a =
                ModelManager_1.ModelManager.EditBattleTeamModel
                  .GetAllRoleSlotData,
              t = n.length,
              r = a.length;
            for (let i = 0; i < t; i++) {
              let t = !1;
              for (let e = 0; e < r; e++)
                if (a[e].GetRoleConfigId)
                  if (
                    ModelManager_1.ModelManager.DangoAbyssModel.GetRoleOwnerData(
                      s,
                      a[e].GetRoleConfigId,
                    )?.DangoId === n[i].GetId()
                  ) {
                    t = !0;
                    break;
                  }
              if (!t) {
                e.CurrentSelectDangoId = n[i].GetId();
                break;
              }
            }
          }
          UiManager_1.UiManager.OpenView(
            "DangoAbyssSelectDangoView",
            e,
            (e, t) => {
              UiModel_1.UiModel.NormalStack.Peek()?.AddChildViewById(t);
            },
          );
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UITexture],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.SLc]]);
  }
  async OnBeforeStartAsync() {
    (this.dDc = new AbyssDangoCircleQulityItem_1.AbyssDangoCircleQualityItem()),
      await this.dDc.CreateByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {}
  OnBeforeDestroy() {
    this.VI1();
  }
  VI1() {
    this.wCo &&
      (RedDotController_1.RedDotController.UnBindGivenUi(
        "RedDotDangoFormation",
        this.GetItem(6),
      ),
      (this.wCo = !1));
  }
  OnDangoInfoUpdate() {
    var e;
    this.$8i &&
      (e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(
        this.$8i.DangoId,
      )) &&
      ((e = e.GetEquipItems()),
      (this.$8i.DangoEquipIds = e),
      this.BGt(this.$8i));
  }
  OnLevelUp(e, t) {
    this.$8i &&
      e === this.$8i.DangoId &&
      ((this.$8i.Level = t), this.pmt(this.$8i));
  }
  Refresh(e) {
    (this.$8i = e) &&
      (this.MLc(e),
      this.ELc(e),
      this.BGt(e),
      this.ILc(e),
      this.pmt(e),
      this.VI1(),
      e.IfSelf
        ? (RedDotController_1.RedDotController.BindRedDot(
            "RedDotDangoFormation",
            this.GetItem(6),
          ),
          (this.wCo = !0))
        : this.GetItem(6).SetUIActive(!1));
  }
  ILc(e) {
    0 === e.DangoId
      ? this.GetItem(1).SetUIActive(!1)
      : this.GetItem(1).SetUIActive(!0);
  }
  ELc(e) {
    0 === e.DangoId
      ? this.GetTexture(3)
      : ((e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(
          e.DangoId,
        ).GetFormationIcon()),
        this.SetTextureByPath(e, this.GetTexture(3)));
  }
  BGt(e) {
    var t = new AbyssDangoCircleQulityItem_1.DangoCircleQualityData(),
      i = e.DangoEquipIds,
      s = i.length,
      n = new Map();
    for (let e = 0; e < s; e++) n.set(e, i[e]);
    (t.PluginIdMap = n), this.dDc.RefreshData(t), this.dDc.SetActive(!0);
  }
  pmt(e) {
    0 !== e.DangoId &&
      ((e = e.Level),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(4),
        "AbyssDango_LV",
        e?.toString(),
      ));
  }
  MLc(e) {
    e = 0 === e.DangoId;
    this.GetItem(5).SetUIActive(e);
  }
}
//# sourceMappingURL=UiPanelFormationRoleDangoExtension.js.map

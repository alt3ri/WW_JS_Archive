"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleHandBookItem = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ButtonItem_1 = require("../Common/Button/ButtonItem"),
  RoleController_1 = require("../RoleUi/RoleController"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder");
class RoleHandBookItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super(),
      (this.$Ut = void 0),
      (this.D7t = void 0),
      (this.PlaySequence = () => {
        this.D7t?.SequencePlayer.Play();
      }),
      (this.xUt = () => {
        this.IsCanRoleActive()
          ? RoleController_1.RoleController.SendRoleActiveRequest(this.zke)
          : UiManager_1.UiManager.OpenView(
              "RoleHandBookRootView",
              "RoleHandBookSelectionView",
            );
      }),
      (this.MIt = () => {
        this.UpdateCostInfo();
      }),
      (this.OnClickItem = () => {
        let e = void 0;
        for (const t of ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
          this.zke,
        ).ExchangeConsume.keys()) {
          e = t;
          break;
        }
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          e,
        );
      }),
      (this.zke = e),
      t && this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[10, this.OnClickItem]]);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnAddCommonItemList,
      this.MIt,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnAddCommonItemList,
      this.MIt,
    );
  }
  OnStart() {
    this.zke &&
      ((this.$Ut = new ButtonItem_1.ButtonItem(this.GetItem(4))),
      this.$Ut.SetFunction(this.xUt),
      this.UpdateComponent(this.zke),
      this.AddEventListener());
  }
  UpdateComponent(e) {
    this.zke = e;
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.zke),
      t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.zke),
      i =
        (this.GetText(0).ShowTextNew(e.Name),
        this.$Ut.UnBindRedDot(),
        this.$Ut.BindRedDot("RoleHandBookActiveButton", this.zke),
        this.GetItem(7)),
      o = this.GetItem(8),
      r = this.GetItem(9);
    if (
      (this.IsRoleUnlock()
        ? (this.$Ut.SetLocalText("Detail"),
          LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "ActiveTime"),
          this.GetText(6).SetText(
            TimeUtil_1.TimeUtil.DateFormat4(
              new Date(
                t.GetRoleCreateTime() * TimeUtil_1.TimeUtil.InverseMillisecond,
              ),
            ),
          ),
          i.SetUIActive(!0),
          o.SetUIActive(!1),
          r.SetUIActive(!1))
        : (this.IsCanRoleActive()
            ? this.$Ut.SetLocalText("Tuning")
            : this.$Ut.SetLocalText("Detail"),
          this.UpdateCostInfo(),
          i.SetUIActive(!1),
          o.SetUIActive(!0),
          r.SetUIActive(!0)),
      this.D7t)
    ) {
      const s = this.D7t;
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put(s);
      }),
        (this.D7t = void 0);
    }
    t =
      ConfigManager_1.ConfigManager.GachaConfig.GetGachaEffectConfigByTimesAndQuality(
        1,
        e.QualityId,
      );
    ResourceSystem_1.ResourceSystem.LoadAsync(
      t.FinalShowSequencePath,
      UE.LevelSequence,
      (e) => {
        var t;
        ObjectUtils_1.ObjectUtils.IsValid(e) &&
          ((e = e),
          ((t = new UE.MovieSceneSequencePlaybackSettings()).bRestoreState =
            !0),
          (this.D7t = ActorSystem_1.ActorSystem.Get(
            UE.LevelSequenceActor.StaticClass(),
            MathUtils_1.MathUtils.DefaultTransform,
            void 0,
            !1,
          )),
          (this.D7t.PlaybackSettings = t),
          this.D7t.SetSequence(e));
      },
    );
  }
  UpdateCostInfo() {
    if (this.zke) {
      var i, o;
      let e = void 0,
        t = void 0;
      for ([i, o] of ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
        this.zke,
      ).ExchangeConsume) {
        (e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i)), (t = o);
        break;
      }
      this.SetTextureByPath(e.Icon, this.GetTexture(1)),
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "RoleFragment");
      var r = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        e.Id,
      );
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "RoleExp", r, t);
    }
  }
  IsRoleUnlock() {
    return (
      void 0 !==
      ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.zke)
    );
  }
  IsCanRoleActive() {
    var e,
      t,
      i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.zke),
      o = this.IsRoleUnlock();
    let r = void 0,
      s = void 0;
    for ([e, t] of i.ExchangeConsume) {
      (r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e)), (s = t);
      break;
    }
    i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(r.Id);
    return !o && i >= s;
  }
  OnBeforeDestroy() {
    if (
      (this.RemoveEventListener(),
      this.$Ut.UnBindRedDot(),
      (this.zke = void 0),
      this.D7t)
    ) {
      const e = this.D7t;
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put(e);
      }),
        (this.D7t = void 0);
    }
  }
}
exports.RoleHandBookItem = RoleHandBookItem;
//# sourceMappingURL=RoleHandBookItem.js.map

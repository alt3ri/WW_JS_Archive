"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponBreachView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  AttributeItem_1 = require("../../Common/AttributeItem"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  ItemDefines_1 = require("../../Item/Data/ItemDefines"),
  CostItemGridComponent_1 = require("../../RoleUi/RoleBreach/CostItemGridComponent"),
  StarItem_1 = require("../../RoleUi/View/StarItem"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  UiModelUtil_1 = require("../../UiModel/UiModelUtil"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  WeaponController_1 = require("../WeaponController");
class WeaponBreachView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.AttributeLayout = void 0),
      (this.Olo = void 0),
      (this.StarLayout = void 0),
      (this.PNo = 0),
      (this.xNo = void 0),
      (this.ANo = 0),
      (this.Nki = void 0),
      (this.Oki = void 0),
      (this.pco = void 0),
      (this.wNo = () => {
        0 === this.PNo
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "WeaponBreachNoEnoughMaterialText",
            )
          : 1 === this.PNo
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "WeaponBreachNoEnoughMoneyText",
              )
            : ((this.Nki = UiSceneManager_1.UiSceneManager.GetWeaponObserver()),
              (this.Oki =
                UiSceneManager_1.UiSceneManager.GetWeaponScabbardObserver()),
              (this.pco =
                UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()),
              WeaponController_1.WeaponController.SendPbWeaponBreachRequest(
                this.ANo,
                (e) => {
                  var i = this.Nki.Model,
                    i =
                      (UiModelUtil_1.UiModelUtil.PlayEffectAtRootComponent(
                        i,
                        "WeaponBreachEffect",
                      ),
                      WeaponController_1.WeaponController.PlayWeaponRenderingMaterial(
                        "WeaponBreachMaterialController",
                        this.Nki,
                        this.Oki,
                      ),
                      ConfigManager_1.ConfigManager.RoleConfig.GetWeaponBreachDaDelayTime());
                  TimerSystem_1.TimerSystem.Delay(() => {
                    this.Nki?.Model?.CheckGetComponent(
                      19,
                    )?.RefreshWeaponBreachDa(e),
                      this.Oki?.Model?.CheckGetComponent(
                        19,
                      )?.RefreshWeaponBreachDa(e),
                      this.pco?.Model?.CheckGetComponent(14)?.RefreshWeaponDa();
                  }, i);
                },
              ));
      }),
      (this.LevelUpLockTipClick = () => {
        var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(175);
        const i =
          ModelManager_1.ModelManager.QuestNewModel.GetCurWorldLevelBreakQuest();
        i < 0
          ? e.InteractionMap.set(1, !1)
          : (e.FunctionMap.set(2, () => {
              UiManager_1.UiManager.OpenView("QuestView", i);
            }),
            e.InteractionMap.set(1, !0)),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          );
      }),
      (this.sAt = () => {
        return new StarItem_1.StarItem();
      }),
      (this.Flo = () => new AttributeItem_1.AttributeItem());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIVerticalLayout],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
    ];
  }
  OnStart() {
    (this.StarLayout = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(2),
      this.sAt,
    )),
      (this.Olo = new CostItemGridComponent_1.CostItemGridComponent(
        this.GetItem(4),
        this.wNo,
        this.LevelUpLockTipClick,
      )),
      this.Olo.SetMaxItemActive(!1),
      this.Olo.SetButtonItemLocalText("RoleBreakup"),
      (this.AttributeLayout = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(3),
        this.Flo,
        this.GetItem(5).GetOwner(),
      ));
  }
  OnBeforeShow() {
    (this.ANo = this.ExtraParams), this.qIt(), this.C4e();
  }
  qIt() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
        this.ANo,
      ),
      i = e.GetBreachConfig(),
      t = e.GetWeaponConfig(),
      r = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(
        t.BreachId,
        e.GetBreachLevel() + 1,
      ),
      r = (this.GetText(0).SetText(r.LevelLimit.toString()), t.BreachId),
      t = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(r),
      o =
        (this.kPt(e.GetBreachLevel(), t),
        (this.PNo =
          ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachState(
            this.ANo,
          )),
        3 === this.PNo
          ? ((r =
              LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
                i.ConditionId,
              )),
            this.Olo.SetButtonItemActive(!1),
            this.Olo.SetLockItemActive(!0),
            this.Olo.SetLockLocalText(r ?? ""))
          : (this.Olo.SetButtonItemActive(!0), this.Olo.SetLockItemActive(!1)),
        []),
      t = i.Consume;
    if (t)
      for (var [a, n] of t) {
        a = {
          ItemId: a,
          IncId: 0,
          SelectedCount:
            ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
              a,
            ),
          Count: n,
        };
        o.push(a);
      }
    r = i.GoldConsume;
    this.Olo.Update(o, ItemDefines_1.EItemId.Gold, r),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(1),
        "RoleBreakUpLevel",
        e.GetBreachLevel() + 1,
      ),
      this.jlo();
  }
  kPt(i, t) {
    this.StarLayout ||
      (this.StarLayout = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(2),
        this.sAt,
      ));
    var r = new Array(t);
    for (let e = 0; e < t; ++e) {
      var o = {
        StarOnActive: e < i,
        StarOffActive: e > i,
        StarNextActive: e === i,
        StarLoopActive: e === i,
        PlayLoopSequence: e === i,
        PlayActivateSequence: !1,
      };
      r[e] = o;
    }
    this.StarLayout.RefreshByData(r);
  }
  jlo() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
        this.ANo,
      ),
      i = e.GetWeaponConfig(),
      t =
        ((this.xNo =
          ModelManager_1.ModelManager.WeaponModel.GetWeaponAttributeParamList(
            i,
          )),
        e.GetBreachLevel()),
      r = t + 1,
      o = e.GetLevel(),
      a = [];
    for (const _ of this.xNo) {
      var n = _.CurveId,
        s = _.PropId,
        l = s.Value,
        h = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(n, l, o, t);
      let e = 0;
      t < r &&
        (e = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(n, l, o, r));
      n = {
        Id: s.Id,
        IsRatio: s.IsRatio,
        CurValue: h,
        BgActive: !0,
        ShowNext: e > h,
        NextValue: e,
      };
      a.push(n);
    }
    this.AttributeLayout.RefreshByData(a);
  }
  C4e() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
        this.ANo,
      ).GetWeaponConfig(),
      i = e.WeaponName,
      e = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
        e.QualityId,
      ),
      e = UE.Color.FromHex(e.DropColor);
    this.GetText(6).SetColor(e), this.GetText(6).ShowTextNew(i);
  }
  OnBeforeDestroy() {
    this.Olo.Destroy();
  }
}
exports.WeaponBreachView = WeaponBreachView;
//# sourceMappingURL=WeaponBreachView.js.map

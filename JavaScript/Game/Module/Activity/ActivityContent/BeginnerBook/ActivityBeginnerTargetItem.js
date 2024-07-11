"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityBeginnerTargetItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid"),
  RoleController_1 = require("../../../RoleUi/RoleController"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  WeaponTrialData_1 = require("../../../Weapon/Data/WeaponTrialData"),
  WorldMapController_1 = require("../../../WorldMap/WorldMapController"),
  ActivityController_1 = require("../../ActivityController");
class ActivityBeginnerTargetItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.aNe = [-1, ""]),
      (this.hNe = !1),
      (this.lNe = -1),
      (this.DataId = -1),
      (this._Ne = void 0),
      (this.uNe = () => {
        var e;
        if (this.hNe)
          switch (this.aNe[0] - 1) {
            case 0:
              UiManager_1.UiManager.OpenView("QuestView", this.aNe[1]);
              break;
            case 1:
              var r = ConfigManager_1.ConfigManager.MapConfig?.GetConfigMark(
                Number(this.aNe[1]),
              );
              r
                ? ((r = {
                    MarkType: r.ObjectType,
                    MarkId: r.MarkId,
                    OpenAreaId: 0,
                  }),
                  WorldMapController_1.WorldMapController.OpenView(1, !1, r))
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Activity",
                    5,
                    "配置了错误的鸣域新程",
                    ["Type: ", this.aNe[0]],
                    ["Parma: ", this.aNe[1]],
                  );
              break;
            case 2:
              "RoleRootView" === this.aNe[1]
                ? RoleController_1.RoleController.OpenRoleMainView(0)
                : UiManager_1.UiManager.OpenView(this.aNe[1]);
              break;
            case 3:
              r = this.aNe[1];
              RoleController_1.RoleController.OpenRoleMainView(0, 0, [], r);
              break;
            case 4:
              r = { TabViewName: this.aNe[1], Param: void 0 };
              UiManager_1.UiManager.OpenView("CalabashRootView", r);
              break;
            case 5:
              r = this.aNe[1].split("-");
              ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewWithTab(
                Number(r[0]),
                Number(r[1]),
              );
              break;
            case 6:
              ActivityController_1.ActivityController.OpenActivityById(
                Number(this.aNe[1]),
              );
              break;
            case 7:
              ControllerHolder_1.ControllerHolder.AdventureGuideController.OpenGuideView(
                this.aNe[1],
              );
              break;
            default:
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Activity",
                  5,
                  "配置了错误的鸣域新程",
                  ["Type: ", this.aNe[0]],
                  ["type: ", this.aNe[1]],
                );
          }
        else
          (e =
            ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(
              this.lNe,
            ).HintText),
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIText],
      [6, UE.UIText],
    ]),
      (this.BtnBindInfo = [[4, this.uNe]]);
  }
  OnStart() {
    (this._Ne = new SmallItemGrid_1.SmallItemGrid()),
      this._Ne.Initialize(this.GetItem(2).GetOwner());
  }
  Refresh(e, r, i) {
    this.DataId = e;
    e =
      ConfigManager_1.ConfigManager.ActivityBeginnerBookConfig?.GetActivityBeginnerConfig(
        e,
      );
    if (
      (this.cNe(e),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.SourceTitle),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.SourceDesc),
      (this.lNe = e.ConditionId),
      !(e.JumpTo.size <= 0))
    )
      for (var [t, a] of e.JumpTo) (this.aNe[0] = t), (this.aNe[1] = a);
  }
  cNe(r) {
    switch (r.SourceType) {
      case 1:
        var e = {
          Data: void 0,
          Type: 4,
          ItemConfigId:
            ConfigManager_1.ConfigManager.WeaponConfig?.GetTrialWeaponConfig(
              r.SourceId,
            )?.WeaponId,
        };
        this._Ne?.Apply(e),
          this._Ne?.BindOnExtendToggleClicked(() => {
            var e = new WeaponTrialData_1.WeaponTrialData(),
              e =
                (e.SetTrialId(r.SourceId),
                { WeaponDataList: [e], SelectedIndex: 0 });
            UiManager_1.UiManager.OpenView("WeaponPreviewView", e);
          });
        break;
      case 3:
        e = { Data: void 0, Type: 4, ItemConfigId: r.SourceId };
        this._Ne?.Apply(e),
          this._Ne?.BindOnExtendToggleClicked(() => {
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              r.SourceId,
            );
          });
        break;
      case 0:
        e = { Data: void 0, Type: 2, ItemConfigId: r.SourceId };
        this._Ne?.Apply(e),
          this._Ne?.BindOnExtendToggleClicked(() => {
            var e = [r.SourceId];
            RoleController_1.RoleController.OpenRoleMainView(1, 0, e);
          });
        break;
      case 2:
        e = { Data: void 0, Type: 3, ItemConfigId: r.SourceId };
        this._Ne?.Apply(e),
          this._Ne?.BindOnExtendToggleClicked(() => {
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              r.SourceId,
            );
          });
    }
  }
  SetEnableJump(e) {
    this.hNe = e;
  }
  SetFinish(e) {
    this.GetItem(0)?.SetUIActive(!e),
      this.GetItem(1)?.SetUIActive(e),
      this.GetItem(3)?.SetUIActive(e),
      this.GetButton(4)?.RootUIComp.SetUIActive(!e);
  }
}
exports.ActivityBeginnerTargetItem = ActivityBeginnerTargetItem;
//# sourceMappingURL=ActivityBeginnerTargetItem.js.map

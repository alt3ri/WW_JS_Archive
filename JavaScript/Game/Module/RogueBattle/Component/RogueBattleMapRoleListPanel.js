"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleMapRoleListPanel = exports.RogueBattleMapRoleLayoutItem =
    void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  RogueBattleMapRoleListGrid_1 = require("./RogueBattleMapRoleListGrid");
class RogueBattleMapRoleLayoutItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.tFe = void 0),
      (this.Vlo = []),
      (this.pC1 = void 0),
      (this.uyi = () => {
        var e = new RogueBattleMapRoleListGrid_1.RogueBattleMapRoleLayoutGrid();
        return e.BindOnCanExecuteChange(this.CanExecuteChangeFunction), e;
      }),
      (this.CanExecuteChangeFunction = (e, t, i) => {
        return 1 !== i || this.pC1 !== e.ConfigId;
      }),
      (this.vC1 = (e) => {
        var t = this.pC1;
        (this.pC1 = this.Vlo.includes(e) ? e : void 0),
          void 0 !== t && this.tFe.GetSelectedProxy()?.SetSelected(!1),
          this.pC1 &&
            (this.tFe.SelectGridProxy(this.Vlo.indexOf(e)),
            this.tFe.GetSelectedProxy()?.SetSelected(!0),
            (t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
            RoleController_1.RoleController.OnSelectedRoleChange(e, t.SkinId));
      }),
      (this.sI1 = () => {
        var e;
        this.pC1 &&
          ((e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
            this.pC1,
          )),
          RoleController_1.RoleController.OnSelectedRoleChange(
            this.pC1,
            e.SkinId,
          ));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIGridLayout],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RogueResMapSummaryTeamUpdate,
      this.vC1,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RogueResMapSummaryTeamShowAgain,
        this.sI1,
      ),
      (this.tFe = new GenericLayout_1.GenericLayout(
        this.GetGridLayout(2),
        this.uyi,
      ));
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RogueResMapSummaryTeamUpdate,
      this.vC1,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RogueResMapSummaryTeamShowAgain,
        this.sI1,
      );
  }
  Refresh(e, t, i) {
    this.Vlo = e;
    var r = ModelManager_1.ModelManager.RogueBattleModel.IsRoleGot(e[0]),
      s = r ? "RogueRes_Overall_Role_8" : "RogueRes_Overall_Role_9",
      n =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s), new Array());
    for (const a of e) {
      var o = { ConfigId: a, IsGain: r, NeedLevel: !0 };
      n.push(o);
    }
    this.tFe.RefreshByData(n, () => {
      this.pC1 && this.vC1(this.pC1);
    });
  }
}
exports.RogueBattleMapRoleLayoutItem = RogueBattleMapRoleLayoutItem;
class RogueBattleMapRoleListPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.xqe = void 0),
      (this.yC1 = 0),
      (this.I2i = () => {
        return new RogueBattleMapRoleLayoutItem();
      }),
      (this.GIl = (e) => {
        this.yC1 = e;
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    (this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(0),
      this.I2i,
    )),
      this.GetItem(2)?.SetUIActive(!1);
  }
  BindEvent() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RogueResMapSummaryTeamUpdate,
      this.GIl,
    );
  }
  UnbindEvent() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RogueResMapSummaryTeamUpdate,
      this.GIl,
    );
  }
  OnBeforeShow() {
    var e =
        ConfigManager_1.ConfigManager.RogueBattleConfig.GetAllRogueResBondRole(),
      t = [],
      i = [],
      r = [],
      s =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNewSeasonId(),
      n = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTrailRole(
        s,
        0,
      ),
      o = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTrailRole(
        s,
        1,
      );
    for (const h of e) {
      var a,
        l = h.RoleId;
      ModelManager_1.ModelManager.RogueBattleModel.IsRoleGot(l)
        ? i.push(l)
        : ModelManager_1.ModelManager.RogueBattleModel.IsRoleGot(h.TrialRoleId)
          ? i.push(h.TrialRoleId)
          : ((a = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(
              h.TrialRoleId,
            )),
            ModelManager_1.ModelManager.RoleModel.IsMainRole(a) ||
              (n.includes(h.TrialRoleId) || o.includes(h.TrialRoleId)
                ? r.push(h.TrialRoleId)
                : r.push(l)));
    }
    0 < i.length && ((this.yC1 = 0 !== this.yC1 ? this.yC1 : i[0]), t.push(i)),
      (ModelManager_1.ModelManager.RogueBattleModel.SummaryRoleList = i),
      0 < r.length &&
        ((this.yC1 = 0 !== this.yC1 ? this.yC1 : r[0]), t.push(r)),
      this.xqe.RefreshByData(t, () => {
        this.yC1 &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RogueResMapSummaryTeamUpdate,
            this.yC1,
          );
      });
  }
  OnBeforeDestroy() {
    this.xqe = void 0;
  }
}
exports.RogueBattleMapRoleListPanel = RogueBattleMapRoleListPanel;
//# sourceMappingURL=RogueBattleMapRoleListPanel.js.map

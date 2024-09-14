"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoonChasingModel = void 0);
const CommonParamById_1 = require("../../../../../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ModelBase_1 = require("../../../../../../../Core/Framework/ModelBase"),
  StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  ActivityMoonChasingController_1 = require("../../Activity/ActivityMoonChasingController"),
  HandbookDefine_1 = require("../Handbook/HandbookDefine");
class MoonChasingModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.MainQuestIdList = []),
      (this.BranchQuestIdList = []),
      (this.HasEnteredMainViewFlag = !1),
      (this.E7s = new Map()),
      (this.HandbookRewardIdList = []),
      (this.y7s = (e, t) => e.Goal - t.Goal),
      (this.I7s = (e, t) =>
        e.Sort === t.Sort ? e.Type - t.Type : e.Sort - t.Sort),
      (this.Efa = void 0),
      (this.gwa = void 0);
  }
  OnInit() {
    return this.InitHandbookReward(), this.InitQuestInfo(), !0;
  }
  OnClear() {
    return !0;
  }
  GetPopularityValue() {
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetPopularityItemId();
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e);
  }
  GetWishValue() {
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetWishItemId();
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e);
  }
  GetCoinValue() {
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetCoinItemId();
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e);
  }
  GetRewardTabList() {
    return ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
      "RewardMainView",
    );
  }
  InitQuestInfo() {
    this.MainQuestIdList.length = 0;
    for (const e of ConfigManager_1.ConfigManager.TaskConfig.GetAllMainLineTask())
      this.MainQuestIdList.push(e.TaskId);
    this.BranchQuestIdList.length = 0;
    for (const t of ConfigManager_1.ConfigManager.TaskConfig.GetAllBranchLineTask())
      this.BranchQuestIdList.push(t.TaskId);
  }
  GetHandbookGridList() {
    return this.GetBuildingHandbookDataList();
  }
  GetHandbookUnlockCount() {
    let e = 0;
    for (const t of ModelManager_1.ModelManager.MoonChasingBuildingModel.GetAllBuildingData())
      t.IsBuild && e++;
    return e;
  }
  GetBuildingHandbookDataList() {
    var e = [];
    for (const o of ModelManager_1.ModelManager.MoonChasingBuildingModel.GetAllBuildingData()) {
      var t = { Id: o.Id, IsUnlock: o.IsBuild };
      e.push(t);
    }
    return e;
  }
  InitHandbookReward() {
    for (const t of ConfigManager_1.ConfigManager.MoonChasingHandbookConfig.GetHandbookRewardList()) {
      var e = new HandbookDefine_1.HandbookRewardData();
      (e.Id = t.Id),
        (e.Goal = t.Goal),
        (e.DropId = t.RewardInfo),
        this.E7s.set(t.Id, e);
    }
    this.HandbookRewardIdList.length = 0;
    for (const o of Array.from(this.E7s.values()).sort(this.y7s))
      this.HandbookRewardIdList.push(o.Id);
  }
  GetHandbookRewardDataById(e) {
    return this.E7s.get(e);
  }
  HasHandbookRewardRedDot() {
    var e = this.GetHandbookUnlockCount();
    for (const t of this.E7s.values()) if (1 === t.GetState(e)) return !0;
    return !1;
  }
  GetMemoryInfo(t) {
    var e = [];
    for (const _ of ConfigManager_1.ConfigManager.MoonChasingMemoryConfig.GetAllMemoryInfo()) {
      var o = {
        Type: _.Id,
        Classify: _.Classify,
        Title: _.Title,
        IconPath: _?.IconPath,
        HasData: !0,
        Sort: _.Sort,
        IsDelegate: !1,
      };
      switch (o.Type) {
        case 1:
          o.Content = t.j7s.toString();
          break;
        case 2:
          o.Content = t.W7s.toString();
          break;
        case 3:
          o.Content = t.Q7s.toString();
          break;
        case 4:
          o.Content = this.GetHandbookUnlockCount().toString();
          break;
        case 5:
          o.Content = t.K7s.toString();
          break;
        case 6:
          var a =
            ModelManager_1.ModelManager.MoonChasingBusinessModel.GetUnlockHelpEditTeamDataList(
              !1,
            );
          o.Content = a.length.toString();
          break;
        case 7: {
          var a = t.X7s,
            r = void 0 !== a?.s5n && 0 !== a.s5n;
          let e = 0;
          r
            ? ((n =
                ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(
                  a.s5n,
                )),
              (o.Content = n.Title),
              (e = a.D8n),
              (n =
                ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustTypeById(
                  n.EntrustType,
                )),
              (o.IconPath = n.Icon))
            : (o.Content = "Moonfiesta_Word3");
          var n =
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Moonfiesta_Word1",
            );
          (o.SubContent = StringUtils_1.StringUtils.Format(n, e.toString())),
            (o.IsDelegate = !0),
            (o.HasData = r);
          break;
        }
        case 8: {
          var r = t.J7s,
            i = void 0 !== r?.s5n && 0 !== r.s5n;
          let e = 0;
          i
            ? ((s =
                ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
                  r.s5n,
                )),
              (o.Content = s.Name),
              (e = r.D8n),
              (o.IconPath = s.Icon))
            : (o.Content = "Moonfiesta_Word3");
          var s =
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Moonfiesta_Word2",
            );
          (o.SubContent = StringUtils_1.StringUtils.Format(s, e.toString())),
            (o.HasData = i);
          break;
        }
        case 9: {
          var i = t.Y7s,
            l = void 0 !== i?.s5n && 0 !== i.s5n;
          let e = 0;
          l
            ? ((g =
                ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
                  i.s5n,
                )),
              (o.Content = g.Name),
              (e = i.D8n),
              (o.IconPath = g.Icon))
            : (o.Content = "Moonfiesta_Word3");
          var g =
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Moonfiesta_Word1",
            );
          (o.SubContent = StringUtils_1.StringUtils.Format(g, e.toString())),
            (o.HasData = l);
          break;
        }
      }
      e.push(o);
    }
    return e.sort(this.I7s);
  }
  GetFirstUnlockData() {
    var e =
      ModelManager_1.ModelManager.MoonChasingTaskModel.GetFirstReadyBranchTask();
    return 0 !== e
      ? [0, e]
      : void 0 !==
          (e =
            ModelManager_1.ModelManager.MoonChasingBuildingModel.GetFirstUnLockBuildingData())
        ? [1, e.Id]
        : void 0;
  }
  get yfa() {
    var e;
    return (
      void 0 === this.Efa &&
        ((e = LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.MoonChasingDelegation,
          0,
        )),
        (this.Efa = e)),
      this.Efa
    );
  }
  set yfa(e) {
    this.Efa !== e &&
      (LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.MoonChasingDelegation,
        e,
      ),
      (this.Efa = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MoonChasingRefreshDelegationRedDot,
      ));
  }
  CheckDelegationRedDotState() {
    return (
      !this.yfa || TimeUtil_1.TimeUtil.GetCurrentCrossDayStamp() !== this.yfa
    );
  }
  RemoveDelegationRedDot() {
    this.yfa = TimeUtil_1.TimeUtil.GetCurrentCrossDayStamp();
  }
  CheckRoleRedDotState() {
    return (
      this.CheckRoleUnlockRedDotState() || this.CheckRoleFosterTipsRedDotState()
    );
  }
  CheckRoleUnlockRedDotState() {
    for (const e of ModelManager_1.ModelManager.MoonChasingBusinessModel.GetHelpEditTeamDataList())
      if (this.CheckRoleIdRedDotState(e.Id)) return !0;
    return !1;
  }
  CheckRoleIdRedDotState(e) {
    return ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
      LocalStorageDefine_1.ELocalStoragePlayerKey.MoonChasingRoleUnlock,
      e,
    );
  }
  ReadRoleIdUnlockFlag(e) {
    ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
      LocalStorageDefine_1.ELocalStoragePlayerKey.MoonChasingRoleUnlock,
      e,
    ),
      this.SaveRoleRedDot();
  }
  SaveRoleIdUnlockFlag(e) {
    ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
      LocalStorageDefine_1.ELocalStoragePlayerKey.MoonChasingRoleUnlock,
      e,
    ),
      this.SaveRoleRedDot();
  }
  SaveRoleRedDot() {
    ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
      LocalStorageDefine_1.ELocalStoragePlayerKey.MoonChasingRoleUnlock,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MoonChasingRefreshRoleRedDot,
      );
  }
  CheckRoleFosterTipsRedDotState() {
    let e = !1;
    var t;
    for (const o of ModelManager_1.ModelManager.MoonChasingBusinessModel.GetHelpEditTeamDataList())
      o.IsOwn && (e = !0);
    return (
      !!e &&
      !!(t = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MoonChasingRoleFosterTipsValue",
      )) &&
      this.GetWishValue() >= t
    );
  }
  CheckQuestRedDotState() {
    return this.CheckMainlineRedDot() || this.CheckBranchRedDot();
  }
  CheckMainlineRedDot() {
    for (const e of ConfigManager_1.ConfigManager.TaskConfig.GetAllMainLineTask())
      if (this.CheckQuestIdRedDotState(e.TaskId)) return !0;
    return !1;
  }
  CheckBranchRedDot() {
    for (const e of ConfigManager_1.ConfigManager.TaskConfig.GetAllBranchLineTask())
      if (this.CheckQuestIdRedDotState(e.TaskId)) return !0;
    return !1;
  }
  CheckQuestIdRedDotState(e) {
    var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e);
    return (
      0 !== t &&
      3 !== t &&
      !ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.MoonChasingQuestUnlock,
        e,
      )
    );
  }
  ReadQuestIdUnlockFlag(e) {
    return (
      !!this.CheckQuestIdRedDotState(e) &&
      (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.MoonChasingQuestUnlock,
        e,
      ),
      this.SaveQuestRedDot(),
      !0)
    );
  }
  SaveQuestRedDot() {
    ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
      LocalStorageDefine_1.ELocalStoragePlayerKey.MoonChasingQuestUnlock,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MoonChasingRefreshQuestRedDot,
      );
  }
  get fwa() {
    var e;
    return (
      void 0 === this.gwa &&
        ((e = LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.MoonChasingMemoryChecked,
          !1,
        )),
        (this.gwa = e ?? !1)),
      this.gwa
    );
  }
  set fwa(e) {
    this.gwa !== e &&
      (LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.MoonChasingMemoryChecked,
        e,
      ),
      (this.gwa = e),
      ActivityMoonChasingController_1.ActivityMoonChasingController.RefreshActivityRedDot());
  }
  CheckMemoryRedDotState() {
    return !this.fwa;
  }
  RemoveMemoryRedDot() {
    this.fwa = !0;
  }
}
exports.MoonChasingModel = MoonChasingModel;
//# sourceMappingURL=MoonChasingModel.js.map

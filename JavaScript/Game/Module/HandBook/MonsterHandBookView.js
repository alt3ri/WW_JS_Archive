"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterHandBookView = void 0);
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
  CommonTabItemBase_1 = require("../Common/TabComponent/TabItem/CommonTabItemBase"),
  UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager"),
  UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
  HandBookBaseView_1 = require("./HandBookBaseView"),
  HandBookCommonTypeItem_1 = require("./HandBookCommonTypeItem"),
  HandBookController_1 = require("./HandBookController"),
  HandBookDefine_1 = require("./HandBookDefine");
class MonsterHandBookView extends HandBookBaseView_1.HandBookBaseView {
  constructor() {
    super(...arguments),
      (this.eti = []),
      (this.tti = []),
      (this.bZt = void 0),
      (this.gU = !1),
      (this.iti = void 0),
      (this.OnHandBookRead = (e, n) => {
        if (0 === e) {
          var t = this.tti.length;
          for (let e = 0; e < t; e++) {
            var i = this.tti[e].GetHandBookCommonItemList(),
              o = i.length;
            for (let e = 0; e < o; e++) {
              var a = i[e];
              if (a.GetData().Config.Id === n)
                return void a.SetNewFlagVisible(!1);
            }
          }
        }
      }),
      (this.Refresh = () => {
        var n = ConfigCommon_1.ConfigCommon.ToList(
            ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookTypeConfig(),
          ),
          t = (n.sort(this.aei), n.length),
          i = [];
        for (let e = 0; e < t; e++) {
          var o = n[e],
            a = o.Id,
            r =
              ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigByType(
                a,
              ),
            s = (this.eti.push(r), r.length),
            m = [];
          for (let e = 0; e < s; e++) {
            var h = r[e],
              _ =
                ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(
                  h.Id,
                ),
              g = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
                0,
                h.Id,
              ),
              v = void 0 === g,
              g = void 0 !== g && !g.IsRead,
              C = new HandBookDefine_1.HandBookCommonItemData();
            (C.Icon = _),
              (C.Config = h),
              (C.IsLock = v),
              (C.IsNew = g),
              (C.Title = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                o.Descrtption,
              )),
              m.push(C);
          }
          i.push(m);
        }
        (this.tti = []), (this.gU = !1), this.InitScrollViewByCommonTypeItem(i);
        var e =
          ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(
            0,
          );
        this.InitCommonTabTitle(
          e.TitleIcon,
          new CommonTabTitleData_1.CommonTabTitleData(e.Name),
        ),
          (this.gU = !0),
          0 < this.tti.length && (this.iti = this.tti[0].SetToggleChecked());
      }),
      (this.InitHandBookCommonTypeItem = (e, n, t) => {
        var i = new HandBookCommonTypeItem_1.HandBookCommonTypeItem();
        return (
          i.Initialize(n),
          i.BindToggleCallback(this.OnToggleClick),
          i.Refresh(e, !1, t),
          this.tti.push(i),
          { Key: t, Value: i }
        );
      }),
      (this.OnToggleClick = (e, t) => {
        if (this.gU) {
          this.iti?.SetSelected(!1), (this.iti = t).SetSelected(!0);
          t = e.Config;
          if (e.IsLock) this.SetLockState(!0);
          else {
            this.SetLockState(!1),
              e.IsNew &&
                HandBookController_1.HandBookController.SendIllustratedReadRequest(
                  0,
                  t.Id,
                );
            var e =
                ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(
                  t.Id,
                ),
              i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name),
              i = (this.SetNameText(i), []),
              o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                t.TypeDescrtption,
              ),
              o = (i.push(o), this.InitInfoItemLayout(i), []),
              i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                t.Descrtption,
              ),
              a =
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "FightSkill",
                ),
              r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                t.FightSkillDescrtption,
              ),
              s =
                (o.push(
                  new HandBookDefine_1.HandBookContentItemData("", i),
                  new HandBookDefine_1.HandBookContentItemData(a, r),
                ),
                this.InitContentItemLayout(o),
                []),
              m = t.PhantomItem,
              h = m.length;
            for (let e = 0; e < h; e++) {
              var _ = m[e];
              s.push([{ IncId: 0, ItemId: _ }, 0]);
            }
            var g =
                ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterPerch(
                  e.Id,
                ),
              v = g.length;
            let n = "";
            for (let e = 0; e < v; e++) {
              var C = g[e];
              e === v - 1 ? (n += C) : (n = n + C + ",");
            }
            i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
              0,
              t.Id,
            );
            this.SetKillText(i.Num),
              HandBookController_1.HandBookController.SetMonsterMeshShow(
                t.Id,
                this.qZt,
              );
          }
        }
      }),
      (this.aei = (e, n) => e.Id - n.Id),
      (this.qZt = void 0);
  }
  OnStart() {
    this.SetDefaultState(),
      this.RefreshCollectText(),
      this.RefreshLockText(),
      this.Refresh();
  }
  OnAfterShow() {
    this.bZt =
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
        "1062",
      );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnHandBookDataInit,
      this.Refresh,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnHandBookDataUpdate,
        this.Refresh,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnHandBookRead,
        this.OnHandBookRead,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnHandBookDataInit,
      this.Refresh,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnHandBookDataUpdate,
        this.Refresh,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnHandBookRead,
        this.OnHandBookRead,
      );
  }
  RefreshCollectText() {
    var e = HandBookController_1.HandBookController.GetCollectProgress(0);
    this.SetCollectText(e[0], e[1]);
  }
  RefreshLockText() {
    var e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
      "MonsterHandBookLock",
    );
    this.SetLockText(e);
  }
  ResetAllToggleState(n) {
    var t = this.tti.length;
    for (let e = 0; e < t; e++) {
      var i = this.tti[e];
      e !== n && i.ResetAllToggleState();
    }
  }
  GetTabItemData(e) {
    var n = new Array(),
      t = this.TabList.length;
    for (let e = 0; e < t; e++) {
      var i = new CommonTabItemBase_1.CommonTabItemData();
      (i.Index = e), (i.Data = this.TabList[e]), n.push(i);
    }
    return n;
  }
  OnBeforePlayCloseSequence() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(
      this.bZt,
    );
  }
  OnBeforeCreate() {
    UiSceneManager_1.UiSceneManager.InitHandBookObserver(),
      (this.qZt = UiSceneManager_1.UiSceneManager.GetHandBookObserver());
  }
  OnBeforeDestroy() {
    UiSceneManager_1.UiSceneManager.DestroyHandBookObserver(),
      (this.qZt = void 0),
      (this.eti = []),
      (this.tti = []),
      (this.bZt = void 0);
  }
}
exports.MonsterHandBookView = MonsterHandBookView;
//# sourceMappingURL=MonsterHandBookView.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterHandBookView = void 0);
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData");
const CommonTabItemBase_1 = require("../Common/TabComponent/TabItem/CommonTabItemBase");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const HandBookBaseView_1 = require("./HandBookBaseView");
const HandBookCommonTypeItem_1 = require("./HandBookCommonTypeItem");
const HandBookController_1 = require("./HandBookController");
const HandBookDefine_1 = require("./HandBookDefine");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class MonsterHandBookView extends HandBookBaseView_1.HandBookBaseView {
  constructor() {
    super(...arguments),
      (this.eei = []),
      (this.tei = []),
      (this.bzt = void 0),
      (this.gU = !1),
      (this.iei = void 0),
      (this.OnHandBookRead = (e, n) => {
        if (e === 0) {
          const t = this.tei.length;
          for (let e = 0; e < t; e++) {
            const i = this.tei[e].GetHandBookCommonItemList();
            const o = i.length;
            for (let e = 0; e < o; e++) {
              const a = i[e];
              if (a.GetData().Config.Id === n)
                return void a.SetNewFlagVisible(!1);
            }
          }
        }
      }),
      (this.Refresh = () => {
        const n = ConfigCommon_1.ConfigCommon.ToList(
          ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookTypeConfig(),
        );
        const t = (n.sort(this.aZt), n.length);
        const i = [];
        for (let e = 0; e < t; e++) {
          const o = n[e];
          const a = o.Id;
          const r =
            ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigByType(
              a,
            );
          const s = (this.eei.push(r), r.length);
          const m = [];
          for (let e = 0; e < s; e++) {
            const h = r[e];
            const _ =
              ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(
                h.Id,
              );
            var g = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
              0,
              h.Id,
            );
            const v = void 0 === g;
            var g = void 0 !== g && !g.IsRead;
            const C = new HandBookDefine_1.HandBookCommonItemData();
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
        (this.tei = []), (this.gU = !1), this.InitScrollViewByCommonTypeItem(i);
        const e =
          ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(
            0,
          );
        this.InitCommonTabTitle(
          e.TitleIcon,
          new CommonTabTitleData_1.CommonTabTitleData(e.Name),
        ),
          (this.gU = !0),
          this.tei.length > 0 && (this.iei = this.tei[0].SetToggleChecked());
      }),
      (this.InitHandBookCommonTypeItem = (e, n, t) => {
        const i = new HandBookCommonTypeItem_1.HandBookCommonTypeItem();
        return (
          i.Initialize(n),
          i.BindToggleCallback(this.OnToggleClick),
          i.Refresh(e, !1, t),
          this.tei.push(i),
          { Key: t, Value: i }
        );
      }),
      (this.OnToggleClick = (e, t) => {
        if (this.gU) {
          this.iei?.SetSelected(!1), (this.iei = t).SetSelected(!0);
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
              );
            var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name);
            var i = (this.SetNameText(i), []);
            var o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              t.TypeDescrtption,
            );
            var o = (i.push(o), this.InitInfoItemLayout(i), []);
            var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              t.Descrtption,
            );
            const a =
              ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                "FightSkill",
              );
            const r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              t.FightSkillDescrtption,
            );
            const s =
              (o.push(
                new HandBookDefine_1.HandBookContentItemData("", i),
                new HandBookDefine_1.HandBookContentItemData(a, r),
              ),
              this.InitContentItemLayout(o),
              []);
            const m = t.PhantomItem;
            const h = m.length;
            for (let e = 0; e < h; e++) {
              const _ = m[e];
              s.push([{ IncId: 0, ItemId: _ }, 0]);
            }
            const g =
              ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterPerch(
                e.Id,
              );
            const v = g.length;
            let n = "";
            for (let e = 0; e < v; e++) {
              const C = g[e];
              e === v - 1 ? (n += C) : (n = n + C + ",");
            }
            i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
              0,
              t.Id,
            );
            this.SetKillText(i.Num),
              HandBookController_1.HandBookController.SetMonsterMeshShow(
                t.Id,
                this.qzt,
              );
          }
        }
      }),
      (this.aZt = (e, n) => e.Id - n.Id),
      (this.qzt = void 0);
  }
  OnStart() {
    this.SetDefaultState(),
      this.RefreshCollectText(),
      this.RefreshLockText(),
      this.Refresh();
  }
  OnAfterShow() {
    this.bzt =
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
    const e = HandBookController_1.HandBookController.GetCollectProgress(0);
    this.SetCollectText(e[0], e[1]);
  }
  RefreshLockText() {
    const e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
      "MonsterHandBookLock",
    );
    this.SetLockText(e);
  }
  ResetAllToggleState(n) {
    const t = this.tei.length;
    for (let e = 0; e < t; e++) {
      const i = this.tei[e];
      e !== n && i.ResetAllToggleState();
    }
  }
  GetTabItemData(e) {
    const n = new Array();
    const t = this.TabList.length;
    for (let e = 0; e < t; e++) {
      const i = new CommonTabItemBase_1.CommonTabItemData();
      (i.Index = e), (i.Data = this.TabList[e]), n.push(i);
    }
    return n;
  }
  OnBeforePlayCloseSequence() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(
      this.bzt,
    );
  }
  OnBeforeCreate() {
    UiSceneManager_1.UiSceneManager.InitHandBookObserver(),
      (this.qzt = UiSceneManager_1.UiSceneManager.GetHandBookObserver());
  }
  OnBeforeDestroy() {
    UiSceneManager_1.UiSceneManager.DestroyHandBookObserver(),
      (this.qzt = void 0),
      (this.eei = []),
      (this.tei = []),
      (this.bzt = void 0);
  }
}
exports.MonsterHandBookView = MonsterHandBookView;
// # sourceMappingURL=MonsterHandBookView.js.map

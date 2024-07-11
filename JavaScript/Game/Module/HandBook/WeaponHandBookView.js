"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponHandBookView = void 0);
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData");
const CommonTabItemBase_1 = require("../Common/TabComponent/TabItem/CommonTabItemBase");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const HandBookBaseView_1 = require("./HandBookBaseView");
const HandBookCommonItem_1 = require("./HandBookCommonItem");
const HandBookController_1 = require("./HandBookController");
const HandBookDefine_1 = require("./HandBookDefine");
class WeaponHandBookView extends HandBookBaseView_1.HandBookBaseView {
  constructor() {
    super(...arguments),
      (this.wzt = []),
      (this.Bzt = []),
      (this.bzt = void 0),
      (this.OnHandBookRead = (e, n) => {
        if (e === 3) {
          const t = this.Bzt.length;
          for (let e = 0; e < t; e++) {
            const a = this.Bzt[e];
            if (a.GetData().Config.Id === n) {
              a.SetNewFlagVisible(!1);
              break;
            }
          }
        }
      }),
      (this.InitHandBookCommonItem = () => {
        const e = new HandBookCommonItem_1.HandBookCommonItem();
        return (
          e.BindOnExtendToggleStateChanged(this.OnToggleClick),
          this.Bzt.push(e),
          e
        );
      }),
      (this.OnToggleClick = (e) => {
        let n;
        let t = e.Data;
        var e = e.MediumItemGrid.GridIndex;
        this.ScrollViewCommon.DeselectCurrentGridProxy(),
          this.ScrollViewCommon.SelectGridProxy(e),
          this.ScrollViewCommon.RefreshGridProxy(e),
          t.IsLock
            ? this.SetLockState(!0)
            : (this.SetLockState(!1),
              (e = t.Config),
              (n = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
                3,
                e.Id,
              )) && this.SetDateText(n.CreateTime),
              t.IsNew &&
                HandBookController_1.HandBookController.SendIllustratedReadRequest(
                  3,
                  e.Id,
                ),
              (n =
                ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
                  e.Id,
                )),
              (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                n.WeaponName,
              )),
              this.SetNameText(t),
              (t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponTypeName(
                n.WeaponType,
              )),
              this.SetTypeText(t),
              this.RefreshContentItemLayout(e),
              this.RefreshAttributeItemLayout(e),
              HandBookController_1.HandBookController.SetWeaponMeshShow(
                e.Id,
                this.qzt,
              ));
      }),
      (this.Refresh = () => {
        this.wzt =
          ConfigManager_1.ConfigManager.HandBookConfig.GetWeaponHandBookConfigList();
        const n = [];
        const t = this.wzt.length;
        for (let e = 0; e < t; e++) {
          const a = this.wzt[e];
          var i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
            3,
            a.Id,
          );
          const o = void 0 === i;
          var i = void 0 !== i && !i.IsRead;
          const r = new HandBookDefine_1.HandBookCommonItemData();
          const s =
            ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
              a.Id,
            );
          (r.Icon = s.IconSmall),
            (r.QualityId = s.QualityId),
            (r.ConfigId = a.Id),
            (r.Config = a),
            (r.IsLock = o),
            (r.IsNew = i),
            n.push(r);
        }
        this.InitScrollViewByCommonItem(n);
        const e =
          ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(
            3,
          );
        this.InitCommonTabTitle(
          e.TitleIcon,
          new CommonTabTitleData_1.CommonTabTitleData(e.Name),
        ),
          this.RefreshCollectText();
      }),
      (this.qzt = void 0);
  }
  OnStart() {
    this.SetDefaultState(), this.Refresh(), this.RefreshLockText();
  }
  OnAfterShow() {
    this.bzt =
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
        "1060",
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
    const e = HandBookController_1.HandBookController.GetCollectProgress(3);
    this.SetCollectText(e[0], e[1]);
  }
  RefreshLockText() {
    const e =
      ConfigManager_1.ConfigManager.TextConfig.GetTextById(
        "WeaponHandBookLock",
      );
    this.SetLockText(e);
  }
  RefreshAttributeItemLayout(e) {
    var n = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
      e.Id,
    );
    const t = [];
    var a = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
      n.FirstCurve,
      n.FirstPropId.Value,
      e.Level,
      e.Breach,
    );
    var a = {
      Id: n.FirstPropId.Id,
      IsRatio: n.FirstPropId.IsRatio,
      CurValue: a,
      BgActive: !0,
    };
    var e = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
      n.SecondCurve,
      n.SecondPropId.Value,
      e.Level,
      e.Breach,
    );
    var n = {
      Id: n.SecondPropId.Id,
      IsRatio: n.SecondPropId.IsRatio,
      CurValue: e,
      BgActive: !0,
    };
    t.push(a, n), this.InitAttributeLayout(t);
  }
  RefreshContentItemLayout(e) {
    var n = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
      e.Id,
    );
    const t = [];
    const a =
      ConfigManager_1.ConfigManager.TextConfig.GetTextById("WeaponDescrtption");
    const i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      n.AttributesDescription,
    );
    const o =
      ConfigManager_1.ConfigManager.TextConfig.GetTextById("EffectDescrtption");
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(
      n,
      e.Resonance,
    );
    var n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.Desc);
    var n = StringUtils_1.StringUtils.Format(n, ...e);
    t.push(
      new HandBookDefine_1.HandBookContentItemData(a, i),
      new HandBookDefine_1.HandBookContentItemData(o, n),
    ),
      this.InitContentItemLayout(t);
  }
  GetTabItemData(e) {
    const n = new Array();
    const t = this.TabList.length;
    for (let e = 0; e < t; e++) {
      const a = new CommonTabItemBase_1.CommonTabItemData();
      (a.Index = e), (a.Data = this.TabList[e]), n.push(a);
    }
    return n;
  }
  OnBeforePlayCloseSequence() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(
      this.bzt,
    );
  }
  OnBeforeCreate() {
    this.qzt = UiSceneManager_1.UiSceneManager.InitWeaponObserver();
  }
  OnBeforeDestroy() {
    UiSceneManager_1.UiSceneManager.DestroyWeaponObserver(this.qzt),
      (this.qzt = void 0),
      (this.wzt = []),
      (this.Bzt = []);
  }
}
exports.WeaponHandBookView = WeaponHandBookView;
// # sourceMappingURL=WeaponHandBookView.js.map

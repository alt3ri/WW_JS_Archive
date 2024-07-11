"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonUiGamepadData = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  InputEnums_1 = require("../../Input/InputEnums"),
  InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../../Ui/UiManager"),
  BehaviorButtonData_1 = require("./BehaviorButtonData"),
  mainKeys = [
    "Gamepad_FaceButton_Top",
    "Gamepad_FaceButton_Left",
    "Gamepad_FaceButton_Bottom",
    "Gamepad_FaceButton_Right",
  ],
  MAIN_KEY_NUM = 4,
  subKeys = [
    "Gamepad_LeftTrigger",
    "Gamepad_RightTrigger",
    "Gamepad_LeftShoulder",
    "Gamepad_RightShoulder",
  ],
  SUB_KEY_NUM = 3,
  actionNameToButtonTypeMap = new Map([
    [InputMappingsDefine_1.actionMappings.跳跃, 1],
    [InputMappingsDefine_1.actionMappings.攀爬, 2],
    [InputMappingsDefine_1.actionMappings.攻击, 4],
    [InputMappingsDefine_1.actionMappings.闪避, 5],
    [InputMappingsDefine_1.actionMappings.技能1, 6],
    [InputMappingsDefine_1.actionMappings.幻象1, 7],
    [InputMappingsDefine_1.actionMappings.大招, 8],
    [InputMappingsDefine_1.actionMappings.幻象2, 9],
    [InputMappingsDefine_1.actionMappings.瞄准, 101],
    [InputMappingsDefine_1.actionMappings.通用交互, 104],
    [InputMappingsDefine_1.actionMappings.任务追踪, 105],
  ]),
  initActionNames = [
    InputMappingsDefine_1.actionMappings.跳跃,
    InputMappingsDefine_1.actionMappings.攻击,
    InputMappingsDefine_1.actionMappings.闪避,
    InputMappingsDefine_1.actionMappings.技能1,
    InputMappingsDefine_1.actionMappings.幻象1,
    InputMappingsDefine_1.actionMappings.大招,
    InputMappingsDefine_1.actionMappings.幻象2,
    InputMappingsDefine_1.actionMappings.瞄准,
    InputMappingsDefine_1.actionMappings.通用交互,
  ],
  climbingButtonTypeSet = new Set([1, 2, 4, 5, 7, 104]),
  inWaterButtonTypeSet = new Set([5, 7, 104]),
  subButtonTypeSet = new Set([6, 8, 7, 9, 11, 101]),
  phantomRoleButtonTypeSet = new Set([101, 104]);
class SkillButtonUiGamepadData {
  constructor() {
    (this.Byo = []),
      (this.byo = new Map()),
      (this.NoneIcon = ""),
      (this.SwimIcon = ""),
      (this.ButtonKeyList = []),
      (this.qyo = new Map()),
      (this.Gyo = new Map()),
      (this.CurButtonTypeList = []),
      (this.CombineButtonKey = ""),
      (this.MainSkillButtonTypeList = []),
      (this.MainSkillCombineButtonTypeList = []),
      (this.SubSkillButtonTypeList = []),
      (this.SubAimSkillButtonTypeList = []),
      (this.Nyo = 1),
      (this.Oyo = void 0),
      (this.kyo = void 0),
      (this.Fyo = void 0),
      (this.Vyo = void 0),
      (this.Hyo = void 0),
      (this.jyo = !1),
      (this.VRn = !1),
      (this.Wyo = !1),
      (this.Kyo = !1),
      (this.Qyo = !1),
      (this.Xyo = !1),
      (this.Climbing = !1),
      (this.InWater = !1),
      (this.IsPhantomRole = !1),
      (this.PhantomRoleButtonTypeList = void 0),
      (this.ControlCameraByMoveAxis = !1);
  }
  Init() {
    (this.jyo = !1),
      this.$yo(),
      this.Yyo(),
      this.Jyo(),
      this.RefreshBaseConfigByUserSetting(),
      this.RefreshButtonData();
  }
  Clear() {
    this.ControlCameraByMoveAxis = !1;
  }
  $yo() {
    this.Byo.length = 0;
    for (var [t] of actionNameToButtonTypeMap) this.Byo.push(t);
    this.Byo.push(InputMappingsDefine_1.actionMappings.手柄主攻击),
      this.Byo.push(InputMappingsDefine_1.actionMappings.手柄副攻击);
  }
  GetAllActionNameList() {
    return this.Byo;
  }
  Yyo() {
    (this.NoneIcon =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "SP_IconXboxNoneIcon",
      )),
      (this.SwimIcon =
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "SP_IconSwimming",
        ));
  }
  Jyo() {
    this.zyo(
      InputMappingsDefine_1.actionMappings.瞄准,
      InputEnums_1.EInputAction.瞄准,
    ),
      this.zyo(
        InputMappingsDefine_1.actionMappings.通用交互,
        InputEnums_1.EInputAction.通用交互,
      );
  }
  zyo(t, i) {
    var t = actionNameToButtonTypeMap.get(t),
      e = new BehaviorButtonData_1.BehaviorButtonData();
    return e.Refresh(t, i, void 0, void 0), this.byo.set(t, e), e;
  }
  RefreshBaseConfigByUserSetting() {
    this.CombineButtonKey = "Gamepad_LeftShoulder";
    let t = 0;
    for (const r of mainKeys) (this.ButtonKeyList[t] = r), t++;
    for (const p of subKeys)
      p !== this.CombineButtonKey &&
        ("Gamepad_RightTrigger" === p && (this.Nyo = t - MAIN_KEY_NUM),
        (this.ButtonKeyList[t] = p),
        t++);
    (this.ButtonKeyList[t] = "Gamepad_RightThumbstick"),
      (this.Oyo = void 0),
      (this.kyo = void 0),
      (this.Fyo = void 0),
      (this.Vyo = void 0),
      (this.Hyo = void 0),
      this.qyo.clear();
    for (const o of initActionNames) {
      var i = InputSettingsManager_1.InputSettingsManager.GetActionBinding(o);
      if (i) {
        var e = [];
        if ((i.GetKeyNameList(e), e)) {
          for (const _ of e)
            this.ButtonKeyList.includes(_) &&
              (this.qyo.set(_, o), "Gamepad_RightTrigger" === _) &&
              ((this.Oyo = o),
              (this.kyo = e.concat()),
              (this.Fyo = e.concat()),
              this.Fyo.splice(this.Fyo.indexOf(_), 1),
              this.Fyo.push("Gamepad_RightThumbstick"));
          o === InputMappingsDefine_1.actionMappings.攻击 &&
            ((this.Vyo = e.concat()),
            (this.Hyo = this.Vyo.concat()),
            this.Hyo.push("Gamepad_RightTrigger"));
        }
      }
    }
    this.Gyo.clear();
    for (const u of initActionNames) {
      var n =
        InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
          u,
        );
      if (n) {
        var s,
          a,
          h = new Map();
        n.GetKeyMap(h);
        for ([s, a] of h)
          s === this.CombineButtonKey &&
            this.ButtonKeyList.includes(a) &&
            this.Gyo.set(a, u);
      }
    }
    this.Zyo(), this.eIo();
  }
  Zyo() {
    var t = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
        InputMappingsDefine_1.actionMappings.手柄主攻击,
      ),
      i = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
        InputMappingsDefine_1.actionMappings.攻击,
      ),
      e = [],
      n = [];
    if (
      (t?.GetGamepadKeyNameList(e),
      i?.GetGamepadKeyNameList(n),
      !this.tIo(e, n))
    ) {
      let t = [];
      (t = t.concat(n))
        ? InputSettingsManager_1.InputSettingsManager.SetActionKeys(
            InputMappingsDefine_1.actionMappings.手柄主攻击,
            t,
          )
        : InputSettingsManager_1.InputSettingsManager.SetActionKeys(
            InputMappingsDefine_1.actionMappings.手柄主攻击,
            [],
          );
    }
    (t =
      InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
        InputMappingsDefine_1.actionMappings.手柄主攻击,
      )),
      (i =
        InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
          InputMappingsDefine_1.actionMappings.攻击,
        )),
      (e = new Map()),
      (n = new Map());
    if (
      (t?.GetGamepadKeyNameMap(e), i?.GetGamepadKeyNameMap(n), !this.iIo(e, n))
    ) {
      if (e)
        for (var [s, a] of e)
          InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(
            InputMappingsDefine_1.actionMappings.手柄主攻击,
            s,
            a,
          );
      if (n)
        for (var [h, r] of n)
          InputSettingsManager_1.InputSettingsManager.AddCombinationActionKeyMap(
            InputMappingsDefine_1.actionMappings.手柄主攻击,
            h,
            r,
          );
    }
  }
  tIo(i, e) {
    if (i !== e) {
      if (!i || !e) return !1;
      if (i.length !== e.length) return !1;
      for (let t = 0; t < i.length; t++) if (i[t] !== e[t]) return !1;
    }
    return !0;
  }
  iIo(t, i) {
    if (t !== i) {
      if (!t || !i) return !1;
      if (t.size !== i.size) return !1;
      for (var [e, n] of t) if (i.get(e) !== n) return !1;
    }
    return !0;
  }
  eIo() {
    this.MainSkillButtonTypeList.length = MAIN_KEY_NUM;
    for (let t = 0; t < MAIN_KEY_NUM; t++)
      (this.MainSkillButtonTypeList[t] = this.oIo(t, !1)),
        (this.MainSkillCombineButtonTypeList[t] = this.oIo(t, !0));
    this.SubSkillButtonTypeList.length = SUB_KEY_NUM;
    for (let t = 0; t < SUB_KEY_NUM; t++)
      this.SubSkillButtonTypeList[t] = this.oIo(MAIN_KEY_NUM + t, !1);
    this.SubAimSkillButtonTypeList.length = SUB_KEY_NUM + 1;
    for (let t = 0; t < SUB_KEY_NUM; t++)
      this.SubAimSkillButtonTypeList[t] = this.SubSkillButtonTypeList[t];
    (this.SubAimSkillButtonTypeList[this.Nyo] = 11),
      (this.SubAimSkillButtonTypeList[SUB_KEY_NUM] =
        this.SubSkillButtonTypeList[this.Nyo]);
  }
  oIo(t, i) {
    let e = void 0;
    t = this.ButtonKeyList[t];
    return (
      ((e = (e = i ? this.Gyo.get(t) : e) || this.qyo.get(t)) &&
        actionNameToButtonTypeMap.get(e)) ||
      0
    );
  }
  RefreshButtonData() {
    this.rIo();
    for (let i = (this.CurButtonTypeList.length = 0); i < MAIN_KEY_NUM; i++) {
      let t = void 0;
      (101 ===
        (t = (
          this.jyo
            ? this.MainSkillCombineButtonTypeList
            : this.MainSkillButtonTypeList
        )[i]) ||
        this.nIo(t)) &&
      this.sIo(t)
        ? this.CurButtonTypeList.push(t)
        : this.CurButtonTypeList.push(0);
    }
    if (this.Wyo)
      for (let t = 0; t < SUB_KEY_NUM + 1; t++)
        (this.jyo && 11 === this.SubAimSkillButtonTypeList[t]) ||
          this.aIo(this.SubAimSkillButtonTypeList[t]);
    else {
      for (let t = 0; t < SUB_KEY_NUM; t++)
        this.aIo(this.SubSkillButtonTypeList[t]);
      this.CurButtonTypeList.push(void 0);
    }
    var t;
    this.Climbing &&
      -1 !== (t = this.CurButtonTypeList.indexOf(4)) &&
      (this.CurButtonTypeList[t] = 2),
      ModelManager_1.ModelManager.SkillButtonUiModel.GetButtonTypeList().includes(
        12,
      ) &&
        0 <= (t = this.CurButtonTypeList.indexOf(101)) &&
        (this.CurButtonTypeList[t] = 12),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "RefreshGamepadButton", [
          "",
          this.CurButtonTypeList,
        ]);
  }
  sIo(t) {
    return this.IsPhantomRole
      ? !(
          !phantomRoleButtonTypeSet.has(t) &&
          !this.PhantomRoleButtonTypeList?.includes(t)
        )
      : !(
          (this.Climbing && !climbingButtonTypeSet.has(t)) ||
          (this.InWater && !inWaterButtonTypeSet.has(t))
        );
  }
  nIo(t) {
    var i;
    return (
      !!t &&
      ((i =
        ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonDataByButton(
          t,
        ))
        ? i.IsVisible()
        : this.GetBehaviorButtonDataByButtonType(t)?.IsVisible)
    );
  }
  aIo(t) {
    this.IsPhantomRole || this.Climbing || this.InWater
      ? this.sIo(t)
        ? this.CurButtonTypeList.push(t)
        : this.CurButtonTypeList.push(void 0)
      : subButtonTypeSet.has(t)
        ? this.CurButtonTypeList.push(t)
        : this.CurButtonTypeList.push(void 0);
  }
  rIo() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    t?.Valid &&
      ((t = t.Entity.CheckGetComponent(188)),
      (this.Climbing = t.HasTag(504239013)),
      (this.InWater = t.HasTag(855966206)));
  }
  GetButtonTypeByActionName(t) {
    return actionNameToButtonTypeMap.get(t);
  }
  IsAim() {
    return 1 === this.GetBehaviorButtonDataByButtonType(101)?.State || this.VRn;
  }
  SetIsPressCombineButton(t) {
    this.jyo !== t && ((this.jyo = t), this.RefreshButtonData());
  }
  GetIsPressCombineButton() {
    return this.jyo;
  }
  GetBehaviorButtonDataByButtonType(t) {
    return this.byo.get(t);
  }
  RefreshSkillButtonData(t) {
    1 === t &&
      (this.tHs(),
      this.RefreshAimButtonVisible(),
      this.hIo(),
      this.lva(),
      this.ChangeSkillOnAimStateChange(),
      this.RefreshButtonData());
  }
  tHs() {
    this.IsPhantomRole = !1;
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    t?.Valid &&
      (t = t.Entity.GetComponent(0)) &&
      ((t = t.GetRoleConfig()),
      (this.IsPhantomRole = 2 === t.RoleType),
      this.IsPhantomRole) &&
      ((t = ModelManager_1.ModelManager.SkillButtonUiModel),
      (this.PhantomRoleButtonTypeList =
        t?.GetCurSkillButtonEntityData()?.SkillButtonIndexConfig?.DesktopButtonTypeList));
  }
  RefreshAimState() {
    var t = this.hIo() || this.lva();
    return (
      t && (this.ChangeSkillOnAimStateChange(), this.RefreshButtonData()), t
    );
  }
  hIo() {
    var t,
      i,
      e = this.GetBehaviorButtonDataByButtonType(101);
    return (
      !!e &&
      !!(t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)
        ?.Valid &&
      ((t = t.Entity.GetComponent(160).DirectionState),
      (i = e.State),
      t === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection
        ? (e.State = 1)
        : (e.State = 0),
      i !== e.State)
    );
  }
  lva() {
    var t =
      ModelManager_1.ModelManager.BattleUiModel.FormationData.GetFollowerAiming();
    return this.VRn !== t && ((this.VRn = t), !0);
  }
  RefreshAimButtonVisible() {
    var t,
      i = this.GetBehaviorButtonDataByButtonType(101);
    i &&
      ((t =
        ModelManager_1.ModelManager.SkillButtonUiModel.GetCurSkillButtonEntityData())
        ? i.RefreshIsVisible(t.GameplayTagComponent, t.RoleConfig)
        : (i.IsVisible = !1));
  }
  ChangeSkillOnAimStateChange() {
    this.IsAim() !== this.Wyo && this.lIo();
  }
  lIo() {
    this.Xyo ||
      ((this.Xyo = !0),
      (this.Wyo = !this.Wyo),
      this.Wyo
        ? (this.Oyo
            ? InputSettingsManager_1.InputSettingsManager.SetActionKeys(
                this.Oyo,
                this.Fyo.concat(),
              )
            : Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Battle",
                18,
                "手柄RT没有绑定任何输入，瞄准时不需要更换原有按键绑定",
              ),
          this.Hyo
            ? InputSettingsManager_1.InputSettingsManager.SetActionKeys(
                InputMappingsDefine_1.actionMappings.攻击,
                this.Hyo.concat(),
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Battle",
                18,
                "攻击输入没有绑定任何按键，瞄准时使RT键生效",
              ))
        : (this.Oyo &&
            InputSettingsManager_1.InputSettingsManager.SetActionKeys(
              this.Oyo,
              this.kyo.concat(),
            ),
          InputSettingsManager_1.InputSettingsManager.SetActionKeys(
            InputMappingsDefine_1.actionMappings.攻击,
            this.Vyo.concat(),
          )),
      (this.Xyo = !1));
  }
  RefreshInteractBehaviorData() {
    var t = this.GetBehaviorButtonDataByButtonType(104),
      i = UiManager_1.UiManager.IsViewOpen("InteractionHintView");
    t.IsEnable = i;
  }
  OnActionKeyChanged(t) {
    if (this.Kyo)
      return this.Qyo
        ? void 0
        : void (initActionNames.includes(t) && (this.Qyo = !0));
    this.Xyo ||
      (initActionNames.includes(t) &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 18, "在未知情况下触发了改键"));
  }
  OnOpenMenuView() {
    this.Wyo && this.lIo(), (this.Kyo = !0);
  }
  OnCloseMenuView() {
    (this.Kyo = !1),
      this.Qyo && ((this.Qyo = !1), this.Fwi()),
      this.IsAim() !== this.Wyo && this.lIo();
  }
  Fwi() {
    this.RefreshBaseConfigByUserSetting(),
      this.RefreshButtonData(),
      Info_1.Info.IsInGamepad() &&
        ModelManager_1.ModelManager.SkillButtonUiModel?.GetCurSkillButtonEntityData()?.RefreshSkillButtonData(
          2,
        );
  }
}
exports.SkillButtonUiGamepadData = SkillButtonUiGamepadData;
//# sourceMappingURL=SkillButtonUiGamepadData.js.map

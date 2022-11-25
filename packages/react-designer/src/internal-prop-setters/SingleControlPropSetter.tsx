import { RockConfig, RockEvent, RockEventHandlerScript, RockMeta, SingleControlRockPropSetter } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { useMemo } from "react";
import DesignerStore from "../DesignerStore";
import { PropSetterProps } from "../rocks/PropSetter";

export interface SingleControlPropSetterProps extends SingleControlRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
}

export default {
  $type: "singleControlPropSetter",

  renderer(props: SingleControlPropSetterProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    const { propName, control, componentConfig } = props;

    const controlRock: RockConfig = useMemo(() => {
      const inputControlRockConfig = control;
      inputControlRockConfig.$id = `${props.$id}-setterControl-${propName}`;
      inputControlRockConfig.value = componentConfig[propName];

      const onInputControlChange: RockEventHandlerScript["script"] = (event: RockEvent) => {
        const value = event.args;
        const store = page.getStore<DesignerStore>("designerStore");
        store.page.setComponentProperty(store.selectedComponentId, propName, value);
      };

      inputControlRockConfig.onChange = {
        $action: "script",
        script: onInputControlChange,
      };
      return {
        $id: `${inputControlRockConfig.$id}-wrap`,
        $type: "htmlElement",
        htmlTag: "div",
        children: inputControlRockConfig,
      } as RockConfig;
    }, [control, componentConfig]);

    const setterRock: PropSetterProps = {
      $type: "propSetter",
      $id: props.$id,
      label: props.label,
      labelTip: props.labelTip,
      expressionPropName: propName,
      componentConfig,
      children: controlRock,
    };

    return renderRock(framework, page, setterRock);
  },
} as RockMeta;
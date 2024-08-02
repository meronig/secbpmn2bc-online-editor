import { html } from 'htm/preact';

import { TextFieldEntry, CheckboxEntry, SelectEntry, isTextFieldEntryEdited } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';

import { is } from 'bpmn-js/lib/util/ModelUtil';

export default function (element) {

  if (is(element, 'bpmn:TextAnnotation')) {
    return [
      {
        id: 'type',
        element,
        component: Type,
        isEdited: isTextFieldEntryEdited
      }
    ];
  } else {
    return [
      {
        id: 'onChainExecution',
        element,
        component: OnChainExecution,
        isEdited: isTextFieldEntryEdited
      }
    ];
  }
}

function Type(props) {
  const { element, id } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const getValue = () => {
    return element.businessObject.type || '';
  };

  const setValue = value => {
    return modeling.updateProperties(element, {
      type: value
    });
  };

  const getOptions = (element) => {
    const options = [
      { value: 'Accountability', label: translate('Accountability') },
      { value: 'Auditability', label: translate('Auditability') },
      { value: 'Authenticity', label: translate('Authenticity') },
      { value: 'Availability', label: translate('Availability') },
      { value: 'BoD', label: translate('BoD') },
      { value: 'Confidentiality', label: translate('Confidentiality') },
      { value: 'Integrity', label: translate('Integrity') },
    ];
    return options;
  };

  return html`<${SelectEntry}
    id=${id}
    element=${element}
    label=${translate('Type')}
    getOptions=${getOptions}
    getValue=${getValue}
    setValue=${setValue}
    debounce=${debounce}
  />`;
}

function OnChainExecution(props) {
  const { element, id } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const getValue = () => {
    return element.businessObject.onChainExecution || '';
  };

  const setValue = value => {
    return modeling.updateProperties(element, {
      onChainExecution: value
    });
  };

  return html`<${CheckboxEntry}
    id=${id}
    element=${element}
    label=${translate('OnChainExecution')}
    getValue=${getValue}
    setValue=${setValue}
    debounce=${debounce}
  />`;
}

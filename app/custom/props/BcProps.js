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
  } else if (is(element, 'bpmn:Task')){
    return [
      {
        id: 'onChainExecution',
        element,
        component: OnChainExecution,
        isEdited: isTextFieldEntryEdited
      }
    ];
  } else if (is(element, 'bpmn:DataStoreReference') || is(element, 'bpmn:DataObjectReference') || is(element, 'bpmn:MessageFlow')){
    return [
      {
        id: 'onChainData',
        element,
        component: OnChainData,
        isEdited: isTextFieldEntryEdited
      }
    ];
  } else if (is(element, 'bpmn:SubProcess') || is(element, 'bpmn:Participant')){
    return [
      {
        id: 'onChainModel',
        element,
        component: OnChainModel,
        isEdited: isTextFieldEntryEdited
      }
    ];
  } else if (is(element, 'bpmn:Collaboration')){
    return [
      {
        id: 'blockchainType',
        element,
        component: BlockchainType,
        isEdited: isTextFieldEntryEdited
      },
      {
        id: 'onChainModel',
        element,
        component: OnChainModel,
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
      { value: 'NonDelegation', label: translate('NonDelegation') },
      { value: 'NonRepudiation', label: translate('NonRepudiation') },
      { value: 'Privacy', label: translate('Privacy') },
      { value: 'SoD', label: translate('SoD') },
      
      { value: 'PrivityPublic', label: translate('PrivityPublic') },
      { value: 'PrivityPrivate', label: translate('PrivityPrivate') },
      { value: 'PrivityStatic', label: translate('PrivityStatic') },
      { value: 'PrivityWeakDynamic', label: translate('PrivityWeakDynamic') },
      { value: 'PrivityStrongDynamic', label: translate('PrivityStrongDynamic') },
      { value: 'EnforceabilityPublic', label: translate('EnforceabilityPublic') },
      { value: 'EnforceabilityPrivate', label: translate('EnforceabilityPrivate') },
      { value: 'EnforceabilityUserDefined', label: translate('EnforceabilityUserDefined') }
      
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
	if(value == '') {
    return modeling.updateProperties(element, {
      onChainExecution: null
    });} else {
      return modeling.updateProperties(element, {
      onChainExecution: value
    });
	}
  };

  const getOptions = (element) => {
    const options = [
      { value: 'true', label: translate('True') },
      { value: 'false', label: translate('False') },
	  { value: '', label: translate('(unset)') }
      
    ];
    return options;
  };

  return html`<${SelectEntry}
    id=${id}
    element=${element}
    label=${translate('OnChainExecution')}
    getOptions=${getOptions}
    getValue=${getValue}
    setValue=${setValue}
    debounce=${debounce}
  />`;
}

function OnChainModel(props) {
  const { element, id } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const getValue = () => {
    return element.businessObject.onChainModel || '';
  };

  const setValue = value => {
	if(value == '') {
    return modeling.updateProperties(element, {
      onChainModel: null
    });} else {
      return modeling.updateProperties(element, {
      onChainModel: value
    });
	}
  };

  const getOptions = (element) => {
    const options = [
      { value: 'true', label: translate('True') },
      { value: 'false', label: translate('False') },
	  { value: '', label: translate('(unset)') }
      
    ];
    return options;
  };

  return html`<${SelectEntry}
    id=${id}
    element=${element}
    label=${translate('OnChainModel')}
    getOptions=${getOptions}
    getValue=${getValue}
    setValue=${setValue}
    debounce=${debounce}
  />`;

}

function OnChainData(props) {
  const { element, id } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const getValue = () => {
    return element.businessObject.onChainData || '';
  };

  const setValue = value => {
	if(value == '') {
    return modeling.updateProperties(element, {
      onChainData: null
    });} else {
      return modeling.updateProperties(element, {
      onChainData: value
    });
	}
  };

  const getOptions = (element) => {
    const options = [
      { value: 'None', label: translate('None') },
      { value: 'Digest', label: translate('Digest') },
      { value: 'Encrypted', label: translate('Encrypted') },
      { value: 'Unencrypted', label: translate('Unencrypted') },
      { value: '', label: translate('(unset)') }
      
    ];
    return options;
  };

  return html`<${SelectEntry}
    id=${id}
    element=${element}
    label=${translate('OnChainData')}
    getOptions=${getOptions}
    getValue=${getValue}
    setValue=${setValue}
    debounce=${debounce}
  />`;
}

function BlockchainType(props) {
  const { element, id } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const getValue = () => {
    return element.businessObject.blockchainType || '';
  };

  const setValue = value => {
	if(value == '') {
    return modeling.updateProperties(element, {
      blockchainType: null
    });} else {
      return modeling.updateProperties(element, {
      blockchainType: value
    });
	}
  };

  const getOptions = (element) => {
    const options = [
      { value: 'Public', label: translate('Public') },
      { value: 'Private', label: translate('Private') },
	  { value: '', label: translate('(unset)') }
      
    ];
    return options;
  };

  return html`<${SelectEntry}
    id=${id}
    element=${element}
    label=${translate('BlockchainType')}
    getOptions=${getOptions}
    getValue=${getValue}
    setValue=${setValue}
    debounce=${debounce}
  />`;
}
/*
 *
 * Copyright © 2024 Technical University of Denmark
 * 
 * This version of the software was developed by Giovanni Meroni, Assistant Professor, DTU Compute 
 *
 */
import bcProps from './props/BcProps';

import { is } from 'bpmn-js/lib/util/ModelUtil';

const LOW_PRIORITY = 500;

export default function CustomPropertiesProvider(propertiesPanel, translate) {


  this.getGroups = function (element) {

    return function (groups) {

      if (is(element, 'bpmn:TextAnnotation') || 
      is(element, 'bpmn:Task') || 
      is(element, 'bpmn:DataObjectReference') || is(element, 'bpmn:DataStoreReference') || 
      is(element, 'bpmn:MessageFlow') ||
      is(element, 'bpmn:Collaboration') ||
      is(element, 'bpmn:SubProcess') || is(element, 'bpmn:Participant')
      ) {
        groups.push(createBcGroup(element, translate));
      }

      return groups;
    };
  };


  propertiesPanel.registerProvider(LOW_PRIORITY, this);
}

CustomPropertiesProvider.$inject = ['propertiesPanel', 'translate'];

function createBcGroup(element, translate) {

  const magicGroup = {
    id: 'secbpmn2bc',
    label: translate('SecBPMN2BC properties'),
    entries: bcProps(element)
  };

  return magicGroup;
}

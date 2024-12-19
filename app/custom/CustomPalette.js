/*
 *
 * Copyright © 2024 Technical University of Denmark
 * 
 * This version of the software was developed by Giovanni Meroni, Assistant Professor, DTU Compute 
 *
 */

import accountability from './shapes/accountability.svg';

export default class CustomPalette {
  constructor(bpmnFactory, create, elementFactory, palette, translate) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    palette.registerProvider(this);
  }

  getPaletteEntries(element) {
    const {
      bpmnFactory,
      create,
      elementFactory,
      translate
    } = this;
	
	function createAnnotation() {
      return function(event) {
        const businessObject = bpmnFactory.create('bpmn:TextAnnotation');
		
		businessObject.type = 'Auditability';

        const shape = elementFactory.createShape({
          type: 'bpmn:TextAnnotation',
          businessObject: businessObject
        });

        create.start(event, shape);
      };
    }

    return {
	  'create.annotation': {
        group: 'annotation',
        //className: 'bpmn-icon-start-event-none',
		title: translate('Create Security Annotation'),
		imageUrl: accountability,
        action: {
          dragstart: createAnnotation(),
          click: createAnnotation()
        }
      }
    };
  }
}

CustomPalette.$inject = [
  'bpmnFactory',
  'create',
  'elementFactory',
  'palette',
  'translate'
];
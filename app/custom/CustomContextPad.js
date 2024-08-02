const SUITABILITY_SCORE_HIGH = 100,
      SUITABILITY_SCORE_AVERGE = 50,
      SUITABILITY_SCORE_LOW = 25;
	  
import accountability from './shapes/accountability.svg';

export default class CustomContextPad {
  constructor(bpmnFactory, config, contextPad, create, elementFactory, injector, translate) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false);
    }

    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    const {
      autoPlace,
      bpmnFactory,
      create,
      elementFactory,
      translate
    } = this;


	function appendSecurityAnnotation() {
      return function(event, element) {
        if (autoPlace) {
          const businessObject = bpmnFactory.create('bpmn:TextAnnotation');

          businessObject.type = 'Auditability';

          const shape = elementFactory.createShape({
            type: 'bpmn:TextAnnotation',
            businessObject: businessObject
          });

          autoPlace.append(element, shape);
        } else {
          appendSecurityAnnotationStart(event, element);
        }
      };
    }

    function appendSecurityAnnotationStart() {
      return function(event) {
        const businessObject = bpmnFactory.create('bpmn:TextAnnotation');

        businessObject.type = 'Auditability';

        const shape = elementFactory.createShape({
          type: 'bpmn:TextAnnotation',
          businessObject: businessObject
        });

        create.start(event, shape, element);
      };
    }

    return {
      'append.security-annotation': {
        group: 'model',
        className: 'bpmn-icon-start-event-none',
        //imageUrl: accountability,
		title: translate('Append security annotation'),
        action: {
          click: appendSecurityAnnotation(),
          dragstart: appendSecurityAnnotationStart()
        }
      }
    };
  }
}

CustomContextPad.$inject = [
  'bpmnFactory',
  'config',
  'contextPad',
  'create',
  'elementFactory',
  'injector',
  'translate'
];
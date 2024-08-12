import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import accountability from './shapes/accountability.svg';
import auditability from './shapes/auditability.svg';
import authenticity from './shapes/authenticity.svg';
import availability from './shapes/availability.svg';
import bod from './shapes/bod.svg';
import confidentiality from './shapes/confidentiality.svg';
import integrity from './shapes/integrity.svg';
import nonDelegation from './shapes/nonDelegation.svg';
import nonRepudiation from './shapes/nonRepudiation.svg';
import privacy from './shapes/privacy.svg';
import sod from './shapes/sod.svg';

import privityPublic from './shapes/privityPublic.svg';
import privityPrivate from './shapes/privityPrivate.svg';
import privityStatic from './shapes/privityStatic.svg';
import privityWeakDynamic from './shapes/privityWeakDynamic.svg';
import privityStrongDynamic from './shapes/privityStrongDynamic.svg';
import enforceabilityPublic from './shapes/enforceabilityPublic.svg';
import enforceabilityPrivate from './shapes/enforceabilityPrivate.svg';
import enforceabilityUserDefined from './shapes/enforceabilityUserDefined.svg';


import {
  append as svgAppend,
  attr as svgAttr,
  classes as svgClasses,
  create as svgCreate,
  remove as svgRemove
} from 'tiny-svg';

import {
  getRoundRectPath
} from 'bpmn-js/lib/draw/BpmnRenderUtil';

import {
  is,
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import { isNil } from 'min-dash';

const HIGH_PRIORITY = 1500,
  TASK_BORDER_RADIUS = 2,
  COLOR_GREEN = '#52B415',
  COLOR_YELLOW = '#ffc800',
  COLOR_RED = '#cc0000';


export default class CustomRenderer extends BaseRenderer {
  constructor(eventBus, bpmnRenderer) {
    super(eventBus, HIGH_PRIORITY);

    this.bpmnRenderer = bpmnRenderer;
  }

  canRender(element) {

    // ignore labels
    //return !element.labelTarget;
    return is(element, 'bpmn:TextAnnotation');

  }

  drawShape(parentNode, element) {

    const type = this.getType(element);

    let shape;

    if (!isNil(type)) {

      element.width = 50;
      element.height = 50;

      switch (type) {
        case 'Accountability':
          shape = drawAnnotation(parentNode, element.width, element.height, accountability);
          break;
        case 'Auditability':
          shape = drawAnnotation(parentNode, element.width, element.height, auditability);
          break;
        case 'Authenticity':
          shape = drawAnnotation(parentNode, element.width, element.height, authenticity);
          break;
        case 'Availability':
          shape = drawAnnotation(parentNode, element.width, element.height, availability);
          break;
        case 'BoD':
          shape = drawAnnotation(parentNode, element.width, element.height, bod);
          break;
        case 'Confidentiality':
          shape = drawAnnotation(parentNode, element.width, element.height, confidentiality);
          break;
        case 'Integrity':
          shape = drawAnnotation(parentNode, element.width, element.height, integrity);
          break;
        case 'NonDelegation':
          shape = drawAnnotation(parentNode, element.width, element.height, nonDelegation);
          break;
        case 'NonRepudiation':
          shape = drawAnnotation(parentNode, element.width, element.height, nonRepudiation);
          break;
        case 'Privacy':
          shape = drawAnnotation(parentNode, element.width, element.height, privacy);
          break;
        case 'SoD':
          shape = drawAnnotation(parentNode, element.width, element.height, sod);
          break;
        case 'PrivityPublic':
          shape = drawAnnotation(parentNode, element.width, element.height, privityPublic);
          break;
        case 'PrivityPrivate':
          shape = drawAnnotation(parentNode, element.width, element.height, privityPrivate);
          break;
        case 'PrivityStatic':
          shape = drawAnnotation(parentNode, element.width, element.height, privityStatic);
          break;
        case 'PrivityWeakDynamic':
          shape = drawAnnotation(parentNode, element.width, element.height, privityWeakDynamic);
          break;
        case 'PrivityStrongDynamic':
          shape = drawAnnotation(parentNode, element.width, element.height, privityStrongDynamic);
          break;
        case 'EnforceabilityPublic':
          shape = drawAnnotation(parentNode, element.width, element.height, enforceabilityPublic);
          break;
        case 'EnforceabilityPrivate':
          shape = drawAnnotation(parentNode, element.width, element.height, enforceabilityPrivate);
          break;
        case 'EnforceabilityUserDefined':
          shape = drawAnnotation(parentNode, element.width, element.height, enforceabilityUserDefined);
          break;
        default:
          shape = this.bpmnRenderer.drawShape(parentNode, element);
      }
    } else {
      shape = this.bpmnRenderer.drawShape(parentNode, element);
    }


    return shape;
  }

  getType(element) {
    const businessObject = getBusinessObject(element);

    const { type } = businessObject;

    return type;
  }
}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer'];

// helpers //////////

// copied from https://github.com/bpmn-io/bpmn-js/blob/master/lib/draw/BpmnRenderer.js
function drawAnnotation(parentNode, width, height, type) {


  const rect = svgCreate('image', {
    x: 0,
    y: 0,
    width: width,
    height: height,
    href: type
  });

  svgAppend(parentNode, rect);

  return rect;
}

function prependTo(newNode, parentNode, siblingNode) {
  parentNode.insertBefore(newNode, siblingNode || parentNode.firstChild);
}


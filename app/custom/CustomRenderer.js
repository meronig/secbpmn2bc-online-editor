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

import chain from './shapes/chain.svg';

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
    return is(element, 'bpmn:TextAnnotation') ||
    is(element, 'bpmn:DataObjectReference') ||
    is(element, 'bpmn:DataStoreReference') ||
    is(element, 'bpmn:Task');


  }

  drawShape(parentNode, element) {

    const type = this.getType(element);
    const onChainExecution = this.getOnChainExecution(element);
    const onChainData = this.getOnChainData(element);

    let shape;

    if (!isNil(type)) {

      element.width = 50;
      element.height = 50;

      switch (type) {
        case 'Accountability':
          shape = drawBCAnnotation(parentNode, element.width, element.height, accountability);
          break;
        case 'Auditability':
          shape = drawBCAnnotation(parentNode, element.width, element.height, auditability);
          break;
        case 'Authenticity':
          shape = drawBCAnnotation(parentNode, element.width, element.height, authenticity);
          break;
        case 'Availability':
          shape = drawBCAnnotation(parentNode, element.width, element.height, availability);
          break;
        case 'BoD':
          shape = drawBCAnnotation(parentNode, element.width, element.height, bod);
          break;
        case 'Confidentiality':
          shape = drawBCAnnotation(parentNode, element.width, element.height, confidentiality);
          break;
        case 'Integrity':
          shape = drawBCAnnotation(parentNode, element.width, element.height, integrity);
          break;
        case 'NonDelegation':
          shape = drawBCAnnotation(parentNode, element.width, element.height, nonDelegation);
          break;
        case 'NonRepudiation':
          shape = drawBCAnnotation(parentNode, element.width, element.height, nonRepudiation);
          break;
        case 'Privacy':
          shape = drawBCAnnotation(parentNode, element.width, element.height, privacy);
          break;
        case 'SoD':
          shape = drawBCAnnotation(parentNode, element.width, element.height, sod);
          break;
        case 'PrivityPublic':
          shape = drawBCAnnotation(parentNode, element.width, element.height, privityPublic);
          break;
        case 'PrivityPrivate':
          shape = drawBCAnnotation(parentNode, element.width, element.height, privityPrivate);
          break;
        case 'PrivityStatic':
          shape = drawBCAnnotation(parentNode, element.width, element.height, privityStatic);
          break;
        case 'PrivityWeakDynamic':
          shape = drawBCAnnotation(parentNode, element.width, element.height, privityWeakDynamic);
          break;
        case 'PrivityStrongDynamic':
          shape = drawBCAnnotation(parentNode, element.width, element.height, privityStrongDynamic);
          break;
        case 'EnforceabilityPublic':
          shape = drawBCAnnotation(parentNode, element.width, element.height, enforceabilityPublic);
          break;
        case 'EnforceabilityPrivate':
          shape = drawBCAnnotation(parentNode, element.width, element.height, enforceabilityPrivate);
          break;
        case 'EnforceabilityUserDefined':
          shape = drawBCAnnotation(parentNode, element.width, element.height, enforceabilityUserDefined);
          break;
        default:
          shape = this.bpmnRenderer.drawShape(parentNode, element);
      }
    } else {
      shape = this.bpmnRenderer.drawShape(parentNode, element);
      if (onChainExecution) {
        drawChain(parentNode, element.width, element.height);
      } else if (!isNil(onChainData)){
        if (onChainData!='None') {
          drawChain(parentNode, element.width, element.height);
        }
      }
    }

    

    return shape;
  }

  getType(element) {
    const businessObject = getBusinessObject(element);

    const { type } = businessObject;

    return type;
  }

  getOnChainExecution(element) {
    const businessObject = getBusinessObject(element);

    const { onChainExecution } = businessObject;

    return onChainExecution;
  }

  getOnChainData(element) {
    const businessObject = getBusinessObject(element);

    const { onChainData } = businessObject;

    return onChainData;
  }
}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer'];

// helpers //////////

// copied from https://github.com/bpmn-io/bpmn-js/blob/master/lib/draw/BpmnRenderer.js
function drawBCAnnotation(parentNode, width, height, type) {


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

function drawChain(parentNode, width, height) {

  const rect = svgCreate('image', {
    x: 0,
    y: 0,
    width: width,
    height: height,
    href: chain
  });

  svgAppend(parentNode, rect);

  return rect;
}

function prependTo(newNode, parentNode, siblingNode) {
  parentNode.insertBefore(newNode, siblingNode || parentNode.firstChild);
}


/*
 *
 * Copyright © 2024 Technical University of Denmark
 * 
 * This version of the software was developed by Giovanni Meroni, Assistant Professor, DTU Compute 
 *
 */

import inherits from 'inherits-browser';

import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';


export default function CustomRules(eventBus) {
  RuleProvider.call(this, eventBus);
}

inherits(CustomRules, RuleProvider);

CustomRules.$inject = [ 'eventBus' ];


CustomRules.prototype.init = function() {

  this.addRule('shape.create', function(context) {

    var shape = context.shape,
        target = context.target;

    var shapeBo = shape.businessObject,
        targetBo = target.businessObject;

    var allowDrop = targetBo.get('vendor:allowDrop');

    if (!allowDrop || !shapeBo.$instanceOf(allowDrop)) {
      return false;
    }

  });
};
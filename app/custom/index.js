import CustomContextPad from './CustomContextPad';
import CustomPalette from './CustomPalette';
import CustomRenderer from './CustomRenderer';
import CustomPropertiesProvider from './CustomPropertiesProvider';
import CustomRules from './CustomRules';


export default {
  __init__: [ 'customContextPad', 'customPalette', 'customRenderer', 'customPropertiesProvider' ],
  customContextPad: [ 'type', CustomContextPad ],
  customPalette: [ 'type', CustomPalette ],
  customRenderer: [ 'type', CustomRenderer ],
  customPropertiesProvider: [ 'type', CustomPropertiesProvider ],
  customRules: [ 'type', CustomRules ]
};
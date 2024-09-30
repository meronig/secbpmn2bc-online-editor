import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';

import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import '@bpmn-io/properties-panel/assets/properties-panel.css';

import './style.less';

import $ from 'jquery';
import BpmnModeler from 'bpmn-js/lib/Modeler';

import { debounce } from 'min-dash';

import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from 'bpmn-js-properties-panel';

import diagramXML from '../resources/diagram.bpmn';

import secExtension from '../resources/sec';

import customModule from './custom';

import yesno from "yesno-dialog";


var container = $('#js-drop-zone');

var canvas = $('#js-canvas');

var bpmnModeler = new BpmnModeler({
  container: canvas,
  propertiesPanel: {
    parent: '#js-properties-panel'
  },
  additionalModules: [
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
    customModule
  ],
  moddleExtensions: {
    sec: secExtension
  }
});
container.removeClass('with-diagram');

function createNewDiagram() {
  openDiagram(diagramXML);
}

async function openDiagram(xml) {

  try {

    await bpmnModeler.importXML(xml);

    container
      .removeClass('with-error')
      .addClass('with-diagram');
  } catch (err) {

    container
      .removeClass('with-diagram')
      .addClass('with-error');

    container.find('.error pre').text(err.message);

    console.error(err);
  }
}

function registerFileDrop(container, callback) {

  function handleFileSelect(e) {
    e.stopPropagation();
    e.preventDefault();

    var files = e.dataTransfer.files;

    var file = files[0];

    var reader = new FileReader();

    reader.onload = function(e) {

      var xml = e.target.result;

      callback(xml);
    };

    reader.readAsText(file);
  }

  function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();

    e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  container.get(0).addEventListener('dragover', handleDragOver, false);
  container.get(0).addEventListener('drop', handleFileSelect, false);
}


// file drag / drop ///////////////////////

// check file api availability
if (!window.FileList || !window.FileReader) {
  window.alert(
    'Looks like you use an older browser that does not support drag and drop. ' +
    'Try using Chrome, Firefox or the Internet Explorer > 10.');
} else {
  registerFileDrop(container, openDiagram);
}

// bootstrap diagram functions

$(function() {
	
  function setEncoded(link, name, data) {
    var encodedData = encodeURIComponent(data);

    if (data) {
      link.addClass('active').attr({
        'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
        'download': name
      });
    } else {
      link.removeClass('active');
    }
  }
  
  var downloadLink = $('#js-download-diagram');
  var downloadSecLink = $('#js-download-sec');
  var downloadSvgLink = $('#js-download-svg');
  var checkAttrLink = $('#js-check-attr');
  var annotateLink = $('#js-annotate');
  
  

  $('#js-create-diagram').click(function(e) {
    e.stopPropagation();
    e.preventDefault();

    createNewDiagram();
  });

  
  
  downloadSecLink.click(async function(e) {
	  setEncoded(downloadSecLink, 'diagram.bpmn', null);
	  
	  const { xml } = await bpmnModeler.saveXML({ format: true })
	  
	  let formData = new FormData();
	  var strblob = new Blob([xml], {type: 'application/xml'});
	  formData.append('file', strblob, 'diagram.bpmn');

	  const resp = await fetch("http://localhost:8080/convert", {
		method: "POST",
		  body: formData
		});
		
	  const responseText = await resp.text();


      var strblob = new Blob([responseText], {type: 'application/xml'});

	  
	  // Create a new link element with the download attribute set to the desired filename
		var link = document.createElement('a');
		link.setAttribute('download', 'diagram.secbpmn2bc');

		// Set the link's href attribute to the temporary URL
		link.href = URL.createObjectURL(strblob);;

		// Simulate a click on the link to trigger the download
		document.body.appendChild(link);
		link.click();

		// Clean up the temporary URL and link element
		document.body.removeChild(link);
		
		setEncoded(downloadSecLink, 'diagram.bpmn', strblob);  
  });


  checkAttrLink.click(async function(e) {
	  setEncoded(checkAttrLink, 'diagram.bpmn', null);
	  const { xml } = await bpmnModeler.saveXML({ format: true })
	  
	  let formData = new FormData();
	  var strblob = new Blob([xml], {type: 'application/xml'});
	  formData.append('file', strblob, 'diagram.bpmn');

	  const resp = await fetch("http://localhost:8080/convert", {
		method: "POST",
		  body: formData
		});
		
	  const responseText = await resp.text();

	
	  formData = new FormData();
	  var strblob = new Blob([responseText], {type: 'application/xml'});
	  formData.append('file', strblob, 'diagram.secbpmn2bc');

	  const resp2 = await fetch("http://localhost:8080/check", {
		method: "POST",
		  body: formData
		});
		
      const resp2text = await resp2.text();
	  alert(resp2text.replace(/,/g, '\n'));
	  setEncoded(checkAttrLink, 'diagram.bpmn', xml);
	  
  });

  annotateLink.click(async function(e) {
	  setEncoded(annotateLink, 'diagram.bpmn', null);
	  
	  //let preserve = confirm("Do you want to preserve the values currently assigned to blockchain properties?");
	  let preserve = await yesno({
		labelYes: "Yes",
		labelNo: "No",
		bodyText: "Do you want to preserve the values currently assigned to blockchain properties?"
	  });
	  
	  const { xml } = await bpmnModeler.saveXML({ format: true })
	  
	  let formData = new FormData();
	  var bpmnblob = new Blob([xml], {type: 'application/xml'});
	  formData.append('file', bpmnblob, 'diagram.bpmn');

	  const resp = await fetch("http://localhost:8080/convert", {
		method: "POST",
		  body: formData
		});
		
	  const responseText = await resp.text();

	  formData = new FormData();
	  var secbpmnblob = new Blob([responseText], {type: 'application/xml'});
	  formData.append('file', secbpmnblob, 'diagram.secbpmn2bc');
	  formData.append('override', !preserve);
	  
	  const resp2 = await fetch("http://localhost:8080/annotate", {
		method: "POST",
		  body: formData
		});
		
      const resp2text = await resp2.text();
	
	  /* handle fatals */
	  if(Array.from(resp2text)[0] == '<') {
	  
	  
		formData = new FormData();
		var secbpmnblob = new Blob([resp2text], {type: 'application/xml'});
		formData.append('bpmnfile', bpmnblob, 'diagram.bpmn');
		formData.append('secbpmnfile', secbpmnblob, 'diagram.secbpmn2bc');
		  
		const resp3 = await fetch("http://localhost:8080/updateModel", {
			method: "POST",
			  body: formData
			});
			
		const resp3text = await resp3.text();
		  
		var strblob = new Blob([resp2text], {type: 'application/xml'});
		
		openDiagram(resp3text);
	  
	  } else {
		alert(resp2text.replace(/,/g, '\n'));
	  }
	  setEncoded(annotateLink, 'diagram.bpmn', xml);
	    
	  
  });

  $('.buttons a').click(function(e) {
    if (!$(this).is('.active')) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
  
  


  var exportArtifacts = debounce(async function() {

    try {

      const { svg } = await bpmnModeler.saveSVG();

      setEncoded(downloadSvgLink, 'diagram.svg', svg);
    } catch (err) {

      console.error('Error happened saving SVG: ', err);

      setEncoded(downloadSvgLink, 'diagram.svg', null);
    }

    try {

      const { xml } = await bpmnModeler.saveXML({ format: true });

      setEncoded(downloadLink, 'diagram.bpmn', xml);
	  setEncoded(downloadSecLink, 'diagram.secbpmn2bc', xml);
	  setEncoded(checkAttrLink, 'diagram.bpmn', xml);
	  setEncoded(annotateLink, 'diagram.bpmn', xml);
	  
    } catch (err) {

      console.log('Error happened saving XML: ', err);

      setEncoded(downloadLink, 'diagram.bpmn', null);
	  setEncoded(downloadSecLink, 'diagram.secbpmn2bc', null);
	  setEncoded(checkAttrLink, 'diagram.bpmn', null);
	  setEncoded(annotateLink, 'diagram.bpmn', null);
	  
    }
	
	/*
	try {

      const { xml } = await bpmnModeler.saveXML({ format: true })
	  
	  let formData = new FormData();
	  var strblob = new Blob([xml], {type: 'application/xml'});
	  formData.append('file', strblob, 'diagram.bpmn');

	  const resp = await fetch("http://localhost:8080/convert", {
		method: "POST",
		  body: formData
		});
		
	  const responseText = await resp.text();
		
	  //setEncoded(downloadSec, 'diagram.secbpmn2bc', responseText);

    } catch (err) {

      console.log('Error happened saving XML: ', err);

      //setEncoded(downloadSec, 'diagram.secbpmn2bc', null);
    }
	*/
  }, 500);

  bpmnModeler.on('commandStack.changed', exportArtifacts);
});
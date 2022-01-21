// ! Imports
import {$js, update, updateURLCode, $html, $css} from './main'
import {download, exportFile} from './download'
import {$} from './main';
import cssFormatMonaco from 'css-format-monaco';
import * as monaco from 'monaco-editor'

// ! Variables
const $skypackBar  = $('.skypackbar')
const $skypackBtn  = $('#importmodule')
const $runBtn      = $('#run');
const $skypackInp  = $('#skyinp')
const $downloadBtn = $("#download");
const $exportBtn = $("#export");
const $jsBtn       = $('#skypack');
const $previewBtn  = $('#preview');
const $importBtn  = $('#import');


function importData() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
      // you can use this method to get file and perform respective operations
              let files = e.target.files;
              let f = files[0];
              let r= ''
              console.log(f);
              let reader = new FileReader();
                let o = reader.readAsText(f);
                reader.onload = function(f) {
                    r = f.target.result.replace('###HTML\n', '###>><</CODEEBOX_SEPARATOR').replace('###CSS\n', '###>><</CODEEBOX_SEPARATOR').replace('###JS\n', '###>><</CODEEBOX_SEPARATOR').split('###>><</CODEEBOX_SEPARATOR');
                    $html.setValue(r[1]);
                    $css.setValue(r[2]);
                    $js.setValue(r[3]);
                }
               
          };
    input.click();
  }


// * Open settings button
let open = false
$jsBtn.addEventListener('click', () => {
    if(!open){
        $skypackBar.style.display = "block";
        $jsBtn.style.borderLeft = `5px solid #0af`;
    }
    else{
        $skypackBar.style.display = "none";
        $jsBtn.style.borderLeft = `none`;
    }
    open = !open
})

// ! Event listeners
$skypackBtn.addEventListener('click', () => {
    $js.trigger('keyboard', 'type', {text: `import ${$skypackInp.value.replace('-', '').toLowerCase()} from 'https://cdn.skypack.dev/${$skypackInp.value}'`});
})

$downloadBtn.addEventListener("click", () => {
    download();
    let oldColor = $downloadBtn.style.color;
    $downloadBtn.style.color = 'lightgreen';
    setTimeout((() => $downloadBtn.style.color = oldColor), 5000)
})

$exportBtn.addEventListener("click", () => {
    exportFile();
    let oldColor = $exportBtn.style.color;
    $downloadBtn.style.color = 'lightgreen';
    setTimeout((() => $exportBtn.style.color = oldColor), 5000)
})

$previewBtn.addEventListener('click', () => {
    console.log($('#prev'))
    $('#prev').requestFullscreen();
})

$runBtn.addEventListener('click', () => {
    update();
})

$importBtn.addEventListener('click', () => {

    importData();

    // fetch('project.codee')
    // .then(response => response.text())
    // .then(data => {
    //     let code = data.toString();
    //     code = code.split('###HTML\n').join('#####///').split('###CSS\n').join('#####///').split('###JS\n').join('#####///').split('#####///');
    //     console.log(code)
    //     $html.setValue(code[1]);
    //     $css.setValue(code[2]);
    //     $js.setValue(code[3]);
    // });
})






var save = [$js,$html,$css].forEach(e => {
    e.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, function() {
        update();
        updateURLCode($html.getValue(), $css.getValue(), $js.getValue());
    })    
})
var htmlPalette = $html.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyP, function() {
    $html.trigger('anyString', 'editor.action.quickCommand')
});
var cssPalette = $css.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyP, function() {
    $css.trigger('anyString', 'editor.action.quickCommand')
});
var jsPalette = $js.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyP, function() {
    $js.trigger('anyString', 'editor.action.quickCommand')
});

const generateCssFormater = () => cssFormatMonaco(
    monaco,
    {
        indent_size: 2
    }
)

generateCssFormater();
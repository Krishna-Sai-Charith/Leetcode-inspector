const btn=document.getElementById('turn-off');
const inspectorText=document.getElementById('inspector-text');
btn.addEventListener('click',function(){
 if(btn.textContent==='Turn off'){
    btn.textContent='Turn on';
    inspectorText.textContent='Extension deavtivated';
    extensionEnabled = false;
 }
 else{
    btn.textContent='Turn off';
    inspectorText.textContent='Inspector is watching you';
    extensionEnabled = true;
 }
});
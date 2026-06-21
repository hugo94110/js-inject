(function() {
    function openModal() {
        if (document.querySelector('#os-modal')) return;

        var modal = document.createElement('div');
        modal.id = 'os-modal';
        modal.className = 'FullModalOverlay';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="ModalOverlayContent ModalOverlayBackground"></div>
            <div class="ModalPosition" tabindex="0">
                <div class="ModalPosition_Content">
                    <div class="ModalPosition_TopBar"></div>
                    <div class="DialogContent _DialogLayout GenericDialogBase GenericConfirmDialog _DialogCenterVertically">
                        <div class="DialogContent_InnerWidth">
                            <div class="Panel">
                                <div class="_2IWpfqj8UL5hUs7n-pxnUy DialogHeader">
                                    <div role="heading" aria-level="2" class="DialogHeader">Installer un script</div>
                                </div>
                                <div class="DialogInput_Wrapper _DialogLayout Panel" style="margin-top:16px;">
                                    <input id="os-appid-input"
                                        class="DialogInput DialogInputPlaceholder DialogTextInputBase Focusable"
                                        placeholder="AppID"
                                        type="text"
                                        spellcheck="false">
                                </div>
                                <div class="DialogFooter">
                                    <div class="DialogTwoColLayout _DialogColLayout Panel">
                                        <button id="os-download-btn" type="button" class="DialogButton _DialogLayout Primary Focusable">Télécharger</button>
                                        <button id="os-cancel-btn" type="button" class="DialogButton _DialogLayout Secondary Focusable">Annuler</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.ModalOverlayContent').onclick = () => modal.remove();
        modal.querySelector('#os-cancel-btn').onclick = () => modal.remove();
        modal.querySelector('#os-download-btn').onclick = () => {
            var appid = modal.querySelector('#os-appid-input').value.trim();
            if (!appid) return;
            console.log('OpenSteam: download for AppID', appid);
            modal.remove();
        };
    }

    function inject() {
        var container = document.querySelector('._3cykd-VfN_xBxf3Qxriccm._1-9sir4j_KQiMqdkZjQN0u');
        if (!container || container.querySelector('#testButton')) return;

        container.insertAdjacentHTML('afterbegin', `
            <div id="testButton" style="cursor:pointer; -webkit-app-region:no-drag; margin-right:8px;">
                <div>
                    <div class="_2Szzh5sKyGgnLUR870zbDE RtSv39ZoBOySnb8XQ5hJf _3qhGkQ5qLVNQQ-J2-uPoHt">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="18" height="18" fill="none" style="width:18px !important; height:18px !important; display:block; flex:0 0 auto;" class="_34bQcTHo5QKzuujoEyU1tm">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20 6H16V16H6V20H16V30H20V20H30V16H20V6Z" fill="currentColor"/>
                        </svg>
                    </div>
                </div>
            </div>
        `);

        document.querySelector('#testButton').onclick = openModal;
    }

    new MutationObserver(inject).observe(document.body, { childList: true, subtree: true });
    inject();
})();
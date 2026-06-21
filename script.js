(function() {
    function openModal() {
        if (document.querySelector('#os-modal')) return;

        var wrapper = document.createElement('div');
        wrapper.id = 'os-modal';
        wrapper.className = 'FullModalOverlay';
        wrapper.innerHTML = `
            <div class="ModalOverlayContent ModalOverlayBackground"></div>
            <dialog style="all:unset; display:contents;" open="">
                <div></div>
                <div class="ModalOverlayContent active" tabindex="-1">
                    <div class="ModalPosition" tabindex="0">
                        <div class="ModalPosition_Content">
                            <div class="ModalPosition_TopBar"></div>
                            <div class="ModalPosition_Dismiss">
                                <div id="os-close-btn" class="closeButton">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="SVGIcon_Button SVGIcon_X_Line" width="256px" height="256px" viewBox="0 0 256 256">
                                        <line fill="none" stroke="#FFFFFF" stroke-width="45" stroke-miterlimit="10" x1="212" y1="212" x2="44" y2="44"></line>
                                        <line fill="none" stroke="#FFFFFF" stroke-width="45" stroke-miterlimit="10" x1="44" y1="212" x2="212" y2="44"></line>
                                    </svg>
                                </div>
                            </div>
                            <div class="DialogContent _DialogLayout GenericDialogBase GenericConfirmDialog _DialogCenterVertically" style="min-width:500px;">
                                <div class="DialogContent_InnerWidth">
                                    <div role="heading" aria-level="2" class="DialogHeader">Add a game</div>
                                    <div class="DialogBody">
                                        <div class="DialogInput_Wrapper _DialogLayout Panel">
                                            <input id="os-appid-input"
                                                class="DialogInput DialogInputPlaceholder DialogTextInputBase Focusable"
                                                placeholder="AppID"
                                                type="text"
                                                spellcheck="false">
                                        </div>
                                    </div>
                                    <div class="DialogFooter">
                                        <div class="DialogTwoColLayout _DialogColLayout Panel">
                                            <button id="os-download-btn" type="button" class="DialogButton _DialogLayout Primary Focusable">Download</button>
                                            <button id="os-cancel-btn" type="button" class="DialogButton _DialogLayout Secondary Focusable">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        `;

        var container = document.querySelector('._27qasW5wLU4h4nUgawpo1q') || document.body;
        container.appendChild(wrapper);

        var closeModal = () => wrapper.remove();
        wrapper.querySelector('.ModalOverlayContent.active').addEventListener('click', (e) => {
            if (!wrapper.querySelector('.DialogContent').contains(e.target)) closeModal();
        });
        wrapper.querySelector('#os-close-btn').onclick = closeModal;
        wrapper.querySelector('#os-cancel-btn').onclick = closeModal;
        wrapper.querySelector('#os-download-btn').onclick = () => {
            var appid = wrapper.querySelector('#os-appid-input').value.trim();
            if (!appid) return;
            console.log('OpenSteam: download for AppID', appid);
            closeModal();
        };
    }

    function inject() {
        var container = document.querySelector('._3cykd-VfN_xBxf3Qxriccm._1-9sir4j_KQiMqdkZjQN0u');
        if (!container || container.querySelector('#testButton')) return;

        container.insertAdjacentHTML('afterbegin', `
            <div id="testButton" style="cursor:pointer; -webkit-app-region:no-drag; margin-right:8px;">
                <div class="_2Szzh5sKyGgnLUR870zbDE RtSv39ZoBOySnb8XQ5hJf _3qhGkQ5qLVNQQ-J2-uPoHt">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="18" height="18" fill="none" style="width:18px !important; height:18px !important; display:block; flex:0 0 auto;" class="_34bQcTHo5QKzuujoEyU1tm">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20 6H16V16H6V20H16V30H20V20H30V16H20V6Z" fill="currentColor"/>
                    </svg>
                </div>
            </div>
        `);

        document.querySelector('#testButton').onclick = openModal;
    }

    new MutationObserver(inject).observe(document.body, { childList: true, subtree: true });
    inject();
})();
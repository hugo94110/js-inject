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
        if (!container || container.querySelector('#addGameButton') || container.querySelector('#githubButton')) return;

        container.insertAdjacentHTML('afterbegin', `
            <div style="-webkit-app-region:no-drag; display:flex; align-items:center; gap:8px; margin-right:8px;">
                <div class="_2Lu3d-5qLmW4i19ysTt2jT"><div class="" style="font-size:12px;">OpenSteam is active</div></div>

                <div id="githubButton" style="cursor:pointer;">
                    <div class="_2Szzh5sKyGgnLUR870zbDE RtSv39ZoBOySnb8XQ5hJf _3qhGkQ5qLVNQQ-J2-uPoHt" style="display:flex; align-items:center; justify-content:center;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 1024 1024" fill="none" style="width:18px !important; height:18px !important; display:block; flex:0 0 auto; margin:auto;" class="_34bQcTHo5QKzuujoEyU1tm">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="currentColor"/>
                        </svg>
                    </div>
                </div>

                <div id="addGameButton" style="cursor:pointer;">
                    <div class="_2Szzh5sKyGgnLUR870zbDE RtSv39ZoBOySnb8XQ5hJf _3qhGkQ5qLVNQQ-J2-uPoHt">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="18" height="18" fill="none" style="width:18px !important; height:18px !important; display:block; flex:0 0 auto;" class="_34bQcTHo5QKzuujoEyU1tm">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20 6H16V16H6V20H16V30H20V20H30V16H20V6Z" fill="currentColor"/>
                        </svg>
                    </div>
                </div>
            </div>
        `);

        document.querySelector('#addGameButton').onclick = openModal;
        document.querySelector('#githubButton').onclick = function() {
            window.open('https://github.com/hugo94110', '_blank', 'noopener,noreferrer');
        };
    }

    new MutationObserver(inject).observe(document.body, { childList: true, subtree: true });
    inject();
})();
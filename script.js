(function() {
    const title = document.title;

    function getMainWindow() {
        if (title === 'Steam') return window;
        try {
            var popups = Array.from(window.opener.g_PopupManager.GetPopups());
            for (var i = 0; i < popups.length; i++) {
                if (popups[i].m_popup.document.title === 'Steam') return popups[i].m_popup;
            }
        } catch (e) {}
        return null;
    }

    function setStoreBrowserVisible(visible) {
        try {
            var manager = window.opener.MainWindowBrowserManager;
            if (manager.m_lastLocation.pathname.startsWith('/browser')) {
                manager.m_browser.SetVisible(visible);
            }
        } catch (e) {}
    }

    function closeModal(wrapper) {
        var doc = wrapper.ownerDocument;
        wrapper.remove();
        if (!doc.querySelector('.osModal')) setStoreBrowserVisible(true);
    }

    function createModal(id, innerHtml, closeable) {
        var mainWindow = getMainWindow();
        if (!mainWindow) return null;
        var doc = mainWindow.document;
        if (doc.querySelector('#' + id)) return null;
        var container = doc.querySelector('._27qasW5wLU4h4nUgawpo1q');
        if (!container) return null;
        var wrapper = doc.createElement('div');
        wrapper.id = id;
        wrapper.className = 'FullModalOverlay osModal';
        wrapper.innerHTML = `
            <div class="ModalOverlayContent ModalOverlayBackground"></div>
            <dialog class="_32QRvPPBL733SpNR9x0Gp3" open="">
                <div></div>
                <div class="ModalOverlayContent active" tabindex="-1">
                    <div class="ModalPosition" tabindex="0">
                        <div class="ModalPosition_Content">
                            <div class="ModalPosition_TopBar"></div>
                            ${closeable ? `
                            <div class="ModalPosition_Dismiss">
                                <div id="${id}DismissButton" class="closeButton">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="SVGIcon_Button SVGIcon_X_Line" width="256px" height="256px" viewBox="0 0 256 256">
                                        <line fill="none" stroke="#FFFFFF" stroke-width="45" stroke-miterlimit="10" x1="212" y1="212" x2="44" y2="44"></line>
                                        <line fill="none" stroke="#FFFFFF" stroke-width="45" stroke-miterlimit="10" x1="44" y1="212" x2="212" y2="44"></line>
                                    </svg>
                                </div>
                            </div>` : ''}
                            <div class="DialogContent _DialogLayout GenericDialogBase GenericConfirmDialog _2siQZCB9yAOkiG8N-zRZEe _DialogCenterVertically">
                                <div class="DialogContent_InnerWidth">
                                    ${innerHtml}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        `;
        container.appendChild(wrapper);
        if (closeable) {
            wrapper.querySelector('.ModalOverlayContent.active').addEventListener('click', function(e) {
                if (!wrapper.querySelector('.DialogContent').contains(e.target)) closeModal(wrapper);
            });
            wrapper.querySelector('#' + id + 'DismissButton').onclick = function() { closeModal(wrapper); };
        }
        setStoreBrowserVisible(false);
        return wrapper;
    }

    function openProgressModal() {
        var wrapper = createModal('progressModal', `
            <form role="dialog">
                <div class="Panel">
                    <div class="_2IWpfqj8UL5hUs7n-pxnUy DialogHeader">
                        <div role="heading" aria-level="2" class="DialogHeader">Downloading game...</div>
                    </div>
                    <div class="_2V8QeCkR06XqFUJO_GDTVP">
                        <div id="progressModalStatus" style="font-weight:500; text-align:right; margin-bottom:10px;">Please wait...</div>
                        <div role="progressbar" aria-valuenow="0" id="progressModalBar" class="_1-nHjRywUoX7Mpyc6JOPaQ">
                            <div id="progressModalFill" class="_2_0JonK7eKEvh8IoOvq0-B _15MHlcA_l7Joagx8EUsOSP" style="background: var(--gpColor-Blue, #1a9fff);"></div>
                        </div>
                    </div>
                </div>
            </form>
        `, false);
        if (!wrapper) return null;
        return {
            setStatus: function(text) {
                var el = wrapper.querySelector('#progressModalStatus');
                if (el) el.textContent = text;
            },
            close: function() { closeModal(wrapper); }
        };
    }

    function openInfoModal(id, header, body) {
        var wrapper = createModal(id, `
            <form role="dialog">
                <div class="Panel">
                    <div class="_2IWpfqj8UL5hUs7n-pxnUy DialogHeader">
                        <div role="heading" aria-level="2" class="DialogHeader">${header}</div>
                    </div>
                    <div class="_2V8QeCkR06XqFUJO_GDTVP">
                        <div class="DialogBodyText _1fFighONx9alttArw-qWFo">${body}</div>
                    </div>
                    <div class="DialogFooter">
                        <div class="Panel">
                            <button id="${id}CloseButton" type="button" class="DialogButton _DialogLayout Primary Focusable">Close</button>
                        </div>
                    </div>
                </div>
            </form>
        `, true);
        if (wrapper) wrapper.querySelector('#' + id + 'CloseButton').onclick = function() { closeModal(wrapper); };
    }

    function openSuccessModal(appid) {
        openInfoModal('successModal', 'Game added', `AppID ${appid} has been successfully added to your library.`);
    }

    function openErrorModal(message) {
        openInfoModal('errorModal', 'Download failed', message);
    }

    function openAddGameModal() {
        var wrapper = createModal('addGameModal', `
            <form role="dialog">
                <div class="Panel">
                    <div class="_2IWpfqj8UL5hUs7n-pxnUy DialogHeader">
                        <div role="heading" aria-level="2" class="DialogHeader">Add a game</div>
                    </div>
                    <div class="DialogBody">
                        <div class="DialogBodyText">
                            Add a game to your library by entering its AppID. You can find every AppID on <a href="https://steamdb.info" target="_blank">steamdb.info</a>
                        </div>
                        <div class="DialogInput_Wrapper _DialogLayout Panel">
                            <input id="addGameModalAppIDInput"
                                class="DialogInput DialogInputPlaceholder DialogTextInputBase _2JbjuHCSB0QxUPIMEQbqAi Focusable"
                                placeholder="Enter an AppID..."
                                type="text"
                                spellcheck="false">
                        </div>
                    </div>
                    <div class="DialogFooter">
                        <div class="DialogTwoColLayout _DialogColLayout Panel">
                            <button id="addGameModalDownloadButton" type="button" class="DialogButton _DialogLayout Primary Disabled Focusable">Download</button>
                            <button id="addGameModalCancelButton" type="button" class="DialogButton _DialogLayout Secondary Focusable">Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
        `, true);
        if (!wrapper) return;
        wrapper.querySelector('#addGameModalCancelButton').onclick = function() { closeModal(wrapper); };

        var downloadBtn = wrapper.querySelector('#addGameModalDownloadButton');
        var appidInput = wrapper.querySelector('#addGameModalAppIDInput');
        appidInput.addEventListener('input', function() {
            downloadBtn.classList.toggle('Disabled', !/^\d+$/.test(appidInput.value.trim()));
        });

        downloadBtn.onclick = async function() {
            var appid = appidInput.value.trim();
            if (!appid) return;
            var progress = openProgressModal();
            closeModal(wrapper);
            try {
                var res = await (getMainWindow() || window).fetch('http://localhost:9223/download?appid=' + appid);
                var data = await res.json();
                if (data.ok) {
                    openSuccessModal(appid);
                } else {
                    openErrorModal(data.error || 'An unknown error occurred.');
                }
            } catch(e) {
                openErrorModal('OpenSteam server unreachable. Make sure it is running.');
            }
            if (progress) progress.close();
        };
    }

    if (title === 'Steam') {
        function injectS() {
            var steamLabel = document.querySelector('.bSKGlAJG2UVWTsntEJY2v');
            if (steamLabel) {
                var textNode = steamLabel.childNodes[steamLabel.childNodes.length - 1];
                if (textNode && textNode.nodeType === Node.TEXT_NODE && textNode.textContent !== 'OpenSteam') {
                    textNode.textContent = 'OpenSteam';
                }
            }

            var rootBarButtonContainer = document.querySelector('._3cykd-VfN_xBxf3Qxriccm._1-9sir4j_KQiMqdkZjQN0u');
            if (!rootBarButtonContainer) return;

            if (!rootBarButtonContainer.querySelector('#githubButton')) {
                rootBarButtonContainer.insertAdjacentHTML('afterbegin', `
                    <div id="githubButton" style="cursor:pointer;">
                        <div class="_2Szzh5sKyGgnLUR870zbDE _5wILZhsLODVwGfcJ0hKmJ" style="display:flex; align-items:center; justify-content:center;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" style="width:16px !important; height:16px !important; display:block; flex:0 0 auto; margin:auto;" class="_34bQcTHo5QKzuujoEyU1tm">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" fill="currentColor"/>
                            </svg>
                        </div>
                    </div>
                `);

                document.querySelector('#githubButton').onclick = function(event) {
                    event.preventDefault();
                    var link = document.createElement('a');
                    link.href = 'https://github.com/hugo94110/OpenSteam';
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    link.click();
                };
            }

            if (!document.querySelector('#customStyles')) {
                var style = document.createElement('style');
                style.id = 'customStyles';
                style.textContent = [
                    '#addGameButton .SVGIcon_Arrow path { fill: rgb(169, 169, 169); }',
                    '#addGameButton:hover .SVGIcon_Arrow path { fill: rgb(255, 255, 255); }',
                    '#progressModalBar::after { content: unset !important; }',
                    '#progressModalBar * { width: 100%; }'
                ].join(' ');
                document.head.appendChild(style);
            }

            var addGameContainer = document.querySelector('._2WgQEFvIzJw_SHNGbjtRFU');
            if (addGameContainer && !document.querySelector('#addGameButton')) {
                addGameContainer.insertAdjacentHTML('beforeend', `
                    <div id="addGameButton" class="uE7Pj4tb2n3_Bx4vjEX0a rkfSfuCLRt8sqpkXJqxYo Focusable" tabindex="0" role="button">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="SVGIcon_Button SVGIcon_Arrow" x="0px" y="0px" width="256px" height="256px" viewBox="0 0 256 256">
                            <path transform="scale(10.667)" d="M20,11h-7V4c0-0.552-0.448-1-1-1s-1,0.448-1,1v7H4c-0.552,0-1,0.448-1,1s0.448,1,1,1h7v7c0,0.552,0.448,1,1,1s1-0.448,1-1 v-7h7c0.552,0,1-0.448,1-1S20.552,11,20,11z"></path>
                        </svg>
                    </div>
                `);
                document.querySelector('#addGameButton').onclick = openAddGameModal;
            }

        }

        new MutationObserver(injectS).observe(document.body, { childList: true, subtree: true });
        injectS();
    }

    if (title === 'Steam Root Menu') {
        function injectSRM() {
            var container = document.querySelector('._2EstNjFIIZm_WUSKm5Wt7n._3pofGqV0buiKAfMPEs3_82');
            if (!container) return;
            if (container.querySelector('#rootMenuOSItem')) return;

            var referenceNode = container.children[container.children.length - 2];
            var temp = document.createElement('div');
            temp.innerHTML = `
                <hr class="_2jXHP0742MyApMUVUM8IFn _21GPYlKBCLsHQpTsHw_RL_">
                <div id="rootMenuOSItem" role="menuitem" class="_2jXHP0742MyApMUVUM8IFn _2uiDecKkKjAq7nimy3uLhG _1n7Wloe5jZ6fSuvV18NNWI contextMenuItem">Test</div>
                `;
            while (temp.firstChild) {
                container.insertBefore(temp.firstChild, referenceNode);
            }

            document.querySelector('#rootMenuOSItem').onclick = function() {
                openAddGameModal();
            };
        }

        new MutationObserver(injectSRM).observe(document.body, { childList: true, subtree: true });
        injectSRM();
    }

    // if (title === 'Menu') {
    //     function injectM() {
    //         var container = document.querySelector('._2EstNjFIIZm_WUSKm5Wt7n.H2MNnp7B_8r37I5wiifE0');
    //         if (!container || container.querySelector('#menuTestItem')) return;
    //         container.insertAdjacentHTML('afterbegin', `
    //             <div id="menuTestItem" role="menuitem" class="_1n7Wloe5jZ6fSuvV18NNWI contextMenuItem">Test</div>
    //         `);
    //     }
    //
    //     new MutationObserver(injectM).observe(document.body, { childList: true, subtree: true });
    //     injectM();
    // }
})();
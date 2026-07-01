(function() {
    const title = document.title;

    if (title === 'Steam') {
        function openAddGameModal() {
            if (document.querySelector('#addGameModal')) return;

            var wrapper = document.createElement('div');
            wrapper.id = 'addGameModal';
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
                                    <div id="addGameModalCloseButton" class="closeButton">
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
                                                <input id="addGameModalAppIDInput"
                                                    class="DialogInput DialogInputPlaceholder DialogTextInputBase Focusable"
                                                    placeholder="AppID"
                                                    type="text"
                                                    spellcheck="false">
                                            </div>
                                        </div>
                                        <div class="DialogFooter">
                                            <div class="DialogTwoColLayout _DialogColLayout Panel">
                                                <button id="addGameModalDownloadButton" type="button" class="DialogButton _DialogLayout Primary Focusable">Download</button>
                                                <button id="addGameModalCancelButton" type="button" class="DialogButton _DialogLayout Secondary Focusable">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </dialog>
            `;

            var container = document.querySelector('._27qasW5wLU4h4nUgawpo1q');
            if (!container) return;
            container.appendChild(wrapper);

            function closeAddGameModal() {
                wrapper.remove();
            }

            wrapper.querySelector('.ModalOverlayContent.active').addEventListener('click', function(e) {
                if (!wrapper.querySelector('.DialogContent').contains(e.target)) {
                    closeAddGameModal();
                }
            });

            wrapper.querySelector('#addGameModalCloseButton').onclick = closeAddGameModal;
            wrapper.querySelector('#addGameModalCancelButton').onclick = closeAddGameModal;
            
            wrapper.querySelector('#addGameModalDownloadButton').onclick = function() {
                var appid = wrapper.querySelector('#addGameModalAppIDInput').value.trim();
                if (!appid) return;
                console.log('OpenSteam: download for AppID', appid);
                closeAddGameModal();
            };
        }

        function inject() {
        // class="bSKGlAJG2UVWTsntEJY2v" puis mettre le texte OpenSteam
        // <div class="bSKGlAJG2UVWTsntEJY2v"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none" class="GG9wVQz6PLlhGHlJyZh4E"><path d="M17.974 3C10.0808 3 3.61438 9.07573 3 16.7967L11.0534 20.121C11.7357 19.6551 12.56 19.383 13.447 19.383C13.5265 19.383 13.6056 19.3849 13.684 19.3892L17.2658 14.2073C17.2658 14.1826 17.2652 14.1585 17.2652 14.1342C17.2652 11.0149 19.807 8.47686 22.9319 8.47686C26.0568 8.47686 28.5987 11.0149 28.5987 14.1342C28.5987 17.2532 26.0568 19.7915 22.9319 19.7915C22.8887 19.7915 22.8463 19.7903 22.8035 19.7889L17.6954 23.4276C17.6981 23.4944 17.7004 23.5615 17.7004 23.6287C17.7004 25.9704 15.7923 27.8749 13.447 27.8749C11.3885 27.8749 9.66695 26.4079 9.27686 24.4652L3.51756 22.0881C5.30075 28.3844 11.0953 33 17.974 33C26.2726 33 33 26.2842 33 18.0001C32.9999 9.71534 26.2725 3 17.974 3Z" fill="currentColor"></path><path d="M12.4163 25.7599L10.5704 24.9989C10.8977 25.6791 11.4633 26.2478 12.2149 26.5608C13.8388 27.2363 15.7116 26.4665 16.3884 24.8446C16.7162 24.0596 16.7186 23.193 16.3933 22.4064C16.0691 21.6196 15.457 21.0054 14.6698 20.6778C13.889 20.3538 13.0526 20.3656 12.317 20.6422L14.2241 21.4296C15.4222 21.928 15.9884 23.3013 15.4894 24.497C14.9906 25.6931 13.6143 26.2586 12.4163 25.7599Z" fill="currentColor"></path><path d="M26.7079 14.1338C26.7079 12.0555 25.0142 10.3645 22.9321 10.3645C20.8502 10.3645 19.1559 12.0554 19.1559 14.1338C19.1559 16.2122 20.8501 17.9027 22.9321 17.9027C25.0141 17.9027 26.7079 16.2122 26.7079 14.1338ZM20.1018 14.1273C20.1018 12.5634 21.372 11.296 22.9384 11.296C24.505 11.296 25.7749 12.5634 25.7749 14.1273C25.7749 15.6912 24.5051 16.9586 22.9384 16.9586C21.372 16.9585 20.1018 15.6912 20.1018 14.1273Z" fill="currentColor"></path></svg>Steam</div>

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
                    link.href = 'https://github.com/hugo94110';
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    link.click();
                };
            }

            if (!document.querySelector('#os-styles')) {
                var style = document.createElement('style');
                style.id = 'os-styles';
                style.textContent = [
                    '#addGameButton .SVGIcon_Arrow path { fill: rgb(169, 169, 169); }',
                    '#addGameButton:hover .SVGIcon_Arrow path { fill: rgb(255, 255, 255); }'
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

        new MutationObserver(inject).observe(document.body, { childList: true, subtree: true });
        inject();
    }

    if (title === 'Steam Root Menu') {
        function inject() {
            var container = document.querySelector('._2EstNjFIIZm_WUSKm5Wt7n._3pofGqV0buiKAfMPEs3_82');
            if (!container) return;
            if (container.querySelector('#rootMenuTestItem')) return;

            container.insertAdjacentHTML('afterbegin', `
                <div id="rootMenuTestItem" role="menuitem" class="_2jXHP0742MyApMUVUM8IFn _2uiDecKkKjAq7nimy3uLhG _1n7Wloe5jZ6fSuvV18NNWI contextMenuItem">OpenSteam</div>
                <hr class="_2jXHP0742MyApMUVUM8IFn _21GPYlKBCLsHQpTsHw_RL_">
            `);
        }

        new MutationObserver(inject).observe(document.body, { childList: true, subtree: true });
        inject();
    }
})();
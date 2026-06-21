(function() {
    function inject() {
        var container = document.querySelector('._3cykd-VfN_xBxf3Qxriccm._1-9sir4j_KQiMqdkZjQN0u');
        if (!container || container.querySelector('#testButton')) return;

        container.insertAdjacentHTML('afterbegin', `
            <div id="testButton" style="cursor:pointer; -webkit-app-region:no-drag; margin-right:8px;">
                <div>
                    <div class="_2Szzh5sKyGgnLUR870zbDE RtSv39ZoBOySnb8XQ5hJf _3qhGkQ5qLVNQQ-J2-uPoHt">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="14" height="14" fill="none" class="_34bQcTHo5QKzuujoEyU1tm">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20 6H16V16H6V20H16V30H20V20H30V16H20V6Z" fill="currentColor"/>
                        </svg>
                    </div>
                </div>
            </div>
        `);
    }

    new MutationObserver(inject).observe(document.body, { childList: true, subtree: true });
    inject();
})();
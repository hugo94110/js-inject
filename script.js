(function() {
    function inject() {
        var container = document.querySelector('._3cykd-VfN_xBxf3Qxriccm._1-9sir4j_KQiMqdkZjQN0u');
        if (!container || container.querySelector('#testButton')) return;

        container.insertAdjacentHTML('afterbegin', `
            <div id="testButton" style="cursor:pointer; -webkit-app-region:no-drag; margin-right:8px;">
                <div>
                    <div class="_2Szzh5sKyGgnLUR870zbDE RtSv39ZoBOySnb8XQ5hJf _3qhGkQ5qLVNQQ-J2-uPoHt">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 36 36">
                            <path fill="currentColor" d="M 14.970703 2.9726562 A 2.0002 2.0002 0 0 0 13 5 L 13 13 L 5 13 A 2.0002 2.0002 0 1 0 5 17 L 13 17 L 13 25 A 2.0002 2.0002 0 1 0 17 25 L 17 17 L 25 17 A 2.0002 2.0002 0 1 0 25 13 L 17 13 L 17 5 A 2.0002 2.0002 0 0 0 14.970703 2.9726562 z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        `);
    }

    new MutationObserver(inject).observe(document.body, { childList: true, subtree: true });
    inject();
})();
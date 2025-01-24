import { forEach } from 'lodash'

export function clickSelectMixins() {
    function handleClickOutside() {
        $(document).mouseup(function (e) {
            if (e.target.classList.value !== 'el-dialog__footer') {
                let selectElement = document.getElementsByClassName('el-select')

                forEach(selectElement, (value, key) => {
                    value.classList.remove('is_focus')
                })
            }
        }.bind(this));
    }

    function clickSelect(className) {
        let selectElement = document.getElementsByClassName(`${className}`)[0]
        selectElement.classList.add('is_focus')
    }

    return {
        handleClickOutside,
        clickSelect
    }
}